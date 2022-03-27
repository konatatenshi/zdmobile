<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">{{$t('shop.buymedal')}}</block>
			<block slot="right">
				<view class="action">
					<view class="cu-load cuIcon-question" @tap="more()"></view>
				</view>
			</block>
		</cu-custom>
		<view class="flex solid-bottom padding-left-sm padding-right-sm align-center bg-white" v-for="(item,index) in fenleilist" :key="index">
			<view class="bg-white margin-xs radius flex1"><image class="tup" :src="item.tupian"></image>
			</view>
			<view class="padding-left-sm padding-right-sm radius flex9">
				<text class="text-blue">{{item.mingcheng}}</text>
				<text v-if="item.zuozhe!=''" class="text-red margin-left-xs">{{$t('shop.author')}}:{{item.zuozhe}}</text>
				<text class='cu-tag padding-smx bg-green margin-left-xs' v-if="item.youxiaoqi==0">{{$t('shop.perm')}}
				</text>
				<text class='cu-tag padding-smx bg-green margin-left-xs' v-else>{{$t('shop.exp')}}:{{item.youxiaoqi}}{{$t('extra.days')}}
				</text>
				<text class='cu-tag padding-smx bg-yellow margin-left-xs'>{{$t('shop.left')}}:{{Number(item.kucun) - Number(item.yimai)}}
				</text>
				<text class='cu-tag padding-smx bg-cyan margin-left-xs' v-if="item.fatie!=''" @tap="fttx(item.fatie.jifen_jiage,item.fatie.jifen_leixing,item.fatie.jilv)">{{$t('shop.po')}}
				</text>
				<text class='cu-tag padding-smx bg-mauve margin-left-xs' v-if="item.huitie!=''" @tap="httx(item.huitie.jifen_jiage,item.huitie.jifen_leixing,item.huitie.jilv)">{{$t('shop.re')}}
				</text>
				<text class="text-green text-widthd"><text class="text-orange text-bold" v-if="Number(item.jifen_jiage)>0">【{{$t('shop.price')}}：{{item.jifen_jiage}}{{$t('credit.coins')}}】</text><text class="text-orange text-bold" v-else>【{{$t('shop.nfsale')}}】</text>{{item.shuoming}}</text>
			</view>
			<view class="bg-gray radius flex0 padding-left-xs padding-right-xs padding-top-sm padding-bottom-sm" v-if="item.owner==1">{{$t('shop.ow')}}<br>{{$t('shop.ne')}}</view>
			<view class="bg-red radius flex0 padding-left-xs padding-right-xs padding-top-sm padding-bottom-sm" v-else-if="Number(item.jifen_jiage)>0&&(Number(item.kucun) - Number(item.yimai))>0" @tap="gmqr(item.id,item.jifen_jiage,item.mingcheng)">{{$t('shop.bu')}}<br>{{$t('shop.y')}}</view>
			<view class="bg-gray radius flex0 padding-left-xs padding-right-xs padding-top-sm padding-bottom-sm text-white" v-else>{{$t('shop.bu')}}<br>{{$t('shop.y')}}</view>
		</view>
		<view class="cu-modal" :class="modalName=='more'?'show':''" @tap = "hidemodal()">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">{{$t('shop.help')}}</view>
					<view class="action" @tap="hidemodal()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{$t('shop.helptext1')}}<br>{{$t('shop.helptext2')}}<br>{{$t('shop.helptext3')}}<br>{{$t('shop.helptext4')}}<br>{{$t('shop.helptext5')}}<br>{{$t('shop.helptext6')}}
				</view>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="hidemodal()">{{$t('api.ok')}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='fatie'?'show':''" @tap = "hidemodal()">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">{{$t('shop.tx1')}}</view>
					<view class="action" @tap="hidemodal()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl text-blue">
					{{$t('shop.post')}}： <text v-if="texiaojifen>0"> +{{texiaojifen}}</text><text v-else> {{texiaojifen}}</text>{{texiaoleixing}}<br>
					{{$t('shop.trigger')}}：{{texiaogailv}}%
				</view>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="hidemodal()">{{$t('api.ok')}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='huitie'?'show':''" @tap = "hidemodal()">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">{{$t('shop.tx2')}}</view>
					<view class="action" @tap="hidemodal()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl text-blue">
					{{$t('shop.post')}}： <text v-if="texiaojifen>0"> +{{texiaojifen}}</text><text v-else> {{texiaojifen}}</text>{{texiaoleixing}}<br>
					{{$t('shop.trigger')}}：{{texiaogailv}}%
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
					<view class="content">{{$t('shop.pconfirm')}}</view>
					<view class="action" @tap="hidemodal()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl text-brown">
					{{$t('shop.pconfirmt1')}}<text class="text-red text-bold">{{goumainame}}</text>{{$t('shop.pconfirmt2')}}<br>
					{{$t('shop.pconfirmt3')}}<text class="text-red text-bold">{{goumaijiage}}</text>{{$t('credit.coins')}}。
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
				goumaijiage: 0
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
						typeid: 2,
						fenlei: e
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
								title: that.$t('shop.failed'),
								icon: 'error'
							})
						}
					}
				});
			},
			goumai() {
				var that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:xunzhang', //获取轮播列表
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						typeid: 3,
						fenlei: that.goumaiid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							uni.showToast({
								title: that.$t('shop.medaltishi1')
							})
							that.getxunzhang(that.fenlei);
						} else if (res.data.code == 402) {
							uni.showToast({
								title: that.$t('shop.medaltishi2'),
								icon: 'error'
							})
						} else if (res.data.code == 404) {
							uni.showToast({
								title: that.$t('shop.medaltishi3'),
								icon: 'error'
							})
						}else {
							uni.showToast({
								title: that.$t('shop.medaltishi4'),
								icon: 'error'
							})
						};
						that.modalName = null;
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
					this.texiaoleixing = this.$t('credit.coins');
				}else if(leixing==2){
					this.texiaoleixing = this.$t('credit.credits');
				}else if(leixing==3){
					this.texiaoleixing = this.$t('credit.exp');
				}
				this.texiaojifen = jiage;
				this.texiaogailv = jilv;
				this.modalName = 'fatie';
			},
			httx(jiage,leixing,jilv){
				if(leixing==1){
					this.texiaoleixing = this.$t('credit.coins');
				}else if(leixing==2){
					this.texiaoleixing = this.$t('credit.credits');
				}else if(leixing==3){
					this.texiaoleixing = this.$t('credit.exp');
				}
				this.texiaojifen = jiage;
				this.texiaogailv = jilv;
				this.modalName = 'huitie';
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
		width: 34px;
		height: 54px;
	}
</style>
