<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view class="bg-white gt">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">{{$t('buy.moneybag')}}</block>
		</cu-custom>
		<view class="cu-form-group">
			<view class="title">{{$t('buy.balance')}}</view>
			<view class="text-red">{{money}}{{$t('home.zdcoin')}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">{{$t('buy.coosezd')}}</view>
			<view class="text-gray text-xs">{{$t('buy.coosezdtxt')}}</view>
		</view>
		<view class="cu-list grid col-3 no-border">
			<view class="padding-xs" v-for="(item,index) in moneylist" :key="index" @tap="tabSelect(index)">
				<view class="cu-item padding-bottom-sm padding-top-sm" :class="TabCur==index?'borders':''">
					<view class="text-price text-xl" :class="TabCur==index?'text-red':'text-black'">{{item}}<br><text class="text-sm" v-if="viplist[index]!=undefined">({{huobifuhao(viplist[index].pricelocal,viplist[index].price)}})</text><text class="text-sm" v-if="googleplay==1&&vipprice[index]!=undefined">({{vipprice[index]}})</text><text class="text-sm" v-else-if="googleplay==1">(点击加载价格)</text>
					</view>
					<view class="margin-top-xs" :class="TabCur==index?'text-red':'text-gray'">{{item*20}}{{$t('buy.coin')}}</view>
				</view>
			</view>
		</view>
		<view class="margin-tb-sm text-center"><button
			class="margin cu-btn bg-red block lg" :disabled="fasong?true:false" @tap="pay()"><text class="cuIconfont-spin" :class="fasong?'cuIcon-loading2':''"></text>{{$t('buy.buynow')}}</button>
		</view>
		<view class="padding-right padding-left margin-tb-sm text-left text-gray">
			{{$t('buy.cointxt1')}}<br>
			1.{{$t('buy.cointxt2')}}<text class="text-black text-bold">{{$t('buy.cointxt3')}}</text>，{{$t('buy.cointxt4')}}。<br>
			2.{{$t('buy.cointxt5')}}<text class="text-underline text-blue" @tap="duihuanit">{{$t('buy.cointxt6')}}</text>，{{$t('buy.cointxt7')}}。<br>
			3.{{$t('buy.cointxt8')}}<text class="text-underline text-blue" @tap="tofankui">{{$t('buy.cointxt9')}}</text>{{$t('buy.cointxt10')}}。<br>
			4.{{$t('buy.cointxt11')}}<br>
			5.{{$t('buy.cointxt12')}}
		</view>
		<view class="cu-modal" :class="modal=='duihuan'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{$t('buy.exchangegold')}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group">
						<view class="title">{{$t('buy.goldnumber')}}</view>
						<input :placeholder="'0 - ' + money" name="money" v-model="duihuan" type="number" @blur="pandingmoney()"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">{{$t('buy.allexchange')}}</view>
						<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="duihuanmoney()">{{$t('api.ok')}}</button>
						<button class="cu-btn line-green margin-left" @tap="hideModal">{{$t('api.cancel')}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	const plug=uni.requireNativePlugin("html5app-googlelogin");
	export default {
		data () {
			return {
				index: -1,
				content: [],
				red: 0,
				switchA: false,
				moneylist: [1,6,18,30,50,108],
				vipprice: [],
				modal: null,
				thread: '',
				duihuan: '',
				TabCur: -1,
				produceid: -1,
				money: 0,
				googleplay: 0,
				platform: 0,
				viplist: [],
				goodInfo: [],
				fasong: false,
				iapChannel: []
			}
		},
		onShow() {
		},
		onReady () {
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			if (uni.getSystemInfoSync().platform == 'ios') {
				this.platform = 1;
			} else {
				this.platform = 2;
			}
			this.plusReady();
			this.getgold();
		},
		methods: {
			plusReady() {
				uni.showLoading({
					title: this.$t('api.loading'),
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 2000);
				const that = this;
				const IAPOrders = ["1", "2", "3", "4", "5", "6"];
				//uni-app中将此function里的代码放入vue页面的onLoad生命周期中
				plus.payment.getChannels(
					function(channels) {
						console.log("channels-------------", channels);
						for (var i in channels) {
							if (channels[i].id == "appleiap") {
								console.log("channels[i]-----------", channels[i]);
								that.iapChannel = channels[i];
								that.iapChannel.requestOrder(
									IAPOrders,
									function(event) {
										console.log(event, event.length);
										uni.hideLoading();
										var sortable = [];
										for (var j in event) {
											sortable.push(
												event[j]
											);
										}
										sortable.sort(function(a, b) {
											return a['productid'] - b['productid'];
										});
										that.viplist = sortable;
										console.log(that.viplist); 
									},
									function(errormsg) {
										console.log(
											"获取支付通道失败：" +
											JSON.stringify(errormsg) +
											"-" +
											errormsg.message
										);
										uni.showToast({
											title: that.$t('buy.failget')
										})
										uni.navigateBack()
										uni.hideLoading();
									}
								);
							}else if (channels[i].id == "google-pay") {
								plug.querySku({SKU_ID:"1"},function(e){
									if(e.type!='inapp'){
										if(that.red==0){
											that.red = 1;
											uni.navigateTo({
												url: '../component/card?tid=260104',
												animationType: 'pop-in',
												animationDuration: 200
											});
										}
										return;
									}else{
										that.googleplay = 1;
									}
									console.log(e);
									that.vipprice[0] = e.price;
									console.log(that.vipprice);
									uni.hideLoading();
								});
							}
						}
					},
					function(e) {
						console.log("获取支付通道失败：" + e.message);
					}
				);
			},
			pay() {
				let that = this;
				if(this.TabCur==-1){
					uni.showToast({
						title: that.$t('buy.choosevip'),
						icon:"error"
					})
					return;
				}
				this.fasong = true;
				if(this.googleplay==0){
					uni.requestPayment({
						provider: "appleiap",
						orderInfo: {
							productid: that.produceid,
						},
						success: (result) => {
							console.log("success--------------------", result);
							this.getIapPayChecked(result);
						},
						fail: (e) => {
							uni.showToast({
								title: that.$t('buy.paidfailed')
							})
							that.fasong = false;
						},
						complete: () => {
							console.log("payment结束");
							that.fasong = false;
						},
					});
				}else{
					if(this.googleplay==1){
						plug.play({SKU_ID:that.produceid},function(e){
							that.showerror += JSON.stringify(e);
							if(e.packageName=="bbs.zdfx.net"){
								that.getGoogleCheck(e);
							}else if(e.code!=0){
								that.fasong = false;
							}
						});
					}
				}
			},
			getGoogleCheck(e) {
				let that = this;
				if (e.code == 0) {
					console.log(e);
					//console.log(e.transactionReceipt);
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:googleiap', //获取置顶帖子
						method: 'POST',
						timeout: 10000,
						data: {
							token: that.$token,
							receipt: encodeURIComponent(e.purchaseToken),
							recid: e.sku,
							orderid: e.orderId,
							typeid: 1
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							that.showerror += JSON.stringify(res);
							console.log(res)
							console.log(res.data)
							if(res.data.code==200){
								uni.showToast({
									title: that.$t('buy.paidsuccess')
								})
								that.getgold();
								that.fasong = false;
							}else{
								uni.showToast({
									title: that.$t('buy.paidfailed'),
									icon: 'error'
								})
								that.fasong = false;
							}
						}
					});
				} else {
					uni.showToast({
						title: that.$t('buy.paidfailed'),
						icon: 'error'
					})
				}
			},
			getIapPayChecked(e) {
				let that = this;
				if (e.errMsg == 'requestPayment:ok') {
					console.log(e);
					//console.log(e.transactionReceipt);
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:iap', //获取置顶帖子
						method: 'POST',
						timeout: 10000,
						data: {
							token: that.$token,
							receipt: encodeURIComponent(e.transactionReceipt),
							recid: e.transactionIdentifier,
							typeid: 1
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res)
							console.log(res.data)
							if(res.data.code==200){
								uni.showToast({
									title: that.$t('buy.paidsuccess')
								})
								that.getgold();
								that.loading = false;
							}else{
								uni.showToast({
									title: that.$t('buy.paidfailed'),
									icon: 'error'
								})
								that.loading = false;
							}
						}
					});
				} else {
					uni.showToast({
						title: that.$t('buy.paidfailed'),
						icon: 'error'
					})
				}
			},
			huobifuhao(currency,price) {
				let  index = currency.lastIndexOf("=");
				currency = currency.substring(index + 1, currency.length);
			  return (price).toLocaleString(
				'ZH',
				{
				  style: 'currency',
				  currency: currency,
				  minimumFractionDigits: 0,
				  maximumFractionDigits: 2
				}
			  ).replace(/\\d/g, '').trim()
			},
			getgold() {
				var that = this;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:credit', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 1
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data)
							that.money = res.data.gold;
						}
					});
			},
			SwitchA(e) {
				this.switchA = e.detail.value;
				if(this.switchA){
					this.duihuan = this.money;
				}else{
					this.duihuan = '';
				}
			},
			pandingmoney(){
				console.log(this.duihuan);
				if(this.duihuan<0){
					this.duihuan = 0;
				}else if(this.duihuan>this.money){
					this.duihuan = this.money;
				}
			},
			duihuanmoney(){
				let that = this;
				console.log(this.duihuan);
				if(this.duihuan<0){
					this.duihuan = 0;
				}else if(this.duihuan>this.money){
					this.duihuan = this.money;
				}
				if(this.duihuan==0||this.duihuan==''){
					uni.showToast({
						title:that.$t('buy.exchangefailed'),
						icon: 'error'
					})
					this.modal=null;
					this.duihuan='';
				}else{
						uni.request({
							url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:credit', //获取轮播列表
							method: 'GET',
							timeout: 10000,
							data: {
								token: that.$token,
								page: that.duihuan,
								typeid: 2
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
							},
							success: (res) => {
								if(res.data.code==200){
									console.log(res.data);
									that.money = that.money - that.duihuan;
									uni.showToast({
										title: that.$t('buy.exchangesuccess')
									})
								}else{
									uni.showToast({
										title:that.$t('buy.balangenotenough'),
										icon: 'error'
									})
								}
								that.modal=null;
							}
						});
					
				}
			},
			hideModal(){
				this.modal = null;
			},
			duihuanit(){
				this.modal = 'duihuan';
			},
			tabSelect(e) {
				this.TabCur = e;
				console.log(e);
				let produceid = e + 1;
				this.produceid = produceid.toString();
				let that = this;
				if(this.googleplay==1){
						plug.querySku({SKU_ID:that.produceid},function(e){
							if(e.type!='inapp'){
								uni.redirectTo({
									url: '../component/card?tid=260104',
									animationType: 'pop-in',
									animationDuration: 200
								});
								return;
							}else{
								that.googleplay = 1;
							}
							console.log(e);
							Vue.set(that.vipprice, that.TabCur, e.price);
							console.log(that.vipprice);
							uni.hideLoading();
						});
				}
			},
			tofankui(){
				uni.navigateTo({
					url: '../extra/fankui'
				})
			}
		}
	}
</script>

<style>
	.cu-form-group {
		justify-content: start!important;
	}
	.borders{
		border-color: red!important;
		border-style: dashed;
		background-color: #ffd0f933!important;
	}
	.cu-item{
		border-width:2upx;
		border-style: dashed;
		border-color: #00000000;
		background-color: #defffb55;
	}
	.gt{
		height: 100%;
	}
</style>
