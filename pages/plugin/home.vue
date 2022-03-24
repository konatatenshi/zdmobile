<template name="components">
	<view>
		<view class="cu-bar hometop" :class="'bg-'+themeColor.name">
			<view class="action">
				<text class="cuIcon-homefill text-gray"></text> {{$t('home.homepage')}}
			</view>
			<view class="content text-bold" style="margin-bottom: 3px;">
				{{$t('home.messagelist')}}
			</view>
			<view class="action">
				<text class="cuIcon-peoplefill text-grey"></text>
			</view>
		</view>
		<scroll-view scroll-x class="nav-sm hometop1" :class="'bg-'+themeColor.name" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in 5" :key="index"
				@tap="tabSelect" :data-id="index">
				<text class="cuIcon-title text-orange"
					v-if="(index==0&&mynewpm>0)||(index==1&&publicnum>0)||(index==2&&allnum>0)"></text>{{tabname[index]}}
			</view>
		</scroll-view>

		<view class="view_head">
			<swiper class="swiper-box" :style="'height: ' + swiperheight +'px;'" :current="TabCur" @change="tabChange">
				<swiper-item key="1">
					<scroll-view class="list">
						<view class="view_listnow listnow0">
							<view class="cu-list menu-avatar margin-top hometop3">
								<view v-if="pvarray.length>0" class="cu-item" v-for="(pvmessage,indexv) in pvarray"
									:key="indexv">
									<view class="cu-avatar round lg"
										:style="{'background-image': 'url('+ itemicon( 'private',pvmessage.avatarlist ) + ')'}" @tap="topm(pvmessage.plid,pvmessage.lastmessage.lastauthor)">
										<view v-if="pvmessage.new==1&&syschange[indexv]!=MessageTabCur"
											class="cu-tag badge"></view>
									</view>
									<img-cache class="cu-avatar round gzlist2" v-if="pvmessage.touxiangkuanglist != ''"
										:src="pvmessage.touxiangkuanglist" />
									<view class="content" @tap="topm(pvmessage.plid,pvmessage.lastmessage.lastauthor)">
										<view class="text-grey">{{todate(pvmessage.lastdateline)}}<text
												class="cuIcon-roundrightfill text-green margin-left-xs margin-right-xs"><text
													v-if="pvmessage.new==1&&syschange[indexv]!=MessageTabCur"
													class="text-xs">{{tomessage(pvmessage.lastmessage.lastauthor,pvmessage.lastmessage.lastauthorid,pvmessage.authorid)}}</text><text
													v-else class="text-xs">{{tomessage(pvmessage.lastmessage.lastauthor,pvmessage.lastmessage.lastauthorid,pvmessage.authorid)}}</text></text>
										</view>
										<view class="text-gray text-sm flex">
											<view class="text-cut2">
												<text style="font-weight:700">{{$t('home.title')}}：{{pvmessage.subject}}</text><text class="lg text-gray cuIcon-wenzi"></text>：{{totext(pvmessage.lastmessage.lastsummary)}}
											</view>
										</view>
									</view>
								</view>
							</view>
							<view>
								<block>
									<view class="padding-xs flex align-center bg-gray">
										<view class="flex-sub text-center" @tap="tothebottom()">
											<view class="text-xs padding">
												<text class="text-black">{{loading}}</text>
											</view>
										</view>
									</view>
								</block>
							</view>
						</view>
					</scroll-view>
				</swiper-item>

				<swiper-item key="2">
					<scroll-view class="list">
						<view class="view_listnow listnow1">
							<view class="cu-bar solid-bottom hometop3" :class="'bg-'+themeColor.name">
								<view class="action">
									{{$t('home.groupmessage')}}
								</view>
							</view>
							<view class="cu-list menu-avatar" @click="gonggongqunzu()">
								<view class="cu-item">
									<view class="cu-avatar round lg"
										style="background-image:url(../../static/group.png);">
									</view>
									<view class="content">
										<view>
											<view class="text-cut">{{$t('home.publicgroup')}}</view>
											<view class="cu-tag round bg-orange sm">{{chatonline}}{{$t('home.people')}}</view>
										</view>
										<view class="text-gray text-sm flex">
											<view class="text-cut">
												{{chatmessage}}
											</view>
										</view>
									</view>
									<view class="action">
										<view class="text-grey text-xs">{{chattime}}</view>
										<view class="cu-tag round bg-red sm" v-if="switchB">{{chatnumber}}
										</view>
										<view class="cuIcon-notice_forbid_fill text-gray" v-else></view>
									</view>
								</view>
							</view>
							<view class="cu-bar solid-bottom margin-top" :class="'bg-'+themeColor.name">
								<view class="action">
									{{$t('home.publicmessage')}}
								</view>
							</view>
							<view class="cu-list menu-avatar">
								<view v-if="publicarray.length>0" class="cu-item"
									v-for="(pbmessage,indexp) in publicarray" :key="indexp">
									<view class="cu-avatar round lg"
										:style="{'background-image': 'url('+ itemicon('system') + ')'}">
										<view v-if="pbmessage.status==0&&puchange[indexp]!=1"
											class="cu-tag badge"></view>
									</view>
									<img-cache class="cu-avatar round gzlist2" v-if="pbmessage.touxiangkuanglist != ''"
										:src="pbmessage.touxiangkuanglist" />
									<view class="content">
										<view class="text-grey">{{todate(pbmessage.dateline)}}<text
												class="cuIcon-roundrightfill text-green margin-left-xs margin-right-xs"><text
													v-if="pbmessage.status==0&&puchange[indexp]!=1"
													class="text-xs"
													@tap="shownotification(pbmessage.message,indexp,10)">{{$t('home.clicktoviewmore')}}</text><text
													v-else class="text-xs"
													@tap="shownotification(pbmessage.message,-1,10)">{{$t('home.clicktoviewmore')}}</text></text>
										</view>
										<view class="text-gray text-sm flex">
											<view class="text-cut2">
												{{totext(pbmessage.message)}}
											</view>
										</view>
									</view>
								</view>
							</view>
							<view>
								<block>
									<view class="padding-xs flex align-center bg-gray">
										<view class="flex-sub text-center" @tap="tothebottom()">
											<view class="text-xs padding">
												<text class="text-black">{{loading}}</text>
											</view>
										</view>
									</view>
								</block>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item key="3">
					<scroll-view class="list">
						<view class="view_listnow listnow2">
							<view class="cu-list menu-avatar margin-top hometop3">
								<scroll-view scroll-x class="nav" :class="'bg-'+themeColor.name">
									<view class="flex text-center">
										<view class="cu-item flex-sub"
											:class="index==MessageTabCur?'text-orange cur':''"
											v-for="(item,index) in tabjson" :key="index" @tap="MtabSelect"
											:data-id="index">
											{{item}}<text v-if="index==0&&allnum>0"
												class="cu-tag round bg-orange sm">{{allnum}}</text><text
												v-if="index==1&&sysnum>0"
												class="cu-tag round bg-orange sm">{{sysnum}}</text><text
												v-else-if="index==2&&postnum>0"
												class="cu-tag round bg-orange sm">{{postnum}}</text><text
												v-else-if="index==3&&hudongnum>0"
												class="cu-tag round bg-orange sm">{{hudongnum}}</text><text
												v-else-if="index==4&&atnum>0"
												class="cu-tag round bg-orange sm">{{atnum}}</text>
										</view>
									</view>
								</scroll-view>
								<view v-if="messagearray.length>0" class="cu-item"
									v-for="(itemmessage,indexm) in messagearray" :key="indexm">
									<view v-if="itemmessage.avatarlist==0" class="cu-avatar round lg"
										:style="{'background-image': 'url('+ itemicon(itemmessage.type) + ')'}">
										<view v-if="itemmessage.new==1&&syschange[indexm]!=MessageTabCur"
											class="cu-tag badge"></view>
									</view>
									<view v-else class="cu-avatar round lg"
										:style="{'background-image': 'url('+ itemicon(itemmessage.type,itemmessage.avatarlist) + ')'}">
										<view v-if="itemmessage.new==1&&syschange[indexm]!=MessageTabCur"
											class="cu-tag badge"></view>
									</view>
									<img-cache class="cu-avatar round gzlist2"
										v-if="itemmessage.touxiangkuanglist != ''"
										:src="itemmessage.touxiangkuanglist" />
									<view class="content">
										<view class="text-grey">{{todate(itemmessage.dateline)}}<text
												class="cuIcon-roundrightfill text-green margin-left-xs margin-right-xs"><text
													v-if="itemmessage.new==1&&syschange[indexm]!=MessageTabCur"
													class="text-xs"
													@tap="shownotification(itemmessage.note,indexm,'system')">{{$t('home.clicktoviewmore')}}</text><text
													v-else class="text-xs"
													@tap="shownotification(itemmessage.note,-1,'system')">{{$t('home.clicktoviewmore')}}</text></text>
										</view>
										<view class="text-gray text-sm flex">
											<view class="text-cut2">
												{{totext(itemmessage.note)}}
											</view>
										</view>
									</view>
								</view>
							</view>
							<view>
								<block>
									<view class="padding-xs flex align-center bg-gray">
										<view class="flex-sub text-center" @tap="tothebottom()">
											<view class="text-xs padding">
												<text class="text-black">{{loading}}</text>
											</view>
										</view>
									</view>
								</block>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item key="4">
					<scroll-view class="list">
						<view>
							<view class="cu-form-group margin-top hometop3">
								<view class="title">{{$t('home.notr')}}</view>
								<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false">
								</switch>
							</view>
							<view class="cu-form-group">
								<view class="title">{{$t('home.gswitch')}}</view>
								<switch class='cyan' @change="SwitchB" :class="switchB?'checked':''"
									:checked="switchB?true:false"></switch>
							</view>
							<view class="cu-form-group">
								<view class="title">{{$t('home.onlynotread')}}</view>
								<switch class='cyan' @change="SwitchC" :class="switchC?'checked':''"
									:checked="switchC?true:false"></switch>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view class="cu-modal" :class="modalName=='modify'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">{{$t('home.changesuccess')}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{$t('home.changesuccesstxt')}}
				</view>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="hideModal">{{$t('api.ok')}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='needlogin'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">{{$t('api.needlogin')}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{$t('api.needlogintxt')}}
				</view>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">{{$t('api.cancel')}}</button>
						<button class="cu-btn bg-green margin-left" @tap="tologin">{{$t('api.ok')}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='dxcl'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">{{$t('home.rec')}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{$t('home.rectxt')}}
				</view>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="restart">{{$t('home.restart')}}</button>
						<button class="cu-btn bg-green margin-left" @tap="hideModal">{{$t('api.ok')}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='shownotifi'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">{{$t('home.moreinfo')}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<mp-html :content="notifimessage" @linktap="linktap" />
				</view>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="hideModal">{{$t('api.ok')}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "basics",
		data() {
			return {
				scrollLeft: 0,
				iStatusBarHeight: 0,
				chatonline: 0,
				switchvalue: 0,
				switchbvalue: 0,
				chatnumber: 0,
				publicnum: 0,
				privatenum: 0,
				swiperList: [],
				toplist: [],
				tuijiantie: [],
				messagearray: [],
				publicarray: [],
				pvarray: [],
				syschange: [],
				puchange: [],
				pvchange: [],
				loading: this.$t('home.clicktoload'),
				tabjson: [this.$t('home.tabjs1'),this.$t('home.tabjs2'),this.$t('home.tabjs3'),this.$t('home.tabjs4'),this.$t('home.tabjs5')],
				modalName: "",
				chatmessage: "",
				notifimessage: "",
				nowtype: "system",
				chattime: "00:00",
				tabname: [this.$t('home.tabname1'),this.$t('home.tabname2'),this.$t('home.tabname3'),this.$t('home.tabname4'),this.$t('home.tabname5')],
				avatarimgLoaded: false,
				modalName: null,
				TabCur: 1,
				page: 0,
				pagepu: 0,
				pagepv: 0,
				MessageTabCur: 1,
				mynewprompt: 0,
				mynewpm: 0,
				allnum: 0,
				sysnum: 0,
				postnum: 0,
				hudongnum: 0,
				atnum: 0,
				radio: 'A',
				switchA: false,
				switchB: true,
				switchC: false,
				swiperheight: uni.upx2px(1200), //高度
			};
		},
		methods: {
			hideModal(e) {
				this.modalName = null
			},
			tonofi(e) {
				let that = this;
				this.TabCur = 2;
			},
			chonglian(e) {
				//this.modalName = 'dxcl';
				uni.showToast({
					title: this.$t('home.rectxt'),
					icon: 'none',
					duration: 2000
				});
				//chonglian
				uni.getStorage({
					key: 'chatinfo',
					success: function(res) {
						Vue.prototype.$chatuid = res.data.uid;
						Vue.prototype.$auth = res.data.auth;
						Vue.prototype.$htauth = res.data.htauth;
						//console.log(Vue.prototype.$auth);
						//console.log(Vue.prototype.$chatuid);
						if (Vue.prototype.$chatuid != Vue.prototype.$uid) {
							uni.request({
								url: getApp().globalData.zddomain +
									'plugin.php?id=ts2t_qqavatar:ltauth', //获取用户基本信息。
								method: 'GET',
								timeout: 10000,
								data: {
									token: Vue.prototype.$token
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
								},
								success: (res) => {
									//console.log(res.data);
									var that = this;
									uni.setStorage({
										key: 'chatinfo',
										data: res.data,
										success: function() {
											Vue.prototype.$chatuid = res.data.uid;
											Vue.prototype.$auth = res.data.auth;
											Vue.prototype.$htauth = res.data.htauth;
											console.log(Vue.prototype.$chatuid);
											console.log(Vue.prototype.$token);
										}
									});
								}
							});
						}
					},
					fail: function() {
						uni.request({
							url: getApp().globalData.zddomain +
							'plugin.php?id=ts2t_qqavatar:ltauth', //获取用户基本信息。
							method: 'GET',
							timeout: 10000,
							data: {
								token: Vue.prototype.$token
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
							},
							success: (res) => {
								//console.log(res.data);
								var that = this;
								uni.setStorage({
									key: 'chatinfo',
									data: res.data,
									success: function() {
										Vue.prototype.$chatuid = res.data.uid;
										Vue.prototype.$auth = res.data.auth;
										console.log(Vue.prototype.$chatuid);
									}
								});
							}
						});
					}
				})
				let data = {
					"from": "bbs.zdfx.net",
					"id": this.$uid,
					"username": this.$username,
					"sign": "",
					"avatar": "https://zd.tiangal.com/uc_server/avatar.php?uid=" + this.$uid + "&size=small&ts=1",
					"allowmoney": 0,
					"adminid": this.$adminid,
					"groupids": [],
					"admingroupids": [],
					"anonymous": 0,
					"anonymous_group": "0",
					"auth": this.$auth,
					"cmd": "login"
				};
				//console.log(data);
				this.$socket.send(JSON.stringify(data));
				//end
			},
			restart(e) {
				plus.runtime.restart();
			},
			tologin(e) {
				uni.redirectTo({
					url: '../../components/ay-login/login-password'
				});
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			onSuccessImg() {
				this.avatarimgLoaded = true;
			},
			groupchatupdate(e) {
				this.chatonline = e;
			},
			chatmessageupdate(e) {
				this.chattime = e.timestamp.substr(0, e.timestamp.length - 3);
				this.chatmessage = e.username + ":" + e.content;
			},
			gonggongqunzu() {
				//console.log(e);
				uni.navigateTo({
					url: '../component/chat',
					animationType: 'pop-in',
					animationDuration: 200
				});
				this.chatnumber = 0;
			},
			SwitchA(e) {
				this.switchA = e.detail.value
				if (e.detail.value) {
					this.switchvalue = 1;
				} else {
					this.switchvalue = 2;
				}
				let that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:moshengrenxiaoxi', //获取设置
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						switch: that.switchvalue,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.code == 200) {
							getApp().globalData.onlyacceptfriendpm = that.switchvalue;
							this.modalName = "modify";
						}
					}
				});
			},
			SwitchB(e) {
				this.switchB = e.detail.value
				if (e.detail.value) {
					this.switchbvalue = 0;
				} else {
					this.switchbvalue = 1;
				}
				let that = this;
				uni.setStorage({
					key: 'chatswitch',
					data: that.switchbvalue,
					success: function() {
						Vue.prototype.$switchbvalue = that.switchbvalue
						console.log(Vue.prototype.$switchbvalue);
					}
				});
			},
			SwitchC(e) {
				this.switchC = e.detail.value
				if (e.detail.value) {
					this.switchcvalue = 1;
				} else {
					this.switchcvalue = 0;
				}
				let that = this;
				uni.setStorage({
					key: 'weiduswitch',
					data: that.switchcvalue,
					success: function() {
						Vue.prototype.$switchcvalue = that.switchcvalue
						console.log(Vue.prototype.$switchcvalue);
					}
				});
				this.page = 0;
				console.log(that.switchcvalue);
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:notification', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						page: that.page,
						type: 'system',
						new: that.switchcvalue

					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.code == 404) {
							that.loading = this.$t('home.nomoremessage');
							that.messagearray = [];
							return;
						}
						console.log(res.data);
						that.messagearray = res.data;
						that.loading = this.$t('home.clicktoload');
						that.heightset('listnow1');
					}
				});
			},
			tabheight(e) {
				if (e == 0) {
					this.heightset('listnow0');
				} else if (e == 1) {
					this.heightset('listnow1');
				} else if (e == 2) {
					this.heightset('listnow2');
				} else if (e == 3) {
					this.swiperheight = uni.upx2px(1200);
				} else if (e == 4) {
					this.swiperheight = uni.upx2px(1200);
				}
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				//console.log(this.swiperheight)
				this.tabheight(this.TabCur);
			},
			MtabSelect(e) {
				this.MessageTabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				//console.log(this.swiperheight);
				this.page = 0;
				this.loading = this.$t('api.loading');
				this.messagearray = [];
				if (this.MessageTabCur == 0) {
					this.requestnoti('all');
				} else if (this.MessageTabCur == 1) {
					this.requestnoti('system');
				} else if (this.MessageTabCur == 2) {
					this.requestnoti('post');
				} else if (this.MessageTabCur == 3) {
					this.requestnoti('hudong');
				} else if (this.MessageTabCur == 4) {
					this.requestnoti('at');
				}
			},
			tabChange(e) {
				this.TabCur = e.detail.current;
				var that = this;
				this.tabheight(this.TabCur);
			},
			getchatmessage(e) {
				var that = this;
				uni.request({
					url: 'https://lt.zdfx.net:8089/index.php?m=im&a=chatlog&from=bbs.zdfx.net&id=-1&type=group', //获取轮播列表
					method: 'GET',
					timeout: 10000,
					data: {
						uid: that.$uid,
						page: 0,
						auth: that.$htauth
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						let chatmess = JSON.parse(res.data.substr(1, (res.data.length - 2)));
						console.log(that.$chatid);
						if (that.$chatid == 0) {
							uni.setStorage({
								key: 'chatchannel',
								data: chatmess[4].cid,
								success: function() {
									Vue.prototype.$chatid = chatmess[4].cid
									//console.log(Vue.prototype.$switchbvalue);
								}
							});
						} else {
							that.chatnumber = chatmess[4].cid - that.$chatid;
							if (that.chatnumber > 99) {
								that.chatnumber = "99+";
							}
							that.chatmessage = chatmess[4].username + ":" + chatmess[4].content
							that.chattime = chatmess[4].timestamp.substr(0, chatmess[4].timestamp.length - 3);
						}
						//console.log(that.$htauth);
						//console.log(that.$uid);
					}
				});
			},
			tourl(e) {
				console.log(this.swiperheight)
			},
			itemicon(e, f) {
				if (e == 'system') {
					return '../../static/systempm.png';
				} else if (e == 'magic') {
					return '../../static/systempm.png';
				} else if (e == 'report') {
					return '../../static/systempm.png';
				} else if (e == 'task') {
					return '../../static/task.gif';
				} else {
					return f;
				}
			},
			todate(e) {
				let date = new Date(e * 1000);
				let nowdate = new Date();
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1 < 10 ? '' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let D = date.getDate() + ' ';
				let NY = nowdate.getFullYear() + '-';
				let NM = (nowdate.getMonth() + 1 < 10 ? '' + (nowdate.getMonth() + 1) : nowdate.getMonth() + 1) + '-';
				let ND = nowdate.getDate() + ' ';
				let h = date.getHours()< 10 ?  '0'  + date.getHours() + ':': date.getHours() + ':';
				let m = date.getMinutes()< 10 ?  '0'  + date.getMinutes() + ':': date.getMinutes() + ':';
				let s = date.getSeconds()< 10 ?  '0'  + date.getSeconds(): date.getSeconds();
				//console.log(Y+M+D+h+m+s);
				if(Y==NY&&M==NM&&D==ND){
					return h + m + s;
				}else{
					return Y + M + D + h + m + s;
				}
			},
			totext(e) {
				e = e.replace(/&nbsp;/ig, '');
				e = e.replace(/&rsaquo;/ig, '');
				return e.replace(/<[^>]+>/g, "");
			},
			tomessage(e,f,g){
				if(f!=g){
					return this.$t('home.toother') + e + this.$t('home.say');
				}else{
					return e + this.$t('home.toyou');
				}
			},
			shuaxinlist() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				});
			},
			shownotification(e, f, g) {
				e = e.replace(/&nbsp;/ig, '');
				e = e.replace(/&rsaquo;/ig, '');
				e = e.replace(/\href=/ig, 'apphref=');
				this.notifimessage = e;
				this.modalName = 'shownotifi';
				if(g == 10){
					this.publicnum--;
					this.puchange[f] = 1;
				}
				if (f >= 0) {
					this.syschange[f] = this.MessageTabCur;
					if (this.MessageTabCur == 1) {
						this.sysnum--;
						this.allnum--;
					} else if (this.MessageTabCur == 0) {
						this.allnum--;
					} else if (this.MessageTabCur == 2) {
						this.postnum--;
						this.allnum--;
					} else if (this.MessageTabCur == 3) {
						this.hudongnum--;
						this.allnum--;
					} else if (this.MessageTabCur == 4) {
						this.atnum--;
						this.allnum--;
					}
					console.log(this.hudongnum)
				}
			},
			setHeight(e) {
				var query = uni.createSelectorQuery();
				query.select('.' + e).boundingClientRect(rect => {
					if (rect) {
						//console.log(e + ".height = " + rect.height)
						let a = uni.upx2px(1200);
						let b = uni.upx2px(1000);
						if (this.swiperheight > a || rect.height > b) {
							this.swiperheight = rect.height + uni.upx2px(200); //页面可见区域 - 头部高度
						} else if (this.swiperheight < a || rect.height < b) {
							this.swiperheight = uni.upx2px(1200);
						}
						//console.log("this.height = " + this.swiperheight)
					}
				}).exec();
			},
			heightset(e) {
				var that = this;
				if (uni.getSystemInfoSync().platform == 'ios') {
					setTimeout(function() {
						that.setHeight(e);
						setTimeout(function() {
							that.setHeight(e);
							setTimeout(function() {
								that.setHeight(e);
								setTimeout(function() {
									that.setHeight(e);
									setTimeout(function() {
										that.setHeight(e);
									}, 100);
								}, 100);
							}, 100);
						}, 100);
					}, 100);
				} else {
					setTimeout(function() {
						that.setHeight(e);
						setTimeout(function() {
							that.setHeight(e);
							setTimeout(function() {
								that.setHeight(e);
								setTimeout(function() {
									that.setHeight(e);
									setTimeout(function() {
										that.setHeight(e);
									}, 200);
								}, 200);
							}, 200);
						}, 200);
					}, 200);
				}
			},
			tothebottom(push) {
				console.log('到底了')
				var that = this;
				this.loading = this.$t('api.loading')
				if (this.TabCur == 0) {
					this.pvread();
				}
				if (this.TabCur == 1) {
					this.publishread();
				}
				if (this.TabCur == 2) {
					if (this.MessageTabCur == 0) {
						this.requestnoti('all');
					} else if (this.MessageTabCur == 1) {
						this.requestnoti('system');
					} else if (this.MessageTabCur == 2) {
						this.requestnoti('post');
					} else if (this.MessageTabCur == 3) {
						this.requestnoti('hudong');
					} else if (this.MessageTabCur == 4) {
						this.requestnoti('at');
					}
				}
			},
			requestnoti(e) {
				var that = this;
				if (this.nowtype == e) {
					that.page++
				}
				this.nowtype = e;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:notification', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						page: that.page,
						type: e,
						new: that.$switchcvalue
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (that.page == 0) {
							if (res.data.code == 404) {
								that.loading = that.$t('home.nomoremessage');
								that.messagearray = [];
								return;
							}
							console.log(res.data);
							that.messagearray = res.data;
							that.heightset('listnow2');
							if (res.data.length < 30) {
								that.loading = that.$t('home.mstotheend');
							} else {
								that.loading = that.$t('home.clicktoload');
							}
						} else {
							if (res.data.length > 0) {
								for (let i = 0; i < res.data.length; ++i) {
									that.messagearray.push(res.data[i]);
								}
							}
							if (res.data.length < 30 || res.data.code == 404) {
								that.loading = that.$t('home.mstotheend');
							} else {
								that.loading = that.$t('home.clicktoload');
							}
							that.heightset('listnow2');
						}
					}
				});
			},
			publishread() {
				let that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:pmview', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						page: ++that.pagepu,
						type: 'public',
						new: that.$switchcvalue
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (that.pagepu == 0) {
							if (res.data.code == 404) {
								that.loading = that.$t('home.nomoremessage');
								that.publicarray = [];
								return;
							}
							console.log(res.data);
							that.publicarray = res.data;
							that.heightset('listnow1');
							if (res.data.length < 30 || res.data.code == 404) {
								that.loading = that.$t('home.mstotheend');
							} else {
								that.loading = that.$t('home.clicktoload');
							}
						} else {
							if (res.data.length > 0) {
								for (let i = 0; i < res.data.length; ++i) {
									that.publicarray.push(res.data[i]);
								}
							}
							if (res.data.length < 30) {
								that.loading = that.$t('home.mstotheend');
							} else {
								that.loading = that.$t('home.clicktoload');
							}
							that.heightset('listnow1');
						}
					}
				});
			},
			pvread() {
				let that = this;
				console.log(this.pagepv);
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:pmview', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						page: ++that.pagepv,
						type: 'private',
						new: that.$switchcvalue
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (that.pagepv == 0) {
							if (res.data.code == 404) {
								that.loading = that.$t('home.nomoremessage');
								that.pvarray = [];
								return;
							}
							console.log(res.data);
							that.pvarray = res.data;
							that.heightset('listnow0');
							if (res.data.length < 30 || res.data.code == 404) {
								that.loading = that.$t('home.mstotheend');
							} else {
								that.loading = that.$t('home.clicktoload');
							}
						} else {
							if (res.data.length > 0) {
								for (let i = 0; i < res.data.length; ++i) {
									that.pvarray.push(res.data[i]);
								}
							}
							if (res.data.length < 30) {
								that.loading = that.$t('home.mstotheend');
							} else {
								that.loading = that.$t('home.clicktoload');
							}
							that.heightset('listnow0');
						}
					}
				});
			},
			addfriend(e) {
				var that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:friend', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						fuid: e,
						action: "pass"
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.code == 200) {
							uni.showToast({
								title: that.$t('home.addedsuccess'),
								duration: 2000
							});
						} else {
							if (res.data.result == 'error0032') {
								uni.showToast({
									title: that.$t('home.fnotexist'),
									icon: 'error',
									duration: 2000
								});
							} else if (res.data.result == 'error0031') {
								uni.showToast({
									title: that.$t('home.dfriend'),
									icon: 'error',
									duration: 2000
								});
							} else {
								uni.showToast({
									title: that.$t('home.friendfail'),
									icon: 'error',
									duration: 2000
								});
							}
						}
					}
				});
			},
			linktap(e) {
				console.log(e);
				let indexpd = e.apphref.indexOf("thread-");
				let indexpe = e.apphref.indexOf("mod=redirect");
				let indexpf = e.apphref.indexOf("mod=space");
				let indexpg = e.apphref.indexOf("ac=friend");
				let indexph = e.apphref.indexOf("op=add");
				if (indexpd > 0) {
					console.log(1);
					let href = e.apphref.match(/^(\D*)(\d+)(.*)$/).slice(1);
					uni.navigateTo({
						url: '../component/card?tid=' + href[1],
						animationType: 'pop-in',
						animationDuration: 200
					});
				} else if (indexpe > 0) {
					console.log(2);
					let href = e.apphref.split('tid=');
					let href2 = href[1].match(/^(\D*)(\d+)(.*)$/).slice(1);
					if(e.apphref.indexOf("pid=")){
						let href = e.apphref.split('pid=');
						let href2 = href[1].match(/^(\D*)(\d+)(.*)$/).slice(1);
						 uni.showLoading({
							title: this.$t('api.loading')
						});
						uni.request({
							url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:pidtotid', //获取轮播列表
							method: 'GET',
							timeout: 10000,
							data: {
								pid: href2[1]
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
							},
							success: (res) => {
								uni.navigateTo({
									url: '../component/card?tid=' + res.data.tid,
									animationType: 'pop-in',
									animationDuration: 200
								});
								uni.hideLoading();
							}
						});
					}else{
						uni.navigateTo({
							url: '../component/card?tid=' + href2[1],
							animationType: 'pop-in',
							animationDuration: 200
						});
					}
				} else if (indexpf > 0) {
					console.log(3);
					let href = e.apphref.split('uid=');
					let href2 = href[1].match(/^(\D*)(\d+)(.*)$/).slice(1);
					if (indexpg > 0 && indexph > 0) {
						this.addfriend(href2[1]);
						return;
					}
					uni.navigateTo({
						url: '../component/list?uid=' + href2[1],
						animationType: 'pop-in',
						animationDuration: 200
					});
				} else if (e.target == 'forum') {
					let href = e.apphref.match(/^(\D*)(\d+)(.*)$/).slice(1);
					uni.navigateTo({
						url: '../basics/forum?forumid=' + href[1],
						animationType: 'pop-in',
						animationDuration: 200
					});
				}
			},
			topm(e,f) {
				console.log(e);
				uni.navigateTo({
					url: '../extra/pm?touid=' + e + '&username=' + f,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
		},
		created() {
			if (this.$token == "") {
				this.modalName = "needlogin";
			}
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			this.getchatmessage();
			let data = {
				"cmd": "onlinecheck",
				"type": "group",
				"id": -1
			};
			this.$socket.send(JSON.stringify(data));
			if (getApp().globalData.onlyacceptfriendpm == 1) {
				this.switchA = true;
			};
			plus.navigator.setStatusBarStyle('light'); //改变系统标题颜色
			var that = this;
			uni.getStorage({
				key: 'chatswitch',
				success: function(res) {
					if (res.data == 1) {
						that.switchB = false;
					}
				}
			});
			uni.getStorage({
				key: 'weiduswitch',
				success: function(res) {
					if (res.data == 1) {
						that.switchC = true;
					}
				}
			});
			uni.request({
				url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:notification', //获取置顶帖子
				method: 'GET',
				timeout: 10000,
				data: {
					token: that.$token,
					page: that.page,
					type: 'system',
					new: that.$switchcvalue
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: (res) => {
					if (res.data.code == 404) {
						that.loading = this.$t('home.nomoremessage');
						that.messagearray = [];
						return;
					}
					console.log(res.data);
					if (that.TabCur == 2) {
						that.heightset('listnow2');
					}
					that.messagearray = res.data;
					if (res.data.length < 30) {
						that.loading = this.$t('home.nomorenotifi');
					} else {
						that.loading = this.$t('home.clicktoload');
					}
				}
			});
			uni.request({
				url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:pmview', //获取置顶帖子
				method: 'GET',
				timeout: 10000,
				data: {
					token: that.$token,
					page: that.pagepu,
					type: 'public',
					new: that.$switchcvalue
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: (res) => {
					if (res.data.code == 404) {
						that.loading = this.$t('home.nomoremessage');
						that.publicarray = [];
						return;
					}
					console.log(res.data);
					that.publicarray = res.data;
					if (that.TabCur == 1) {
						that.heightset('listnow1');
					}
					if (res.data.length < 30) {
						that.loading = this.$t('home.nomoremessage');
					} else {
						that.loading = this.$t('home.clicktoload');
					}
				}
			});
			uni.request({
				url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:pmview', //获取置顶帖子
				method: 'GET',
				timeout: 10000,
				data: {
					token: that.$token,
					page: that.pagepv,
					type: 'private',
					new: that.$switchcvalue
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: (res) => {
					if (res.data.code == 404) {
						that.loading = this.$t('home.nomoremessage');
						that.pvarray = [];
						return;
					}
					console.log(res.data);
					that.pvarray = res.data;
					if (that.TabCur == 0) {
						that.heightset('listnow0');
					}
					if (res.data.length < 30) {
						that.loading = this.$t('home.nomoremessage');
					} else {
						that.loading = this.$t('home.clicktoload');
					}
				}
			});
			uni.request({
				url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:notification', //获取置顶帖子
				method: 'GET',
				timeout: 10000,
				data: {
					token: that.$token,
					page: that.page,
					type: 'num'
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: (res) => {
					console.log(res.data);
					that.allnum = res.data.all;
					that.mynewprompt = res.data.all;
					that.sysnum = res.data.sys;
					that.postnum = res.data.post;
					that.hudongnum = res.data.hudong;
					that.atnum = res.data.at;
				}
			});
			uni.request({
				url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:pmview', //获取置顶帖子
				method: 'GET',
				timeout: 10000,
				data: {
					token: that.$token,
					page: that.page,
					type: 'num'
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: (res) => {
					console.log(res.data);
					that.publicnum = res.data.public;
					that.privatenum = res.data.private;
				}
			});
		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight + uni.upx2px(100) + uni.getSystemInfoSync().statusBarHeight
					this.swiperheight = height;
				}
			})
			plus.navigator.setStatusBarStyle('dark'); //改变系统标题颜色
			var that = this;
			setTimeout(function() {
				console.log(that.chatonline);
				if (that.chatonline == 0) {
					that.chonglian();
				}
			}, 2000)
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}

	.nav-sm {
		white-space: nowrap;
	}

	.nav-sm .cu-item.cur {
		border-bottom: 2px solid;
	}

	.nav-sm .cu-item {
		height: 30px;
		display: inline-block;
		line-height: 30px;
		margin: 0 5px;
		padding: 0 11px;
	}

	.cu-list.menu-avatar>.cu-item .content {
		width: 100%;
	}

	.cu-list.menu-avatar>.cu-item {
		border-bottom: 1px solid #ddd;
		border-radius: inherit;
	}

	.cu-list.menu-avatar>.cu-item .flex .text-cut2 {
		max-width: 590upx !important;
	}

	.text-cut2 {
		text-overflow: ellipsis;
		overflow: hidden;
		height: 3.2em;
		line-height: 1.6;
		display: block;
	}

	.gzlist2 {
		position: absolute;
		background-color: transparent;
		margin: -0upx 0 0 -28upx;
		width: 150upx;
		height: 150upx;
	}
</style>
