<template>
	<view :class="'bg-white bc-'+themeColor.name">
		<cu-custom class="statustop" :bgColor="'bg-gradual-'+themeColor.name" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">{{$t('my.changepassword')}}</block>
		</cu-custom>
		<view class="cu-bar" :class="'bg-'+themeColor.name">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> {{$t('my.changepasswords')}}
			</view>
		</view>
		<view class="padding-sm">
			<form>
				<view class="cu-form-group margin-top">
					<view class="title">{{$t('my.oldpassword')}}</view>
					<input :placeholder="$t('my.oldpasswordtxt')" v-model="oldps" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">{{$t('my.newpassword')}}</view>
					<input :placeholder="$t('my.newpasswordtxt')" v-model="newps1" type="password" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">{{$t('my.newpassword2')}}</view>
					<input :placeholder="$t('my.newpassword2txt')" v-model="newps2" type="password" name="input"></input>
				</view>
				<view v-if="errortext!=''" class="cu-form-group justify-center">
					<view class="text-red">{{errortext}}</view>
				</view>
				<button class="cu-btn block bg-blue margin-tb-sm lg" type="" :disabled="ischange?true:false" @tap="tijiaomima()">
					<text v-if="ischange" class="cuIcon-loading2 cuIconfont-spin"></text>{{change}}</button>
			</form>
		</view>
		<view class="cu-bar" :class="'bg-'+themeColor.name">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> {{$t('my.smsreset')}}
			</view>
		</view>
		<view class="padding-sm">
			<view class="solid-bottom text-sm padding"><text class="text-grey"><span>{{$t('my.smsresettxt')}}</span></text></view>
		</view>
		<view class="cu-bar" :class="'bg-'+themeColor.name">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> {{$t('my.bandgoogleauth')}}
			</view>
			<view class="action">
				<button class="cu-btn bg-cyan shadow" @tap="bdgoogle">{{$t('my.tap')}}{{bangding}}</button>
			</view>
		</view>
		<view class="padding-sm">
			<view class="solid-bottom text-sm padding"><text class="text-grey"><span>{{zhuangtai}}</span></text></view>
		</view>
		<view class="cu-bar" :class="'bg-'+themeColor.name">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> {{$t('my.bandother')}}
			</view>
		</view>
		<view class="action" v-if="platform==2">
			<button v-if="google==0" class="cu-btn bg-green shadow margin" @tap="googlelogin"><image class="google" src="../../static/img/google.svg"></image>{{$t('my.bandgoogle')}}</button>
			<button v-else class="cu-btn bg-green shadow margin btn22" @tap="googlelogin"><image class="google" src="../../static/img/google.svg"></image>{{$t('my.bandgoogle2')}}：<br>{{mail}}</button>
		</view>
		<view class="action" v-if="platform==1">
			<button v-if="apple==0" class="cu-btn bg-black shadow margin" @tap="applelogin"><image class="google" src="../../static/img/Apple_logo_grey.svg"></image>{{$t('my.bandapple')}}</button>
			<button v-else class="cu-btn bg-black shadow margin btn22" @tap="applelogin"><image class="google" src="../../static/img/Apple_logo_grey.svg"></image>{{$t('my.bandapple2')}}</button>
		</view>
		<view class="cu-modal" :class="modalName=='bdgoogle'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">{{bangding}}Google{{$t('my.eauth')}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" v-if="lingpai">
					{{$t('my.bandgoogletxt')}}
				</view>
				<view class="padding-xl" v-else>
					{{$t('my.bandgoogletxt2')}}
					<view class="flex-sub text-center">
						<view class="solid-bottom text-xl padding">
							<text class="text-black text-bold">{{secrettext}}</text>
						</view>
					</view>
					<view class="action">
						<button class="cu-btn bg-gradual-red margin-left" @tap="copy()">{{$t('my.copykey')}}</button>
					</view>
					<view class="action">
						<button class="cu-btn bg-green margin-left margin-top-sm" @tap="togoogle()">{{$t('my.downgoogle')}}</button>
					</view>
				</view>
				<view class="cu-form-group margin-bottom">
					<view class="title">{{$t('my.verifycode')}}</view>
					<input :placeholder="$t('my.verifycode6')" v-model="lppass" type="number" name="input"></input>
				</view>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="action">
						<button :disabled="lpyz?true:false" class="cu-btn bg-green margin-left" @tap="googleauth()"><text v-if="lpyz" class="cuIcon-loading2 cuIconfont-spin"></text>{{$t('api.ok')}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	const plug=uni.requireNativePlugin("html5app-googlelogin");
	// #endif
	export default {
		data() {
			return {
				animation:'',
				change: this.$t('my.changepassword'),
				ischange: false,
				modalName: null,
				lingpai: false,
				zhuangtai: this.$t('my.loadingstate'),
				bangding: this.$t('my.band'),
				errortext: '',
				secrettext: '',
				mail: '',
				amail: '',
				erweima: '../../static/img/loading2.gif',
				oldps:'',
				newps1:'',
				newps2:'',
				lppass:'',
				lpyz: false,
				platform: 0,
				google: 0,
				apple: 0,
				toggleDelay: false

			};
		},
		methods: {
			Toggle(e) {
				var anmiaton = e.currentTarget.dataset.class;
				this.animation= anmiaton;
				setTimeout(()=>{
					this.animation= '';
				}, 1000)
			},
			ToggleDelay() {
				this.toggleDelay= true;
				setTimeout(()=>{
					this.toggleDelay= false
				}, 1000)
			},
			bdgoogle(){
				let that = this;
				this.modalName = 'bdgoogle';
				if(!this.lingpai){
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:changepassword', //获取置顶帖子
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							type: 2
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							if (res.data.code == 203) {//未开启
								that.erweima = res.data.img;
								that.secrettext = res.data.secret;
							} else {
								that.modalName = null;
								that.errortext = '获取二维码失败';
							}
						}
					});
				}
			},
			copy(){
				let that = this;
				uni.setClipboardData({
				    data: that.secrettext,
				    success: function () {
				        console.log('success');
				    }
				});
			},
			googleauth(){
				let that = this;
				this.lpyz = true;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:changepassword', //获取置顶帖子
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							type: 2,
							yanzhengma: that.lppass
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							that.lpyz = false;
							if (res.data.code == 207) {//未开启
								that.modalName = null;
								if(!this.lingpai){
									uni.showToast({
										title: that.$t('my.bandde'),
										duration: 1000
									});
								}else{
									uni.showToast({
										title: that.$t('my.bandf'),
										duration: 1000
									});
								}
							} else {
								that.modalName = null;
								uni.showToast({
									title: res.data.text,
									icon: 'none',
									duration: 1000
								});
							}
						}
					});
			},
			hideModal(){
				this.modalName = null;
			},
			savegoogle(e,f,g,h,i){
				let that = this;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:changepassword', //获取置顶帖子
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							type: 3,
							googletoken: e,
							email:f,
							userid:g,
							name:h,
							avatar:i
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							that.lpyz = false;
							if (res.data.code == 213) {//未开启
									that.google = 1;
									uni.showToast({
										title: that.$t('my.bandde'),
										duration: 1000
									});
							}else{
									uni.showToast({
										title: res.data.text,
										icon: 'none',
										duration: 1000
									});
							}
						}
					});
			},
			saveapple(e,f,g){
				let that = this;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:changepassword', //获取置顶帖子
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							type: 7,
							email: e,
							openid:f,
							name:g
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							that.lpyz = false;
							if (res.data.code == 213) {//未开启
									that.apple = 1;
									uni.showToast({
										title: that.$t('my.bandde'),
										duration: 1000
									});
							}else{
									uni.showToast({
										title: res.data.text,
										icon: 'none',
										duration: 1000
									});
							}
						}
					});
			},
			googlelogin(){
				let that = this;
				// #ifdef APP-PLUS
				plug.login({
				clientId:"251594858132-p7jkqgcrecp1g5tntavknq1mhjlft9h0.apps.googleusercontent.com"
				},function(e){
					console.log(e);
					that.savegoogle(e.token,e.email,e.userId,e.displayName,e.userAvatar);
				});
				// #endif
			},
			applelogin(){
				let that = this;
				// #ifdef APP-PLUS
				uni.login({  
				    provider: 'apple',  
				    success: function (loginRes) {  
				        // 登录成功  
				        uni.getUserInfo({  
				            provider: 'apple',  
							success: function (infoRes) {
								console.log(infoRes);
								that.saveapple(infoRes.userInfo.email,infoRes.userInfo.openId,infoRes.userInfo.fullName.familyName+infoRes.userInfo.fullName.giveName+infoRes.userInfo.fullName.givenName);
								that.amail = infoRes.userInfo.email;
							} 
				        })  
				    },  
				    fail: function (err) {  
				        // 登录失败  
				    }  
				});  
				// #endif
			},
			togoogle(){
				if (this.platform == 2) {
					let appurl = "market://details?id=com.google.android.apps.authenticator2"; //这个是通用应用市场，如果想指定某个应用商店，需要单独查这个应用商店的包名或scheme及参数
					plus.runtime.openURL(appurl);
				}else {
					let appleId=388497605 //app的appleId
					plus.runtime.launchApplication({
					  action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
					}, function(e) {
					  console.log('Open system default browser failed: ' + e.message);
					});
				}
			},
			tijiaomima() {
				if(this.newps1.length<8){
					this.errortext = this.$t('my.error1');
					return;
				}
				if(this.newps1!=this.newps2){
					this.errortext = this.$t('my.error2');
					return;
				}
				this.ischange=true;
				let that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:changepassword', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						type: 1,
						password: that.oldps,
						newpassword : that.newps1
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {//未开启
							that.change = that.$t('my.changed');
							that.errortext = '';
						} else {
							that.errortext = that.$t('my.error3');
						}
						that.ischange=false;
					}
				});
			},
			imgMap(url) {
				uni.previewImage({
					urls: [url], //这里一定是数组，不然就报错
				});
			},
			loadgooglesf() {
				let that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:changepassword', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						type: 0
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						that.google = res.data.google;
						that.mail = res.data.mail;
						that.apple = res.data.apple;
						that.amail = res.data.amail;
						if (res.data.code == 201) {//未开启
							that.zhuangtai = that.$t('my.bandtxt1');
							that.bangding = that.$t('my.band');
							that.lingpai = false;
						} else if(res.data.code == 202) {//未开启
							that.zhuangtai = that.$t('my.bandtxt2');
							that.bangding = that.$t('my.unband');
							that.lingpai = true;
						} else {
							that.zhuangtai = that.$t('my.bandtxt1');
							that.bangding = that.$t('my.band');
							that.lingpai = false;
						}
					}
				});
			},
		},
		onLoad: function(option) { 
			this.loadgooglesf();
			if (uni.getSystemInfoSync().platform == 'ios') {
				this.platform = 1;
			} else {
				this.platform = 2;
			}
		},
	}
</script>

<style>
	.cu-bar{
		border: 2upx dashed #6c6c6c;
	}
	.cu-form-group.margin-bottom{
		border: 2upx dashed #55aa7f;
	}
	.text-black.text-bold{
		border: 2upx dashed #ff0000;
	}
	.google{
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}
	.btn22{
		height: 80upx!important;
	}
</style>