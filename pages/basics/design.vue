<!-- 设置页面 -->
<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">设置</block>
		</cu-custom>
		<view class="cu-info text-center"><text class="cuIcon-warnfill text-yellow"></text>部分设置重启APP后生效</view>
		<view class="cu-form-group">
			<view class="title">省流量模式（非Wifi不显示图片）</view>
			<switch @change="Setimage" class="blue" :class="image?'checked':''" :checked="image?true:false"></switch>
		</view>
		<view class="cu-form-group">
			<view class="title">不在新窗口展开楼中楼（省流量）</view>
			<switch @change="Setfloor" class="blue" :class="newfloor?'checked':''" :checked="newfloor?true:false"></switch>
		</view>
		<view class="cu-form-group">
			<view class="title">选择字体尺寸</view>
			<radio-group @change="SetShadow">
				<label class="margin-left-sm">
					<radio class="blue radio" value="sm" :checked="fontsize=='sm'?true:false"></radio>
					<text class="margin-left-sm"> 小</text>
				</label>
				<label class="margin-left-sm">
					<radio class="blue radio" value="" :checked="fontsize==''?true:false"></radio>
					<text class="margin-left-sm"> 中</text>
				</label>
				<label class="margin-left-sm">
					<radio class="blue radio" value="lg" :checked="fontsize=='lg'?true:false"></radio>
					<text class="margin-left-sm"> 大</text>
				</label>
			</radio-group>
		</view>
		<view class="cu-form-group" @tap="dazimodeadd()">
			<view class="title">大字模式</view>
			<switch class="blue" disabled="true" :class="fontsize=='ex'?'checked':''" :checked="fontsize=='ex'?true:false"></switch>
		</view>
		<view class="cu-form-group" @tap="bottommod()">
			<view class="title">清理软件缓存</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-camerarotate text-yellow"></text>
					<text class="text-grey">{{cacheSize}}</text>
				</view>
			</view>
		</view>
		<view class="cu-form-group" @tap="toserver()">
			<view class="title">检测服务器状态</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">点击进行检测</text>
				</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal padding-bottom-xl" :class="modalName=='bottomModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar">
					<view>
						确定清除所有的缓存？离线内容、图片、屏蔽列表及登录信息均会被清除。
					</view>
				</view>
				<view class="padding-sm bg-white action text-green" @tap="clearCache">确定</view>
				<view class="padding-sm bg-white action text-blue" @tap="hideModal">取消</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal padding-bottom-xl" :class="modalName=='dazimode'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar">
					<view class="flex-sub text-center"><view><image src="../../static/aji.jpg"></view><view class="solid-bottom text-xxl padding"><text class="text-black text-bold"><span>大字模式<br>中老年用户的专属版本</span></text></view><view class="padding text-xl">字号变大，阅读更流畅，按钮更突出，不用担心点错啦。</view></view>
				</view>
				<view class="padding flex flex-direction"><button class="cu-btn bg-red margin-tb-sm lg" @tap="dazis()">{{daziswitch}}大字模式</button></view>
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
				daziswitch: '开启'
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
						if(e.detail.value == 'sm'){
							Vue.prototype.$fontsize = uni.upx2px(14) + 'px';
						}else if(e.detail.value == 'lg'){
							Vue.prototype.$fontsize = uni.upx2px(26) + 'px';
						}else if(e.detail.value == 'ex'){
							Vue.prototype.$fontsize = uni.upx2px(30) + 'px';
						}else{
							Vue.prototype.$fontsize = uni.upx2px(20) + 'px';
						}
						//console.log(that.swiperList);
					}
				});
				uni.redirectTo({
					url: 'design'
				})
			},
			dazis() {
				if(this.fontsize=='ex'){
					var f = ''
				}else{
					var f = 'ex'
				}
				this.fontsize = f
				uni.setStorage({
					key: 'fontsize',
					data: f,
					success: function() {
						if(f == 'ex'){
							Vue.prototype.$fontsize = uni.upx2px(30) + 'px';
						}else{
							Vue.prototype.$fontsize = uni.upx2px(20) + 'px';
						}
						//console.log(that.swiperList);
					}
				});
				uni.redirectTo({
					url: 'design'
				})
				this.modalName = null;
			},
			hideModal(){
				this.modalName = null;
			},
			bottommod(){
				this.modalName = 'bottomModal';
			},
			dazimodeadd(){
				this.modalName = 'dazimode';
			},
			toserver(){
				uni.navigateTo({
					url: './loading',
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
			            title: '清除成功!',
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
			var that = this;
			uni.getStorage({
				key: 'imageswitch',
				success: function(res) {
					that.image = res.data;
					//console.log(that.swiperList);
				}
			});
			uni.getStorage({
				key: 'fontsize',
				success: function(res) {
					that.fontsize = res.data;
					if(that.fontsize=="ex"){
						that.daziswitch = '关闭';
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
			});// #ifdef APP-PLUS
			var self = this;
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
