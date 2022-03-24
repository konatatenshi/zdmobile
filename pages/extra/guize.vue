<template>
	<view class="backg" style="width:100%;height:calc( 100vh - 50px - 30upx);display:block;">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">{{$t('extra.quizrule')}}</block>
		</cu-custom>
		<view class="bottom-tabbar margin-bottom">
			 <view class="box" @click="goHome">
				  <image src="../../static/images/icon1a.png"></image>
				  <view class="text">{{$t('extra.quizmain')}}</view>
			 </view>
			 <view class="box">
			 	<image src="../../static/images/iconcb.png"></image>
			 	<view class="text active">{{$t('extra.quizrule')}}</view>
			 </view>
			 <view class="box" @click="goRecord">
				 <image src="../../static/images/icon2a.png"></image>
				 <view class="text">{{$t('extra.quizrank')}}</view>
			 </view>
		</view>
	</view>
</template>

<script>
	export default {
	  name: "Intro",
	  components: {},
	  data() {
	    return {
	      active: 1
	    };
	  },
	  mounted() {
		  plus.navigator.setStatusBarStyle('dark');
	  },
	  methods: {
		goHome(){
			uni.redirectTo({
				url:'./dati'
			})
		},
		moveHandle() {},
		goRecord() {
			uni.redirectTo({
				url: './datipaihang'
			})
		}
	  }
	};
</script>

<style>
	@import "@/static/css/dtstyle.css";
	page{
		background-color: #fff;
	}
	.backg {
		background-image: url('../../static/images/gz.png');
		background-size: 100% 100%;
		background-repeat: no-repeat round;
	}
</style>
