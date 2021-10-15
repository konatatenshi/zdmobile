<template>
	<label class="fileLoader">
		<slot></slot>
		<input class="file-input" type="file" :accept="MIME" @change="readURL" :disabled="isDisabled" />
	</label>
</template>

<script>
export default {
	name: 'x-content-file-uploader',
	components: {},
	props: {
		MIME: {
			type: String,
			default: '*'
		},
		//是否禁用
		isDisabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {};
	},
	methods: {
		readURL(e) {
			console.log(e);
			if (e.target.files) {
				this.$emit('confirm', {
					file: e.target.files[0]
				});
				e.target.value = '';
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.fileLoader {
	.file-input {
		right: 0;
		top: 0;
		opacity: 0;
		filter: alpha(opacity=0);
		cursor: pointer;
		display: none;
	}
}
</style>
