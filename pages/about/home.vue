<template name="about">
	<view :class="'bg-'+themeColor.name">
		<view class="cu-bar hometop" :class="'bg-'+themeColor.name">
			<view class="action">
				<text class="cuIcon-home" @tap="backhome"></text>
			</view>
			<view class="action">
				<text class="cuIcon-scan" @tap="scantologin"></text>
				<text class="cuIcon-mobile" @tap="bangding()"></text>
				<text class="cuIcon-settings" @tap="settingselect"></text>
			</view>
		</view>
		<view class="cu-bar search hometop2" :class="'bg-'+themeColor.name">
			<img-cache v-show="avatarimgLoaded" class="cu-avatar round" :src="$avatarsmall" @tap="touserpage"
				data-id="0" @load="onSuccessImg()" />
			</img-cache>
			<img-cache v-show="!avatarimgLoaded" class="cu-avatar round" :src="$avatarsmalldefault" @tap="touserpage"
				data-id="0" style="margin-left: 20upx;" />
			</img-cache>
			<view class="action" style="margin-left: -200upx;">
				{{$username}}<text class="cuIcon-edit text-grey" @tap="tocn"></text>
			</view>
			<view class="action" @tap="touserpage">
				{{$t('home.userpage')}}<text class="cuIcon-right"></text>
			</view>
		</view>
		<scroll-view scroll-x class="nav text-center" :class="'bg-'+themeColor.name">
			<view class="flex text-center">
				<view class="cu-item flex-sub noline" :class="1==TabCur?'text-red cur':''" @tap="tabSelect" data-id="1">
					<text :class="1==TabCur?'text-red':'text-gray'"><text
							class="cuIcon-formfill"></text>{{$t('home.group')}}</text><br />{{loadlevelicon(mygroupid)}}
				</view>
				<view class="cu-item flex-sub noline" :class="2==TabCur?'text-red cur':''" @tap="tabSelect" data-id="2">
					<text :class="2==TabCur?'text-red':'text-gray'"><text
							class="cuIcon-likefill"></text>UID</text><br />{{$uid}}
				</view>
				<view class="cu-item flex-sub noline" :class="3==TabCur?'text-red cur':''" @tap="tabSelect" data-id="3">
					<text :class="3==TabCur?'text-red':'text-gray'"> <text
							class="cuIcon-newshotfill"></text>{{$t('home.message')}}</text><br /><text
						:class="mynewpm>0?'text-red':''">{{mynewpm}}</text>
				</view>
				<view class="cu-item flex-sub noline" :class="4==TabCur?'text-red cur':''" @tap="tabSelect" data-id="4">
					<text :class="4==TabCur?'text-red':'text-gray'"><text
							class="cuIcon-favorfill"></text>{{$t('home.notification')}}</text><br /><text
						:class="mynewprompt>0?'text-red':''">{{mynewprompt}}</text>
				</view>
			</view>
		</scroll-view>
		<view class="cu-bar solid-bottom" :class="'bg-'+themeColor.name">
			<view class="action">
				<text v-if="myinfoprompt>0" class="cuIcon-title text-orange "></text> {{$t('home.quickinformation')}}
			</view>
		</view>
		<view class="cu-list grid col-3 no-border" :class="'bg-'+themeColor.name">
			<view class="cu-item" @click="tomessage">
				<view class="cuIcon-messagefill text-red">
					<view class="cu-tag badge" v-if="this.mynewpm!=0">
						<block v-if="this.mynewpm!=1">{{this.mynewpm>99?'99+':this.mynewpm}}</block>
					</view>
				</view>
				<text>{{$t('home.message')}}</text>
			</view>
			<view class="cu-item" @click="tohistory">
				<view class="cuIcon-timefill text-orange">
				</view>
				<text>{{$t('home.history')}}</text>
			</view>
			<view class="cu-item" @click="toqiandao">
				<view class="cuIcon-squarecheckfill text-yellow">
				</view>
				<text>{{$t('home.dailysign')}}</text>
			</view>
			<view class="cu-item" @click="messageclick">
				<view class="cuIcon-questionfill text-green">
				</view>
				<text>{{$t('home.quiz')}}</text>
			</view>
			<view class="cu-item" @click="yaoyao">
				<view class="cuIcon-presentfill text-blue">
				</view>
				<text>{{$t('home.drawcard')}}</text>
			</view>
			<view class="cu-item" @click="paihang">
				<view class="cuIcon-upstagefill text-cyan">
				</view>
				<text>{{$t('home.rank')}}</text>
			</view>
		</view>


		<view class="cu-bar solid-bottom margin-top" :class="'bg-'+themeColor.name">
			<view class="action">
				<text v-if="mysetprompt>0" class="cuIcon-title text-orange"></text> {{$t('home.settinglist')}}
			</view>
		</view>
		<view class="cu-list menu" :class="'bg-'+themeColor.name">
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="mycredit()">
				<view class="content">
					<text class="cuIcon-moneybagfill text-mauve"></text>
					<text class="text-grey">{{$t('home.mycredit')}}</text>
				</view>
				<view class="action">
					<text class="text-sm text-cyan">{{$t('home.credits')}}：{{mycredits}}</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="myquest()">
				<view class="content">
					<image src="/static/task.gif" class="png" mode="aspectFit"></image>
					<text class="text-grey">{{$t('home.mytask')}}</text>
				</view>
			</view>
			<view v-if="month==1" class="cu-item" :class="menuArrow?'arrow':''" @tap="verti()">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-evaluate_fill text-red"></text>
					<text class="text-red">{{$t('home.annualreview')}}</text>
				</button>
			</view>
			<view v-if="card==1" class="cu-item" :class="menuArrow?'arrow':''" @tap="cardgame()">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-game text-red"></text>
					<text class="text-red">{{$t('home.cardgame')}}</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="tostyle()">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-discoverfill text-olive"></text>
					<text class="text-grey">{{$t('home.stylesettings')}}</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="toprofile()">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-peoplefill text-orange"></text>
					<text class="text-grey">{{$t('home.personalinformation')}}</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="tofavor()">
				<button class="cu-btn content" open-type="content">
					<text class="cuIcon-favorfill text-blue"></text>
					<text class="text-grey">{{$t('home.personalcollection')}}</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="haoyou()">
				<view class="content">
					<text class="cuIcon-emojiflashfill text-pink"></text>
					<text class="text-grey">{{$t('home.friendslist')}}</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{$t('home.managefriendslist')}}</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<view>
						<text class="cuIcon-btn text-green margin-right-xs"></text><text class="text-grey">{{$t('home.avatarupload')}}</text>
					</view>
					<view class="cu-progress round sm striped" v-if="percent==100">
						<text class="text-grey text-sm">{{$t('home.avataruploaded')}}</text>
					</view>
					<view class="cu-progress round sm striped" v-else-if="percent>0">
						<view class="bg-green" :style="[{ width:percent?percent + '%':'0'}]"></view>
					</view>
				</view>
				<view class="action">
					<button class="cu-btn round bg-green shadow" @tap="uploadimg()">
						<text class="cuIcon-upload"></text> {{$t('home.upload')}}</button>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="showdj()">
				<view class="content">
					<text class="cuIcon-presentfill text-red  margin-right-xs"></text>
					<text class="text-grey">{{$t('home.premiumshop')}}</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="tomm()">
				<view class="content">
					<text class="cuIcon-settingsfill text-green"></text>
					<text class="text-grey">{{$t('home.passwordsecurity')}}</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{$t('home.passwordsecuritytxt')}}</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" v-if="$adminid<=0">
				<view class="content" @tap="buylre()">
					<text class="cuIcon-goodsnewfill text-yellow"></text>
					<text class="text-grey">{{$t('home.premiumservice')}}</text>
				</view>
				<view class="action">
					<button class="cu-btn round bg-blue shadow" @tap="buylr()">
						<text class="cuIcon-vip"></text>{{$t('home.group')}}</button>
					<button class="cu-btn round bg-blue shadow margin-left-sm" @tap="buydb()">
						<text class="cuIcon-coin"></text>{{$t('home.wallet')}}</button>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="fankui()">
				<button class="cu-btn content" open-type="content">
					<text class="cuIcon-servicefill text-brown"></text>
					<text class="text-grey">{{$t('home.customerfeedback')}}</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content" open-type="contact" @tap="cleanbefore">
					<text class="cuIcon-footprint text-olive"></text>
					<text class="text-grey">{{$t('home.logout')}}</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content" open-type="contact" @tap="bbxx">
					<text class="cuIcon-info text-olive"></text>
					<text class="text-grey">{{$t('home.versioninformation')}}</text>
				</button>
			</view>
			<view class="padding-xs flex align-center" :class="'bg-'+themeColor.name"
				:style="{'height': iStatusBarHeight+'upx'}">
				<view class="flex-sub text-center">
					<view class="text-xs padding">
						<text class="text-white">{{$t('index.title')}} @2022</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='logout'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{$t('home.conformlogout')}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{$t('home.conformlogouttxt')}}
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">{{$t('api.cancel')}}</button>
						<button class="cu-btn bg-green margin-left" @tap="cleanlogin()">{{$t('api.ok')}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='update'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{$t('home.versioninformation')}}</view>
					<view v-if="isupdate==1" class="action" @tap="cancelupdate">
						<text class="cuIcon-close text-red"></text>
					</view>
					<view v-else class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl text-blue">
					{{$t('index.title')}} V{{version}}.{{versionCode}}{{update}}
				</view>
				<view v-if="isupdate==1" class="padding-xl text-red">
					{{$t('home.conformupdate')}}
				</view>
				<view class="padding-xl" v-if="progress>0">
					<view class="cu-progress">
						<view class="bg-blue" :style="[{ width:progress>0?progress + '%':''}]">{{progress}}%</view>
					</view>
				</view>
				<view v-if="progress>0" class="padding-xl">
					{{mbh(bite)}} MB / {{mbh(zongbite)}} MB
				</view>
				<view v-if="progress>0" class="padding-xl">
					{{$t('home.conformupdatetxt')}}
				</view>
				<view class="padding-xl text-cyan">
					{{$t('home.github')}}：<text class="text-blue" @tap="tothegithub()"><text
							class="lg text-blue cuIcon-link"></text>github.com/konatatenshi/zdmobile</text>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view v-if="isupdate==1" class="action">
						<button class="cu-btn line-green text-green" @tap="cancelupdate">{{$t('api.cancel')}}</button>
						<button v-if="bite==0" class="cu-btn bg-green margin-left" @tap="chechabout">{{$t('api.ok')}}</button>
					</view>
					<view v-else-if="isupdate==2" class="action">
						<button class="cu-btn line-green text-green" @tap="cancelupdate">{{$t('api.cancel')}}</button>
						<button v-if="bite==0" class="cu-btn bg-green margin-left" @tap="toupdate">{{$t('home.toshop')}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='grouplist'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="padding bg-white">
					<view class="flex  p-xs margin-bottom-sm mb-sm">
						<view class="bg-grey padding-sm margin-xs radius">{{$t('home.prelevel')}}：<br>{{getjf(mygroupid,1)}}</view>
						<view class="bg-grey padding-sm margin-xs radius">{{$t('home.creditrange')}}：<br>{{getjf(mygroupid,2)}}</view>
						<view class="bg-grey padding-sm margin-xs radius">{{$t('home.permission')}}：<br>{{getjf(mygroupid,3)}}</view>
					</view>
					<view class="flex  p-xs margin-bottom-sm mb-sm">
						<view class="bg-grey padding-sm margin-xs radius">{{$t('home.nowlevel')}}：<br>{{loadlevelicon(mygroupid)}}</view>
						<view class="bg-grey padding-sm margin-xs radius">{{$t('home.nowcredit')}}：<br>{{mycredits}}</view>
						<view class="bg-grey padding-sm margin-xs radius">{{$t('home.permission')}}：<br>{{getjf(mygroupid,4)}}</view>
					</view>
					<view class="flex  p-xs margin-bottom-sm mb-sm">
						<view class="bg-grey padding-sm margin-xs radius">{{$t('home.nextlevel')}}：<br>{{getjf(mygroupid,5)}}</view>
						<view class="bg-grey padding-sm margin-xs radius">{{$t('home.creditrange')}}：<br>{{getjf(mygroupid,6)}}</view>
						<view class="bg-grey padding-sm margin-xs radius">{{$t('home.permission')}}：<br>{{getjf(mygroupid,7)}}</view>
					</view>
					<view class="cu-bar bg-white">
						<button class="cu-btn line-green text-green" @tap="tomore">{{$t('home.clicktoviewmore')}}</button>
						<button class="cu-btn bg-green margin-left" @tap="hideModal">{{$t('home.know')}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='tozanzhu'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{$t('home.chooseservice')}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{$t('home.chooseservicetxt')}}
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="buylr">{{$t('home.group')}}</button>
						<button class="cu-btn bg-blue margin-left" @tap="buydb">{{$t('home.zdcoin')}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='toshop'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{$t('home.toshop')}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{$t('home.toshoptxt')}}
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="toxz()">{{$t('home.medal')}}</button>
						<button class="cu-btn bg-blue margin-left" @tap="daoju()">{{$t('home.item')}}</button>
						<button class="cu-btn bg-cyan margin-left" @tap="openbox()">{{$t('home.treasure')}}</button>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-yellow margin-left" @tap="totx()">{{$t('home.designation')}}</button>
						<button class="cu-btn bg-purple margin-left" @tap="tomp()">{{$t('home.card')}}</button>
						<button class="cu-btn bg-pink margin-left" @tap="togj()">{{$t('home.frame')}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='installfail'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{$t('home.readdataf')}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{$t('home.readdataftxt')}}
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="hideModal">{{$t('api.ok')}}</button>
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
				iStatusBarHeight: 0,
				platform: 0,
				TabCur: 0,
				version: '',
				versionCode: '',
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
				month: 0,
				percent: 0,
				myinfoprompt: 0,
				mysetprompt: 0,
				mynewprompt: 0,
				mycredits: 0,
				mytitle: 0,
				myagree: 0,
				myfans: 0,
				mylike: 0,
				mygroupid: 0,
				progress: 0,
				bite: 0,
				zongbite: 0,
				cancel: 0,
				isupdate: 0,
				update: '',
				card: 0,
				websocketmessage: [],
				listTouchDirection: null,
			};
		},
		methods: {
			hideModal(e) {
				this.modalName = null
			},
			toguestlogin(e) {
				uni.redirectTo({
					url: '../../components/ay-login/login-password'
				});
			},
			cancelupdate(e) {
				this.modalName = null;
				this.cancel = 1;
			},
			bbxx(e) {
				this.AppStore();
				this.modalName = 'update';
			},
			mbh(e) {
				e = e / 1024 / 1024;
				return e.toFixed(2);
			},
			backhome() {
				this.$emit("returnDat", "basics") //传递的值
				//returnDate接收的方法名  
			},
			tonotifi() {
				this.$emit("returnDat", "plugin") //传递的值
				uni.$emit('chosenSex', -8879);
				//returnDate接收的方法名  
			},
			tomessage() {
				this.$emit("returnDat", "plugin") //传递的值
				uni.$emit('chosenSex', -8878);
				//returnDate接收的方法名  
			},
			toqiandao() {
				if (this.$token == '') {
					this.toguestlogin();
					return;
				}
				uni.navigateTo({
					//url: '../basics/icon'
					url: '../extra/qiandao'
				})
			},
			tohistory(){
				uni.navigateTo({
					//url: '../basics/icon'
					url: '../extra/history'
				})
			},
			mycredit() {
				if (this.$token == '') {
					this.toguestlogin();
					return;
				}
				uni.navigateTo({
					url: '../extra/mycredit'
				})
			},
			myquest() {
				if (this.$token == '') {
					this.toguestlogin();
					return;
				}
				uni.navigateTo({
					url: '../extra/quest'
				})
			},
			verti() {
				uni.navigateTo({
					url: '../plugin/verticalnav'
				})
			},
			cardgame(){
				uni.navigateTo({
					url: '../extra/cardgame'
				})
			},
			tostyle() {
				uni.navigateTo({
					url: '../component/steps'
				})
			},
			yaoyao() {
				if (this.$token == '') {
					this.toguestlogin();
					return;
				}
				uni.navigateTo({
					//url: '../basics/progress'
					url: '../component/nav'
				})
			},
			paihang() {
				if (this.$token == '') {
					this.toguestlogin();
					return;
				}
				uni.navigateTo({
					url: '../basics/shadow'
				})
			},
			haoyou() {
				if (this.$token == '') {
					this.toguestlogin();
					return;
				}
				uni.navigateTo({
					url: '../plugin/indexes'
				})
			},
			tofavor() {
				uni.navigateTo({
					url: '../extra/favorite'
				})
			},
			fankui(){
				uni.navigateTo({
					url: '../extra/fankui'
				})
			},
			toprofile() {
				uni.navigateTo({
					url: '../extra/profile'
				})
			},
			bangding() {
				if (this.$token == '') {
					this.toguestlogin();
					return;
				}
				uni.navigateTo({
					url: '../extra/mobilebind/mobilebind'
				})
			},
			touserpage() {
				if (this.$token == '') {
					this.toguestlogin();
					return;
				}
				uni.navigateTo({
					url: '../component/list?uid=' + this.$uid,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			tothegithub() {
				plus.runtime.openURL('https://github.com/konatatenshi/zdmobile', function(res) {
					console.log(res);
				});
			},
			cleanbefore(e) {
				this.modalName = 'logout';
			},
			getydqx(e) {
				if (e == 9) {
					return 0;
				} else if (e == 10) {
					return 10;
				} else if (e == 29) {
					return 20;
				} else if (e == 30) {
					return 30;
				} else if (e == 31) {
					return 40;
				} else if (e == 32) {
					return 50;
				} else if (e == 33) {
					return 60;
				} else if (e == 34) {
					return 70;
				} else if (e == 35) {
					return 80;
				} else if (e == 36) {
					return 90;
				} else if (e == 37) {
					return 100;
				} else if (e == 38) {
					return 110;
				} else if (e == 52) {
					return 110;
				} else if (e == 54) {
					return 110;
				} else if (e == 1) {
					return 255;
				} else if (e == 2) {
					return 255;
				} else if (e == 3) {
					return 255;
				} else if (e == 16) {
					return 150;
				} else if (e == 17) {
					return 255;
				} else if (e == 18) {
					return 255;
				} else if (e == 19) {
					return 255;
				} else if (e == 45) {
					return 150;
				} else if (e == 45) {
					return 150;
				} else if (e == 47) {
					return 255;
				} else if (e == 57) {
					return 255;
				} else if (e == 4) {
					return 0;
				} else if (e == 5) {
					return 0;
				} else if (e == 6) {
					return 0;
				} else if (e == 7) {
					return 1;
				} else if (e == 8) {
					return 0;
				} else if (e == 9) {
					return 1;
				} else if (e == 41) {
					return 110;
				} else if (e == 42) {
					return 110;
				} else if (e == 50) {
					return 110;
				} else if (e == 44) {
					return 80;
				} else if (e == 51) {
					return 90;
				}
			},
			toqian(e) {
				if (e == 9) {
					return 9;
				} else if (e == 10) {
					return 9;
				} else if (e == 29) {
					return 10;
				} else if (e == 30) {
					return 29;
				} else if (e == 31) {
					return 30;
				} else if (e == 32) {
					return 31;
				} else if (e == 33) {
					return 32;
				} else if (e == 34) {
					return 33;
				} else if (e == 35) {
					return 34;
				} else if (e == 36) {
					return 35;
				} else if (e == 37) {
					return 36;
				} else if (e == 38) {
					return 37;
				} else if (e == 52) {
					return 38;
				} else if (e == 54) {
					return 52;
				} else {
					return e;
				}
			},
			tonext(e) {
				if (e == 9) {
					return 10;
				} else if (e == 10) {
					return 39;
				} else if (e == 29) {
					return 30;
				} else if (e == 30) {
					return 31;
				} else if (e == 31) {
					return 32;
				} else if (e == 32) {
					return 33;
				} else if (e == 33) {
					return 34;
				} else if (e == 34) {
					return 35;
				} else if (e == 35) {
					return 36;
				} else if (e == 36) {
					return 37;
				} else if (e == 37) {
					return 38;
				} else if (e == 38) {
					return 52;
				} else if (e == 52) {
					return 54;
				} else if (e == 54) {
					return 54;
				} else {
					return e;
				}
			},
			getjffw(e) {
				if (e == 9) {
					return "-999999999~0";
				} else if (e == 10) {
					return "0-300";
				} else if (e == 29) {
					return "300-1000";
				} else if (e == 30) {
					return "1000-2000";
				} else if (e == 31) {
					return "2000-4000";
				} else if (e == 32) {
					return "4000-6000";
				} else if (e == 33) {
					return "6000-9000";
				} else if (e == 34) {
					return "9000-12000";
				} else if (e == 35) {
					return "12000-16000";
				} else if (e == 36) {
					return "16000-20000";
				} else if (e == 37) {
					return "20000-25000";
				} else if (e == 38) {
					return "25000-30000";
				} else if (e == 52) {
					return "30000-50000";
				} else if (e == 54) {
					return "50000-?";
				} else {
					return "-";
				}
			},
			getjf(e, f) {
				if (f == 1) {
					return this.loadlevelicon(this.toqian(e));
				} else if (f == 2) {
					return this.getjffw(this.toqian(e));
				} else if (f == 3) {
					return this.getydqx(this.toqian(e));
				} else if (f == 4) {
					return this.getydqx(e);
				} else if (f == 5) {
					return this.loadlevelicon(this.tonext(e));
				} else if (f == 6) {
					return this.getjffw(this.tonext(e));
				} else if (f == 7) {
					return this.getydqx(this.tonext(e));
				}
			},
			cleanlogin() {
				var that = this;
				this.$token = '';
				uni.removeStorage({
					key: 'userlogininfo',
					success: function(res) {
						console.log(res)
						if (uni.getSystemInfoSync().platform == 'ios') {
							Vue.prototype.$chatid = 0;
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
							Vue.prototype.$groupid = 0;
							Vue.prototype.$username = that.$t('index.guest');
							Vue.prototype.$avatarsmall =
								'https://zd.tiangal.com/uc_server/images/randuser/small/0.jpg';
							Vue.prototype.$avatarsmalldefault =
								'https://zd.tiangal.com/uc_server/images/randuser/small/0.jpg';
							that.$emit("returnDat", "login") //传递的值
						} else {
							plus.runtime.restart(); //PS:Android不知为何不能正确传值，只能重启程序
						}
					}
				});
			},
			messageclick(index) {
				uni.navigateTo({
					url: '../extra/dati'
				});
			},
			daoju(e) {
				uni.navigateTo({
					url: '../component/swiper'
				});
			},
			openbox(e) {
				uni.navigateTo({
					url: '../component/timeline'
				});
			},
			toxz(e) {
				uni.navigateTo({
					url: '../extra/xunzhang'
				});
			},
			tomp(e) {
				uni.navigateTo({
					url: '../extra/beijing'
				});
			},
			totx(e) {
				uni.navigateTo({
					url: '../extra/touxian'
				});
			},
			togj(e) {
				uni.navigateTo({
					url: '../extra/guajian'
				});
			},
			showdj(){
				this.modalName = 'toshop';
			},
			tomm(e) {
				uni.navigateTo({
					url: '../plugin/animation'
				});
			},
			tocn(e) {
				console.log('gaiming');
				uni.navigateTo({
					url: '../extra/cn'
				});
			},
			tologin(e) {
				uni.navigateTo({
					url: '../basics/button?sessionid=' + e
				});
			},
			tomore(e) {
				uni.navigateTo({
					url: '../component/card?tid=126191'
				});
			},
			scantologin() {
				uni.scanCode({
					success: function(res) {
						//console.log('条码类型：' + res.scanType);
						var scantxt = JSON.parse(res.result);
						console.log(scantxt);
						if (scantxt.code == 200 && scantxt.method == 'scantologin') {
							uni.navigateTo({
								url: '../basics/button?sessionid=' + scantxt.session,
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
			buylre(){
				this.modalName = 'tozanzhu';
			},
			buylr(){
					uni.navigateTo({
						url: '../extra/buyvip',
						animationType: 'pop-in',
						animationDuration: 200
					});
			},
			buydb(){
					uni.navigateTo({
						url: '../extra/moneybag',
						animationType: 'pop-in',
						animationDuration: 200
					});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				console.log(this.TabCur);
				if (this.TabCur == 4) {
					if(this.$uid==357056){
						uni.navigateTo({
							url: '../extra/ad',
							animationType: 'pop-in',
							animationDuration: 200
						});
					}else{
						this.$emit("returnDat", "plugin") //传递的值
						uni.$emit('chosenSex', -8879);
					}
				} else if (this.TabCur == 3) {
					this.$emit("returnDat", "plugin") //传递的值
					uni.$emit('chosenSex', -8878);
				} else if (this.TabCur == 1) {
					this.modalName = 'grouplist';
				}
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
			AppStore() {
				var that = this;
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
					console.log(widgetInfo.version);
					console.log(widgetInfo.name);
					uni.request({
						url: getApp().globalData.zddomain + 'api/checkapi.php', //升级地址
						data: {
							version: widgetInfo.version,
							name: widgetInfo.name,
							platform: that.platform
						},
						success: (result) => {
							var data = result.data;
							console.log(data);
							that.downfile = data.StoreID;
							if (data.update == 200 && data.StoreID) {
								that.update = that.$t('home.updatefound');
								that.isupdate = 1;
							} else if (data.update === 201) {
								that.update = that.$t('home.latestversion');
							} else if (data.update === 202) {
								that.update = that.$t('home.updatefounds');
								that.isupdate = 2;
							}
						}
					});
				});
			},
			loadlevelicon(e, f) {
				if (e == 7) {
					if (f == 1) {
						return 'line-gray';
					} else {
						return this.$t('index.guest');
					}
				} else if (e == 9) {
					if (f == 1) {
						return 'line-gray';
					} else {
						return 'Lv0';
					}
				} else if (e == 10) {
					if (f == 1) {
						return 'line-gray';
					} else {
						return 'Lv1';
					}
				} else if (e == 29) {
					if (f == 1) {
						return 'light bg-grey';
					} else {
						return 'Lv2';
					}
				} else if (e == 30) {
					if (f == 1) {
						return 'light bg-olive';
					} else {
						return 'Lv3';
					}
				} else if (e == 31) {
					if (f == 1) {
						return 'light bg-cyan';
					} else {
						return 'Lv4';
					}
				} else if (e == 32) {
					if (f == 1) {
						return 'light bg-blue';
					} else {
						return 'Lv5';
					}
				} else if (e == 33) {
					if (f == 1) {
						return 'light bg-purple';
					} else {
						return 'Lv6';
					}
				} else if (e == 34) {
					if (f == 1) {
						return 'light bg-mauve';
					} else {
						return 'Lv7';
					}
				} else if (e == 35) {
					if (f == 1) {
						return 'light bg-pink';
					} else {
						return 'Lv8';
					}
				} else if (e == 36) {
					if (f == 1) {
						return 'light bg-brown';
					} else {
						return 'Lv9';
					}
				} else if (e == 37) {
					if (f == 1) {
						return 'light bg-yellow';
					} else {
						return 'Lv10';
					}
				} else if (e == 38) {
					if (f == 1) {
						return 'light bg-orange';
					} else {
						return 'Lv11';
					}
				} else if (e == 52) {
					if (f == 1) {
						return 'light bg-red';
					} else {
						return 'Lv12';
					}
				} else if (e == 54) {
					if (f == 1) {
						return 'light bg-blue';
					} else {
						return 'Lv13';
					}
				} else if (e == 4) {
					if (f == 1) {
						return 'light bg-grey';
					} else {
						return '禁言';
					}
				} else if (e == 5) {
					if (f == 1) {
						return 'light bg-grey';
					} else {
						return '封禁';
					}
				} else if (e == 6) {
					if (f == 1) {
						return 'light bg-grey';
					} else {
						return 'IP禁止';
					}
				} else if (e == 8) {
					if (f == 1) {
						return 'light bg-gray';
					} else {
						return 'QQ' + this.$t('index.guest');
					}
				} else if (e == 41) {
					if (f == 1) {
						return 'light bg-mauve';
					} else {
						return '摸鱼组';
					}
				} else if (e == 42) {
					if (f == 1) {
						return 'light bg-pink';
					} else {
						return '宣传组';
					}
				} else if (e == 50) {
					if (f == 1) {
						return 'light bg-cyan';
					} else {
						return '测试组';
					}
				} else if (e == 44 || e == 51) {
					if (f == 1) {
						return 'vip';
					} else {
						return this.$t('index.vip');
					}
				} else if (e == 1) {
					if (f == 1) {
						return 'bg-blue';
					} else {
						return '管理员';
					}
				} else if (e == 2) {
					if (f == 1) {
						return 'bg-cyan';
					} else {
						return '超版';
					}
				} else if (e == 3) {
					if (f == 1) {
						return 'bg-green';
					} else {
						return '版主';
					}
				} else if (e == 16) {
					if (f == 1) {
						return 'bg-grey';
					} else {
						return '见习版主';
					}
				} else if (e == 17) {
					if (f == 1) {
						return 'bg-orange';
					} else {
						return '总编辑';
					}
				} else if (e == 18) {
					if (f == 1) {
						return 'bg-red';
					} else {
						return '信息监管';
					}
				} else if (e == 45) {
					if (f == 1) {
						return 'bg-olive';
					} else {
						return '副版主';
					}
				} else if (e == 19) {
					if (f == 1) {
						return 'bg-red';
					} else {
						return '审核员';
					}
				} else if (e == 47) {
					if (f == 1) {
						return 'bg-mauve';
					} else {
						return '元素魔法使';
					}
				} else if (e == 57) {
					if (f == 1) {
						return 'bg-yellow';
					} else {
						return '编辑';
					}
				} else {
					if (f == 1) {
						return 'line-gray';
					} else {
						return this.$t('index.guest');
					}
				}
			},
			chechabout() {
				this.bite = 1;
				this.zongbite = 1;
				console.log(this.downfile);
				var that = this;
				const conclude = uni.downloadFile({
					url: that.downfile,
					success: (downloadResult) => {
						console.log(downloadResult);
						if (downloadResult.statusCode === 200) {
							plus.runtime.install(downloadResult.tempFilePath, {
								force: false
							}, function() {
								plus.nativeUI.alert(that.$t('home.nownew'), function() {
									plus.runtime.restart();
								});
							}, function(e) {
								plus.nativeUI.closeWaiting();
								console.log(that.$t('home.errorcode') + "：[" + e.code + "]：" + e.message);
								plus.nativeUI.alert(that.$t('home.errorcode') + "：[" + e.code + "]：" + e.message);
							});
						}
					}
				});
				conclude.onProgressUpdate((res) => {
					that.progress = res.progress;
					that.bite = res.totalBytesWritten;
					that.zongbite = res.totalBytesExpectedToWrite;
					// 测试条件，取消下载任务。  
					if (that.cancel == 1) {
						conclude.abort();
						that.progress = 0;
						that.bite = 0;
						that.zongbite = 0;
					}
				});
			},
			toupdate(){
				if (this.platform == 2) {
					let appurl = "market://details?id=bbs.zdfx.net"; //这个是通用应用市场，如果想指定某个应用商店，需要单独查这个应用商店的包名或scheme及参数
					plus.runtime.openURL(appurl,(err) =>{
						plus.runtime.openURL('https://bbs.zdfx.net/api/downapp.html', function(res) {
							console.log(res);
						});
					  },'com.android.vending');
				}else {
					let appleId=1592697237 //app的appleId
					plus.runtime.launchApplication({
					  action: `itms-apps://itunes.apple.com/us/app/id${appleId}?mt=8`
					}, function(e) {
					  console.log('Open system default browser failed: ' + e.message);
					});
				}
			},
			uploadimg() {
				let _self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: getApp().globalData.zddomain +
								'plugin.php?id=ts2t_qqavatar:uploadavatar',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'token': _self.$token
							},
							success: function(uploadFileRes) {
								console.log(uploadFileRes.data);
							}
						});

						uploadTask.onProgressUpdate(function(res) {
							_self.percent = res.progress;
							console.log('上传进度' + res.progress);
							console.log('已经上传的数据长度' + res.totalBytesSent);
							console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
						});
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
			shuaxinlist() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				});
			}
		},
		created() {
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			//this.version = plus.runtime.version;
			var that = this;
			plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
				that.version = wgtinfo.version;
				that.versionCode = plus.runtime.versionCode;
				console.log(that.version);
			});
			plus.navigator.setStatusBarStyle('dark');
			// 获取传递过来的链接
			if (uni.getSystemInfoSync().platform == 'ios') {
				this.platform = 1;
			} else {
				this.platform = 2;
			}
			if ((this.$groupid>=35||this.$adminid>0)&&this.$uid!=357043){
				this.card = 1;
			}
			var date = new Date();
			that.month = date.getMonth() + 1;
			void plus.runtime.setBadgeNumber(0); //桌面角标设置为0
			const clientInfo = plus.push.getClientInfo(); //获取CID推送
			const signature = plus.navigator.getSignature();
			console.log(clientInfo);
			//console.log(this.iStatusBarHeight);
			//console.log(signature);
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
						getApp().globalData.mynewpm = parseInt(res.data.newpm);
						getApp().globalData.mynewprompt = parseInt(res.data.newprompt);
						getApp().globalData.myfreeze = res.data.freeze;
						getApp().globalData.onlyacceptfriendpm = res.data.onlyacceptfriendpm;
						getApp().globalData.myinfoprompt = parseInt(res.data.newpm) + parseInt(res.data
							.newprompt);
						that.mynewpm = getApp().globalData.mynewpm;
						that.mynewprompt = getApp().globalData.mynewprompt;
						that.myinfoprompt = getApp().globalData.myinfoprompt;
						that.mycredits = getApp().globalData.mycredits;
						that.mygroupid = getApp().globalData.mygroupid;
						//console.log(that.mynewpm);
						console.log(that.mynewprompt);
						console.log(that.$token);
						Vue.prototype.$username = getApp().globalData.myusername;
					}
				});
			};
			if (Vue.prototype.$token != '') {
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:user', //获取用户基本信息。
					method: 'GET',
					timeout: 10000,
					data: {
						token: Vue.prototype.$token,
						cid: clientInfo.clientid,
						action: 'user_info'
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						var that = this;
						uni.setStorage({
							key: 'myuserinfo',
							data: res.data.data,
							success: function() {
								//console.log('success');
							}
						});
						uni.getStorage({
							key: 'myuserinfo',
							success: function(res) {
								console.log(res);
								if (res.data.status == 0 && res.data.freeze == 0) {
									getApp().globalData.myusername = res.data.username;
									getApp().globalData.myadminid = res.data.adminid;
									getApp().globalData.mygroupid = res.data.groupid;
									getApp().globalData.mygroupexpiry = res.data.groupexpiry;
									getApp().globalData.myregdate = res.data.regdate;
									getApp().globalData.mycredits = res.data.credits;
									getApp().globalData.mynewpm = res.data.newpm;
									getApp().globalData.mynewprompt = res.data.newprompt;
									getApp().globalData.myfreeze = res.data.freeze;
									getApp().globalData.onlyacceptfriendpm = res.data
										.onlyacceptfriendpm;
									getApp().globalData.myinfoprompt = parseInt(res.data.newpm) +
										parseInt(res.data.newprompt);
									that.mynewpm = getApp().globalData.mynewpm;
									that.myinfoprompt = getApp().globalData.myinfoprompt;
									that.mynewprompt = getApp().globalData.mynewprompt;
									that.mycredits = getApp().globalData.mycredits;
									that.mygroupid = getApp().globalData.mygroupid;
									uni.$emit('chosenSex', that.myinfoprompt);
								} else {
									uni.redirectTo({
										url: '../../components/ay-login/login-password'
									});
								}
								//console.log(that.mynewpm);
								//console.log(that.myinfoprompt);
							}
						});
					},
				});
			}
		},
		updated: function() {
		}
	}
</script>

<style>
	uni-view.cu-item.noline {
		line-height: 33upx;
	}

	.cu-list.bg-red {
		background-color: #ffdbca !important;
	}

	.cu-list.bg-red.cu-list.menu>.cu-item {
		background-color: #ffdbca !important;
	}

	.cu-list.bg-black {
		background-color: #747474 !important;
	}

	.cu-list.bg-black.cu-list.menu>.cu-item {
		background-color: #747474 !important;
	}

	.cu-progress {
		background-color: transparent !important;
	}
</style>
