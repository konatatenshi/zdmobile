<template>
	<div>
		<HXR-GoogleMobileADBannerAd style="width:750rpx;height:50px;background-color: #555555;"
			adSize="kGADAdSizeBanner" adUnitID="ca-app-pub-3940256099942544/2934735716" @adLoaded="myload()"
			@adFail="myfail()"></HXR-GoogleMobileADBannerAd>
		<HXR-GoogleMobileADBannerAd style="width:750rpx;height:100px;background-color: #555555;"
			adSize="kGADAdSizeLargeBanner" adUnitID="ca-app-pub-3940256099942544/2934735716">
		</HXR-GoogleMobileADBannerAd>
		<HXR-GoogleMobileADBannerAd style="width:300px;height:250px;background-color: #555555;"
			adSize="kGADAdSizeMediumRectangle" adUnitID="ca-app-pub-3940256099942544/2934735716">
		</HXR-GoogleMobileADBannerAd>
		<HXR-GoogleMobileADBannerAd style="width:750rpx;height:50px;background-color: #555555;"
			adSize="kAutoHeightWithWidth" adUnitID="ca-app-pub-3940256099942544/2934735716">
		</HXR-GoogleMobileADBannerAd>

		<button type="default" @click="showInterstitialAd()">插屏广告</button>
		<button type="default" @click="showRewardedAd()">激励广告</button>
		<button type="default" @click="showInterstitialRewardedAd()">插屏激励广告</button>
		<uni-section title="只选择图片" type="line">
			<view class="example-body">
					<uni-file-picker class="exp" v-model="imageValue" limit="1" fileMediatype="image" :image-styles="imageStyles" @select="select" @progress="progress"
					@success="success" @fail="fail"><text class="cuIcon-add text-grey warr"></text></uni-file-picker>
			</view>
		</uni-section>
	</div>
</template>

<script>
	var googleInterstitialAd = uni.requireNativePlugin('HXR-GoogleMobileADInterstitialAd');
	var googleRewardedAd = uni.requireNativePlugin('HXR-GoogleMobileADRewardedAd');
	var googleInterstitialRewardedAd = uni.requireNativePlugin('HXR-GoogleMobileADRewardedInterstitialAd');

	// var testModule = uni.requireNativePlugin("Test")
	export default {
		data() {
			return {
				imageStyles:{
					width:30,
					height:30,
					border:{
						color:"gray",
						width:2,
						style:'dashed',
						radius:'50%',
					}
				},
				imageValue: []
			}
		},
		onLoad() {
			googleInterstitialAd.createADWithAdUnitID('ca-app-pub-9890309082716404/7473880937', (res) => {
				console.log(JSON.stringify(res));
				uni.showToast({
					title: res.msg
				})
			});

			////不传入验证参数
			googleRewardedAd.createADWithAdUnitID('ca-app-pub-9890309082716404/7965174834', function(res) {
				console.log(JSON.stringify(res));
			});
			//googleRewardedAd.createADWithAdUnitID('ca-app-pub-3940256099942544/1712485313', function(res){
			//    console.log(JSON.stringify(res));
			//}, {'userIdentifier':'your user identifier', 'customRewardString': 'your customRewardString'});

			////不传入验证参数
			googleInterstitialRewardedAd.createADWithAdUnitID('ca-app-pub-9890309082716404/2770356778', function(res) {
				console.log(JSON.stringify(res));
			});
			//googleInterstitialRewardedAd.createADWithAdUnitID('ca-app-pub-3940256099942544/4806952744', function(res){
			//    console.log(JSON.stringify(res));
			//}, {'userIdentifier':'your user identifier', 'customRewardString': 'your customRewardString'});
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
			showInterstitialAd: function() {
				googleInterstitialAd.showWithCallback(function(res) {
					console.log(JSON.stringify(res));
					uni.showToast({
						title: res.msg
					})
				});
			},
			showRewardedAd: function() {
				googleRewardedAd.showWithCallback(function(res) {
					console.log(JSON.stringify(res));
				});
			},
			showInterstitialRewardedAd: function() {
				googleInterstitialRewardedAd.showWithCallback(function(res) {
					console.log(JSON.stringify(res));
				});
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
		padding:10upx;
		width: 140upx;
		height: 140upx;
	}
	.exp{
		width: 120upx;
		height: 120upx;
	}
	.file-picker__box{
		width: 100upx!important;
		height: 100upx!important;
	}
</style>
