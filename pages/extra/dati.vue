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
		<view class="tip2 margin-bottom-xl"><text class="text" style="margin-bottom: 200upx;">技术支持：终点论坛</text></view>
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
	export default {
		name: "contact",
		data() {
			return {
				isLogin: uni.getStorageSync('isLogin'),
				counts: 0,
				mc: 0,
				show: false
			}
		},
		mounted() {
			this.getcounts();
			plus.navigator.setStatusBarStyle('dark');
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
</style>
