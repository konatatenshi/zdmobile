<template name="basics">
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<view class="box">
			<view class="cu-bar bg-cyan search hometop">
				<view>
					<img-cache v-show="avatarimgLoaded" class="cu-avatar round" :src="$avatarsmall" @tap="userinfo"
						data-id="0" @load="onSuccessImg()" />
					</img-cache>
					<img-cache v-show="!avatarimgLoaded" class="cu-avatar round" :src="$avatarsmalldefault"
						@tap="userinfo" data-id="0" style="margin-left: 11px;" />
					</img-cache>
				</view>
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" @confirm="searchconfirm" :adjust-position="false"
						type="text" placeholder="搜索图片、文章、视频"></input>
				</view>
			</view>
		</view>
		<scroll-view scroll-x class="bg-white nav-sm hometop0" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in 7" :key="index"
				@tap="tabSelect" :data-id="index">
				{{tabname[index]}}
			</view>
		</scroll-view>
		<!-- 搜索历史 -->
		<view class="searchHistory" :style="'display: '+ searchstyle +';'">
			<view
				style="display:flex;justify-content: space-between;box-sizing: border-box;padding: 0px 10upx;z-index: 999;"
				:style="'margin-top:'+ iStatusBarHeight +'upx;'">
				<view>搜索历史:</view>

				<view style="color: red;font-size: 3rem;" @click="empty">×</view>
			</view>
			<view class="searchHistoryItem">
				<view v-for="(item3, index3) in searchHistoryList" :key="index3">
					<view class="cu-tag padding-left-xs padding-right-xs" :class="loadlevelicon2(index3)"
						@tap="searchconfirm2(item3)">
						{{item3}}
					</view>
				</view>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="view_head" @touchstart="start" @touchend="end">
			<scroll-view v-if="TabCur==0" class="list">
				<view class="view_listnow">
					<view class="hometop3">
					</view>
					<view v-if="guanzhupost.length > 0">
						<block v-for="(itemex,indexe1) in guanzhupost" :key="indexe1">
							<view class="solid-bottom text-df article text-min"
								style="padding-top: 10upx; padding-bottom: 10upx;" @tap="tourl(itemex.url)">
								<view style="margin-right: 20upx;padding-left: 80upx;" class="text-black text-cut">
									{{itemex.title}}</view>
								<view style="padding-left: 80upx;">
									<view>
										<img-cache class="cu-avatar round gzlist" :src="itemex.avatar" />
										</img-cache>
										<img-cache class="cu-avatar round gzlist2" v-if="itemex.touxiangkuanglist != ''"
											:src="itemex.touxiangkuanglist" />
										</img-cache>
									</view>
									<view class="cu-tag padding-left-xs padding-right-xs"
										:class="loadlevelicon2(itemex.fid)">
										{{itemex.bkname}}
									</view><text class="text-sm text-gray"
										style="padding-left: 8upx;">{{itemex.author}}&nbsp&nbsp{{itemex.replies}}评&nbsp&nbsp{{itemex.nowdate}}</text>
									<img-cache v-if="itemex.img!='static/image/common/nophoto.gif'" mode="aspectFill"
										class="gzlist3" :src="itemex.img" />
								</view>
								<view v-if="itemex.img=='static/image/common/nophoto.gif'" class="text-grey"
									style="padding-left: 10upx;padding-top: 5upx;">
									{{itemex.summary}}
								</view>
								<view v-else class="text-grey"
									style="line-height:35upx; font-size: 0.8rem; padding-left: 10upx; padding-right: 100upx;padding-top: 5upx;text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
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
								style="padding-top: 10upx; padding-bottom: 10upx;"  v-if="!(ifpingbi(item.author)&&$adminid<=0)">
								<view @tap="tourl(item.url)">
									<text class="text-black text-cut" style="width: 100%;">{{item.title}}</text>
								</view>
								<view> <text class="text-sm text-red padding-sm" @tap="tourl(item.url)">置顶</text> <text
										class="text-sm text-gray padding-sm" @tap="tourl(item.url)">{{item.author}}&nbsp&nbsp{{item.replies}}评</text>
												<view class="chacha text-gray cuIcon-close" @tap="more2(item.author,item.url)">
												</view>
								</view>
							</view>
						</block>
					</view>
					<view v-if="tuijiantie.length > 0">
						<block v-for="(item,index2) in tuijiantie" :key="index2">
							<view class="solid-bottom cu-card article no-card"  v-if="!(ifpingbi(item.author)&&$adminid<=0)">
								<view class="cu-item shadow">
									<view class="title" @tap="tourl(item.url)">
										<view class="text-cut">{{item.title}}</view>
									</view>
									<view class="content">
										<image v-if="isImage" :src="item.img" mode="aspectFill" @tap="tourl(item.url)"></image>
										<view class="desc">
											<view class="text-content" @tap="tourl(item.url)">
												{{item.summary}}
											</view>
											<view>
												<view class="cu-tag bg-red light sm round">{{item.author}}
												</view>
												<view class="cu-tag bg-green light sm round">{{item.replies}}评
												</view>
												<view class="chacha text-gray cuIcon-close" @tap="more2(item.author,item.url)">
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
							<view class="solid-bottom cu-card article no-card"  v-if="!ifpingbi(item.author)&&$adminid<=0">
								<view class="cu-item shadow">
									<view class="title" @tap="tourl(item.url)">
										<view class="text-cut">{{item.title}}</view>
									</view>
									<view class="content">
										<image v-if="item.img != 'static/image/common/nophoto.gif'&&isImage"
											:src="item.img" mode="aspectFill" @tap="tourl(item.url)"></image>
										<view class="desc">
											<view class="text-content" @tap="tourl(item.url)">
												{{item.summary}}
											</view>
											<view>
												<view class="cu-tag bg-red light sm round">{{item.author}}
												</view>
												<view class="cu-tag bg-green light sm round">{{item.replies}}评
												</view>
												<view class="chacha text-gray cuIcon-close"  @tap="more2(item.author,item.url)">
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
		</view>
		<view class="cu-modal" :class="modalName=='pingbi'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-list menu text-left solid-top">
					<view class="cu-item" v-if="pingbiauthor==$username">
						<view class="content">
							<text class="text-gray"><text class="cuIcon-roundclose"></text>屏蔽自己</text>
						</view>
					</view>
					<view class="cu-item" v-else-if="!ifpingbi(pingbiauthor)" @tap="pingbiadd(pingbiauthor)">
						<view class="content noborder2">
							<text class="text-grey"><text class="cuIcon-roundclose"></text>屏蔽作者：{{pingbiauthor}}</text>
							<view class="text-gray text-sm noborder">屏蔽后，你将不会收到他的信息。</view>
						</view>
					</view>
					<view class="cu-item" v-else @tap="pingbiremove(pingbiauthor)">
						<view class="content noborder2">
							<text class="text-grey"><text class="cuIcon-roundclose"></text>取消屏蔽：{{pingbiauthor}}</text>
							<view class="text-gray text-sm noborder">屏蔽后，你将不会收到他的信息。</view>
						</view>
					</view>
					<view class="cu-item" v-if="pingbiauthor==$username">
						<view class="content">
							<text class="text-gray"><text class="cuIcon-attentionforbid"></text>拉黑自己</text>
						</view>
					</view>
					<view class="cu-item" v-else @tap="lahei(pingbitid)">
						<view class="content noborder2">
							<text class="text-grey"><text class="cuIcon-attentionforbid"></text>{{laheitext}}：{{pingbiauthor}}</text>
							<view class="text-gray text-sm noborder">拉黑后，他将不能回复和私聊你任何信息。</view>
						</view>
					</view>
					<view class="cu-item" @tap="jubaota(pingbitid)">
						<view class="content">
							<text class="text-grey noborder2"><text class="cuIcon-info"></text>举报此内容</text>
							<view class="text-gray text-sm noborder">标题夸张，内容质量差等。</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='jubaoxinxi'?'show':''"  @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar bg-white justify-end">
					<view class="content">请输入举报理由</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-sm">
					<radio-group class="block" @change="RadioChange">
						<view class="cu-form-group">
							<view class="text-xl">广告垃圾</view>
							<radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
						</view>
						<view class="cu-form-group">
							<view class="text-xl">违规内容</view>
							<radio :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio>
						</view>
						<view class="cu-form-group">
							<view class="text-xl">恶意灌水</view>
							<radio :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
						</view>
						<view class="cu-form-group">
							<view class="text-xl">重复内容</view>
							<radio :class="radio=='D'?'checked':''" :checked="radio=='D'?true:false" value="D"></radio>
						</view>
						<view class="cu-form-group">
							<view class="text-xl">其他</view>
							<radio :class="radio=='E'?'checked':''" :checked="radio=='E'?true:false" value="E"></radio>
						</view>
					</radio-group>
					<view class="cu-form-group align-start" v-if="radio=='E'">
						<textarea maxlength="-1" v-model="jubaomessage" placeholder="请在此输入想要说的话"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view v-if="closed==0" class="action">
						<button class="cu-btn bg-green margin-left" @tap="sendjbxx">发送</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='cantpost'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar bg-white justify-end">
					<view class="content">举报错误</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					无法举报，错误提示：{{cantpostmessage}}
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
					</view>
				</view>
			</view>
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
				page0: 0,
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
				pingbiauthor: "",
				pingbitid: 0,
				modalName: null,
				laheivar: 0,
				laheitext: '拉黑作者',
				loadwb: 0,
				radio: 'A',
				swiperList: [],
				toplist: [],
				tuijiantie: [],
				newpost: [],
				pingbilist: [],
				guanzhupost: [],
				scrollht: [0, 0, 0, 0, 0, 0, 0, 0],
				tabname: ["关注", "推荐", "热榜", "资讯", "讨论", "美图", "喇叭"],
				avatarimgLoaded: false,
				TabCur: 1,
				fontsize: '',
				closed: 0,
				jubaomessage: '',
				cantpostmessage: '',
				loading: "载入中……",
				searchstyle: "none",
				jifenbiangeng: '积分名+1',
				jifenshuoming: '积分变更',
				searchHistoryList: [], //搜索出来的内容
				swiperheight: 1000, //高度
				startData: {
					clientX: 0,
					clientY: 0
				}
			};
		},
		methods: {
			hideModal(e) {
				this.modalName = null
			},
			tothebottom(push) {
				var that = this;
				that.loadwb = 0;
				that.LoadProgresss();
				if (this.$token == '') {
					that.loading = '登录以看更多内容……';
					return;
				}
				if (that.TabCur == 1) {
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
				} else if (that.TabCur == 0) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 2,
							page: that.page0,
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
							}
							that.page0++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				}
				console.log("到底了");
			},
			start(e) {
				console.log("开始下滑坐标", e.changedTouches[0].clientY)
				this.startData.clientX = e.changedTouches[0].clientX;
				this.startData.clientY = e.changedTouches[0].clientY;
			},
			end(e) {
				console.log("结束下滑坐标", e.changedTouches[0].clientY)
				const subX = e.changedTouches[0].clientX - this.startData.clientX;
				const subY = e.changedTouches[0].clientY - this.startData.clientY;
				if (subY < -50) {
					//console.log('下滑')
				} else if (subY > 50) {
					console.log('上滑');
					console.log(this.$scrollheight);
					if(this.$scrollheight<0){
						this.shuaxinlist();
					}
				} else if (subX > 50) {
					console.log('左滑');
					this.scrollht[this.TabCur] = this.$scrollheight;
					if(this.TabCur>0){
						this.TabCur --;
						this.shuaxinlist();
					}
					uni.pageScrollTo({
						scrollTop: this.scrollht[this.TabCur],
						duration: 0
					});
				} else if (subX < -50) {
					console.log('右滑')
					this.scrollht[this.TabCur] = this.$scrollheight;
					if(this.TabCur<6){
						this.TabCur ++;
						this.shuaxinlist();
					}
					uni.pageScrollTo({
						scrollTop: this.scrollht[this.TabCur],
						duration: 0
					});
				} else {
					console.log('无效')
				}
			},
			shuaxinlist(){
				var that = this;
				that.loadwb = 0;
				that.LoadProgresss();
				if (this.$token == '') {
					uni.redirectTo({
						url: '../../components/ay-login/login-password'
					});
				}
				if (this.TabCur == 0) {
					this.page0 = 0;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 2,
							page: that.page0,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data.post);
							that.guanzhupost = res.data.post;
							if (res.data.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page0++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				} else if (this.TabCur == 1) {
					setTimeout(function() {
						that.loadwb = 1;
					}, 500)
				}
			},
			setHeight(e) {
				var query = uni.createSelectorQuery();
				query.select('.' + e).boundingClientRect(rect => {
					if (rect) {
						//console.log(e + ".height = " + rect.height)
						this.swiperheight = rect.height + uni.getSystemInfoSync().statusBarHeight +
							460; //页面可见区域 - 头部高度
						//console.log("this.height = " + this.swiperheight)
					}
				}).exec();

			},
			userinfo(e) {
				if (this.$token == '') {
					uni.redirectTo({
						url: '../../components/ay-login/login-password'
					});
				} else {
					this.$emit("returnDat", "about")
				}
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
					//console.log(this.loadProgress);
					setTimeout(() => {
						this.LoadProgresss();
					}, 100)
				} else {
					this.loadProgress = 0;
				}
			},
			InputFocus(e) {
				let that = this;
				this.InputBottom = e.detail.height
				this.searchstyle = "inherit";
				console.log(this.searchHistoryList);
				//调取搜索历史记录
				uni.getStorage({
					key: 'searchList',
					success: function(res) {
						console.log(res.data);
						that.searchHistoryList = JSON.parse(res.data);
						console.log(that.searchHistoryList);
						//console.log(that.forumdata);
					}
				});
			},
			InputBlur(e) {
				this.InputBottom = 0;
				this.searchstyle = "none";
			},
			searchconfirm(e) {
				this.searchstyle = "none";
				if (e.detail.value == '') {
					uni.showModal({
						title: '搜索内容不能为空'
					});
					return;
				} else {
					if (!this.searchHistoryList.includes(e.detail.value)) {
						this.searchHistoryList.unshift(e.detail.value);
						uni.setStorage({
							key: 'searchList',
							data: JSON.stringify(this.searchHistoryList)
						});
					} else {
						//有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
						let i = this.searchHistoryList.indexOf(e.detail.value);
						this.searchHistoryList.splice(i, 1);
						this.searchHistoryList.unshift(e.detail.value);
						uni.showToast({
							title: '重复搜索，搜索词提前'
						});
						uni.setStorage({
							key: 'searchList',
							data: JSON.stringify(this.searchHistoryList)
						});
					}
				}
				console.log(e)
				uni.navigateTo({
					url: '../basics/layout?s=' + encodeURIComponent(e.detail.value),
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			searchconfirm2(e) {
				this.searchstyle = "none";
				if (e == '') {
					uni.showModal({
						title: '搜索内容不能为空'
					});
					return;
				} else {
					if (!this.searchHistoryList.includes(e)) {
						this.searchHistoryList.unshift(e);
						uni.setStorage({
							key: 'searchList',
							data: JSON.stringify(this.searchHistoryList)
						});
					} else {
						//有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
						let i = this.searchHistoryList.indexOf(e);
						this.searchHistoryList.splice(i, 1);
						this.searchHistoryList.unshift(e);
						//uni.showToast({
						//	title: '不能重复添加'
						//});
						uni.setStorage({
							key: 'searchList',
							data: JSON.stringify(this.searchHistoryList)
						});
					}
				}
				console.log(e)
				uni.navigateTo({
					url: '../basics/layout?s=' + encodeURIComponent(e),
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			//清空历史记录
			empty() {
				uni.showToast({
					title: '已清空'
				});
				uni.removeStorage({
					key: 'searchList'
				});

				this.searchHistoryList = [];
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
			onSuccessImg() {
				this.avatarimgLoaded = true;
			},
			tabSelect(e) {
				let that = this;
				if (this.$scrollheight > 0) {
					this.scrollht[this.TabCur] = this.$scrollheight;
				} else {
					this.scrollht[this.TabCur] = 0;
				}
				if (this.TabCur == e.currentTarget.dataset.id) {
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					});
				} else {
					uni.pageScrollTo({
						scrollTop: this.scrollht[e.currentTarget.dataset.id],
						duration: 0
					});
				}
				if (this.$token == '') {
					uni.redirectTo({
						url: '../../components/ay-login/login-password'
					});
				}
				if (e.currentTarget.dataset.id == 0 && that.page0 == 0) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 2,
							page: that.page0,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data.post);
							that.guanzhupost = res.data.post;
							if (res.data.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page0++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				}
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				console.log(this.swiperheight);
			},
			tabChange(e) {
				this.scrollht[this.TabCur] = this.$scrollheight;
				console.log(this.scrollht[this.TabCur]);
				//this.setHeight();
				this.currentIndex = e.detail.current;
				this.TabCur = e.detail.current;
				uni.pageScrollTo({
					scrollTop: this.scrollht[e.detail.current],
					duration: 0
				});
				if (this.$token == '') {
					uni.redirectTo({
						url: '../../components/ay-login/login-password'
					});
				}
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
							if (uni.getSystemInfoSync().platform == 'ios') {
								setTimeout(function() {
									that.setHeight("view_listnow");
								}, 100)
								setTimeout(function() {
									that.setHeight("view_listnow");
								}, 500)
							} else {
								setTimeout(function() {
									that.setHeight("view_listnow");
								}, 100)
								setTimeout(function() {
									that.setHeight("view_listnow");
								}, 500)
								setTimeout(function() {
									that.setHeight("view_listnow");
								}, 1000)
							}
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
			},
			more2(e,f) {
				let that = this;
				this.pingbiauthor = e;
				this.pingbitid = f;
				this.modalName = 'pingbi';
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:guanzhu', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						tid: f,
						typeid: 0,
						lahei: 1
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.code == 200) {
							that.guanzhutext = '取消关注';
							that.guanzhuvar = 2;
						} else if (res.data.code == 404) {
							that.guanzhutext = '关注作者';
							that.guanzhuvar = 1;
						} 
						if (res.data.blacklist == 1) {
							that.laheitext = '取消拉黑';
							that.laheivar = 1;
						}else{
							that.laheitext = '拉黑作者';
							that.laheivar = 0;
						}
						if(res.data.pm == 1){
							that.pm = 1;
						}else{
							that.sixintxt = '私信作者（无权限使用）';
						}
					}
				});
			},
			pingbiremove(e){
				var that = this;
				this.pingbilist.splice(this.pingbilist.indexOf(e), 1);
				console.log(this.pingbilist)
				uni.setStorage({
					key: 'pingbilist',
					data: that.pingbilist,
					success: function() {
						that.jifenbiandong('屏蔽取消', '你已将此作者从屏蔽列表移除');
					}
				});
				setTimeout(() => {
					this.modalName = null;
				}, 200)
			},
			pingbiadd(e){
				var that = this;
				console.log(this.pingbilist);
				console.log(e);
				this.pingbilist.push(e);
				uni.setStorage({
					key: 'pingbilist',
					data: that.pingbilist,
					success: function() {
						that.jifenbiandong('屏蔽成功', '你已将此作者加入屏蔽列表');
					}
				});
				setTimeout(() => {
					this.modalName = null;
				}, 200)
			},
			ifpingbi(e){
				if(this.pingbilist.indexOf(e)>=0){
					//console.log(e);
					return true;
				}else{
					return false;
				}
			},
			lahei(e) {
				let that = this;
				this.jiazai = 1;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:blacklist', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						tid: e,
						typeid: that.laheivar
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.code == 200) {
							that.laheitext = '取消拉黑';
							that.laheivar = 1;
							that.jifenbiandong('拉黑成功', that.pingbiauthor + '已加入黑名单');
						} else if (res.data.code == 201) {
							that.laheitext = '拉黑作者';
							that.laheivar = 0;
							that.jifenbiandong('拉黑取消', that.pingbiauthor + '已移除黑名单');
						} else{
							that.jifenbiandong('拉黑失败', res.data.message);
						}
						that.jiazai = 0;
						that.loadwb = 1;
						setTimeout(() => {
							this.modalName = null;
						}, 200)
					}
				});
			},
			jubaota(e) {
				this.modalName = 'jubaoxinxi';
				this.pingbitid = e;
			},
			RadioChange(e) {
				this.radio = e.detail.value;
			},
			sendjbxx() {
				var that = this;
				this.closed = 1;
				console.log(that.jubaomessage.length);
				if (that.jubaomessage.length < 2 && that.radio == 'E') {
					that.modalName = "cantpost";
					that.cantpostmessage = '请输入大于等于2个字的举报内容。';
					this.floorfasong = false;
					return;
				}
				if (!this.floorfasong) {
					that.floorfasong = true;
					if(that.radio=='A'){
						var message = encodeURI('广告垃圾');
					}else if(that.radio=='B'){
						var message = encodeURI('违规内容');
					}else if(that.radio=='C'){
						var message = encodeURI('恶意灌水');
					}else if(that.radio=='D'){
						var message = encodeURI('重复发帖');
					}else if(that.radio=='E'){
						var message = encodeURI(that.jubaomessage);
					}
					console.log(message);
					console.log(that.pingbitid);
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:jubao', //获取置顶帖子
						method: 'POST',
						timeout: 10000,
						data: {
							token: that.$token,
							message: message,
							tid: that.pingbitid
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							that.floorfasong = false;
							that.jubaomessage = '';
							if (res.data.code ==400) {
								that.modalName = "needlogin";
							} else if (res.data.code == 200) {
								that.modalName = null;
								that.jifenbiandong('举报成功','你的举报发送完毕。')
								that.siliaotxt = '';
							} else{
								that.modalName = null;
								that.jifenbiandong('举报失败',res.data.message);
							}
							that.closed = 0;
						}
					});
				}
			},
		},
		created() {
			this.fontsize = this.$fontsize;
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight + 170;
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
					if (uni.getSystemInfoSync().platform == 'ios') {
						setTimeout(function() {
							that.setHeight("view_listnow");
						}, 100)
						setTimeout(function() {
							that.setHeight("view_listnow");
						}, 500)
					} else {
						setTimeout(function() {
							that.setHeight("view_listnow");
						}, 100)
						setTimeout(function() {
							that.setHeight("view_listnow");
						}, 500)
						setTimeout(function() {
							that.setHeight("view_listnow");
						}, 1000)
					}
					that.tab1e
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
			//调取搜索历史记录
			uni.getStorage({
				key: 'searchList',
				success: function(res) {
					console.log(res.data);
					that.searchHistoryList = JSON.parse(res.data);
					console.log(that.searchHistoryList);
					//console.log(that.forumdata);
				}
			});
			//载入屏蔽名单
			uni.getStorage({
				key: 'pingbilist',
				success: function(res) {
					console.log(res.data);
					that.pingbilist = res.data;
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
	.text-min {
		min-height: 160upx;
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
		border-bottom: 3upx solid;
	}

	.nav-sm .cu-item {
		height: 50upx;
		display: inline-block;
		line-height: 50upx;
		margin: 0 8upx;
		padding: 0 16upx;
	}

	.searchHistory {
		width: 100%;
		margin-top: 8upx;
	}

	.searchHistoryItem {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.searchHistoryItem view {
		/* width: 50px; */
		height: 30upx;
		border: 1upx solid #eee;
		margin: 0upx 8upx;
	}

	.gzlist {
		position: absolute;
		margin: -33upx 0 0 -75upx;
	}

	.gzlist2 {
		position: absolute;
		background-color: transparent;
		margin: -45upx 0 0 -85upx;
		width: 86upx;
		height: 86upx;
	}

	.gzlist3 {
		position: absolute;
		right: 10upx;
		margin: 34upx 0 0 -105upx;
		width: 95upx;
		height: 72upx;
	}
	.chacha{
		position: absolute;
		margin: -30upx 0 0 0;
		right: 20upx;
	}
	.noborder{
		padding-top: 0px!important;
		margin-top: 0px!important;
	}
</style>
