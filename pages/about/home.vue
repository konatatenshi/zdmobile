<template name="about">
	<view>
		<view class="cu-bar bg-gray hometop">
			<view class="action">
				<text class="cuIcon-home text-black" @tap="backhome"></text>
			</view>
			<view class="action">
				<text class="cuIcon-scan text-black" @tap="scantologin"></text>
				<text class="cuIcon-mobile text-black"></text>
				<text class="cuIcon-settings text-black" @tap="settingselect" ></text>
			</view>
		</view>
		<view class="cu-bar bg-gray search hometop2">
			<img-cache v-show="avatarimgLoaded" class="cu-avatar round" :src="$avatarsmall" @tap="tabSelect" data-id="0"
				@load="onSuccessImg()" />
			</img-cache>
			<img-cache v-show="!avatarimgLoaded" class="cu-avatar round" :src="$avatarsmalldefault" @tap="tabSelect"
				data-id="0" style="margin-left: 11px;" />
			</img-cache>
			<view class="content" style="text-align: left;">
				{{$username}}<text class="cuIcon-edit text-grey"></text>
			</view>
			<view class="action">
				个人主页<text class="cuIcon-right"></text>
			</view>
		</view>
		<scroll-view scroll-x class="bg-gray nav text-center" >
			<view class="flex text-center">
				<view class="cu-item flex-sub noline" :class="1==TabCur?'text-red cur':''" @tap="tabSelect" data-id="1">
					<text :class="1==TabCur?'text-red':'text-gray'"><text class="cuIcon-formfill"></text>主题</text><br/>{{mytitle}}
				</view>
				<view class="cu-item flex-sub noline" :class="2==TabCur?'text-red cur':''" @tap="tabSelect" data-id="2">
					<text :class="2==TabCur?'text-red':'text-gray'"><text class="cuIcon-likefill"></text>获赞</text><br/>{{myagree}}
				</view>
				<view class="cu-item flex-sub noline" :class="3==TabCur?'text-red cur':''" @tap="tabSelect" data-id="3">
					<text :class="3==TabCur?'text-red':'text-gray'"> <text class="cuIcon-newshotfill"></text>粉丝</text><br/>{{myfans}}
				</view>
				<view class="cu-item flex-sub noline" :class="4==TabCur?'text-red cur':''" @tap="tabSelect" data-id="4">
					<text :class="4==TabCur?'text-red':'text-gray'"><text class="cuIcon-favorfill"></text>关注</text><br/>{{mylike}}
				</view>
			</view>
		</scroll-view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text v-if="myinfoprompt>0" class="cuIcon-title text-orange "></text> 快捷信息
			</view>
		</view>
		<view class="cu-list grid col-3 no-border">
			<view class="cu-item" @click="messageclick">
				<view class="cuIcon-messagefill text-red">
					<view class="cu-tag badge" v-if="this.mynewpm!=0">
						<block v-if="this.mynewpm!=1">{{this.mynewpm>99?'99+':this.mynewpm}}</block>
					</view>
				</view>
				<text>消息</text>
			</view>
			<view class="cu-item" @click="messageclick">
				<view class="cuIcon-noticefill text-orange">
					<view class="cu-tag badge" v-if="this.mynewprompt!=0">
						<block v-if="this.mynewprompt!=1">{{this.mynewprompt>99?'99+':this.mynewprompt}}</block>
					</view>
				</view>
				<text>提醒</text>
			</view>
			<view class="cu-item" @click="toqiandao">
				<view class="cuIcon-squarecheckfill text-yellow">
					<view class="cu-tag badge" v-if="this.mynewpm!=0">
						<block v-if="this.mynewpm!=1">{{this.mynewpm>99?'99+':this.mynewpm}}</block>
					</view>
				</view>
				<text>签到</text>
			</view>
			<view class="cu-item" @click="messageclick">
				<view class="cuIcon-questionfill text-green">
					<view class="cu-tag badge" v-if="this.mynewpm!=0">
						<block v-if="this.mynewpm!=1">{{this.mynewpm>99?'99+':this.mynewpm}}</block>
					</view>
				</view>
				<text>答题</text>
			</view>
			<view class="cu-item" @click="yaoyao">
				<view class="cuIcon-presentfill text-blue">
					<view class="cu-tag badge" v-if="this.mynewpm!=0">
						<block v-if="this.mynewpm!=1">{{this.mynewpm>99?'99+':this.mynewpm}}</block>
					</view>
				</view>
				<text>摇摇</text>
			</view>
			<view class="cu-item" @click="paihang">
				<view class="cuIcon-upstagefill text-cyan">
					<view class="cu-tag badge" v-if="this.mynewpm!=0">
						<block v-if="this.mynewpm!=1">{{this.mynewpm>99?'99+':this.mynewpm}}</block>
					</view>
				</view>
				<text>排行</text>
			</view>
		</view>


		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text v-if="mysetprompt>0" class="cuIcon-title text-orange"></text> 设置列表
			</view>
		</view>
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-moneybagfill text-mauve"></text>
					<text class="text-grey">我的积分</text>
				</view>
				<view class="action">
					<text class="text-sm text-cyan">总积分：{{mycredits}}</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<image src="/static/task.gif" class="png" mode="aspectFit"></image>
					<text class="text-grey">我的任务</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-discoverfill text-olive"></text>
					<text class="text-grey">风格设置</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
					<text class="cuIcon-peoplefill text-orange"></text>
					<text class="text-grey">个人资料</text>
				</navigator>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-emojiflashfill text-pink"></text>
					<text class="text-grey">好友</text>
				</view>
				<view class="action">
					<view class="cu-avatar-group">
						<view class="cu-avatar round sm"
							style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);">
						</view>
						<view class="cu-avatar round sm"
							style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);">
						</view>
						<view class="cu-avatar round sm"
							style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);">
						</view>
						<view class="cu-avatar round sm"
							style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);">
						</view>
					</view>
					<text class="text-grey text-sm">4 人</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-btn text-green"></text>
					<text class="text-grey">头像</text>
				</view>
				<view class="action">
					<button class="cu-btn round bg-green shadow">
						<text class="cuIcon-upload"></text> 上传</button>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
					<text class="text-grey">标签</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-orange light">音乐</view>
					<view class="cu-tag round bg-olive light">电影</view>
					<view class="cu-tag round bg-blue light">旅行</view>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-settingsfill text-green"></text>
					<text class="text-grey">密码安全</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">定期修改密码有助于论坛安全！</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-notification text-blue margin-right-xs"></text> 消息提醒
					</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> 消息提醒还没打开！
					</view>
				</view>
				<view class="action">
					<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content" open-type="contact" @tap="cleanbefore">
					<text class="cuIcon-footprint text-olive"></text>
					<text class="text-grey">注销登录</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content" open-type="contact" @tap="bbxx">
					<text class="cuIcon-info text-olive"></text>
					<text class="text-grey">版本信息</text>
				</button>
			</view>
			<view class="padding-xs flex align-center bg-gray" :style="{'height': iStatusBarHeight+'px'}">
				<view class="flex-sub text-center">
					<view class="text-xs padding">
						<text class="text-white">终点论坛 @2021</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='logout'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">确认注销</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					你确认注销此前登录的账号吗？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="cleanlogin()">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='update'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">版本信息</view>
					<view v-if="isupdate==1" class="action" @tap="cancelupdate">
						<text class="cuIcon-close text-red"></text>
					</view>
					<view v-else class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{version}}{{update}}
				</view>
				<view v-if="isupdate==1" class="padding-xl">
					目前服务器有新版本，确认进行更新吗？
				</view>
				<view class="padding-xl">
					<view v-if="progress>0" class="cu-progress">
						<view class="bg-blue" :style="[{ width:progress>0?progress + '%':''}]">{{progress}}%</view>
					</view>
				</view>
				<view v-if="progress>0" class="padding-xl">
					{{bite}} / {{zongbite}}
				</view>
				<view v-if="progress>0" class="padding-xl">
					如果遇到进度条100，但是APP没有正常重启，说明安装失败，版本差距过大，请去市场更新。
				</view>
				<view class="cu-bar bg-white justify-end">
					<view v-if="isupdate==1" class="action">
						<button class="cu-btn line-green text-green" @tap="cancelupdate">取消</button>
						<button v-if="bite==0" class="cu-btn bg-green margin-left" @tap="updatequery">确定</button>
					</view>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='installfail'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">安装失败</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						安装失败。可能因为版本不对。请联系管理员。
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
                iStatusBarHeight:0,
				TabCur: 0,
				version: '',
				downfile: '',
				scrollLeft: 0,
				switchA: false,
				avatarimgLoaded: false,
				modalName: null,
				skin: false,
				menuArrow: false,
				menuCard: false,
				menuBorder: false,
				listTouchStart: 0,
				mynewpm: 0,
				myinfoprompt: 0,
				mysetprompt: 0,
				mynewprompt: 0,
				mycredits: 0,
				mytitle: 0,
				myagree: 0,
				myfans: 0,
				mylike: 0,
				progress: 0,
				bite: 0,
				zongbite: 0,
				cancel: 0,
				isupdate: 0,
				update: '',
				websocketmessage: [],
				listTouchDirection: null,
			};
		},
		methods: {
			hideModal(e) {
				this.modalName = null
			},
			cancelupdate(e) {
				this.modalName = null;
				this.cancel = 1;
			},
			bbxx(e) {
				this.checkupdate();
				this.modalName = 'update';
			},
			backhome(){      
				this.$emit("returnDat","basics")//传递的值
				 //returnDate接收的方法名  
			},
			toqiandao(){
				uni.navigateTo({
					url: '../basics/icon'
				})
			},
			yaoyao(){
				uni.navigateTo({
					url: '../basics/progress'
				})
			},
			paihang(){
				uni.navigateTo({
					url: '../basics/shadow'
				})
			},
			cleanbefore(e) {
				this.modalName = 'logout';
			},
			cleanlogin() {
			var that = this;
			this.$token = '';
			uni.removeStorage({
				key: 'userlogininfo',
				success: function(res) {
					console.log(res)
					if (uni.getSystemInfoSync().platform == 'ios') {
						Vue.prototype.$chatid =0;
						Vue.prototype.$chatuid = 0;
						Vue.prototype.$auth = "";
						Vue.prototype.$htauth = "";
						Vue.prototype.$chatswitch = 0;
						Vue.prototype.$token = '';
						Vue.prototype.$cookies = '';
						Vue.prototype.$uid = 0;
						Vue.prototype.$adminid = 0;
						Vue.prototype.$imageswitch = 0;
						Vue.prototype.$floorswitch = 0;
						Vue.prototype.$nowdate = 0;
						Vue.prototype.$username = '游客';
						Vue.prototype.$avatarsmall = 'https://zd.tiangal.com/uc_server/images/randuser/small/0.jpg';
						Vue.prototype.$avatarsmalldefault = 'https://zd.tiangal.com/uc_server/images/randuser/small/0.jpg';
						that.$emit("returnDat","login")//传递的值
					} else {
						plus.runtime.restart();//PS:Android不知为何不能正确传值，只能重启程序
					}
				}
			});
			},
			messageclick(index) {
				console.log(index)
			},
			tologin(e) {
				uni.navigateTo({
					url: '../basics/button?sessionid=' +e
				});
			},
			scantologin(){
				uni.scanCode({
				    success: function (res) {
				        //console.log('条码类型：' + res.scanType);
						var scantxt = JSON.parse(res.result);
				        console.log(scantxt);
						if(scantxt.code==200&&scantxt.method=='scantologin'){
							uni.navigateTo({
								url: '../basics/button?sessionid=' +scantxt.session,
								animationType: 'pop-in',
								animationDuration: 200
							});
						}
				    }
				});
			},
			onSuccessImg() {
				this.avatarimgLoaded = true;
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			settingselect(e) {
				this.switchA = e.detail.value;
				uni.navigateTo({
					url: '../basics/design',
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			checkupdate(){
				var that=this;
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {  
					console.log(widgetInfo.version);
					console.log(widgetInfo.name);
				    uni.request({  
				        url: getApp().globalData.zddomain + 'api/update.php', //升级地址
				        data: {  
				            version: widgetInfo.version,  
				            name: widgetInfo.name  
				        },  
				        success: (result) => {  
				            var data = result.data;  
							console.log(data);
							that.downfile = data.wgtUrl;
				            if (data.update == 200 && data.wgtUrl) {  
								that.update = '(有更新)';
								that.isupdate = 1;
				            } else if (data.update === 201) {
								that.update = '(最新版)';
							} else if (data.update === 202) {
								that.update = '(请去市场更新)';
							}
				        }  
				    });  
				});  
			},
			updatequery(){
				this.bite=1;
				this.zongbite=1;
				console.log(this.downfile);
				var that=this;
				const downloadTask = uni.downloadFile({  
				    url: that.downfile,
				    success: (downloadResult) => {  
						console.log(downloadResult);
				        if (downloadResult.statusCode === 200) {  
				            plus.runtime.install(downloadResult.tempFilePath, {  
				                force: false  
				            }, function() {  
				                console.log('install success...');  
								plus.nativeUI.alert("应用资源更新完成！",function(){
								    plus.runtime.restart();
								});
				            }, function(e) {  
								plus.nativeUI.closeWaiting();
								console.log("安装wgt文件失败["+e.code+"]："+e.message);
								plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
				            });  
				        }
				    }
				});  
				downloadTask.onProgressUpdate((res) => {
					that.progress = res.progress;
					that.bite = res.totalBytesWritten;
					that.zongbite = res.totalBytesExpectedToWrite;
					console.log('下载进度' + res.progress);
					console.log('已经下载的数据长度' + res.totalBytesWritten);
					console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
					// 测试条件，取消下载任务。  
					if (that.cancel == 1) {  
					    downloadTask.abort();  
						that.progress = 0;
						that.bite = 0;
						that.zongbite = 0;
					}  
				});
			}
		},
		created() {
            this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			this.version = plus.runtime.version;
			plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo){  
			    console.log(wgtinfo.version);  
			});
			plus.navigator.setStatusBarStyle('dark');
			console.log(this.iStatusBarHeight);
			if (Vue.prototype.$token != '') {
				var that = this;
				uni.getStorage({
					key: 'myuserinfo',
					success: function(res) {
						getApp().globalData.myusername = res.data.username;
						getApp().globalData.myadminid = res.data.adminid;
						getApp().globalData.mygroupid = res.data.groupid;
						getApp().globalData.mygroupexpiry = res.data.groupexpiry;
						getApp().globalData.myregdate = res.data.regdate;
						getApp().globalData.mycredits = res.data.credits;
						getApp().globalData.mynewpm = res.data.newpm;
						getApp().globalData.mynewprompt = res.data.newprompt;
						getApp().globalData.myfreeze = res.data.freeze;
						getApp().globalData.onlyacceptfriendpm = res.data.onlyacceptfriendpm;
						getApp().globalData.myinfoprompt = parseInt(res.data.newpm) + parseInt(res.data
							.newprompt);
						that.mynewpm = getApp().globalData.mynewpm;
						that.mynewprompt = getApp().globalData.newprompt;
						that.myinfoprompt = getApp().globalData.myinfoprompt;
						that.mycredits = getApp().globalData.mycredits;
						//console.log(that.mynewpm);
						console.log(that.myinfoprompt);
						console.log(that.$token);
						Vue.prototype.$username = getApp().globalData.myusername;
					}
				});
			};
		},
		onshow: function() {
		}
	}
</script>

<style>
	uni-view.cu-item.noline{
		    line-height: 33upx;
	}
</style>
