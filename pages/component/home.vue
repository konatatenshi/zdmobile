<!-- 板块列表页 -->
<template name="components">
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view :class="'bc-'+themeColor.name">
		<view class="fixed">
			<cu-custom :isBack="false" bgColor="bg-shadeTop text-white">
				<block slot="backText">{{$t('api.back')}}</block>
				<block slot="content">{{$t('home.sectionselect')}}</block>
			</cu-custom>
		</view>
		<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index" @tap="toforum(item.url)">
				<img-cache :src="item.src" mode="aspectFill"></img-cache>
			</swiper-item>
		</swiper>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 375upx);">
				<view class="cu-item white text-cut" :class="index==tabCur?'text-green cur bg-'+themeColor.name:'bg-'+themeColor.name" v-for="(item,index) in list" :key="index" @tap="TabSelect"
				 :data-id="index" style="padding: 0 3px;">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" :class="'bc-'+themeColor.name" scroll-y scroll-with-animation style="height:calc(100vh - 375upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(item,index) in list" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom" :class="'bg-'+themeColor.name">
						<view class="action" v-if="item.name == null">
							<text class="cuIcon-title text-green"></text> {{$t('home.sectionlist')}}
						</view>
						<view class="action" v-else>
							<text class="cuIcon-title text-green"></text> {{item.name}}
						</view>
					</view>
					<view class="cu-list menu-avatar" v-for="(item,index2) in fuplist[index]" :key="index2">
						<view class="cu-item white" v-if="item.name == null" :class="'bg-'+themeColor.name">
							<view class="content">
								<view class="text-gray text-sm">
									<text class="text-cut">
										{{$t('home.nosection')}}
									</text>
								</view>
							</view>
						</view>
						<view class="cu-item white" v-else @tap="toforum(item.fid)" :class="'bg-'+themeColor.name">
							<view class="cu-avatar radius lg" :style="{'background-image': 'url(' +item.icon+')'}">
								<view class="cu-tag badge">{{item.todayposts}}</view>
							</view>
							<view class="content">
								<view class="text-grey">
									<text class="text-cut text-pink">{{item.name}}</text>
								</view>
								<view class="text-gray text-sm flex">
									<text class="text-cut">
										{{item.description}}
									</text>
								</view>
							</view>
							<view class="action">
								<view class="text-grey text-xs">{{item.lastposttime}}</view>
								<view class="cu-tag round bg-grey sm">{{item.threads}}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
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
	</view>
</template>

<script>
	import previewImage from '@/components/kxj-previewImage/kxj-previewImage.vue';
	export default {
		components: { previewImage},
		data() {
			return {
				list: [],
				swiperList: [{
					"id": 0,
					"src": "https://m.qpic.cn/psc?/1e7d52d4-3a3a-4dd5-9e87-78bdf6ab672f/TmEUgtj9EK6.7V8ajmQrEMuIXV7MakyKKRc9J6ulEu3GyXoFmGzTtX66rijMZpsM3PeZNN1OOhUQqkU7jc6HRD435usBKxrmLcfQRQGyGr0!/b&bo=AAXQAgAAAAADN8U!&rf=viewer_4",
					"url": 50
				}],
				fuplist: [],
				forumlist: [],
				forumdata: [],
				tabCur: 0,
				mainCur: 0,
				listNumber: 0,
				iStatusBarHeight: 0,
				modalName: "",
				verticalNavTop: 0,
				load: true
			};
		},
		created() {
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			uni.showLoading({
				title: this.$t('api.loading'),
				mask: true
			});
			var that = this;
			uni.getStorage({
				key: 'bankuailist',
				success: function(res) {
					that.forumdata = res.data.data;
					that.listNumber = res.data.number;
					that.forummount();
					console.log(that.forumdata);
				}
			});
			uni.request({
				url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:bankuailist', //获取置顶帖子
				method: 'GET',
				timeout: 10000,
				data: {
					token: that.$token,
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: (res) => {
					uni.setStorage({
						key: 'bankuailist',
						data: res.data,
						success: function() {
							if(res.data.code == 404){
								that.modalName = "needlogin";
							}
							that.forumdata = res.data.data;
							that.listNumber = res.data.number;
							that.forummount();
						}
					});
				}
			});
		},
		mounted() {
			plus.navigator.setStatusBarStyle('light'); //改变系统标题颜色
			console.log(this.swiperList)
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
			gettime(createtime){
			  var now=Date.parse(new Date())/1000;
			  var limit=now-createtime;
			  var content="";
			  if(limit<60){
			    content=this.$t('home.justnow');
			  }else if(limit>=60 && limit<3600){
			    content=Math.floor(limit/60)+this.$t('home.mintesago');
			  }else if(limit>=3600 && limit<86400){
			    content=Math.floor(limit/3600)+this.$t('home.hourssago');
			  }else if(limit>=86400 && limit<2592000){
			    content=Math.floor(limit/86400)+this.$t('home.daysago');
			  }else if(limit>=2592000 && limit<31104000){
			    content=Math.floor(limit/2592000)+this.$t('home.monthsago');
			  }else{
			    content=this.$t('home.longtime');
			  }
			  return content;
			},
			getforum(fup){
				let uplist = [{}];
				let j = 0;
				for (let i = 0; i < this.forumlist.length; i++) {
					if(this.forumlist[i].fup == fup){
						uplist[j] = this.forumlist[i];
						j++;
					}
				}
			//console.log(uplist);
			return uplist;
			},
			forummount() {
				//console.log(this.listNumber);
				//console.log(this.forumdata);
				let list = [{}];
				let forumlist = [{}];
				let fuplist = [{}];
				let j = 0;
				let k = 0;
				for (let i = 0; i < this.listNumber; i++) {
					//console.log(i);
					if(this.forumdata[i].fup == "0"){
						list[j] = {};
						list[j].name = this.forumdata[i].name;
						list[j].id = j;
						list[j].fid = this.forumdata[i].fid;
						//console.log(list[j].name);
						j++;
					}else{
						forumlist[k] = {};
						forumlist[k].name = this.forumdata[i].name;
						forumlist[k].id = k;
						forumlist[k].fid = this.forumdata[i].fid;
						forumlist[k].fup = this.forumdata[i].fup;
						forumlist[k].icon = this.forumdata[i].icon;
						forumlist[k].description = this.forumdata[i].description;
						if(this.forumdata[i].todayposts > 99){
							forumlist[k].todayposts = "99+";
						}else{
							forumlist[k].todayposts = this.forumdata[i].todayposts;
						}
						forumlist[k].threads = this.forumdata[i].threads;
						forumlist[k].lastposttime = this.gettime(this.forumdata[i].lastpost[2]);
						//console.log(forumlist[k].name);
						//console.log(forumlist[k].lastposttime);
						k++;
					}
				};
				this.list = list;
				this.listCur = list[0];
				this.forumlist = forumlist;
				console.log(this.forumlist.length);
				for (let i = 0; i < this.list.length; i++) {
					fuplist[i] = this.getforum(this.list[i].fid);
				}
				this.fuplist = fuplist;
				//console.log(this.fuplist);
				uni.hideLoading();
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 60;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						//console.log(scrollTop)
						return false
					}
				}
			}
		},
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
	
	.cu-item.white{
		color: #666;
	}
	.cu-item.bg-black {
		background-color: #747474 !important;
		color: #fff;
	}
	
	.VerticalNav.nav.bc-black .bg-black.cu-item.cur::after {
		background-color: #c3c3c3 !important;
	}
	.bc-black {
		background-color: #adadad !important;
	}
	.cu-item.text-green.cur.bg-black {
	    background-color: #c3c3c3! important;
	}
</style>