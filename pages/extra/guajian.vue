<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">购买头像挂件</block>
		</cu-custom>
		<view v-if="fenleilist.length > 0" id="waterfull">
			<view class="solid-bottom align-center bg-white item-img" v-for="(item,index) in fenleilist" :key="index">
				<view class="cu-item shadow flex1 cu-card case">
					<view class="image">
						<view class="width100">
							<image class="cu-avatar4 round gzlist2" :src="avatarlist" />
							</image>
							<image class="cu-avatar4 round gzlist"
								v-if="item.pic != ''" :src="item.pic" />
							</image>
						</view>
						<view class="cu-tag bg-blue-jb">
						<text v-if="item.ifbuy==''">价格{{item.buy_score}}金币/{{item.expires}}天</text><text v-else class="text-yellow">剩余时间：{{item.shengyu}}天</text></view>
						<view class="cu-bar cu-bar2 bg-shadeBottom"> <text class="text-cut text-center text-shadow2">{{item.title}}</text></view>
					</view>
					<view class="bg-gradual-white text-right">
					<button class="cu-btn bg-green margin-right-xs" v-if="item.ifbuy==''" @tap="gmqr(item.id,item.buy_score,item.title)">买</button>
					<button class="cu-btn bg-green margin-right-xs" v-else @tap="gmqr(item.id,item.buy_score,item.title)">续</button>
					<button class="cu-btn bg-red margin-right-xs" @tap="shiyong(item.id)" v-if="item.ifbuy!=''&&item.ifbuy.default_id==0">装</button>
					<button class="cu-btn bg-yellow margin-right-xs" @tap="xiexia(item.id)" v-else-if="item.ifbuy!=''">卸</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='more'?'show':''" @tap = "hidemodal()">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">挂件详情</view>
					<view class="action" @tap="hidemodal()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-top-xl padding-bottom-xl">
					<image class="width101" :src="mpsrc"></image>
					<text class="text-red">{{goumainame}}</text><br><text class="text-blue" v-if="shengyu>=0">有效期：{{shengyu}}天</text>
				</view>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="hidemodal()">确定</button>
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
					将要花费<text class="text-red text-bold">{{goumaijiage}}</text>金币。
				</view>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="goumai()">确定</button>
						<button class="cu-btn line-green margin-left" @tap="hidemodal()">取消</button>
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
				avatarlist: 'https://zd.tiangal.com/uc_server/avatar.php?uid=' + this.$uid + '&size=big',
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
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:touxiangkuang', //获取轮播列表
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
							that.fenleilist = res.data.list;
							console.log(that.avatarlist);
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
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:touxiangkuang', //获取轮播列表
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
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:touxiangkuang', //获取轮播列表
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
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:touxiangkuang', //获取轮播列表
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
		height: 220upx!important;
		width: 220upx!important;
	}
	.width101{
		height: 450upx;
		padding: 100upx;
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
		 width: 32%;
		 float: left;
		 margin-right: 8upx;
	}
	.text-shadow2{
		text-shadow: 0 0 0.2em #ffffff, 0 0 0.2em #ffffff,
		        0 0 0.2em #ffffff
	}
	.cu-avatar4 {
		justify-content: center;
		align-items: center;
		color: #ffffff;
		background-size: cover;
		background-position: center;
		vertical-align: middle;
		font-size: 1.5em;
	}
	
	.gzlist {
		z-index: 99;
		background-color: transparent!important;
		margin: 0upx 0 0 0upx;
		width: 220upx!important;
		height: 220upx!important;
	}
	
	.gzlist2 {
		position: absolute;
		margin: 42upx 0 0 40upx!important;
		width: 140upx!important;
		height: 140upx!important;
	}
	.bg-blue-jb{
		background-color: #0000ff99;
		color: #fff;
		z-index: 100;
	}
	.cu-bar2{
		z-index: 101;
		min-height: 50upx!important;
		padding: 0!important;
		justify-content: center!important;
	}
</style>
