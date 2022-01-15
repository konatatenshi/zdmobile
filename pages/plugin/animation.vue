<template>
	<view :class="'bg-white bc-'+themeColor.name">
		<cu-custom class="statustop" :bgColor="'bg-gradual-'+themeColor.name" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">修改密码</block>
		</cu-custom>
		<view class="cu-bar" :class="'bg-'+themeColor.name">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 通过旧密码重置密码
			</view>
		</view>
		<view class="padding-sm">
			<form>
				<view class="cu-form-group margin-top">
					<view class="title">旧密码</view>
					<input placeholder="请输入原始密码" v-model="oldps" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">新密码</view>
					<input placeholder="请输入你修改后的密码(≥8位)" v-model="newps1" type="password" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">再确认</view>
					<input placeholder="请再次输入你修改后的密码" v-model="newps2" type="password" name="input"></input>
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
				<text class="cuIcon-title text-orange"></text> 通过短信重置密码
			</view>
		</view>
		<view class="padding-sm">
			<view class="solid-bottom text-sm padding"><text class="text-grey"><span>你需要先在个人界面登出此账号，然后点击登录，然后点击通过短信重置密码即可重置。</span></text></view>
		</view>
		<view class="cu-bar" :class="'bg-'+themeColor.name">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 绑定Google身份验证器
			</view>
			<view class="action">
				<button class="cu-btn bg-cyan shadow" @tap="bdgoogle">点击{{bangding}}</button>
			</view>
		</view>
		<view class="padding-sm">
			<view class="solid-bottom text-sm padding"><text class="text-grey"><span>{{zhuangtai}}</span></text></view>
		</view>
		<view class="cu-bar" :class="'bg-'+themeColor.name">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 绑定其他登录工具
			</view>
		</view>
		<view class="action" v-if="platform==2">
			<button v-if="google==0" class="cu-btn bg-green shadow margin" @tap="googlelogin"><image class="google" src="../../static/img/google.svg"></image>点击绑定Google登录</button>
			<button v-else class="cu-btn bg-green shadow margin btn22" @tap="googlelogin"><image class="google" src="../../static/img/google.svg"></image>Google绑定邮箱(点击解绑)：<br>{{mail}}</button>
		</view>
		<view class="cu-modal" :class="modalName=='bdgoogle'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">{{bangding}}Google身份令牌</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" v-if="lingpai">
					你已绑定Google身份令牌，请输入验证码以解除绑定。如果丢失了令牌，请通过手机短信更改密码即可解绑。
				</view>
				<view class="padding-xl" v-else>
					请使用Google身份验证器来复制下面的密钥（用户名随意）来添加身份令牌。
					<view class="flex-sub text-center">
						<view class="solid-bottom text-xl padding">
							<text class="text-black text-bold">{{secrettext}}</text>
						</view>
					</view>
					<view class="action">
						<button class="cu-btn bg-gradual-red margin-left" @tap="copy()">复制令牌密钥</button>
					</view>
					<view class="action">
						<button class="cu-btn bg-green margin-left margin-top-sm" @tap="togoogle()">去商店下载Google身份验证器</button>
					</view>
				</view>
				<view class="cu-form-group margin-bottom">
					<view class="title">输入验证码</view>
					<input placeholder="请输入Google令牌6位数" v-model="lppass" type="number" name="input"></input>
				</view>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="action">
						<button :disabled="lpyz?true:false" class="cu-btn bg-green margin-left" @tap="googleauth()"><text v-if="lpyz" class="cuIcon-loading2 cuIconfont-spin"></text>确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	const LoginGoogle = uni.requireNativePlugin('gui-google_login');
	// #endif
	export default {
		data() {
			return {
				animation:'',
				change: '更改密码',
				ischange: false,
				modalName: null,
				lingpai: false,
				zhuangtai: '载入状态中……',
				bangding: '绑定',
				errortext: '',
				secrettext: '',
				mail: '',
				erweima: '../../static/img/loading2.gif',
				oldps:'',
				newps1:'',
				newps2:'',
				lppass:'',
				lpyz: false,
				platform: 0,
				google: 0,
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
										title: '绑定成功',
										duration: 1000
									});
								}else{
									uni.showToast({
										title: '解绑成功',
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
										title: '绑定成功',
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
				LoginGoogle.handleLogin(
					{
						clientId: '251594858132-p7jkqgcrecp1g5tntavknq1mhjlft9h0.apps.googleusercontent.com'
					},ret =>{
						if(ret && ret.code==200){
							console.log('===========================');
							console.log('=====登录成功result: ',ret);
							console.log('===========================');
							that.savegoogle(ret.token,ret.email,ret.userId,ret.displayName,ret.userAvatar);
							that.mail = ret.email;
						}else{
							console.log('===========================');
							console.log('=====登录失败result: ',ret);
							console.log('===========================');
						}
					}
				);
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
					this.errortext = '新密码必须大于8位，请再次输入。';
					return;
				}
				if(this.newps1!=this.newps2){
					this.errortext = '两次密码不相同，请再次确认。';
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
							that.change = '更改成功。';
							that.errortext = '';
						} else {
							that.errortext = '修改密码失败，旧密码输入错误。';
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
						if (res.data.code == 201) {//未开启
							that.zhuangtai = '你还未绑定Google身份验证器，请点击绑定按钮绑定一个吧。';
							that.bangding = '绑定';
							that.lingpai = false;
						} else if(res.data.code == 202) {//未开启
							that.zhuangtai = '你已绑定Google身份验证器。点击解绑按钮即可解绑。';
							that.bangding = '解绑';
							that.lingpai = true;
						} else {
							that.zhuangtai = '你还未绑定Google身份验证器，请点击绑定按钮绑定一个吧。';
							that.bangding = '绑定';
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