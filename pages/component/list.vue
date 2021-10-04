<template>
	<view>
		<scroll-view :style="{'background-image': 'url('+backgroundimage+')'}" :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<cu-custom bgColor="bg-trans" :isBack="true" class="text-shadow1">
				<block slot="backText">返回</block>
				<block slot="right">
					<view class="action">
						<view class="cu-load cuIcon-mail padding-left-sm text-shadow1" @tap="more()"></view>
						<view class="cu-load cuIcon-more padding-left-sm text-shadow1" @tap="more()"></view>
					</view>
				</block>
			</cu-custom>
			<view class="cu-list2 menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar2 round border-custom" :style="{'background-image': 'url('+avatar+')'}"></view>
					<view class="content flex-sub">
						<view class="text-black">&nbsp;</view>
						<view class="text-black text-sm flex justify-end">
							&nbsp;
							<view class="text-black text-sm">
								<view class="margin-tb-sm text-center padding-right-xl"><button class="padding-left-xl padding-right-xl cu-btn round bg-purple border-custom">关注</button></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-trans no-border ">
				<view class="action">
					<text class="margin-left-xs text-xxl text-black text-bold text-shadow2">用户名</text>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" v-if="$adminid>0" @tap="showModal" data-target="menuModal">管理按钮</button>
				</view>
			</view>
			<view class="cu-list grid col-1 no-border solid-bottom">
				<view class="text-black text-content text-df margin-left-sm text-left "><text class="text-shadow1">UID:0000</text><text class="margin-left-xs cuIcon-copy text-shadow1"></text><text class="margin-right-xs margin-left-xs cuIcon-titles" style="color: #f5f5f5;"></text><text class="text-shadow1">点龄：0年</text><text class="margin-right-xs margin-left-xs cuIcon-titles" style="color: #f5f5f5;"></text><text class="cuIcon-male text-shadow1"></text></view>
				<view class="flex justify-start padding-left-sm"><view class="text-black text-content text-cut text-left text-shadow1" style="width: 75%;">You may use this piece of code in PHP to strip HTML tags, remove leading and ending spaces and convert special characters to HTML entities (if you put this into an HTML page):</view><view class="text-right text-black text-shadow1" style="width: 25%;">关于Ta<text class="margin-left-xs cuIcon-right"></text></view></view>
				<view class="flex justify-start padding-left-sm padding-top-sm"><view class="text-xl text-black text-bold text-shadow2">700</view><view class="padding-left-sm padding-right-xl text-black text-shadow1">获赞</view><view class="text-xl text-black text-bold text-shadow2">700</view><view class="padding-left-xs padding-right-xl text-black text-shadow1">关注</view><view class="text-xl text-black text-bold text-shadow2">700</view><view class="padding-left-sm padding-right-sm text-black text-shadow1">粉丝</view></view>
			</view>


			<scroll-view scroll-x class="bg-white nav">
				<view class="cu-item padding-left-xl padding-right-xl" :class="TabCur==0?'text-black text-bold cur':'text-black'" @tap="tabSelect(0)">
					Ta 的帖子 111
				</view>
				<view class="cu-item padding-left-xl padding-right-xl" :class="TabCur==1?'text-black text-bold cur':'text-black'" @tap="tabSelect(1)">
					Ta 的回复 222
				</view>
			</scroll-view>

			<view class="cu-bar bg-white border-custom2">
			</view>
		</scroll-view>
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
				avatar: '',
				backgroundimage: '',
				listTouchDirection: null,
				TabCur: 0,
			};
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			MenuBorder(e) {
				this.menuBorder = e.detail.value
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			MenuCard(e) {
				this.menuCard = e.detail.value
			},
			SwitchSex(e) {
				this.skin = e.detail.value
			},
			tabSelect(e) {
				this.TabCur = e;
			},

			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			getavatar(e){
				if (this.$imageswitch && this.$wifi == 0) {
					return e;
				} else {
					return e.replace("small","big");
				}
			}
		},
		onLoad: function(option) {
			this.uid = option.uid;
			console.log(option.uid); //打印出上个页面传递的参数。
			//this.loadthread(this.uid);
			this.avatar = this.getavatar(this.$avatarsmall);
			console.log(this.avatar);
		}
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
	.cu-avatar2{
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
	.cu-list2.menu-avatar>.cu-item{
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
	.cu-list.grid.no-border{
		margin-top: 0px;
		padding-top: 0px;
		background-color: transparent;
	}
	.page{
		background: top center no-repeat #efeff4 ;
		background-size: 100% 600upx;
		background-color: #FFFFFF;
	}
	.text-shadow1{
		text-shadow:-1px 0 white,0 1px white,1px 0 white,0 -1px white;
	}
	.text-shadow2{
		text-shadow:-2px 0 white,0 2px white,2px 0 white,0 -2px white;
	}
	.border-custom2{
		border-top:30upx solid #f1f1f1;
	}
	.border-custom{
		border:6upx solid white;
	}
</style>
