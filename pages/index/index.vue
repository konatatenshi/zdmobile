<template>
	<view class="bg-gray">
		<basics v-if="PageCur=='basics'" ref="basics"></basics>
		<components v-if="PageCur=='component'"></components>
		<plugin v-if="PageCur=='plugin'" ref="message"></plugin>
		<about v-if="PageCur=='about'" @returnDat='returnDate'></about>
		<login v-if="PageCur=='login'" @returnDat='returnDate'></login>
		<view v-else class="status_bar cu-bar tabbar bg-white shadow foot">
			<view :class="PageCur=='basics'?'action text-green':'action text-gray'" @click="NavChange"
				data-cur="basics">
				<view class="cuIcon-homefill"></view> 首页
			</view>
			<view :class="PageCur=='component'?'action text-green':'action text-gray'" @click="NavChange"
				data-cur="component">
				<view class="cuIcon-similar"></view> 版块
			</view>
			<view class="action text-gray add-action">
				<button class="cu-btn cuIcon-add bg-green shadow"></button>
				发布
			</view>
			<view :class="PageCur=='plugin'?'action text-green':'action text-gray'" @click="NavChange"
				data-cur="plugin">
				<view class="cuIcon-message">
					<view v-if="mynewpm>0" class="cu-tag badge">{{mynewpm}}</view>
				</view>
				信息
			</view>
			<view :class="PageCur=='about'?'action text-green':'action text-gray'" @click="NavChange" data-cur="about">
				<view class="cuIcon-my">
					<view v-if="myinfoprompt>0" class="cu-tag badge"></view>
				</view>
				我的
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
			}
		},
		onLoad: function() {
			let websocket = new wsRequest("wss://lt.zdfx.net:8586/", 10000);
			Vue.prototype.$socket = websocket;
			if (this.$token == '') {
				//this.PageCur = 'login';
			};
			uni.$on('websocketmessage', (websocketmessage) => {
				this.websocketmessage = websocketmessage;
				var jsonget = JSON.parse(this.websocketmessage.data)
				console.log(jsonget);
				if (jsonget.cmd == "onlinecheck" && jsonget.type == "group") {
					if (this.PageCur == "plugin") {
						this.$refs.message.groupchatupdate(jsonget.status);
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
			uni.$off('websocketmessage');
			console.log("移除监听");
		},
		onShow: function() {
			if (Vue.prototype.$token != '') {
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=xinxiu_network:user', //获取用户基本信息。
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
			setTimeout(() => {
				this.$socket.reconnect();
				this.loginchat();
				this.$socket.send(JSON.stringify(data));
				console.log("断线重连")
			}, 4000)
		},
		onReachBottom() {
			//console.log("到底了");
			if (this.PageCur == "basics") {
				this.$refs.basics.tothebottom();
			};
		},
		methods: {
			returnDate(val) {
				this.PageCur = val;
				console.log(val);
			},
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur;
			},
			loginchat() {
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
				console.log(data);
				this.$socket.send(JSON.stringify(data));
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
		top: calc(var(--status-bar-height) + 40px);
		/* #endif */
	}

	.hometop1 {
		z-index: 998;
		/* #ifdef APP-PLUS */
		position: fixed;
		left: 0;
		right: 0;
		top: calc(var(--status-bar-height) + 25px);
		/* #endif */
	}

	.hometop2 {
		/* #ifdef APP-PLUS */
		margin-top: calc(var(--status-bar-height) + 25px);
		/* #endif */
	}

	.hometop3 {
		/* #ifdef APP-PLUS */
		margin-top: calc(var(--status-bar-height) + 71px);
		/* #endif */
	}
</style>
