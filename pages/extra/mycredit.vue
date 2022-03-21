<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true" class="text-shadow1">
				<block slot="content">我的积分</block>
		</cu-custom>
		<view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<view class="cu-card dynamic cu-list2">
				<view>
					<view class="bg-gradual-red padding-top padding-left padding-right radius text-center shadow-blur">
						<view class="grid col-4 padding-sm">
							<view class="text-content">总积分<br><text class="lg text-yellow cuIcon-card margin-right-xs"></text>{{credit}}</view>
							<view class="text-content" @tap="tojinbi()">金币<br><text class="lg text-yellow cuIcon-choicenessfill margin-right-xs"></text>{{credit1}}<br><text class="text-sm margin-left-xs">获取金币</text><text class="lg text-black cuIcon-right"></text></view>
							<view class="text-content" @tap="todianbi()">点币<br><text class="lg text-yellow cuIcon-creativefill margin-right-xs"></text>{{credit2}}<br><text class="text-sm margin-left-xs">点币来源</text><text class="lg text-black cuIcon-right"></text></view>
							<view class="text-content">宠物经验<br><text class="lg text-yellow cuIcon-babyfill margin-right-xs"></text>{{credit3}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-bar border-custom2">
				<scroll-view  class="list">
					<view class="view_listnow">
						<view class="hometop3">
						</view>
						<view v-if="guanzhupost.length >= 0">
							<block>
								<view class="bg-white padding-top-sm">
									<view class="grid text-center col-3">
										<view class="wid1">操作</view>
										<view class="wid1">积分变更</view>
										<view class="wid8">详情</view>
									</view>
									<view v-for="(itemex,indexe1) in guanzhupost" :key="indexe1">
										<view class="grid text-center col-3">
											<view class="wid1">{{operation(itemex.operation,itemex.title)}}</view>
											<view class="wid1">
												<view v-if="itemex.extcredits1>0">金币<text class="text-red">+{{itemex.extcredits1}}</text></view><view v-else-if="itemex.extcredits1<0">金币<text class="text-red">{{itemex.extcredits1}}</text></view>
												<view v-if="itemex.extcredits2>0">点币<text class="text-red">+{{itemex.extcredits2}}</text></view><view v-else-if="itemex.extcredits2<0">点币<text class="text-red">{{itemex.extcredits2}}</text></view>
												<view v-if="itemex.extcredits3>0">宠物经验<text class="text-red">+{{itemex.extcredits3}}</text></view><view v-else-if="itemex.extcredits3<0">宠物经验<text class="text-red">{{itemex.extcredits3}}</text></view>
											</view>
											<view class="wid8">{{xiangqing(itemex.operation,itemex.text,itemex.relatedid)}}<text class="text-center text-shadow text-green" v-if="itemex.text==''||itemex.operation=='ECU'" @tap="xiangqingtap(itemex.operation,itemex.relatedid)">详情</text></view>
										</view>
									</view>
								</view>
							</block>
						</view>
						<view>
							<block>
								<view class="padding-xs flex align-center">
									<view class="flex-sub text-center">
										<view class="text-xs padding">
											<text class="text-black">{{loading}}</text>
										</view>
									</view>
								</view>
							</block>
						</view>
					</view>
				</scroll-view>
				<view class="cu-modal" :class="modalName=='dati'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<view class="text-content text-xl padding"><text class="text-gray cuIcon-questionfill"></text>题目：{{question}}(正确率：{{zql}}%)</view>
						<view class="text-xl" :class="qa==1?'text-red':'text-gray'"><text :class="qa==1?'text-red cuIcon-roundcheckfill':'text-gray cuIcon-roundclosefill'"></text>{{totext(listA)}}</view>
						<view class="text-xl" :class="qa==2?'text-red':'text-gray'"><text :class="qa==2?'text-red cuIcon-roundcheckfill':'text-gray cuIcon-roundclosefill'"></text>{{totext(listB)}}</view>
						<view class="text-xl" :class="qa==3?'text-red':'text-gray'" v-if="listC!= ''"><text :class="qa==3?'text-red cuIcon-roundcheckfill':'text-gray cuIcon-roundclosefill'"></text>{{totext(listC)}}</view>
						<view class="text-xl padding-bottom" :class="qa==4?'text-red':'text-gray'" v-if="listD!= ''"><text :class="qa==4?'text-red cuIcon-roundcheckfill':'text-gray cuIcon-roundclosefill'"></text>{{totext(listD)}}</view>
						<view class="cu-bar bg-white">
							<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='dianbi'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<view class="text-content text-xl padding">点币来源：每日签到，翻卡是最主要来源，获得1-60不等，答题连对10道亦可+1，另外发帖被评为精华帖更是可以获得10点币。点币用途是提升用户等级积分，除此之外并无他用。</view>
						<view class="cu-bar bg-white">
							<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='jinbilaiyuan'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<view class="text-content text-xl padding">金币来源：每日答题正确可以获得1-7金币不等。另外发帖有30%概率随机获得奖励，大约1-20金币不等。<text v-show="eventtype=='adLoaded'" >也可以通过观看广告（每日限1次），获取随机的金币（1-5）。</text></view>
						<view class="cu-bar bg-white">
							<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">关闭页面</view>
						</view>
						<view class="cu-bar bg-white" v-show="eventtype=='adLoaded'">
							<view class="action padding-bottom-sm padding-top-sm flex-sub cu-btn round bg-blue solid-left" @tap="showInterstitialRewardedAd()">获取随机金币</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='jinbi'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<view class="text-content text-xl padding">你可以在下面输入活动或其他途径获取的金币卡，使用即可增加金币。<text v-show="eventtype=='adLoaded'" >也可以通过观看广告（每日限1次），获取随机的金币（1-5）。</text></view>
						<view class="cu-bar bg-white padding">
							<view class="search-form round">
								<text class="cuIcon-goods"></text>
								<input type="text" placeholder="输入金币卡" v-model="goldcard"></input>
							</view>
						</view>
						<view class="cu-bar bg-white">
							<view class="action padding-bottom-sm padding-top-sm flex-sub cu-btn round bg-blue solid-left" @tap="chongzhi()">使用金币卡</view>
						</view>
						<view class="cu-bar bg-white" v-show="eventtype=='adLoaded'">
							<view class="action padding-bottom-sm padding-top-sm flex-sub cu-btn round bg-blue solid-left" @tap="showInterstitialRewardedAd()">获取随机金币</view>
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
		</view>
	</view>
</template>

<script>
	var googleInterstitialRewardedAd = uni.requireNativePlugin('HXR-GoogleMobileADRewardedInterstitialAd');
	import AES from '../../js_sdk/ar-aes/ar-aes.js';
	import w_md5 from "../../js_sdk/zww-md5/w_md5.js";
	import AD from '../../js_sdk/ad.js';
	export default {
		data() {
			return {
				modalName: null,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				page0: 0,
				goldcard: '',
				page1: 0,
				Page:[0,0,0,0,0,0,0,0],
				credit: 0,
				credit1: 0,
				credit2: 0,
				credit3: 0,
				platform: 0,
				question: "题目加载中……",
				listA: "选项加载中",
				listB: "选项加载中",
				listC: "选项加载中",
				listD: "选项加载中",
				sex: 0,
				zql: 0,
				ad: 1,
				qa: 0,
				jiangli: 0,
				sig: '加载中……',
				username: "加载中……",
				touxiangkuanglist: '',
				zan: 0,
				eventtype: '',
				woguanzhu: 1,
				scrollhight: 0,
				swiperheight: 0,
				avatar: '',
				guanzhupost: [],
				huifupost: [],
				loading: '加载中……',
				listTouchDirection: null,
				TabCur: 0,
				jifenbiangeng: '积分名+1',
				jifenshuoming: '积分变更',
				jifencaozuo: 0,
			};
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			todianbi(e) {
				this.modalName = 'dianbi';
			},
			tojinbi(e) {
				if(this.platform==1&&(this.$groupid==10||this.$uid==357043)){
					this.modalName = 'jinbilaiyuan';
				}else{
					this.modalName = 'jinbi';
				}
			},
			tabSelect(e) {
				this.TabCur = e;
				this.shuaxinlist();
			},
			copy(e){
				var that = this;
				uni.setClipboardData({
				    data: e,
				    success: function () {
				        //that.jifenbiandong('复制成功',e + '已复制');
				    }
				});
			},
			getavatar(e) {
				if (this.$imageswitch && this.$wifi == 0) {
					return e;
				} else {
					return e.replace("small", "big");
				}
			},
			totext(e) {
				e = e.replace(/&nbsp;/ig, '');
				e = e.replace(/&rsaquo;/ig, '');
				return e.replace(/<[^>]+>/g, "");
			},
			shuaxinlist() {
				var that = this;
				that.loading = '载入中...';
				if (this.TabCur == 0) {
					this.page0 = 0;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:credit', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							page: that.page0
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data)
							that.guanzhupost = res.data.list;
							if (res.data.list.length < 30) {
								that.loading = '已经到底了！';
							}else{
								that.loading = '下滑加载更多';
							}
							if(that.page0 ==0){
								that.credit = res.data.credit;
								that.credit1 = res.data.ext1;
								that.credit2 = res.data.ext2;
								that.credit3 = res.data.ext3;
							}
							that.page0++;
							setTimeout(function() {
								//that.setHeight("view_listnow");
							}, 100)
						}
					});
				} else if (this.TabCur == 1) {
				}
			},
			tothebottom(push) {
				var that = this;
				if (that.TabCur == 0) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:credit', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							page: that.page0
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(that.page0);
							push = res.data.list;
							console.log(push);
							if (push.length > 0) {
								for (let i = 0; i < push.length; ++i) {
									that.guanzhupost.push(push[i]);
								}
							}
							if (push.length < 30) {
								that.loading = '真的到底了！';
							}else{
								that.loading = '下滑加载更多';
							}
							that.page0++;
							setTimeout(function() {
								//that.setHeight("view_listnow");
							}, 100)
						}
					});
				} else if (that.TabCur == 1) {
				}
				console.log("到底了");
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
			more(e) {
				let that = this;
				this.modalName = 'more';
			},
			tourl(e) {
				uni.navigateTo({
					url: '../component/card?tid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			operation(e,f){
				if(e=='ECU'){
					return '每日答题'
				}else if(e=='PRC'){
					return '帖子被打赏'
				}else if(e=='RAC'){
					return '观看广告'
				}else if(e=='RSC'){
					return '打赏帖子'
				}else if(e=='BMC'){
					return '购买道具'
				}else if(e=='MRC'){
					return '道具获取'
				}else if(f!= ''){
					return f;
				}
			},
			xiangqing(e,f,g){
				if(e=='ECU'){
					return '你回答了题号为' + g +'的题目给与奖励'
				}else if(e=='PRC'){
					return '你的帖子被打赏获得奖励'
				}else if(e=='RAC'){
					return '你通过观看广告获得奖励'
				}else if(e=='RSC'){
					return '你打赏帖子花费积分'
				}else if(e=='BMC'){
					return '购买道具花费积分'
				}else if(e=='MRC'){
					return '道具随机获取积分'
				}else if(f!= ''){
					//console.log(f);
					if(f=='进入每日摇摇乐大厅,完成任务摇奖即可获得奖励'){
						return '摇奖/翻卡';
					}else{
						return f;
					}
				}
			},
			showInterstitialRewardedAd: function() {
				let that = this;
				if(this.ad==0){
						// 调用后会显示 loading 界面
						AD.show({
							adpid: 1453639237, // HBuilder 基座测试广告位
							adType: "RewardedVideo"
							//singleton: false // 设置此参数后，每次调用 show 方法将重新创建广告实例，预载将失效，如果广告回调每次要透传用户信息需要设置 false
						}, (res) => {
							// 用户点击了【关闭广告】按钮
							if (res && res.isEnded) {
								// 正常播放结束
								console.log("onClose " + res.isEnded);
								that.zaidas();
								that.jiangli = 0;
							} else {
								// 播放中途退出
								console.log("onClose " + res.isEnded);
							}
					
							// 在此处理服务器回调逻辑
						}, (err) => {
							// 广告加载错误
							console.log(err)
						})
				}else{
					if(this.platform==2){
						this.jy_showRewardedAd();
					}else{
						let that = this;
						googleInterstitialRewardedAd.showWithCallback(function(res) {
							console.log(JSON.stringify(res));
							if(res.eventType=='userDidEarnReward'){
								that.jiangli = 1;
							}
							if(res.eventType=='adDidDismissScreen'&&that.jiangli == 1){
								that.zaidas();
								that.jiangli = 0;
							}
						});
					}
				}
			},
			zaidas(){
				this.modalName = null;
				let that = this;
				const wuid = 'D' + this.$uid;
				let date = new Date();
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let D = date.getDate()< 10 ? '0' + date.getDate():date.getDate();
				let thisdata = Y+M+D;
				const signature = plus.navigator.getSignature();
				console.log(signature);
				console.log(thisdata);
				const signe = AES.AES.encrypt(signature,w_md5.hex_md5_16(wuid),w_md5.hex_md5_16(thisdata));
				this.formsub = true;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:question', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						datiinfi: '7',
						sign: signe
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if(res.data.code==200){
							that.jifenbiandong('广告奖励','成功获取' + res.data.gold + '金币！');
						}else if(res.data.code==400){
							uni.showToast({
								title:'无此功能',
								icon:"error"
							})
						}else if(res.data.code==401){
							uni.showToast({
								title:'功能关闭',
								icon:"error"
							})
						}else if(res.data.code==402){
							uni.showToast({
								title:'次数过多',
								icon:"error"
							})
						}else if(res.data.code==403){
							uni.showToast({
								title:'验证失败',
								icon:"error"
							})
						}
					}
				});
			},
			xiangqingtap(e,f){
				let that=this;
				console.log(f);
				if(e=='PRC'||e=='RSC'){
					uni.showLoading({
						title: '加载帖子中'
					});
						uni.request({
							url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:pidtotid', //获取轮播列表
							method: 'GET',
							timeout: 10000,
							data: {
								pid: f
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
							},
							success: (res) => {
								this.tourl(res.data.tid);
								uni.hideLoading();
							}
						});
				}else if(e=='ECU'){
					uni.showLoading({
						title: '题目加载中'
					});
						uni.request({
							url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:question', //获取轮播列表
							method: 'GET',
							timeout: 10000,
							data: {
								token: that.$token,
								relatedid: f
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
							},
							success: (res) => {
								that.question = res.data.question;
								that.listA = res.data.a1;
								that.listB = res.data.a2;
								that.listC = res.data.a3;
								that.listD = res.data.a4;
								that.zql = res.data.zql;
								that.qa = res.data.qa;
								uni.hideLoading();
							}
						});
					this.modalName = 'dati';
				}
			},
			jy_showRewardedAd() {
				let that = this;
				var jygooglead = uni.requireNativePlugin("JY-GoogleAdMob");
				jygooglead.jy_showRewardedAd({},
				res=> {
					console.log(JSON.stringify(res));
					if(res.code=='104'){
						that.jiangli = 1;
					}
					if(res.code=='103' &&that.jiangli == 1){
						that.zaidas();
						that.jiangli = 0;
					}
				})
			},
			jy_loadRewardedAd() {
				let that = this;
				var jygooglead = uni.requireNativePlugin("JY-GoogleAdMob");
				jygooglead.jy_loadRewardedAd({
					adId: "ca-app-pub-9890309082716404/7965174834",
					appId: "ca-app-pub-9890309082716404~8229926380"
				},	res=> {
					console.log(res);
					if(res.code=='100'){
						that.eventtype = 'adLoaded';
						console.log(that.eventtype);
					}
					if(res.code=='104'){
						that.jiangli = 1;
					}
					if(res.code=='103' &&that.jiangli == 1){
						that.zaidas();
						that.jiangli = 0;
					}
				})
			},
			chongzhi(){
				let that = this;
					uni.showLoading({
						title: '充值中，请稍候'
					});
				console.log(this.goldcard);
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:chongzhi', //获取轮播列表
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						card: that.goldcard
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if(res.data.code==200){
							if(res.data.data.extcreditskey=='extcredits1'){
								that.jifenbiandong('充值成功','金币+' + res.data.data.extcreditsval);
							}else if(res.data.data.extcreditskey=='extcredits2'){
								that.jifenbiandong('充值成功','点币+' + res.data.data.extcreditsval);
							}else if(res.data.data.extcreditskey=='extcredits3'){
								that.jifenbiandong('充值成功','宠物经验+' + res.data.data.extcreditsval);
							}
						}else if(res.data.code==403){
								that.jifenbiandong('充值失败','卡密尝试失败次数太多，请稍后再试');
						}else if(res.data.result=='error0051'){
								that.jifenbiandong('充值失败','充值卡不存在！');
						}else if(res.data.result=='error0052'){
								that.jifenbiandong('充值失败','充值卡已经被使用！');
						}else if(res.data.result=='error0053'){
								that.jifenbiandong('充值失败','充值卡状态更新出错！');
						}else if(res.data.result=='error0054'){
								that.jifenbiandong('充值失败','充值卡积分操作错误！');
						}else{
								that.jifenbiandong('充值失败','卡密错误，错误码：' + res.data.result);
						}
						uni.hideLoading();
					}
				});
			}
		},
		onLoad: function(option) {
			let that = this;
			this.uid = option.uid;
			//this.uid = 19;
			//console.log(option.uid); //打印出上个页面传递的参数。
			//this.loadthread(this.uid);
			this.shuaxinlist();
			if (uni.getSystemInfoSync().platform == 'ios') {
				this.platform = 1;
			} else {
				this.platform = 2;
			}
			uni.request({
				url: getApp().globalData.zddomain + 'plugin.php?id=zxs_maintenance_page:getip', //获取轮播列表
				method: 'GET',
				timeout: 10000,
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: (res) => {
					console.log(res.data);
					if (res.data == 'CN') {
						that.ad = 0;
						that.eventtype = 'adLoaded';
						AD.load({
							adpid: 1453639237,
							adType: "RewardedVideo"
						});
						console.log(that.ad);
					} else {
						that.ad = 1;
						if(this.platform==1){
							googleInterstitialRewardedAd.createADWithAdUnitID('ca-app-pub-9890309082716404/2637153500', function(res) {
								console.log(res);
								that.eventtype = res.eventType;
								console.log(that.eventtype);
							}, {'userIdentifier':that.$uid, 'jinbi': that.$username + ' de jinbi'});
						}else if(this.platform==2){
							var jygooglead = uni.requireNativePlugin("JY-GoogleAdMob");
							jygooglead.jy_init();
							that.jy_loadRewardedAd();
						}
					}
				}
			});
		},
		onReady() {
			plus.navigator.setStatusBarStyle('dark'); //改变系统标题颜色
		},
		onReachBottom() {
			console.log("到底了");
			this.tothebottom();
		},
		onPageScroll(res) {
			this.scrollhight = res.scrollTop;
			//console.log(res.scrollTop);//距离页面顶部距离
		},
	}
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.cu-list.grid.no-border {
		margin-top: 0px;
		padding-top: 0px;
		background-color: transparent;
	}

	.page {
		background: white;
		background-repeat: no-repeat;
		background-position: top right;
		background-size: auto 550upx;
	}
	
	.wid1 {
	    width: 20%!important;
	}
	.wid8 {
	    width: 60%!important;
	}
	.padding-left-sm .padding-right-xl .text-black .text-shadow1{
		margin-top: 10upx;
	}
	.text-xl{
		font-size: 30upx!important;
	}
	
</style>
