<template>
	<view>
		<cu-custom class="statustop"  bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">{{postname}}</block></cu-custom>
		<view class="cu-card dynamic no-card" :style="'margin-top: -' + iStatusBarHeight +'px;'">
			<view class="cu-item shadow">
				<view class="title"><view class="text-cut">{{postname}}</view></view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + avatarlist + ')' }]">
							<view v-show="sex==1" class="cu-tag badge cuIcon-male bg-blue"></view>
							<view v-show="sex==2" class="cu-tag badge cuIcon-female bg-pink"></view>
						</view>
						<view class="content flex-sub">
							<view>{{postup}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{nowdate}}
							</view>
						</view>
					</view>
				</view>
				<view class="text-content2">
					<mp-html :content="content" />
				</view>
				<view class="cu-list menu-avatar comment solids-top">
					<view class="cu-item">
						<view class="cu-avatar round" :style="[{ backgroundImage:'url(' + avatarlist + ')' }]"></view>
						<view class="content">
							<view class="text-grey">莫甘娜</view>
							<view class="text-gray text-content text-df">
								凯尔，你被自己的光芒变的盲目。
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>凯尔：</view>
									<view class="flex-sub">妹妹，你在帮他们给黑暗找借口吗?</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cuIcon-appreciatefill text-red"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
								</view>
							</view>
						</view>
					</view>

					<view class="cu-item">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content">
							<view class="text-grey">凯尔</view>
							<view class="text-gray text-content text-df">
								妹妹，如果不是为了飞翔，我们要这翅膀有什么用?
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>莫甘娜：</view>
									<view class="flex-sub">如果不能立足于大地，要这双脚又有何用?</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cuIcon-appreciate text-gray"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mpHtml from '@/components/mp-html/mp-html'
	export default {
		components: {
		 mpHtml
		},
		data() {
			return {
				isCard: false,
				postname: '加载中',
				content: '加载中',
				postup: '加载中',
				nowdate: '加载中',
				iStatusBarHeight: 0,
				sex: 0,
				avatarlist: '../../static/avatar.jpg',
			};
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
			cb(e){
			    if (e.target.nodeName === 'A') {
			        // 获取触发事件对象的属性
					this.$emit('cb');
			        var url = e.target.getAttribute('href');
			        console.log(url);
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
			loadthread(tid, page, orderby, dateline, filter, typeid) {
				let that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:post', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						tid: tid,
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
							that.postup = res.data.author;
							that.postname = res.data.subject;
							that.content = res.data.html;
							that.avatarlist = res.data.userinfo.avatarlist;
							that.nowdate = res.data.nowdate;
							that.sex = res.data.userinfo.sex;
							//console.log(that.threadlist);
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
						}
					}
				});
			},
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			this.tid = option.tid;
			console.log(option.tid); //打印出上个页面传递的参数。
			this.loadthread(this.tid);
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
		},
	}
</script>

<style>
.text-content2 {
	padding: 0 30upx 0;
	font-size: 30upx;
	margin-bottom: 20upx;
}
.cu-item .title {
	font-size: 40upx;
	font-weight: 900;
	color: #333333;
	line-height: 100upx;
	padding: 0 30upx;
}
</style>
