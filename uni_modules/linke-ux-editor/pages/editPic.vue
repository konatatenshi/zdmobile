<template>
	<div class=""><linke-ux-edit-pic @save="save" :item="item" :cloud="!!cloud" :url="url"></linke-ux-edit-pic></div>
</template>

<script>
import EnumKey from '../static/js/EnumKey.js';
import uxEditor from '../static/js/editor.js';

export default {
	data() {
		return {
			item: JSON.parse(uni.getStorageSync(EnumKey.UX_TEMP_EDIT_TXT)),
			cloud: uni.getStorageSync(EnumKey.UX_FILE_CLOUD),
			url: uni.getStorageSync(EnumKey.UX_FILE_UPLOAD_URL)
		};
	},
	methods: {
		save(item) {
			console.log('图片保存:', item);
			uni.setStorageSync(EnumKey.UX_TEMP_EDIT_TXT, JSON.stringify(item));
			uni.navigateBack();
		}
	},
	onShow() {
		let d = uni.getStorageSync(EnumKey.UX_TEMP_EDIT_TXT);
		console.log(`${EnumKey.UX_TEMP_EDIT_TXT} 读取:`, d);
		
	}
};
</script>

<style lang="scss" scope="scoped">
.page {
	flood-color: #000000;
}
</style>
