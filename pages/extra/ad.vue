<template>
    <div>
        <HXR-GoogleMobileADBannerAd style="width:750rpx;height:50px;background-color: #555555;" adSize="kGADAdSizeBanner" adUnitID="ca-app-pub-3940256099942544/2934735716" @adLoaded="myload()" @adFail="myfail()"></HXR-GoogleMobileADBannerAd>
        <HXR-GoogleMobileADBannerAd style="width:750rpx;height:100px;background-color: #555555;" adSize="kGADAdSizeLargeBanner" adUnitID="ca-app-pub-3940256099942544/2934735716"></HXR-GoogleMobileADBannerAd>
        <HXR-GoogleMobileADBannerAd style="width:300px;height:250px;background-color: #555555;" adSize="kGADAdSizeMediumRectangle" adUnitID="ca-app-pub-3940256099942544/2934735716"></HXR-GoogleMobileADBannerAd>
        <HXR-GoogleMobileADBannerAd style="width:750rpx;height:50px;background-color: #555555;" adSize="kAutoHeightWithWidth" adUnitID="ca-app-pub-3940256099942544/2934735716"></HXR-GoogleMobileADBannerAd>

        <button type="default" @click="showInterstitialAd()">插屏广告</button>
        <button type="default" @click="showRewardedAd()">激励广告</button>
        <button type="default" @click="showInterstitialRewardedAd()">插屏激励广告</button>
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

            }
        },
        onLoad() {
            googleInterstitialAd.createADWithAdUnitID('ca-app-pub-9890309082716404/7473880937', (res) => {
                console.log(JSON.stringify(res));
                uni.showToast({
                    title:res.msg
                })
            });

            ////不传入验证参数
             googleRewardedAd.createADWithAdUnitID('ca-app-pub-9890309082716404/7965174834', function(res){
              console.log(JSON.stringify(res));
             });
            //googleRewardedAd.createADWithAdUnitID('ca-app-pub-3940256099942544/1712485313', function(res){
            //    console.log(JSON.stringify(res));
            //}, {'userIdentifier':'your user identifier', 'customRewardString': 'your customRewardString'});

            ////不传入验证参数
             googleInterstitialRewardedAd.createADWithAdUnitID('ca-app-pub-9890309082716404/2770356778', function(res){
              console.log(JSON.stringify(res));
             });
            //googleInterstitialRewardedAd.createADWithAdUnitID('ca-app-pub-3940256099942544/4806952744', function(res){
            //    console.log(JSON.stringify(res));
            //}, {'userIdentifier':'your user identifier', 'customRewardString': 'your customRewardString'});
        },
        methods: {
            myload:function(e){

                uni.showToast({
                    title:'加载完成'
                })
            },
            myfail:function(e){
                uni.showToast({
                    title:'加载失败'
                })
            },
            showInterstitialAd:function(){
                googleInterstitialAd.showWithCallback(function(res){
                    console.log(JSON.stringify(res));
                    uni.showToast({
                        title:res.msg
                    })
                });
            },
            showRewardedAd:function(){
                googleRewardedAd.showWithCallback(function(res){
                    console.log(JSON.stringify(res));
                });
            },
            showInterstitialRewardedAd:function(){
                googleInterstitialRewardedAd.showWithCallback(function(res){
                    console.log(JSON.stringify(res));
                });
            },
        }
    } 
</script>

<style>

</style>