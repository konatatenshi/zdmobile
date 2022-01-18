<template>
	<view :class="'bg-white bc-'+themeColor.name">
		<cu-custom class="statustop" :bgColor="'bg-gradual-'+themeColor.name" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的收藏</block>
		</cu-custom>
		<scroll-view scroll-x class="nav hometop3" :bgColor="'bg-'+themeColor.name">
			<view class="cu-item padding-left-xl padding-right-xl"
				:class="TabCur==0?'text-black text-bold cur':'text-black'" @tap="tabSelect(0)">
				收藏的板块 {{bankuai}}
			</view>
			<view class="cu-item padding-left-xl padding-right-xl"
				:class="TabCur==1?'text-black text-bold cur':'text-black'" @tap="tabSelect(1)">
				收藏的帖子 {{tiezi}}
			</view>
			<view class="cu-item padding-left-xl padding-right-xl"
				:class="TabCur==2?'text-black text-bold cur':'text-black'" @tap="tabSelect(2)">
				收藏的空间 {{kongjian}}
			</view>
		</scroll-view>
		<view class="cu-bar bg-gray border-custom2">
			<scroll-view v-if="TabCur==0" class="list">
				<view class="view_listnow">
					<view class="padding-left-xl padding-right-xl"  v-for="(item,indexe) in bankuailist" :key="indexe">
						<button class="cu-btn block margin-tb-sm lg shadow" :class="['bg-' + ColorList[indexe].name]" @tap="toforum(item.id)">{{item.title}}</button>
					</view>
				</view>
			</scroll-view>
			<scroll-view v-else-if="TabCur==1" class="list">
				<view class="view_listnow">
					<view v-if="huifupost.length > 0">
						<block v-for="(itemex,indexe1) in huifupost" :key="indexe1">
							<view class="solid-bottom text-df article text-min"  :class="'bg-'+themeColor.name"
								style="padding-top: 10upx; padding-bottom: 10upx;" v-show="canshow(itemex.url)==1">
								<view style="margin-right: 20upx;padding-left: 80upx;" class="text-black text-cut" :class="'bt-'+themeColor.name" @tap="tourl(itemex.url)">
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
								<view class="chacha text-gray cuIcon-close" @tap="deleteit(itemex.url)">
								</view>
								<view v-if="itemex.img=='static/image/common/nophoto.gif'" class="text-content"  :class="'bt-'+themeColor.name"
									style="padding-left: 10upx;padding-top: 5upx;line-height: 17px;font-size: 0.8rem;padding-left: 5px;padding-top: 2px;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;"  @tap="tourl(itemex.url)">
									{{itemex.summary}}
								</view>
								<view v-else class="text-content" :class="'bt-'+themeColor.name" @tap="tourl(itemex.url)"
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
		</view>
		<view class="cu-modal" :class="modalName=='delete'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end" :class="'bg-light-'+themeColor.name">
					<view class="content">确认删除</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					确认将此帖从你的收藏夹移除吗？
				</view>
				<view class="cu-bar justify-end" :class="'bg-light-'+themeColor.name">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="deleteqd">确定</button>
					</view>
					<view class="action">
						<button class="cu-btn bg-gray margin-left" @tap="hideModal">取消</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ColorList: this.ColorList,
				huifupost: '',
				bankuailist: [],
				showlist: [],
				loading: '加载中……',
				bankuai: 0,
				tiezi: 0,
				kongjian: 0,
				TabCur: 0,
				page:0,
				modalName:null,
				deleteid:0,
			}
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
			deleteit(e){
				this.deleteid = e;
				this.modalName = 'delete';
			},
			canshow(e){
				if(this.showlist.indexOf(e)>-1){
					return 0;
				}else{
					return 1;
				}
			},
			deleteqd(e){
				let that = this;
				console.log(this.deleteid);
				this.modalName = null;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:shoucang', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 2,
							tid: that.deleteid
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							if(res.data.code==200){
								that.showlist.push(that.deleteid);
								console.log(that.showlist);
								this.tiezi--;
								uni.showToast({
									title: '移除成功!',
								})
							}else{
								uni.showToast({
									title: '移除失败!',
									icon: 'error'
								})
							}
						}
					});
			},
			tourl(e) {
				uni.navigateTo({
					url: '../component/card?tid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
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
			shuaxinlist() {
				var that = this;
				that.loading = '载入中...';
				if (this.TabCur == 0) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:shoucang', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 1
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							that.bankuai = res.data.bankuainum;
							that.tiezi = res.data.favoritenuum;
							that.bankuailist = res.data.bankuaiarray;
						}
					});
				} else if (this.TabCur == 1) {
					this.page = 0;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 9,
							page: that.page
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							that.huifupost = res.data.post;
							if (res.data.post.length < 30) {
								that.loading = '已经到底了！';
							}else{
								that.loading = '下滑加载更多';
							}
							console.log(res.data.length);
							that.page++;
						}
					});
				}
			},
			toforum(e) {
				uni.navigateTo({
					url: '../basics/forum?forumid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			tothebottom(push) {
				var that = this;
				if (that.TabCur == 0) {
					//nothing
				} else if (that.TabCur == 1) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 9,
							page: that.page
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
									that.huifupost.push(push[i]);
								}
							}
							if (push.length < 30) {
								that.loading = '竟然到底了！';
							}else{
								that.loading = '下滑加载更多';
							}
							that.page++;
						}
					});
				}
				console.log("到底了");
			},
			
		},
		onLoad: function(option) {
			this.shuaxinlist();
		},
		onReady() {
		},
		onReachBottom() {
			console.log("到底了");
			this.tothebottom();
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
		background: white;
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
	.hometop3 {
		/* #ifdef APP-PLUS */
		margin-top: calc(var(--status-bar-height) - 115upx);
		/* #endif */
	}

	.text-df {
		background-color: #FFFFFF !important;
		border-radius: 4%;
		background-position-y: 20%;
		border-top: 6upx solid #f1f1f1;
		border-bottom: 6upx solid #f1f1f1;
		border-left: 15upx solid #f1f1f1;
		border-right: 15upx solid #f1f1f1;
		min-height: 170upx;
	}

	.border-custom {
		border: 6upx solid white;
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
	
	
	.vip {
		background-image: url(../../static/vip.png);
		background-size: 28upx 28upx;
		height: 28upx !important;
		width: 28upx !important;
	}
	
	.padding-left-sm .padding-right-xl .text-black .text-shadow1{
		margin-top: 10upx;
	}
	.text-xl{
		font-size: 30upx!important;
	}
	.bg-purple{
		background-color: rgba(196, 16, 212, 0.4);
		border: 4upx solid rgba(221, 255, 253, 0.4);
	}
	
	
	.gzlist {
		position: absolute;
		margin: -33upx 0 0 -145upx;
	}
	
	.gzlist2 {
		position: absolute;
		background-color: transparent;
		margin: -45upx 0 0 -86upx;
		width: 88upx;
		height: 88upx;
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
	.img-cache.cu-avatar.round.gzlist {
	    margin-left: -35px;
	}
	
	.bg-light-red{
		background-color: #ffdbca!important;
	}
	.bg-red.text-df{
		background-color: #ffdbca!important;
	}
	.bg-red.cu-item{
		background-color: #ffdbca!important;
	}
	.bg-light-black{
		background-color: #747474!important;
		color: #fff;
	}
	.bg-black.text-df{
		background-color: #747474!important;
		color: #fff;
	}
	.bg-black.cu-item{
		background-color: #747474!important;
		color: #fff;
	}
	.text-black.bt-black{
		color: #fff!important;
	}
	.text-content.bt-black{
		color: #c8c8c8!important;
	}
	.bg-cyan.bt-black{
		background-color: #393939!important;
	}
</style>
