<!-- 手机绑定 -->
<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">{{$t('setting.mobilebind')}}</block>
		</cu-custom>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				platform: 0,
				title: this.$t('setting.mobilebind')
			};
		},
		methods: {
			webviewurl() {
				var that = this;
				var currentWebview = this.$scope.$getAppWebview();
				var thisurl = currentWebview.children()[0].getURL();
				var re = /\/thread-(\d*)*/i;
				var found = thisurl.match(re);

				//console.log(found);
				if (found) {
					uni.redirectTo({
						url: '../component/card?tid=' + found[1],
						animationType: 'pop-in',
						animationDuration: 200
					});
				}
				setTimeout(function() {
					if (found == null) {
						that.webviewurl();
					}
				}, 500); //如页面初始化调用需要写延迟
			},
		},
		onLoad(e) {
			// 获取传递过来的链接

			if (uni.getSystemInfoSync().platform == 'ios') {
				this.platform = 1;
			} else {
				this.platform = 2;
			}
			let that = this;
			uni.request({
				url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:bind', //获取置顶帖子
				method: 'GET',
				timeout: 10000,
				data: {
					token: that.$token,
					type: 0
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: (res) => {
					console.log(res.data);
					if (res.data.code == 200) { //未开启
						//国内
						var urlon = encodeURIComponent(getApp().globalData.zddomain +
							'plugin.php?id=jzsjiale_sms:mobile&act=bangding');
						that.url = getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:tourl&token=' +
							that.$token +
							'&action=send_url&url=' + urlon;
					} else if (res.data.code == 201) {
						//国外
						var urlon = encodeURIComponent(getApp().globalData.zddomain +
							'plugin.php?id=phone_auth&action=mobile&bp=yes#bindphone');
						that.url = getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:tourl&token=' +
							that.$token +
							'&action=send_url&url=' + urlon;
					} else {

					}
				}
			});
			console.log(this.url)
			console.log(e.url)
		},
		onReady() {
			var that = this;
			var height = 0; //定义动态的高度变量，如高度为定值，可以直接写
			var statusBarHeight = 0;
			uni.getSystemInfo({
				//成功获取的回调函数，返回值为系统信息
				success: (sysinfo) => {
					height = sysinfo.windowHeight - 45 - sysinfo.statusBarHeight; //自行修改，自己需要的高度
					statusBarHeight = sysinfo.statusBarHeight;
				},
				complete: () => {}
			});
			var currentWebview = this.$scope.$getAppWebview(); //获取当前web-view
			setTimeout(function() {
				var wv = currentWebview.children()[0];
				wv.setStyle({ //设置web-view距离顶部的距离以及自己的高度，单位为px
					top: 45 + statusBarHeight,
					height: height
				})
				that.webviewurl();
			}, 500); //如页面初始化调用需要写延迟
		}
	}
</script>
