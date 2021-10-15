<template>
	<view>
		<view class="pic-swipe-box">
			<swiper class="pic-swipe" :current="swipeIndex" @change="onChange" indicator-dots :autoplay="false" circular>
				<swiper-item v-for="(item, index) in urls" :key="index" class="pic-item"><image class="img" :src="item.url" mode="aspectFill"></image></swiper-item>
			</swiper>

			<view class="clear-box" @click="clear(swipeIndex)"><text class="iconfont iconfont-shanchu-circle"></text></view>
			<view class="link-box" @click="addLink(swipeIndex)">
				<text class="iconfont iconfont-link-url"></text>
				<text>添加链接</text>
			</view>
		</view>
		<view class="intro-box">
			<input class="input-intro" v-model="itemData.picUrls[swipeIndex].intro" placeholder="请输入图片说明" />
			<view></view>
		</view>
		<view class="detail-box">
			<view class="intro">
				<view><text>图片预览</text></view>
			</view>
			<view class="pic-box">
				<view class="v pic-wrapper" v-for="(item, index) in urls" :key="index">
					<image class="pic" :src="item.url" alt="" mode="aspectFill" @click="picDetailClick(index)" />
				</view>
				<view v-if="picNum < 8" class="v text-center v-last" @click="uploadPic">
					<text class="iconfont iconfont-xiangji"></text>
					<view>{{ picNum }}/8</view>
				</view>
			</view>
		</view>
		<view class="display-method-box">
			<view class="display-method-box_title">
				<view>展示方式</view>
				<view class="tips">
					<text v-if="itemData.picLayer == '1'">图片垂直平铺，和单图一致</text>
					<text v-if="itemData.picLayer == '2'">轮播图展示，推荐图片宽高比为2:1</text>
				</view>
			</view>
			<view class="display-method-box_list">
				<view
					class="display-method-box_list_item v"
					:class="{ active: itemData.picLayer == item.value }"
					v-for="(item, idx) in displayMethod"
					:key="idx"
					@click="itemData.picLayer = item.value"
				>
					<view class="iconfont" :class="item.icon"></view>
				</view>
			</view>
		</view>
		<view class="btn-box"><text class="btn" @click="save">保存</text></view>
	</view>
</template>

<script>
const defaultItemObj = {
	type: 'pic',
	picLayer: '1', // 1 垂直平铺 | 2轮播图
	picUrls: [
		{
			url: ' ', // 图片url
			intro: ' ', // 图片说明
			link: ' ', // 同上
			linkType: null // 同上
		}
	]
};
import uxEditor from '../../static/js/editor.js';

export default {
	data() {
		return {
			itemData: Object.assign({}, defaultItemObj, this.item.item),
			swipeIndex: 0,
			displayMethod: [
				{
					value: 1,
					name: '垂直平铺',
					icon: 'iconfont-chuizhipingpu'
				},
				{
					value: 2,
					name: '轮播',
					icon: 'iconfont-lunbo'
				}
			]
		};
	},
	computed: {
		picNum() {
			return this.itemData.picUrls.length;
		},
		urls() {
			return this.itemData.picUrls;
		}
	},
	props: {
		item: {
			type: Object,
			default: () => defaultItemObj
		},
		cloud: {
			type: Boolean,
			default: false
		},
		url: {
			type: String,
			default: ''
		}
	},
	methods: {
		uploadPic() {
			let pic = {
				url: 'http://cdn2.ifast.site/sscj/ui%E5%85%B3%E6%B3%A8%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg', // 图片url
				intro: '', // 图片说明
				link: '', // 同上
				linkType: null // 同上
			};
			if (this.cloud) {
				uxEditor
					.uploadImgCloud()
					.then(urls => {
						pic.url = urls[0];
						this.itemData.picUrls.push(pic);
					})
					.catch(err => {
						uni.showToast({
							icon: 'none',
							title: err
						});
					});
			} else {
				uxEditor
					.uploadImg(1, {
						url: this.url
					})
					.then(urls => {
						pic.url = urls[0];
						this.itemData.picUrls.push(pic);
					})
					.catch(err => {
						uni.showToast({
							icon: 'none',
							title: err
						});
					});
			}
		},
		picDetailClick(index) {
			this.swipeIndex = index;
		},
		qiehuan(status) {
			this.itemData.picLayer = status;
		},
		clear(index) {
			let urls = this.itemData.picUrls;
			if (urls.length == 1) {
				uni.showToast({
					title: '请保留至少一张图片',
					icon: 'none'
				});
				return;
			}
			if (index >= 1) {
				this.swipeIndex = index - 1;
			} else {
				this.swipeIndex = 0;
			}
			urls.splice(index, 1);
		},
		addLink(index) {
			console.log('index:', index);
			uni.showToast({
				title: '功能玩命开发中 ...',
				icon: 'none'
			});
		},
		onChange(index) {
			console.log('index', index.detail.current);
			this.swipeIndex = index.detail.current;
		},
		save() {
			let data = { item: this.itemData, index: this.item.index };
			console.log('imageEdit#save $emit:', data);
			this.$emit('save', data);
		}
	}
};
</script>

<style lang="scss" scope="scoped">
@import url('../../static/linke-ux-editor.css');
.pic-swipe-box {
	position: relative;
	.pic-swipe {
		width: 100%;
		.pic-item {
			max-height: 380rpx;
			.img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.clear-box {
		position: absolute;
		right: 15px;
		top: 10px;
		.iconfont-shanchu-circle {
			color: $uni-text-color-grey;
			background-color: #ffffff;
			border-radius: 50%;
		}
	}
	.link-box {
		display: inline-block;
		height: 52rpx;
		line-height: 52rpx;
		border-radius: 10rpx;
		background-color: rgba(50, 50, 50, 0.7);

		font-size: 24rpx;
		color: white;
		text-align: center;
		padding: 0 10rpx;

		position: absolute;
		left: 30rpx;
		bottom: 30rpx;
		.iconfont-link-url {
			font-size: 36rpx;
		}
		text {
			vertical-align: middle;
		}
	}
}
.intro-box {
	margin: 0 20rpx;
	.input-intro {
		height: 96rpx;
		line-height: 96rpx;
		border-bottom: 1px solid #f8f8f8;
	}
}
.detail-box {
	padding: 20rpx 30rpx;
	.intro {
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		line-height: 50rpx;

		.text-label {
			.pic-intro {
				padding-left: 10rpx;
				color: $uni-color-success;
			}
		}

		view:nth-of-type(2) {
			color: royalblue;
			.iconfont-qiehuan {
				font-size: 40rpx;
				vertical-align: middle;
			}
		}
	}
	.pic-box {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		color: #a8a8a8;
		.pic-wrapper {
			width: 150rpx;
			height: 150rpx;
			border-radius: $uni-border-radius-base;
			overflow: hidden;
			.pic {
				box-sizing: border-box;
				width: 100%;
				height: 100%;
			}
		}
		.v {
			width: 150rpx;
			margin-right: 10rpx;
			margin-top: 10rpx;
		}
		.v:nth-of-type(4n) {
			margin-right: 0;
		}
		.v-last {
			border: 1px solid #c8c8c8;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding: 26rpx 0;
			border-radius: $uni-border-radius-base;
		}
	}
}
.display-method-box {
	&_title {
		font-size: 24rpx;
		padding-left: 30rpx;
		line-height: 50rpx;
		.tips {
			color: $uni-text-color-grey;
		}
	}
	&_list {
		padding: 0 30rpx;

		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		.v {
			width: 150rpx;
			height: 150rpx;
			border-radius: $uni-border-radius-base;
			margin-right: 10rpx;
			margin-bottom: 10rpx;
			text-align: center;
			border: 1px solid $uni-bg-color-hover;
			.iconfont {
				font-size: 120rpx;
				line-height: 150rpx;
				vertical-align: middle;
				color: $uni-text-color-grey;
			}
		}
		.v:nth-of-type(4n) {
			margin: 0;
		}
		.active {
			border: 1px solid $uni-color-primary;
		}
	}
}
.btn-box {
	padding: 60rpx 90rpx;

	.btn {
		display: inline-block;
		text-align: center;
		width: 100%;
		height: 84rpx;
		line-height: 84rpx;
		color: #ffffff;
		background-color: $uni-color-primary;
		border-radius: $uni-border-radius-base;
	}
}
</style>
