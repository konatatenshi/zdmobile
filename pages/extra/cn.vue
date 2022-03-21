<template>
	<view :class="'bg-white bc-'+themeColor.name">
		<cu-custom class="statustop" :bgColor="'bg-gradual-'+themeColor.name" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">更改用户名</block>
		</cu-custom>
		<view class="padding-sm">
			<form>
				<view class="cu-bar cu-form-group margin-top cuIcon-title text-orange">
					<view class="title">用户名</view>
					<input placeholder="请输入新用户名" v-model="name" name="input"></input>
				</view>
				<view class="padding-sm">
					<view class="solid-bottom text-sm padding"><text class="text-grey"><span>注意：注册一个月内更改免费，后更改需要500金币，第二次1000金币，第三次1500金币，以此类推。修改成功后如用用户名登录请使用新用户名，手机号登录不受影响。改名成功后，系统可能会有缓存，可能至多1个小时完全生效，请勿重复改名。</span></text></view>
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
				change: '更改',
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
										title: '改名成功',
										duration: 1000
									});
							}else if(res.data.code == 201) {
									uni.showModal({
									    title: '改名提示',
									    content: res.data.text,
									    success: function (res) {
									        if (res.confirm) {
												that.change = '改名中，请稍候';
									            that.tijiaouser(1);
									        } else if (res.cancel) {
									            console.log('用户点击取消');
									        }
									    }
									});
							}else if(res.data.code == 401) {
								that.errortext = '改名失败，已存在相同用户名。'
							}else if(res.data.code == 402) {
								that.errortext = '改名失败，金钱不足或改名冷却期。'
							}else if(res.data.code == 403) {
								that.errortext = '用户名长度需大于3字节且小于15字节。'
							}else if(res.data.code == 404) {
								that.errortext = '用户名含有特殊字符。'
							}else {
								that.errortext = '改名失败，内部错误。'
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