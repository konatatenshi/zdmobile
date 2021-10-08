<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true" class="text-shadow1">
				<block slot="backText">返回</block>
				<block slot="right">
					<view class="action">
						<view class="cu-load cuIcon-mail padding-left-sm text-shadow1" @tap="more()"></view>
						<view class="cu-load cuIcon-more padding-left-sm text-shadow1" @tap="more()"></view>
					</view>
				</block>
		</cu-custom>
		<view :style="{'background-image': 'url('+iconlist+')'}" :scroll-y="modalName==null" class="page"
			:class="modalName!=null?'show':''">
			<view class="cu-card dynamic cu-list2 menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar2 round border-custom" :style="{'background-image': 'url('+avatar+')'}">
					</view>
					<view class="content flex-sub">
						<view class="text-black">&nbsp;</view>
						<view class="text-black text-sm flex justify-end">
							&nbsp;
							<view class="text-black text-sm">
								<view class="margin-tb-sm text-center padding-right-xl"><button
										class="padding-left-xl padding-right-xl cu-btn round bg-purple border-custom" v-if="!woguanzhu">关注</button><button
										class="padding-left-xl padding-right-xl cu-btn round bg-purple border-custom" v-else>取关</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-trans no-border ">
				<view class="action">
					<text class="margin-left-xs text-xxl text-black text-bold text-shadow2">{{username}}</text>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" v-if="$adminid>0" @tap="showModal"
						data-target="menuModal">管理按钮</button>
				</view>
			</view>
			<view class="cu-list grid col-1 no-border solid-bottom">
				<view class="text-black text-content margin-left-sm text-left "><text
						class="text-shadow1">UID:{{uid}}</text><text
						class="margin-left-xs cuIcon-copy text-shadow1" @tap="copy(uid)"></text><text
						class="margin-right-xs margin-left-xs cuIcon-titles" style="color: #f5f5f5;"></text><text
						class="text-shadow1">点龄：{{age}}年</text><text class="margin-right-xs margin-left-xs cuIcon-titles"
						style="color: #f5f5f5;"></text><text v-if="sex==1" class="cuIcon-male text-shadow1"></text><text v-else-if="sex==2" class="cuIcon-female text-shadow1"></text><text v-else class="cuIcon-question text-shadow1"></text></view>
				<view class="flex justify-start padding-left-sm">
					<view class="text-black text-content text-cut text-left text-shadow1" style="width: 75%;">{{sig}}</view>
					<view class="text-right text-black text-shadow1" style="width: 25%;">关于Ta<text
							class="margin-left-xs cuIcon-right"></text></view>
				</view>
				<view class="flex justify-start padding-left-sm padding-top-sm">
					<view class="text-xl text-black text-bold text-shadow2">{{zan}}</view>
					<view class="padding-left-sm padding-right-xl text-black text-shadow1">获赞</view>
					<view class="text-xl text-black text-bold text-shadow2">{{guanzhu}}</view>
					<view class="padding-left-xs padding-right-xl text-black text-shadow1">关注</view>
					<view class="text-xl text-black text-bold text-shadow2">{{fensi}}</view>
					<view class="padding-left-sm padding-right-sm text-black text-shadow1">粉丝</view>
				</view>
			</view>


			<scroll-view scroll-x class="bg-white nav">
				<view class="cu-item padding-left-xl padding-right-xl"
					:class="TabCur==0?'text-black text-bold cur':'text-black'" @tap="tabSelect(0)">
					Ta 的帖子 {{fatie}}
				</view>
				<view class="cu-item padding-left-xl padding-right-xl"
					:class="TabCur==1?'text-black text-bold cur':'text-black'" @tap="tabSelect(1)">
					Ta 的回复 {{huitie}}
				</view>
			</scroll-view>

			<view class="cu-bar bg-gray border-custom2">
				<scroll-view v-if="TabCur==0" class="list">
					<view class="view_listnow">
						<view class="hometop3">
						</view>
						<view v-if="guanzhupost.length > 0">
							<block v-for="(itemex,indexe1) in guanzhupost" :key="indexe1">
								<view class="solid-bottom text-df article"
									style="padding-top: 10upx; padding-bottom: 10upx;" @tap="tourl(itemex.url)">
									<view style="margin-right: 20upx;padding-left: 80upx;" class="text-black text-cut">
										{{itemex.title}}
									</view>
									<view style="padding-left: 80upx;">
										<view>
											<img-cache class="cu-avatar4 round gzlist" :src="itemex.avatar" />
											</img-cache>
											<img-cache class="cu-avatar4 round gzlist2"
												v-if="itemex.touxiangkuanglist != ''" :src="itemex.touxiangkuanglist" />
											</img-cache>
										</view>
										<view class="cu-tag padding-left-xs padding-right-xs"
											:class="loadlevelicon2(itemex.fid)">
											{{itemex.bkname}}
										</view><text class="text-sm text-gray"
											style="padding-left: 8upx;">{{itemex.author}}&nbsp&nbsp{{itemex.replies}}评&nbsp&nbsp{{itemex.nowdate}}</text>
										<img-cache v-if="itemex.img!='static/image/common/nophoto.gif'"
											mode="aspectFill" class="gzlist3" :src="itemex.img" />
									</view>
									<view v-if="itemex.img=='static/image/common/nophoto.gif'" class="text-grey"
										style="padding-left: 10upx;padding-top: 5upx;">
										{{itemex.summary}}
									</view>
									<view v-else class="text-grey"
										style="line-height:35upx; font-size: 25upx; padding-left: 10upx; padding-right: 100upx;padding-top: 5upx;text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
										</img-cache>{{itemex.summary}}
									</view>
								</view>
							</block>
						</view>
						<view>
							<block>
								<view class="padding-xs flex align-center bg-gray">
									<view class="flex-sub text-center">
										<view class="text-xs padding">
											<text class="text-black">{{loading}}</text>
										</view>
									</view>
								</view>
							</block>
						</view>
					</view>
				</scroll-view>
				<scroll-view v-else-if="TabCur==1" class="list">
					<view class="view_listnow">
						<view class="hometop3">
						</view>
						<view v-if="huifupost.length > 0">
							<block v-for="(iteme2,indexe2) in huifupost" :key="indexe2">
								<view class="solid-bottom text-df article"
									style="padding-top: 10upx; padding-bottom: 10upx;" @tap="tourl(iteme2.url)">
									<view style="margin-right: 20upx;padding-left: 80upx;" class="text-black text-cut">
										{{iteme2.title}}
									</view>
									<view style="padding-left: 80upx;">
										<view>
											<img-cache class="cu-avatar4 round gzlist" :src="iteme2.avatar" />
											</img-cache>
											<img-cache class="cu-avatar4 round gzlist2"
												v-if="iteme2.touxiangkuanglist != ''" :src="iteme2.touxiangkuanglist" />
											</img-cache>
										</view>
										<view class="cu-tag padding-left-xs padding-right-xs"
											:class="loadlevelicon2(iteme2.fid)">
											{{iteme2.bkname}}
										</view><text class="text-sm text-gray"
											style="padding-left: 8upx;">{{iteme2.author}}&nbsp&nbsp{{iteme2.replies}}楼&nbsp&nbsp{{iteme2.nowdate}}</text>
										<img-cache v-if="iteme2.img!='static/image/common/nophoto.gif'"
											mode="aspectFill" class="gzlist3" :src="iteme2.img" />
									</view>
									<view v-if="iteme2.img=='static/image/common/nophoto.gif'" class="text-grey"
										style="padding-left: 10upx;padding-top: 5upx;">
										{{iteme2.summary}}
									</view>
									<view v-else class="text-grey"
										style="line-height:35upx; font-size: 25upx; padding-left: 10upx; padding-right: 100upx;padding-top: 5upx;text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
										</img-cache>{{iteme2.summary}}
									</view>
								</view>
							</block>
						</view>
						<view>
							<block>
								<view class="padding-xs flex align-center bg-gray">
									<view class="flex-sub text-center">
										<view class="text-xs padding">
											<text class="text-black">{{loading}}</text>
										</view>
									</view>
								</view>
							</block>
						</view>
					</view>
				</scroll-view>
				<view class="cu-modal" :class="jifencaozuo!=0?'show':''">
					<button class="cu-btn margin-sm basis-sm shadow bg-orange"
						:class="jifencaozuo==1?'animation-scale-up':'animation-reverse animation-scale-down'">
						<text class="text-xl text-white text-shadow">{{jifenshuoming}}：</text><text
							class="text-xl text-white text-shadow">{{jifenbiangeng}}</text>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				page0: 0,
				page1: 0,
				Page:[0,0,0,0,0,0,0,0],
				uid: 0,
				age: 0,
				fatie: 0,
				fensi: 0,
				guanzhu: 0,
				huitie: 0,
				iconlist: "",
				sex: 0,
				sig: '',
				username: "加载中……",
				zan: 0,
				woguanzhu: 0,
				scrollhight: 0,
				swiperheight: 0,
				avatar: '',
				guanzhupost: [],
				huifupost: [],
				loading: '加载中……',
				listTouchDirection: null,
				TabCur: 0,
				jifenbiangeng: '积分名+1',
				jifenshuoming: '积分变更',
				jifencaozuo: 0,
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
				this.TabCur = e;
				this.shuaxinlist();
			},
			copy(e){
				var that = this;
				uni.setClipboardData({
				    data: e,
				    success: function () {
				        //that.jifenbiandong('复制成功',e + '已复制');
				    }
				});
			},
			getavatar(e) {
				if (this.$imageswitch && this.$wifi == 0) {
					return e;
				} else {
					return e.replace("small", "big");
				}
			},
			shuaxinlist() {
				var that = this;
				that.loading = '载入中...';
				if (this.TabCur == 0) {
					this.page0 = 0;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 3,
							page: that.page0,
							touid: that.uid
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data.post);
							console.log(res.data.userinfo);
							that.guanzhupost = res.data.post;
							if (res.data.post.length < 30) {
								that.loading = '已经到底了！';
							}else{
								that.loading = '下滑加载更多';
							}
							if(that.page0 ==0){
								that.uid = res.data.userinfo.uid;
								that.age = res.data.userinfo.age;
								that.fatie = res.data.userinfo.fatie;
								that.fensi = res.data.userinfo.fensi;
								that.guanzhu = res.data.userinfo.guanzhu;
								that.huitie = res.data.userinfo.huitie;
								that.iconlist = res.data.userinfo.iconlist;
								that.sex = res.data.userinfo.sex;
								that.sig = res.data.userinfo.sig;
								that.username = res.data.userinfo.username;
								that.zan = res.data.userinfo.zan;
								that.avatar = that.getavatar(res.data.userinfo.avatarlist);
								that.woguanzhu = res.data.userinfo.woguanzhu;
							}
							that.page0++;
							setTimeout(function() {
								//that.setHeight("view_listnow");
							}, 100)
						}
					});
				} else if (this.TabCur == 1) {
					this.page1 = 0;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 4,
							page: that.page1,
							touid: that.uid
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data.post);
							that.huifupost = res.data.post;
							if (res.data.post.length < 30) {
								that.loading = '已经到底了！';
							}else{
								that.loading = '下滑加载更多';
							}
							console.log(res.data.length);
							that.page1++;
							setTimeout(function() {
								//that.setHeight("view_listnow");
							}, 100)
						}
					});
				}
			},
			setHeight(e) {
			},
			loadlevelicon2(e) {
				if (e % 10 == 0) {
					return 'line-red';
				} else if (e % 10 == 1) {
					return 'line-orange';
				} else if (e % 10 == 2) {
					return 'line-olive';
				} else if (e % 10 == 3) {
					return 'line-green';
				} else if (e % 10 == 4) {
					return 'line-cyan';
				} else if (e % 10 == 5) {
					return 'line-blue';
				} else if (e % 10 == 6) {
					return 'line-purple';
				} else if (e % 10 == 7) {
					return 'line-mauve';
				} else if (e % 10 == 8) {
					return 'line-pink';
				} else if (e % 10 == 9) {
					return 'line-brown';
				}
			},
			tothebottom(push) {
				var that = this;
				if (that.TabCur == 0) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 3,
							page: that.page0,
							touid: that.uid
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(that.page0);
							push = res.data.post;
							console.log(push);
							if (push.length > 0) {
								for (let i = 0; i < push.length; ++i) {
									that.guanzhupost.push(push[i]);
								}
							}
							if (push.length < 30) {
								that.loading = '竟然到底了！';
							}else{
								that.loading = '下滑加载更多';
							}
							that.page0++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
						}
					});
				} else if (that.TabCur == 1) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 4,
							page: that.page1,
							touid: that.uid
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(that.page1);
							push = res.data.post;
							console.log(push);
							if (push.length > 0) {
								for (let i = 0; i < push.length; ++i) {
									that.huifupost.push(push[i]);
								}
							}
							if (push.length < 30) {
								that.loading = '竟然到底了！';
							}else{
								that.loading = '下滑加载更多';
							}
							that.page1++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
						}
					});
				}
				console.log("到底了");
			},
			jifenbiandong(e, f) {
				this.jifenshuoming = e;
				this.jifenbiangeng = f;
				this.jifencaozuo = 1;
				setTimeout(() => {
					this.jifencaozuo = 2;
				}, 1000)
				setTimeout(() => {
					this.jifencaozuo = 0;
				}, 2000)
			},
			tourl(e) {
				uni.navigateTo({
					url: '../component/card?tid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
		},
		onLoad: function(option) {
			this.uid = option.uid;
			//this.uid = 19;
			//console.log(option.uid); //打印出上个页面传递的参数。
			//this.loadthread(this.uid);
			this.shuaxinlist();
			console.log(this.avatar);
		},
		onReady() {
			plus.navigator.setStatusBarStyle('dark'); //改变系统标题颜色
		},
		onReachBottom() {
			console.log("到底了");
			this.tothebottom();
		},
		onPageScroll(res) {
			this.scrollhight = res.scrollTop;
			//console.log(res.scrollTop);//距离页面顶部距离
		},
	}
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}

	.cu-avatar2 {
		font-variant: small-caps;
		margin: 0;
		padding: 0;
		display: inline-flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		color: #ffffff;
		white-space: nowrap;
		position: relative;
		width: 190upx;
		height: 190upx;
		background-size: cover;
		background-position: center;
		vertical-align: middle;
		font-size: 1.5em;
		position: absolute;
		left: 40upx;
	}

	.cu-list2.menu-avatar>.cu-item {
		position: relative;
		display: flex;
		padding-right: 5px;
		height: 200upx;
		background-color: transparent;
		justify-content: flex-end;
		align-items: center;
		transition: all .6s ease-in-out 0s;
		-webkit-transform: translateX(0px);
		transform: translateX(0px);
	}

	.cu-list.grid.no-border {
		margin-top: 0px;
		padding-top: 0px;
		background-color: transparent;
	}

	.page {
		background: #efeff4;
		background-repeat: no-repeat;
		background-position: top right;
		background-size: auto 550upx;
	}

	.text-shadow1 {
		text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
	}

	.text-shadow2 {
		text-shadow: -2px 0 white, 0 2px white, 2px 0 white, 0 -2px white;
	}

	.border-custom2 {
		border-top: 10upx solid #f1f1f1;
	}

	.text-df {
		background-color: #FFFFFF !important;
		border-radius: 8%;
		background-position-y: 50%;
		border-top: 6upx solid #f1f1f1;
		border-bottom: 6upx solid #f1f1f1;
		border-left: 15upx solid #f1f1f1;
		border-right: 15upx solid #f1f1f1;
	}

	.border-custom {
		border: 6upx solid white;
	}

	.gzlist {
		position: absolute;
		margin: -33upx 0 0 -75upx;
	}

	.gzlist2 {
		position: absolute;
		background-color: transparent!important;
		margin: -47upx 0 0 -88upx!important;
		width: 86upx!important;
		height: 86upx!important;
	}

	.gzlist3 {
		position: absolute;
		right: 10upx;
		margin: 34upx 0 0 -105upx;
		width: 95upx;
		height: 72upx;
	}

	.cu-avatar4 {
		justify-content: center;
		align-items: center;
		background-color: #ccc;
		color: #ffffff;
		width: 32px;
		height: 32px;
		background-size: cover;
		background-position: center;
		vertical-align: middle;
		font-size: 1.5em;
	}
	
	.padding-left-sm .padding-right-xl .text-black .text-shadow1{
		margin-top: 10upx;
	}
	.text-xl{
		font-size: 30upx!important;
	}
	
</style>
