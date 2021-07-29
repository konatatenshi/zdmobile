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
			<view class="cu-item" @click="messageclick">
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
			<view class="cu-item" @click="messageclick">
				<view class="cuIcon-presentfill text-blue">
					<view class="cu-tag badge" v-if="this.mynewpm!=0">
						<block v-if="this.mynewpm!=1">{{this.mynewpm>99?'99+':this.mynewpm}}</block>
					</view>
				</view>
				<text>摇摇</text>
			</view>
			<view class="cu-item" @click="messageclick">
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
				<button class="cu-btn content" open-type="contact" @tap="cleanlogin">
					<text class="cuIcon-footprint text-olive"></text>
					<text class="text-grey">注销登录</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content" open-type="contact" @tap="checkupdate">
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
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
                iStatusBarHeight:0,
				TabCur: 0,
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
				websocketmessage: [],
				listTouchDirection: null,
			};
		},
		methods: {
			backhome(){      
				this.$emit("returnDat","basics")//传递的值
				 //returnDate接收的方法名  
			},
			cleanlogin() {
			var that = this;
			this.$token = '';
				uni.removeStorage({
					key: 'userlogininfo',
					success: function(res) {
						that.$emit("returnDat","login")//传递的值
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
				        console.log('条码内容：' + res.result);
						var sessionid = res.result;
						uni.navigateTo({
							url: '../basics/button?sessionid=' +sessionid
						});
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
			checkupdate(e) {
				this.switchA = e.detail.value;
				uni.redirectTo({
					url: '../basics/home'
				});
			},
			settingselect(e) {
				this.switchA = e.detail.value;
				uni.navigateTo({
					url: '../basics/design'
				});
			},
		},
		created() {
            this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
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
