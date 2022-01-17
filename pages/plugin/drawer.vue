<template>
	<view :class="'bg-white bc-'+themeColor.name">
		<cu-custom class="statustop" :bgColor="'bg-gradual-'+themeColor.name" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">QQ登录</block>
			<block slot="right">
				<view class="action">
					<view class="cu-load cuIcon-home" @tap="home()"></view>
				</view>
			</block>
		</cu-custom>
		<view>
			<view class="solids-bottom padding-xs flex align-center">
				<view class="flex-sub text-center">
					<view class="solid-bottom text-xsl padding">
						<image src="../../static/images/QQ.png"></image>
					</view>
					<view class="padding text-underline text-blue" @tap="tologin()"><text class="lg text-blue cuIcon-link"></text>点此打开浏览器进行QQ登录</view>
					<view class="padding flex flex-direction"><button class="cu-btn bg-red margin-tb-sm lg" @tap="login">我已经在网页登录了，点此刷新</button></view>
					<view class="padding text-gray">注意：需要网页打开QQ，并登录QQ，并且跳转，直到显示成功登录，然后可以关闭网页，回到APP点击上方红色按钮了。</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import AES from '../../js_sdk/ar-aes/ar-aes.js';
	import w_md5 from "../../js_sdk/zww-md5/w_md5.js";
	import Vue from 'vue';
	export default {
		data() {
			return {
				modalName:null,
				randomsession: 0,
				version: ''
			};
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			tologin(){
				let that = this;
				this.randomsession = Math.round(Math.random()*100000000000);
				plus.runtime.openURL('https://bbs.zdfx.net/connect.php?mod=login&op=init&referer=https%3A%2F%2Fbbs.zdfx.net%2Fplugin.php%3Fid%3Dts2t_qqavatar%3Aqqlogin%26session%3D' + that.randomsession + '&statfrom=login', function(res) {
					console.log(res);
				});
			},
			home(){
				uni.redirectTo({
					url: '../../components/ay-login/login-password'
				})
			},
			login(){
				let that = this;
				if(this.randomsession==0){
					uni.showToast({
						title: '你得先在浏览器登录QQ后再点此按钮',
						icon: 'none',
						duration: 2000
					})
					return;
				}
				plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
					that.version = wgtinfo.version;
					console.log('version：' + that.version);
				});
				const sesst = 'S' + that.randomsession;
				const signature = plus.navigator.getSignature();
				const signe = AES.AES.encrypt(signature,w_md5.hex_md5_16(that.version),w_md5.hex_md5_16(sesst));
				that.formsub = true;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:qqlogin', //获取置顶帖子
						method: 'GET',
						timeout: 10000,
						data: {
							key: getApp().globalData.zdserverkey,
							type: 1,
							session : that.randomsession,
							sign : signe,
							version: that.version
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							that.formsub = false;
							if (res.data.code == 200) {//未开启
								uni.setStorage({
									key: 'userlogininfo',
									data: res.data.data,
									success: function() {
										console.log(res.data.data);
										try {
											const loginvalue = uni.getStorageSync('userlogininfo');
											if (loginvalue) {
												Vue.prototype.$token = loginvalue.token;
												Vue.prototype.$uid = loginvalue.uid;
												Vue.prototype.$username = loginvalue.username;
												Vue.prototype.$adminid = loginvalue.adminid;
												Vue.prototype.$groupid = loginvalue.groupid;
												let avanum = (Array(9).join("0") + loginvalue.uid).slice(-9);
												Vue.prototype.$avatarsmall = 'https://zd.tiangal.com/uc_server/data/avatar/' + avanum
													.substr(0, 3) + '/' + avanum.substr(3, 2) + '/' + avanum.substr(5, 2) + '/' +
													avanum.substr(7, 2) + '_avatar_small.jpg';
												Vue.prototype.$avatarsmalldefault = 'https://zd.tiangal.com/uc_server/images/randuser/small/' + avanum.substr(-1) + '.jpg';
												//this.$emit("returnDat", "basics");
												uni.redirectTo({
													url: '/pages/index/index'
												});
											}
										} catch (e) {
											// error
										}
									}
								});
							}else if (res.data.code == 400) {
								uni.showToast({
									title: '获取登录信息失败，请确认你已经登录。',
									icon: 'none',
									duration: 2000
								})
							}else{
								uni.showToast({
									title: '功能出错',
									icon: 'none',
									duration: 2000
								})
							}
						}
					});
			}
		},
	}
</script>

<style>
	.text-underline{
	    text-decoration: underline;
	}
</style>
