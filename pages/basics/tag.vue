<!-- 排行榜 -->
<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">隐私协议及条约</block>
		</cu-custom>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				tag: 0,
				title: "排行榜"
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
					console.log(found[1]);
					let that = this;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:fatie', //获取置顶帖子
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							platform: that.platform,
							tid: found[1]
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data)
							uni.redirectTo({
								url: '../component/card?tid=' + found[1],
								animationType: 'pop-in',
								animationDuration: 200
							});
						}
					});
				}
				setTimeout(function() {
					if (found == null){
						that.webviewurl();
					}
				}, 500); //如页面初始化调用需要写延迟
			},
		},
		onLoad(e) {
			// 获取传递过来的链接
			this.tag = e.id;
			if(this.tag == 1){
				this.url = getApp().globalData.zddomain + 'm/about.html';
			}else{
				this.url = getApp().globalData.zddomain + 'm/private.html';
			}
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
		}
	}
</script>
