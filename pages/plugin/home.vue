<template name="components">
	<view>
		<view class="cu-bar bg-white hometop">
			<view class="action">
				<text class="cuIcon-homefill text-gray"></text> 首页
			</view>
			<view class="content text-bold" style="margin-bottom: 3px;">
				消息列表
			</view>
			<view class="action">
				<text class="cuIcon-peoplefill text-grey"></text>
			</view>
		</view>
		<scroll-view scroll-x class="bg-white nav-sm hometop1" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in 4" :key="index"
				@tap="tabSelect" :data-id="index">
				<text class="cuIcon-title text-orange" v-if="index<2"></text>{{tabname[index]}}
			</view>
		</scroll-view>

		<view class="view_head">
			<swiper class="swiper-box" :style="'height: ' + swiperheight +'px;'" :current="TabCur" @change="tabChange">
				<swiper-item key="1">
					<scroll-view class="list">
						<view v-if="1 > 0">
							<!-- 	图文列表
							<block v-for="(item,index1) in items.list" :key="index1">
								<view>{{item}}</view>
							</block> -->
						</view>
					</scroll-view>
				</swiper-item>

				<swiper-item key="2">
					<scroll-view class="list">
						<view class="view_listnow">
							<view class="cu-bar bg-white solid-bottom margin-top hometop3">
								<view class="action">
									群组消息
								</view>
							</view>
							<view class="cu-list menu-avatar" @click="gonggongqunzu()">
								<view class="cu-item">
									<view class="cu-avatar round lg"
										style="background-image:url(../../static/group.png);">
									</view>
									<view class="content">
										<view>
											<view class="text-cut">公共群组</view>
											<view class="cu-tag round bg-orange sm">{{chatonline}}人</view>
										</view>
										<view class="text-gray text-sm flex">
											<view class="text-cut">
												{{chatmessage}}
											</view>
										</view>
									</view>
									<view class="action">
										<view class="text-grey text-xs">{{chattime}}</view>
										<view class="cu-tag round bg-red sm" v-if="switchB">{{chatnumber}}
										</view>
										<view class="cuIcon-notice_forbid_fill text-gray" v-else></view>
									</view>
								</view>
							</view>
							<view class="cu-bar bg-white solid-bottom margin-top">
								<view class="action">
									系统消息
								</view>
							</view>
							<view class="cu-list menu-avatar">
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item key="3">
					<scroll-view class="list">
						<view>
							<view class="cu-form-group margin-top hometop3">
								<view class="title">陌生人消息不接收</view>
								<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false">
								</switch>
							</view>
							<view class="cu-form-group">
								<view class="title">公共群组消息开关</view>
								<switch class='cyan' @change="SwitchB" :class="switchB?'checked':''"
									:checked="switchB?true:false"></switch>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view class="cu-modal" :class="modalName=='modify'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改成功</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					修改成功，点击确定关闭。
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='needlogin'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">需要登录</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					你需要登录才可以使用此功能。
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="tologin">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='dxcl'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">断线重连</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您似乎已经和聊天服务器断开连接，是否重连？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="restart">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "basics",
		data() {
			return {
				scrollLeft: 0,
				iStatusBarHeight: 0,
				chatonline: 0,
				switchvalue: 0,
				switchbvalue: 0,
				chatnumber: 0,
				swiperList: [],
				toplist: [],
				tuijiantie: [],
				modalName: "",
				chatmessage: "",
				chattime: "00:00",
				tabname: ["私人消息", "公共消息", "消息设置", "发送消息"],
				avatarimgLoaded: false,
				modalName: null,
				TabCur: 1,
				radio: 'A',
				switchA: false,
				switchB: true,
				swiperheight: 1000, //高度
			};
		},
		methods: {
			hideModal(e) {
				this.modalName = null
			},
			chonglian(e) {
				this.modalName = 'dxcl';
			},
			restart(e) {
				plus.runtime.restart();
			},
			tologin(e) {
				uni.redirectTo({
					url: '../../components/ay-login/login-password'
				});
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			onSuccessImg() {
				this.avatarimgLoaded = true;
			},
			groupchatupdate(e) {
				this.chatonline = e;
			},
			chatmessageupdate(e) {
				this.chattime = e.timestamp.substr(0, e.timestamp.length - 3);
				this.chatmessage = e.username + ":" + e.content;
			},
			gonggongqunzu() {
				//console.log(e);
				uni.navigateTo({
					url: '../component/chat'
				});
				this.chatnumber = 0;
			},
			SwitchA(e) {
				this.switchA = e.detail.value
				if (e.detail.value) {
					this.switchvalue = 1;
				} else {
					this.switchvalue = 2;
				}
				let that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:moshengrenxiaoxi', //获取设置
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						switch: that.switchvalue,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.code == 200) {
							getApp().globalData.onlyacceptfriendpm = that.switchvalue;
							this.modalName = "modify";
						}
					}
				});
			},
			SwitchB(e) {
				this.switchB = e.detail.value
				if (e.detail.value) {
					this.switchbvalue = 0;
				} else {
					this.switchbvalue = 1;
				}
				let that = this;
				uni.setStorage({
					key: 'chatswitch',
					data: that.switchbvalue,
					success: function() {
						Vue.prototype.$switchbvalue = that.switchbvalue
						console.log(Vue.prototype.$switchbvalue);
					}
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				console.log(this.swiperheight)
			},
			tabChange(e) {
				this.TabCur = e.detail.current;
				var that = this;
				if (this.TabCur == 1) {}
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
						console.log(that.$chatid);
						if(that.$chatid == 0){
							uni.setStorage({
								key: 'chatchannel',
								data: chatmess[4].cid,
								success: function() {
									Vue.prototype.$chatid = chatmess[4].cid
									//console.log(Vue.prototype.$switchbvalue);
								}
							});
						}else{
							that.chatnumber =  chatmess[4].cid - that.$chatid;
							if(that.chatnumber > 99){that.chatnumber = "99+";}
							that.chatmessage = chatmess[4].username + ":" + chatmess[4].content
							that.chattime = chatmess[4].timestamp.substr(0, chatmess[4].timestamp.length - 3);
						}
						//console.log(that.$htauth);
						//console.log(that.$uid);
					}
				});
			},
			tourl(e) {
				console.log(this.swiperheight)
			}
		},
		created() {
			if (this.$token == "") {
				this.modalName = "needlogin";
			}
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			this.getchatmessage();
			let data = {
				"cmd": "onlinecheck",
				"type": "group",
				"id": -1
			};
			this.$socket.send(JSON.stringify(data));
			if (getApp().globalData.onlyacceptfriendpm == 1) {
				this.switchA = true;
			};
			//plus.navigator.setStatusBarStyle('light');//改变系统标题颜色
			var that = this;
			uni.getStorage({
				key: 'chatswitch',
				success: function(res) {
					if (res.data == 1) {
						that.switchB = false;
					}
				}
			});
			uni.getStorage({
				key: 'lunbolist',
				success: function(res) {
					that.swiperList = res.data.data;
					//console.log(that.swiperList);
				}
			});
		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight + uni.upx2px(100) + uni.getSystemInfoSync().statusBarHeight
					this.swiperheight = height;
				}
			})
			var that=this;
			setTimeout(function() {
				console.log(that.chatonline);
				if(that.chatonline==0){
					that.chonglian();
				}
			}, 2000)
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}

	.nav-sm {
		white-space: nowrap;
	}

	.nav-sm .cu-item.cur {
		border-bottom: 2px solid;
	}

	.nav-sm .cu-item {
		height: 30px;
		display: inline-block;
		line-height: 30px;
		margin: 0 5px;
		padding: 0 11px;
	}
</style>
