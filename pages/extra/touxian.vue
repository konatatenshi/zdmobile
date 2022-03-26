<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">{{$t('shop.buydesignation')}}</block>
		</cu-custom>
		<view v-if="fenleilist.length > 0" id="waterfull">
			<view class="flex solid-bottom align-center bg-white item-img" v-for="(item,index) in fenleilist" :key="index" v-show="Number(item.price)<10000">
				<view class="cu-item shadow flex1 cu-card case">
					<view class="image">
						<image class="width100" :src="item.src" @tap="more(item.src,item.title,item.price)"></image>
						<view class="cu-tag bg-blue-trans"><text>价格{{item.price}}{{$t('credit.coins')}}，销量{{item.sales}}</text></view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut text-center text-shadow2">{{item.title}}</text>
						<button class="cu-btn bg-green-trans margin-left" v-if="item.ifbuy==''" @tap="gmqr(item.id,item.price,item.title)">{{$t('shop.buyit')}}</button>
						<button class="cu-btn bg-yellow margin-left" @tap="xiexia(item.id)" v-else-if="item.ifbuy.status==1">卸下</button>
						<button class="cu-btn bg-red margin-left" @tap="shiyong(item.id)" v-else>使用</button>
					</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='more'?'show':''" @tap = "hidemodal()">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">头衔详情</view>
					<view class="action" @tap="hidemodal()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-top-xl padding-bottom-xl">
					<image class="width101" :src="mpsrc"></image>
					<text class="text-red text-xl">{{goumainame}}</text><br><text class="text-blue" v-if="shengyu>=0">价格：{{shengyu}}{{$t('credit.coins')}}</text>
				</view>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="hidemodal()">{{$t('api.ok')}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='goumai'?'show':''" @tap = "hidemodal()">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">购买确认</view>
					<view class="action" @tap="hidemodal()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl text-brown">
					确定购买<text class="text-red text-bold">{{goumainame}}</text>吗？<br>
					将要花费<text class="text-red text-bold">{{goumaijiage}}</text>{{$t('credit.coins')}}。
				</view>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="goumai()">{{$t('api.ok')}}</button>
						<button class="cu-btn line-green margin-left" @tap="hidemodal()">{{$t('api.cancel')}}</button>
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
				fenlei:93,
				fenleilist:[],
				modalName: null,
				texiaogailv: 0,
				texiaoleixing: '',
				texiaojifen: 0,
				goumaiid: 0,
				goumainame: '',
				goumaijiage: 0,
				mpsrc: '',
				shengyu: 0
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			this.fenlei = option.fenlei;
			this.getxunzhang(option.fenlei);
		},
		methods: {
			getxunzhang(e) {
				var that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:buyname', //获取轮播列表
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						typeid: 0
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							that.fenleilist = res.data.list
						} else {
							uni.showToast({
								title: '加载失败',
								icon: 'error'
							})
						}
					}
				});
			},
			shiyong(e) {
				var that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:buyname', //获取轮播列表
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						typeid: 2,
						fenlei: e
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							uni.showToast({
								title: '使用成功'
							})
							that.getxunzhang(that.fenlei);
						}else {
							uni.showToast({
								title: '失败',
								icon: 'error'
							})
						};
						that.modalName = null;
					}
				});
			},
			xiexia(e) {
				var that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:buyname', //获取轮播列表
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						typeid: 3,
						fenlei: e
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							uni.showToast({
								title: '卸下成功'
							})
							that.getxunzhang(that.fenlei);
						}else {
							uni.showToast({
								title: '失败',
								icon: 'error'
							})
						};
						that.modalName = null;
					}
				});
			},
			goumai() {
				var that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:buyname', //获取轮播列表
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						typeid: 1,
						fenlei: that.goumaiid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							uni.showToast({
								title: '购买成功'
							})
							that.getxunzhang(that.fenlei);
						} else if (res.data.code == 402) {
							uni.showToast({
								title: '已经拥有',
								icon: 'error'
							})
						} else if (res.data.code == 404) {
							uni.showToast({
								title: '库存不足',
								icon: 'error'
							})
						}else {
							uni.showToast({
								title: '金钱不足',
								icon: 'error'
							})
						};
						that.modalName = null;
					}
				});
			},
			more(src,name,shengyu){
				this.modalName = 'more';
				this.mpsrc = src;
				this.goumainame = name;
				this.shengyu = shengyu;
			},
			hidemodal(){
				this.modalName = null
			},
			gmqr(id,jiage,name){
				this.goumaiid = id;
				this.goumaijiage = jiage;
				this.goumainame = name;
				this.modalName = 'goumai';
			},
		}
	}
</script>

<style>
	.padding-smx{
		padding: 0 10upx;
	}
	.cu-tag{
		padding: 10upx;
	}
	.width100{
		height: 220upx;
	}
	.width101{
		width: 100%;
		height: 400upx;
	}
	.flex1{
		width: 100%;
	}
	#waterfull {
	     margin: 0 auto;
	     width: 100%;
	}
	/* 每一列图片包含层 */
	.item-img {
	     margin-bottom: 15upx;
		 padding: 10upx;
	     /* 防止多列布局，分页媒体和多区域上下文中的意外中断 */
	     break-inside: avoid;
	     background: #fff;
		 width: 49%;
		 float: left;
		 margin-right: 8upx;
	}
	.text-shadow2{
		text-shadow: 0 0 0.2em #ffffff, 0 0 0.2em #ffffff,
		        0 0 0.2em #ffffff
	}
	.bg-green-trans{
		background-color: #55ff7f99;
		color: #fff;
	}
	.bg-blue-trans{
		background-color: #0000ff99;
		color: #fff;
	}
</style>
