<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view class="bg-white gt">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的钱包</block>
		</cu-custom>
		<view class="cu-form-group">
			<view class="title">账户余额</view>
			<view class="text-red">{{money}}终点币</view>
		</view>
		<view class="cu-form-group">
			<view class="title">请选择充值终点币</view>
			<view class="text-gray text-xs">1元人民币=20终点币</view>
		</view>
		<view class="cu-list grid col-3 no-border">
			<view class="padding-xs" v-for="(item,index) in moneylist" :key="index" @tap="tabSelect(index)">
				<view class="cu-item padding-bottom-sm padding-top-sm" :class="TabCur==index?'borders':''">
					<view class="text-price text-xl" :class="TabCur==index?'text-red':'text-black'">{{item}}<br><text class="text-sm" v-if="viplist[index]!=undefined">({{huobifuhao(viplist[index].pricelocal,viplist[index].price)}})</text><text class="text-sm" v-if="googleplay==1&&vipprice[index]!=undefined">({{vipprice[index]}})</text><text class="text-sm" v-else-if="googleplay==1">(点击加载价格)</text>
					</view>
					<view class="margin-top-xs" :class="TabCur==index?'text-red':'text-gray'">{{item*20}}币</view>
				</view>
			</view>
		</view>
		<view class="margin-tb-sm text-center"><button
			class="margin cu-btn bg-red block lg" :disabled="fasong?true:false" @tap="pay()"><text class="cuIconfont-spin" :class="fasong?'cuIcon-loading2':''"></text>立即充值</button>
		</view>
		<view class="padding-right padding-left margin-tb-sm text-left text-gray">
			温馨提示：<br>
			1.该商品为<text class="text-black text-bold">虚拟商品</text>，不能兑换实物商品。<br>
			2.充值成功后可以<text class="text-underline text-blue" @tap="duihuanit">兑换论坛金币</text>，但金币不能兑换为终点币，且不支持转让、提现、退款。<br>
			3.支付遇到问题请去<text class="text-underline text-blue" @tap="tofankui">反馈页面</text>回报，未到账建议也可以去回报。<br>
			4.兑换的论坛金币可以用于购买勋章、头衔、道具等等功能，以相关购买界面为准。<br>
			5.不鼓励未成年人充值。
		</view>
		<view class="cu-modal" :class="modal=='duihuan'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar bg-white justify-end">
					<view class="content">兑换金币(比例1:1)</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group">
						<view class="title">金币数量</view>
						<input :placeholder="'0 - ' + money" name="money" v-model="duihuan" type="number" @blur="pandingmoney()"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">全部兑换</view>
						<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="duihuanmoney()">确定</button>
						<button class="cu-btn line-green margin-left" @tap="hideModal">取消</button>
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
					title: "加载中",
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
											title: '获取会员信息失败，请稍后重试'
										})
										uni.navigateBack()
										uni.hideLoading();
									}
								);
							}else if (channels[i].id == "google-pay") {
								plug.querySku({SKU_ID:"1"},function(e){
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
				if(this.TabCur==-1){
					uni.showToast({
						title:"请选套餐",
						icon:"error"
					})
					return;
				}
				this.fasong = true;
				let that = this;
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
								title: '支付失败'
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
									title: '充值成功。'
								})
								that.getgold();
								that.fasong = false;
							}else{
								uni.showToast({
									title: '支付失败',
									icon: 'error'
								})
								that.fasong = false;
							}
						}
					});
				} else {
					uni.showToast({
						title: '支付失败',
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
									title: '充值成功。'
								})
								that.getgold();
								that.loading = false;
							}else{
								uni.showToast({
									title: '支付失败',
									icon: 'error'
								})
								that.loading = false;
							}
						}
					});
				} else {
					uni.showToast({
						title: '支付失败',
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
						title:'兑换失败',
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
										title: '兑换成功'
									})
								}else{
									uni.showToast({
										title:'余额不足',
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
