<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"> 设置</block>
		</cu-custom>
		<view class="cu-form-group">
			<view class="title">省流量模式（非Wifi不显示图片）</view>
			<switch @change="Setimage" class="blue" :class="image?'checked':''" :checked="image?true:false"></switch>
		</view>
		<view class="cu-form-group">
			<view class="title">选择尺寸</view>
			<radio-group @change="SetShadow">
				<label class="margin-left-sm">
					<radio class="blue radio" value="sm"></radio>
					<text class="margin-left-sm"> 小</text>
				</label>
				<label class="margin-left-sm">
					<radio class="blue radio" value="" checked></radio>
					<text class="margin-left-sm"> 中</text>
				</label>
				<label class="margin-left-sm">
					<radio class="blue radio" value="lg"></radio>
					<text class="margin-left-sm"> 大</text>
				</label>
			</radio-group>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				modalName: '',
				image: false,
				size: '',
				color: 'red',
				shadow: false,
				border: false,
				bordersize: ''
			};
		},
		methods: {
			Setimage(e) {
				var that = this;
				uni.setStorage({
					key: 'imageswitch',
					data: e.detail.value,
					success: function() {
						that.image = e.detail.value
						Vue.prototype.$imageswitch = e.detail.value
						//console.log(that.swiperList);
					}
				});
			},
			SetShadow(e) {
				this.shadow = e.detail.value
			},
		},
		created() {
			var that = this;
			uni.getStorage({
				key: 'imageswitch',
				success: function(res) {
					that.image = res.data;
					//console.log(that.swiperList);
				}
			});
		}
	}
</script>

<style>
	.box {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100px;
	}
</style>
