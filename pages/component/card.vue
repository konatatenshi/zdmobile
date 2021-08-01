<template>
	<view>
		<cu-custom class="statustop" bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{postname}}</block>
		</cu-custom>
		<view class="cu-card dynamic no-card" :style="'margin-top: -' + iStatusBarHeight +'px;'">
			<view class="cu-item shadow">
				<view class="title">
					<view class="text-cut">{{postname}}</view>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + avatarlist + ')' }]">
							<view v-show="sex==1" class="cu-tag badge cuIcon-male bg-blue"></view>
							<view v-show="sex==2" class="cu-tag badge cuIcon-female bg-pink"></view>
						</view>
						<view class="content flex-sub">
							<view>{{postup}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{nowdate}}
							</view>
						</view>
					</view>
				</view>
				<view class="text-content2">
					<mp-html :content="content" @linktap="linktap" />
				</view>
				<view class="cu-list menu-avatar comment solids-top" v-for="(item,index) in huifulist" :key="index" :data-id="index">
					<view class="cu-item">
						<view class="cu-avatar round" :style="[{ backgroundImage:'url(' + item.avatarlist + ')' }]">
						</view>
						<view class="content">
							<view class="flex justify-between">
								<view class="text-grey">{{item.author}}</view>
								<view class="text-grey text-sm">{{index+2}}楼</view>
							</view>
							<view class="flex justify-between">
								<view class="text-gray text-df">{{item.dateline}}</view>
							</view>
							<mp-html v-if="item.status&1" class="text-content text-df float" :class="isfloat[index]?'show':'hide'"
								:content="pingbi" @linktap="linktap" />
							<mp-html v-else-if="!isfloat[index]" class="text-content text-df float" :class="isfloat[index]?'show':'hide'"
								:content="jiequ(item.html)" @linktap="linktap" />
							<mp-html v-else class="text-content text-df float" :class="isfloat[index]?'show':'hide'"
								:content="item.html" @linktap="linktap" />
							<view class="text-blue" v-if="item.html.length>180&&isfloat[index]!= true"
								@tap="loadmore(index)">展开</view>
							<view class="margin-top-sm flex justify-between">
								<view>
									<text class="cuIcon-appreciatefill" :class="item.zan?'text-red':'text-gray'"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
								</view>
								<view>
									<text class="cuIcon-more text-gray margin-right-sm"></text>
								</view>
							</view>
							<view v-if="item.reply>0" class="bg-gray padding-sm radius margin-top-sm  text-sm">
								<view class="flex" v-for="(rpitem,rpindex) in item.floor" :key="'b' + rpindex"
									:data-id="rpindex">
									<view class="text-blue">{{rpitem.username}}：</view>
									<view class="flex-sub"><rich-text :nodes="rpitem.content" @linktap="linktap"></rich-text></view>
								</view>
								<view class="flex" v-for="(rpxitem,rpxindex) in rplist[item.pid]" :key="'c' + rpxindex"
									:data-id="rpxindex">
									<view class="text-blue">{{rpxitem.username}}：</view>
									<view class="flex-sub"><mp-html class="flex-sub" :content="rpxitem.content" @linktap="linktap" /></view>
								</view>
								<view class="flex text-blue" v-if="item.reply>5&&jiazaiwanbi[item.pid]!=1&&jiazai==0" @tap="loadfloor(item.pid)">共
									{{item.reply}} 条回复<text class="cuIcon-right"></text>
								</view>
								<view class="flex text-blue" v-else-if="item.reply>5&&jiazaiwanbi[item.pid]!=1&&jiazai==1">加载中<text class="cuIcon-right"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view>
					<block>
						<view class="padding-xs flex align-center bg-gray">
							<view class="flex-sub text-center">
								<view class="text-xs padding">
									<text class="text-black">{{loading}}</text>
								</view>
							</view>
						</view>
					</block>
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
				<view class="cu-modal" :class="modalName=='cantview'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">权限不足</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							无法进入帖子，错误提示：{{cantviewmessage}}
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
								<button class="cu-btn bg-green margin-left" @tap="tologin">确定</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='postnew'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">发表回复成功</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							发表错误成功，请点击确定刷新帖子。
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
								<button class="cu-btn bg-green margin-left" @tap="refresh">确定</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="showEmoji?'show':''" @tap.prevent.stop="">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">请选择表情</view>
							<view class="action" @tap="closeemoji">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl emoji">
							<view class="list">
								<view class="item" @tap="contenthuifu += item" v-for="(item, index) in emojis"
									:key="index">
									<img-cache class="icon"
										:src="'https://bbs.zdfx.net/static/image/smiley/tieba/' + index + '.png'">
									</img-cache>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar foot input button__box" :style="[{bottom:InputBottom+'px'}]">
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
				@focus="InputFocus" @blur="InputBlur" v-model="contenthuifu"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey" @tap="togglePicker(200, 'emoji')"></text>
				<text class="cuIcon-roundadd text-grey" @tap="togglePicker(100, 'file')"></text>
			</view>
			<button @tap="sendmessage" class="cu-btn bg-green shadow"><text class="cuIconfont-spin" :class="fasong?'cuIcon-loading2':''"></text>发送</button>
		</view>
		<!--表情-->
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
	</view>
</template>

<script>
	import Vue from 'vue'
	import mpHtml from '@/components/mp-html/mp-html'
	export default {
		components: {
			mpHtml
		},
		data() {
			return {
				isCard: false,
				postname: '加载中',
				contenthuifu: '',
				content: '<span style="font-size:28rpx;line-height:1px;">⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣴⣴⣶⣶⣶⣶⣄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣠⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣤⣤⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⡧⣼⣿⡟⢛⠋⠐⠂⠰⠂⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣰⣯⣟⣿⣻⣿⣿⣿⣿⣿⣿⣥⠨⠭⣯⡾⢡⠄⠄⠄⡐⠁⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡶⣦⠌⢝⢢⡔⠈⠠⠁⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢻⣿⣿⢻⣿⣿⡏⡿⣿⣿⣿⣿⣿⣻⣧⣿⣿⣟⠁⠄⣠⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠊⣯⢿⡏⠛⠛⠚⣿⣿⡟⡿⠉⢻⣽⣒⣿⣏⠄⢣⡄⣃⡀⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣿⠄⠄⠄⠄⠄⠈⠉⠄⣇⣰⣿⣿⣿⣿⣿⡔⠄⠁⠄⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣿⢦⡀⠄⠄⠄⠄⠄⢰⣿⣿⣿⣿⣿⢿⡟⠚⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠟⣸⡿⣷⢶⣤⠤⠄⣞⣿⣿⣿⣟⡟⡛⠣⡠⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠘⢕⣶⡜⠛⢀⣥⣾⣿⣿⣿⣿⣿⣿⣄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⡀⢼⢃⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⡁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠄⠄⠄⠠⠄⠄⣿⣿⣫⣷⣯⣿⣷⣿⣿⣽⣿⣿⣿⣿⣿⣿⡇⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠄⢀⣰⡇⠄⠄⣿⠄⠄⠄⠄⠄⠄⠈⠄⠄⢸⣿⣿⣿⣿⣿⣿⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⢀⣾⣿⡇⠄⠄⣿⠄⠄⠄⠄⣀⣀⣀⣢⣄⣺⣿⣿⣿⣿⣿⣿⠘⠄⢄⠄⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⣼⣿⣿⣧⢀⣤⡿⠛⠛⠛⠋⠉⠛⠋⠋⢿⢿⣿⣿⣿⣿⣿⣿⠄⠄⠄⠐⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⣿⣿⣿⣿⣿⣿⠁⠄⠄⠄⠄⠄⠄⠄⠄⢀⣾⣿⣿⣿⣿⣿⣿⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⣿⣿⣿⣿⣿⣿⣶⣶⣾⡿⡷⡞⣟⣿⣽⣿⣿⣿⣿⣿⣿⣿⡇⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⢠⣿⣿⣿⣿⣿⡿⣿⣿⣷⣷⣷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠄⠄⠄⠄⠄⠄⠄⠄⡀⠄⠄<br>⠄⠄⠄⠄⠄⢸⣿⣿⣿⣿⣿⣹⣿⣿⣿⠟⠋⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠄⠄⠄⠠⣤⠄⡤⠤⠄⠄⠄<br>⠄⠄⠄⠄⠄⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠄⠄⠄⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣀⣀⣸⡜⠓⠆⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⣿⣿⣿⣿⣿⣿⣿⣿⣿⡈⠄⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⢀⠄⠄⠄⠄⠄⠄</span><br><span style="font-size:30rpx;line-height:1px;">⠄⠄⠄⠄⠄⠄⠄⠄帖子正在载入中，请稍候⠄⠄⠄⠄⠄⠄⠄⠄</span>',
				postup: '加载中',
				nowdate: '加载中',
				pingbi: '<div style=\"overflow: hidden;border: 1px dashed #FF9A9A;margin: 8px 0;padding: 10px;zoom: 1;\">此帖因违规被屏蔽，不可见。</div>',
				cantviewmessage: '',
				iStatusBarHeight: 0,
				sex: 0,
				tid: 0,
				fid: 0,
				page: 0,
				fasong: false,
				floorpage: [],
				jiazai :0,
				jiazaiwanbi: [],
				InputBottom: 0,
				platform: 0,
				huifulist: [],
				rplist: [],
				isfloat: [],
				isfloats: false,
				modalName: null,
				loading: "上拉可加载更多回复",
				avatarlist: '../../static/avatar.jpg',
				emojis: ["{:4_91:}","{:4_107:}", "{:4_100:}", "{:4_115:}", "{:4_104:}", "{:4_98:}", "{:4_114:}", "{:4_88:}",
					"{:4_87:}", "{:4_135:}", "{:4_131:}", "{:4_134:}", "{:4_106:}", "{:4_99:}", "{:4_93:}",
					"{:4_103:}", "{:4_120:}", "{:4_125:}", "{:4_108:}", "{:4_95:}", "{:4_102:}", "{:4_121:}",
					"{:4_126:}", "{:4_129:}", "{:4_119:}", "{:4_127:}", "{:4_132:}", "{:4_133:}", "{:4_112:}",
					"{:4_128:}", "{:4_122:}", "{:4_124:}", "{:4_130:}", "{:4_97:}", "{:4_111:}", "{:4_90:}",
					"{:4_117:}", "{:4_94:}", "{:4_113:}", "{:4_89:}", "{:4_96:}", "{:4_109:}", "{:4_92:}", "{:4_118:}",
					"{:4_101:}", "{:4_123:}", "{:4_116:}", "{:4_105:}"
				],
				showEmoji: false,
				showFile: false,
				showmove: false,
			};
		},
		methods: {
			hideModal(e) {
				this.modalName = null
			},
			jiequ(e) {
				return e.substr(0,300);
			},
			closeemoji(e) {
				this.showEmoji = false
			},
			loadmore(e) {
				Vue.set(this.isfloat, e, true);
				console.log(e);
				console.log(this.isfloat[e]);
			},
			loadfloor(e) {
				if(this.floorpage[e] == undefined){
					this.floorpage[e] = 0;
				}
				this.loadfloors(e, this.floorpage[e]);
			},
			linktap(e) {
				console.log(e);
				if (e.target == 'app') {
					uni.navigateTo({
						url: '../component/card?tid=' + e.apphref
					});
				}
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
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
				setTimeout(() => {
					that.scrollTop(that.pageHeight)
				}, 200);
			},
			scrollTop(e) {
				uni.pageScrollTo({
					scrollTop: e,
					duration: 300
				});
			},
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
			sendmessage() {
				var that=this;
				if(!this.fasong){
					that.fasong=true;
					var message = encodeURI(that.contenthuifu);
					console.log(this.contenthuifu);
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:huitie', //获取置顶帖子
						method: 'POST',
						timeout: 10000,
						data: {
							token: that.$token,
							tid: that.tid,
							message: message,
							platform: that.platform
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							if (res.data.code == 404) {
								that.modalName = "needlogin";
							} else if (res.data.code == 401) {
								that.modalName = "cantview";
								that.cantviewmessage = res.data.message;
							} else {
								that.refresh(message);
							}
						}
					});
				}
			},
			tologin(e) {
				uni.redirectTo({
					url: '../../components/ay-login/login-password'
				});
			},
			refresh(e) {
				var fasonginfo = new Array();
				fasonginfo.author = this.$username;
				fasonginfo.authorid = this.$uid;
				fasonginfo.avatarlist = 'https://zd.tiangal.com/uc_server/avatar.php?uid='+ this.$uid +'&size=small';
				fasonginfo.dateline = '刚刚';
				fasonginfo.groupid = 0;
				fasonginfo.html = decodeURI(e);
				fasonginfo.pid = 0;
				fasonginfo.position = 0;
				fasonginfo.reply = 0;
				fasonginfo.status = 0;
				this.huifulist.unshift(fasonginfo);
				this.modalName = null
				this.contenthuifu = '';
				this.loadthread(this.tid);
				this.fasong = false;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
			topost(e) {
				uni.navigateTo({
					url: '../component/card?tid=' + e
				});
			},
			tobar(e) {
				plus.runtime.restart();
			},
			tothebottom() {
				this.loadhuifu(this.tid, this.page, '', '', '', '1');
				console.log("到底了");
			},
			IsCard(e) {
				this.isCard = e.detail.value
			},
			cb(e) {
				if (e.target.nodeName === 'A') {
					// 获取触发事件对象的属性
					this.$emit('cb');
					var url = e.target.getAttribute('href');
					console.log(url);
				}
			},
			setHeight(e) {
				var query = uni.createSelectorQuery();
				query.select('.' + e).boundingClientRect(rect => {
					if (rect) {
						//console.log(e + ".height = " + rect.height)
						this.swiperheight = rect.height; //页面可见区域 - 头部高度
						//console.log("this.height = " + this.swiperheight)
					}
				}).exec();

			},
			loadthread(tid, page, orderby, dateline, filter, typeid) {
				let that = this;
				if (this.$imageswitch && this.$wifi == 0) {
					var isImage = 0;
				} else {
					var isImage = 1;
				}
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:post', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						tid: tid,
						page: page,
						orderby: orderby,
						dateline: dateline,
						filter: filter,
						isimage: isImage,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.code == 404) {
							that.modalName = "needlogin";
						} else if (res.data.code == 401) {
							that.modalName = "cantview";
							that.cantviewmessage = res.data.message;
						} else {
							that.postup = res.data.author;
							that.fid = res.data.fid;
							that.postname = res.data.subject;
							that.content = res.data.html;
							that.avatarlist = res.data.userinfo.avatarlist;
							that.nowdate = res.data.nowdate;
							that.sex = res.data.userinfo.sex;
							//console.log(that.threadlist);
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
						}
					}
				});
			},
			loadfloors(pid, page, orderby, dateline, filter) {
				let that = this;
				this.jiazai = 1;
				if (this.$imageswitch && this.$wifi == 0) {
					var isImage = 0;
				} else {
					var isImage = 1;
				}
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:post', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						pid: pid,
						page: page,
						orderby: orderby,
						dateline: dateline,
						filter: filter,
						isimage: isImage,
						typeid: 2
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
							console.log(page);
							if (page == 0) {
								Vue.set(that.rplist, pid, res.data);
							} else {
								for (let i = 0; i < res.data.length; ++i) {
									that.rplist[pid].push(res.data[i]);
								}
							}
							if (res.data.length < 30) {
								that.jiazaiwanbi[pid] = 1;
								Vue.set(that.jiazaiwanbi, pid, 1);
							}
							console.log(res.data);
							that.floorpage[pid]++;
							that.jiazai=0;
					}
				});
			},
			loadhuifu(tid, page, orderby, dateline, filter, typeid) {
				let that = this;
				if (this.$imageswitch && this.$wifi == 0) {
					var isImage = 0;
				} else {
					var isImage = 1;
				}
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:post', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						tid: tid,
						page: page,
						orderby: orderby,
						dateline: dateline,
						filter: filter,
						typeid: typeid,
						isimage: isImage,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.code == 404) {
							that.modalName = "needlogin";
						} else if (res.data.code == 401) {
							that.modalName = "cantview";
							that.cantviewmessage = res.data.message;
						} else {
							if (that.page == 0) {
								that.huifulist = res.data;
							} else {
								for (let i = 0; i < res.data.length; ++i) {
									that.huifulist.push(res.data[i]);
								}
								if (res.data.length < 30) {
									that.loading = '到底了。';
								}
							}
							console.log(res.data);
							that.page++;
						}
					}
				});
			},
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			this.tid = option.tid;
			console.log(option.tid); //打印出上个页面传递的参数。
			this.loadthread(this.tid);
			this.loadhuifu(this.tid, this.page, '', '', '', '1');
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			if(uni.getSystemInfoSync().platform=='ios'){
				this.platform = 1;
			}else{
				this.platform = 2;
			}
		},
		onShow: function() {},
		onPageScroll() {
			if (this.showmove) {
				this.showFile = false
				this.showEmoji = false
				this.showmove = false;
			}
		},
		onReachBottom() {
			this.tothebottom();
		}
	}
</script>

<style lang="scss" scoped>
	.text-content2 {
		padding: 0 30upx 0;
		font-size: 30upx;
		margin-bottom: 20upx;
	}

	.cu-item .title {
		font-size: 40upx;
		font-weight: 900;
		color: #333333;
		line-height: 100upx;
		padding: 0 30upx;
	}

	.float {
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.hide {
		display: -webkit-box;
	}

	.show {
		display: block;
	}

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
				width: calc(100% / 11);
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
				font-size: 24upx;
				margin-top: 4upx;
			}
		}
	}

	.icon {
		width: 48upx;
		height: 48upx;
	}
	.cu-list{
		margin-top: -10upx!important;
	}
	.solids-top::after {
		border-top: 1px solid #eee!important;
	}
</style>
