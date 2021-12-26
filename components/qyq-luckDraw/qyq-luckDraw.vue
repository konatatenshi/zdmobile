<template>
	<view class="content">
		<view class="gridRow">
			<view class="gridRow_in">
				<view @click="lottoLuckDraw(index,item.yifan)" :class="index==activeIndex||activeIndex==10||item.yifan==1?'yellow':''" class="grid" v-for="(item,index) in cardList" :key="index">
					<view :class="index==activeIndex||activeIndex==10||item.yifan==1?'active':''" class="fm">
						<image mode="widthFix" v-if="fanbei" :src="index==realIndex?'../../static/redBag/wah.png':'../../static/redBag/wxh.png'"></image>
						<image mode="widthFix" v-else :src="index==realIndex?'../../static/redBag/wam.png':'../../static/redBag/wxm.png'"></image>
						<view class="text_row">
							<view class="price"> <text class="lg text-yellow cuIcon-choicenessfill margin-right-xs"></text>{{item.reward}}</view>
							<view class="dnati">{{item.info}}</view>
						</view>
					</view>
					<view :class="index==activeIndex||activeIndex==10||item.yifan==1?'active':''" class="zm">
						<image mode="widthFix" src="../../static/redBag/wzm.png"></image>
					</view>
				</view>
			</view>
		</view>

		<view @click="showPop = false" class="maskRow" v-if="showPop">
			<view class="imgRow">
				<u-image width="100%" mode="widthFix" src="/static/redBag/popup.png"></u-image>
				<view class="text_row">
					<view class="price">￥ <span>{{showMoney}}</span> </view>
					<view class="tip">{{showText}}</view>
				</view>
				<image @click="showPop = false" class="cancel" src="/static/redBag/cancel.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	// import {lottoLuckDraw,getWeekWinList} from '@/api/activity.js'
	import AES from '../../js_sdk/ar-aes/ar-aes.js';
	import w_md5 from "../../js_sdk/zww-md5/w_md5.js"
	export default {
		data() {
			return {
				loading:true,
				showPop: false,
				activeIndex: null,
				realIndex: null,
				fanbei: false,
				allfan: false,
			};
		},
		props:['cardList'],
		onShow(){
			this.r_id = uni.getStorageSync("week_id")
		},
		onLoad() {
			// this.getWeekWinList()
		},
		onReady() {
			setTimeout(()=>{
				this.loading = false
			},1000)
		},
		methods: {
			async lottoLuckDraw(count,yifan){
					if(yifan==1){
						return;
					}
					var that = this;
					if(that.allfan){
						return;
					}else{
						that.allfan = true;
					}
					const dateTime = Date.now();
					const timestamp = Math.floor(dateTime / 1000);
					const timestamps = 'S' + Math.floor(dateTime / 1000);
					const signature = plus.navigator.getSignature();
					const signe = AES.AES.encrypt(signature,w_md5.hex_md5_16(timestamps),w_md5.hex_md5_16(that.$uid));
					console.log(signe);
					console.log(signature);
					console.log(timestamp);
					console.log(w_md5.hex_md5_16(timestamps));
					console.log(w_md5.hex_md5_16(that.$uid));
					that.disabled = true;
						uni.request({
							url: getApp().globalData.zddomain + 'plugin.php?id=yinxingfei_zzza:yaoyao', //获取轮播列表
							method: 'GET',
							timeout: 10000,
							data: {
								apptoken: that.$token,
								datiinfi: count,
								relatedid: 4,
								time: timestamp,
								sign : signe
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
							},
							success: (res) => {
								console.log(res.data)
								if(res.data.success){
									that.fanbei = res.data.fanbei;
									that.cardList = res.data.list;
										//that.$emit("lottoLuckDraw",count)
									that.activeIndex = count;
									that.realIndex = count;
									setTimeout(function() {
										that.activeIndex = 10;
									}, 1500)
								}else{
									if(res.data.token=='fail'){
										uni.showToast({
											title: '验证失败，跳转到旧版摇摇中',
											icon:'none',
											duration: 2000
										})
										setTimeout(function() {
											uni.navigateTo({
												url: '../basics/progress'
											})
										}, 2000)
									}else{
										uni.showToast({
											title: '今日已翻',
											icon:'error',
											duration: 2000
										})
									}
								}
				// if(res.data.code==0){
				// 	uni.showToast({
				// 		title:res.data.msg,
				// 		icon:"none"
				// 	})
				// }else{
				// 	this.activeIndex = count
				// 	console.log(count)
				// 	this.cardList[count].money = res.data.data.award_amount
				// 	this.showMoney = res.data.data.award_amount
					
				// 	this.cardList[count].flag = res.data.data.tips
				// 	this.showText =  res.data.data.tips
				// 	setTimeout(()=>{
				// 		this.showPop = true
				// 	},2000)
				// }
				
					}
				});
			},
			navtoPage(i) {
				if (i == 0) {
					uni.navigateTo({
						url:"/pagesC/weekCoupon/weekCoupon"
					})
				} else if (i == 1) {
					uni.navigateTo({
						url: '/pagesC/winningRecord/winningRecord'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.maskRow {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.7);
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;

		.imgRow {
			width: 80%;
			height: auto;
			position: relative;

			.text_row {
				position: absolute;
				left: 0;
				right: 0;
				top: 60rpx;
				margin: auto;
				display: flex;
				flex-direction: column;
				align-items: center;

				.price {
					color: #F93506;
					font-weight: 550;
					font-size: 60rpx;

					span {
						font-size: 80rpx;
					}
				}

				.tip {
					margin-top: 12rpx;
					color: #C37B50;
					font-size: 50rpx;
				}
			}

			.cancel {
				position: absolute;
				left: 0;
				right: 0;
				bottom: -100rpx;
				margin: auto;
				width: 70rpx;
				height: 70rpx;
			}
		}
	}

	.content { 
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;

		.gridRow {
			width: 96%;
			padding: 60rpx 0;
			border-radius: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			transform-origin: right top;
			background: url(../../static/redBag/week_kk.png);
			background-size: 100% 100%;
			background-position: center;
			background-repeat: no-repeat;
			perspective: 600;
			position: relative;
			.gridRow_in{
				// border: 1rpx solid #007AFF;
				width: 86%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.grid {
					width: 32%;
					height: calc(100vw*0.96*0.32);
					font-size: 60rpx;
					font-weight: 600;
					border-radius: 30rpx;
					position: relative;
				
					.zm,
					.fm {
						position: absolute;
						transition: transform 1.5s;
						top: 0;
						bottom: 0;
						right: 0;
						left: 0;
						margin: auto;
						width: 80%;
						// height: 100%;
						display: flex;
						justify-content: center;
						//backface-visibility: hidden;
						align-items: center;
				
					}
					.zm {
						width: 95%;
						backface-visibility: hidden;
						font-size: 24rpx;
						z-index: 99999;
					}
					
					.fm {
						width: 95%;
						image {
							width: 100%;
						}
				
						backface-visibility: hidden;
						transform: rotateY(180deg);
						.text_row {
							position: absolute;
							width: 85%;
							height: 100%;
							//transform: rotateY(180deg);
							text-align: center;
							display: flex;
							flex-direction: column;
				
							.price {
								margin-top: 40rpx;
								font-weight: 550;
								color: #F93506;
								font-size: 36rpx;
				
								span {
									font-size: 28rpx;
								}
							}
				
							.dnati {
								color: #C37B50;
								font-size: 24rpx;
							}
						}
					}
				
					.zm.active {
						transform: rotateY(180deg);
					}
					.fm.active {
						transform: rotateY(360deg);
					}
				}
			}

		}
	}
</style>
