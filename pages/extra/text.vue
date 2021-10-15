<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">快捷发帖</block>
			<block slot="right">
				<view class="action">
					<view class="cu-load cuIcon-post" @tap="post()"></view>
				</view>
			</block>
		</cu-custom>
		<view class="cu-form-group">
			<view class="title">选择发帖位置</view>
			<input placeholder="水贴/交流贴" v-model="thread" name="input"></input>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					选择
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">标题</view>
			<input placeholder="请输入发帖标题" name="input"></input>
		</view>
		<linke-ux-parser :list="content"></linke-ux-parser>
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
				picker: ['水区', '交流区', '意见区'],
				editable: true
			}
		},
		onShow() {
		    uxEditor.tempDataHandler(this.content);
		},
		onReady () {
			/**
			 * @description 设置获取链接的方法
			 * @param {String} type 链接的类型（img/video/audio/link）
			 * @param {String} value 修改链接时，这里会传入旧值
			 * @returns {Promise} 返回线上地址（type为音视频时可以返回一个数组作为源地址）
			 */
			this.$refs.article.getSrc = (type, value) => {
				return new Promise((resolve, reject) => {
					if (type === 'img') {
						uni.showActionSheet({
							itemList: ['本地选取', '远程链接'],
							success: res => {
								// 本地选取
								if (res.tapIndex === 0)
									uni.chooseImage({
										count: 1,
										success: res => {
											/* 实际使用时，这里需要上传到服务器后返回
											uni.showLoading({
												title: '上传中'
											})
											uni.uploadFile({
												url: 'xxx', // 接口地址
												filePath: res.tempFilePaths[0],
												name: 'xxx',
												success(res) {
													resolve(res.data.path) // 返回线上地址
												},
												fail: reject,
												complete: uni.hideLoading
											})*/
											resolve(res.tempFilePaths[0])
										},
										fail: reject
									})
								// 远程链接
								else {
									this.callback = {
										resolve,
										reject
									}
									this.$set(this, 'modal', {
										title: '图片链接',
										value
									})
								}
							}
						})
					} else {
						this.callback = {
							resolve,
							reject
						}
						let title
						if (type === 'video')
							title = '视频链接'
						else if (type === 'audio')
							title = '音频链接'
						else if (type === 'link')
							title = '链接地址'
						this.$set(this, 'modal', {
							title,
							value
						})
					}
				})
			}
		},
		methods: {
			PickerChange(e) {
				console.log(e.detail);
				console.log(this.picker[e.detail.value]);
				this.thread = this.picker[e.detail.value];
				this.index = e.detail.value;
			},
			post(){
				console.log(this.content)
			}
		}
	}
</script>

<style>
	@import url("../../uni_modules/linke-ux-editor/static/_icon.css");
	@import url("../../uni_modules/linke-ux-editor/static/_common.css");
</style>
