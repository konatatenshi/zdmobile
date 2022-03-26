<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">{{$t('shop.medallog')}}</block>
		</cu-custom>
		<scroll-view scroll-x class="nav">
			<view class="cu-item padding-left-xl padding-right-xl"
				:class="TabCur==0?'text-black text-bold cur':'text-black'" @tap="tabSelect(0)">
				全部记录
			</view>
			<view class="cu-item padding-left-xl padding-right-xl"
				:class="TabCur==1?'text-black text-bold cur':'text-black'" @tap="tabSelect(1)">
				我的记录
			</view>
		</scroll-view>
		<view v-for="(itemex,indexe1) in guanzhupost" :key="indexe1">
			<view class="grid col-2 align-center">
				<view class="wid1" @tap="touid(itemex.uid)">
					<view class="margin-xs radius flex1">
						<image class="tup" :src="'https://zd.tiangal.com/uc_server/avatar.php?uid=' + itemex.uid +'&size=middle'"></image>
					</view>
				</view>
				<view class="wid8 text-left">
					<rich-text :nodes="itemex.shuoming"></rich-text>
				</view>
			</view>
		</view>
		<view>
			<block>
				<view class="padding-xs flex align-center">
					<view class="flex-sub text-center">
						<view class="text-xs padding">
							<text class="text-black">{{loading}}</text>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="status_bar bg-white cu-bar tabbar shadow foot" :class="'bt-'+themeColor.name">
			<view class="action text-gray" @click="NavChange(1)">
				<view class="cuIcon-shopfill"></view> {{$t('shop.store')}}
			</view>
			<view class="action text-green" @click="NavChange(2)">
				<view class="cuIcon-punch"></view> {{$t('shop.log')}}
			</view>
			<view class="action text-gray" @click="NavChange(3)">
				<view class="cuIcon-rank">
				</view>
				{{$t('shop.rank')}}
			</view>
			<view class="action text-gray" @click="NavChange(4)">
				<view class="cuIcon-my">
				</view>
				{{$t('shop.mine')}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				platform: 0,
				TabCur: 0,
				page:0,
				typeid:10,
				loading:'下拉加载更多',
				guanzhupost: []
			}
		},
		onReachBottom() {
			console.log("到底了");
			this.tothebottom();
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.tothebottom();
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e;
				console.log(this.TabCur);
				this.page = 0;
				this.guanzhupost = [];
				this.typeid = e + 10;
				this.tothebottom();
			},
			tothebottom() {
				var that = this;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:xunzhang', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: that.typeid,
							page: that.page
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data)
							let push = res.data.list;
							console.log(push);
							if (push.length > 0) {
								for (let i = 0; i < push.length; ++i) {
									that.guanzhupost.push(push[i]);
								}
							}
							if (push.length < 30) {
								that.loading = this.$t('api.loadtoend');
							}else{
								that.loading = this.$t('api.loadmore');
							}
							that.page++;
							setTimeout(function() {
								//that.setHeight("view_listnow");
							}, 100)
						}
					});
			},
			touid(e) {
				uni.navigateTo({
					url: '../component/list?uid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			NavChange(e){
				if(e==1){
					uni.redirectTo({
						url: 'xunzhang'
					})
				}else if(e==3){
					uni.redirectTo({
						url: 'xunzhangrank'
					})
				}else if(e==4){
					uni.redirectTo({
						url: 'myxunzhang'
					})
				}
			},
		}
	}
</script>

<style>
	.tup{
		height: 50upx;
		width: 50upx;
	}
	.wid1 {
	    width: 10%!important;
	}
	.wid8 {
	    width: 90%!important;
	}
	b {
	    color: red;
	}
</style>
