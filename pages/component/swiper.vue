<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom :bgColor="'bg-'+themeColor.name" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">我的道具</block>
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
				title: "我的道具"
			};
		},
		methods: {
			webviewurl() {
				var that = this;
				var currentWebview = this.$scope.$getAppWebview();
				var thisurl = currentWebview.children()[0].getURL();
				console.log(thisurl);
				plus.navigator.setStatusBarStyle('dark');
				var re = /mod=forumdisplay(.*)fid=(\d*)*/i;
				var found = thisurl.match(re);
				var wv = currentWebview.children()[0];
				wv.overrideUrlLoading({mode: 'allow',match: '.*mod=magic.*'}, function(e) {
				    console.log('reject url: ' + e.url);
					var found = e.url.match(re);
					if (found) {
						uni.redirectTo({
							url: '../basics/forum?forumid=' + found[2],
							animationType: 'pop-in',
							animationDuration: 200
						});
					}
					console.log(found);
				});
			},
		},
		onLoad(e) {
			// 获取传递过来的链接
			if (uni.getSystemInfoSync().platform == 'ios') {
				this.platform = 1;
			} else {
				this.platform = 2;
			}
			var urlon = encodeURIComponent(getApp().globalData.zddomain + 'home.php?mod=magic&app=1');
			this.url = getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:tourl&token=' + this.$token +
				'&action=send_url&url=' + urlon;
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
