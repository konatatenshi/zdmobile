<template>
	<view>
		<view class="voteitem">
			<view class="voteleft">
				<view class="questiontit">{{vote.title}}</view>
				<view class="questionbtm">
					<text class="role"><a>{{vote.nickname}}</a>发起</text>
					<text class="state">投票进行中</text>
				</view>
			</view>
			<view class="voteright">
				<text class="joinnums">{{vote.nums}}万</text>
				<text class="jointxt">参与人数</text>
			</view>
		</view>
		<view class="ctitle" style="">投票选项(单选)</view>
		<view style="margin: 20rpx 20rpx 0 20rpx;">
			<view :class="item.selected?'skillbar active':'skillbar'" v-for="(item,index) in vote.vtList" :key="index" @click="selectVote(item)">
				<view class="skillbar-title"><text>{{item.title}}</text></view>
				<view :class="item.selected?'skillbar-bar active':'skillbar-bar'" :animation="animationData[index]"></view>
				<view class="skill-bar-percent">{{item.num}}({{item.percent}})</view>
			</view> 
		</view>
	</view>
</template>
<script>
	export default {
	    data() {
	        return {
	        	
	        }
	    },
		props: {
			animationData:{
				type: Array
			},
			vote: {
				type: Object
			}
		},
		onLoad() {
			
		},
		methods: {
			selectVote(item){
				this.$emit("pSelectVote",item);
			}
		}
	}
</script>

<style>
	.skillbar {
	    position: relative;
	    display: block;
	    margin-bottom: 10px;
	    width: 100%;
	    background: #eee;
	    height: 35px;
	    border-radius: 3px;
	}
	
	.skillbar-title {
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 150px;
	    font-weight: 700;
	    font-size: 13px;
	    color: #fff;
	}
	
	.skillbar-title text {
	    display: block;
	    padding: 0 20px;
	    height: 35px;
	    line-height: 35px;
	}
	.state{
		margin-right: 10rpx;
	}
	.skillbar-bar {
	    height: 35px;
	    width: 0px;
	    background: #cbcbcb;
	    border-radius: 3px;
	}
	
	.skill-bar-percent {
	    position: absolute;
	    right: 10px;
	    top: 0;
	    font-size: 11px;
	    height: 35px;
	    line-height: 35px;
	    color: #fff;
	    color: rgba(0,0,0,.4)
	}
	.voteitem{
		padding: 30rpx;
		background-color: #fff;
		display: flex;
	}
	.voteleft{
		float: left;
		width: 80%;
		position: relative;
	}
	.voteright{
		float: right;
		width: 20%;
		text-align: center;
		background-color: #eee;
		border-radius: 10rpx;
		position: relative;
		min-height: 100upx;
	}
	.joinnums{
		display: block;
		font-size: 40upx;
	}
	.jointxt{
		display: block;
		width: 100%;
		font-size: 20uxp;
		color: #435257;
		position: absolute;
		bottom: 10rpx;
		text-align: center;
	}
	.questiontit{
		font-size: 36upx;
		margin-bottom: 48rpx;
	}
	.questionbtm{
		font-size: 24upx;
		color: #b0b0b0;
		width: 100%;
		bottom: 16rpx;
		display: inline-block;
		position: absolute;
	}
	.role{
		margin-right: 10rpx;
	}
	.role a{
		color: #006EFF;
	}
	.ctitle{
		width:100%;
		height:80upx;
		background-color: 
		#eee;color:#B0B0B0;
		line-height: 80upx;
		padding-left: 32upx;
		font-size: 28upx;
	}
	.active{
		background-color: #39D754;
	}
</style>
