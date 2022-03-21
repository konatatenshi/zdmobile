<template>
	<div>
		<uni-section class="margin-top-xl" title="只选择图片" type="line">
			<view class="example-body">
				<uni-file-picker class="exp" v-model="imageValue" limit="1" fileMediatype="image"
					:image-styles="imageStyles" @select="select" @progress="progress" @success="success" @fail="fail">
					<text class="cuIcon-add text-grey warr"></text>
				</uni-file-picker>
			</view>
		</uni-section>
		<button type="default" @click="jy_loadRewardedAd">加载激励视频广告</button>
		<button type="default" @click="jy_showRewardedAd">展示激励视频广告</button>


		<button type="default" @click="jy_loadInterstitialAd">加载插屏广告</button>
		<button type="default" @click="jy_showInterstitialAd">展示插屏广告</button>
		<button type="default" @click="showRewardedVideoAd">国内广告</button>
	</div>
</template>

<script>
	// var testModule = uni.requireNativePlugin("Test")
	import AD from '../../js_sdk/ad.js';
	export default {
		data() {
			return {
				imageStyles: {
					width: 30,
					height: 30,
					border: {
						color: "gray",
						width: 2,
						style: 'dashed',
						radius: '50%',
					}
				},
				ad: 0,
				imageValue: []
			}
		},
		onLoad() {
			let that = this;
			var jygooglead = uni.requireNativePlugin("JY-GoogleAdMob");
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
						jygooglead.jy_init();
						console.log(that.ad);
					} else {
						that.ad = 1;
						AD.load({
							adpid: 1453639237,
							adType: "RewardedVideo"
						});
						console.log(that.ad);
					}
				}
			});
		},
		methods: {
			myload: function(e) {
				uni.showToast({
					title: '加载完成'
				})
			},
			myfail: function(e) {
				uni.showToast({
					title: '加载失败'
				})
			},
			showRewardedVideoAd() {
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
					} else {
						// 播放中途退出
						console.log("onClose " + res.isEnded);
					}

					// 在此处理服务器回调逻辑
				}, (err) => {
					// 广告加载错误
					console.log(err)
				})
			},
			jy_showInterstitialAd() {
				var jygooglead = uni.requireNativePlugin("JY-GoogleAdMob");
				jygooglead.jy_showInterstitialAd({

					},
					res => {
						console.log(JSON.stringify(res));
						uni.showToast({
							icon: 'none',
							title: JSON.stringify(res)
						})
					})
			},
			jy_loadInterstitialAd() {
				var jygooglead = uni.requireNativePlugin("JY-GoogleAdMob");
				jygooglead.jy_loadInterstitialAd({
						adId: "ca-app-pub-9890309082716404/7473880937"
					},
					res => {
						console.log(JSON.stringify(res));
						uni.showToast({
							icon: 'none',
							title: JSON.stringify(res)
						})
					})
			},
			jy_showRewardedAd() {
				var jygooglead = uni.requireNativePlugin("JY-GoogleAdMob");
				jygooglead.jy_showRewardedAd({},
					res => {
						console.log(JSON.stringify(res));
						uni.showToast({
							icon: 'none',
							title: JSON.stringify(res)
						})
					})
			},
			jy_loadRewardedAd() {
				var jygooglead = uni.requireNativePlugin("JY-GoogleAdMob");
				jygooglead.jy_loadRewardedAd({
					adId: "ca-app-pub-9890309082716404/7965174834",
					appId: "ca-app-pub-9890309082716404~8229926380"
				}, res => {
					console.log(JSON.stringify(res));
					uni.showToast({
						icon: 'none',
						title: JSON.stringify(res)
					})
				})
			},
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功：', e)
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			}
		}
	}
</script>

<style>
	.custom-image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
	}

	.example-body {
		padding: 10upx;
		width: 140upx;
		height: 140upx;
	}

	.exp {
		width: 120upx;
		height: 120upx;
	}

	.file-picker__box {
		width: 100upx !important;
		height: 100upx !important;
	}
</style>
