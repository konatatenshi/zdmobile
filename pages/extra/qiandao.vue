<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true" class="text-shadow1">
				<block slot="content">签到</block>
		</cu-custom>
		<view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<view class="cu-card dynamic cu-list2">
				<view>
					<view class="bg-gradual-green padding-top radius text-center shadow-blur">
						<view class="cu-item">
							<view class="cu-avatar2 round2 border-custom" :style="{'background-image': 'url(https://zd.tiangal.com/uc_server/avatar.php?uid='+$uid+'&size=middle)'}">
							</view>
							<view class="content flex-sub margin-bottom-xs">
								<view class="text-black">&nbsp;</view>
								<view class="text-black text-sm flex justify-end">
									&nbsp;
									<view class="text-black text-sm">
										<view class="text-left padding-right-xsl margin-top-sm margin-bottom-sm"><button
												class="padding-left-xl padding-right-xl cu-btn round2 bg-grey2">{{$username}}</button>
										</view>
										<view class="text-left padding-right-xsl margin-bottom-sm"><button
												class="padding-left-xl padding-right-xl cu-btn round2 bg-grey2">签到等级 Lv{{qiandaodengji}}</button>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="grid col-3 padding-top-sm padding-bottom-sm mbl">
							<view class="text-content">今日排名<br><text class="lg text-yellow cuIcon-card margin-right-xs"></text>{{credit}}</view>
							<view class="text-content">连续签到<br><text class="lg text-yellow cuIcon-babyfill margin-right-xs"></text>{{credit1}}天</view>
							<view class="text-content">累计签到<br><text class="lg text-yellow cuIcon-samefill margin-right-xs"></text>{{credit2}}天</view>
						</view>
					</view>
					<view class="text-center">
						<button class="cu-btn block bg-blue lg margin-xs" :disabled="disabled?true:false" type="" @tap="sign()">{{qdtext}}</button>
					</view>
				</view>
			</view>
			<scroll-view scroll-x class="bg-white nav">
				<view class="cu-item padding-xsl"
					:class="TabCur==0?'text-blue text-bold cur':'text-black'" @tap="tabSelect(0)">
					今日排行
				</view>
				<view class="cu-item padding-xsl"
					:class="TabCur==1?'text-blue text-bold cur':'text-black'" @tap="tabSelect(1)">
					本月排行
				</view>
				<view class="cu-item padding-xsl"
					:class="TabCur==2?'text-blue text-bold cur':'text-black'" @tap="tabSelect(2)">
					总排行
				</view>
			</scroll-view>
			<view class="cu-bar border-custom2 margin-top">
				<scroll-view  class="list">
					<view class="view_listnow">
						<view class="hometop3">
						</view>
						<view v-if="guanzhupost.length >= 0">
							<block>
								<view class="bg-white">
									<view class="cu-timeline">
										<view class="cu-item" v-for="(itemex,indexe1) in guanzhupost" :key="indexe1">
											<view class="cu-avatar3 round" :style="{'background-image': 'url(https://zd.tiangal.com/uc_server/avatar.php?uid='+itemex.uid+'&size=middle)'}">
											</view>
											<view class="cu-capsule radius" @tap="touserpage(itemex.uid)">
												<view class="cu-tag bg-cyan padding-sm">{{itemex.username}}</view>
												<view class="cu-tag line-cyan padding-sm"> {{todate(itemex.time)}}</view>
											</view>
											<view class="text-brown margin-bottom-sm">
												{{xiangqing(itemex.mdays,itemex.days)}}
											</view>
										</view>
									</view>
								</view>
							</block>
						</view>
						<view>
							<block>
								<view class="padding-xs flex align-center bg-white">
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
				<view class="cu-modal" :class="modalName=='dengji'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<view class="text-content text-xl padding">等级说明：<view v-for="(itemex2,indexe2) in dengjilist" :key="indexe2"><br>{{itemex2.txt}}</view></view>
						<view class="cu-bar bg-white">
							<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
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
	import AES from '../../js_sdk/ar-aes/ar-aes.js';
	import w_md5 from "../../js_sdk/zww-md5/w_md5.js";
	export default {
		data() {
			return {
				modalName: null,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				disabled: false,
				listTouchStart: 0,
				page0: 0,
				goldcard: '',
				page1: 0,
				Page:[0,0,0,0,0,0,0,0],
				credit: 0,
				credit1: 0,
				credit2: 0,
				credit3: 0,
				qiandaodengji: 0,
				qdtext: "签到加载中……",
				sex: 0,
				zql: 0,
				qa: 0,
				dengji: '加载中……',
				username: "加载中……",
				touxiangkuanglist: '',
				zan: 0,
				woguanzhu: 1,
				scrollhight: 0,
				swiperheight: 0,
				avatar: '',
				guanzhupost: [],
				dengjilist: [],
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
				this.modalName = 'jinbi';
			},
			tabSelect(e) {
				this.TabCur = e;
				this.page0 = 0;
				this.shuaxinlist();
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
			copy(e){
				var that = this;
				uni.setClipboardData({
				    data: e,
				    success: function () {
				        //that.jifenbiandong('复制成功',e + '已复制');
				    }
				});
			},
			shuaxinlist() {
				var that = this;
				that.loading = '载入中...';
					this.page0 = 0;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:sign', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							page: that.page0,
							datiinfi: that.TabCur
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							that.qdtext = '签到';
							//console.log(res.data.list)
							that.guanzhupost = res.data.list;
							if (res.data.list.length < 30) {
								that.loading = '已经到底了！';
							}else{
								that.loading = '下滑加载更多';
							}
							if(that.page0 ==0){
								that.credit = res.data.pm;
								that.credit1 = res.data.days;
								that.credit2 = res.data.lxqd;
								that.qiandaodengji = res.data.qddj;
								if(Number(that.credit)>0){
									that.qdtext = '已签到';
									that.disabled = true;
								} 
							}
							that.page0++;
							setTimeout(function() {
								//that.setHeight("view_listnow");
							}, 100)
						}
					});
			},
			tothebottom(push) {
				var that = this;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:sign', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							page: that.page0,
							datiinfi: that.TabCur
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
				console.log("到底了");
			},
			sign() {
				var that = this;
				const dateTime = Date.now();
				var hour = dateTime.getHours();
				var minut = dateTime.getMinutes();
				var second = dateTime.getSeconds();
				if( hour === 0 && minut === 0 && second < 5){
					setTimeout(function() {
						let signtime = 5 - second;
						that.qdtext = '繁忙时刻，签到中……剩余:' + signtime + '秒';
						that.sign();
					}, 1000)
					return;
				}
				const timestamp = Math.floor(dateTime / 1000);
				const timestamps = 'S' + Math.floor(dateTime / 1000);
				const signature = plus.navigator.getSignature();
				const signe = AES.AES.encrypt(signature,w_md5.hex_md5_16(timestamps),w_md5.hex_md5_16(that.$uid));
				that.qdtext = '签到中……';
				console.log(signe);
				console.log(signature);
				console.log(timestamp);
				console.log(w_md5.hex_md5_16(timestamps));
				console.log(w_md5.hex_md5_16(that.$uid));
				that.disabled = true;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:sign', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							page: that.page0,
							relatedid: 1,
							time: timestamp,
							sign : signe
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data)
							console.log(res.data.result)
							if (res.data.code==200) {
								if(res.data.result.indexOf("sigZDned") != -1){
									that.credit1 = res.data.last;
									that.credit2++;
									that.qdtext = '已签到';
									console.log(that.credit1)
									if(that.credit1>30){
										if(res.data.data>0&&res.data.data<=10){
											var jinbi = 11 - res.data.data + 5;
											that.jifenbiandong('签到成功','点币+' + (Number(res.data.count)+1) + ',金币+' + jinbi);
										}else{
											that.jifenbiandong('签到成功','点币+' + (Number(res.data.count)+1) + ',金币+5');
										}
									}else{
										if(res.data.data>0&&res.data.data<=10){
											var jinbi = 11 - res.data.data;
											that.jifenbiandong('签到成功','点币+' + res.data.count + ',金币+' + jinbi);
										}else{
											that.jifenbiandong('签到成功','点币+' + res.data.count);
										}
									}
									that.page0++;
									setTimeout(function() {
										that.shuaxinlist();
									}, 100)
								}else{
									that.qdtext = '签到出错，今日已签';
								}
							}else if (res.data.code==400) {
								that.qdtext = '验证失败，正在跳转网页签到';
								setTimeout(function() {
									that.towebsign();
								}, 100)
							}else{
								that.qdtext = '签到出错，正在跳转网页签到';
								setTimeout(function() {
									that.towebsign();
								}, 100)
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
			towebsign(e) {
				uni.navigateTo({
					url: '../basics/icon'
				})
			},
			touserpage(e) {
				console.log(e);
				if (this.$token == '') {
					this.toguestlogin();
					return;
				}
				uni.navigateTo({
					url: '../component/list?uid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			xiangqing(e,f){
				return '月天数 ' + e +' 天，总天数' + f + '天';
			},
		},
		onLoad: function(option) {
			this.uid = option.uid;
			//this.uid = 19;
			//console.log(option.uid); //打印出上个页面传递的参数。
			//this.loadthread(this.uid);
			this.shuaxinlist();
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
	.round2 {
		border-radius: 20upx;
	}
	.cu-avatar2 {
		font-variant: small-caps;
		margin: 0;
		padding: 0;
		display: inline-flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		color: #ffffff;
		white-space: nowrap;
		position: relative;
		width: 190upx;
		height: 190upx;
		background-size: cover;
		background-position: center;
		vertical-align: middle;
		font-size: 1.5em;
		position: absolute;
		left: 40upx;
	}
	.cu-avatar3 {
		font-variant: small-caps;
		margin: 0;
		padding: 0;
		display: inline-flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		color: #ffffff;
		white-space: nowrap;
		position: relative;
		width: 90upx;
		height: 90upx;
		background-size: cover;
		background-position: center;
		vertical-align: middle;
		font-size: 1.5em;
		position: absolute;
		left: -45upx;
		z-index: 999;
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
	    width: 25%!important;
	}
	.wid8 {
	    width: 50%!important;
	}
	.padding-left-sm .padding-right-xl .text-black .text-shadow1{
		margin-top: 10upx;
	}
	.text-xl{
		font-size: 30upx!important;
	}
	.mbl {
	    background: #ffffff45;
	}
	.border-custom {
	    border: 4px solid #FFF;
	}
	.padding-right-xsl {
		padding-right: 200upx;
	}
	.bg-grey2 {
		background-color: #484848c2;
		color: #ffffff;
	}
	.cu-timeline>.cu-item{
		padding: 2upx 30upx 2upx 100upx!important;
	}
	.cu-timeline{
		padding-left: 50upx!important;
	}
	uni-view.text-brown.margin-bottom-sm{
		padding-bottom: 20upx;
		border-bottom: 2upx solid #eee;
	}
	.cu-timeline>.cu-item::before{
		top: 20upx!important;
	}
	.padding-xsl{
		padding-left: 50upx!important;
		padding-right: 50upx!important;
		font-size: 1.3rem;
	}
</style>
