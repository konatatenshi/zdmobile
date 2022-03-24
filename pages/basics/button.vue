<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">{{$t('extra.login')}}</block>
		</cu-custom>
		<view class="basis-xl padding-top radius shadow-blur bg-red margin-top bg-img"
			style="background-image:url(../../static/queren.jpg);height: 600rpx;"></view>
		<view class="flex-sub text-center">
			<view class="solid-bottom text-xl padding">
				<text class="text-black text-bold">{{$t('extra.logintxt')}}</text>
			</view>
		</view>
		<view class="padding-xl">
			<button class="cu-btn block bg-blue margin-tb-sm lg" @tap="queren">
				<text class="cuIconfont-spin" :class="isloading?'cuIcon-loading2':''"></text>{{$t('extra.confirmlogin')}}</button>
			<button class="cu-btn block bg-black margin-tb-sm lg" @tap="fanhui">{{$t('extra.cancellogin')}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ColorList: this.ColorList,
				shadow: false,
				isloading: false,
				bordersize: '',
				sessionid: 0
			};
		},
		methods: {
			fanhui(e) {
				uni.navigateBack({
					delta: 1
				});
			},
			queren(e) {
				this.isloading=true;
				var that=this;
				var sessionid = this.sessionid;
				uni.request({
					url: getApp().globalData.zddomain + 'api/login.php', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						session_id: sessionid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.code == 200) {
							uni.navigateBack({
								delta: 1
							});
							that.isloading=false;
						}
					}
				});
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			this.sessionid = option.sessionid;
			console.log(option.sessionid); //打印出上个页面传递的参数。
		},
	}
</script>

<style>

</style>
