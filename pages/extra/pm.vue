<template>
	<view>
		<cu-custom class="statustop" bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">同{{username}}的私聊</block>
		</cu-custom>
		<view class="cu-chat">
			<view v-if="!loadingmore" class="cu-info round" @tap="receivemessage()">{{loading}}</view><view v-else class="cu-load text-gray loading"></view>
			<view v-for="(pvmessage,indexv) in messagearray" :key="indexv">
				<view v-if="pvmessage.authorid==$uid" class="cu-item self">
					<view class="main">
						<view class="content bg-green shadow">
							<text>{{pvmessage.message}}</text>
						</view>
					</view>
					<view class="cu-avatar radius" :style="{'background-image': 'url(https://zd.tiangal.com/uc_server/avatar.php?uid='+ $uid + '&size=small)'}"></view>
					<view class="date">{{todate(pvmessage.dateline)}}</view>
				</view>
				<view v-else class="cu-item">
					<view class="author">{{username}}</view>
					<view class="cu-avatar radius" :style="{'background-image': 'url(https://zd.tiangal.com/uc_server/avatar.php?uid='+ pvmessage.authorid + '&size=small)'}"></view>
					<view class="main">
						<view class="content shadow">
							<text>{{pvmessage.message}}</text>
						</view>
					</view>
					<view class="date ">{{todate(pvmessage.dateline)}}</view>
				</view>
			</view>
		</view>
		<view class="cu-bar foot input button__box" :style="[{bottom:InputBottom+'px'}]">
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
				@focus="InputFocus" @blur="InputBlur" v-model="content"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey" @tap="togglePicker(200, 'emoji')"></text>
				<text class="cuIcon-roundadd text-grey" @tap="togglePicker(100, 'file')"></text>
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
		<view class="cu-modal" :class="jifencaozuo!=0?'show':''">
			<button class="cu-btn margin-sm basis-sm shadow bg-orange"
				:class="jifencaozuo==1?'animation-scale-up':'animation-reverse animation-scale-down'">
				<text class="text-xl text-white text-shadow">{{jifenshuoming}}：</text><text
					class="text-xl text-white text-shadow">{{jifenbiangeng}}</text>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imglist: [],
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
				emojis: ["{:4_91:}", "{:4_107:}", "{:4_100:}", "{:4_115:}", "{:4_104:}", "{:4_98:}", "{:4_114:}",
					"{:4_88:}",
					"{:4_87:}", "{:4_135:}", "{:4_131:}", "{:4_134:}", "{:4_106:}", "{:4_99:}", "{:4_93:}",
					"{:4_103:}", "{:4_120:}", "{:4_125:}", "{:4_108:}", "{:4_95:}", "{:4_102:}", "{:4_121:}",
					"{:4_126:}", "{:4_129:}", "{:4_119:}", "{:4_127:}", "{:4_132:}", "{:4_133:}", "{:4_112:}",
					"{:4_128:}", "{:4_122:}", "{:4_124:}", "{:4_130:}", "{:4_97:}", "{:4_111:}", "{:4_90:}",
					"{:4_117:}", "{:4_94:}", "{:4_113:}", "{:4_89:}", "{:4_96:}", "{:4_109:}", "{:4_92:}", "{:4_118:}",
					"{:4_101:}", "{:4_123:}", "{:4_116:}", "{:4_105:}"
				],
				messagearray: [],
				showEmoji: false,
				showFile: false,
				showmove: false,
				loadingmore: false,
				loading: this.$t('home.clicktoload'),
				scrollHeight: 'auto',
				modalName: null,
				username: '',
				iStatusBarHeight: 20,
				InputBottom: 0,
				content: '',
				scrollViewId: '', // 滚动到最底部
				stopload: 0,
				pageHeight: 0,
				plid: 0,
				page: 0,
				jifencaozuo: 0,
				jifenbiangeng: '积分名+1',
				jifenshuoming: '积分变更',
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
			todate(e) {
				let date = new Date(e * 1000);
				let nowdate = new Date();
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1 < 10 ? '' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let D = date.getDate() + ' ';
				let NY = nowdate.getFullYear() + '-';
				let NM = (nowdate.getMonth() + 1 < 10 ? '' + (nowdate.getMonth() + 1) : nowdate.getMonth() + 1) + '-';
				let ND = nowdate.getDate() + ' ';
				let h = date.getHours()< 10 ?  '0'  + date.getHours() + ':': date.getHours() + ':';
				let m = date.getMinutes()< 10 ?  '0'  + date.getMinutes() + ':': date.getMinutes() + ':';
				let s = date.getSeconds()< 10 ?  '0'  + date.getSeconds(): date.getSeconds();
				//console.log(Y+M+D+h+m+s);
				if(Y==NY&&M==NM&&D==ND){
					return h + m + s;
				}else{
					return Y + M + D + h + m + s;
				}
			},
			receivemessage(){
				let that = this;
				that.loadingmore = true;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:pmview', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						page: that.page,
						type: 'viewpm',
						plid: that.plid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.code == 404) {
							that.loading = this.$t('home.nomoremessage');
							that.loadingmore = false;
							return;
						}
						if(that.page==0){
							that.messagearray = res.data;
						}else{
							for (let i = 0; i < res.data.length; ++i) {
								that.messagearray.unshift(res.data[i]);
							};
						}
						if (res.data.length < 10) {
							that.loading = this.$t('home.nomoremessage');
						} else {
							that.loading = this.$t('home.clicktoload');
						}
						that.page++;
						that.loadingmore = false;
					}
				});
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
			sendmessage(){
				let that = this;
				console.log(this.plid);
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:sendpm', //获取置顶帖子
					method: 'POST',
					timeout: 10000,
					data: {
						token: that.$token,
						action: 'pm_send',
						message: that.content,
						plid: that.plid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.code == 400) {
							that.modalName = "needlogin";
						} else if (res.data.code == 200) {
							that.modalName = null;
							that.jifenbiandong('私信成功', '你的私信发送完毕。');
							that.page = 0;
							that.receivemessage();
							that.scrollToBottom();
							that.content = '';
						} else {
							that.modalName = null;
							that.jifenbiandong('私信失败', res.data.message);
						}
					}
				});
			},
			jifenbiandong(e, f) {
				this.jifenshuoming = e;
				this.jifenbiangeng = f;
				this.jifencaozuo = 1;
				setTimeout(() => {
					this.jifencaozuo = 2;
				}, 1000)
				setTimeout(() => {
					this.jifencaozuo = 0;
				}, 2000)
			},
			getchatmessage(){
				
			}
		},
		onReady: function() {
			this.scrollToBottom();
			console.log(this.$username)
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			this.plid = option.touid;
			this.username = option.username;
			var that = this;
			this.receivemessage();
			console.log(option.touid); //打印出上个页面传递的参数。
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			if (uni.getSystemInfoSync().platform == 'ios') {
				this.platform = 1;
			} else {
				this.platform = 2;
			}
			
		}
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
