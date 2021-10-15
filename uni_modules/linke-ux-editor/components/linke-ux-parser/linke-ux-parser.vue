<template>
	<view>
		<view class="items">
			<view class="item" v-for="(item, index) in listData" :key="index">
				<!-- 标题 -->
				<view v-if="item.type == 'title'" class="title-box">
					<view
						:class="{ 'title-left': item.txtStyleAlign == 'left', 'title-center': item.txtStyleAlign == 'center', 'title-right': item.txtStyleAlign == 'right' }"
						:style="{ color: item.txtStyleColor, 'font-size': item.txtStyleSize + 'px' }"
					>
						<view class="title-text" :class="{ 'title-style': item.txtStyleAlign == 'center' }">{{ item.txtContent }}</view>
					</view>
				</view>
				<!-- 文本 -->
				<view v-if="item.type == 'txt'" class="txt-box">
					<view
						class="textarea"
						:class="{
							'text-left': item.txtStyleAlign == 'left',
							'text-center': item.txtStyleAlign == 'center',
							'text-right': item.txtStyleAlign == 'right',
							'text-bold': item.txtStyleBold,
							'text-italic': item.txtStyleItalic,
							'text-underline': item.txtStyleUnderline,
							'text-del': item.txtStyleDel,
							'text-indent': item.txtStyleIndent
						}"
						:style="{ color: item.txtStyleColor, 'font-size': item.txtStyleSize + 'px' }"
						@click="to(item.txtLink)"
					>
						<rich-text v-if="item.txtContent" :nodes="item.txtContent | html"></rich-text>
					</view>
				</view>
				<!-- 图片 -->
				<view v-else-if="item.type == 'pic'" class="pic-box">
					<!-- 垂直平铺 -->
					<view v-if="item.picLayer == '1'">
						<view v-for="(subItem, subIndex) in item.picUrls" :key="subIndex" class="pic-item-1">
							<image class="img" :src="subItem.url" mode="widthFix" />
							<view class="img-intro">{{ subItem.intro }}</view>
						</view>
					</view>
					<!-- 轮播 -->
					<view v-else>
						<swiper class="pic-swipe" @change="onChange(item, index, $event)" indicator-dots :autoplay="false" :interval="3000" :duration="1000" circular>
							<swiper-item v-for="(subItem, subIndex) in item.picUrls" :key="subIndex" class="pic-item">
								<image class="img" :src="subItem.url" mode="aspectFill" />
								<text></text>
							</swiper-item>
						</swiper>
						<view class="img-intro">{{ item.intro }}</view>
					</view>
				</view>
				<!-- <view v-else-if="item.type == 'pic'"><img width="100%" :src="item.pic.urls[0].url" /></view>
				-->
				<view v-else-if="item.type == 'video'" class="video-box">
					<video ref="video" width="100%" :src="item.video.url" controls :poster="item.video.url + '?vframe/jpg/offset/0'"></video>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// 数据格式
// const t = [
// 	{
// 		type: String, // txt | pic | video,
// 		txt: {
// 			content: '',
// 			link: '', // 点击图片跳转的地址
// 			linkType: Number, // 链接类型  1网址 | 2应用
// 			style: {
// 				align: String, // text-left | text-center | text-right
// 				size: String, // 10px | 12px | 14px | 16px | 18px | 22px | 28px | 32px | 36px | 48px
// 				bold: Boolean, // 加粗 true | false
// 				italic: Boolean, //斜体 true | false
// 				underline: Boolean // 下划线 true | false
// 			}
// 		},
// 		pic: {
// 			layer: String, // 布局 1垂直平铺 | 2 双图并列平分 | 3_2_1 三图，左2右1 | 3_1_2 三图左1右2 | 5
// 			urls: [
// 				{
// 					url: String, // 图片url
// 					intro: String, // 图片说明
// 					link: '', // 同上
// 					linkType: Number // 同上
// 				}
// 			]
// 		},
// 		video: {
// 			url: String, // 视频URL
// 			poster: String // 视频封面
// 		}
// 	}
// ];

export default {
	data() {
		return {
			listData: this.list,
			swipeIndexArr: []
		};
	},
	props: {
		list: Array,
		domain: {
			type: Array,
			default: () => []
		}
	},
	watch: {
		list(newV) {
			this.listData = newV;
		}
	},
	methods: {
		inDomain(url) {
			// #ifdef H5
			return true;
			// #endif

			// #ifdef MP-WEIXIN
			return this.domain.some(item => url.indexOf(item) != -1);
			// #endif
		},
		onChange(item, index, $event) {
			this.$set(item, 'intro', item.picUrls[$event.detail.current].intro ? item.picUrls[$event.detail.current].intro : '');
			this.swipeIndex = $event;
			this.swipeIndexArr[index] = $event;
		},
		to(url) {
			if (!url) {
				return;
			}
			if (this.inDomain(url)) {
				// #ifdef H5
				window.location.href = url;
				// #endif
			}
		}
	},
	filters: {
		html(str) {
			if (str) {
				return (
					'<p>' +
					str
						.replace(/\r\n/g, '<br/>')
						.replace(/\n/g, '<br/>')
						.replace(/\s/g, ' ') +
					'</p>'
				);
			}
			return '';
		}
	}
};
</script>

<style lang="scss" scope="scoped">
@import url('../../static/linke-ux-editor.css');
.items {
	overflow-y: scroll;
	overflow-x: hidden;
	.item {
		margin-bottom: 1px;
		position: relative;
		.title-box {
			box-sizing: border-box;
			.title-text {
				padding-left: 10px;
				margin: 10px 0;
			}
		}
		.txt-box {
			position: relative;
			.paiban-box {
				position: absolute;
				bottom: 5px;
				right: 15px;

				display: none;
			}
			.textarea {
				box-sizing: border-box;
				padding: 5px 0 0 0;
				width: 100%;
				resize: none;
			}
		}
		.pic-box {
			position: relative;
			.pic-item-1 {
				.img {
					width: 100%;
					height: 100%;
				}
			}
			.img-intro {
				line-height: 2em;
				text-align: center;
				color: $uni-text-color-grey;
				font-size: 24rpx;
			}
			swiper {
				min-height: 375rpx;
			}
			.pic-item {
				.img {
					width: 100%;
				}
			}
			swiper {
				// height: auto;
				width: 750rpx;
				min-height: 300rpx;
				.image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
</style>
