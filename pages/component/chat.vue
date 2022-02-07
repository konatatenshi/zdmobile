<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom class="statustop" bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">公共群组 ({{onlinenumber}}人在线)</block>
		</cu-custom>
		<view class="cu-chat">
			<view v-if="!loadingmore" class="cu-info round" @tap="getchatmessage()">查看更多记录</view><view v-else class="cu-load text-gray loading"></view>
			<view v-for="(item,index) in chatlist" :key="index" :data-id="index">
				<view v-if="(item.mine || item.username==$username) && item.remark!='图片'" class="cu-item self" @tap="tabSelect(item.cid,item.fromid)">
					<view class="main">
						<view class="content bg-green shadow">
							<rich-text :nodes="item.content"></rich-text>
						</view>
					</view>
					<view class="cu-avatar radius"
						:style="{'background-image': 'url(https://zd.tiangal.com/uc_server/avatar.php?uid='+item.fromid+'&size=small&ts=1)'}">
					</view>
					<view class="date">{{item.timestamp}}</view>
				</view>
				<view v-else-if="(item.mine || item.username==$username)&& item.remark=='图片'" class="cu-item self">
					<view class="main" v-if="item.content.indexOf('source') == 0">
						<image src="../../static/img/loading2.gif" class="radius" v-show="item.id==-1"></image>
						<image :src="'https://bbs.zdfx.net/' + item.content" @load="item.id='1'"  class="radius" @click="imgMap('https://bbs.zdfx.net/' + item.content)"  mode="widthFix" lazy-load v-show="item.id=='1'"></image>
					</view>
					<view class="main" v-else>
						<image src="../../static/img/loading2.gif" mode="widthFix" class="radius" v-show="item.id==-1"></image>
						<image :src="item.content" @load="item.id='1'"  class="radius" @click="imgMap(item.content)"  mode="widthFix" lazy-load v-show="item.id=='1'"></image>
					</view>
					<view class="cu-avatar radius"
						:style="{'background-image': 'url(https://zd.tiangal.com/uc_server/avatar.php?uid='+item.fromid+'&size=small&ts=1)'}">
					</view>
					<view class="date">{{item.timestamp}}</view>
				</view>
				<view v-else-if="item.system" class="cu-info round flex solid-bottom justify-center">{{item.content}}</view>
				<view v-else-if="item.remark=='图片'" class="cu-item">
					<view class="author">{{item.username}}</view>
					<view class="cu-avatar radius"
						:style="{'background-image': 'url(https://zd.tiangal.com/uc_server/avatar.php?uid='+item.fromid+'&size=small&ts=1)'}">
					</view>
					<view class="main" v-if="item.content.indexOf('source') == 0">
						<image src="../../static/img/loading2.gif" mode="widthFix" class="radius" v-show="item.id==-1"></image>
						<image :src="'https://bbs.zdfx.net/' + item.content" @load="item.id='1'"  class="radius" @click="imgMap('https://bbs.zdfx.net/' + item.content)"  mode="widthFix" lazy-load v-show="item.id=='1'"></image>
					</view>
					<view class="main" v-else>
						<image src="../../static/img/loading2.gif" mode="widthFix" class="radius" v-show="item.id==-1"></image>
						<image :src="item.content" @load="item.id='1'"  class="radius" @click="imgMap(item.content)"  mode="widthFix" lazy-load v-show="item.id=='1'"></image>
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
							<rich-text :nodes="item.content"></rich-text>
						</view>
					</view>
					<view class="date">&#12288;{{item.timestamp}}</view>
				</view>
			</view>
			<view v-if="stopload>1" class="cu-info round" @tap="retriveload()">继续自动滚动消息</view>
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
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
				@focus="InputFocus" @blur="InputBlur" v-model="content"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey margin-right-xs" @tap="togglePicker(200, 'emoji')"></text>
				<uni-section title="只选择图片" type="line">
					<view class="example-body">
							<uni-file-picker class="exp" v-model="imageValue" limit="1" fileMediatype="image" :image-styles="imageStyles" @success="success"><text class="cuIcon-add text-grey warr"></text></uni-file-picker>
					</view>
				</uni-section>
			</view>
			<button @tap="sendmessage" class="cu-btn bg-green shadow">发送</button>
		</view>
		<!--表情-->
		<view v-show="showEmoji" class="emoji" @tap.prevent.stop="">
			<view class="list">
				<view class="item" @tap="content += item" v-for="(item, index) in emojis" :key="index">
					<img-cache class="icon" :src="'https://bbs.zdfx.net/source/plugin/heart_im/layui/images/face/' + index + '.gif'"></img-cache>
				</view>
			</view>
		</view>
		<!--附件-->
		<view v-show="showFile" class="file" @tap.prevent.stop="">
			<view class="list flex-row">
				<view class="item flex-column">
					<image src="../../static/img/album.png" mode="widthFix" class="icon"></image>
					<view class="text">相册</view>
				</view>
				<view class="item flex-column">
					<image src="../../static/img/photo.png" mode="widthFix" class="icon"></image>
					<view class="text">拍照</view>
				</view>
				<view class="item flex-column">
					<image src="../../static/img/group.png" mode="widthFix" class="icon"></image>
					<view class="text">红包</view>
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
	import Vue from 'vue';
	import wsRequest from '../../js_sdk/websocket.js';
	export default {
		data() {
			return {
				imageStyles:{
					width:40,
					height:40,
					border:{
						color:"#8799a3",
						width:2,
						style:'solid',
						radius:'50%',
					}
				},
				imageValue: [],
				imglist: [],
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
				emojis: ["face[微笑]", "face[嘻嘻]", "face[哈哈]", "face[可爱]", "face[可怜]", "face[挖鼻]", "face[吃惊]", "face[害羞]",
					"face[挤眼]", "face[闭嘴]", "face[鄙视]",
					"face[爱你]", "face[泪]", "face[偷笑]", "face[亲亲]", "face[生病]", "face[太开心]", "face[白眼]", "face[右哼哼]",
					"face[左哼哼]", "face[嘘]", "face[衰]",
					"face[委屈]", "face[吐]", "face[哈欠]", "face[抱抱]", "face[怒]", "face[疑问]", "face[馋嘴]", "face[拜拜]",
					"face[思考]", "face[汗]", "face[困]", "face[睡]",
					"face[钱]", "face[失望]", "face[酷]", "face[色]", "face[哼]", "face[鼓掌]", "face[晕]", "face[悲伤]",
					"face[抓狂]", "face[黑线]", "face[阴险]", "face[怒骂]",
					"face[互粉]", "face[心]", "face[伤心]", "face[猪头]", "face[熊猫]", "face[兔子]", "face[ok]", "face[耶]",
					"face[good]", "face[NO]", "face[赞]",
					"face[来]", "face[弱]", "face[草泥马]", "face[神马]", "face[囧]", "face[浮云]", "face[给力]", "face[围观]",
					"face[威武]", "face[奥特曼]", "face[礼物]",
					"face[钟]", "face[话筒]", "face[蜡烛]", "face[蛋糕]"
				],
				showEmoji: false,
				showFile: false,
				showmove: false,
				loadingmore: false,
				scrollHeight: 'auto',
				modalName: null,
				iStatusBarHeight: 20,
				InputBottom: 0,
				chattopid: 0,
				newcid: 0,
				content: '',
				scrollViewId: '', // 滚动到最底部
				onlinenumber: 0,
				stopload: 0,
				pageHeight: 0,
				chatlist: []
			};
		},
		methods: {
			hideModal(e) {
				this.modalName = null
			},
			tabSelect(e) {
				this.InputBottom = e.detail.height
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			chonglian(e) {
				this.modalName = 'dxcl';
			},
			restart(e) {
				plus.runtime.restart();
			},
			// 设置scroll的高度
			setScrollHeight(descHeight = 0) {
				// #ifdef MP-WEIXIN
				this.scrollHeight = `calc(100vh - 110rpx - ${descHeight}px)`
				// #endif
				// #ifdef APP-PLUS
				this.scrollHeight = `calc(100vh - 110upx - ${descHeight}px)`
				// #endif
				// #ifdef H5
				this.scrollHeight = `calc(100vh - 110upx - 88rpx - ${descHeight}px)`
				// #endif
			},
			// 切换选择
			togglePicker(height = 0, type = '') {
				this.showEmoji = false
				this.showFile = false
				let status = height > 0 ? true : false

				switch (type) {
					case 'emoji':
						this.showEmoji = status;
						break
					case 'file':
						this.showFile = status;
						break
				}

				this.showmove = false;

				setTimeout(() => {
					this.setScrollHeight(height);
					this.scrollToBottom();
					console.log(this.showmove)
				}, 50)
				setTimeout(() => {
					this.showmove = true;
				}, 1000)
			},
			// 初始化滚动
			initScrollBar() {
				setTimeout(() => {
					this.scrollViewId = ''
					setTimeout(() => {
						this.scrollViewId = 'bottom'
						setTimeout(() => {
							this.scrollViewId = ''
						}, 100)
					}, 100)
				}, 100)
			},
			faces(e) {
				let alt = ["[微笑]", "[嘻嘻]", "[哈哈]", "[可爱]", "[可怜]", "[挖鼻]", "[吃惊]", "[害羞]", "[挤眼]", "[闭嘴]", "[鄙视]",
					"[爱你]", "[泪]", "[偷笑]", "[亲亲]", "[生病]", "[太开心]", "[白眼]", "[右哼哼]", "[左哼哼]", "[嘘]", "[衰]",
					"[委屈]", "[吐]", "[哈欠]", "[抱抱]", "[怒]", "[疑问]", "[馋嘴]", "[拜拜]", "[思考]", "[汗]", "[困]", "[睡]",
					"[钱]", "[失望]", "[酷]", "[色]", "[哼]", "[鼓掌]", "[晕]", "[悲伤]", "[抓狂]", "[黑线]", "[阴险]", "[怒骂]",
					"[互粉]", "[心]", "[伤心]", "[猪头]", "[熊猫]", "[兔子]", "[ok]", "[耶]", "[good]", "[NO]", "[赞]",
					"[来]", "[弱]", "[草泥马]", "[神马]", "[囧]", "[浮云]", "[给力]", "[围观]", "[威武]", "[奥特曼]", "[礼物]",
					"[钟]", "[话筒]", "[蜡烛]", "[蛋糕]"
				];
				let index = alt.indexOf(e);
				let image = getApp().globalData.zddomain +
					'source/plugin/heart_im/layui/images/face/' + index + '.gif';
				return image;
			},
			emojireplace(array) {
				let that = this;
				let emojiarray = array.replace(/face\[([^\s\[\]]+?)\]/g, function(face) { //转义表情
					let alt = face.replace(/^face/g, '');
					return '<img alt="' + alt + '" title="' + alt + '" src="' + that.faces(alt) + '">';
				});
				console.log(emojiarray);
				return emojiarray;
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
				//console.log(this.$socket);
				this.$socket.send(JSON.stringify(data));
			},
			scrollToBottom: function() {
				if(this.stopload>1){
					return ;
				}
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
				setTimeout(() => {
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
			sendmessage(){
				let hour = ("0" + new Date().getHours()).slice(-2);
				let minute = ("0" + new Date().getMinutes()).slice(-2);
				let second = ("0" + new Date().getSeconds()).slice(-2);
								// 拼接
				let result = hour + ":" + minute + ":" + second;
				let minearray = {
					"avatar": "https://bbs.zdfx.net/uc_server/avatar.php?uid=" + this.$uid + "&size=small&ts=1",
					"content": this.content,
					"username": this.$username,
					"id": this.$uid,
					"mine": true
				};
				let toarray = {
					"groupname": "公共群组",
					"id": -1,
					"avatar": "source/plugin/heart_im/img/group.png",
					"name": "公共群组",
					"remark": "",
					"type": "group"
				};
				let dataarray = {
					"mine": minearray,
					"to": toarray,
				};
				let chatmess = {
					"cmd": "chat",
					"data": dataarray,
				};
				console.log(chatmess);
				this.$socket.send(JSON.stringify(chatmess));
				this.content = "";
				console.log(this.content);
			},
			success(e) {
				let hour = ("0" + new Date().getHours()).slice(-2);
				let minute = ("0" + new Date().getMinutes()).slice(-2);
				let second = ("0" + new Date().getSeconds()).slice(-2);
								// 拼接
				let result = hour + ":" + minute + ":" + second;
				let minearray = {
					"avatar": "https://bbs.zdfx.net/uc_server/avatar.php?uid=" + this.$uid + "&size=small&ts=1",
					"content": "img[" + e.tempFilePaths + "]",
					"username": this.$username,
					"id": this.$uid,
					"mine": true
				};
				let toarray = {
					"groupname": "公共群组",
					"id": -1,
					"avatar": "source/plugin/heart_im/img/group.png",
					"name": "公共群组",
					"remark": "图片",
					"type": "group"
				};
				let dataarray = {
					"mine": minearray,
					"to": toarray,
				};
				let chatmess = {
					"cmd": "chat",
					"data": dataarray,
				};
				console.log(chatmess);
				this.$socket.send(JSON.stringify(chatmess));
				this.content = "";
				console.log(this.content);
			},
			retriveload(e) {
				this.stopload = 1;
			},
			getchatmessage(e) {
				var that = this;
				this.stopload++;
				console.log(this.stopload);
				this.loadingmore = true;
				uni.request({
					url: 'https://lt.zdfx.net:8089/index.php?m=im&a=chatlog&from=bbs.zdfx.net&id=-1&type=group', //获取轮播列表
					method: 'GET',
					timeout: 10000,
					data: {
						uid: that.$uid,
						page: that.chattopid,
						auth: that.$htauth
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						let chatmess = JSON.parse(res.data.substr(1, (res.data.length - 2)));
						console.log(chatmess);
						for (let i = 0; i < chatmess.length; ++i) {
							if (chatmess[i].remark == '图片') {
								let regex2 = /img\[(.+?)\]/g;
								chatmess[i].content.match(regex2);
								console.log(RegExp.$1);
								chatmess[i].content = RegExp.$1;
							};
							if (chatmess[i].remark == '表情') {
								chatmess[i].content = that.emojireplace(chatmess[i].content);
							}
						};
						that.chatlist.unshift(chatmess[4]);
						that.chatlist.unshift(chatmess[3]);
						that.chatlist.unshift(chatmess[2]);
						that.chatlist.unshift(chatmess[1]);
						that.chatlist.unshift(chatmess[0]);
						that.chattopid = chatmess[0].cid;
						if(chatmess[4].cid > that.newcid){
							that.newcid = chatmess[4].cid + 1;
							uni.setStorage({
								key: 'chatchannel',
								data: chatmess[4].cid,
								success: function() {
									Vue.prototype.$chatid = chatmess[4].cid
									//console.log(Vue.prototype.$switchbvalue);
								}
							});
						}
						//console.log(that.$htauth);
						that.loadingmore = false;
						console.log(that.chatlist);
					}
				});
			},
		},
		onLoad: function() {
			if (this.$token == '') {
				uni.redirectTo({
					url: '../../components/ay-login/login-password'
				});
			};
			uni.$on('websocketmessage2', (websocketmessage) => {
				this.websocketmessage = websocketmessage;
				var jsonget = JSON.parse(this.websocketmessage.data)
				if (jsonget.cmd == "onlinecheck" && jsonget.type == "group") {
					this.onlinenumber = jsonget.status;
				} else if (jsonget.cmd == "chat" || jsonget.cmd == 'remove') {
					if (jsonget.remark == '图片') {
						let regex2 = /img\[(.+?)\]/g;
						jsonget.content.match(regex2);
						console.log(RegExp.$1);
						jsonget.content = RegExp.$1;
					};
					if (jsonget.remark == '表情') {
						jsonget.content = this.emojireplace(jsonget.content);
					};
					if (jsonget.cmd == 'remove') {
						let that = this;
						console.log(jsonget.cid);
						this.chatlist.find(function(item, i){
						    if(item.cid == jsonget.cid){
						        console.log(i);
								that.chatlist[i].content = jsonget.content;
						    }
						})
					};
					if (jsonget.cmd != 'remove') {
						console.log(jsonget);
						this.chatlist.push(jsonget);
						this.scrollToBottom();
					}
					this.newcid = jsonget.cid + 1;
					uni.setStorage({
						key: 'chatchannel',
						data: jsonget.cid,
						success: function() {
							Vue.prototype.$chatid = jsonget.cid
							//console.log(Vue.prototype.$switchbvalue);
						}
					});
				}
			});
			this.getchatmessage();
		},
		onPageScroll() {
			if (this.showmove) {
				this.showFile = false
				this.showEmoji = false
				this.showmove = false;
			}
		},
		onReady: function() {
			this.scrollToBottom();
			console.log(this.$username)
		},
		onShow: function() {
			let that=this;
			let data = {
				"cmd": "onlinecheck",
				"type": "group",
				"id": -1
			};
			if(this.$socket == undefined){
				let websocket = new wsRequest("wss://lt.zdfx.net:8586/", 10000);
				Vue.prototype.$socket = websocket;
			}
			setTimeout(()=>{
				this.$socket.reconnect();
				this.loginchat();
				this.$socket.send(JSON.stringify(data));
				console.log("断线重连")
			},4000)
			setTimeout(function() {
				console.log(that.chatonline);
				if(that.chatonline==0){
					that.chonglian();
				}
			}, 2000)
		},
		onUnload() {
			// 移除监听事件  
			uni.$off('websocketmessage2');
			console.log("移除监听");
		},
	}
</script>

<style lang="scss" scoped>
	.status_bar,
	.container,
	.header,
	.emoji,
	.file {
		background-color: white;
	}

	.emoji {
		height: 400upx;
		padding: 0 0 20upx 20upx;
		position: relative;

		.list {
			width: 100%;
			height: 400upx;
			padding: 20upx 0;
			overflow-y: auto;

			.item {
				float: left;
				display: block;
				height: 60upx;
				line-height: 60upx;
				width: calc(100% / 12);
				margin-right: 20upx;
			}
		}
	}

	.file {
		padding: 30upx 20upx;

		.list {
			overflow: hidden;
			padding-left: 10upx;
			justify-content: flex-start;
		}

		.item {
			float: left;
			width: 110upx;
			height: 200upx;
			border-radius: 10upx;
			margin-right: 40upx;
			background-color: #FFF;

			.icon {
				width: 50upx;
			}

			.text {
				font-size: 0.8rem;;
				margin-top: 4upx;
			}
		}
	}

	uni-view.author {
		position: absolute;
		font-size: 0.7rem;
		color: #8799a3;
		width: calc(100% - 160px);
		top: -15upx;
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
	.icon{
		width:45upx;
		height:45upx;
	}
</style>
