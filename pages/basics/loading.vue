<!-- 服务器状态 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">检测服务器状态</block>
			<block slot="right">
				<view class="action">
					<view class="cu-load load-cuIcon" :class="!isLoad?'loading':'over'"></view>
				</view>
			</block>
		</cu-custom>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>服务器状态列表
			</view>
		</view>
		<view class="cu-load bg-blue" v-if="!isLoad" :class="!isLoad?'loading':'over'"></view>
		<view class="bg-white padding-sm" v-else>
			<view class="grid margin-bottom text-center solid-bottom justify-start">
				<view class="padding-left-sm padding-right-sm">
					运行状态
				</view>
				<view class="padding-left-sm padding-right-sm">
					节点名称
				</view>
				<view class="padding-left-sm padding-right-sm">
					CPU
				</view>
				<view class="padding-left-sm padding-right-sm">
					内存
				</view>
				<view class="padding-left-sm padding-right-sm">
					网络(B/s)↓|↑
				</view>
			</view>
			<view class="grid margin-bottom text-center solid-bottom justify-start" v-for="(item,index) in serverlist" :key="index">
				<view class="bg-gray" :class="indexs!=0?(indexs==1?'padding-top-sm padding-bottom-sm':'padding-sm'): 'padding-top-sm padding-left-sm padding-bottom-sm'" :style="indexs==1?'flex-basis:25%':''" v-for="(items,indexs) in 5" :key="indexs">
					<view v-if="indexs == 0">
						<view v-if="item.online4">
							<button class="cu-btn round sm bg-green shadow">运行中</button>
						</view>
						<view v-else>
							<button class="cu-btn round sm bg-red shadow">维护中</button>
						</view>
					</view>
					<view v-if="indexs == 1">
						{{item.name}}
					</view>
					<view v-if="indexs == 2">
						<view v-if="item.online4">
							{{item.cpu}}%
						</view>
						<view v-else>
							无
						</view>
					</view>
					<view v-if="indexs == 3">
						<view v-if="item.online4">
							{{Math.round(100*item.memory_used/item.memory_total)}}%
						</view>
						<view v-else>
							无
						</view>
					</view>
					<view v-if="indexs == 4">
						{{huazheng(item.network_rx,item.network_tx)}}
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>更新时间
			</view>
		</view>
		<view class="bg-white padding-sm">
			<view class="padding-left-sm padding-right-sm">
				{{updatetime}} 秒前
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				isLoad:false,
				loadModal: false,
				loadProgress: 0,
				updatetime:-100,
				serverlist:[],
			};
		},
		methods: {
			isLoading(e) {
				this.isLoad = e.detail.value;
			},
			LoadModal(e) {
				this.loadModal = true;
				setTimeout(() => {
					this.loadModal = false;
				}, 2000)
			},
			LoadProgress(e) {
				this.loadProgress = this.loadProgress + 3;
				if (this.loadProgress < 100) {
					setTimeout(() => {
						this.LoadProgress();
					}, 100)
				} else {
					this.loadProgress = 0;
				}
			},
			huazheng(e,f) {
				if(e>1024000&&f>1024000){
					return Math.round(e/1024/1024) + 'M|' + Math.round(f/1024/1024) + 'M';
				}else if(e>1024000){
					return Math.round(e/1024/1024) + 'M|' + Math.round(f/1024) + 'K';
				}else if(f>1024000){
					return Math.round(e/1024) + 'K|' + Math.round(f/1024/1024) + 'M';
				}else{
					return Math.round(e/1024) + 'K|' + Math.round(f/1024) + 'K';
				}
			},
			loadserver() {
				let that = this;
				uni.request({
					url: 'https://status.tianshi2.net/json/stats.json', //获取服务器json信息
					method: 'GET',
					timeout: 10000,
					data: {
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						var jsonfy = res.data.servers;
						console.log(jsonfy);
						that.updatetime = Math.floor(Date.now() / 1000) - res.data.updated;
						that.serverlist = jsonfy;
						setTimeout(function() {
							that.loadserver();
						}, 5000);
						that.isLoad = true;
					}
				});
			},
			timeplus(){
				let that = this;
				this.updatetime++;
				setTimeout(function() {
					that.timeplus();
				}, 1000);
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			this.loadserver();
			this.timeplus();
		}
	}
</script>

<style>

</style>
