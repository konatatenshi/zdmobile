<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-cyan" :isBack="true" class="text-shadow1">
			<block slot="content">{{$t('setting.ignorelist')}}</block>
		</cu-custom>
		<view v-for="(itemex,indexe1) in pingbilist" :key="indexe1">
			<view class="grid col-2 align-center padding-top">
				<view class="wid8 text-left padding-right padding-left">
					{{itemex}}
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
				pingbilist:[]
			}
		},
		methods: {
			pingbiremove(e){
				let that = this;
				uni.showModal({
					title: that.$t('setting.removeconfirm'),
					content: that.$t('setting.removet1') + e + that.$t('setting.removet2'),
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
				this.pingbilist.splice(this.pingbilist.indexOf(e), 1);
				console.log(this.pingbilist)
				uni.setStorage({
					key: 'pingbilist',
					data: that.pingbilist,
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
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			let that = this;
			uni.getStorage({
				key: 'pingbilist',
				success: function(res) {
					console.log(res.data);
					that.pingbilist = res.data;
				}
			})
		},
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
