<template><view class="yzm_body">
	<view class="zhuti">
		<view :class="['msg', msgColor]">{{msg}}</view>
		<view class="title">拖动下方滑块完成拼图</view>
		<movable-area>
			<view id="pic" :style="{'background-image': 'url('+zhutuPic+')'}"></view>
			<view id="line"></view>
			<movable-view
				:style="{'background-image': 'url('+futuPic+')'}" :x="x" :damping="100" direction="horizontal"
				@change="onChange" @touchend="touchEnd">
				<view class="blue"></view>
			</movable-view>
		</movable-area>
		<view class="close iconfont iconguanbi" @click="$emit('close')"></view>
	</view>
</view></template>
<style>
@import '@/static/xlg-slideCode/xlg-slideCode-icon.css';/*图标样式*/
.yzm_body{
	background: rgba(0,0,0,0.3);
	width: 750rpx;
	height: 100vh;
	Position: fixed;
	top: 0;
	z-index: 999999;
}
.zhuti{
	background: #FFF;
	width: 600rpx;
	Position: absolute;
	top: 50%;left: 50%;
	transform: translate(-50%,-50%);
	padding: 20rpx 25rpx 30rpx 25rpx;
	border-radius: 5px;
}
.zhuti > .msg{
	color: #999;
	font-size: 24rpx;
}
.zhuti > .msg.red{color: red;}
.zhuti > .msg.green{color: green;}
.zhuti > .close{
	Position:absolute;
	top: 20rpx;
	right: 20rpx;
	color: #A6A6A6;
	font-size: 36rpx;
	padding: 10rpx;
}
.zhuti > .title{
	font-size: 28rpx;
	line-height: 38rpx;
	color: #333;
	margin: 0 0 7rpx 0;
}
.zhuti > movable-area {
	width: 100%;
	height: auto;
}
.zhuti > movable-area > #pic{
	width: 100%;
	height: 310rpx;
	background-size: 100% 310rpx;
}
.zhuti > movable-area > #line{
	background: #e4e4e4;
	width: 100%;
	height: 20rpx;
	margin: 42rpx 0 15rpx 0;
	border-radius: 50rpx;
	display: inline-block;
}
.zhuti > movable-area > movable-view{
	width: 72rpx;
	height: 310rpx;
	background-size: 100% 310rpx;
}
.zhuti > movable-area > movable-view > .blue{
	box-shadow: rgba(26, 101, 255, 0.52) 0px 0px 10px 1px;
	width: 100rpx;
	height: 50rpx;
	border-radius: 50rpx;
	Position:absolute;
	top: 335rpx;left: 0;
	background: rgb(26, 101, 255) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAcAgMAAABuexVFAAAACVBMVEUAAADCwsL9/f1P0DqbAAAAAXRSTlMAQObYZgAAAB1JREFUGNNjCGVgYGANABKhyMwoEHMBkIgaZWIwAdyJJQnaJRg5AAAAAElFTkSuQmCC) no-repeat;
	background-size: auto 20rpx;
	background-position: 50% 50%;
	margin-left: -14rpx;
}
</style>
<script>
	export default {
		props:{
			session_id:	{type: Number, default: ''},
		},
		data() {
			return {
				zhutuPic: '../../static/loading.gif',//主图
				futuPic: '',//缺口图
				x: 10,//默认的位置
				msg: '安全验证',//提示信息
				msgColor: '',
			};
		},
		mounted(){//该组件被挂载到实例上去之后调用
			this.shuaxin()
		},
		methods: {
			shuaxin: function(){
				uni.request({method: 'get',dataType: 'json',
					url: getApp().globalData.zddomain + 'img/ajax/yzm_pic.php',
					data: {
						type: 'shengcheng',
						session_id: this.session_id
					},
					success: (res) => {
						console.log(res.data);
						if(res.data.code === 1){//生成验证码成功
							//time参数作用是让刷新后图片会重新获取
							this.zhutuPic = getApp().globalData.zddomain + 'img/ajax/yzm_pic.php?type=zhutu&session_id='+this.session_id+'&time='+(new Date()*1)
							this.futuPic = getApp().globalData.zddomain + 'img/ajax/yzm_pic.php?type=futu&session_id='+this.session_id+'&time='+(new Date()*1)
						}else{
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
			},
			onChange: function(e){
				if(e.detail.source === 'touch'){//只有是手动触发的，才执行
					this.x = e.detail.x
				}
			},
			doudong: function(){//抖动 【总耗时 500ms】
				setTimeout(() => {
					this.x -= 15;
					setTimeout(() => {
						this.x += 30
						setTimeout(() => {
							this.x -= 30
							setTimeout(() => {
								this.x += 30
								setTimeout(() => {
									this.x = 10
								},100);
							},100);
						},100);
					},100);
				},100);
			},
			touchEnd: function(){//手指离开了
				this.msg = '验证中'
				this.msgColor = ''
				uni.request({method: 'get',dataType: 'json',
					url: getApp().globalData.zddomain + 'img/ajax/yzm_pic.php',
					data: {
						type: 'yanzheng',
						session_id: this.session_id,
						x: parseInt(this.x * (679 / uni.upx2px(550)))//因为x是相对于网页宽度的，而不是相对于实际图片宽度。所以需要计算一下
					},
					success: (res) => {
						console.log(res.data);
						if(res.data.code === 1){
							this.$emit('success', parseInt(this.x * (679 / uni.upx2px(550))))
							this.msg = '验证成功'
							this.msgColor = 'green'
							setTimeout(() => {
								this.$emit('close')
							}, 300);
						}else if(res.data.code === 2){
							this.doudong()//抖动
							if(res.data.msg === '验证码错误次数过多，请重新获取'){
								this.msg = '安全验证'
								this.msgColor = ''
								setTimeout(() => {
									this.shuaxin()
								},500);
							}else if(res.data.msg === '图形滑块验证码位置有误'){
								this.msg = '请控制拼图块对齐缺口'
								this.msgColor = 'red'
							}else{
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 2000
								});
							}
							setTimeout(() => {
								this.msg = '安全验证'
								this.msgColor = ''
							}, 3500);
						}
					}
				});
			},
		},
	}
</script>