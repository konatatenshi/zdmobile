import EnumKey from './EnumKey.js';

const tempDataHandler = (content) => {
	let temp_edit_data = uni.getStorageSync(EnumKey.UX_TEMP_EDIT_TXT);
	if (temp_edit_data) {
		let obj = JSON.parse(temp_edit_data);
		console.log('获取编辑数据：', obj);
		content.splice(obj.index, 1, obj.item);
		uni.removeStorageSync(EnumKey.UX_TEMP_EDIT_TXT);
		console.log('tempDataHandler ##：', content);
		return true;
	}
	return false;
}
const toHtml = (content) => {
	return '功能开发中...';
}

/**
 * @param {imgNum} 上传可选择的数量 
 * @param {options} = {
 *	 url, // 文件上传地址，返回 { data: URL} 
 *	 fileMaxSize
 *	 } 
 * @param {respCallback} 上传接口返回数据的回调处理，接收接口返回数据，返回URL 
 */
const uploadImg = (imgNum = 1, options = {
		url: '', // 上传的URL
		fileMaxSize: 1024 * 3 // 上传文件的最大长度 单位kb
	},
	respCallback = function(ret) {
		return ret.data
	}) => {
	return new Promise((resolve, reject) => {
		if (!options.url) {
			reject('请配置上传URL');
			return;
		}
		uni.chooseImage({
			count: imgNum,
			sourceType: ['album'],
			success(ret) {
				console.log('uni.chooseImage 返回：', ret);
				const tempFilePaths = ret.tempFilePaths;
				let num = 1;
				let urls = [];
				tempFilePaths.forEach((path, pathIdx) => {
					// 校验文件大小
					let kb = ret.tempFiles[pathIdx].size / 1000;
					let limit = options.fileMaxSize;
					if (limit && kb > limit) {
						uni.showToast({
							icon: 'none',
							title: '图片' + num + '超' + limit + 'kb,已忽略！'
						});
					} else {

						uni.showLoading({
							mask: true,
							title: '正在上传 ' + num + '/' + tempFilePaths.length
						});
						uni.uploadFile({
							url: options.url,
							name: 'file',
							filePath: path,
							success(ret) {
								console.log('uni.uploadFile 返回：', ret);
								let data = JSON.parse(ret.data);
								let url = respCallback(data);
								uni.hideLoading();
								urls.push(url)
								if (urls.length === tempFilePaths.length) {
									console.log('util resolve before,urls:',
										urls);
									resolve(urls)
								}
							},
							fail(ret) {
								uni.hideLoading();
							}
						})
					}
				});
			},
			fail(ret) {
				reject(ret);
			}
		})
	})
}
/**
 * 文件上传Cloud
 * @param {imgNum} 文件上传的限制数量，默认1
 */
const uploadImgCloud = (imgNum = 1) => {
	return new Promise((resolve, reject) => {
		uniCloud.chooseAndUploadFile({
			count: imgNum,
			type: 'image',
			sourceType: ['album'],
			compressed: false,
		}).then(res => {
			let urls = res.tempFiles.map(file => file.url);
			console.log('uploadImgCloud 上传成功 返回:', urls);
			resolve(urls);
		}).catch(e => {
			console.log('uploadImgCloud 上传失败 返回:', e);
			reject(e);
		})
	});

	;
}

export default {
	tempDataHandler,
	toHtml,
	uploadImg,
	uploadImgCloud

}
