<template>
	<view :class="'bg-white bc-'+themeColor.name">
		<cu-custom class="statustop" :bgColor="'bg-gradual-'+themeColor.name" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">{{$t('setting.changename')}}</block>
		</cu-custom>
		<view class="padding-sm">
			<form>
				<view class="cu-bar cu-form-group margin-top cuIcon-title text-orange">
					<view class="title">{{$t('setting.username')}}</view>
					<input :placeholder="$t('setting.typeusername')" v-model="name" name="input"></input>
				</view>
				<view class="padding-sm">
					<view class="solid-bottom text-sm padding"><text class="text-grey"><span>{{$t('setting.usernametxt')}}</span></text></view>
				</view>
				<view v-if="errortext!=''" class="cu-form-group justify-center">
					<view class="text-red">{{errortext}}</view>
				</view>
				<button class="cu-btn block bg-blue margin-tb-sm lg" type="" :disabled="tijiao?true:false" @tap="tijiaouser(0)">
					<text v-if="tijiao" class="cuIcon-loading2 cuIconfont-spin"></text>{{change}}</button>
			</form>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	const plug=uni.requireNativePlugin("html5app-googlelogin");
	// #endif
	export default {
		data() {
			return {
				tijiao:false,
				name: '',
				change: this.$t('setting.change'),
				errortext: ''

			};
		},
		methods: {
			tijiaouser(e){
				this.tijiao = true;
				let that = this;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:changename', //获取置顶帖子
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							newusername: that.name,
							type: e
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							that.tijiao = false;
							if (res.data.code == 200) {//未开启
									uni.showToast({
										title: that.$t('setting.changed'),
										duration: 1000
									});
							}else if(res.data.code == 201) {
									uni.showModal({
									    title: that.$t('setting.rntps'),
									    content: res.data.text,
									    success: function (res) {
									        if (res.confirm) {
												that.change = that.$t('setting.changing');
									            that.tijiaouser(1);
									        } else if (res.cancel) {
									            console.log('用户点击取消');
									        }
									    }
									});
							}else if(res.data.code == 401) {
								that.errortext = that.$t('setting.change401')
							}else if(res.data.code == 402) {
								that.errortext = that.$t('setting.change402')
							}else if(res.data.code == 403) {
								that.errortext = that.$t('setting.change403')
							}else if(res.data.code == 404) {
								that.errortext = that.$t('setting.change404')
							}else {
								that.errortext = that.$t('setting.changee')
							}
						}
					});
			},
		},
		onLoad: function(option) { 
			if (uni.getSystemInfoSync().platform == 'ios') {
				this.platform = 1;
			} else {
				this.platform = 2;
			}
		},
	}
</script>

<style>
	.cu-bar{
		border: 2upx dashed #6c6c6c;
	}
	.cu-form-group.margin-bottom{
		border: 2upx dashed #55aa7f;
	}
	.text-black.text-bold{
		border: 2upx dashed #ff0000;
	}
	.google{
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}
	.btn22{
		height: 80upx!important;
	}
</style>