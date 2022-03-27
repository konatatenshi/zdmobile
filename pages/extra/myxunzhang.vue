<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">{{$t('shop.mymedal')}}</block>
		</cu-custom>
		<view class="flex solid-bottom padding-left-sm padding-right-sm align-center bg-white" v-for="(item,index) in fenleilist" :key="index">
			<view class="bg-white margin-xs radius flex1"><image class="tup" :src="item.tupian" @tap="toxzfl(item.fid)"></image>
			</view>
			<view class="padding-left-sm padding-right-sm radius flex9">
				<text class="text-blue">{{item.mingcheng}}</text>
				<text class='cu-tag padding-smx bg-green margin-left-xs' v-if="item.youxiaoqi==0">{{$t('shop.perm')}}
				</text>
				<text class='cu-tag padding-smx bg-green margin-left-xs' v-else>{{$t('shop.exp')}}:{{item.youxiaoqi}}{{$t('extra.days')}}
				</text>
				<text class='cu-tag padding-smx bg-yellow margin-left-xs' v-if="item.is_huishou==1" @tap="gmqr(item.mid,item.jifen_jiage,item.mingcheng)">{{Number(item.jifen_jiage)/2}}{{$t('shop.recy')}}
				</text>
				<text class='cu-tag padding-smx bg-cyan margin-left-xs' v-if="item.fatie!=''" @tap="fttx(item.fatie.jifen_jiage,item.fatie.jifen_leixing,item.fatie.jilv)">{{$t('shop.po')}}
				</text>
				<text class='cu-tag padding-smx bg-mauve margin-left-xs' v-if="item.huitie!=''" @tap="httx(item.huitie.jifen_jiage,item.huitie.jifen_leixing,item.huitie.jilv)">{{$t('shop.re')}}
				</text>
				<text class="text-green text-widthd" @tap="paix(item.mid,item.paixu)"><text class="text-orange text-bold">【{{$t('shop.ord')}}：{{item.paixu}}】</text>{{item.shuoming}}</text>
			</view>
			<view class="bg-gray radius flex0 padding-left-xs padding-right-xs padding-top-sm padding-bottom-sm" v-if="item.kejian==1" @tap="quxia(item.mid)">{{$t('shop.rem')}}<br>{{$t('shop.ove')}}</view>
			<view class="bg-red radius flex0 padding-left-xs padding-right-xs padding-top-sm padding-bottom-sm" v-else @tap="peidai(item.mid)">{{$t('shop.we')}}<br>{{$t('shop.ar')}}</view>
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
				<view class="cuIcon-shopfill"></view>  {{$t('shop.store')}}
			</view>
			<view class="action text-gray" @click="NavChange(2)">
				<view class="cuIcon-punch"></view>{{$t('shop.log')}}
			</view>
			<view class="action text-gray" @click="NavChange(3)">
				<view class="cuIcon-rank">
				</view>
				{{$t('shop.rank')}}
			</view>
			<view class="action text-green" @click="NavChange(4)">
				<view class="cuIcon-my">
				</view>
				{{$t('shop.mine')}}
			</view>
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
		<view class="cu-modal" :class="modalName=='paixu'?'show':''" @tap = "hidemodal()">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">{{$t('shop.orderconfirm')}}</view>
					<view class="action" @tap="hidemodal()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl text-brown">
					<text>{{$t('shop.orderconfirmtxt')}}<br></text>
					<input class="solid-bottom text-red" type="number" v-model="paixu"></input>
				</view>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="paaixu()">{{$t('api.ok')}}</button>
						<button class="cu-btn line-green margin-left" @tap="hidemodal()">{{$t('api.cancel')}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='goumai'?'show':''" @tap = "hidemodal()">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">{{$t('shop.recycling')}}</view>
					<view class="action" @tap="hidemodal()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl text-brown">
					{{$t('shop.recyclingt1')}}<text class="text-red text-bold">{{goumaijiage}}</text>{{$t('shop.recyclingt2')}}<text class="text-red text-bold">{{goumainame}}</text>？
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
						typeid: 4
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
						typeid: 5,
						fenlei: that.goumaiid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							uni.showToast({
								title: that.$t('shop.medalts1')
							})
							that.getxunzhang(that.fenlei);
						}else {
							uni.showToast({
								title: that.$t('shop.medalts2'),
								icon: 'error'
							})
						};
						that.modalName = null;
					}
				});
			},
			paaixu(){
				var that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:xunzhang', //获取轮播列表
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						typeid: 6,
						fenlei: that.goumaiid,
						paixu: that.paixu
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							uni.showToast({
								title: that.$t('shop.medalts3')
							})
							that.getxunzhang(that.fenlei);
						}else {
							uni.showToast({
								title: that.$t('shop.medalts4'),
								icon: 'error'
							})
						};
						that.modalName = null;
					}
				});
			},
			peidai(e){
				var that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:xunzhang', //获取轮播列表
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						typeid: 7,
						fenlei: e
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							uni.showToast({
								title: that.$t('shop.medalts5')
							})
							that.getxunzhang(that.fenlei);
						}else {
							uni.showToast({
								title: that.$t('shop.medalts6'),
								icon: 'error'
							})
						};
						that.modalName = null;
					}
				});
			},
			quxia(e){
				var that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:xunzhang', //获取轮播列表
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						typeid: 8,
						fenlei: e
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							uni.showToast({
								title: that.$t('shop.medalts7')
							})
							that.getxunzhang(that.fenlei);
						}else {
							uni.showToast({
								title: that.$t('shop.medalts8'),
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
				}else if(e==3){
					uni.redirectTo({
						url: 'xunzhangrank'
					})
				}
			},
			toxzfl(e){
				uni.navigateTo({
					url: 'xunzhangfenlei?fenlei=' + e 
				});
			}
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
