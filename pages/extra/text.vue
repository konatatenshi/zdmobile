<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">快捷发帖</block>
			<block slot="right">
				<view class="action">
					<view v-if="fasong" class="cuIcon-loading2 cuIconfont-spin"></view>
					<view v-else class="cuIcon-post" @tap="post()"></view>
				</view>
			</block>
		</cu-custom>
		<view class="cu-form-group">
			<view class="title">选择发帖位置</view>
			<input placeholder="水贴/交流贴" v-model="thread" disabled=true name="input"></input>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					选择
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">标题</view>
			<input placeholder="请输入发帖标题" v-model="title" name="input"></input>
		</view>
		<linke-ux-editor v-model="content"></linke-ux-editor>
	</view>
</template>

<script>
	import uxEditor from '../../uni_modules/linke-ux-editor/static/js/editor.js';
	export default {
		data () {
			return {
				index: -1,
				content: [],
				modal: null,
				thread: '',
				title: '',
				platform: 0,
				picker: ['水区', '交流区', '意见区', '教程区'],
				editable: true,
				fasong: false
			}
		},
		onShow() {
		    uxEditor.tempDataHandler(this.content);
			if (uni.getSystemInfoSync().platform == 'ios') {
				this.platform = 1;
			} else {
				this.platform = 2;
			}
		},
		onReady () {
			/**
			 * @description 设置获取链接的方法
			 * @param {String} type 链接的类型（img/video/audio/link）
			 * @param {String} value 修改链接时，这里会传入旧值
			 * @returns {Promise} 返回线上地址（type为音视频时可以返回一个数组作为源地址）
			 */
		},
		methods: {
			PickerChange(e) {
				console.log(e.detail);
				console.log(this.picker[e.detail.value]);
				this.thread = this.picker[e.detail.value];
				this.index = e.detail.value;
			},
			post(){
				console.log(this.content);
				var that = this;
				console.log(that.title.length);
				if (that.title.length < 4) {
					uni.showToast({
					    title: '字数太少',
						icon:'none',
					    duration: 2000
					});
					this.fasong = false;
					return;
				}
				if (that.index < 0 || that.index>3) {
					uni.showToast({
					    title: '板块选择错误',
						icon:'none',
					    duration: 2000
					});
					this.fasong = false;
					return;
				}
				if (!this.fasong) {
					that.fasong = true;
					var title = encodeURI(that.title);
					var post = new Buffer(JSON.stringify(that.content));
					var postm = uni.arrayBufferToBase64(post);
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:newpost', //获取置顶帖子
						method: 'POST',
						timeout: 10000,
						data: {
							token: that.$token,
							tid: that.index,
							title: title,
							content: postm,
							platform: that.platform
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res)
							console.log(res.data)
							if (res.data.code == 404) {
								uni.showToast({
									title: '需要登录',
									icon:'none',
									duration: 2000
								});
							} else if (res.data.code == 401) {
								that.fasong = false;
								uni.showToast({
									title: res.data.message,
									icon:'none',
									duration: 2000
								});
							} else {
								uni.showToast({
									title: '发帖成功，正在跳转',
									icon:'none',
									duration: 2000
								});
								setTimeout(() => {
									uni.redirectTo({
										url: '../component/card?tid=' + res.data.tid,
									})
								}, 200)
							}
						}
					});
				}
			}
		}
	}
</script>

<style>
	@import url("../../uni_modules/linke-ux-editor/static/_icon.css");
	@import url("../../uni_modules/linke-ux-editor/static/_common.css");
</style>
