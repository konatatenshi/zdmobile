<template>
	<view style="padding: 5px;">
		<view class="items-yulan">
			<view class="item" v-for="(item, index) in list" :key="index">
				<!-- 标题预览 -->
				<view v-if="item.type == 'title'" class="title-box ux-item-border">
					<view
						:class="{ 'title-left': item.txtStyleAlign == 'left', 'title-center': item.txtStyleAlign == 'center', 'title-right': item.txtStyleAlign == 'right' }"
						:style="{ color: item.txtStyleColor, 'font-size': item.txtStyleSize + 'px' }"
						@click="editTitle(item, index)"
					>
						<view class="title-text" :class="{ 'title-style': item.txtStyleAlign == 'center' }">{{ item.txtContent }}</view>
					</view>
				</view>
				<!-- 文本预览 -->
				<view v-if="item.type == 'txt'" class="txt-box ux-item-border">
					<textarea
						maxlength="-1"
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
						v-model="item.txtContent"
						placeholder="请输入内容"
						@click="showPaiban(index)"
					/>
					<view class="link-box" v-if="item.txtLink">
						<text class="iconfont iconfont-link-url"></text>
						<text>{{ item.txtLink | substr(20) }}</text>
					</view>
					<view class="paiban-box" @click="editTxt(item, index)" v-if="index == showPaibanIndex">排版</view>
				</view>
				<!-- 图片预览 -->
				<view v-else-if="item.type == 'pic'" class="pic-box ux-item-border">
					<!-- 单图 -->
					<view v-if="item.picLayer == '1'" class="pic-item-1">
						<image class="image" :src="item.picUrls[0].url" mode="aspectFill" />
						<text></text>
					</view>
					<!-- 轮播图 -->
					<view v-else>
						<swiper class="pic-swipe" @change="onChange(item, index, $event)" indicator-dots :autoplay="false" :interval="3000" :duration="1000" circular>
							<swiper-item v-for="(item_, index_) in item.picUrls" :key="item_.url" class="pic-item">
								<image class="image" :src="item_.url" mode="aspectFill" />
								<text></text>
							</swiper-item>
						</swiper>
					</view>
					<view class="img-intro">{{ item.intro }}</view>
					<view class="img-edit-box" @click="editPic(item, index)">编辑图片({{ item.picUrls.length }}张)</view>
				</view>
				<!-- 视频预览 -->
				<view v-else-if="item.type == 'video'" class="video-box ux-item-border">
					<img width="100%" :src="item.video.url + '?vframe/jpg/offset/0'" alt="" />
					<view class="video-start-box">
						<text class="iconfont iconfont-cloud"></text>
						<text></text>
					</view>
				</view>
				<!-- 删除框 -->
				<view class="clear-box" @click="clearClick(index)"><text class="iconfont iconfont-shanchu-circle"></text></view>
				<view class="opt-box">
					<view class="add icon-box" @click="addClick(index)"><text class="iconfont iconfont-jia"></text></view>
					<view v-if="index + 1 != list.length" class="ex icon-box" @click="exClick(item, index)"><text class="iconfont iconfont-up-down"></text></view>

					<view class="add-opt-box" :ref="'add-opt-box' + index" v-if="index == showAddIndex">
						<view @click="addTitle(item, index)" class="opt">
							<text class="iconfont iconfont-biaoti"></text>
							<text>标题</text>
						</view>
						<view @click="addTxt(item, index)" class="opt">
							<text class="iconfont iconfont-wenzi"></text>
							<text>文字</text>
						</view>
						<view @click="addPic(item, index)" class="opt">
							<text class="iconfont iconfont-tupian"></text>
							<text>图片</text>
						</view>
						<!-- <view class="opt">
							<x-content-file-uploader :MIME="fileLoaderType" @confirm="addVideo(item, index, $event)">
								<view class="file-uploader">
									<text class="text iconfont iconfont-cloud"></text>
									<text class="text">视频</text>
								</view>
							</x-content-file-uploader>
						</view> -->
					</view>
				</view>
			</view>
			<!-- <linke-mask :show="showMask" @click="closeMask(index)" /> -->
			<view class="linke-mask" v-if="showMask" @click="closeMask(index)"></view>
		</view>
	</view>
</template>

<script>
const pageEditTxt = '/uni_modules/linke-ux-editor/pages/editTxt';
const pageEditTitle = '/uni_modules/linke-ux-editor/pages/editTitle';
const pageEditPic = '/uni_modules/linke-ux-editor/pages/editPic';
const pageEditVideo = '/uni_modules/linke-ux-editor/pages/editVideo';

import EnumKey from '../../static/js/EnumKey.js';
import uxEditor from '../../static/js/editor.js';

export default {
	data() {
		return {
			list: this.value,

			// 视频上传类型 video/mp4,capture=camcorder;capture=camera
			fileLoaderType: 'video/mp4;capture=camera',
			// 视频上传大小限制，单位M
			fileMaxSize: 200,
			showMask: false,
			index: 0,
			swipeIndexArr: [],
			showAddIndex: null,
			showPaibanIndex: null,
			url_: this.url,
			cloud_: this.cloud
		};
	},
	computed: {
		listFilter() {
			return this.list.filter(item => {
				if (item.type != 'txt') {
					return true;
				}
				return !!item.txtContent;
			});
		}
	},
	props: {
		value: {
			type: Array,
			default: () => {
				return [];
			}
		},
		cloud: {
			type: Boolean,
			default: true
		},
		url: {
			type: String,
			default: ''
		}
	},
	methods: {
		// txt S
		addTxt(item, index) {
			this.closeMask(index);
			let cItem = {
				type: 'txt',
				txtContent: '',
				txtLink: '', // 点击图片跳转的地址
				txtLinkType: null, // 链接类型  1网址 | 2应用
				txtStyleColor: '',
				txtStyleAlign: 'left', // left | center | right
				txtStyleSize: '16', // 14px | 16px | 18px | 22px | 26px
				txtStyleBold: false, // 加粗 true | false
				txtStyleItalic: false, //斜体 true | false
				txtStyleUnderline: false, // 下划线 true | false
				txtStyleDel: false, // 中横线 true | false
				txtStyleIndent: false // 首行缩进 true | false
			};
			console.log('添加文本', cItem);
			this.list.splice(index + 1, 0, cItem);
		},
		editTxt(item, index) {
			let edit = { item: item, index: index };
			console.log(`${EnumKey.UX_TEMP_EDIT_TXT} 写入:`, JSON.stringify(edit));
			uni.setStorageSync(EnumKey.UX_TEMP_EDIT_TXT, JSON.stringify(edit));
			uni.navigateTo({
				url: pageEditTxt
			});
		},
		// txt E

		// title S
		addTitle(item, index) {
			this.closeMask(index);
			let cItem = {
				type: 'title',
				title: {
					layer: '1' // 1_    0_
				},
				txtContent: '新标题',
				txtStyleBold: true,
				txtStyleAlign: 'left',
				txtStyleSize: 16
			};
			console.log('添加标题', cItem);
			this.list.splice(index + 1, 0, cItem);
		},
		editTitle(item, index) {
			let obj = { item, index };
			console.log(`${EnumKey.UX_TEMP_EDIT_TXT} 写入:`, JSON.stringify(obj));
			uni.setStorageSync(EnumKey.UX_TEMP_EDIT_TXT, JSON.stringify(obj));
			uni.navigateTo({
				url: pageEditTitle
			});
		},
		// title E

		// pic S

		addPic(item, index) {
			this.closeMask(index);

			if (this.cloud) {
				uxEditor
					.uploadImgCloud()
					.then(urls => {
						console.log('uploadImg返回结果：' + urls[0]);
						let newPic = {
							type: 'pic',
							picLayer: '1',
							picUrls: [
								{
									url: urls[0]
								}
							]
						};
						console.log('添加图片', newPic);
						this.list.splice(index + 1, 0, newPic);
					})
					.catch(res => {
						console.log('返回err结果：', res);
						uni.showToast({
							icon: 'none',
							title: res.toString()
						});
					});
			} else {
				uxEditor
					.uploadImg(1, {
						url: this.url
					})
					.then(urls => {
						console.log('uploadImg返回结果：' + urls[0]);
						let newPic = {
							type: 'pic',
							picLayer: '1',
							picUrls: [
								{
									url: urls[0]
								}
							]
						};
						console.log('添加图片', newPic);
						this.list.splice(index + 1, 0, newPic);
					})
					.catch(res => {
						console.log('返回err结果：：' + res);
						uni.showToast({
							icon: 'none',
							title: res
						});
					});
			}
		},

		editPic(item, index) {
			let obj = { item, index };
			console.log('编辑图片:', obj);
			uni.setStorageSync(EnumKey.UX_TEMP_EDIT_TXT, JSON.stringify(obj));
			uni.navigateTo({
				url: pageEditPic
			});
		},

		// pic E

		/**
		 * @param {Object} item
		 * @param {Object} index 项item的index
		 * @param {Object} $event 轮播图index
		 */
		onChange(item, index, $event) {
			this.$set(item, 'intro', item.picUrls[$event.detail.current].intro ? item.picUrls[$event.detail.current].intro : '无描述');
			this.swipeIndex = $event;
			this.swipeIndexArr[index] = $event;
		},

		showPaiban(index) {
			this.showPaibanIndex = index;
		},
		closeMask(index) {
			this.showMask = false;
			this.showAddIndex = null;
		},
		openMask(index) {
			this.showMask = true;
			this.showAddIndex = index;
		},
		addClick(index) {
			this.index = index;
			this.openMask(index);
			// 设置配置到storage，传递到图片上传组件， cloud && url
			uni.setStorageSync(EnumKey.UX_FILE_UPLOAD_URL, this.url_);
			uni.setStorageSync(EnumKey.UX_FILE_CLOUD, this.cloud_);
		},
		exClick(item, index) {
			if (this.list.length < 2) {
				return;
			}
			this.list.splice(index, 1);
			this.list.splice(index + 1, 0, item);
		},
		clearClick(index) {
			this.list.splice(index, 1);
			this.ensureNotEmpty();
			uni.showToast({
				title: '内容块已移除',
				icon: 'none'
			});
		},
		ensureNotEmpty() {
			if (this.list.length == 0) {
				let item = {
					type: 'txt',
					txtContent: '',
					txtLink: '', // 点击图片跳转的地址
					txtLinkType: null, // 链接类型  1网址 | 2应用
					txtStyleColor: '',
					txtStyleAlign: 'left', // left | center | right
					txtStyleSize: '16', // 14px | 16px | 18px | 22px | 26px
					txtStyleBold: false, // 加粗 true | false
					txtStyleItalic: false, //斜体 true | false
					txtStyleUnderline: false, // 下划线 true | false
					txtStyleDel: false, // 中横线 true | false
					txtStyleIndent: false // 首行缩进 true | false
				};
				this.list.push(item);
			}
		},

		addVideo(item, index, file) {
			this.closeMask(index);
			if (file.file.size >= this.fileMaxSize * 1024 * 1024) {
				uni.showToast({
					title: `请上传小于${this.fileMaxSize}的视频文件`,
					icon: 'none'
				});
				return;
			}

			this.$api.qiniu.upload(file).then(url => {
				console.log('url:' + url);
				this.$util.loading.close();
				// item.content = url;
				this.list.splice(index + 1, 0, {
					type: 'video',
					video: {
						url: url
					}
				});
			});
		}
	},
	mounted() {
		this.ensureNotEmpty();
	},
	filters: {
		substr(str, num, addEllipsis = true) {
			if (!str || str.length <= num) {
				return str;
			}
			let s = str.substr(0, num);
			if (addEllipsis) {
				s += '...';
			}
			return s;
		}
	},
	watch: {
		list(n) {
			this.$emit('input', n);
		},
		value(n) {
			this.list = n;
		}
	}
};
</script>

<style lang="scss">
@import url('../../static/linke-ux-editor.css');
.van-overlay {
	background-color: rgba(0, 0, 0, 0.4);
}

.ux-item-border {
	border: 1px solid #f4f4f5;
	border-radius: 4px;
}

.items-yulan {
	.item {
		position: relative;
		.title-box {
			min-height: 100rpx;
			background-color: white;
			box-sizing: border-box;
			padding: 20rpx 30rpx;
			.title-text {
				padding-left: 20rpx;
				margin: 20rpx 0;
			}
		}
		.txt-box {
			position: relative;
			.link-box {
				position: absolute;
				bottom: 10px;
				left: 10px;

				padding: 5rpx 4px;

				font-size: 24rpx;
				background-color: $uni-text-color-grey;
				color: #ffffff;
				opacity: 0.9;
				border-radius: $uni-border-radius-base;
				.iconfont-link-url {
					font-size: 30rpx;
					margin-right: 4px;
					vertical-align: middle;
				}
			}
			.paiban-box {
				position: absolute;
				bottom: 10px;
				right: 10px;
				background-color: $uni-text-color-grey;
				color: #ffffff;
				font-size: 24rpx;
				padding: 5rpx 10rpx;
				opacity: 0.9;
				border-radius: $uni-border-radius-base;
				z-index: 100;
			}
			.textarea {
				box-sizing: border-box;
				padding: 10rpx 30rpx 0 30rpx;
				width: 100%;
				height: 200rpx;
				resize: none;
			}
		}
		.pic-box {
			position: relative;
			min-height: 100rpx;
			.pic-item-1 {
				height: 300rpx;
				width: 100%;

				.image {
					width: 100%;
					height: 100%;
				}
			}
			.pic-swipe {
				width: 100%;
				.pic-item {
					max-height: 380rpx;
					width: 100%;
					.image {
						width: 100%;
						height: 100%;
					}
				}
				.custom-indicator {
					position: absolute;
					right: 30rpx;
					bottom: 30rpx;
					padding: 4rpx 10rpx;
					font-size: 24rpx;
					border-radius: 10rpx;
					background: rgba(50, 50, 50, 0.7);
					color: white;
				}
			}
			.img-intro {
				font-size: 24rpx;
				color: grey;
				text-align: center;
				margin: 16rpx 0;
			}
			.img-edit-box {
				width: 240rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;

				border-radius: 30rpx 4rpx;

				position: absolute;
				top: 50%;
				margin-top: -40rpx;
				left: 50%;
				margin-left: -120rpx;

				font-size: 28rpx;

				background-color: rgba(#696b6b, 0.7);
				border: 1px solid white;
				color: white;
			}
		}
		.video-box {
			position: relative;
			.video-start-box {
				background-color: white;
				border-radius: 50%;

				position: absolute;
				left: 50%;
				margin-left: -40px;
				top: 50%;
				margin-top: -40px;
			}
		}

		.clear-box {
			position: absolute;
			top: 10px;
			right: 10px;
			z-index: 100;
			.iconfont-shanchu-circle {
				color: $uni-text-color-grey;
			}
			.iconfont-shanchu-circle:before {
				background: white;
				border-radius: 50%;
			}
		}

		.opt-box {
			text-align: center;
			height: 50px;

			// background-color: #F8F8F8;
			margin: 6px 0;
			border-radius: $uni-border-radius-base;

			position: relative;
			.icon-box {
				display: inline-block;
				border-radius: 10rpx;
				box-sizing: border-box;

				padding: 2px 5px;
				margin-top: 11px;
				.iconfont {
					color: $uni-text-color-grey;
					font-size: 36rpx;
				}
			}

			.ex {
				position: absolute;
				top: 0;
				right: 30rpx;
			}
			.add-opt-box {
				position: absolute;
				top: 0;
				left: 0;
				// left: 30rpx;
				height: 100rpx;
				line-height: 28rpx;
				// width: 690rpx;
				// width: 100vw;
				width: 100%;
				background-color: white;
				border-radius: $uni-border-radius-base;
				justify-content: space-around;
				z-index: 10071;
				box-sizing: border-box;
				display: flex;
				.opt {
					line-height: 100rpx;
					font-size: 24rpx;
					color: #999999;
					flex: 1;
					justify-content: space-between;
					display: flex;
					flex-direction: column;
					padding: 14rpx 0;
					text {
						line-height: 32rpx;
					}
					.file-uploader {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.text {
							line-height: 38rpx;
						}
					}
				}
			}
		}
	}
	.linke-mask {
		position: fixed;
		z-index: 100;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(#000000, 0.1);
	}
}
</style>
