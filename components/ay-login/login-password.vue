<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<view class="flex flex-wrap justify-center">
			<view class="basis-xl padding-top radius shadow-blur bg-red margin-top bg-img"
				style="background-image:url(../../static/loginlogo_e.jpg); height: 35vw;"></view>
		</view>
		<view class="login-img">
			<view class="owl-login" :class="hideEyes?'password':''">
				<view class="hand"></view>
				<view class="hand hand-r"></view>
				<view class="arms">
					<view class="arm"></view>
					<view class="arm arm-r"></view>
				</view>
			</view>
		</view>
		<view class="login-form">
			<form @submit="formSubmit">
				<view class="form-input">
					<input type="text" name="text" value="" placeholder="用户名/手机号" />
				</view>
				<view class="form-input">
					<input type="password" name="password" value="" placeholder="密码" @focus="passwordF_B"
						@blur="passwordF_B" />
				</view>
				<view class="form-input" style="display: none;">
					<input type="text" name="questionid" :value="index" placeholder="安全问题" />
				</view>
				<view class="form-input" style="display: none;">
					<input type="text" name="answer" :value="yanzhengput" placeholder="安全回答" />
				</view>
				<view class="form-input" style="display: none;">
					<input type="text" name="authcode" :value="authcode" placeholder="验证码" />
				</view>
				<view class="flex">
					<button :disabled="formsub2?true:false" class="flex-sub cu-btn line-cyan lg shadow"
						@click="register"><text
							:class="formsub2?'cuIcon-loading2 cuIconfont-spin':''"></text>注册</button>
					<button :disabled="formsub&&type==0?true:false" class="flex-sub cu-btn bg-blue lg shadow"
						form-type="submit"><text
							:class="formsub&&type==0?'cuIcon-loading2 cuIconfont-spin':''"></text>登录</button>
				</view>
				<view class="padding-top">
					<button class="grid text-center col-1 cu-btn line-green lg shadow"
						@click="visitor"></text>游客浏览</button>
				</view>
				<view class="padding-top" v-if="platform==2">
					<button :disabled="formsub&&type==1?true:false" class="grid text-center cu-btn bg-green shadow" @tap="googlelogin"><text
							:class="formsub&&type==1?'cuIcon-loading2 cuIconfont-spin':''"></text><image class="google" src="../../static/img/google.svg"></image>点击通过Google登录</button>
				</view>
			</form>
		</view>
		<view class="cu-modal" :class="modalName=='loginerror'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar bg-white justify-end">
					<view class="content">注册登录错误</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					错误原因：{{error.reason}}<br />
					错误ID：{{error.reasoncode}}。
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='yanzhenghuida'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">补充：请完善验证问题及答案</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group margin-top">
						<view class="title">验证问题</view>
						<picker @change="questionchange" :value="index" :range="picker">
							<view class="picker">
								{{index>0?picker[index]:'请选择安全提问'}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">验证回答</view>
						<input placeholder="请输入验证回答" name="input" :value="yanzhengput" @input="changeanswer"></input>
					</view>
					<view class="padding flex flex-direction">
						<button class="cu-btn bg-blue" @tap="hideModal">点此关闭窗口并重新点击登录框</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='yanzhengcode'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">Google身份验证器</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group">
						<view class="title">验证码</view>
						<input type="number" placeholder="请输入6位数验证码" name="input" :value="authcode" @input="changeauth"></input>
					</view>
					<view class="text-gray text-sm"><text class="cuIcon-infofill margin-right-xs"></text>帮助：你的账号已开启Google身份验证，请输入Google身份验证器里的6位验证码登录。如不小心遗忘了验证器，请点击手机重置密码即可。</view>
					<view class="padding flex flex-direction">
						<button class="cu-btn bg-blue" @tap="hideModal">点此关闭窗口并重新点击登录框</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='chongzhimima'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请输入手机号及新密码</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding">
					<view class="cu-form-group">
						<view class="title">手机号</view>
						<input type="tel" placeholder="请输入手机号" name="mobilenum" v-model="phonenumber" value=""
							@input="changephonenumber"></input>
						<picker class="shoujiquma" @change="Pickcountry" :value="addressData.countryid"
							:range="countryList">
							<view class="cu-capsule radius">
								<view class='cu-tag bg-blue '>
									+{{addressData.countrycode}}
								</view>
								<view class="cu-tag line-blue">
									{{countryList[addressData.countryid]}}
								</view>
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">验证码</view>
						<input type="number" placeholder="输入验证码" name="yanzhengma" maxlength="6" v-model="yanzhengma"
							value="" @input="shuruyanzhengma"></input>
						<button class='cu-btn bg-green shadow' @click="yzm" :disabled="codeFlag?false:true"
							:class="{activeCode:codeFlag}"><text
								:class="formsub3?'cuIcon-loading2 cuIconfont-spin':''"></text>{{codeTxt}}</button>
					</view>
					<xlg-slideCode :session_id="session_id" v-if="slideCode_show" @close="slideCode_show = false"
						@success="slideCode_success"></xlg-slideCode>
					<view class="cu-form-group">
						<view class="title">设置新密码</view>
						<input placeholder="请输入新密码" type="password" name="newpasswd" v-model="newpasswd" value=""
							@input="shezhinewpass"></input>
					</view>
					<view class="padding flex flex-direction">
						<button class="cu-btn bg-blue" @tap="verifycode" :disabled="yzFlag?false:true"><text
								:class="formsub4?'cuIcon-loading2 cuIconfont-spin':''"></text>验证并重置</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='yzcg'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改密码成功</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您已成功修改密码，新密码是：<br /><text class="text-black text-bold">{{displaynewpass}}</text>。
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>

					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal displaygoogle" :class="modalName=='displaygoogle'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar bg-white justify-end">
					<view class="content">注册新账号</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-avatar xl round margin-left" :style="'background-image:url(' + useravatar + ');'"></view>
					<view class="cu-form-group margin-top">
						<view class="title">用户名</view>
						<input placeholder="请输入用户名" v-model="displayname" type="text" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">密码</view>
						<input placeholder="请输入你的密码(≥8位)" v-model="passwords" type="password" name="input"></input>
					</view>
					
						<view class="cu-form-group">
							<view class="title">手机号</view>
							<input type="tel" placeholder="请输入手机号" name="mobilenum" v-model="phonenumber" value=""
								@input="changephonenumber"></input>
							<picker class="shoujiquma" @change="Pickcountry" :value="addressData.countryid"
								:range="countryList">
								<view class="cu-capsule radius">
									<view class='cu-tag bg-blue '>
										+{{addressData.countrycode}}
									</view>
									<view class="cu-tag line-blue">
										{{countryList[addressData.countryid]}}
									</view>
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">验证码</view>
							<input type="number" placeholder="输入验证码" name="yanzhengma" maxlength="6" v-model="yanzhengma"
								value="" @input="shuruyanzhengma"></input>
							<button class='cu-btn bg-green shadow' @click="yzm" :disabled="codeFlag?false:true"
								:class="{activeCode:codeFlag}"><text
									:class="formsub3?'cuIcon-loading2 cuIconfont-spin':''"></text>{{codeTxt}}</button>
						</view>
						<xlg-slideCode :session_id="session_id" v-if="slideCode_show" @close="slideCode_show = false"
							@success="slideCode_success"></xlg-slideCode>
						<view v-if="errortext!=''" class="cu-form-group justify-center">
							<view class="text-red">{{errortext}}</view>
						</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="registnew">确定</button>
						<button class="cu-btn bg-gray margin-left" @tap="hideModal">取消</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-load load-modal" v-if="loadModal">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="../../static/img/loadzd.gif" style="border-radius: 50%;" mode="aspectFit"></image>
			<view class="gray-text">登录中...</view>
		</view>
		<view class="flex padding-top padding-left padding-right justify-between foot">
			<checkbox-group class="block" @change="CheckboxChange">
				<view class="cu-form-group">
					<checkbox :class="checked?'checked':''" :checked="checked?true:false" value="A"></checkbox>
					<view class="title2">我已认真阅读并同意<a href="#" @tap="about">《用户服务协议》</a>及<a href="#2" @tap="private">《隐私政策》</a>全部条款。</view>
				</view>
			</checkbox-group>
		</view>
		<view class="flex padding-left justify-between foot">
			<view class="padding-sm margin-xs radius" @tap="resetpass">手机重置密码</view>
			<!-- <view class="padding-sm margin-xs radius" @tap="qqlogin">QQ登录(外部跳转)</view> -->
		</view>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	const LoginGoogle = uni.requireNativePlugin('gui-google_login');
	// #endif
	import Vue from 'vue'
	import {
		captchaCreater,
		describeCaptchaResult
	} from '@/js_sdk/tencentcloud-plugin-captcha';
	import AES from '../../js_sdk/ar-aes/ar-aes.js';
	import w_md5 from "../../js_sdk/zww-md5/w_md5.js"
	export default {
		data() {
			return {
				index: 0,
				checked: false,
				yanzhengput: '',
				errortext: '',
				displaynewpass: '',
				passwords: '',
				countryList: [],
				countryListId: [],
				addressData: {
					countryid: 0,
					countryName: "中国",
					countrycode: 86,
				},
				picker: ['安全提问(未设置请忽略)', '母亲的名字', '爷爷的名字', '父亲出生的城市', '您其中一位老师的名字', '您个人计算机的型号', '您最喜欢的餐馆名称',
					'驾驶执照最后四位数字'
				],
				hideEyes: false,
				formsub: false,
				formsub2: false,
				formsub3: false,
				formsub4: false,
				loadModal: false,
				phonenumber: '',
				yanzhengma: '',
				platform: 2,
				version: '',
				ticketnew: '',
				randstrnew: '',
				newpasswd: '',
				codeTxt: '获取验证码',
				codeFlag: true, // 控制按钮是否可点击
				yzFlag: true,
				result: {},
				type: 0,
				checkResult: {},
				modalName: '',
				error: Array,
				authcode: '',
				mail: '',
				googletoken: '',
				userid: '',
				displayname: '用户名读取失败',
				useravatar: '',
				slideCode_show: false, //图形验证码是否显示
				slideCode_yanzheng: false, //图形验证码是否验证通过
				slideCode_x: 10, //图形验证码的水平偏移值
				session_id: Math.floor(Math.random() *9999999999) //这里有人可能会好奇，为什么会自己定义一个session的Id，php的session不是会自己生成id，然后通过cookie的方式进行传递吗？   答案就是：很多小程序在网络访问时是不支持传递cookie的。所以这里就实现通过get方式进行传递
			}
		},
		mounted() {
			this.getJob();
			var that = this;
			plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
				that.version = wgtinfo.version;
				console.log('version：' + that.version);
			});
			if (uni.getSystemInfoSync().platform == 'ios') {
				this.platform = 1;
			} else {
				this.platform = 2;
			}
		},
		methods: {
			async showCaptcha() {
				if (this.phonenumber == '') {
					this.error.reasoncode = 'error0200';
					this.modalName = 'loginerror';
					this.error.reason = '你还未输入手机号';
					return;
				}
				if (this.codeFlag == false) {
					return
				}
				if (!(/^1[3456789]\d{9}$/.test(this.phonenumber)) && this.addressData.countrycode == 86) {
					this.error.reasoncode = 'error0201';
					this.modalName = 'loginerror';
					this.error.reason = '你输入的手机号错误';
					return;
				}
				try {
					uni.showLoading({
						mask: true
					});
					this.codeFlag = false;
					// 创建验证码实例
					const captcha = await captchaCreater((res) => {
						this.result = res;
					});
					// 显示验证码
					captcha.show();
					uni.hideLoading();
				} catch (error) {
					throw new Error(error);
				}
			},
			yzm: function() {
				if (this.phonenumber == '') {
					this.error.reasoncode = 'error0200';
					this.modalName = 'loginerror';
					this.error.reason = '你还未输入手机号';
					return;
				}
				if (this.codeFlag == false) {
					return
				}
				if (!(/^1[3456789]\d{9}$/.test(this.phonenumber)) && this.addressData.countrycode == 86) {
					this.error.reasoncode = 'error0201';
					this.modalName = 'loginerror';
					this.error.reason = '你输入的手机号错误';
					return;
				}
				if (this.slideCode_yanzheng === true) { //图形滑块是否验证通过
					//这里你就可以自由的发送验证码了【下方代码仅做参考】
					console.log(this.addressData.countrycode);
					console.log(this.phonenumber);
					console.log(this.session_id);
					console.log(this.slideCode_x);
					uni.request({
						method: 'get',
						dataType: 'json',
						url: getApp().globalData.zddomain + 'plugin.php?id=tencentcloud_center:sendsms',
						data: {
							gh: this.addressData.countrycode,
							phone: this.phonenumber,
							session_id: this.session_id,
							type: this.type,
							x: this.slideCode_x
						},
						success: (res) => {
							console.log(res.data);
							if (res.data.code == 2001) { //发送成功
								this.formsub3 = false;
								let time = 60
								this.codeTxt = '重新获取' + time
								let timer = setInterval(() => {
									this.codeTxt = '获取验证码'
									if (time == 1) {
										this.codeFlag = true;
										clearInterval(timer)
									} else {
										time--
										this.codeTxt = '重新获取' + time
									}

								}, 1000)
							} else if (res.data.code == 2007) {
								this.slideCode_yanzheng = false
								this.error.reasoncode = 'error0203';
								this.modalName = 'loginerror';
								this.error.reason = '号码错误，请重新输入';
								this.formsub3 = false;
								this.codeFlag = true;
								this.phonenumber = '';
								this.yanzhengma = '';
								this.newpasswd = ''
							} else if (res.data.code == 404) {
								this.slideCode_yanzheng = false
								this.error.reasoncode = 'error0204';
								this.modalName = 'loginerror';
								if(this.type==0){
									this.error.reason = '号码不存在，无法找回';
								}else{
									this.error.reason = '号码已存在，无法注册';
								}
								this.formsub3 = false;
								this.codeFlag = true;
								this.phonenumber = '';
								this.yanzhengma = '';
								this.newpasswd = ''
							} else if (res.data.code == 401) {
								this.slideCode_yanzheng = false
								this.error.reasoncode = 'error0205';
								this.modalName = 'loginerror';
								this.error.reason = '号码违规，请重新输入';
								this.formsub3 = false;
								this.codeFlag = true;
								this.phonenumber = '';
								this.yanzhengma = '';
								this.newpasswd = ''
							} else if (res.data.code == 403) {
								this.slideCode_yanzheng = false
								this.error.reasoncode = 'error0206';
								this.modalName = 'loginerror';
								this.error.reason = '你已经在1个月内修改过密码超过3次，请稍后再修改';
								this.formsub3 = false;
								this.codeFlag = true;
								this.phonenumber = '';
								this.yanzhengma = '';
								this.newpasswd = ''
							} else { //发送失败
								if (res.data.msg ===
									'请先生成图形验证码') { //大概率就是生成一次验证码了，所以前一次图形验证码就失效了【所以重新再进行图片滑块验证】
									this.slideCode_yanzheng = false
									this.error.reasoncode = 'error0207';
									this.modalName = 'loginerror';
									this.error.reason = res.data.msg;
									this.formsub3 = false;
									this.codeFlag = true;
									this.phonenumber = '';
									this.yanzhengma = '';
									this.newpasswd = ''
								}else{
									this.slideCode_yanzheng = false
									this.error.reasoncode = 'error0208';
									this.modalName = 'loginerror';
									this.error.reason = res.data.msg;
									this.formsub3 = false;
									this.codeFlag = true;
									this.phonenumber = '';
									this.yanzhengma = '';
									this.newpasswd = ''
								}
							}
						}
					});
				} else { //到这里说明没有验证或者没有验证通过。调起“图片滑块验证码”
					this.slideCode_show = true
				}
			},
			slideCode_success: function(x) { //验证通过了
				this.slideCode_yanzheng = true //验证通过
				this.slideCode_x = x //偏移值
				this.yzm() //获取验证码
			},
			getJob() {
				let countrydata = require('../../json/countrycode.json')
				this.countryListId = countrydata;
				this.countryList = countrydata.map(a => a.cn);

				//console.log(this.countryList);
			},
			CheckboxChange(e) {
				this.checked= !this.checked;
			},
			about(){
				uni.navigateTo({
					url: '../../pages/basics/tag?id=1'
				})
			},
			private(){
				uni.navigateTo({
					url: '../../pages/basics/tag'
				})
			},
			Pickcountry(e) {
				//console.log(e.detail.value)
				this.addressData.countryid = e.detail.value
				this.addressData.countryName = this.countryListId[e.detail.value].cn
				this.addressData.countrycode = this.countryListId[e.detail.value].phone_code
			},
			questionchange(e) {
				this.index = e.detail.value
			},
			visitor(e) {
				var that = this;
				uni.removeStorage({
					key: 'userlogininfo',
					success: function(res) {
						that.$emit("returnDat", "login") //传递的值
					}
				});
				this.$emit("returnDat", "basics") //传递的值
				uni.redirectTo({
					url: '../../pages/index/index',
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			changeanswer(e) {
				this.yanzhengput = e.detail.value
			},
			changeauth(e) {
				this.authcode = e.detail.value
			},
			changephonenumber(e) {
				this.phonenumber = e.detail.value
			},
			shuruyanzhengma(e) {
				this.yanzhengma = e.detail.value
			},
			shezhinewpass(e) {
				this.newpasswd = e.detail.value;
				if (this.randstrnew != '' && this.newpasswd != '') {
					this.yzFlag = true;
				}
			},
			hideModal(e) {
				this.modalName = null
			},
			resetpass(e) {
				this.modalName = 'chongzhimima';
				this.yanzhengput = '';
				this.phonenumber = '';
				this.yanzhengma = ''
			},
			LoadModal(e) {
				this.loadModal = true;
				setTimeout(() => {
					this.loadModal = false;
				}, 2000)
			},
			passwordF_B() {
				this.hideEyes = !this.hideEyes;
			},
			qqlogin() {
				this.modalName = 'loginerror';
				this.error.reason = 'QQ登录因故暂不可用，可去网页版登录后修改密码后再登录';
				this.error.reasoncode = 0;
			},
			formSubmit(e) {
				let that = this;
				if(!this.checked){
					this.error.reasoncode = 'error0300';
					this.modalName = 'loginerror';
					this.error.reason = '请阅读并同意用户协议及隐私政策后方可继续';
					this.formsub2 = false;
					return;
				}
				const signature = plus.navigator.getSignature();
				const signe = AES.AES.encrypt(signature,w_md5.hex_md5_16(this.version),w_md5.hex_md5_16(e.detail.value.text));
				this.formsub = true;
				console.log('version：' + this.version);
				console.log('signe：' + signe);
				let status = -1;
				this.LoadModal(e);
				uni.request({
					url: getApp().globalData.zddomain +
						'plugin.php?id=ts2t_qqavatar:login', //仅为示例，并非真实接口地址。
					method: 'GET',
					timeout: 10000,
					data: {
						key: getApp().globalData.zdserverkey,
						action: 'login_user',
						username: e.detail.value.text,
						password: e.detail.value.password,
						questionid: e.detail.value.questionid,
						answer: e.detail.value.answer,
						authcode: e.detail.value.authcode,
						sign : signe,
						version: this.version
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							let status = res.data.status;
						}
						if (res.data.code == 400) {
							this.error.reasoncode = res.data.result;
							this.loadModal = false;
							if (res.data.result == 'error0100') {
								this.modalName = 'loginerror';
								this.error.reason = '登录太频繁，请稍后再试';
							} else if (res.data.result == 'error0011') {
								this.modalName = 'loginerror';
								this.error.reason = '您输入的用户登陆名不存在';
							} else if (res.data.result == 'error00112') {
								this.modalName = 'loginerror';
								this.error.reason = '您输入的用户名不存在';
							} else if (res.data.result == 'error0012') {
								this.modalName = 'loginerror';
								this.error.reason = '您输入的密码错误';
							} else if (res.data.result == 'error0013') {
								this.error.reason = '验证问题错误';
								this.modalName = 'yanzhenghuida';
							} else if (res.data.result == 'error016') {
								this.error.reason = '服务过期';
								this.modalName = 'loginerror';
							} else if (res.data.result == 'error06:username') {
								this.error.reason = '您还未输入用户名';
								this.modalName = 'loginerror';
							} else if (res.data.result == 'error01004') {
								this.error.reason = '因验证失败次数过多，用户已锁定，请通过手机找回密码解锁';
								this.modalName = 'loginerror';
							} else if (res.data.result == 'error01005') {
								this.error.reason = '验证码错误，请输入验证码以继续';
								this.modalName = 'yanzhengcode';
							} else if (res.data.result == 'error01006') {
								this.error.reason = '安全锁定：您需要手机重置密码才可以继续登录。';
								this.modalName = 'loginerror';
							} else {
								this.error.reason = res.data.reason;
								this.modalName = 'loginerror';
							}
							this.formsub = false;
							console.log(this.modalName);
						} else if (status == 1) {
							this.error.reason = '您的账号被禁止登入';
							this.modalName = 'loginerror';
							this.error.reasoncode = 'error0102';
						} else if (res.data.code == 200) {
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
						}
					},
					fail: (res) => {
						console.log(res.data);
					}
				});
			},
			register(e) {
				if(!this.checked){
					this.error.reasoncode = 'error0300';
					this.modalName = 'loginerror';
					this.error.reason = '请阅读并同意用户协议及隐私政策后方可继续';
					this.formsub2 = false;
					return;
				}
				this.formsub2 = true;
				uni.getStorage({
					key: 'userlogininfo',
					success: function(res) {
						console.log(res.data);
					}
				});
				uni.removeStorage({
					key: 'userlogininfo',
					success: function(res) {
						console.log('success');
					}
				});
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:canreg', //获取是否开放注册
					method: 'GET',
					timeout: 10000,
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.canreg == 0) {
							this.error.reasoncode = 'error0101';
							this.modalName = 'loginerror';
							this.error.reason = '论坛目前关闭注册，请稍后再试';
							this.formsub2 = false;
						}
						this.text = 'request success';
					},
					fail: (res) => {
						console.log(res.data);
					}
				});
			},
			registnew(e) {
				if(this.passwords.length<8){
					this.error.reasoncode = 'error0220';
					this.modalName = 'loginerror';
					this.error.reason = '密码需要大于8个字符';
					this.formsub2 = false;
					return;
				}
				let that = this;
				this.formsub2 = true;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:changepassword', //获取是否开放注册
					method: 'GET',
					timeout: 10000,
					data: {
						key: getApp().globalData.zdserverkey,
						type: 5,
						googletoken: that.googletoken,
						email:that.mail,
						userid:that.userid,
						name:that.displayname,
						avatar:that.useravatar,
						phone:that.phonenumber,
						yanzhengma:that.yanzhengma,
						password:that.passwords
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						console.log(res.data.code);
						if (res.data.code == 502) {
							this.error.reasoncode = 'error0217';
							this.modalName = 'loginerror';
							this.error.reason = '注册失败，可能关闭了注册。';
							this.formsub2 = false;
						}else if (res.data.code == 503) {
							this.error.reasoncode = 'error0218';
							this.modalName = 'loginerror';
							this.error.reason = '注册失败，验证码错误。';
							this.formsub2 = false;
						}else if (res.data.code == 504) {
							this.error.reasoncode = 'error0219';
							this.modalName = 'loginerror';
							this.error.reason = '注册失败，Google Token超时。请尝试重新登录';
							this.formsub2 = false;
						}else{
							that.formsub2 = false;
							that.modalName = null;
							uni.showToast({
								title: '注册成功',
								duration: 2000
							});
						}
						this.text = 'request success';
					},
					fail: (res) => {
						console.log(res.data);
					}
				});
			},
			savegoogle(e,f,g,h,i){
				this.type = 1;
				let that = this;
				const signature = plus.navigator.getSignature();
				const signe = AES.AES.encrypt(signature,w_md5.hex_md5_16(this.version),w_md5.hex_md5_16(f));
				that.formsub = true;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:changepassword', //获取置顶帖子
						method: 'GET',
						timeout: 10000,
						data: {
							key: getApp().globalData.zdserverkey,
							type: 4,
							googletoken: e,
							email:f,
							userid:g,
							name:h,
							avatar:i,
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
							}else if (res.data.code == 500) {
								this.error.reason = '此Google账号邮箱已注册，但未绑定账号。请登录账号前往密码安全绑定Google即可登录。';
								this.modalName = 'loginerror';
								this.error.reasoncode = 'error0209';
							}else if (res.data.code == 501) {
								this.googletoken = e;
								this.mail = f;
								this.userid = g;
								this.displayname = h.replace(/\s+/g, "");
								this.useravatar = i.replace(/https\/\//, "https://");
								this.modalName = 'displaygoogle';
								console.log(this.useravatar);
								console.log(this.mail);
								console.log(this.userid);
							}else{
								console.log('fail')
							}
						}
					});
			},
			savegoogle2(e,f,g,h,i){
				let that = this;
				const signature = plus.navigator.getSignature();
				const signe = AES.AES.encrypt(signature,w_md5.hex_md5_16(this.version),w_md5.hex_md5_16(e.detail.value.text));
				this.formsub = true;
				console.log('version：' + this.version);
				console.log('signe：' + signe);
				let status = -1;
				this.LoadModal(e);
				uni.request({
					url: getApp().globalData.zddomain +
						'plugin.php?id=ts2t_qqavatar:changepassword', //仅为示例，并非真实接口地址。
					method: 'GET',
					timeout: 10000,
					data: {
						type: 4,
						googletoken: e,
						email:f,
						userid:g,
						name:h,
						avatar:i,
						key: getApp().globalData.zdserverkey,
						sign : signe,
						version: that.version
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							let status = res.data.status;
						}
						if (res.data.code == 500) {
							this.error.reason = '您的邮箱已经注册，但您未绑定Google账号，请登录你的邮箱并绑定再尝试登录吧。';
							this.modalName = 'loginerror';
							this.error.reasoncode = 'error0208';
							this.formsub = false;
						} else if (res.data.code == 501) {
							this.modalName = 'zhucename';
						} else if (status == 1) {
							this.error.reason = '您的账号被禁止登入';
							this.modalName = 'loginerror';
							this.error.reasoncode = 'error0102';
						} else if (res.data.code == 200) {
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
						}
					},
					fail: (res) => {
						console.log(res.data);
					}
				});
			},
			googlelogin(){
				if(!this.checked){
					this.error.reasoncode = 'error0300';
					this.modalName = 'loginerror';
					this.error.reason = '请阅读并同意用户协议及隐私政策后方可继续';
					this.formsub2 = false;
					return;
				}
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
						}else{
							console.log('===========================');
							console.log('=====登录失败result: ',ret);
							console.log('===========================');
						}
					}
				);
				// #endif
			},
			verifycode(e) {
				this.formsub4 = true;
				this.yzFlag = false;
				if (this.newpasswd.length < 7) {
					this.error.reasoncode = 'error0214';
					this.modalName = 'loginerror';
					this.error.reason = '新密码少于7位，请重新输入';
					this.formsub4 = false;
					this.phonenumber = '';
					this.yanzhengma = '';
					this.newpasswd = '';
					this.yzFlag = true;
					return;
				}
				if (this.yanzhengma.length < 6) {
					this.error.reasoncode = 'error0215';
					this.modalName = 'loginerror';
					this.error.reason = '验证码少于6位，请重新输入';
					this.formsub4 = false;
					this.phonenumber = '';
					this.yanzhengma = '';
					this.newpasswd = '';
					this.yzFlag = true;
					return;
				}
				if (this.phonenumber.length < 8) {
					this.error.reasoncode = 'error0216';
					this.modalName = 'loginerror';
					this.error.reason = '手机号少于8位，请重新输入';
					this.formsub4 = false;
					this.phonenumber = '';
					this.yanzhengma = '';
					this.newpasswd = '';
					this.yzFlag = true;
					return;
				}
				uni.getStorage({
					key: 'userlogininfo',
					success: function(res) {
						console.log(res.data);
					}
				});
				uni.removeStorage({
					key: 'userlogininfo',
					success: function(res) {
						console.log('success');
					}
				});
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=tencentcloud_center:veryfysms', //获取是否开放注册
					method: 'GET',
					timeout: 10000,
					data: {
						ticket: this.slideCode_x,
						randstr: this.session_id,
						phone: this.phonenumber,
						newpassword: this.newpasswd,
						yzm: this.yanzhengma,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						console.log(this.session_id);
						console.log(this.slideCode_x);
						this.yzFlag = true;
						if (res.data.code == 200) {
							this.modalName = 'yzcg';
							this.displaynewpass = res.data.newpass;
							this.formsub4 = false;
							this.phonenumber = '';
							this.yanzhengma = '';
							this.newpasswd = ''
						} else if (res.data.code == 301) {
							this.error.reasoncode = 'error0211';
							this.modalName = 'loginerror';
							this.error.reason = '修改后的密码与修改前一样，密码无变动';
							this.formsub4 = false;
							this.phonenumber = '';
							this.yanzhengma = '';
							this.newpasswd = ''
						} else if (res.data.code == 403) {
							this.error.reasoncode = 'error0212';
							this.modalName = 'loginerror';
							this.error.reason = '验证码验证错误，验证失败，请重新获取短信并重新输入';
							this.formsub4 = false;
							this.phonenumber = '';
							this.yanzhengma = '';
							this.newpasswd = ''
						} else if (res.data.code == 404) {
							this.error.reasoncode = 'error0212';
							this.modalName = 'loginerror';
							this.error.reason = '没有验证信息，你得先获取验证码';
							this.formsub4 = false;
							this.phonenumber = '';
							this.yanzhengma = '';
							this.newpasswd = ''
						} else if (res.data.code == 500) {
							this.error.reasoncode = 'error0213';
							this.modalName = 'loginerror';
							this.error.reason = '修改密码失败，无法获取数据库的值，你需要联系管理员';
							this.formsub4 = false;
							this.phonenumber = '';
							this.yanzhengma = '';
							this.newpasswd = ''
						}
						this.text = 'request success';
					},
					fail: (res) => {
						console.log(res.data);
					}
				});
			}
		},
		watch: {
			/* 使用watch来响应数据的变化 */
			result(newVal, oldVal) {
				console.log('取得的ticket是：' + newVal.ticket, "取得的randstr是：" + newVal.randstr);
				this.formsub3 = true;
				this.ticketnew = newVal.ticket;
				this.randstrnew = newVal.randstr;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=tencentcloud_center:sendsms', //获取是否开放注册
					method: 'GET',
					timeout: 10000,
					data: {
						ticket: newVal.ticket,
						randstr: newVal.randstr,
						gh: this.addressData.countrycode,
						phone: this.phonenumber
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 2001) {
							this.formsub3 = false;
							let time = 60
							this.codeTxt = '重新获取' + time
							let timer = setInterval(() => {
								this.codeTxt = '获取验证码'
								if (time == 1) {
									this.codeFlag = true;
									clearInterval(timer)
								} else {
									time--
									this.codeTxt = '重新获取' + time
								}

							}, 1000)
						} else if (res.data.code == 2007) {
							this.error.reasoncode = 'error0203';
							this.modalName = 'loginerror';
							this.error.reason = '号码错误，请重新输入';
							this.formsub3 = false;
							this.codeFlag = true;
							this.phonenumber = '';
							this.yanzhengma = '';
							this.newpasswd = ''
						} else if (res.data.code == 404) {
							this.error.reasoncode = 'error0204';
							this.modalName = 'loginerror';
							if(this.type==0){
								this.error.reason = '号码不存在，无法找回';
							}else{
								this.error.reason = '号码已存在，无法注册';
							}
							this.formsub3 = false;
							this.codeFlag = true;
							this.phonenumber = '';
							this.yanzhengma = '';
							this.newpasswd = ''
						} else if (res.data.code == 401) {
							this.error.reasoncode = 'error0205';
							this.modalName = 'loginerror';
							this.error.reason = '号码违规，请重新输入';
							this.formsub3 = false;
							this.codeFlag = true;
							this.phonenumber = '';
							this.yanzhengma = '';
							this.newpasswd = ''
						} else if (res.data.code == 403) {
							this.error.reasoncode = 'error0206';
							this.modalName = 'loginerror';
							this.error.reason = '你已经在1个月内修改过密码超过3次，请稍后再修改';
							this.formsub3 = false;
							this.codeFlag = true;
							this.phonenumber = '';
							this.yanzhengma = '';
							this.newpasswd = ''
						} else {
							this.error.reasoncode = 'error0207';
							this.modalName = 'loginerror';
							this.error.reason = res.data.text;
							this.formsub3 = false;
							this.codeFlag = true;
							this.phonenumber = '';
							this.yanzhengma = '';
							this.newpasswd = ''
						}
						this.text = 'request success';
					},
					fail: (res) => {
						console.log(res.data);
					}
				});
			}
		},
	}
</script>

<style>
	uni-picker.shoujiquma::after {
		color: white !important;
	}

	uni-picker.shoujiquma {
		padding-right: 0px;
	}
	.cu-tag{
		padding-top: 30upx!important;
		padding-bottom: 30upx!important;
		padding-left: 10upx!important;
		padding-right: 10upx!important;
	}
	.login-form {
		margin: -9px 10px 0 10px;
		background: #007AFF;
		border-radius: 10px;
		background-color: #EEEEEE;
		box-shadow: 0 2px 10px #9B9B9B;
		padding: 20px;
	}

	.form-input input {
		background: #ffffff;
		border-radius: 5px;
		height: 40px;
		margin: 20px 0;
		padding: 0 10px;
	}

	.login-img {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 108px;
		margin-top: -70rpx;
	}

	.owl-login {
		width: 211px;
		height: 108px;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaYAAADYCAMAAACX8Lc0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMAUExURQAAAHhROYBWPXpSOpRkR4teQ3NNN3lSOpZlSH9VPHFMNpBhRY1fQ5BhRYxeQ2hGMpVkR4VZP3pSOmxJNJJiRnRON5NjRpBhRV9ALXVPOHpSOnVPOIZaQF8/LW9KNWFALpRkR3ZPOIZaQG9LNV9ALlo8K5VkR31UO1U5KE41JYxeQ3VPOEkyI1U6KU0zJWBALkArHv///93d3BoWG3dQOZVkR5RkR0syJEYvIk0zJZJiRpBhRXhROUkxI3lSOnZQOXZPOHpSOkQuIUEsH0UuIUcwIoRZP1o8K4dbQZNjRoxeQ5FiRopdQntTO0gwI31UPIFXPo1fRIhcQYZaQHhROnZQOIVaQEwzJDYlGl8/LfzHA1I3J5NjRzUkGl4+LT8rH0oxIzgmG4BWPYNYP0MtIFQ4KIJYPlA1Jo9gRIteQ1c6KU40JU81Jj4qHnVPOEoyJDknHH9WPTsoHI5gRGA/LVw9LJRjR0gwIlU5KYlcQlE2J5ZlSF09LD0pHTclG35VPJVlSDQkGVk7KnxTOzonHDwoHT8qHmBALpFhRYVZQIZbQHpTO4hbQTQjGUIsIINZP0cvIoldQoJXPn9VPX5VPUYvIZFiRV4+LI1fQ040JsS+utbKwvn4+Pz8/ItdQ2hGMv7+/nFMNmtIM2ZEMMrCvWNCL+7u7W5KNODg38fAvOTj41c5Kd/Qx/Lx8Vk7K9fV1Ovr6ujo5/X19bmzsIV1bNrZ2LSsp4t9dX5uZJmNhWxXS6+moCckKNTR0N3OxcC6tk40JpKDe6uinM3Kx2hPQkZDR4mHiltGOnJeU5GQkiAcIX57fkw5LTMvM6uqrKGYk9HNy3VkWV5ORf/77f7ur8nGxP3bWkQzKWRJOp6TjfzMFlM8Ljo3O2ZkZ3xnW6GfoWBdYaqel+u5BtDFv6eZkVg9IW9sb1lWWlJDOVE/NPnGCXJSG5qYmmFEH/G9Bf3SMIJhGP7pmP/2131cGpBsFqyEEVpBM4hlF8WZDbuQDqSclt7DbdipCcrArMGVDYJeIqKadIMAAACtdFJOUwARC9SxQFAgwQVkcFBhMSmSGIQ9fd+j16G1pfPC3cDz43SPkn2w+Oj04+zp7Lr0y/r////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+2IAVYAAAF8VJREFUeNrt3XtcE1e+AHBERZGHolZb66vWal+73QxRAwE0gKZoAR9YxNjEB1kQIVBoLIJaC2p0a9lb613REmMSQ5AuIu+XlA+Cz/reddVqrfb93O29+7rvz51HMplJZjKTZITkZH5/tp+PJ8x35nfO+Z2ZcwICBjkiAnwrhjwe4Icx6hkf+8Ezn/VHpim+9ldPyRrlf0oRKYmjfeoHBxdnTfE/pscT430r14+SZZWM8DumZxPjn/OpH/ySLCvX7wYRQQsT40VDfOq+gpn8bhDxEsxUMdOHfvA4JcwUFeRfSsElCJMvdcnPoEwv+RfTzFiEKd+HfvE0lCk30L8mTSiTwncmIqOLUaZ5M/1JaUQ6xvQL35k/WJie8yemx/Mxpl/6Ts6zMM0b7UdMz1qYdo/zkR8cUWZhWvuM/yiNS7cy+cof/XSOlemX/sM0FWfylT96Cs6UMs5vmJ7Fmbb5RqoPVNuY/CbrBW2yMflGlWxmmY3Jb7LeVALTi76R8whMIkvWA3bIN8Iym32WwLTLF/7aQDWRCZvsjXsRVKax09CS+LhcAlOhL2S9mVIiE5b1XiwEtW40VToVnduSmHzhppxCYkJXnR8vLAB1yX2aVIosBEwhMe30/qw3RE5mghPA6ITCAkCHfEO2SqXTAgMClSSmAu/Pek+ryUzPBQQ8B/9wQMt7T8FMOVMDRpWQmbw/602xY0oJeDoP/uG/ApPpCYQpJ2iqHdM6b5/Wjzhox5Q5MxFhWgfmkHwKwlQ8bZo9k7evZjzuwCRSoExgrj2ZUCalzJ7J25PHNAemBIzpFyAqjc6gYVrl3e+BBGXQMQE5hniKlsm778qXaJmAHEM8gTIZKZieDPbinx1scmQ6hDFtHwIg02MIk3GNzoEpsyjUm3Oe0YEpa0FJng9kazd7YoRp/dwkoz1T6pKR3pwEhBo7JplKqMOYQBzqaWAmzZq5c6N1ZCbTkiVLwr134COR6MlMxSqhUBiLMgFYLhqBMJXPhWONgciUK4aZxnhvoUgiidMR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');
		background-repeat: no-repeat;
		background-size: 100%;
		position: absolute;
	}

	.owl-login .hand {
		width: 34px;
		height: 34px;
		-webkit-border-radius: 40px;
		border-radius: 40px;
		background-color: #472d20;
		transform: scaleY(0.6);
		transition: 0.3s ease-out;
		position: absolute;
		left: 14px;
		bottom: -8px;
	}

	.owl-login .hand.hand-r {
		left: 170px;
	}

	.owl-login .arms {
		top: 58px;
		position: absolute;
		width: 100%;
		height: 41px;
		overflow: hidden;
	}

	.owl-login .arms .arm {
		width: 40px;
		height: 65px;
		position: absolute;
		left: 20px;
		top: 40px;
		background-image: url("data:image/png;base64,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");
		background-size: 100%;
		transition: 0.3s ease-out;
		transform: rotate(-20deg);
	}

	.owl-login .arms .arm.arm-r {
		transform: rotate(20deg) scaleX(-1);
		left: 158px;
	}

	.owl-login.password .hand {
		transform: translateX(42px) translateY(-15px) scale(0.7);
	}

	.owl-login.password .hand.hand-r {
		transform: translateX(-42px) translateY(-15px) scale(0.7);
	}

	.owl-login.password .arms .arm {
		transform: translateY(-40px) translateX(40px);
	}

	.owl-login.password .arms .arm.arm-r {
		transform: translateY(-40px) translateX(-40px) scaleX(-1);
	}

	uni-button[disabled].cu-btn.bg-green.shadow {
		background-color: #39b54a;
		color: white;
	}

	uni-button[disabled].cu-btn.bg-blue {
		background-color: #0081ff;
		color: #ffffff;
	}
	.title2 {
	    text-align: justify;
	    padding-right: 20upx;
	    font-size: 1rem;
	    position: relative;
	    height: 100upx;
	    line-height: 50upx;
		padding-left: 20upx;
	}
	.cu-form-group{
		background-color: #efefef;
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
	.displaygoogle{
		z-index: 10!important;
	}
</style>