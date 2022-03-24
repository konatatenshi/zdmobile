<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">{{$t('api.back')}}</block><block slot="content">{{$t('extra.draw')}}</block></cu-custom>
		<qyq-luckDraw @lottoLuckDraw="lottoLuckDraw" :cardList="cardList"></qyq-luckDraw>
		
		<view class="cu-card article">
			<view class="cu-item shadow">
				<view class="title"><view class="text-cut">{{$t('extra.drawtxt')}}</view></view>
				<view class="content">
					<view class="desc">
						<view v-if="xingyun==1">
							<view class="cu-tag bg-yellow light sm round">{{$t('extra.luckys')}}</view>
						</view>
						<view>
							<view class="cu-tag bg-red light sm round">{{$t('extra.lrank1')}}:{{jrpm}} {{$t('extra.draw1')}}:{{fc}}{{$t('index.credits')}}</view>
						</view>
						<view>
							<view class="cu-tag bg-green light sm round">{{$t('extra.lrank2')}}:{{lxpm}} {{$t('extra.draw2')}}:{{lf}}{{$t('extra.days')}}</view>
						</view>
						<view>
							<view class="cu-tag bg-cyan light sm round">{{$t('extra.lrank3')}}:{{ljpm}} {{$t('extra.draw3')}}:{{zf}}{{$t('extra.days')}} {{$t('extra.totals')}}:{{lj}}{{$t('index.credits')}} {{$t('extra.nob')}}{{pm}}{{$t('extra.nob2')}}</view>
						</view>
						<view class="text-brown">{{$t('extra.rule1')}}:<br>1.{{$t('extra.rule2')}}！<br>2.{{$t('extra.rule3')}}<br>3.{{$t('extra.rule4')}}<br>4.{{$t('extra.rule5')}}<text v-if="platform==1">Apple</text><text v-else>Google</text>{{$t('extra.rule6')}}</view>
					<view class="text-center">
						<button class="cu-btn block bg-blue lg margin-xs" type="" @tap="phb()">{{$t('extra.toranking')}}</button>
					</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='chushihua'?'show':''" @tap.stop>
			<view class="cu-dialog" @tap.stop>
				<view class="text-content text-xl padding">{{$t('extra.reserved')}}</view>
				<view class="text-content text-cyan padding">{{$t('extra.reservedtxt')}}{{jiangchi}}</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-red" @tap="chongzhi" :disabled="isloading?true:false"><text class="cuIconfont-spin" :class="isloading1?'cuIcon-loading2':''"></text>{{$t('extra.reset')}}</button>
						<button class="cu-btn bg-green margin-left" @tap="baoliu()" :disabled="isloading?true:false"><text class="cuIconfont-spin" :class="isloading2?'cuIcon-loading2':''"></text>{{$t('extra.reserve')}}</button>
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
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
                    },
                    {
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
                    },
                    {
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
                    },
                    {
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
                    },
                    {
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
                    },
                    {
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
                    },
                    {
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
                    },
                    {
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
                    },
                    {
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
                    }
                ],
                cardList2:[
                    {
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
                    },
                    {
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
                    },
                    {
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
                    },
                    {
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
                    },
                    {
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
                    },
                    {
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
                    },
                    {
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
                    },
                    {
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
                    },
                    {
                        reward:this.$t('extra.loading'),
                        info:this.$t('index.credits')
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
				platform: 0,
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
			if (uni.getSystemInfoSync().platform == 'ios') {
				this.platform = 1;
			} else {
				this.platform = 2;
			}
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
				that.loading = this.$t('api.loading');
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
							title: that.$t('extra.reseted'),
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
							title: that.$t('extra.loaded'),
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
