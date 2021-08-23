<template name="basics">
	<view>
		<view class="box">
			<view class="cu-bar bg-cyan search hometop">
				<view>
					<img-cache v-show="avatarimgLoaded" class="cu-avatar round" :src="$avatarsmall" @tap="tabSelect"
						data-id="0" @load="onSuccessImg()" />
					</img-cache>
					<img-cache v-show="!avatarimgLoaded" class="cu-avatar round" :src="$avatarsmalldefault"
						@tap="tabSelect" data-id="0" style="margin-left: 11px;" />
					</img-cache>
				</view>
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" @confirm="searchconfirm" :adjust-position="false"
						type="text" placeholder="搜索图片、文章、视频" confirm-type="search"></input>
				</view>
			</view>
		</view>
		<scroll-view scroll-x class="bg-white nav-sm hometop0" scroll-with-animation :scroll-left="scrollLeft">
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
							<swiper class="screen-swiper square-dot hometop3" :indicator-dots="true" :circular="true"
								:autoplay="true" interval="5000" duration="500">
								<swiper-item v-for="(item,index) in swiperList" :key="index" @tap="tourl(item.url)">
									<image v-if="isImage" :src="item.img" mode="aspectFill"></image>
									<image v-else src="../../static/noimg.png" mode="aspectFill"></image>
								</swiper-item>
							</swiper>
							<view v-if="toplist.length > 0">
								<block v-for="(item,index1) in toplist" :key="index1">
									<view class="solid-bottom text-df article"
										style="padding-top: 10upx; padding-bottom: 10upx;" @tap="tourl(item.url)">
										<view>
											<text class="text-black text-cut" style="width: 100%;">{{item.title}}</text>
										</view>
										<view> <text class="text-sm text-red padding-sm">置顶</text> <text
												class="text-sm text-gray padding-sm">{{item.author}}&nbsp&nbsp{{item.replies}}评</text>
										</view>
									</view>
								</block>
							</view>
							<view v-if="tuijiantie.length > 0">
								<block v-for="(item,index2) in tuijiantie" :key="index2">
									<view class="solid-bottom cu-card article no-card" @tap="tourl(item.url)">
										<view class="cu-item shadow">
											<view class="title">
												<view class="text-cut">{{item.title}}</view>
											</view>
											<view class="content">
												<image v-if="isImage" :src="item.img" mode="aspectFill"></image>
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
							<view v-if="newpost.length > 0">
								<block v-for="(item,index3) in newpost" :key="index3">
									<view class="solid-bottom cu-card article no-card" @tap="tourl(item.url)">
										<view class="cu-item shadow">
											<view class="title">
												<view class="text-cut">{{item.title}}</view>
											</view>
											<view class="content">
												<image v-if="item.img != 'static/image/common/nophoto.gif'&&isImage"
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
		<view class="cu-modal" :class="jifencaozuo!=0?'show':''">
			<button class="cu-btn margin-sm basis-sm shadow bg-orange"
				:class="jifencaozuo==1?'animation-scale-up':'animation-reverse animation-scale-down'">
				<text class="text-xl text-white text-shadow">{{jifenshuoming}}：</text><text
					class="text-xl text-white text-shadow">{{jifenbiangeng}}</text>
			</button>
		</view>
		<view class="load-progress" v-show="loadProgress!=0" :style="[{top:CustomBar+'px'}]">
			<view class="load-progress-bar bg-green"
				:style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
			<view class="load-progress-spinner text-green"></view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		name: "basics",
		data() {
			return {
				scrollLeft: 0,
				iStatusBarHeight: 0,
				page: 0,
				tab0enabled: 0,
				tab1enabled: 0,
				tab2enabled: 0,
				tab3enabled: 0,
				tab4enabled: 0,
				tab5enabled: 0,
				tab6enabled: 0,
				isImage: 1,
				jifencaozuo: 0,
				loadProgress: 0,
				loadwb: 0,
				swiperList: [],
				toplist: [],
				tuijiantie: [],
				newpost: [],
				tabname: ["关注", "推荐", "热榜", "资讯", "讨论", "美图", "喇叭"],
				avatarimgLoaded: false,
				TabCur: 1,
				loading: "载入中……",
				jifenbiangeng: '积分名+1',
				jifenshuoming: '积分变更',
				swiperheight: 1000, //高度
			};
		},
		methods: {
			tothebottom(push) {
				var that = this;
				that.loadwb = 0;
				that.LoadProgresss();
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						typeid: 1,
						page: that.page,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(that.page);
						push = res.data.post;
						console.log(push);
						if (push.length > 0) {
							for (let i = 0; i < push.length; ++i) {
								that.newpost.push(push[i]);
							}
						}
						if (res.data.length < 30) {
							that.loading = '竟然到底了！';
						}
						that.page++;
						setTimeout(function() {
							that.setHeight("view_listnow");
						}, 100)
						that.loadwb = 1;
					}
				});
				console.log("到底了");
			},
			setHeight(e) {
				var query = uni.createSelectorQuery();
				query.select('.' + e).boundingClientRect(rect => {
					if (rect) {
						//console.log(e + ".height = " + rect.height)
						this.swiperheight = rect.height + uni.getSystemInfoSync().statusBarHeight +
							50; //页面可见区域 - 头部高度
						//console.log("this.height = " + this.swiperheight)
					}
				}).exec();

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
			LoadProgresss(e) {
				this.loadProgress = this.loadProgress + 3;
				if (this.loadProgress < 100) {
					if (this.loadwb == 1) {
						this.loadProgress = 0;
						return;
					}
					console.log(this.loadProgress);
					setTimeout(() => {
						this.LoadProgresss();
					}, 100)
				} else {
					this.loadProgress = 0;
				}
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			searchconfirm(e) {
				console.log(e)
				uni.navigateTo({
					url: '../basics/layout?s=' + encodeURIComponent(e.detail.value),
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			onSuccessImg() {
				this.avatarimgLoaded = true;
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
				var that = this;
				if (this.TabCur == 1 && this.tab1enabled == 0) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:zhidingtie', //获取置顶帖子
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							that.tuijiantie = res.data.tuijiantie.data;
							that.toplist = res.data.toplist.data;
							that.newpost = res.data.newpost.data;
							console.log(that.tuijiantie);
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.tab1enabled = 1;
						}
					});
				}
			},
			tourl(e) {
				uni.navigateTo({
					url: '../component/card?tid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
		},
		created() {
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			plus.navigator.setStatusBarStyle('light'); //改变系统标题颜色
			var that = this;
			uni.getStorage({
				key: 'lunbolist',
				success: function(res) {
					that.swiperList = res.data.data;
					//console.log(that.swiperList);
				}
			});
			if (this.$imageswitch && this.$wifi == 0) {
				this.isImage = 0;
			} else {
				this.isImage = 1;
			}
			uni.request({
				url: getApp().globalData.zddomain + 'api.php?mod=app&bid=158', //获取轮播列表
				method: 'GET',
				timeout: 10000,
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: (res) => {
					uni.setStorage({
						key: 'lunbolist',
						data: res.data.data,
						success: function() {
							that.swiperList = res.data.data;
							//console.log(that.swiperList);
						}
					});
				}
			});
			uni.request({
				url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:zhidingtie', //获取置顶帖子
				method: 'GET',
				timeout: 10000,
				data: {
					token: that.$token,
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: (res) => {
					console.log(res.data);
					that.tuijiantie = res.data.tuijiantie.data;
					that.toplist = res.data.toplist.data;
					that.newpost = res.data.newpost.data;
					console.log(that.tuijiantie);
					setTimeout(function() {
						that.setHeight("view_listnow");
					}, 100)
					that.tab1enabled = 1;
					if (that.$nowdate != res.data.date && that.$token != '') {
						that.jifenbiandong('每日登录', '金币+1，点币+1，宠物经验+1');
						Vue.prototype.$nowdate = res.data.date;
						uni.setStorage({
							key: 'nowdata',
							data: res.data.date,
							success: function() {}
						});
					}
				}
			});
		},
		mounted() {
			//this.setHeight();
		},
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

	.article {
		margin: 10upx;
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
</style>
