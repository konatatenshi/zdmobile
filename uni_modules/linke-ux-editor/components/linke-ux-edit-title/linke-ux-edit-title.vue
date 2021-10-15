<template>
	<view class="inner-c">
		<textarea
			class="text"
			:class="{
				'text-left': itemData.txtStyleAlign == 'left',
				'text-center': itemData.txtStyleAlign == 'center',
				'text-right': itemData.txtStyleAlign == 'right',
				'text-bold': itemData.txtStyleBold
			}"
			:style="{ color: itemData.txtStyleColor, 'font-size': itemData.txtStyleSize + 'px' }"
			v-model="itemData.txtContent"
			placeholder="请输入标题"
		/>
		<view class="menus">
			<view class="menus_item"><text :style="{ color: jiacuActiveColor }" class="iconfont iconfont-font-jiacu" @click="fontJiacu"></text></view>
			<view class="menus_item"><text :style="{ color: setActiveColor }" class="iconfont iconfont-font-set" @click="fontSet"></text></view>
			<view class="menus_item"><text :style="{ color: leftActiveColor }" class="iconfont iconfont-font-left" @click="fontLeft"></text></view>
			<view class="menus_item"><text :style="{ color: centerActiveColor }" class="iconfont iconfont-font-center" @click="fontCenter"></text></view>
			<view class="menus_item"><text :style="{ color: rightActiveColor }" class="iconfont iconfont-font-right" @click="fontRight"></text></view>
		</view>
		<view class="font-set" v-if="setActive">
			<view class="item-box">
				<view class="title">字号</view>
				<view class="content">
					<view
						class="content_item"
						v-for="(size, index) in sizeListData"
						:key="index"
						@click="fontSizeClick(size)"
						:style="{ color: itemData.txtStyleSize == size ? defaultActiveColr : '' }"
					>
						{{ size }}
					</view>
				</view>
			</view>
			<view class="item-box">
				<view class="title">颜色</view>
				<view class="content">
					<view class="content_item" v-for="(color, index) in colorListData" :key="index" :style="{ color: color }">
						<text v-if="itemData.txtStyleColor == color" class="iconfont iconfont-font-color-checked"></text>
						<text v-else class="iconfont iconfont-font-color" @click="colorClick(color)"></text>
					</view>
				</view>
			</view>
		</view>

		<view class="align-box" v-else>
			<view
				:class="{ 'title-left': itemData.txtStyleAlign == 'left', 'title-center': itemData.txtStyleAlign == 'center', 'title-right': itemData.txtStyleAlign == 'right' }"
				@click="selectAlign"
			>
				<view class="title-text" :class="{ 'title-style': itemData.txtStyleAlign == 'center' }">这是示例标题</view>
			</view>
			<view class="fenge" />
		</view>
		<view class="btn-box"><text class="btn" @click="save">保存</text></view>
	</view>
</template>

<script>
const defaultColorList = [
	// '#ffffff',
	'#e5e5e5',
	// '#a6a6a6',
	'#808080',
	'#000000',
	// '#383838',

	// '#ffee3d',
	'#fec508',
	'#fd8c1d',
	'#fd5035',
	'#d22331',
	'#a12f65',

	'#a7da40',
	'#43dc73',
	'#1dbcad',
	'#2e7ee4',
	'#7836ea',
	'#aa17c1'
];
const defaultSizeList = ['14', '16', '18', '22', '26', '30'];

const defaultItemObj = {
	type: 'title', // txt | pic | video,
	txtContent: '',
	txtLink: '', // 点击图片跳转的地址
	txtLinkType: null, // 链接类型  1网址 | 2应用
	txtStyleColor: '',
	txtStyleAlign: 'left', // left | center | right
	txtStyleSize: '18', // 14px | 16px | 18px | 22px | 26px
	txtStyleBold: true, // 加粗 true | false
	txtStyleItalic: false, //斜体 true | false
	txtStyleUnderline: false // 下划线 true | false
};

export default {
	data() {
		return {
			itemData: Object.assign({}, defaultItemObj, this.item.item),
			sizeListData: Object.assign({}, defaultSizeList, this.sizeList),
			colorListData: Object.assign({}, defaultColorList, this.colorList),
			jiacu: false,
			align: 'cleft',
			setActive: false,
			defaultActiveColr: '#5980ff',
			showTitleAlignBox: false
		};
	},
	computed: {
		textStyle() {
			return {
				color: this.itemData.txtStyleColor,
				textAlign: this.itemData.txtStyleAlign,
				fontSize: this.itemData.txtStyleSize * 2 + 'rpx',
				fontWeight: this.itemData.txtStyleBold ? 'bold' : 'normal'
			};
		},
		jiacuActiveColor() {
			return this.itemData.txtStyleBold ? this.defaultActiveColr : '';
		},
		setActiveColor() {
			return this.setActive ? this.defaultActiveColr : '';
		},
		leftActiveColor() {
			return this.itemData.txtStyleAlign == 'left' ? this.defaultActiveColr : '';
		},
		centerActiveColor() {
			return this.itemData.txtStyleAlign == 'center' ? this.defaultActiveColr : '';
		},
		rightActiveColor() {
			return this.itemData.txtStyleAlign == 'right' ? this.defaultActiveColr : '';
		}
	},
	props: {
		colorList: {
			type: Array,
			default: () => defaultColorList
		},
		sizeList: {
			type: Array,
			default: () => defaultSizeList
		},
		item: {
			type: Object,
			default: () => defaultItemObj
		}
	},
	methods: {
		colorClick(color) {
			console.log('click color:' + color);
			this.itemData.txtStyleColor = color;
		},
		fontSizeClick(size) {
			console.log('click font size:' + size);
			this.itemData.txtStyleSize = size;
		},
		fontJiacu() {
			this.itemData.txtStyleBold = !this.itemData.txtStyleBold;
		},
		fontSet() {
			this.setActive = !this.setActive;
			//todo reset

			// if(!this.setActive){
			// this.itemData.txtStyleSize = this.item.txtStyleSize;
			// this.itemData.txtStyleColor = this.item.txtStyleColor;
			// }
		},
		fontLeft() {
			this.setActive = false;
			this.itemData.txtStyleAlign = 'left';
		},
		fontCenter() {
			this.setActive = false;
			this.itemData.txtStyleAlign = 'center';
		},
		fontRight() {
			this.setActive = false;
			this.itemData.txtStyleAlign = 'right';
		},
		save() {
			if (!this.itemData.txtContent) {
				uni.showToast({
					title: '请填写有效内容',
					icon: 'none'
				});
				return;
			}
			let obj = { item: this.itemData, index: this.item.index };
			this.$emit('save', obj);
		},
		selectAlign() {
			console.log('选择标题样式');
		}
	}
};
</script>

<style lang="scss">
@import url('../../static/linke-ux-editor.css');
.text {
	box-sizing: border-box;
	padding: 10rpx 30rpx 0 30rpx;
	width: 100%;
	height: 280rpx;
	resize: none;
}
.menus {
	padding: 0 7px;
	// background-color: #dedede;
	border-top: 1px solid #eeeeee;
	border-bottom: 1px solid #eeeeee;
	
	&_item {
		box-sizing: border-box;
		display: inline-block;
		width: 36px;
		// height: 48px;
		// padding-top: 12px;
		margin: 7px 0;
		padding: 5px 0;
		text-align: center;
		border-right: 1px solid #f8f8f8;
	}
	&_item:nth-last-of-type(1) {
		border: none;
	}
}
.btn-box {
	margin-top: 60rpx;
	padding: 0 90rpx 30rpx 90rpx;

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

.font-set {
	padding: 0 30rpx;
	.item-box {
		line-height: 80rpx;
		display: flex;
		justify-content: space-around;
		border-bottom: 1px solid #cccc;
		.title {
			width: 100rpx;
			text-align: center;
		}
		.content {
			width: 100%;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			text-align: center;
			&_item {
				box-sizing: border-box;
				width: 16%;
				padding-left: 10px;
				font-size: 36rpx;
				.iconfont-font-color {
					font-size: 40rpx;
				}
				.iconfont-font-color-checked {
					font-size: 44rpx;
				}
			}
		}
	}
}
.align-box {
	box-sizing: border-box;
	padding: 10rpx;
	p {
		margin: 20rpx;
	}
	.title-text {
		padding: 0 0 0 10rpx;
	}
	.fenge {
		border-bottom: 1px solid $uni-bg-color-grey;
	}
}
</style>
