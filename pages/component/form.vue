<template>
	<view>
		<cu-custom class="statustop" bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">楼中楼详情</block>
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
					<view v-if="content==''" class="cu-load text-gray loading"></view>
					<mp-html :content="content" @linktap="linktap" />
					<view class="margin-top-sm flex justify-between">
						<view>
							<text class="cuIcon-appreciatefill" :class="zan?'text-red':'text-gray'"></text>
							<text class="cuIcon-messagefill text-gray margin-left-sm" @tap="lzpo()"></text>
						</view>
						<view>
							<text class="cuIcon-more text-gray margin-right-sm"></text>
						</view>
					</view>
				</view>
				<view class="cu-list menu-avatar comment solids-top" v-for="(item,index) in huifulist" :key="index" :data-id="index">
					<view v-if="index==0" class="text-grey margin-left">
						<view class="text-sm">共有相关评论 {{count}} 个</view>
					</view>
					<view class="cu-item">
						<view class="cu-avatar round" :style="[{ backgroundImage:'url(https://zd.tiangal.com/uc_server/avatar.php?uid=41070' + item.uid + '&size=small)' }]">
						</view>
						<view class="content">
							<view class="flex justify-between">
								<view class="text-grey">{{item.username}}</view>
								<view class="text-grey text-sm">{{index+2}}楼</view>
							</view>
							<view class="flex justify-between">
								<view class="text-gray text-sm">{{item.dateline}}</view>
							</view>
							<mp-html v-if="!isfloat[index]" class="text-content text-df float" :class="isfloat[index]?'show':'hide'"
								:content="jiequ(item.content)" @linktap="linktap" />
							<mp-html v-else class="text-content text-df float" :class="isfloat[index]?'show':'hide'"
								:content="item.content" @linktap="linktap" />
							<view class="text-blue" v-if="Letter(item.content).length>140&&isfloat[index]!= true"
								@tap="loadmore(index)">展开</view>
							<view class="margin-top-sm flex justify-between">
								<view>
									<text class="cuIcon-appreciatefill" :class="agree(item.agree)?'text-red':'text-gray'">{{agree(item.agree)}}</text>
									<text class="cuIcon-messagefill text-gray margin-left-sm" @tap="lzpo(item.uid)"></text>
								</view>
								<view>
									<text class="cuIcon-more text-gray margin-right-sm"></text>
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
								<button class="cu-btn bg-green margin-left" @tap="back">确定</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='cantpost'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">回帖错误</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							无法回帖，错误提示：{{cantpostmessage}}
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='floorpost'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">楼中楼回复</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							<view class="cu-form-group align-start">
								<textarea maxlength="-1" v-model="floorhuifu" placeholder="请在此输入想要说的话"></textarea>
								<text class="cuIcon-emojifill text-grey" @tap="togglePicker(200, 'emoji')"></text>
							</view>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn bg-green margin-left" @tap="sendfloor">发送</button>
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
								<view class="item" @tap="floorhuif(item)" v-for="(item, index) in emojis"
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
		<view class="load-progress" v-show="loadProgress!=0" :style="[{top:CustomBar+'px'}]">
			<view class="load-progress-bar bg-green" :style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
			<view class="load-progress-spinner text-green"></view>
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
				floorhuifu: '',
				content: '',
				postup: '加载中',
				nowdate: '加载中',
				pingbi: '<div style=\"overflow: hidden;border: 1px dashed #FF9A9A;margin: 8px 0;padding: 10px;zoom: 1;\">此帖因违规被屏蔽，不可见。</div>',
				cantviewmessage: '',
				cantpostmessage: '',
				iStatusBarHeight: 0,
				sex: 0,
				count: 0,
				zan: 0,
				tid: 0,
				fid: 0,
				pid: 0,
				page: 0,
				toUID: 0,
				toPID: 0,
				index: 0,
				loadwb: 0,
				loadProgress: 0,
				fasong: false,
				floorfasong: false,
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
			agree(e) {
				if(e>0){
					return e;
				}else{
					return '';
				}
			},
			Letter(str) {
				let result;		
				let reg = /[a-zA-Z]+/;  //[a-zA-Z]表示匹配字母，g表示全局匹配			
				while (result = str.match(reg)) { //判断str.match(reg)是否没有字母了			
					str = str.replace(result[0], ''); //替换掉字母  result[0] 是 str.match(reg)匹配到的字母			
				}			
			  return str;			
			},
			closeemoji(e) {
				this.showEmoji = false
			},
			back(){
				uni.navigateBack();
			},
			LoadProgresss(e) {
				this.loadProgress = this.loadProgress + 3;
				if (this.loadProgress < 100) {
					if(this.loadwb == 1){
						this.loadProgress = 0;
						return;
					}
					console.log(this.loadProgress);
					setTimeout(() => {
						this.LoadProgresss();
					}, 100)
				} else {
					this.loadProgress = 0;
				}
			},
			loadmore(e) {
				Vue.set(this.isfloat, e, true);
				console.log(e);
				console.log(this.isfloat[e]);
			},
			loadfloor(e,j) {
				if(this.floorpage[j] == undefined){
					this.floorpage[j] = 0;
				}
				this.loadfloors(e, this.floorpage[j],0,0,0,j);
			},
			doNothing:function(){
				
			},
			lzlpo(e,f,g) {
				console.log(e);
				console.log(f);
				this.toUID = e;
				this.toPID = f;
				this.modalName='floorpost';
				this.index = g;
			},
			lzpo(f) {
				console.log(f);
				this.toUID = f;
				this.toPID = this.pid;
				this.modalName='floorpost';
			},
			floorhuif(e){
				if(this.modalName =='floorpost'){
					this.floorhuifu += e;
					this.showEmoji = false;
				}else{
					this.contenthuifu += e;
					this.showEmoji = false;
				}
			},
			linktap(e) {
				console.log(e);
				if (e.target == 'app') {
					uni.navigateTo({
						url: '../component/card?tid=' + e.apphref,
						animationType: 'pop-in',
						animationDuration: 200
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
				console.log(that.contenthuifu.length);
				if(that.contenthuifu.length<5){
					that.modalName = "cantpost";
					that.cantpostmessage = '请输入大于4个字的回复内容。';
					this.fasong = false;
					return;
				}
				if(!this.fasong){
					that.fasong=true;
					var message = encodeURI(that.contenthuifu);
					console.log(that.contenthuifu);
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:huitie', //回帖API
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
								that.modalName = "cantpost";
								that.cantpostmessage = res.data.message;
								this.fasong = false;
							} else {
								that.refresh(message);
							}
						}
					});
				}
			},
			sendfloor() {
				var that=this;
				console.log(that.floorhuifu.length);
				if(that.floorhuifu.length<5){
					that.modalName = "cantpost";
					that.cantpostmessage = '请输入大于4个字的回复内容。';
					this.floorfasong = false;
					return;
				}
				if(!this.floorfasong){
					that.floorfasong=true;
					var message = encodeURI(that.floorhuifu);
					console.log(that.floorhuifu);
					console.log(that.toUID);
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:huifloor', //回楼中楼API
						method: 'POST',
						timeout: 10000,
						data: {
							token: that.$token,
							pid: that.toPID,
							message: message,
							touid: that.toUID
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data)
							if (res.data.code == 404) {
								that.modalName = "needlogin";
							} else if (res.data.code == 401) {
								that.modalName = "cantpost";
								that.cantpostmessage = res.data.message;
								this.floorfasong = false;
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
				this.loadthread(this.pid);
				this.fasong = false;
				const query = uni.createSelectorQuery().in(this);
				query.select('.text-content2').boundingClientRect(data => {
					uni.pageScrollTo({
						scrollTop: data.height + 120,
						duration: 300
					})
				}).exec();
			},
			refreshfloor(e) {
				console.log(this.index)
				var fasongf = new Array();
				fasongf.username = this.$username;
				fasongf.uid = this.$uid;
				fasongf.floor = 0;
				fasongf.dateline = '刚刚';
				fasongf.content = '<span style="color:#0081ff;">' + this.$username + '</span>:' + decodeURI(e);
				this.modalName = null
				this.floorhuifu = '';
				this.floorfasong = false;
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
			loadthread(pid, page, orderby, dateline, filter, typeid) {
				let that = this;
				if (this.$imageswitch && this.$wifi == 0) {
					var isImage = 0;
				} else {
					var isImage = 1;
				}
				that.loadwb = 0;
				that.LoadProgresss();
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:post', //获取首帖
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						pid: pid,
						floorpage: page,
						orderby: orderby,
						dateline: dateline,
						typeid: 4,
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
							that.zan = res.data.zan;
							that.count = res.data.count;
							that.postname = res.data.subject;
							that.content = res.data.html;
							that.avatarlist = res.data.userinfo.avatarlist;
							that.nowdate = res.data.nowdate;
							that.sex = res.data.userinfo.sex;
							//console.log(that.threadlist);
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100);
							that.loadwb = 1;
						}
					}
				});
			},
			loadfloors(pid, page, orderby, dateline, filter,index) {
				let that = this;
				this.jiazai = 1;
				if (this.$imageswitch && this.$wifi == 0) {
					var isImage = 0;
				} else {
					var isImage = 1;
				}
				that.loadwb = 0;
				that.LoadProgresss();
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:post', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						pid: pid,
						floorpage: page,
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
								Vue.set(that.rplist, index, res.data);
							} else {
								for (let i = 0; i < res.data.length; ++i) {
									that.rplist[index].push(res.data[i]);
								}
							}
							if (res.data.length < 30) {
								that.jiazaiwanbi[index] = 1;
								Vue.set(that.jiazaiwanbi, index, 1);
							}
							console.log(res.data);
							that.floorpage[index]++;
							that.jiazai=0;
							that.loadwb = 1;
					}
				});
			},
			loadhuifu(pid, page, orderby, dateline, filter, typeid) {
				let that = this;
				if (this.$imageswitch && this.$wifi == 0) {
					var isImage = 0;
				} else {
					var isImage = 1;
				}
				that.loadwb = 0;
				that.LoadProgresss();
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:post', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						pid: pid,
						floorpage: page,
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
							that.loadwb = 1;
						}
					}
				});
			},
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			this.pid = option.pid;
			console.log(option.pid); //打印出上个页面传递的参数。
			this.loadthread(this.pid);
			this.loadhuifu(this.pid, this.page, '', '', '', '3');
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
	.overlayer{
	    position:fixed;
	    left:0;
	    top:0;
	    width:100%;
	    height:100%;
	    z-index:10;
	}
</style>
