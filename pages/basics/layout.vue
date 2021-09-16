<!-- 搜索页面 -->
<template name="basics">
	<view>
		<cu-custom class="statustop" bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">搜索内容</block>
			<block slot="right">
				<view class="action">
					<view class="padding-left cu-load cuIcon-refresh" @tap="refresh()"></view>
				</view>
			</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav-sm" :style="'margin-top: -' + iStatusBarHeight +'px;'"
			scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in tabarray"
				:key="index" @tap="tabSelect" :data-id="index">
				{{tabname[index]}}
			</view>
		</scroll-view>
		<view class="view_head">
			<view class="swiper-box" :style="'height: ' + swiperheight +'px;'">
					<view class="view_listnow">
						<view v-if="threadlist.length > 0">
							<block v-for="(item,index2) in threadlist" :key="index2">
								<view class="solid-bottom article text-df"
									style="padding-top: 10upx; padding-bottom: 10upx;" v-if="item.displayorder>0">
									<view @tap="topost(item.tid)">
										<text class="text-black text-cut" style="width: 100%;">{{item.subject}}</text>
									</view>
									<view> <text class="text-sm text-red padding-sm">置顶</text> <text
											class="text-sm text-gray padding-sm">{{item.author}}&nbsp&nbsp{{item.replies}}评</text>
									</view>
								</view>
								<view class="cu-card article no-card" v-else>
									<view class="cu-card dynamic solid-bottom">
										<view class="cu-item shadow">
											<view class="cu-list menu-avatar">
												<view class="cu-item">
													<view class="cu-avatar round lg"
														:style="[{ backgroundImage:'url(' + item.userinfo.avatarlist + ')' }]">
														<view v-show="item.userinfo.sex==1"
															class="cu-tag badge cuIcon-male bg-blue"></view>
														<view v-show="item.userinfo.sex==2"
															class="cu-tag badge cuIcon-female bg-pink"></view>
													</view>
													<view class="content flex-sub hbx">
														<view v-if="isImage">
															<img-cache class="touxian" :src="item.userinfo.touxian">
															</img-cache>
														</view>
														<view class="flex justify-between">
															<view
																:style="[{ color: item.userinfo.groupid==51?randomcolor():''}]">
																<span class="bhh">{{item.author}}<text
																		:style="[{ padding: item.userinfo.groupid==51?'0 0 0 4upx':'0 0 0 10upx'}]"></text>
																	<view
																		class="cu-tag padding-left-xs padding-right-xs"
																		:class="loadlevelicon(item.userinfo.groupid,1)">
																		{{loadlevelicon(item.userinfo.groupid)}}
																	</view>
																	<view
																		class="cu-tag padding-left-xs padding-right-xs"
																		:class="loadlevelicon2(item.fid)"
																		@tap="toforum(item.fid)">
																		{{item.bkname}}
																	</view>
																</span>
																<view class="text-gray text-sm flex justify-between">
																	{{item.nowdate}}
																</view>
															</view>
														</view>
													</view>
												</view>
											</view>
											<view class="forumtitle text-cut" @tap="topost(item.tid)">
												{{item.subject}}
											</view>
											<view class="text-content text-red flex justify-center float"
												v-if="item.readperm>0" @tap="topost(item.tid)">
												<view
													style="overflow: hidden;border: 1px dashed #FF9A9A;margin: 8px 0;padding: 10px;zoom: 1;width: 100%;text-align: center;">
													需要阅读权限：{{item.readperm}}</view>
											</view>
											<view v-else class="text-content" @tap="topost(item.tid)">
												{{item.summary}}
											</view>
											<view v-if="item.attachment==3&&isImage"
												class="grid flex-sub padding-lr col-1">
												<view v-if="item.attachlist[0].attachment!=null"
													@click="imgMap(item.attachlist[0].attachment)"
													class="bg-img only-img"
													:style="[{ backgroundImage:'url(' + item.attachlist[0].attachment + ')' }]">
												</view>
											</view>
											<view v-else-if="item.attachment==4&&isImage"
												class="grid flex-sub padding-lr col-3 grid-square">
												<view v-if="item.attachlist[0].attachment!=null"
													@click="imgMap(item.attachlist[0].attachment)" class="bg-img"
													:style="[{ backgroundImage:'url(' + item.attachlist[0].attachment + ')' }]">
												</view>
												<view v-if="item.attachlist[1].attachment!=null"
													@click="imgMap(item.attachlist[1].attachment)" class="bg-img"
													:style="[{ backgroundImage:'url(' + item.attachlist[1].attachment + ')' }]">
												</view>
											</view>
											<view v-else-if="item.attachment>4&&isImage"
												class="grid flex-sub padding-lr col-3 grid-square">
												<view v-if="item.attachlist[0].attachment!=null"
													@click="imgMap(item.attachlist[0].attachment)" class="bg-img"
													:style="[{ backgroundImage:'url(' + item.attachlist[0].attachment + ')' }]">
												</view>
												<view v-if="item.attachlist[1].attachment!=null"
													@click="imgMap(item.attachlist[1].attachment)" class="bg-img"
													:style="[{ backgroundImage:'url(' + item.attachlist[1].attachment + ')' }]">
												</view>
												<view v-if="item.attachlist[2].attachment!=null"
													@click="imgMap(item.attachlist[2].attachment)" class="bg-img"
													:style="[{ backgroundImage:'url(' + item.attachlist[2].attachment + ')' }]">
												</view>
											</view>
											<view class="flex justify-between">
												<view class="text-gray text-sm text-left padding-top2 padding-left">
													<text v-if="item.icon==1"
														class="cu-tag line-red padding-left-xs padding-right-xs">新人帖</text>
													<text v-if="item.attachment>2"
														class="cu-tag line-green padding-left-xs padding-right-xs">图文帖</text>
													<text v-if="item.heats>9999"
														class="cu-tag line-purple padding-left-xs padding-right-xs">热度:1w+</text>
													<text v-else-if="item.heats>999"
														class="cu-tag line-purple padding-left-xs padding-right-xs">热度:1k+</text>
													<text v-else-if="item.heats>200"
														class="cu-tag line-purple padding-left-xs padding-right-xs">热度:{{item.heats}}</text>
													<text v-else-if="item.heats>100"
														class="cu-tag line-mauve padding-left-xs padding-right-xs">热度:{{item.heats}}</text>
													<text v-else-if="item.heats>50"
														class="cu-tag line-pink padding-left-xs padding-right-xs">热度:{{item.heats}}</text>
													<text v-else-if="item.rate==1"
														class="cu-tag line-cyan padding-left-xs padding-right-xs">被赞赏</text>
													<text v-else-if="item.rate==-1"
														class="cu-tag line-yellow padding-left-xs padding-right-xs">被扣分</text>
													<text v-else-if="item.digest>0"
														class="cu-tag line-blue padding-left-xs padding-right-xs">精华帖</text>
												</view>
												<view class="text-gray text-sm text-right padding">
													<text class="cuIcon-attentionfill margin-lr-xs"></text>
													{{item.views}}
													<text class="cuIcon-appreciatefill margin-lr-xs"></text>
													{{item.recommends}}
													<text class="cuIcon-messagefill margin-lr-xs"></text>
													{{item.replies}}
												</view>
											</view>
										</view>
									</view>
								</view>
							</block>
						</view>
						<view v-if="newpost.length > 0">
							<block v-for="(item,index3) in newpost" :key="index3" @tap="tourl(item.url)">
								<view class="solid-bottom cu-card article no-card">
									<view class="cu-item shadow">
										<view class="title">
											<view class="text-cut">{{item.title}}</view>
										</view>
										<view class="content">
											<image v-if="item.img != 'static/image/common/nophoto.gif'" :src="item.img"
												mode="aspectFill"></image>
											<view class="desc">
												<view class="text-content text-red flex justify-center float"
													v-if="item.readperm>0" @tap="topost(item.tid)">
													<view
														style="overflow: hidden;border: 1px dashed #FF9A9A;margin: 8px 0;padding: 10px;zoom: 1;width: 100%;text-align: center;">
														需要阅读权限：{{item.readperm}}</view>
												</view>
												<view v-else class="text-content">
													{{item.summary}}
												</view>
												<view>
													<view class="cu-tag bg-red light sm round">{{item.author}}
													</view>
													<view class="cu-tag bg-green light sm round">{{item.replies}}评
													</view>
												</view>
											</view>
										</view>
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
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='needlogin'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">需要登录</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					你需要登录才可以使用此功能。
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="tologin">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='cantview'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">权限不足</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					无法进入板块，错误提示：{{cantviewmessage}}
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="back">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="load-progress" v-show="loadProgress!=0" :style="[{top:CustomBar+'px'}]">
			<view class="load-progress-bar bg-green"
				:style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
			<view class="load-progress-spinner text-green"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "basics",
		data() {
			return {
				scrollLeft: 0,
				forumname: "载入中……",
				search: "",
				cantviewmessage: "unknown",
				iStatusBarHeight: 0,
				isImage: 1,
				swiperList: [],
				threadlist: [],
				threadlisttitle: [],
				newpost: [],
				tabname: ["时间", "关联"],
				tabarray: [0, 1, 2, 3],
				avatarimgLoaded: false,
				iscard: false,
				modalName: null,
				TabCur: 99,
				forumid: 2,
				Wifi: 0,
				mainpage: 0,
				InputBottom: 0,
				loadwb: 0,
				loadProgress: 0,
				loading: "上拉可加载更多帖子",
				swiperheight: 1000, //高度
			};
		},
		methods: {
			hideModal(e) {
				this.modalName = null
			},
			tologin(e) {
				uni.redirectTo({
					url: '../../components/ay-login/login-password'
				});
			},
			toforum(e) {
				uni.navigateTo({
					url: '../basics/forum?forumid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			back(){
				uni.navigateBack();
			},
			refresh(e) {
				this.mainpage = 0;
				this.loadthread(this.forumid);
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			topost(e) {
				uni.navigateTo({
					url: '../component/card?tid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			tothebottom() {
				this.loadthread(this.forumid, this.mainpage);
				console.log("到底了");
			},
			imgMap(url) {
				uni.previewImage({
					urls: [url], //这里一定是数组，不然就报错
				});
			},
			loadlevelicon(e, f) {
				if (e == 7) {
					if (f == 1) {
						return 'line-gray';
					} else {
						return '游客';
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
						return 'QQ游客';
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
						return '';
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
				}
			},
			loadlevelicon2(e) {
				if (e.substr(e.length-1,1) == 0) {
					return 'line-red';
				} else if  (e.substr(e.length-1,1) == 1) {
					return 'line-orange';
				} else if  (e.substr(e.length-1,1) == 2) {
					return 'line-olive';
				} else if  (e.substr(e.length-1,1) == 3) {
					return 'line-green';
				} else if  (e.substr(e.length-1,1) == 4) {
					return 'line-cyan';
				} else if  (e.substr(e.length-1,1) == 5) {
					return 'line-blue';
				} else if  (e.substr(e.length-1,1) == 6) {
					return 'line-purple';
				} else if  (e.substr(e.length-1,1) == 7) {
					return 'line-mauve';
				} else if  (e.substr(e.length-1,1) == 8) {
					return 'line-pink';
				} else if  (e.substr(e.length-1,1) == 9) {
					return 'line-brown';
				}
			},
			randomcolor() {
				let r = Math.floor(Math.random() * 200 + 55);
				let g = Math.floor(Math.random() * 200 + 55);
				let b = Math.floor(Math.random() * 200 + 55);
				return 'rgba(' + r + ',' + g + ',' + b + ',0.8)';
			},
			LoadProgresss(e) {
				this.loadProgress = this.loadProgress + 2;
				if (this.loadProgress < 100) {
					if (this.loadwb == 1) {
						this.loadProgress = 0;
						return;
					}
					//console.log(this.loadProgress);
					setTimeout(() => {
						this.LoadProgresss();
					}, 100)
				} else {
					this.loadProgress = 0;
				}
			},
			setHeight(e) {
				var query = uni.createSelectorQuery();
				query.select('.' + e).boundingClientRect(rect => {
					if (rect) {
						//console.log(e + ".height = " + rect.height)
						this.swiperheight = rect.height; //页面可见区域 - 头部高度
						//console.log("this.height = " + this.swiperheight)
					}
				}).exec();

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
			loadthread(forumid, page, orderby) {
				let that = this;
				if (this.$imageswitch && this.$wifi == 0) {
					this.isImage = 0;
				} else {
					this.isImage = 1;
				}
				console.log(orderby);
				console.log(page);
				if (page == 0) {
					that.threadlist = [];
				}
				that.loading = '加载中';
				that.loadwb = 0;
				that.LoadProgresss();
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:search', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						s: encodeURIComponent(that.search),
						page: page,
						orderby: orderby,
						isImage: that.isImage
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						//console.log(res.data)
						if (res.data.code == 404) {
							that.modalName = "needlogin";
						} else if (res.data.code == 401) {
							that.modalName = "cantview";
							that.cantviewmessage = res.data.message;
						} else {
							if (that.mainpage == 0) {
								that.threadlist = res.data.post;
								that.threadlisttitle = res.data.postinfo;
							} else {
								for (let i = 0; i < res.data.post.length; ++i) {
									that.threadlist.push(res.data.post[i]);
									that.loading = '上拉可加载更多帖子';
								}
								if (res.data.post.length < 30) {
									that.loading = '到底了。';
								}
							}
							that.mainpage++;
							//console.log(that.threadlist);
							if (uni.getSystemInfoSync().platform == 'ios') {
								setTimeout(function() {
									that.setHeight("view_listnow");
									setTimeout(function() {
										that.setHeight("view_listnow");
										setTimeout(function() {
											that.setHeight("view_listnow");
											setTimeout(function() {
												that.setHeight("view_listnow");
												setTimeout(function() {
													that.setHeight(
														"view_listnow"
														);
												}, 100);
											}, 100);
										}, 100);
									}, 100);
								}, 100);
							} else {
								setTimeout(function() {
									that.setHeight("view_listnow");
									setTimeout(function() {
										that.setHeight("view_listnow");
										setTimeout(function() {
											that.setHeight("view_listnow");
											setTimeout(function() {
												that.setHeight("view_listnow");
												setTimeout(function() {
													that.setHeight(
														"view_listnow"
														);
												}, 200);
											}, 200);
										}, 200);
									}, 200);
								}, 200);
							}
							that.loadwb = 1;
						}
					}
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				console.log(this.TabCur);
				if(this.TabCur==0){
					this.mainpage = 0;
					this.loadthread(this.forumid, this.mainpage, 'new');
				}else if(this.TabCur==1){
					this.mainpage = 0;
					this.loadthread(this.forumid, this.mainpage);
				}
			},
			add() {
				console.log(this.forumid);
				uni.navigateTo({
					url: '../basics/background?url=' + this.forumid
				})
			},
			tabChange(e) {
				//this.setHeight();
				this.currentIndex = e.detail.current;
				this.TabCur = e.detail.current;
				//this.loadthread(this.forumid);
			},
			tourl(e) {
				console.log(this.swiperheight)
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			this.forumid = 0;
			this.search = option.s;
			console.log(option.s); //打印出上个页面传递的参数。
			var groups = ['88', '51', '95', '45', '61', '60', '44', '70', '2', '92', '82'];
			if(groups.indexOf(option.forumid)>=0){
				this.TabCur = 0;
				this.loadthread(option.forumid, 0, 'new');
			}else{
				this.TabCur = 1;
				this.loadthread(option.forumid);
			}
			console.log(this.TabCur)
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
		},
		mounted() {
			//this.setHeight();
		},
		onReachBottom() {
			this.tothebottom();
		}
	}
</script>

<style>
	.cu-card>.cu-item {
		background-color: #FFFFFF !important;
		border-radius: 4%;
		background-position-y: 9%;
		margin: 0;
	}

	.text-df {
		background-color: #FFFFFF !important;
		border-radius: 4%;
		background-position-y: 9%;
		margin: 0;
	}

	.cu-list.menu-avatar>.cu-item {
		background-color: transparent;
		height: 110upx;
	}

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

	.forumtitle {
		font-size: 15px;
		font-weight: 900;
		color: #333333;
		line-height: 20px;
		padding: 0 15px;
	}

	.float {
		display: -webkit-box;
		display: block;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.article {
		margin: 10upx;
	}

	.vip {
		background-image: url(../../static/vip.png);
		background-size: 28upx 28upx;
		height: 28upx !important;
		width: 28upx !important;
	}

	.xunzhangshow {
		max-height: 32upx !important;
		max-width: 22upx !important;
		padding-left: 4upx;
	}

	.touxian {
		max-width: 200upx;
		max-height: 100upx;
		position: absolute;
		right: 0;
		margin-top: 50upx;
	}

	.bhh {
		display: inline-block;
		word-wrap: break-word;
		white-space: normal;
	}

	.hbx {
		position: relative;
	}

	.padding-top2 {
		padding-top: 26upx;
	}
</style>
