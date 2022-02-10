<template>
	<view class="app">
		<image class="bgt" src="../../static/images/indexbg4.jpg"></image>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">每日答题</block>
		</cu-custom>
		<view class="btn">
			<image src="../../static/images/btn.png" mode="widthFix" @click="goSubject()"></image>
		</view>
		<view class="tip" v-if="show">
			<text class="text margin-bottom">今天您还有<text>{{ counts }}</text>次答题机会</text>
			<text class="text">您目前还有<text>{{ mc }}</text>张免错卡</text>
		</view>
		<view class="zaida" v-if="show">
			<view class="margin-tb-sm text-center"><button
				class="margin cu-btn bg-red block lg" :disabled="zdjs?true:false" @tap="zaidar()"><text v-show="zdjs" class="cuIcon-loading2 cuIconfont-spi"></text>获取再答机会</button>
			</view>
		</view>
		<view class="tip2 margin-bottom-xl"><text class="text" style="margin-bottom: 200upx;">技术支持：终点论坛</text></view>
		<view class="cu-modal" :class="modalName=='zaida'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end">
					<view class="content">再次答题</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您目前拥有{{zd}}张再答卡(可去道具市场购买)，请问是否使用并获取一次再答机会吗？<text v-show="eventtype=='adLoaded'">或者，你可以观看一次广告，看完后即获取再答机会。</text>
				</view>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" :disabled="zd?false:true" @tap="zaidas(1)">使用再答卡</button>
						<button class="cu-btn bg-green margin-left" v-show="eventtype=='adLoaded'" @tap="showInterstitialRewardedAd">观看广告</button>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-tabbar margin-bottom">
			<view class="box active">
				<image src="../../static/images/icon1b.png"></image>
				<view class="text">活动首页</view>
			</view>
			<view class="box" @click="goIntro">
				<image src="../../static/images/iconca.png"></image>
				<view class="text">答题规则</view>
			</view>
			<view class="box " @click="goRecord">
				<image src="../../static/images/icon2a.png"></image>
				<view class="text">答题排行</view>
			</view>
		</view>

	</view>
</template>
<script>
	var googleInterstitialRewardedAd = uni.requireNativePlugin('HXR-GoogleMobileADRewardedInterstitialAd');
	import AES from '../../js_sdk/ar-aes/ar-aes.js';
	import w_md5 from "../../js_sdk/zww-md5/w_md5.js";
	export default {
		name: "contact",
		data() {
			return {
				isLogin: uni.getStorageSync('isLogin'),
				counts: 0,
				platform: 0,
				mc: 0,
				jiangli: 0,
				eventtype: '',
				zdjs: false,
				zd: 0,
				show: false,
				modalName: null
			}
		},
		mounted() {
			let that = this;
			this.getcounts();
			plus.navigator.setStatusBarStyle('dark');
			if (uni.getSystemInfoSync().platform == 'ios') {
				this.platform = 1;
			} else {
				this.platform = 2;
			}
			if(this.platform==1){
				googleInterstitialRewardedAd.createADWithAdUnitID('ca-app-pub-9890309082716404/2637153500', function(res) {
					console.log(res);
					that.eventtype = res.eventType;
					console.log(that.eventtype);
				}, {'userIdentifier':that.$uid, 'dati': that.$username + ' de dati'});
			}else if(this.platform==2){
				var jygooglead = uni.requireNativePlugin("JY-GoogleAdMob");
				jygooglead.jy_init();
				that.jy_loadRewardedAd();
			}
		},
		onShareTimeline(res) {
			if (res.from === 'menu') { // 来自页面内分享按钮
				return {
					title: '每日答题',
					query: '',
					imageUrl: "../../static/images/indexbg4.jpg",
					complate: function() {
						console.log("23123123213213");
					}
				}
			}
		},
		methods: {
			async getcounts() {
				let that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:question', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						datiinfi: '1'
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						that.counts = res.data.datitime;
						that.mc = res.data.mc;
						that.show = true;
					}
				});
			},
			hideModal(){
				this.modalName = null;
			},
			showInterstitialRewardedAd: function() {
				if(this.platform==2){
					this.jy_showRewardedAd();
				}else{
					let that = this;
					googleInterstitialRewardedAd.showWithCallback(function(res) {
						console.log(JSON.stringify(res));
						if(res.eventType=='userDidEarnReward'){
							that.zaidas(2);
						}
					});
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
						that.zaidas(2);
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
						that.zaidas(2);
						that.jiangli = 0;
					}else if(res.code=='103'){
						that.eventtype = '';
						that.jy_loadRewardedAd();
					}
				})
			},
			zaidas(e){
				this.modalName = null;
				let that = this;
				const wuid = 'D' + this.$uid;
				const signature = plus.navigator.getSignature();
				console.log(signature);
				let date = new Date();
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let D = date.getDate()< 10 ? '0' + date.getDate():date.getDate();
				let thisdata = Y+M+D;
				const signe = AES.AES.encrypt(signature,w_md5.hex_md5_16(wuid),w_md5.hex_md5_16(thisdata));
				this.formsub = true;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:question', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						datiinfi: '6',
						datiinfo: e,
						sign: signe
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if(res.data.code==200){
							uni.showToast({
								title:'可再答啦'
							})
							that.counts++;
						}else if(res.data.code==400){
							uni.showToast({
								title:'无再答卡',
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
			zaidar() {
				let that = this;
				this.zdjs = true;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:question', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						datiinfi: '5'
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						that.zd = res.data.zd;
						that.zdjs = false;
						that.modalName = 'zaida';
					}
				});
			},
			goIntro() {
				uni.redirectTo({
					url: './guize'
				})
			},
			goRecord() {
				uni.redirectTo({
					url: './datipaihang'
				})
			},
			goSubject() {
				if (1==1) {
					//判断活动时间
						if (this.counts > 0) {
							uni.redirectTo({
								url: './subject'
							})
						} else {
							uni.showToast({
								title: '没机会了',
								icon: "none"
							})
						}

				} else {
					this.show = true;
				}

			}
		}
	}
</script>


<style>
@import "@/static/css/dtstyle.css";
	page{
		background-color: #fff;
	}
	.zaida{
		position: absolute;
		width: 100%;
		top:80%;
	}
</style>
