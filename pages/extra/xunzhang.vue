<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">勋章商城</block>
		</cu-custom>
		<view class="cu-form-group">
			<view class="title">账户余额</view>
			<view class="text-red">{{money}}金币</view>
		</view>
		<view class='padding-xs flex flex-wrap bg-gradual-white'>
			<view class="padding-xs" v-for="(item,index) in xunzhangfenlei" :key="index" v-if="item.count>0">
				<view class='cu-tag padding-smx' :class="'bg-' + colorlistv(index)" @tap="toxz(item.id)">{{item.mingcheng}}
					<view class="cu-tag badge">{{item.count}}</view>
				</view>
			</view>
		</view>
		<view>
			<block>
				<view class="padding-xs flex align-center">
					<view class="flex-sub text-center">
						<view class="text-xs padding">
							<text class="text-black">终点论坛©2022</text>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="status_bar bg-white cu-bar tabbar shadow foot" :class="'bt-'+themeColor.name">
			<view class="action text-green" @click="NavChange(1)">
				<view class="cuIcon-shopfill"></view> 商城
			</view>
			<view class="action text-gray" @click="NavChange(2)">
				<view class="cuIcon-punch"></view> 记录
			</view>
			<view class="action text-gray" @click="NavChange(3)">
				<view class="cuIcon-rank">
				</view>
				排行
			</view>
			<view class="action text-gray" @click="NavChange(4)">
				<view class="cuIcon-my">
				</view>
				我的
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: 0,
				xunzhangfenlei: [],
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			if (uni.getSystemInfoSync().platform == 'ios') {
				this.platform = 1;
			} else {
				this.platform = 2;
			}
			this.getfenlei();
		},
		methods: {
			colorlistv(e) {
				let colorindex = e % 13;
				if (colorindex == 12) {
					colorindex = 13;
				}
				return this.ColorList[colorindex].name;
			},
			toxz(e){
				uni.navigateTo({
					url: 'xunzhangfenlei?fenlei=' + e 
				});
			},
			getfenlei() {
				var that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:xunzhang', //获取轮播列表
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						typeid: 1
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							that.money = res.data.credit;
							that.xunzhangfenlei = res.data.list
						} else {
							uni.showToast({
								title: '加载失败',
								icon: 'error'
							})
						}
					}
				});
			},
			NavChange(e){
				console.log(e)
				if(e==4){
					uni.redirectTo({
						url: 'myxunzhang'
					})
				}else if(e==2){
					uni.redirectTo({
						url: 'xunzhanglog'
					})
				}else if(e==3){
					uni.redirectTo({
						url: 'xunzhangrank'
					})
				}
			}
		}
	}
</script>

<style>
	.cu-form-group {
		justify-content: start !important;
	}

	.padding-smx {
		padding: 24upx 12upx;
	}
</style>
