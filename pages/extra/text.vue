<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">{{$t('post.newpost')}}</block>
			<block slot="right">
				<view class="action">
					<view v-if="fasong" class="cuIcon-loading2 cuIconfont-spin"></view>
					<view v-else class="cuIcon-post" @tap="post()"></view>
				</view>
			</block>
		</cu-custom>
		<view class="cu-form-group">
			<view class="title">{{$t('post.choose')}}</view>
			<input :placeholder="$t('post.shui')" v-model="thread" disabled=true name="input"></input>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{$t('post.ch')}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">{{$t('home.title')}}</view>
			<input :placeholder="$t('post.inputtitle')" v-model="title" name="input"></input>
		</view>
		<linke-ux-editor v-model="content"></linke-ux-editor>
		<view class="margin-tb-sm text-center"><button
			class="margin cu-btn bg-blue block lg" :disabled="fasong?true:false" @tap="post()">{{$t('api.submit')}}</button>
		</view>
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
				picker: [this.$t('post.picker1'),this.$t('post.picker2'),this.$t('post.picker3'),this.$t('post.picker4'),this.$t('post.picker5')],
				picker2: [this.$t('post.picker1'),this.$t('post.picker3')],
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
			if(this.$groupid == 10){
				this.picker = this.picker2;
			}
		},
		methods: {
			PickerChange(e) {
				console.log(this.picker[e.detail.value]);
				this.thread = this.picker[e.detail.value];
				this.index = e.detail.value;
				console.log(this.index);
				if(this.index==4){
					console.log('laba');
					uni.redirectTo({
						url: 'postlaba',
					})
				}
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
									title: this.$t('api.needlogin'),
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
