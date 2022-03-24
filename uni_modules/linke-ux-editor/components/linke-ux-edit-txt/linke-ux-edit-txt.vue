<template>
	<view class="font-reset-14px inner-c">
		<textarea
			class="text"
			:class="{
				'text-left': itemData.txtStyleAlign == 'left',
				'text-center': itemData.txtStyleAlign == 'center',
				'text-right': itemData.txtStyleAlign == 'right',
				'text-bold': itemData.txtStyleBold,
				'text-italic': itemData.txtStyleItalic,
				'text-underline': itemData.txtStyleUnderline,
				'text-del': itemData.txtStyleDel,
				'text-indent': itemData.txtStyleIndent
			}"
			:style="{ color: itemData.txtStyleColor, 'font-size': itemData.txtStyleSize + 'px' }"
			v-model="itemData.txtContent"
			:placeholder="$t('post.inputtxt')"
		/>
		<view class="menus">
			<view class="menus_item"><text :style="{ color: jiacuActiveColor }" class="iconfont iconfont-font-jiacu" @click="fontJiacu"></text></view>
			<view class="menus_item"><text :style="{ color: italicActiveColor }" class="iconfont iconfont-font-italic" @click="fontItalic"></text></view>
			<view class="menus_item"><text :style="{ color: underlineActiveColor }" class="iconfont iconfont-font-underline" @click="fontUnderline"></text></view>
			<view class="menus_item"><text :style="{ color: delActiveColor }" class="iconfont iconfont-font-del" @click="fontDel"></text></view>
			<view class="menus_item"><text :style="{ color: setActiveColor }" class="iconfont iconfont-font-set" @click="fontSet"></text></view>
			<view class="menus_item"><text :style="{ color: leftActiveColor }" class="iconfont iconfont-font-left" @click="fontLeft"></text></view>
			<view class="menus_item"><text :style="{ color: centerActiveColor }" class="iconfont iconfont-font-center" @click="fontCenter"></text></view>
			<view class="menus_item"><text :style="{ color: rightActiveColor }" class="iconfont iconfont-font-right" @click="fontRight"></text></view>
			<view class="menus_item"><text :style="{ color: indentActiveColor }" class="iconfont iconfont-font-indent" @click="fontIndent"></text></view>
			<view class="menus_item"><text :style="{ color: linkActiveColor }" class="iconfont iconfont-link-url" @click="linkUrl"></text></view>
		</view>
		
		<!-- #ifdef MP -->
		<view class="mp-tips" v-if="italicActiveColor">
			[斜体]操作 编辑状态无法查看，可在预览时查看效果！
		</view><view class="mp-tips" v-if="underlineActiveColor">
			[下划线]操作 编辑状态无法查看，可在预览时查看效果！
		</view><view class="mp-tips" v-if="delActiveColor">
			[中横线]操作 编辑状态无法查看，可在预览时查看效果！
		</view>
		
		<!-- #endif -->
		
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
		<view class="link-box" v-if="showLink">
			<input class="input-link" type="text" v-model="itemData.txtLink" placeholder="请输入http(s)://开头的网址" />
			<view class="link-tips">{{ linkTips }}</view>
		</view>
		<view class="btn-box">
			<text class="btn" @click="save">保存</text>
			<text></text>
		</view>
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
	type: 'txt', // txt | pic | video,
	txtContent: '这个一段测试内容',
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

export default {
	data() {
		return {
			itemData: Object.assign({}, defaultItemObj, this.item.item),
			sizeListData: Object.assign({}, defaultSizeList, this.sizeList),
			colorListData: Object.assign({}, defaultColorList, this.colorList),
			jiacu: false,
			align: 'left',
			setActive: false,
			defaultActiveColr: '#5980ff',
			showLink: false,
			linkTips: ''
		};
	},
	computed: {
		jiacuActiveColor() {
			return this.itemData.txtStyleBold ? this.defaultActiveColr : '';
		},
		italicActiveColor() {
			return this.itemData.txtStyleItalic ? this.defaultActiveColr : '';
		},
		underlineActiveColor() {
			return this.itemData.txtStyleUnderline ? this.defaultActiveColr : '';
		},
		delActiveColor() {
			return this.itemData.txtStyleDel ? this.defaultActiveColr : '';
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
		},
		indentActiveColor() {
			return this.itemData.txtStyleIndent ? this.defaultActiveColr : '';
		},
		linkActiveColor() {
			return this.itemData.txtLink ? this.defaultActiveColr : '';
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
			default: () => {
				return {
					index: null,
					item: {}
				};
			}
		}
	},
	methods: {
		hideAll() {
			this.setActive = false;
			this.showLink = false;
		},
		colorClick(color) {
			console.log('click color:' + color);
			this.itemData.txtStyleColor = color;
		},
		fontSizeClick(size) {
			console.log('click font size:' + size);
			this.itemData.txtStyleSize = size;
		},
		fontJiacu() {
			this.hideAll();
			this.itemData.txtStyleBold = !this.itemData.txtStyleBold;
		},
		fontItalic() {
			this.hideAll();

			console.log('fontItalic:', this.itemData);
			this.itemData.txtStyleItalic = !this.itemData.txtStyleItalic;
		},
		fontUnderline() {
			this.hideAll();
			this.itemData.txtStyleUnderline = !this.itemData.txtStyleUnderline;
			// 下划线 中横线 互斥处理
			if (this.itemData.txtStyleUnderline && this.itemData.txtStyleDel) {
				this.itemData.txtStyleDel = false;
			}
		},
		fontDel() {
			this.hideAll();
			this.itemData.txtStyleDel = !this.itemData.txtStyleDel;
			// 下划线 中横线 互斥处理
			if (this.itemData.txtStyleUnderline && this.itemData.txtStyleDel) {
				this.itemData.txtStyleUnderline = false;
			}
		},
		fontSet() {
			this.hideAll();

			this.setActive = !this.setActive;
		},
		fontLeft() {
			this.hideAll();

			this.itemData.txtStyleAlign = 'left';
		},
		fontCenter() {
			this.hideAll();

			this.itemData.txtStyleAlign = 'center';
		},
		fontRight() {
			this.hideAll();

			this.itemData.txtStyleAlign = 'right';
		},
		fontIndent() {
			this.hideAll();

			this.itemData.txtStyleIndent = !this.itemData.txtStyleIndent;
		},
		linkUrl() {
			this.hideAll();

			this.showLink = true;
		},

		save() {
			if (!this.itemData.txtContent) {
				this.$x.toast('请填写有效内容');
				return;
			}
			let data = { item: this.itemData, index: this.item.index, opt: 'edit' };

			this.$emit('save', data);
		}
	},
	watch: {
		['itemData.txtLink'](n) {
			let isUrl = /^https?:\/\/.+/.test(n);

			if (n && !isUrl) {
				this.linkTips = '链接可能不正确，请输入 http(s):// 开头的链接';
				return;
			}
			this.linkTips = '';
		}
		// item(n){
		// 	console.log('-------------S');
		// 	console.log(defaultItemObj);
		// 	console.log(defaultItemObj);
		// 	console.log('-------------E');
		// 	this.itemData = n;
		// }
	}
};
</script>

<style lang="scss" scope="scoped">
@import url('../../static/linke-ux-editor.css');
.text {
	box-sizing: border-box;
	padding: 5px 15px 0 15px;
	width: 100%;
	height: 140px;
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
	margin: 30px 90rpx;
	.btn {
		display: inline-block;
		width: 100%;
		height: 84rpx;
		line-height: 84rpx;
		text-align: center;
		font-size: 28rpx;
		color: #ffffff;
		background-color: $uni-color-primary;
		border-radius: $uni-border-radius-base;
	}
}

.mp-tips{
	padding: 5px 10px;
	background-color: #FDF6EC;
	color: #FD9907;
}

.font-set {
	padding: 0 15px;
	.item-box {
		line-height: 40px;
		display: flex;
		justify-content: space-around;
		border-bottom: 1px solid #eeeeee;
		.title {
			width: 50px;
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
.link-box {
	padding: 0 10px;
	.input-link {
		height: 96rpx;
		line-height: 96rpx;
		border-bottom: 1px solid #f8f8f8;
	}
	.link-tips {
		line-height: 30px;
		height: 30px;
		color: red;
	}
}
</style>
