<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">摇奖抽卡</block></cu-custom>
		<qyq-luckDraw @lottoLuckDraw="lottoLuckDraw" :cardList="cardList"></qyq-luckDraw>
		
		<view class="cu-card article">
			<view class="cu-item shadow">
				<view class="title"><view class="text-cut">每日翻翻卡统计信息</view></view>
				<view class="content">
					<view class="desc">
						<view v-if="xingyun==1">
							<view class="cu-tag bg-yellow light sm round">超级幸运！此次抽奖必翻倍，金额必定大于等于16！</view>
						</view>
						<view>
							<view class="cu-tag bg-red light sm round">今日排名：{{jrpm}} 翻出：{{fc}}点币</view>
						</view>
						<view>
							<view class="cu-tag bg-green light sm round">连续排名：{{lxpm}} 连翻：{{lf}}天</view>
						</view>
						<view>
							<view class="cu-tag bg-cyan light sm round">累计排名：{{ljpm}} 总翻：{{zf}}天 累计：{{lj}}点币 第{{pm}}名</view>
						</view>
						<view class="text-brown">活动规则：<br>1.翻到金色卡牌翻倍！<br>2.如果连续30次翻卡均未抽中≥16的数字，则开启超级幸运模式，下次翻卡必翻倍，最终必获得≥16点币。（PS:每日前10名翻卡额外奖励50%点币。）<br>3.抽奖奖品为1-30（翻倍为最高60）点币。点币用来提升用户积分，并无其他用处。<br>4.在此活动中Apple不是赞助者，也没有以任何形式参与活动。</view>
					<view class="text-center">
						<button class="cu-btn block bg-blue lg margin-xs" type="" @tap="phb()">查看排行榜/旧版摇奖</button>
					</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='chushihua'?'show':''" @tap.stop>
			<view class="cu-dialog" @tap.stop>
				<view class="text-content text-xl padding">保留奖池提醒</view>
				<view class="text-content text-cyan padding">你上次摇奖还未初始化，是保留上次摇奖奖池还是继续抽奖？奖池还剩：{{jiangchi}}</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-red" @tap="chongzhi" :disabled="isloading?true:false"><text class="cuIconfont-spin" :class="isloading1?'cuIcon-loading2':''"></text>重置</button>
						<button class="cu-btn bg-green margin-left" @tap="baoliu()" :disabled="isloading?true:false"><text class="cuIconfont-spin" :class="isloading2?'cuIcon-loading2':''"></text>保留</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    import luckDraw from '../../components/qyq-luckDraw/qyq-luckDraw.vue'
    export default {
        data() {
            return {
                //卡片数组，reward为奖励，info为奖励信息
                cardList:[
                    {
                        reward:"载入中",
                        info:"点币"
                    },
                    {
                        reward:"载入中",
                        info:"点币"
                    },
                    {
                        reward:"载入中",
                        info:"点币"
                    },
                    {
                        reward:"载入中",
                        info:"点币"
                    },
                    {
                        reward:"载入中",
                        info:"点币"
                    },
                    {
                        reward:"载入中",
                        info:"点币"
                    },
                    {
                        reward:"载入中",
                        info:"点币"
                    },
                    {
                        reward:"载入中",
                        info:"点币"
                    },
                    {
                        reward:"载入中",
                        info:"点币"
                    }
                ],
                cardList2:[
                    {
                        reward:"载入中",
                        info:"点币"
                    },
                    {
                        reward:"载入中",
                        info:"点币"
                    },
                    {
                        reward:"载入中",
                        info:"点币"
                    },
                    {
                        reward:"载入中",
                        info:"点币"
                    },
                    {
                        reward:"载入中",
                        info:"点币"
                    },
                    {
                        reward:"载入中",
                        info:"点币"
                    },
                    {
                        reward:"载入中",
                        info:"点币"
                    },
                    {
                        reward:"载入中",
                        info:"点币"
                    },
                    {
                        reward:"载入中",
                        info:"点币"
                    }
                ],
				xingyun: 0,
				jrpm: 0,
				fc: 0,
				lxpm: 0,
				lf: 0,
				ljpm :0,
				zf: 0,
				lj: 0,
				pm: 0,
				jz: 0,
				modalName: null,
				jiangchi: '',
				isloading: false,
				isloading1: false,
				isloading2: false,
            }
        },
        components:{
            luckDraw
        },
		onLoad: function(option) {
			//this.uid = 19;
			//console.log(option.uid); //打印出上个页面传递的参数。
			//this.loadthread(this.uid);
			this.shuaxinlist();
		},
        methods: {
            //翻牌抽奖
            lottoLuckDraw(index){
				let that = this;
                console.log(index)
				setTimeout(()=>{
					that.shuaxinlist();
				},3000)
            },
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			phb() {
				uni.navigateTo({
					url: '../basics/progress'
				})
			},
			shuaxinlist() {
				var that = this;
				that.loading = '载入中...';
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=yinxingfei_zzza:yaoyao', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							apptoken: that.$token,
							relatedid: 1
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							that.xingyun = res.data.lucky;
							that.jrpm = res.data.todaypm;
							that.fc = res.data.todayfc;
							that.lxpm = res.data.lianxupm;
							that.lf = res.data.lianfan;
							that.ljpm = res.data.leijipm;
							that.zf = res.data.zongfan;
							that.pm = res.data.jifenpm;
							that.lj = res.data.leiji;
							if(res.data.yjcs ==0){
								that.modalName = 'chushihua';
								that.jiangchi = res.data.jc;
							}
							if(res.data.left!=''&&that.jz==0){
								that.cardList = res.data.left;
								that.jz = 1;
							}
						}
					});
			},
			chongzhi() {
				var that = this;
				that.isloading = true;
				that.isloading1 = true;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=yinxingfei_zzza:yaoyao', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							apptoken: that.$token,
							relatedid: 2
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							that.cardList = that.cardList2;
							that.modalName = null;
							console.log(res.data);
							uni.showToast({
							title: '已重置',
							duration: 2000
							});
						}
					});
			},
			baoliu() {
				var that = this;
				that.isloading = true;
				that.isloading2 = true;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=yinxingfei_zzza:yaoyao', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							apptoken: that.$token,
							relatedid: 3
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							that.modalName = null;
							console.log(res.data)
							uni.showToast({
							title: '已保留',
							duration: 2000
							});
						}
					});
			},
        }
    }
</script>

<style>
uni-view.title {
    line-height: 60upx!important;
}
</style>
