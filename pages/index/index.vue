<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view class="bg-gray">
		<basics v-if="PageCur=='basics'" ref="basics" @returnDat='returnDate'></basics>
		<components v-if="PageCur=='component'"></components>
		<plugin v-if="PageCur=='plugin'" ref="message" @returnDat='returnDate'></plugin>
		<about v-if="PageCur=='about'" ref="about" @returnDat='returnDate'></about>
		<login v-if="PageCur=='login'" ref="login" @returnDat='returnDate'></login>
		<view v-else class="status_bar bg-white cu-bar tabbar shadow foot" :class="'bt-'+themeColor.name">
			<view :class="PageCur=='basics'?'action text-green':'action text-gray'" @click="NavChange"
				data-cur="basics">
				<view class="cuIcon-homefill"></view>{{$t('index.home')}}
			</view>
			<view :class="PageCur=='component'?'action text-green':'action text-gray'" @click="NavChange"
				data-cur="component">
				<view class="cuIcon-similar"></view>{{$t('index.component')}}
			</view>
			<view class="action text-gray add-action" @click="postnew()">
				<button class="cu-btn cuIcon-add bg-green shadow"></button>
				{{$t('index.post')}}
			</view>
			<view :class="PageCur=='plugin'?'action text-green':'action text-gray'" @click="NavChange"
				data-cur="plugin">
				<view class="cuIcon-message">
					<view v-if="mynewpm>0" class="cu-tag badge">{{mynewpm}}</view>
				</view>
				{{$t('index.message')}}
			</view>
			<view :class="PageCur=='about'?'action text-green':'action text-gray'" @click="NavChange" data-cur="about">
				<view class="cuIcon-my">
					<view v-if="myinfoprompt>0" class="cu-tag badge"></view>
				</view>
				{{$t('index.mine')}}
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue';
	import wsRequest from '../../js_sdk/websocket.js';
	export default {
		data() {
			return {
				PageCur: 'basics',
				mynewpm: 0,
				myinfoprompt: 0,
				chatnumber: 0,
			}
		},
		onLoad: function() {
			let websocket = new wsRequest("wss://lt.zdfx.net:8586/", 10000);
			Vue.prototype.$socket = websocket;
			if (this.$token == '') {
				//this.PageCur = 'login';
			};
			uni.$on('chosenSex', this.changeprompt);
			uni.$on('websocketmessage', (websocketmessage) => {
				this.websocketmessage = websocketmessage;
				var jsonget = JSON.parse(this.websocketmessage.data)
				//console.log(jsonget);
				if (jsonget.cmd == "onlinecheck" && jsonget.type == "group") {
					if (this.PageCur == "plugin") {
						this.$refs.message.groupchatupdate(jsonget.status);
						this.chatnumber = jsonget.status;
					}
				} else if (jsonget.cmd == "chat") {
					if (this.PageCur == "plugin") {
						this.$refs.message.chatmessageupdate(jsonget);
					}
				}
			})
			uni.$on('onsocket', (onsocket) => {
				this.loginchat();
			})
		},
		onUnload() {
			// 移除监听事件  
			uni.$off('onsocket');
			uni.$off('chosenSex');
			uni.$off('websocketmessage');
			console.log("移除监听");
		},
		onShow: function() {
			//console.log(this.$socket)
			if (Vue.prototype.$token != '') {
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:user', //获取用户基本信息。
					method: 'GET',
					timeout: 10000,
					data: {
						token: Vue.prototype.$token,
						action: 'user_info'
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						//console.log(res.data);
						var that = this;
						uni.setStorage({
							key: 'myuserinfo',
							data: res.data.data,
							success: function() {
								//console.log('success');
							}
						});
						uni.getStorage({
							key: 'myuserinfo',
							success: function(res) {
								console.log(res);
								if(res.data.status==0&&res.data.freeze==0){
									getApp().globalData.myusername = res.data.username;
									getApp().globalData.myadminid = res.data.adminid;
									getApp().globalData.mygroupid = res.data.groupid;
									getApp().globalData.mygroupexpiry = res.data.groupexpiry;
									getApp().globalData.myregdate = res.data.regdate;
									getApp().globalData.mycredits = res.data.credits;
									getApp().globalData.mynewpm = res.data.newpm;
									getApp().globalData.mynewprompt = res.data.newprompt;
									getApp().globalData.myfreeze = res.data.freeze;
									getApp().globalData.onlyacceptfriendpm = res.data
										.onlyacceptfriendpm;
									getApp().globalData.myinfoprompt = parseInt(res.data.newpm) +
										parseInt(res.data.newprompt);
									that.mynewpm = getApp().globalData.mynewpm;
									that.myinfoprompt = getApp().globalData.myinfoprompt;
								}else{
									uni.redirectTo({
										url: '../../components/ay-login/login-password'
									});
								}
								//console.log(that.mynewpm);
								//console.log(that.myinfoprompt);
							}
						});
					}
				});
			};
			let data = {
				"cmd": "onlinecheck",
				"type": "group",
				"id": -1
			};
			if (this.$socket == undefined) {
				let websocket = new wsRequest("wss://lt.zdfx.net:8586/", 10000);
				Vue.prototype.$socket = websocket;
			};
			if (this.$socket.is_open_socket == false) {
				let websocket = new wsRequest("wss://lt.zdfx.net:8586/", 10000);
				Vue.prototype.$socket = websocket;
			};
			setTimeout(() => {
				this.$socket.reconnect();
				this.loginchat();
				this.$socket.send(JSON.stringify(data));
				console.log("断线重连")
			}, 4000)
			setTimeout(() => {
				if(this.chatnumber == 0 && this.PageCur == "plugin"){
					this.$refs.message.chonglian();
				}
			}, 10000)
		},
		onReachBottom() {
			//console.log("到底了");
			if (this.PageCur == "basics") {
				this.$refs.basics.tothebottom();
			};
			if (this.PageCur == "plugin") {
				this.$refs.message.tothebottom();
			};
		},
		onPageScroll(res){
			Vue.prototype.$scrollheight =res.scrollTop;
			//console.log(res.scrollTop);//距离页面顶部距离
		},
		methods: {
			returnDate(val,f) {
				let that = this;
				this.PageCur = val;
				console.log(val);
			},
			NavChange: function(e) {
				if(this.PageCur=='basics'){
					this.$refs.basics.shuaxinlist(1);
				}else if(this.PageCur=='plugin'){
					this.$refs.message.shuaxinlist(1);
				}else if(this.PageCur=='about'){
					this.$refs.about.shuaxinlist(1);
				}
				this.PageCur = e.currentTarget.dataset.cur;
			},
			postnew(){
				if(this.$uid==0){
					uni.redirectTo({
						url:"../../components/ay-login/login-password"
					})
				}else{
					uni.navigateTo({
						url: '../extra/text'
					})
				}
			},
			loginchat() {
				if(this.$uid>0 && this.$username == this.$t('index.guest')){
					plus.runtime.restart();
				}
				let data = {
					"from": "bbs.zdfx.net",
					"id": this.$uid,
					"username": this.$username,
					"sign": "",
					"avatar": "https://zd.tiangal.com/uc_server/avatar.php?uid=" + this.$uid + "&size=small&ts=1",
					"allowmoney": 0,
					"adminid": this.$adminid,
					"groupids": [],
					"admingroupids": [],
					"anonymous": 0,
					"anonymous_group": "0",
					"auth": this.$auth,
					"cmd": "login"
				};
				//console.log(data);
				this.$socket.send(JSON.stringify(data));
			},
			changeprompt(data){
				let that =this;
				this.myinfoprompt = data;
				if(data==-8878){
					setTimeout(() => {
						that.$refs.message.tomessage();
					}, 100)
				}
				if(data==-8879){
					setTimeout(() => {
						that.$refs.message.tonofi();
					}, 100)
				}
			}
		}
	}
</script>

<style>
	.hometop {
		z-index: 999;
		/* #ifdef APP-PLUS */
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		padding-top: var(--status-bar-height);
		padding-bottom: 10upx;
		/* #endif */
	}

	.hometop0 {
		z-index: 998;
		/* #ifdef APP-PLUS */
		position: fixed;
		left: 0;
		right: 0;
		height: 42upx;
		top: calc(var(--status-bar-height) + 73upx);
		/* #endif */
	}

	.hometop1 {
		z-index: 998;
		/* #ifdef APP-PLUS */
		position: fixed;
		left: 0;
		right: 0;
		top: calc(var(--status-bar-height) + 40upx);
		/* #endif */
	}

	.hometop2 {
		/* #ifdef APP-PLUS */
		margin-top: calc(var(--status-bar-height) + 50upx);
		/* #endif */
	}

	.hometop3 {
		/* #ifdef APP-PLUS */
		margin-top: calc(var(--status-bar-height) + 115upx);
		/* #endif */
	}
	.bg-white.bt-black{
		background-color: #393939!important;
	}
</style>
