<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-cyan" :isBack="true" class="text-shadow1">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">{{$t('home.historytitle')}}</block>
			<block slot="right">
				<view class="action">
					<view class="cu-load cuIcon-delete" @tap="deleteall()"></view>
				</view>
			</block>
		</cu-custom>
		<view v-for="(itemex,indexe1) in historylist" :key="indexe1">
			<view class="grid col-2 align-center padding-top">
				<view class="wid8 text-left padding-right padding-left">
					<text class="text-underline text-blue" @tap="topost(itemex[0])">{{itemex[1]}}</text>
				</view>
				<view class="wid1 text-red padding-right padding-left" @tap="pingbiremove(itemex)">
					{{$t('setting.remove')}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historylist:[]
			}
		},
		methods: {
			topost(e) {
				uni.navigateTo({
					url: '../component/card?tid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			pingbiremove(e){
				let that = this;
				uni.showModal({
					title: that.$t('setting.removeconfirm'),
					content: that.$t('setting.removet3') + e[1] + that.$t('setting.removet4'),
					success: function(res) {
						if (res.confirm) {
							that.pingbiremove2(e);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			pingbiremove2(e){
				var that = this;
				for (var i = 0 ; i < this.historylist.length;i++) {
				    if (this.historylist[i][0]==e[0]) {
				        this.historylist.splice(i,1);
				        i--;
				    }
				}
				console.log(this.historylist)
				uni.setStorage({
					key: 'historylist',
					data: that.historylist,
					success: function() {
						uni.showToast({
							title:that.$t('setting.removesuccess')
						})
					}
				});
				setTimeout(() => {
					this.modalName = null;
				}, 200)
			},
			deleteall(){
				let that = this;
				uni.showModal({
					title: that.$t('setting.removeconfirm'),
					content: that.$t('setting.removet5'),
					success: function(res) {
						if (res.confirm) {
							that.deleteall2();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			deleteall2(){
				let that = this;
				uni.removeStorage({
					key: 'historylist',
					success: function (res) {
						that.historylist = [];
						uni.showToast({
							title:that.$t('setting.removesuccess')
						})
					}
				});
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			let that = this;
			uni.getStorage({
				key: 'historylist',
				success: function(res) {
					console.log(res.data);
					that.historylist = res.data;
				}
			})
		},
		onShow: function(option) {
			let that = this;
			uni.getStorage({
				key: 'historylist',
				success: function(res) {
					console.log(res.data);
					that.historylist = res.data;
				}
			})
		}
	}
</script>

<style>
	.wid1 {
	    width: 20%!important;
	}
	.wid8 {
	    width: 80%!important;
	}
</style>
