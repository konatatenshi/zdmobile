<template>
	<div class=""><linke-ux-edit-title @save="save" :item="item"></linke-ux-edit-title></div>
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
			console.log('标题保存:', item);
			uni.setStorageSync(EnumKey.UX_TEMP_EDIT_TXT, JSON.stringify(item));
			uni.navigateBack();
		}
	},
	onShow() {
		let d = uni.getStorageSync(EnumKey.UX_TEMP_EDIT_TXT);
		console.log(`${EnumKey.UX_TEMP_EDIT_TXT} 标题读取:`, d);
		this.item = JSON.parse(d);
	}
};
</script>

<style lang="scss">
.page {
	flood-color: #000000;
}
</style>
