<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-gradual-cyan" :isBack="true" class="text-shadow1">
			<block slot="content">屏蔽列表</block>
		</cu-custom>
		<view v-for="(itemex,indexe1) in pingbilist" :key="indexe1">
			<view class="grid col-2 align-center padding-top">
				<view class="wid8 text-left padding-right padding-left">
					{{itemex}}
				</view>
				<view class="wid1 text-red padding-right padding-left" @tap="pingbiremove(itemex)">
					移除
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
					title: '移除确认',
					content: '确定将用户 ' + e + ' 移除屏蔽列表？',
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
							title:'移除成功'
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
