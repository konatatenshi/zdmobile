<template>
    <view class="page">
		
		<movable-area :style="{ width: getPersentageW(100) + 'px' , height: getPersentageH(30) + 'px'}">
			<image class="bgc-img" :src="bgImg" :style="{ width: getPersentageW(100) + 'px' , height: getPersentageH(30) + 'px'}"
			mode="scaleToFill"
			></image>
			<movable-view 
			@touchend="moveEnd"
			:x="x" :y="y"
			direction="horizontal" 
			:inertia="false" @change="onChange">
				<canvas class="myCanvas"
				:style="{top: getPersentageH(canvasH) +'px', left: slidX+'px',width: sliderBlockWidth + 'rpx', height: sliderBlockWidth +'rpx'}" 
				style="background-color: #f8f8f8;"
				canvas-id="myCanvas"></canvas>
				<view class="yzfk"><image class="tup" src="../../static/img/huakuai.png"></image></view>
			</movable-view>
		</movable-area>
    </view>
	
</template>

<script>
	var _self
	
	export default {
		data() {
			return {
				slidX: 0, // 滑块移动X坐标 单位px
				slidY: 100, // 滑块y轴坐标 单位px
				showPic: '', // 用于展示截取部分的图片地址
				x: 0,
				y: 0,
				old: {
					x: 0,
					y: 0,
				}
			}
		},
		props:{
			// 使用的图片
			bgImg: {
				type: String,
				default: '../../static/head.png'
			},
			//滑动成功百分比 范围0-100
			successNumber: {
				type: Number,
				default: 100
			},
			// 滑块高度（占屏幕的百分比）范围0-50
			canvasH: {
				type: Number,
				default: 25
			},
			//允许误差范围 单位px
			allowError: {
				type: Number,
				default: 3
			},
			//滑块宽度 单位rpx 最大80
			sliderBlockWidth: {
				type: Number,
				default: 80
			}
		},
		beforeCreate() {
			_self = this
		},
		mounted(){
			this.draw()
		},
		methods: {
			// 根据百分百计算页面高度 单位px
			getPersentageH(p){
				p = p /100
				// let h = uni.getSystemInfoSync().screenHeight/(uni.upx2px(100)/100)
				let h = uni.getSystemInfoSync().screenHeight
				return parseInt((h-_self.sliderBlockWidth) * p)
			},
			// 根据百分百计算计算页面宽度 单位px
			getPersentageW(p){
				p = p /100
				let w = uni.getSystemInfoSync().screenWidth
				return parseInt(w * p)
			},
			// 根据百分百计算滑动宽度 单位px
			getSlideW(p){
				p = p /100
				var w  = uni.getSystemInfoSync().screenWidth
				var px = uni.upx2px(_self.sliderBlockWidth)
				return parseInt((w-px) * p)
			},
			// 画布方法
			draw(){
				/* 创建canvas实例 */
				var ctx = uni.createCanvasContext('myCanvas')
				/* 绘制背景图 */
				ctx.drawImage(_self.bgImg, -1*_self.getSlideW(_self.successNumber), -1*_self.getPersentageH(_self.canvasH),this.getPersentageW(100),this.getPersentageH(30))
				ctx.save()
				ctx.draw()
				// 保存截图
				this.save_temp()
			},  
			// 保存截图
			save_temp(){
				uni.canvasToTempFilePath({
					canvasId: 'myCanvas',
					success: res => {
						// 保存图片地址
						this.showPic = res.tempFilePath
					},
					fail: err => console.log(err)
				})
			},
			tap: function(e) {
				// 解决view层不同步的问题
				this.x = this.old.x
				this.y = this.old.y
				this.$nextTick(function() {
					this.x = 0
					this.y = 0
				})
			},
			onChange: function(e) {
				this.old.x = e.detail.x
				this.old.y = e.detail.y
				
			},
			moveEnd(){
				// 获取可移动最大宽度 px
				var wid = uni.getSystemInfoSync().screenWidth-uni.upx2px(this.sliderBlockWidth)
				// 获取可选范围
				var max = wid*this.successNumber/100
				if(max-this.allowError <= this.old.x && max+this.allowError >=this.old.x){
					this.$emit('success')
					setTimeout(()=>{
						// 滑块复位
						this.tap()
					},1500)
				}else{
					this.$emit('refresh')
					this.tap()
				}
			}
		}
	}
</script>

<style lang="scss">
	movable-view {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80rpx;
		width: 80rpx;
		// background-color: #007AFF;
		// color: #fff;
		z-index: 2;
	}
	.yzfk{
		display: flex;
		position: relative;
		margin-top: 700upx;
		z-index: 2;
	}
	.tup{
		height: 70upx;
		width: 140upx;
	}
	movable-area {
		height: 50%;
		width: 100%;
		// background-color: #D8D8D8;
		overflow: hidden;
	}
	
	.myCanvas {
		position: absolute;
		/* background-color: #20B2AA; */
		z-index: 1;
		background-image: url("../../static/img/loadzd.gif");
		background-size:contain;
	}
	
	.showPic {
		margin-bottom: 10px;
		/* 添加阴影 */
		background-color: rgba(255,255,255,0.3);
		// border: 1px solid;
		position: absolute;
	}
	
</style>
