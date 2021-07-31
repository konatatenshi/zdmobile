<template name="basics">
	<view>
		<cu-custom class="statustop" bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{forumname}}</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav-sm" :style="'margin-top: -' + iStatusBarHeight +'px;'"
			scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in 7" :key="index"
				@tap="tabSelect" :data-id="index">
				{{tabname[index]}}
			</view>
		</scroll-view>
		<view class="view_head">
			<swiper class="swiper-box" :style="'height: ' + swiperheight +'px;'" :current="TabCur" @change="tabChange">
				<swiper-item key="1">
					<scroll-view class="list">
						<view v-if="1 > 0">
							<!-- 	图文列表
							<block v-for="(item,index1) in items.list" :key="index1">
								<view>{{item}}</view>
							</block> -->
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item key="2">
					<scroll-view class="list">
						<view class="view_listnow">
							<view v-if="threadlist.length > 0">
								<block v-for="(item,index2) in threadlist" :key="index2">
									<view class="solid-bottom text-df"
										style="padding-top: 10upx; padding-bottom: 10upx;" v-if="item.displayorder>0">
										<view  @tap="topost(item.tid)">
											<text class="text-black text-cut"
												style="width: 100%;">{{item.subject}}</text>
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
														<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + item.userinfo.avatarlist + ')' }]">
															<view v-show="item.userinfo.sex==1" class="cu-tag badge cuIcon-male bg-blue"></view>
															<view v-show="item.userinfo.sex==2" class="cu-tag badge cuIcon-female bg-pink"></view>
														</view>
														<view class="content flex-sub">
															<view>{{item.author}}</view>
															<view class="text-gray text-sm flex justify-between">
																{{item.nowdate}}
															</view>
														</view>
													</view>
												</view>
												<view class="forumtitle text-cut" @tap="topost(item.tid)">{{item.subject}}</view>
												<view class="text-content" @tap="topost(item.tid)">
														{{item.summary}}
												</view>
												<view v-if="item.attachment==3&&isImage" class="grid flex-sub padding-lr col-1">
													<view v-if="item.attachlist[0].attachment!=null" @click="imgMap(item.attachlist[0].attachment)" class="bg-img only-img" :style="[{ backgroundImage:'url(' + item.attachlist[0].attachment + ')' }]">
													</view>
												</view>
												<view v-else-if="item.attachment==4&&isImage" class="grid flex-sub padding-lr col-3 grid-square">
													<view v-if="item.attachlist[0].attachment!=null" @click="imgMap(item.attachlist[0].attachment)" class="bg-img" :style="[{ backgroundImage:'url(' + item.attachlist[0].attachment + ')' }]">
													</view>
													<view v-if="item.attachlist[1].attachment!=null" @click="imgMap(item.attachlist[1].attachment)" class="bg-img" :style="[{ backgroundImage:'url(' + item.attachlist[1].attachment + ')' }]">
													</view>
												</view>
												<view v-else-if="item.attachment>4&&isImage" class="grid flex-sub padding-lr col-3 grid-square">
													<view v-if="item.attachlist[0].attachment!=null" @click="imgMap(item.attachlist[0].attachment)" class="bg-img" :style="[{ backgroundImage:'url(' + item.attachlist[0].attachment + ')' }]">
													</view>
													<view v-if="item.attachlist[1].attachment!=null" @click="imgMap(item.attachlist[1].attachment)" class="bg-img" :style="[{ backgroundImage:'url(' + item.attachlist[1].attachment + ')' }]">
													</view>
													<view v-if="item.attachlist[2].attachment!=null" @click="imgMap(item.attachlist[2].attachment)" class="bg-img" :style="[{ backgroundImage:'url(' + item.attachlist[2].attachment + ')' }]">
													</view>
												</view>
												<view class="text-gray text-sm text-right padding">
													<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.views}}
													<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.recommends}}
													<text class="cuIcon-messagefill margin-lr-xs"></text> {{item.replies}}
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
												<image v-if="item.img != 'static/image/common/nophoto.gif'"
													:src="item.img" mode="aspectFill"></image>
												<view class="desc">
													<view class="text-content">
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
					</scroll-view>
				</swiper-item>
			</swiper>
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
						<button class="cu-btn bg-green margin-left" @tap="tologin">确定</button>
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
				forumname: "载入中……",
				cantviewmessage: "unknown",
				iStatusBarHeight: 0,
				isImage: 1,
				swiperList: [],
				threadlist: [],
				threadlisttitle: [],
				newpost: [],
				tabname: ["新帖", "全部", "热门", "精华"],
				avatarimgLoaded: false,
				iscard: false,
				modalName: null,
				TabCur: 1,
				forumid: 2,
				Wifi: 0,
				mainpage: 0,
				InputBottom: 0,
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
			topost(e) {
				uni.navigateTo({
					url: '../component/card?tid=' + e
				});
			},
			tothebottom() {
				this.loadthread(this.forumid,this.mainpage);
				console.log("到底了");
			},
			imgMap(url) {
				uni.previewImage({
					urls: [url], //这里一定是数组，不然就报错
				});
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
			loadthread(forumid, page, orderby, dateline, filter, typeid) {
				let that = this;
				if(this.$imageswitch&&this.$wifi==0){
					this.isImage = 0;
				}else{
					this.isImage = 1;
				}
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						forumid: forumid,
						page: page,
						orderby: orderby,
						dateline: dateline,
						filter: filter,
						typeid: typeid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.code == 404) {
							that.modalName = "needlogin";
						} else if (res.data.code == 401) {
							that.modalName = "cantview";
							that.cantviewmessage = res.data.message;
						} else {
							if (that.mainpage == 0) {
								that.threadlist = res.data.post;
								that.threadlisttitle = res.data.postinfo;
							}else{
								for (let i = 0; i < res.data.post.length; ++i) {
									that.threadlist.push(res.data.post[i]);
								}
								if (res.data.post.length < 30) {
									that.loading = '到底了。';
								}
							}
							that.mainpage++;
							that.forumname = res.data.foruminfo1.name;
							//console.log(that.threadlist);
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
						}
					}
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				console.log(this.swiperheight)
			},
			tabChange(e) {
				//this.setHeight();
				this.currentIndex = e.detail.current;
				this.TabCur = e.detail.current;
				this.loadthread(this.forumid);
			},
			tourl(e) {
				console.log(this.swiperheight)
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			this.forumid = option.forumid;
			console.log(option.forumid); //打印出上个页面传递的参数。
			this.loadthread(this.forumid);
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
		background-color: #f0f0f0!important;
		margin: 0;
	}
	.cu-list.menu-avatar>.cu-item{
		background-color: #f0f0f0;
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
	
	.forumtitle{
	    font-size: 15px;
	    font-weight: 900;
	    color: #333333;
	    line-height: 20px;
	    padding: 0 15px;
	}
</style>
