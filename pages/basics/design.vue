<!-- 设置页面 -->
<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">{{$t('setting.setting')}}</block>
		</cu-custom>
		<view class="cu-info text-center"><text class="cuIcon-warnfill text-yellow"></text>{{$t('setting.settingrestart')}}</view>
		<view class="cu-form-group">
			<view class="title">{{$t('setting.datasavingmode')}}</view>
			<switch @change="Setimage" class="blue" :class="image?'checked':''" :checked="image?true:false"></switch>
		</view>
		<view class="cu-form-group">
			<view class="title">{{$t('setting.notnewwindow')}}</view>
			<switch @change="Setfloor" class="blue" :class="newfloor?'checked':''" :checked="newfloor?true:false">
			</switch>
		</view>
		<view class="cu-form-group">
			<view class="title">{{$t('setting.fontsize')}}</view>
			<radio-group @change="SetShadow">
				<label class="margin-left-sm">
					<radio class="blue radio" value="sm" :checked="fontsize=='sm'?true:false"></radio>
					<text class="margin-left-sm"> {{$t('setting.sm')}}</text>
				</label>
				<label class="margin-left-sm">
					<radio class="blue radio" value="" :checked="fontsize==''?true:false"></radio>
					<text class="margin-left-sm"> {{$t('setting.n')}}</text>
				</label>
				<label class="margin-left-sm">
					<radio class="blue radio" value="lg" :checked="fontsize=='lg'?true:false"></radio>
					<text class="margin-left-sm"> {{$t('setting.lg')}}</text>
				</label>
			</radio-group>
		</view>
		<view class="cu-form-group" @tap="dazimodeadd()">
			<view class="title">{{$t('setting.exmode')}}</view>
			<switch class="blue" disabled="true" :class="fontsize=='ex'?'checked':''"
				:checked="fontsize=='ex'?true:false"></switch>
		</view>
		<view class="cu-form-group">
			<view class="title">{{$t('setting.turnoffjiyu')}}</view>
			<switch class="blue" @change="jiyuset" :class="jiyu=='1'?'checked':''" :checked="jiyu=='1'?true:false">
			</switch>
		</view>
		<view class="cu-form-group" @tap="bottommod()">
			<view class="title">{{$t('setting.deletecache')}}</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-camerarotate text-yellow"></text>
					<text class="text-grey">{{cacheSize}}</text>
				</view>
			</view>
		</view>
		<view class="cu-form-group" @tap="topinbi()">
			<view class="title">{{$t('setting.mignore')}}</view>
		</view>
		<view class="cu-form-group" @tap="tolanguage()">
			<view class="title">{{$t('setting.language')}}</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-font text-pink"></text>
					<text class="text-grey">{{showlanguage()}}</text>
				</view>
			</view>
		</view>
		<view class="cu-form-group" @tap="toserver()">
			<view class="title">{{$t('setting.serversataus')}}</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">{{$t('setting.check')}}</text>
				</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal padding-bottom-xl" :class="modalName=='bottomModal'?'show':''"
			@tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar">
					<view>
						{{$t('setting.cleantxt')}}
					</view>
				</view>
				<view class="padding-sm bg-white action text-green" @tap="clearCache">{{$t('api.ok')}}</view>
				<view class="padding-sm bg-white action text-blue" @tap="hideModal">{{$t('api.cancel')}}</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal padding-bottom-xl" :class="modalName=='dazimode'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="flex flex-direction">
					<image style="width: 100%;" src="../../static/aji.jpg">
				</view>
				<view class="cu-bar">
					<view class="flex-sub text-center">
						<view class="solid-bottom text-xxl padding"><text
								class="text-black text-bold"><span>{{$t('setting.exmode')}}<br>{{$t('setting.age')}}</span></text></view>
						<view class="padding text-xl">{{$t('setting.agetxt')}}</view>
					</view>
				</view>
				<view class="padding flex flex-direction"><button class="cu-btn bg-red margin-tb-sm lg"
						@tap="dazis()">{{daziswitch}}{{$t('setting.exmode')}}</button></view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='changelanguage'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-list menu text-left solid-top">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">{{$t('locale.auto')}}</text>
						</view>
						<view class="action">
							<switch @change="Setlanguage(0)" :class="language==0?'checked':''"
								:checked="language==0?true:false"></switch>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">{{$t('locale.en')}}</text>
						</view>
						<view class="action">
							<switch @change="Setlanguage(1)" :class="language==1?'checked':''"
								:checked="language==1?true:false"></switch>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">{{$t('locale.zh-hans')}}</text>
						</view>
						<view class="action">
							<switch @change="Setlanguage(2)" :class="language==2?'checked':''"
								:checked="language==2?true:false"></switch>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">{{$t('locale.zh-hant')}}</text>
						</view>
						<view class="action">
							<switch @change="Setlanguage(3)" :class="language==3?'checked':''"
								:checked="language==3?true:false"></switch>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				modalName: '',
				image: false,
				newfloor: false,
				size: '',
				color: 'red',
				shadow: false,
				border: false,
				dazi: false,
				bordersize: '',
				cacheSize: '',
				fontsize: '',
				jiyu: 0,
				language: 0,
				daziswitch: this.$t('setting.turnon')
			};
		},
		methods: {
			Setimage(e) {
				var that = this;
				uni.setStorage({
					key: 'imageswitch',
					data: e.detail.value,
					success: function() {
						that.image = e.detail.value
						Vue.prototype.$imageswitch = e.detail.value
						//console.log(that.swiperList);
					}
				});
			},
			jiyuset(e) {
				console.log(e.detail.value);
				if (e.detail.value) {
					this.jiyu = 1;
					this.setting('jiyu', 1);
				} else {
					this.jiyu = 0;
					this.setting('jiyu', 0);
				}
			},
			Setfloor(e) {
				var that = this;
				uni.setStorage({
					key: 'floorswitch',
					data: e.detail.value,
					success: function() {
						that.newfloor = e.detail.value
						Vue.prototype.$floorswitch = e.detail.value
						//console.log(that.swiperList);
					}
				});
			},
			SetShadow(e) {
				this.fontsize = e.detail.value
				console.log(e.detail.value);
				uni.setStorage({
					key: 'fontsize',
					data: e.detail.value,
					success: function() {
						if (e.detail.value == 'sm') {
							Vue.prototype.$fontsize = uni.upx2px(26) + 'px';
						} else if (e.detail.value == 'lg') {
							Vue.prototype.$fontsize = uni.upx2px(30) + 'px';
						} else if (e.detail.value == 'ex') {
							Vue.prototype.$fontsize = uni.upx2px(40) + 'px';
						} else {
							Vue.prototype.$fontsize = uni.upx2px(28) + 'px';
						}
						//console.log(that.swiperList);
					}
				});
				uni.redirectTo({
					url: 'design'
				})
			},
			loadsetting() {
				let that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:setting', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						that.jiyu = res.data.jiyu;
					}
				});
			},
			setting(e, f) {
				let that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:setting', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						setting: 1,
						[e]: f
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							uni.showToast({
								title: that.$t('setting.set-success')
							})
						}
					}
				});
			},
			Setlanguage(e) {
				let that = this;
				uni.setStorage({
					key: 'language',
					data: e,
					success: function() {
						that.language = e;
						//console.log(that.swiperList);
						if(e==0){
							that.onLocaleChange('auto');
						}else if(e==1){
							that.onLocaleChange('en');
						}else if(e==2){
							that.onLocaleChange('zh-Hans');
						}else if(e==3){
							that.onLocaleChange('zh-Hant');
						}
					}
				});
			},
			onLocaleChange(e) {
				if (this.isAndroid) {
					uni.showModal({
						content: this.$t('index.language-change-confirm'),
						success: (res) => {
							if (res.confirm) {
								uni.setLocale(e);
							}
						}
					})
				} else {
					uni.setLocale(e);
					this.$i18n.locale = e;
				}
			},
			dazis() {
				if (this.fontsize == 'ex') {
					var f = ''
				} else {
					var f = 'ex'
				}
				this.fontsize = f
				uni.setStorage({
					key: 'fontsize',
					data: f,
					success: function() {
						if (f == 'ex') {
							Vue.prototype.$fontsize = uni.upx2px(40) + 'px';
						} else {
							Vue.prototype.$fontsize = uni.upx2px(28) + 'px';
						}
						//console.log(that.swiperList);
					}
				});
				uni.redirectTo({
					url: 'design'
				})
				this.modalName = null;
			},
			hideModal() {
				this.modalName = null;
			},
			tolanguage(){
				this.modalName = 'changelanguage';
			},
			showlanguage(){
				if(this.language==0){
					return this.$t('locale.auto');
				}else if(this.language==1){
					return this.$t('locale.en');
				}else if(this.language==2){
					return this.$t('locale.zh-hans');
				}else if(this.language==3){
					return this.$t('locale.zh-hant');
				}
			},
			bottommod() {
				let that = this;
				//this.modalName = 'bottomModal';
				uni.showModal({
					title: that.$t('setting.deletecache'),
					content: that.$t('setting.cleantxt'),
					success: function(res) {
						if (res.confirm) {
							that.clearCache();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			dazimodeadd() {
				this.modalName = 'dazimode';
			},
			toserver() {
				uni.navigateTo({
					url: './loading',
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			topinbi() {
				uni.navigateTo({
					url: 'pingbi',
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			clearCache() {
				// #ifdef APP-PLUS
				var self = this;
				//使用plus.cache.clear 清除应用中的缓存数据
				plus.cache.clear(function() {
					uni.showToast({
						title: that.$t('setting.clean-success'),
						icon: 'none',
						success() {
							self.cacheSize = '0B'
						}
					})
					self.modalName = null;
				});
				// #endif
			},
		},
		created() {
			let systemInfo = uni.getSystemInfoSync();
			this.systemLocale = systemInfo.language;
			this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
			console.log(uni.getLocale());
			var that = this;
			uni.getStorage({
				key: 'imageswitch',
				success: function(res) {
					that.image = res.data;
					//console.log(that.swiperList);
				}
			});
			uni.getStorage({
				key: 'language',
				success: function(res) {
					that.language = res.data;
					//console.log(that.swiperList);
				}
			});
			uni.getStorage({
				key: 'fontsize',
				success: function(res) {
					that.fontsize = res.data;
					if (that.fontsize == "ex") {
						that.daziswitch = that.$t('setting.turnoff');
					}
					//console.log(that.swiperList);
				}
			});
			uni.getStorage({
				key: 'floorswitch',
				success: function(res) {
					that.newfloor = res.data;
					//console.log(that.swiperList);
				}
			}); // #ifdef APP-PLUS
			var self = this;
			that.loadsetting();
			plus.cache.calculate(function(size) { //size是多少个字节单位是b
				//做下面相应的处理
				if (size < 1024) {
					self.cacheSize = size + 'B';
				} else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
					self.cacheSize = Math.floor(size / 1024 * 100) / 100 + 'KB';
				} else if (size / 1024 / 1024 >= 1) {
					self.cacheSize = Math.floor(size / 1024 / 1024 * 100) / 100 + 'M';
				}
			});
			// #endif
		}
	}
</script>

<style>
	.box {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100px;
	}
</style>
