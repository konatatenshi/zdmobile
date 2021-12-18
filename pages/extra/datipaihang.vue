<template>
	<view class="backg" style="width:100%;height:calc( 100vh - 50px - 30upx);display:block;">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">答题排行</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in 3" :key="index" @tap="tabSelect" :data-id="index">
					{{tabname(index)}}
				</view>
			</view>
		</scroll-view>
		<view class="padding-top-sm">
			<view class="grid text-center col-4">
				<view class="wid1">用户名</view>
				<view class="wid2">答题总数</view>
				<view class="wid2">答对数</view>
				<view class="wid2">连对数</view>
			</view>
			<view v-for="(itemex,indexe1) in datilist" :key="indexe1">
				<view class="grid text-center col-3">
					<view class="wid1" :class="itemex.uid==$uid?'text-red':''" style="text-align: left;"><image class="margin-left-sm" style="width: 40upx;height: 40upx;" :src="'https://zd.tiangal.com/uc_server/avatar.php?uid=' + itemex.uid + '&size=small'"></image>{{itemex.username}}</view>
					<view class="wid2" :class="itemex.uid==$uid?'text-red':''">{{itemex.total}}</view>
					<view class="wid2" :class="itemex.uid==$uid?'text-red':''">{{itemex.bingo}}</view>
					<view class="wid2" :class="itemex.uid==$uid?'text-red':''">{{itemex.combo}}</view>
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
		<view>
			<block>
				<view class="padding-xs flex align-center margin-bottom-xl">
					<view class="flex-sub text-center">
						<view class="text-xs padding" style="height: 50upx;">
							
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="bottom-tabbar">
			 <view class="box margin-bottom" @click="goHome">
				  <image src="../../static/images/icon1a.png"></image>
				  <view class="text">答题首页</view>
			 </view>
			 <view class="box margin-bottom" @click="goIntro">
			 	<image src="../../static/images/iconca.png"></image>
			 	<view class="text">答题规则</view>
			 </view>
			 <view class="box margin-bottom">
				 <image src="../../static/images/icon2b.png"></image>
				 <view class="text active">答题排行</view>
			 </view>
			 <view class="bg-white" style="height: 20upx;">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	  name: "Intro",
	  components: {},
	  data() {
	    return {
	      active: 1,
		  loading: '载入中……',
		  TabCur: 0,
		  page0: 0,
		  page1: 0,
		  page2: 0,
		  datilist: []
	    };
	  },
	  mounted() {
		plus.navigator.setStatusBarStyle('dark');
		this.loadph();
	  },
	  methods: {
		goHome(){
			uni.redirectTo({
				url:'./dati'
			})
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.page0 = 0;
			this.loadph();
		},
		loadph(e){
			let that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:question', //获取轮播列表
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						page: that.page0,
						datiinfi : that.TabCur + 2
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(that.page0);
						console.log(res.data);
						var push = res.data;
						console.log(push);
						if(that.page0==0){
							that.datilist = push;
						}else{
							if (push.length > 0) {
								for (let i = 0; i < push.length; ++i) {
									that.datilist.push(push[i]);
								}
							}
						}
						if (push.length < 30) {
							that.loading = '真的到底了！';
						}else{
							that.loading = '下滑加载更多';
						}
						that.page0++;
						setTimeout(function() {
							//that.setHeight("view_listnow");
						}, 100)
					}
				});
		},
		tabname(e) {
			if(e==0){
				return '总答题数排行';
			}else if(e==1){
				return '答对排行';
			}else if(e==2){
				return '连对排行';
			}
		},
		goIntro() {
			uni.redirectTo({
				url: './guize'
			})
		}
	  },
	  onReachBottom() {
	  	console.log("到底了");
	  	this.loadph();
	  }
	};
</script>

<style>
	@import "@/static/css/dtstyle.css";
	page{
		background-color: #fff;
	}
	.backg {
		background-color:  #fff;
	}
	.wid1 {
	    width: 40%!important;
	}
	.wid2 {
	    width: 20%!important;
	}
</style>
