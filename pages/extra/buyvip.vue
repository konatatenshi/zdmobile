<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">{{$t('buy.buyvip')}}</block>
			<block slot="right">
			</block>
		</cu-custom>
		<view class="solids-bottom padding-xs flex align-center service-list">
			<view class="flex-sub text-center">
				<view class="text-lg"><image src="../../static/vip.png" class="imgbt"></image>{{$t('buy.nobleprivilege')}}</view>
				<view class="text-left">1.{{$t('buy.nobleprivilege1')}}<br>2.{{$t('buy.nobleprivilege2')}}<br>3.{{$t('buy.nobleprivilege3')}}<br>4.{{$t('buy.nobleprivilege4')}}.</view>
			</view>
		</view>
		<view v-for="(items,indexs) in vipList" :key="indexs">
			<view class="solids-bottom padding-xs flex align-center service-list" :class="index==indexs?'actives':''" @tap="changeindex(indexs,items.productid)">
				<view class="padding bigzi">{{$t('buy.vi')}}</view>
				<view class="flex-sub text-center">
					<view class="solid-bottom text-xl padding">
						<text
							class="text-bold" :class="index==indexs?'text-red':'text-black'">{{items.title}}({{huobifuhao(items.pricelocal,items.price)}})</text>
					</view>
					<view class="padding"><text v-show="index==indexs" class="text-red">【{{$t('buy.selected')}}】</text>{{items.description}}</view>
				</view>
			</view>
		</view>
		<view v-if="googleplay==1">
			<view class="solids-bottom padding-xs flex align-center service-list" :class="index==1?'actives':''" @tap="changeindex(1,'vip1')">
				<view class="padding bigzi">{{$t('buy.vi')}}</view>
				<view class="flex-sub text-center">
					<view class="solid-bottom text-xl padding">
						<text
							class="text-bold" :class="index==1?'text-red':'text-black'">{{title1}}({{price1}})</text>
					</view>
					<view class="padding"><text v-show="index==1" class="text-red">【{{$t('buy.selected')}}】</text>{{description1}}</view>
				</view>
			</view>
			<view class="solids-bottom padding-xs flex align-center service-list" :class="index==2?'actives':''" @tap="changeindex(2,'vip2')">
				<view class="padding bigzi">{{$t('buy.vi')}}</view>
				<view class="flex-sub text-center">
					<view class="solid-bottom text-xl padding">
						<text
							class="text-bold" :class="index==2?'text-red':'text-black'">{{title2}}({{price2}})</text>
					</view>
					<view class="padding"><text v-show="index==2" class="text-red">【{{$t('buy.selected')}}】</text>{{description2}}</view>
				</view>
			</view>
		</view>
		<view class="margin-top-xl solids-bottom padding-xs flex align-center service-list">
			<view class="flex-sub text-center">
				<view class="text-left">{{$t('buy.currentusergroup')}}：<text class="margin-right-sm" :class="loadlevelicon(mygroupid,1)">{{loadlevelicon(mygroupid)}}</text>  {{$t('buy.expiration')}}：<text class="text-red">{{todate(mygroupexpiry)}}</text></view>
			</view>
		</view>
		<button class="margin-top-xl cu-btn block bg-blue margin-sm lg" @tap="pay()" :disabled="loading?true:false"><text class="cuIconfont-spin" :class="loading?'cuIcon-loading2':''"></text>{{$t('buy.taptobuy')}}</button>
		<button class="cu-btn block bg-grey margin-sm lg" @tap="restoreComplateRequest()">{{$t('buy.lost')}}</button>
	</view>
</template>

<script>
	const plug=uni.requireNativePlugin("html5app-googlelogin");
	import Vue from 'vue';
	export default {
		data() {
			return {
				vipList: [],
				goodInfo: [],
				index: -1,
				red: 0,
				googleplay: 0,
				produceid: '',
				showerror: '',
				title1: '',
				title2: '',
				pricelocal1: '',
				pricelocal2: '',
				price1: '',
				price2: '',
				description1: '',
				description2: '',
				loading: false,
				mygruopid: 7,
				mygroupexpiry: 0,
				alldone: 0
			}
		},
		onLoad: function(option) {
			this.plusReady();
			this.mygroupid = getApp().globalData.mygroupid;
			this.mygroupexpiry = getApp().globalData.mygroupexpiry;
		},
		methods: {
			changeindex(index,produceid){
				this.index = index;
				this.produceid = produceid;
			},
			copy(){
				let that = this;
				uni.setClipboardData({
				    data: that.showerror,
				    success: function () {
				        console.log('success');
				    }
				});
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
			plusReady() {
				uni.showLoading({
					title: this.$t('api.loading'),
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 2000);
				const that = this;
				const IAPOrders = ["VIP1", "VIP2"];
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
										for (var j in event) {
											that.vipList.push(
												Object.assign(event[j], {
													id: event[j].productid,
													goodsName: event[j].title,
												})
											);
											that.goodInfo = that.vipList[0];
											console.log(that.vipList);
										}
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
								plug.querySku({SKU_ID:"vip1"},function(e){
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
									that.alldone++;
									that.title1 = e.name;
									that.price1 = e.price;
									that.description1 = e.description;
									if(that.alldone==2){
										uni.hideLoading();
									}
									setTimeout(() => {
										plug.querySku({SKU_ID:"vip2"},function(e){
											console.log(e);
											that.alldone++;
											that.title2 = e.name;
											that.price2 = e.price;
											that.description2 = e.description;
											if(that.alldone==2){
												uni.hideLoading();
											}
										});
									}, 300)
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
				if(this.index==-1){
					uni.showToast({
						title:that.$t('buy.choosevip'),
						icon:"error"
					})
					return;
				}
				this.loading = true;
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
							that.loading = false;
						},
						complete: () => {
							console.log("payment结束");
							that.loading = false;
						},
					});
				}else{
					if(this.index==1){
						plug.play({SKU_ID:"vip1"},function(e){
							that.showerror += JSON.stringify(e);
							if(e.packageName=="bbs.zdfx.net"){
								that.getGoogleCheck(e);
							}else if(e.code!=0){
								that.loading = false;
							}
						});
					}else if(this.index==2){
						plug.play({SKU_ID:"vip2"},function(e){
							that.showerror += JSON.stringify(e);
							if(e.packageName=="bbs.zdfx.net"){
								that.getGoogleCheck(e);
							}else if(e.code!=0){
								that.loading = false;
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
							orderid: e.orderId
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
								uni.request({
									url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:user', //获取用户基本信息。
									method: 'GET',
									timeout: 10000,
									data: {
										token: Vue.prototype.$token,
										action: 'user_info'
									},
									header: {
										'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
									},
									success: (res) => {
										console.log(res.data);
										var that = this;
										uni.setStorage({
											key: 'myuserinfo',
											data: res.data.data,
											success: function() {
												//console.log('success');
											}
										});
										uni.getStorage({
											key: 'myuserinfo',
											success: function(res) {
												console.log(res);
												if (res.data.status == 0 && res.data.freeze == 0) {
													getApp().globalData.myusername = res.data.username;
													getApp().globalData.myadminid = res.data.adminid;
													getApp().globalData.mygroupid = res.data.groupid;
													getApp().globalData.mygroupexpiry = res.data.groupexpiry;
													that.mygroupid = res.data.groupid;
													that.mygroupexpiry = res.data.groupexpiry;
													getApp().globalData.myregdate = res.data.regdate;
													getApp().globalData.mycredits = res.data.credits;
													getApp().globalData.mynewpm = res.data.newpm;
													getApp().globalData.mynewprompt = res.data.newprompt;
													getApp().globalData.myfreeze = res.data.freeze;
													getApp().globalData.onlyacceptfriendpm = res.data
														.onlyacceptfriendpm;
													getApp().globalData.myinfoprompt = parseInt(res.data.newpm) +
														parseInt(res.data.newprompt);
													that.mynewpm = getApp().globalData.mynewpm;
													that.myinfoprompt = getApp().globalData.myinfoprompt;
													that.mynewprompt = getApp().globalData.mynewprompt;
													that.mycredits = getApp().globalData.mycredits;
													that.mygroupid = getApp().globalData.mygroupid;
													uni.$emit('chosenSex', that.myinfoprompt);
													that.loading = false;
												}
												//console.log(that.mynewpm);
												//console.log(that.myinfoprompt);
											}
										});
									},
								});
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
							recid: e.transactionIdentifier
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
								uni.request({
									url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:user', //获取用户基本信息。
									method: 'GET',
									timeout: 10000,
									data: {
										token: Vue.prototype.$token,
										action: 'user_info'
									},
									header: {
										'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
									},
									success: (res) => {
										console.log(res.data);
										var that = this;
										uni.setStorage({
											key: 'myuserinfo',
											data: res.data.data,
											success: function() {
												//console.log('success');
											}
										});
										uni.getStorage({
											key: 'myuserinfo',
											success: function(res) {
												console.log(res);
												if (res.data.status == 0 && res.data.freeze == 0) {
													getApp().globalData.myusername = res.data.username;
													getApp().globalData.myadminid = res.data.adminid;
													getApp().globalData.mygroupid = res.data.groupid;
													getApp().globalData.mygroupexpiry = res.data.groupexpiry;
													that.mygroupid = res.data.groupid;
													that.mygroupexpiry = res.data.groupexpiry;
													getApp().globalData.myregdate = res.data.regdate;
													getApp().globalData.mycredits = res.data.credits;
													getApp().globalData.mynewpm = res.data.newpm;
													getApp().globalData.mynewprompt = res.data.newprompt;
													getApp().globalData.myfreeze = res.data.freeze;
													getApp().globalData.onlyacceptfriendpm = res.data
														.onlyacceptfriendpm;
													getApp().globalData.myinfoprompt = parseInt(res.data.newpm) +
														parseInt(res.data.newprompt);
													that.mynewpm = getApp().globalData.mynewpm;
													that.myinfoprompt = getApp().globalData.myinfoprompt;
													that.mynewprompt = getApp().globalData.mynewprompt;
													that.mycredits = getApp().globalData.mycredits;
													that.mygroupid = getApp().globalData.mygroupid;
													uni.$emit('chosenSex', that.myinfoprompt);
													that.loading = false;
												}
												//console.log(that.mynewpm);
												//console.log(that.myinfoprompt);
											}
										});
									},
								});
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
			restoreComplateRequest() {
				let that = this;
				uni.showModal({
					title: that.$t('buy.lost'),
					content: that.$t('buy.losttxt'),
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '../extra/fankui'
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			loadlevelicon(e, f) {
				if (e == 7) {
					if (f == 1) {
						return 'line-gray';
					} else {
						return this.$t('index.guest');
					}
				} else if (e == 9) {
					if (f == 1) {
						return 'line-gray';
					} else {
						return 'Lv0';
					}
				} else if (e == 10) {
					if (f == 1) {
						return 'line-gray';
					} else {
						return 'Lv1';
					}
				} else if (e == 29) {
					if (f == 1) {
						return 'light bg-grey';
					} else {
						return 'Lv2';
					}
				} else if (e == 30) {
					if (f == 1) {
						return 'light bg-olive';
					} else {
						return 'Lv3';
					}
				} else if (e == 31) {
					if (f == 1) {
						return 'light bg-cyan';
					} else {
						return 'Lv4';
					}
				} else if (e == 32) {
					if (f == 1) {
						return 'light bg-blue';
					} else {
						return 'Lv5';
					}
				} else if (e == 33) {
					if (f == 1) {
						return 'light bg-purple';
					} else {
						return 'Lv6';
					}
				} else if (e == 34) {
					if (f == 1) {
						return 'light bg-mauve';
					} else {
						return 'Lv7';
					}
				} else if (e == 35) {
					if (f == 1) {
						return 'light bg-pink';
					} else {
						return 'Lv8';
					}
				} else if (e == 36) {
					if (f == 1) {
						return 'light bg-brown';
					} else {
						return 'Lv9';
					}
				} else if (e == 37) {
					if (f == 1) {
						return 'light bg-yellow';
					} else {
						return 'Lv10';
					}
				} else if (e == 38) {
					if (f == 1) {
						return 'light bg-orange';
					} else {
						return 'Lv11';
					}
				} else if (e == 52) {
					if (f == 1) {
						return 'light bg-red';
					} else {
						return 'Lv12';
					}
				} else if (e == 54) {
					if (f == 1) {
						return 'light bg-blue';
					} else {
						return 'Lv13';
					}
				} else if (e == 4) {
					if (f == 1) {
						return 'light bg-grey';
					} else {
						return '禁言';
					}
				} else if (e == 5) {
					if (f == 1) {
						return 'light bg-grey';
					} else {
						return '封禁';
					}
				} else if (e == 6) {
					if (f == 1) {
						return 'light bg-grey';
					} else {
						return 'IP禁止';
					}
				} else if (e == 8) {
					if (f == 1) {
						return 'light bg-gray';
					} else {
						return 'QQ' + this.$t('index.guest');
					}
				} else if (e == 41) {
					if (f == 1) {
						return 'light bg-mauve';
					} else {
						return '摸鱼组';
					}
				} else if (e == 42) {
					if (f == 1) {
						return 'light bg-pink';
					} else {
						return '宣传组';
					}
				} else if (e == 50) {
					if (f == 1) {
						return 'light bg-cyan';
					} else {
						return '测试组';
					}
				} else if (e == 44 || e == 51) {
					if (f == 1) {
						return 'text-red';
					} else {
						return this.$t('index.vip');
					}
				} else if (e == 1) {
					if (f == 1) {
						return 'bg-blue';
					} else {
						return '管理员';
					}
				} else if (e == 2) {
					if (f == 1) {
						return 'bg-cyan';
					} else {
						return '超版';
					}
				} else if (e == 3) {
					if (f == 1) {
						return 'bg-green';
					} else {
						return '版主';
					}
				} else if (e == 16) {
					if (f == 1) {
						return 'bg-grey';
					} else {
						return '见习版主';
					}
				} else if (e == 17) {
					if (f == 1) {
						return 'bg-orange';
					} else {
						return '总编辑';
					}
				} else if (e == 18) {
					if (f == 1) {
						return 'bg-red';
					} else {
						return '信息监管';
					}
				} else if (e == 45) {
					if (f == 1) {
						return 'bg-olive';
					} else {
						return '副版主';
					}
				} else if (e == 19) {
					if (f == 1) {
						return 'bg-red';
					} else {
						return '审核员';
					}
				} else if (e == 47) {
					if (f == 1) {
						return 'bg-mauve';
					} else {
						return '元素魔法使';
					}
				} else if (e == 57) {
					if (f == 1) {
						return 'bg-yellow';
					} else {
						return '编辑';
					}
				} else {
					if (f == 1) {
						return 'line-gray';
					} else {
						return this.$t('index.guest');
					}
				}
			},
			todate(e) {
				if(e==0){
					return this.$t('buy.forever');
				}
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
				return Y + M + D + h + m + s;
			},
		}
	}
</script>

<style>
	.bigzi {
		font-size: 4rem;
		color: #ffaa00;
	}
	.imgbt{
		width: 30upx;
		height: 30upx;
	}
	.service-list {
		cursor: pointer;
		box-sizing: border-box;
		float: left;
		width: 100%;
		border-radius: 3px;
		border: 1px solid #E9E9E9;
		box-shadow: 0 0 20px 0px #e6e6e6;
		background: url(../../static/images/floor-hot-bg.png) 0 -50px repeat-x;
		text-align: center;
		padding: 20px 5px 20px 20px;
		margin-top: 20px;
	}
	.actives {
	    box-shadow: 0 0 20px #fff0ec;
	    border: 1px solid #FADABA;
	    background: url(../../static/images/floor-hot-bg1.png) 0 -50px repeat-x;
	}
</style>
