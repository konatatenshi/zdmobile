<template>
	<view>
		<view class="intro-box">
			<view class="info">
				<view class="span">正确率:<text>{{zql}}</text></view>
			</view>
			<view class="prized-box">
				<view class="answer-main">
					<view class="name"><rich-text :nodes="'题目:' + question"></rich-text></view>
					<radio-group class="block" @change="RadioChange">
						<view class="cu-form-group justify-start" v-for="(radio, index) in tmlist" :key="index" v-if="radio.answer!=''">
							<radio :class="datixuanxiang==radio.id?'checked':''" :checked="datixuanxiang==radio.id?true:false" :value="radio.id"></radio>
							<rich-text v-if="radio.cuowu==0" class="title" :nodes="radio.answer"></rich-text>
							<rich-text v-else-if="radio.cuowu==1" class="title deleteline" :nodes="radio.answer"></rich-text>
						</view>
					</radio-group>
				</view>

			</view>
		</view>

		<view class="intro-box">
			<view class="info">
				<view class="span">倒计时</view>
			</view>
			<view class="prized-box">
				<view class="time-box">
					<view ref="uCountDown" style="text-align:center" >{{timestamp}}秒</view>
				</view>
			</view>
		</view>

		<view class="btnsub margin-bottom-sm" @click="submit">
			提 交
		</view>
		<view class="cu-modal" :class="[animation=='s'?'show animation-' +douka:'']">
			<view class="cu-dialog backgrou">
				<view class="bg-img" style="background-image: url('https://wx1.sinaimg.cn/large/65530274gy1fiv560bczcj20e00e00vw.jpg');height:600upx;">
					<view class="cu-bar justify-end text-white">
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
				userId:uni.getStorageSync('userInfo').id,
				days: false,
				hours: false,
				minutes: false,
				timestamp: 20,
				question: '',
				animation: '',
				modalName: '',
				douka: 'scale-up',
				zql: '',
				datixuanxiang: 0,
				time: 0,
				plustime: 0,
				tmlist: [],
				value: '',
				index: 0,
				submiti: 0,
				correctCount: 0
			};
		},
		onLoad() {
			this.index = 0;
			this.correctCount = 0;
			//判断是否登录
				this.tmlist = [];
				//获取题目
				this.getRandomSubject();
		},
		methods: {
			async getRandomSubject() {
				console.log(res);
			},
			// 选中某个单选框时，由radio时触发
			RadioChange(e) {
				this.datixuanxiang = e.detail.value
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			},
			loadti(){
				let that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ahome_dayquestion:pop', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						//console.log(res.data)
						if(res.data.code==202){
							if(res.data.time==0){
								uni.showToast({
									title:'你昨日未答题，算答题失败，请重新来过。',
									icon: "none",
								})
								setTimeout(function(){
								uni.redirectTo({
									url:"./dati"
								})},2000);
							}else{
								uni.showToast({
									title:'你答题超时，算答题失败，用时：' + res.data.time + '秒',
									icon: "none",
								})
								setTimeout(function(){
								uni.redirectTo({
									url:"./dati"
								})},2000);
							}
						}else if(res.data.code==201){
							uni.showToast({
								title:'你昨日未提交题库，但你有：' + res.data.mc + '张免错卡，此次错误不计入错误。正确答案：' + res.data.zqda,
								icon: "none",
							})
							setTimeout(function(){
								uni.redirectTo({
									url:"./dati"
							})},2000);
						}else if(res.data.code==300){
							that.tmlist = res.data.answer;
							that.question = res.data.qc;
							that.zql = res.data.zql;
							that.dateline = parseInt(res.data.dateline);
							that.plustime = res.data.plustime;
							const dateTime = Date.now();
							const nowtimestamp = Math.floor(dateTime / 1000);
							const timeleap = that.dateline + 20 + that.plustime - nowtimestamp;
							//console.log(timeleap);
							if(timeleap>0){
								that.timestamp = timeleap;
								that.daojishi();
							}else{
								that.chaoshi();
							}
						}else{
							uni.showToast({
								title:'你已经完成了答题，或者你不在答题允许的用户组',
								icon: "none",
							})
							setTimeout(function(){
								uni.redirectTo({
									url:"./dati"
							})},2000);
						}
					}
				});
			},
			daojishi(){
				let that = this;
				if(this.submiti == 1){
					return;
				}
				setTimeout(function(){
					that.timestamp = that.timestamp - 1;
					if(that.timestamp>0){
						that.daojishi();
					}else{
						that.chaoshi();
					}
				},1000)
			},
			chaoshi(){
				let that=this;
				this.timestamp = '超时';
				that.animation = 's'
				setTimeout(function(){
					that.douka = 'scale-downs';
					setTimeout(function(){
						that.modalName = '';
						that.animation = '';
					},1000)
				},1000)
			},
			async submit() {
				let that = this;
				this.submiti = 1; 
				if(this.datixuanxiang==0){
					uni.showToast({
						title:'你还未选任何一个选项',
						icon: "none",
					})
					return;
				}
				uni.showLoading({
					title: '提交中，请勿关闭页面'
				});
				//console.log(this.datixuanxiang);
				console.log(this.timestamp);
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ahome_dayquestion:pop', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						answer: that.datixuanxiang,
						timestamp: that.timestamp
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						uni.hideLoading();
						if(res.data.code==202){
							if(res.data.time==0){
								uni.showToast({
									title:'你昨日未答题，算答题失败，请重新来过。',
									icon: "none",
								})
								setTimeout(function(){
								uni.redirectTo({
									url:"./dati"
								})},2000);
							}else{
								uni.showToast({
									title:'你答题超时，算答题失败，用时：' + res.data.time + '秒',
									icon: "none",
								})
								setTimeout(function(){
								uni.redirectTo({
									url:"./dati"
								})},2000);
							}
						}else if(res.data.code==201){
							uni.showToast({
								title:'你答错或者超时了，但你有：' + res.data.mc + '张免错卡，此次错误不计入错误。正确答案：' + res.data.zqda,
								icon: "none",
							})
							setTimeout(function(){
								uni.redirectTo({
									url:"./dati"
							})},2000);
						}else if(res.data.code==203){
							uni.showToast({
								title:'很遗憾，你答错了。给与安慰奖+' + res.data.wrongminus + res.data.creditname,
								icon: "none",
							})
							setTimeout(function(){
								uni.redirectTo({
									url:"./dati"
							})},2000);
						}else if(res.data.code==200){
							uni.showToast({
								title:'恭喜，你答对了，给与奖励+' + res.data.bingoplus + res.data.creditname,
								icon: "none",
							})
							setTimeout(function(){
								uni.redirectTo({
									url:"./dati"
							})},2000);
						}
					}
				});
			},
			finished() {
				uni.showToast({
					title: "很遗憾时间到了",
					icon: "none",
				})
				this.submit();
			},
		},
		onLoad: function(option) { 
			this.loadti();
		}
	};
</script>

<style>
@import "@/static/css/dtstyle.css";
	page {
		background: #27a2ef;
	}
	uni-view.cu-form-group.justify-start {
	    min-height: 80upx;
	}
	.deleteline{
		text-decoration:line-through;
	}
	.backgrou{
		background-color: transparent!important;
	}
	.cu-form-group .title{
		text-align: left!important;
		height:auto!important;
	}
	view.btnsub.margin-bottom-sm {
		position: relative!important;
		margin-top: 100upx!important;
	}
</style>
