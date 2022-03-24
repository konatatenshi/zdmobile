<template name="basics">
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">{{$t('api.back')}}</block><block slot="content">发帖成功</block></cu-custom>
		<view class="bg-white padding-lr">
			<view class="solids-bottom padding-xs flex align-center">
				<view class="flex-sub text-center">
					<view class="solid-bottom text-xsl padding">
						<text class=" cuIcon-roundcheckfill text-green"></text>
					</view>
					<view class="padding">发帖成功，正在跳转</view>
					<view class="padding">>>>>>>>>>>>>>>>></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollLeft: 0,
			};
		},
		methods: {
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			uni.navigateBack();
		},
	}
</script>

<style>
</style>
