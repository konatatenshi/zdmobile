<template>
	<view>
		<cu-custom :bgColor="'bg-'+themeColor.name" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">选择颜色</block>
		</cu-custom>
		<view class="padding">
			<view class="text-black">对比色：黑色</view>
			<view :class="'text-'+themeColor.name">主题色：{{themeColor.title}}</view>
		</view>
		<view class="cu-list menu sm-border card-menu">
			<view class="cu-item">
				<view class="content flex align-center">
					<text class="cuIcon-colorlens" :class="'text-'+themeColor.name"></text>
					<view class="padding solid radius shadow-blur" :class="'bg-'+themeColor.name"></view>
				</view>
				<view class="action">
					<button class="cu-btn round shadow" @click="showColorModal" :class="'bg-'+themeColor.name">
						<text class="cuIcon-colorlens"></text> 选择颜色</button>
				</view>
			</view>
		</view>
		<view class="padding text-black">建议选择的颜色：天青、草灰、墨黑、雅白</view>
		<!-- modal -->
		<!-- 选择颜色模态框 -->
		<view class="cu-modal" :class="{show: colorModal}">
			<view class="cu-dialog">
				<view class="cu-bar justify-end solid-bottom">
					<view class="content">选择颜色</view>
					<view class="action" @tap="colorModal = false">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="grid col-5 padding">
					<view class="padding-xs" v-for="(item,index) in ColorList" :key="index" @tap="SetColor(item)" :data-color="item.name">
						<view class="padding-tb radius" :class="'bg-' + item.name"> {{item.title}} </view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				colorModal: false,
				ColorList: [{
						title: '嫣红',
						name: 'red',
						color: '#e54d42'
					},
					{
						title: '桔橙',
						name: 'orange',
						color: '#f37b1d'
					},
					{
						title: '明黄',
						name: 'yellow',
						color: '#fbbd08'
					},
					{
						title: '橄榄',
						name: 'olive',
						color: '#8dc63f'
					},
					{
						title: '森绿',
						name: 'green',
						color: '#39b54a'
					},
					{
						title: '天青',
						name: 'cyan',
						color: '#1cbbb4'
					},
					{
						title: '海蓝',
						name: 'blue',
						color: '#0081ff'
					},
					{
						title: '姹紫',
						name: 'purple',
						color: '#6739b6'
					},
					{
						title: '木槿',
						name: 'mauve',
						color: '#9c26b0'
					},
					{
						title: '桃粉',
						name: 'pink',
						color: '#e03997'
					},
					{
						title: '棕褐',
						name: 'brown',
						color: '#a5673f'
					},
					{
						title: '玄灰',
						name: 'grey',
						color: '#8799a3'
					},
					{
						title: '草灰',
						name: 'gray',
						color: '#aaaaaa'
					},
					{
						title: '墨黑',
						name: 'black',
						color: '#333333'
					},
					{
						title: '雅白',
						name: 'white',
						color: '#ffffff'
					}
				]
			}
		},
		methods: {
			showColorModal() {
				this.colorModal = true
			},
			SetColor(item) {
				this.colorModal = false
				console.log(item);
					var that = this;
					uni.setStorage({
						key: 'style',
						data: item,
						success: function() {
							that.$store.commit('setThemeColor', item)
							//console.log(that.swiperList);
						}
					});
				//this.$store.commit('setThemeColor', item)
				this.changeTabBar(item.color)
			},
			changeTabBar(val) {
				uni.setTabBarStyle({
				  color: '#7A7E83',
				  selectedColor: '#007AFF',
				  backgroundColor: val,
				  borderStyle: 'white'
				})
			}
		}
	}
</script>

<style>

</style>
