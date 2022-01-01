<template>
	<view>
		<cu-custom :bgColor="'bg-gradual-'+themeColor.name"  :isBack="true"><block slot="backText">返回</block>
			<block slot="content">好友列表</block>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入你要搜索的好友名字" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
			</view>
		</view>
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - '+ CustomBar + 'px - 50px)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<block v-for="(item,index) in list" :key="index">
				<view v-if="item.display!=0" :class="'indexItem-' + item.name" :id="'indexes-' + item.name" :data-index="item.name">
					<view class="padding">{{item.name}}</view>
					<view class="cu-list menu-avatar no-padding">
						<view class="cu-item" v-for="(items,sub) in friendlist[item.name]" :key="sub" @tap="touser(items.fuid)">
							<view class="cu-avatar round lg" 
							:style="{'background-image': 'url(https://zd.tiangal.com/uc_server/avatar.php?uid='+items.fuid+'&size=middle)'}"></view>
							<view class="content">
								<view class="text-grey"><text class="text-abc">{{items.fusername}}</text></view>
								<view class="text-gray text-sm">
									<text v-if="items.note">备注：，</text>成为好友时间：{{todate(items.dateline)}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="indexBar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 50px)'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur"> {{item.name}}</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: [],
				listCur: '',
				friendlist: [],
			};
		},
		onLoad() {
			let list = [{}];
			for (let i = 0; i < 26; i++) {
				list[i] = {};
				list[i].name = String.fromCharCode(65 + i);
				list[i].display = 0;
			}
			this.list = list;
			this.listCur = list[0];
			this.shuaxinlist();
		},
		onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec()
		},
		methods: {
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].name;
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.listCur
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].name
				};
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
			touser(e) {
				uni.navigateTo({
					url: '../component/list?uid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			shuaxinlist() {
				var that = this;
				that.loading = '载入中...';
					this.page0 = 0;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:friend', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							action: 'list'
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							for (let i = 0; i < 26; i++) {
								let chara = String.fromCharCode(65 + i);
								if(res.data[chara].length!=0){
									that.list[i].display = 1;
								}
							}
							that.friendlist = res.data;
						}
					});
			},
			
			//触发全部开始选择
			tStart() {
				this.hidden = false
			},

			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20
						return false
					}
				}
			}
		}
	}
</script>

<style>
	page {
		padding-top: 100upx;
	}

	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 1.7rem;
	}
</style>
