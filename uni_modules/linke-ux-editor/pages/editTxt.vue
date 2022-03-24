<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">快捷发帖</block>
		</cu-custom>
		<linke-ux-edit-txt @save="save" :item="item" /></view>
</template>

<script>
import EnumKey from '../static/js/EnumKey.js';
export default {
	data() {
		return {
			item: JSON.parse(uni.getStorageSync(EnumKey.UX_TEMP_EDIT_TXT))
		};
	},
	methods: {
		save(item) {
			console.log('文本保存:', item);
			uni.setStorageSync(EnumKey.UX_TEMP_EDIT_TXT, JSON.stringify(item));
			uni.navigateBack();
		}
	},
	onShow() {
		let d = uni.getStorageSync(EnumKey.UX_TEMP_EDIT_TXT);
		console.log(`${EnumKey.UX_TEMP_EDIT_TXT} 文本读取:`, d);
		this.item = JSON.parse(d);
	}
};
</script>

<style lang="scss" scope="scoped">
	
</style>
