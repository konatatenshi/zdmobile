<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">用户举报</block>
			<block slot="right">
				<view class="action">
					<view v-if="fasong" class="cuIcon-loading2 cuIconfont-spin"></view>
					<view v-else class="cuIcon-post" @tap="post()"></view>
				</view>
			</block>
		</cu-custom>
		<view class="cu-form-group cu-list grid min-ht col-1 solid-bottom">
			<text class="text-yellow cuIcon-warn"></text><text class="margin-left-xl">你的举报内容将在24小时内受理。若举报成功将会第一时间通知您处理结果。请尽量在下列举报描述中提交完整的举报信息及材料。</text>
		</view>
		<view class="cu-form-group">
			<view class="title">选择举报原因</view>
			<input placeholder="请选择举报原因" v-model="thread" disabled=true name="input"></input>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					选择
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">被举报者用户名</view>
			<input placeholder="默认举报人" v-model="title" disabled=true name="input"></input>
		</view>
		<view class="cu-form-group cu-list grid min-ht col-1 solid-bottom">
			<text>举报描述（选填）（可插入截图）</text>
		</view>
		<linke-ux-editor v-model="content"></linke-ux-editor>
		<view class="margin-tb-sm text-center"><button
			class="margin cu-btn bg-red block lg" :disabled="fasong?true:false" @tap="post()">提交</button>
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
				picker: ['色情低俗', '不实信息', '违法犯罪', '垃圾广告', '未成年相关', '非法集资', '侵犯名誉', '侵犯版权', '冒充他人', '涉嫌诈骗', '头像/签名违规', '其他'],
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
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			this.title = option.username;
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
				if (that.index < 0 || that.index>11) {
					uni.showToast({
					    title: '举报内容选择错误',
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
							tid: 4,
							jubao: that.index,
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
									title: '举报成功，可关闭此页面了。',
									icon:'none',
									duration: 2000
								});
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
	.min-ht{
		min-height: 60upx;
	}
	.text-yellow.cuIcon-warn {
	    position: absolute;
	}
</style>
