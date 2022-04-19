<template>
	<view>
		<vote :vote="vote" :animationData="animationData" v-on:pSelectVote="selectVote"></vote>
	</view>
</template>
<script>
	import vote from '../../components/min-vote/vote.vue';
	export default {
		components: {
			vote
		},
	    data() {
	        return {
				animationData: [],
				vote:{
					title:'你最喜欢的游戏是？',
					nickname:'芒果',
					nums:2,
					vtList:[
						{title:'神秘海域',num:4000,percent:'20%',selected:false},
						{title:'地平线',num:6000,percent:'30%',selected:false},
						{title:'蜘蛛侠',num:2000,percent:'10%',selected:false},
						{title:'最后的生还者',num:8000,percent:'40%',selected:false}
						
					]
				}
	        }
	    },
		onLoad() {
			this.loadData();
		},
		methods: {
			loadData(){
				var animation = uni.createAnimation({
					duration: 1000
				});
				this.animation = animation;
				let vtList = this.vote.vtList;
				for(let i=0;i<vtList.length;i++){
					animation.width(vtList[i].percent).step();
					this.animationData[i] = animation.export();
				}
			},
			selectVote(item){
				let vtList = this.vote.vtList;
				vtList.forEach(v=>{
					v.selected = false;
				});
				item.selected = true;
			}
		}
	}
</script>
