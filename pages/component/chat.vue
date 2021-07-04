<template>
	<view>
		<cu-custom class="statustop" bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">公共群组 ({{onlinenumber}}人在线)</block>
		</cu-custom>
		<view class="cu-chat">
			<view v-for="(item,index) in chatlist" :key="index" :data-id="index">
				<view v-if="item.mine && item.remark!='图片'" class="cu-item self" @tap="tabSelect(item.cid,item.fromid)">
					<view class="main">
						<view class="content bg-green shadow">
							<text>{{item.content}}</text>
						</view>
					</view>
					<view class="cu-avatar radius"
						:style="{'background-image': 'url(https://zd.tiangal.com/uc_server/avatar.php?uid='+item.fromid+'&size=small&ts=1)'}">
					</view>
					<view class="date">{{item.timestamp}}</view>
				</view>
				<view v-else-if="item.mine && item.remark=='图片'" class="cu-item self">
					<view class="main">
						<image :src="'https://bbs.zdfx.net/' + item.content" class="radius" mode="widthFix"></image>
					</view>
					<view class="cu-avatar radius"
						:style="{'background-image': 'url(https://zd.tiangal.com/uc_server/avatar.php?uid='+item.fromid+'&size=small&ts=1)'}">
					</view>
					<view class="date">{{item.timestamp}}</view>
				</view>
				<view v-else-if="item.system" class="cu-info round">{{item.content}}</view>
				<view v-else-if="item.remark=='图片'" class="cu-item">
					<view class="author">{{item.username}}</view>
					<view class="cu-avatar radius"
						:style="{'background-image': 'url(https://zd.tiangal.com/uc_server/avatar.php?uid='+item.fromid+'&size=small&ts=1)'}">
					</view>
					<view class="main">
						<image :src="'https://bbs.zdfx.net/' + item.content"
							@click="imgMap('https://bbs.zdfx.net/' + item.content)" class="radius" mode="widthFix">
						</image>
					</view>
					<view class="date">&#12288;{{item.timestamp}}</view>
				</view>
				<view v-else class="cu-item">
					<view class="author">{{item.username}}</view>
					<view class="cu-avatar radius"
						:style="{'background-image': 'url(https://zd.tiangal.com/uc_server/avatar.php?uid='+item.fromid+'&size=small&ts=1)'}">
					</view>
					<view class="main">
						<view class="content shadow">
							<text>{{item.content}}</text>
						</view>
					</view>
					<view class="date">&#12288;{{item.timestamp}}</view>
				</view>
			</view>
			<view>
				<block>
					<view class="padding-xs flex align-center bg-gray" :style="{'height': iStatusBarHeight+'px'}">
						<view class="flex-sub text-center">
							<view class="text-xs padding">
								<text class="text-white">终点论坛 @2021</text>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="cu-bar foot input button__box" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-pic text-grey"></text>
			</view>
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
				@focus="InputFocus" @blur="InputBlur"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-green shadow">发送</button>
		</view>

	</view>
</template>

<script>
	import Vue from 'vue';
	export default {
		data() {
			return {
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
				iStatusBarHeight: 20,
				InputBottom: 0,
				chattopid: 0,
				onlinenumber: 0,
				pageHeight: 0,
				chatlist: []
			};
		},
		methods: {
			tabSelect(e) {
				this.InputBottom = e.detail.height
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			loginchat() {
				let data = {
					"from": "bbs.zdfx.net",
					"id": this.$uid,
					"username": this.$myusername,
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
			},
			scrollToBottom: function() {
				let that = this;
				let query = uni.createSelectorQuery();
				query.select('.cu-chat').boundingClientRect(rect => {
					if (rect) {
						//console.log(e + ".height = " + rect.height)
						this.pageHeight = rect.height + uni.getSystemInfoSync().statusBarHeight +
						200; //页面可见区域 - 头部高度
						console.log("this.height = " + this.pageHeight)
					}
				}).exec();
				setTimeout(()=> {
				  that.scrollTop(that.pageHeight)
				}, 200);
			},
			imgMap(url) {
				uni.previewImage({
					urls: [url], //这里一定是数组，不然就报错
				});
			},
			scrollTop(e) {
				uni.pageScrollTo({
					scrollTop: e,
					duration: 300
				});
			},
			getchatmessage(e) {
				var that = this;
				uni.request({
					url: 'https://lt.zdfx.net:8089/index.php?m=im&a=chatlog&from=bbs.zdfx.net&id=-1&type=group', //获取轮播列表
					method: 'GET',
					timeout: 10000,
					data: {
						uid: that.$uid,
						page: 0,
						auth: that.$htauth
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						let chatmess = JSON.parse(res.data.substr(1, (res.data.length - 2)));
						console.log(chatmess);
						uni.setStorage({
							key: 'chatchannel',
							data: chatmess[4].cid,
							success: function() {
								Vue.prototype.$chatid = chatmess[4].cid
								//console.log(Vue.prototype.$switchbvalue);
							}
						});
						for (let i = 0; i < chatmess.length; ++i) {
							if (chatmess[i].remark == '图片') {
								let regex2 = /img\[(.+?)\]/g;
								chatmess[i].content.match(regex2);
								console.log(RegExp.$1);
								chatmess[i].content = RegExp.$1;
							};
						};
						that.chatlist.unshift(chatmess[4]);
						that.chatlist.unshift(chatmess[3]);
						that.chatlist.unshift(chatmess[2]);
						that.chatlist.unshift(chatmess[1]);
						that.chatlist.unshift(chatmess[0]);
						that.chattopid = chatmess[0].cid;
						//console.log(that.$htauth);
						console.log(that.chatlist);
					}
				});
			},
		},
		onLoad: function() {
			if (this.$token == '') {
				uni.navigateTo({
					url: '../../components/ay-login/login-password'
				});
			};
			uni.$on('websocketmessage', (websocketmessage) => {
				this.websocketmessage = websocketmessage;
				var jsonget = JSON.parse(this.websocketmessage.data)
				console.log(jsonget);
				if (jsonget.cmd == "onlinecheck" && jsonget.type == "group") {
					this.onlinenumber = jsonget.status;
				} else if (jsonget.cmd == "chat") {
					if (jsonget.remark == '图片') {
						let regex2 = /img\[(.+?)\]/g;
						jsonget.content.match(regex2);
						console.log(RegExp.$1);
						jsonget.content = RegExp.$1;
					};
					this.chatlist.push(jsonget);
					this.scrollToBottom();
				}
			});
			this.getchatmessage();
		},
		onReady: function() {
			this.scrollToBottom();
		},
		onUnload() {
			// 移除监听事件  
			//uni.$off('websocketmessage');
			//console.log("移除监听");
		},
	}
</script>

<style>
	uni-view.author {
		position: absolute;
		font-size: 12px;
		color: #8799a3;
		width: calc(100% - 160px);
		top: 112upx;
		left: 30upx;
		align-items: center;
	}

	page {
		padding-bottom: 100upx;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.content view {
		margin: 20px 0;
	}
</style>
