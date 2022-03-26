<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">{{$t('shop.medalrank')}}</block>
		</cu-custom>
		<view class="flex solid-bottom padding-left-sm padding-right-sm align-center bg-white" v-for="(item,index) in fenleilist" :key="index">
			<view class="bg-white margin-xs radius flex1"><image class="tup" :src="'https://zd.tiangal.com/uc_server/avatar.php?uid=' + item.uid +'&size=middle'"></image>
			</view>
			<view class="padding-left-sm padding-right-sm radius flex9">
				<text class="text-red">第{{Number(index)+1}}名：</text><text class="text-blue">{{item.username}}</text>
				<text class="text-green text-widthd">目前拥有勋章：{{item.count}}</text>
			</view>
			<view class="bg-red radius flex0 padding-left-xs padding-right-xs padding-top-sm padding-bottom-sm" @tap="touid(item.uid)">查<br>看</view>
		</view>
		<view>
			<block>
				<view class="padding-xs flex align-center">
					<view class="flex-sub text-center">
						<view class="text-xs padding">
							<text class="text-black">{{$t('index.title')}}©2022</text>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="status_bar bg-white cu-bar tabbar shadow foot" :class="'bt-'+themeColor.name">
			<view class="action text-gray" @click="NavChange(1)">
				<view class="cuIcon-shopfill"></view> {{$t('shop.store')}}
			</view>
			<view class="action text-gray" @click="NavChange(2)">
				<view class="cuIcon-punch"></view> {{$t('shop.log')}}
			</view>
			<view class="action text-green" @click="NavChange(3)">
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
				fenlei:93,
				fenleilist:[],
				modalName: null,
				texiaogailv: 0,
				texiaoleixing: '',
				texiaojifen: 0,
				goumaiid: 0,
				goumainame: '',
				goumaijiage: 0,
				paixu: 0
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
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:xunzhang', //获取轮播列表
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						typeid: 9
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							that.fenleilist = res.data.list.query
						} else {
							uni.showToast({
								title: '加载失败',
								icon: 'error'
							})
						}
					}
				});
			},
			more(){
				this.modalName = 'more';
			},
			hidemodal(){
				this.modalName = null
			},
			fttx(jiage,leixing,jilv){
				if(leixing==1){
					this.texiaoleixing = '金币';
				}else if(leixing==2){
					this.texiaoleixing = '点币';
				}else if(leixing==3){
					this.texiaoleixing = '宠物经验';
				}
				this.texiaojifen = jiage;
				this.texiaogailv = jilv;
				this.modalName = 'fatie';
			},
			httx(jiage,leixing,jilv){
				if(leixing==1){
					this.texiaoleixing = '金币';
				}else if(leixing==2){
					this.texiaoleixing = '点币';
				}else if(leixing==3){
					this.texiaoleixing = '宠物经验';
				}
				this.texiaojifen = jiage;
				this.texiaogailv = jilv;
				this.modalName = 'huitie';
			},
			gmqr(id,jiage,name){
				this.goumaiid = id;
				this.goumaijiage = Number(jiage/2);
				this.goumainame = name;
				this.modalName = 'goumai';
			},
			paix(id,paixu){
				this.goumaiid = id;
				this.paixu = paixu;
				this.modalName = 'paixu';
			},
			NavChange(e){
				if(e==1){
					uni.redirectTo({
						url: 'xunzhang'
					})
				}else if(e==2){
					uni.redirectTo({
						url: 'xunzhanglog'
					})
				}else if(e==4){
					uni.redirectTo({
						url: 'myxunzhang'
					})
				}
			},
			touid(e) {
				uni.navigateTo({
					url: '../component/list?uid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
		}
	}
</script>

<style>
	.padding-smx{
		padding: 0 10upx;
	}
	.text-widthd{
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
	.flex0{
		flex: 1;
	}
	.flex1{
		flex: 2;
	}
	.flex9{
		flex: 18;
	}
	.tup{
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}
</style>
