<template>
	<view>
		<cu-custom class="statustop" bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{postname}}</block>
		</cu-custom>
		<view class="cu-card dynamic no-card" :style="'margin-top: -' + iStatusBarHeight +'px;'">
			<view class="cu-item shadow">
				<view class="title">
					<view class="text-cut">{{postname}}</view>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + avatarlist + ')' }]">
							<view v-show="sex==1" class="cu-tag badge cuIcon-male bg-blue"></view>
							<view v-show="sex==2" class="cu-tag badge cuIcon-female bg-pink"></view>
						</view>
						<view class="content flex-sub hbx">
							<view><img-cache class="touxian" :src="touxian"></img-cache></view>
							<view>{{postup}}<text :style="[{ padding: groupid==51?'0 0 0 4upx':'0 0 0 10upx'}]"></text><view class="cu-tag padding-left-xs padding-right-xs" :class="loadlevelicon(groupid,1)">{{loadlevelicon(groupid)}}</view><text :style="[{ padding: groupid==51?'0 0 0 4upx':'0'}]"></text><span v-if="xunzhanglist.length>0" v-for="(xzitem,xzindex) in xunzhanglist.slice(0, 6)"><img-cache v-if="xzitem.id>0" class="cu-tag xunzhangshow" :src="xzitem.url"></img-cache></span></view>
							<view><span v-if="xunzhanglist.length>6" v-for="(xzitem,xzindex) in xunzhanglist.slice(6, 20)"><img-cache v-if="xzitem.id>0" class="cu-tag xunzhangshow" :src="xzitem.url"></img-cache></span></view>
							<view class="text-gray text-sm flex justify-start">
								{{nowdate}}
								<view v-if="status&128&&status&8" class="text-xs text-blue cuIcon-mobile">来自iPhone客户端</view>
								<view v-else-if="status&256&&status&8" class="text-xs text-green cuIcon-mobile">来自Android客户端</view>
								<view v-else-if="status&8" class="text-xs text-gray cuIcon-mobile">来自手机网页版</view>
							</view>
						</view>
					</view>
				</view>
				<view class="text-content2">
					<view v-if="content==''" class="cu-load text-gray loading"></view>
					<mp-html :content="content" @linktap="linktap" />
					<view v-if="jiance.type>0" class="text-center" @tap="jiancequery()">
						<view v-if="jiance.type==1" class="padding-xs radius shadow shadow-lg bg-cyan margin-top text-sm ltsp">[{{jiance.time}}]网盘检测存活，失效点此<view class="margin-left-xs margin-bottom-xs padding-left-xs padding-right-xs cu-capsule bg-gray"><view class="cu-tag line-red">{{jiance.cishu}}</view></view></view>
						<view v-else-if="jiance.type==2" class="padding-xs radius shadow shadow-lg bg-orange margin-top text-sm ltsp">[{{jiance.time}}]百度盘失效，重检点此<view class="margin-left-xs margin-bottom-xs padding-left-xs padding-right-xs cu-capsule bg-gray"><view class="cu-tag line-red">{{jiance.cishu}}</view></view></view>
						<view v-else-if="jiance.type==3" class="padding-xs radius shadow shadow-lg bg-yellow margin-top text-sm ltsp">[{{jiance.time}}]Google盘失效，重检点此<view class="margin-left-xs margin-bottom-xs padding-left-xs padding-right-xs cu-capsule bg-gray"><view class="cu-tag line-red">{{jiance.cishu}}</view></view></view>
						<view v-else-if="jiance.type==4" class="padding-xs radius shadow shadow-lg bg-black margin-top text-sm ltsp">[{{jiance.time}}]百度谷歌失效，重检点此<view class="margin-left-xs margin-bottom-xs padding-left-xs padding-right-xs cu-capsule bg-gray"><view class="cu-tag line-red">{{jiance.cishu}}</view></view></view>
						<view v-else-if="jiance.type==5" class="padding-sm radius shadow shadow-lg bg-blue margin-top text-sm ltsp">如链接失效请点此检测</view>
					</view>
					<view v-if="lucky>=0" class="text-center">
						<view v-if="lucky==1" class="padding-xs radius shadow shadow-lg bg-green margin-top text-xs ltsp">发帖际遇：{{luckymessage}}</view>
						<view v-else class="padding-xs radius shadow shadow-lg bg-red margin-top text-xs ltsp">发帖际遇：{{luckymessage}}</view>
					</view>
					<view class="padding flex p-xs margin-bottom-sm mb-sm">
						<view class="cu-capsule flex-sub">
							<view class='cu-tag bg-red padding-sm'>
								<text class='cuIcon-likefill'>收藏</text>
							</view>
							<view class="cu-tag line-red padding-sm">
								{{favorite}}
							</view>
						</view>
						<view class="cu-capsule flex-sub">
							<view class='cu-tag bg-blue padding-sm'>
								<text class='cuIcon-moneybagfill'>打赏</text>
							</view>
							<view class="cu-tag line-blue padding-sm">
								{{dashang}}
							</view>
						</view>
						<view class="cu-capsule flex-sub">
							<view class='cu-tag bg-pink padding-sm'>
								<text class='cuIcon-appreciatefill'>点赞</text>
							</view>
							<view class="cu-tag line-pink padding-sm">
								{{dashang}}
							</view>
						</view>
					</view>
				</view>
				<view class="cu-list menu-avatar comment solids-top" v-for="(item,index) in huifulist" :key="index" :data-id="index">
					<view class="cu-item">
						<view class="cu-avatar round" :style="[{ backgroundImage:'url(' + item.avatarlist + ')' }]">
						</view>
						<view class="content hbx">
							<view><img-cache class="touxian2" :src="item.touxian"></img-cache></view>
							<view class="flex justify-between">
								<view class="text-grey">{{item.author}}<text :style="[{ padding: item.groupid==51?'0 0 0 4upx':'0 0 0 10upx'}]"></text><span class="cu-tag padding-left-xs padding-right-xs" :class="loadlevelicon(item.groupid,1)">{{loadlevelicon(item.groupid)}}</span><text :style="[{ padding: item.groupid==51?'0 0 0 4upx':'0'}]"></text><span v-if="item.xunzhanglist.length>0" v-for="(xxzitem,xxzindex) in item.xunzhanglist.slice(0, 6)"><img-cache v-if="xxzitem.id>0" class="cu-tag xunzhangshow" :src="xxzitem.url"></img-cache></span></view>
								<view class="text-grey text-sm">{{index+2}}楼</view>
							</view>
							<view class="flex justify-start">
								<view class="text-gray text-sm">{{item.dateline}}</view>
								<view v-if="item.status&128&&item.status&8" class="text-xs text-blue cuIcon-mobile">来自iPhone客户端</view>
								<view v-else-if="item.status&256&&item.status&8" class="text-xs text-green cuIcon-mobile">来自Android客户端</view>
								<view v-else-if="item.status&8" class="text-xs text-gray cuIcon-mobile">来自手机网页版</view>
							</view>
							<mp-html v-if="item.status&1" class="text-content text-df float" :class="isfloat[index]?'show':'hide'"
								:content="pingbi" @linktap="linktap" />
							<mp-html v-else-if="!isfloat[index]" class="text-content text-df float" :class="isfloat[index]?'show':'hide'"
								:content="item.html.substr(0,140)" @linktap="linktap" />
							<mp-html v-else class="text-content text-df float" :class="isfloat[index]?'show':'hide'"
								:content="item.html" @linktap="linktap" />
							<view class="text-blue" v-if="Letter(item.html).length>70&&isfloat[index]!= true"
								@tap="loadmore(index)">展开</view>
							<view v-if="item.luckypost.key>=0" class="text-center">
								<view v-if="item.luckypost.key==1" class="padding-xs radius shadow shadow-lg bg-green margin-top text-xs ltsp">发帖际遇：{{item.luckypost.msg}}</view>
								<view v-else class="padding-xs radius shadow shadow-lg bg-red margin-top text-xs ltsp">发帖际遇：{{item.luckypost.msg}}</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view>
									<text class="cuIcon-appreciatefill" :class="item.zan?'text-red':'text-gray'"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm" @tap="lzpo(item.pid,index)"></text>
								</view>
								<view>
									<text class="cuIcon-more text-gray margin-right-sm"></text>
								</view>
							</view>
							<view v-if="item.reply>0" class="bg-gray padding-sm radius margin-top-sm  text-sm">
								<view class="flex" v-for="(rpitem,rpindex) in item.floor" :key="'b' + rpindex"
									:data-id="rpindex">
									<rich-text class="flex-sub" :nodes="rpitem.content" @tap="lzlpo(rpitem.uid,item.pid,index)"></rich-text>
								</view>
								<view class="flex" v-for="(rpxitem,rpxindex) in rplist[index]" :key="'c' + rpxindex"
									:data-id="rpxindex">
									<rich-text class="flex-sub" :nodes="rpxitem.content" @tap="lzlpo(rpxitem.uid,item.pid,index)" /></rich-text>
								</view>
								<view class="flex text-blue" v-if="item.reply>5&&jiazaiwanbi[index]!=1&&jiazai==0" @tap="loadfloor(item.pid,index)">共
									{{item.reply}} 条回复<text class="cuIcon-right"></text>
								</view>
								<view class="flex text-blue" v-else-if="item.reply>5&&jiazaiwanbi[index]!=1&&jiazai==1">加载中<text class="cuIcon-right"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view>
					<block>
						<view class="padding-xs flex align-center bg-gray">
							<view class="flex-sub text-center">
								<view class="text-xs padding">
									<text class="text-black">{{loading}}</text>
								</view>
							</view>
						</view>
					</block>
				</view>
				<view class="cu-modal" :class="modalName=='needlogin'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">需要登录</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							你需要登录才可以使用此功能。
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
								<button class="cu-btn bg-green margin-left" @tap="tologin">确定</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='cantview'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">权限不足</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							无法进入帖子，错误提示：{{cantviewmessage}}
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn bg-green margin-left" @tap="back">确定</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='cantpost'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">回帖错误</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							无法回帖，错误提示：{{cantpostmessage}}
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='testpan'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">帖子检测</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							请选择你需要检测的网盘。
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn bg-green margin-left" @tap="jiancequery2()">百度</button>
								<button disabled class="cu-btn bg-blue margin-left" @tap="">谷歌</button>
								<button disabled class="cu-btn bg-cyan margin-left" @tap="">测试</button>
							</view>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button disabled class="cu-btn bg-yellow margin-left" @tap="">微云</button>
								<button disabled class="cu-btn bg-purple margin-left" @tap="">微软</button>
								<button disabled class="cu-btn bg-pink margin-left" @tap="">直连</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-load load-modal" v-if="loadModal">
					<!-- <view class="cuIcon-emojifill text-orange"></view> -->
					<image src="/static/19.gif" style="border-radius: 50%;" mode="aspectFit"></image>
					<view class="gray-text">检测中...</view>
				</view>
				<view class="cu-modal" :class="modalName=='floorpost'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">楼中楼回复</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							<view class="cu-form-group align-start">
								<textarea maxlength="-1" v-model="floorhuifu" placeholder="请在此输入想要说的话"></textarea>
								<text class="cuIcon-emojifill text-grey" @tap="togglePicker(200, 'emoji')"></text>
							</view>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view v-if="closed==0" class="action">
								<button class="cu-btn bg-green margin-left" @tap="sendfloor">发送</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='postnew'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">发表回复成功</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							发表错误成功，请点击确定刷新帖子。
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
								<button class="cu-btn bg-green margin-left" @tap="refresh">确定</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="jifencaozuo!=0?'show':''">
					<button class="cu-btn margin-sm basis-sm shadow bg-orange" :class="jifencaozuo==1?'animation-scale-up':'animation-reverse animation-scale-down'">
						<text class="text-xl text-white text-shadow">{{jifenshuoming}}：</text><text class="text-xl text-white text-shadow">{{jifenbiangeng}}</text>
					</button>
				</view>
				<view class="cu-modal" :class="showEmoji?'show':''" @tap.prevent.stop="">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">请选择表情</view>
							<view class="action" @tap="closeemoji">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl emoji">
							<view class="list">
								<view class="item" @tap="floorhuif(item)" v-for="(item, index) in emojis"
									:key="index">
									<img-cache class="icon"
										:src="'https://bbs.zdfx.net/static/image/smiley/tieba/' + index + '.png'">
									</img-cache>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="InputBottom!=0" class="overlayer" @touchmove.stop.prevent = "doNothing">
		</view>
		<view class="cu-bar foot input button__box" :style="[{bottom:InputBottom+'px'}]" @touchmove.stop.prevent = "doNothing">
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="1000" cursor-spacing="10"
				@focus="InputFocus" @blur="InputBlur" v-model="contenthuifu"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey" @tap="togglePicker(200, 'emoji')"></text>
				<text class="cuIcon-roundadd text-grey" @tap="togglePicker(100, 'file')"></text>
			</view>
			<button v-if="closed==0" @tap="sendmessage" class="cu-btn bg-green shadow"><text class="cuIconfont-spin" :class="fasong?'cuIcon-loading2':''"></text>发送</button>
		</view>
		<!--表情-->
		<!--附件-->
		<view v-show="showFile" class="file" @tap.prevent.stop="">
			<view class="list flex-row">
				<view class="item flex-column">
					<image src="../../static/img/album.png" mode="widthFix" class="icon"></image>
					<view class="text">相册</view>
				</view>
				<view class="item flex-column">
					<image src="../../static/img/photo.png" mode="widthFix" class="icon"></image>
					<view class="text">拍照</view>
				</view>
				<view class="item flex-column">
					<image src="../../static/img/group.png" mode="widthFix" class="icon"></image>
					<view class="text">红包</view>
				</view>
			</view>
		</view>
		<view class="load-progress" v-show="loadProgress!=0" :style="[{top:CustomBar+'px'}]">
			<view class="load-progress-bar bg-green" :style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
			<view class="load-progress-spinner text-green"></view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import mpHtml from '@/components/mp-html/mp-html'
	export default {
		components: {
			mpHtml
		},
		data() {
			return {
				isCard: false,
				postname: '加载中',
				contenthuifu: '',
				floorhuifu: '',
				content: '',
				postup: '加载中',
				nowdate: '加载中',
				jifenbiangeng: '积分名+1',
				jifenshuoming: '积分变更',
				pingbi: '<div style=\"overflow: hidden;border: 1px dashed #FF9A9A;margin: 8px 0;padding: 10px;zoom: 1;\">此帖因违规被屏蔽，不可见。</div>',
				cantviewmessage: '',
				cantpostmessage: '',
				replykey: '',
				touxian: '',
				lucky:-1,
				luckymessage:'',
				luckyme:[],
				jiance:[],
				iStatusBarHeight: 0,
				sex: 0,
				status: 0,
				ding: 0,
				favorite: 0,
				dashang: 0,
				loadProgress: 0,
				jifencaozuo: 0,
				tid: 0,
				fid: 0,
				closed: 0,
				groupid: 0,
				pid: 0,
				page: 0,
				toUID: 0,
				toPID: 0,
				index: 0,
				fasong: false,
				floorfasong: false,
				loadModal: false,
				floorpage: [],
				jiazai :0,
				jiazaiwanbi: [],
				InputBottom: 0,
				platform: 0,
				loadwb: 0,
				huifulist: [],
				rplist: [],
				isfloat: [],
				xunzhanglist: [],
				isfloats: false,
				modalName: null,
				loading: "上拉可加载更多回复",
				avatarlist: '../../static/avatar.jpg',
				emojis: ["{:4_91:}","{:4_107:}", "{:4_100:}", "{:4_115:}", "{:4_104:}", "{:4_98:}", "{:4_114:}", "{:4_88:}",
					"{:4_87:}", "{:4_135:}", "{:4_131:}", "{:4_134:}", "{:4_106:}", "{:4_99:}", "{:4_93:}",
					"{:4_103:}", "{:4_120:}", "{:4_125:}", "{:4_108:}", "{:4_95:}", "{:4_102:}", "{:4_121:}",
					"{:4_126:}", "{:4_129:}", "{:4_119:}", "{:4_127:}", "{:4_132:}", "{:4_133:}", "{:4_112:}",
					"{:4_128:}", "{:4_122:}", "{:4_124:}", "{:4_130:}", "{:4_97:}", "{:4_111:}", "{:4_90:}",
					"{:4_117:}", "{:4_94:}", "{:4_113:}", "{:4_89:}", "{:4_96:}", "{:4_109:}", "{:4_92:}", "{:4_118:}",
					"{:4_101:}", "{:4_123:}", "{:4_116:}", "{:4_105:}"
				],
				showEmoji: false,
				showFile: false,
				showmove: false,
			};
		},
		methods: {
			hideModal(e) {
				this.modalName = null
			},
			jiequ(e) {
				return e.substr(0,200);
			},
			jifenbiandong(e,f){
				this.jifenshuoming=e;
				this.jifenbiangeng=f;
				this.jifencaozuo = 1;
				setTimeout(()=>{
					this.jifencaozuo= 2;
				}, 1000)
				setTimeout(()=>{
					this.jifencaozuo= 0;
				}, 2000)
			},
			Letter(str) {
				let result;		
				let reg = /[a-zA-Z]+/;  //[a-zA-Z]表示匹配字母，g表示全局匹配			
				while (result = str.match(reg)) { //判断str.match(reg)是否没有字母了			
					str = str.replace(result[0], ''); //替换掉字母  result[0] 是 str.match(reg)匹配到的字母			
				}			
			  return str;			
			},
			closeemoji(e) {
				this.showEmoji = false
			},
			back(){
				uni.navigateBack();
			},
			LoadProgresss(e) {
				this.loadProgress = this.loadProgress + 3;
				if (this.loadProgress < 100) {
					if(this.loadwb == 1){
						this.loadProgress = 0;
						return;
					}
					console.log(this.loadProgress);
					setTimeout(() => {
						this.LoadProgresss();
					}, 100)
				} else {
					this.loadProgress = 0;
				}
			},
			loadmore(e) {
				Vue.set(this.isfloat, e, true);
				console.log(e);
				console.log(this.isfloat[e]);
			},
			loadfloor(e,j) {
				if(this.$floorswitch){
					if(this.floorpage[j] == undefined){
						this.floorpage[j] = 0;
					}
					this.loadfloors(e, this.floorpage[j],0,0,0,j);
				}else{
					console.log(e);
					this.tofloor(e);
				}
			},
			doNothing:function(){
				
			},
			jiancequery(){
				this.modalName='testpan';
			},
			jiancequery2(){
				let that = this;
				console.log(this.jiance);
				console.log(this.pid);
				this.modalName= null;
				this.loadModal=true;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=iplus_ad_corner:test', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						uid: that.$uid,
						url: that.jiance.data,
						sig: that.jiance.sign,
						pid: that.pid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.code == 200) {
							that.jifenbiandong('网盘检测','恭喜，该链接有效');
							that.loadthread(that.tid);
						} else if (res.data.code == 400) {
							that.jifenbiandong('网盘检测','该链接检测已失效');
							that.loadthread(that.tid);
						} else if (res.data.code == 500) {
							that.jifenbiandong('网盘检测','检测频率过快，稍后再试');
							that.loadthread(that.tid);
						} else if (res.data.code == 301) {
							that.jifenbiandong('网盘检测','只能作者或管理员验证');
							that.loadthread(that.tid);
						} else {
							that.jifenbiandong('网盘检测','功能错误');
							that.loadthread(that.tid);
						}
						that.loadModal=false;
					}
				});
			},
			lzlpo(e,f,g) {
				if(this.$floorswitch){
					console.log(e);
					console.log(f);
					this.toUID = e;
					this.toPID = f;
					this.modalName='floorpost';
					this.index = g;
				}else{
					console.log(e);
					console.log(f);
					console.log(g);
					this.tofloor(f);
				}
			},
			lzpo(f,g) {
				console.log(f);
				this.toUID = 0;
				this.toPID = f;
				this.index = g;
				this.modalName='floorpost';
			},
			floorhuif(e){
				if(this.modalName =='floorpost'){
					this.floorhuifu += e;
					this.showEmoji = false;
				}else{
					this.contenthuifu += e;
					this.showEmoji = false;
				}
			},
			linktap(e) {
				console.log(e);
				if (e.target == 'app') {
					uni.navigateTo({
						url: '../component/card?tid=' + e.apphref,
						animationType: 'pop-in',
						animationDuration: 200
					});
				}else if(e.target == 'hbbtn1'){
					let that=this;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=it618_hongbao:ajax', //获取置顶帖子
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							type: 'tie',
							tid: that.tid,
							hongbaocode: '',
							ac: 'gethongbao',
							app: 1
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data)
							if (res.data.code == 200) {
								that.jifenbiandong(res.data.title,res.data.message);
								that.loadthread(that.tid);
							} else {
								that.jifenbiandong('领取失败',res.data);
							}
						}
					});
				}
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			tothebottom() {
				this.loadthread(this.forumid, this.mainpage);
				console.log("到底了");
			},
			imgMap(url) {
				uni.previewImage({
					urls: [url], //这里一定是数组，不然就报错
				});
			},
			loadlevelicon(e, f) {
				if (e == 7) {
					if (f == 1) {
						return 'line-gray';
					} else {
						return '游客';
					}
				} else if (e == 9) {
					if (f == 1) {
						return 'line-gray';
					} else {
						return 'Lv0';
					}
				} else if (e == 10) {
					if (f == 1) {
						return 'line-gray';
					} else {
						return 'Lv1';
					}
				} else if (e == 29) {
					if (f == 1) {
						return 'light bg-grey';
					} else {
						return 'Lv2';
					}
				} else if (e == 30) {
					if (f == 1) {
						return 'light bg-olive';
					} else {
						return 'Lv3';
					}
				} else if (e == 31) {
					if (f == 1) {
						return 'light bg-cyan';
					} else {
						return 'Lv4';
					}
				} else if (e == 32) {
					if (f == 1) {
						return 'light bg-blue';
					} else {
						return 'Lv5';
					}
				} else if (e == 33) {
					if (f == 1) {
						return 'light bg-purple';
					} else {
						return 'Lv6';
					}
				} else if (e == 34) {
					if (f == 1) {
						return 'light bg-mauve';
					} else {
						return 'Lv7';
					}
				} else if (e == 35) {
					if (f == 1) {
						return 'light bg-pink';
					} else {
						return 'Lv8';
					}
				} else if (e == 36) {
					if (f == 1) {
						return 'light bg-brown';
					} else {
						return 'Lv9';
					}
				} else if (e == 37) {
					if (f == 1) {
						return 'light bg-yellow';
					} else {
						return 'Lv10';
					}
				} else if (e == 38) {
					if (f == 1) {
						return 'light bg-orange';
					} else {
						return 'Lv11';
					}
				} else if (e == 52) {
					if (f == 1) {
						return 'light bg-red';
					} else {
						return 'Lv12';
					}
				} else if (e == 54) {
					if (f == 1) {
						return 'light bg-blue';
					} else {
						return 'Lv13';
					}
				} else if (e == 4) {
					if (f == 1) {
						return 'light bg-grey';
					} else {
						return '禁言';
					}
				} else if (e == 5) {
					if (f == 1) {
						return 'light bg-grey';
					} else {
						return '封禁';
					}
				} else if (e == 6) {
					if (f == 1) {
						return 'light bg-grey';
					} else {
						return 'IP禁止';
					}
				} else if (e == 8) {
					if (f == 1) {
						return 'light bg-gray';
					} else {
						return 'QQ游客';
					}
				} else if (e == 41) {
					if (f == 1) {
						return 'light bg-mauve';
					} else {
						return '摸鱼组';
					}
				} else if (e == 42) {
					if (f == 1) {
						return 'light bg-pink';
					} else {
						return '宣传组';
					}
				} else if (e == 50) {
					if (f == 1) {
						return 'light bg-cyan';
					} else {
						return '测试组';
					}
				} else if (e == 44 || e == 51) {
					if (f == 1) {
						return 'vip';
					} else {
						return '';
					}
				} else if (e == 1) {
					if (f == 1) {
						return 'bg-blue';
					} else {
						return '管理员';
					}
				} else if (e == 2) {
					if (f == 1) {
						return 'bg-cyan';
					} else {
						return '超版';
					}
				} else if (e == 3) {
					if (f == 1) {
						return 'bg-green';
					} else {
						return '版主';
					}
				} else if (e == 16) {
					if (f == 1) {
						return 'bg-grey';
					} else {
						return '见习版主';
					}
				} else if (e == 17) {
					if (f == 1) {
						return 'bg-orange';
					} else {
						return '总编辑';
					}
				} else if (e == 18) {
					if (f == 1) {
						return 'bg-red';
					} else {
						return '信息监管';
					}
				} else if (e == 45) {
					if (f == 1) {
						return 'bg-olive';
					} else {
						return '副版主';
					}
				} else if (e == 19) {
					if (f == 1) {
						return 'bg-red';
					} else {
						return '审核员';
					}
				} else if (e == 47) {
					if (f == 1) {
						return 'bg-mauve';
					} else {
						return '元素魔法使';
					}
				} else if (e == 57) {
					if (f == 1) {
						return 'bg-yellow';
					} else {
						return '编辑';
					}
				}
			},
			randomcolor(){
			     let r = Math.floor(Math.random()*200+55);
			     let g = Math.floor(Math.random()*200+55);
			     let b = Math.floor(Math.random()*200+55);
			     return 'rgba('+ r +','+ g +','+ b +',0.8)';
			},
			setScrollHeight(descHeight = 0) {
				// #ifdef MP-WEIXIN
				this.scrollHeight = `calc(100vh - 110rpx - ${descHeight}px)`
				// #endif
				// #ifdef APP-PLUS
				this.scrollHeight = `calc(100vh - 110upx - ${descHeight}px)`
				// #endif
				// #ifdef H5
				this.scrollHeight = `calc(100vh - 110upx - 88rpx - ${descHeight}px)`
				// #endif
			},
			scrollToBottom: function() {
				let that = this;
				let query = uni.createSelectorQuery();
				query.select('.cu-chat').boundingClientRect(rect => {
					if (rect) {
						//console.log(e + ".height = " + rect.height)
						this.pageHeight = rect.height + uni.getSystemInfoSync().statusBarHeight +
							200; //页面可见区域 - 头部高度
						console.log("this.height = " + this.pageHeight)
					}
				}).exec();
				setTimeout(() => {
					that.scrollTop(that.pageHeight)
				}, 200);
			},
			scrollTop(e) {
				uni.pageScrollTo({
					scrollTop: e,
					duration: 300
				});
			},
			togglePicker(height = 0, type = '') {
				this.showEmoji = false
				this.showFile = false
				let status = height > 0 ? true : false

				switch (type) {
					case 'emoji':
						this.showEmoji = status;
						break
					case 'file':
						this.showFile = status;
						break
				}

				this.showmove = false;

				setTimeout(() => {
					this.setScrollHeight(height);
					this.scrollToBottom();
					console.log(this.showmove)
				}, 50)
				setTimeout(() => {
					this.showmove = true;
				}, 1000)
			},
			sendmessage() {
				var that=this;
				console.log(that.contenthuifu.length);
				if(that.contenthuifu.length<5){
					that.modalName = "cantpost";
					that.cantpostmessage = '请输入大于4个字的回复内容。';
					this.fasong = false;
					return;
				}
				if (this.replykey == '') {
					that.modalName = "cantpost";
					that.cantpostmessage = '帖子发送参数未获取，发送失败。';
					this.fasong = false;
					return;
				}
				if(!this.fasong){
					that.fasong=true;
					var message = encodeURI(that.contenthuifu);
					console.log(that.contenthuifu);
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:huitie', //获取置顶帖子
						method: 'POST',
						timeout: 10000,
						data: {
							token: that.$token,
							tid: that.tid,
							message: message,
							platform: that.platform,
							replykey: that.replykey
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data)
							if (res.data.code == 404) {
								that.modalName = "needlogin";
							} else if (res.data.code == 401) {
								that.modalName = "cantpost";
								that.cantpostmessage = res.data.message;
								that.fasong = false;
							} else {
								if(res.data.credit){
									that.jifenbiandong(res.data.credit,res.data.credittxt);
								}
								if(res.data.luckypost.key>=0){
									that.luckyme = res.data.luckypost;
								}
								that.refresh(message);
							}
						}
					});
				}
			},
			sendfloor() {
				var that=this;
				console.log(that.floorhuifu.length);
				if(that.floorhuifu.length<5){
					that.modalName = "cantpost";
					that.cantpostmessage = '请输入大于4个字的回复内容。';
					this.floorfasong = false;
					return;
				}
				if(!this.floorfasong){
					that.floorfasong=true;
					var message = encodeURI(that.floorhuifu);
					console.log(that.floorhuifu);
					console.log(that.toUID);
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:huifloor', //获取置顶帖子
						method: 'POST',
						timeout: 10000,
						data: {
							token: that.$token,
							pid: that.toPID,
							message: message,
							touid: that.toUID
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data)
							if (res.data.code == 404) {
								that.modalName = "needlogin";
							} else if (res.data.code == 401) {
								that.modalName = "cantpost";
								that.cantpostmessage = res.data.message;
								this.floorfasong = false;
							} else {
								that.refreshfloor(message);
							}
						}
					});
				}
			},
			tologin(e) {
				uni.redirectTo({
					url: '../../components/ay-login/login-password'
				});
			},
			refresh(e) {
				var fasonginfo = new Array();
				fasonginfo.author = this.$username;
				fasonginfo.authorid = this.$uid;
				fasonginfo.avatarlist = 'https://zd.tiangal.com/uc_server/avatar.php?uid='+ this.$uid +'&size=small';
				fasonginfo.dateline = '刚刚';
				fasonginfo.groupid = 0;
				fasonginfo.html = decodeURI(e);
				fasonginfo.pid = 0;
				fasonginfo.position = 0;
				fasonginfo.reply = 0;
				if(uni.getSystemInfoSync().platform=='ios'){
					fasonginfo.status = 136;
				}else{
					fasonginfo.status = 264;
				}
				fasonginfo.xunzhanglist = [];
				fasonginfo.touxian = '';
				fasonginfo.luckypost = this.luckyme;
				this.huifulist.unshift(fasonginfo);
				this.modalName = null
				this.contenthuifu = '';
				this.loadthread(this.tid);
				this.fasong = false;
				const query = uni.createSelectorQuery().in(this);
				query.select('.text-content2').boundingClientRect(data => {
					uni.pageScrollTo({
						scrollTop: data.height + 120,
						duration: 300
					})
				}).exec();
			},
			refreshfloor(e) {
				console.log(this.index)
				var fasongf = new Array();
				fasongf.username = this.$username;
				fasongf.uid = this.$uid;
				fasongf.floor = 0;
				fasongf.dateline = '刚刚';
				fasongf.content = '<span style="color:#0081ff;">' + this.$username + '</span>:' + decodeURI(e);
				this.rplist[this.index].push(fasongf);
				this.modalName = null
				this.floorhuifu = '';
				this.floorfasong = false;
			},
			topost(e) {
				uni.navigateTo({
					url: '../component/card?tid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			tofloor(e) {
				uni.navigateTo({
					url: '../component/form?pid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			tobar(e) {
				plus.runtime.restart();
			},
			tothebottom() {
				this.loadhuifu(this.tid, this.page, '', '', '', '1');
				console.log("到底了");
			},
			IsCard(e) {
				this.isCard = e.detail.value
			},
			cb(e) {
				if (e.target.nodeName === 'A') {
					// 获取触发事件对象的属性
					this.$emit('cb');
					var url = e.target.getAttribute('href');
					console.log(url);
				}
			},
			setHeight(e) {
				var query = uni.createSelectorQuery();
				query.select('.' + e).boundingClientRect(rect => {
					if (rect) {
						//console.log(e + ".height = " + rect.height)
						this.swiperheight = rect.height; //页面可见区域 - 头部高度
						//console.log("this.height = " + this.swiperheight)
					}
				}).exec();

			},
			loadthread(tid, page, orderby, dateline, filter, typeid) {
				let that = this;
				if (this.$imageswitch && this.$wifi == 0) {
					var isImage = 0;
				} else {
					var isImage = 1;
				}
				that.loadwb = 0;
				that.LoadProgresss();
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:post', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						tid: tid,
						page: page,
						orderby: orderby,
						dateline: dateline,
						filter: filter,
						isimage: isImage,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.code == 404) {
							that.modalName = "needlogin";
						} else if (res.data.code == 401) {
							that.modalName = "cantview";
							that.cantviewmessage = res.data.message;
						} else {
							that.postup = res.data.author;
							that.fid = res.data.fid;
							that.pid = res.data.pid;
							that.postname = res.data.subject;
							that.replykey = res.data.replykey;
							that.content = res.data.html;
							that.avatarlist = res.data.userinfo.avatarlist;
							that.nowdate = res.data.nowdate;
							that.sex = res.data.userinfo.sex;
							that.groupid = res.data.userinfo.groupid;
							that.touxian = res.data.userinfo.touxian;
							that.xunzhanglist = res.data.userinfo.xunzhanglist;
							that.lucky = res.data.luckypost.key;
							that.luckymessage = res.data.luckypost.msg;
							that.status = res.data.status;
							that.jiance = res.data.jiance;
							that.ding = res.data.ding;
							that.favorite = res.data.favorite;
							that.dashang = res.data.ratetimes;
							//console.log(that.threadlist);
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100);
							that.loadwb = 1;
							if(res.data.replykey=='closed'){
								that.contenthuifu='回帖已关闭';
								that.closed = 1;
							}
						}
					}
				});
			},
			loadfloors(pid, page, orderby, dateline, filter,index) {
				let that = this;
				this.jiazai = 1;
				if (this.$imageswitch && this.$wifi == 0) {
					var isImage = 0;
				} else {
					var isImage = 1;
				}
				that.loadwb = 0;
				that.LoadProgresss();
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:post', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						pid: pid,
						page: page,
						orderby: orderby,
						dateline: dateline,
						filter: filter,
						isimage: isImage,
						typeid: 2
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
							console.log(page);
							if (page == 0) {
								Vue.set(that.rplist, index, res.data);
							} else {
								for (let i = 0; i < res.data.length; ++i) {
									that.rplist[index].push(res.data[i]);
								}
							}
							if (res.data.length < 30) {
								that.jiazaiwanbi[index] = 1;
								Vue.set(that.jiazaiwanbi, index, 1);
							}
							console.log(res.data);
							that.floorpage[index]++;
							that.jiazai=0;
							that.loadwb = 1;
					}
				});
			},
			loadhuifu(tid, page, orderby, dateline, filter, typeid) {
				let that = this;
				if (this.$imageswitch && this.$wifi == 0) {
					var isImage = 0;
				} else {
					var isImage = 1;
				}
				that.loadwb = 0;
				that.LoadProgresss();
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:post', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						tid: tid,
						page: page,
						orderby: orderby,
						dateline: dateline,
						filter: filter,
						typeid: typeid,
						isimage: isImage,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.code == 404) {
							that.modalName = "needlogin";
						} else if (res.data.code == 401) {
							that.modalName = "cantview";
							that.cantviewmessage = res.data.message;
						} else {
							if (that.page == 0) {
								that.huifulist = res.data;
							} else {
								for (let i = 0; i < res.data.length; ++i) {
									that.huifulist.push(res.data[i]);
								}
								if (res.data.length < 30) {
									that.loading = '到底了。';
								}
							}
							console.log(res.data);
							that.page++;
							that.loadwb = 1;
						}
					}
				});
			},
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			this.tid = option.tid;
			console.log(option.tid); //打印出上个页面传递的参数。
			this.loadthread(this.tid);
			this.loadhuifu(this.tid, this.page, '', '', '', '1');
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			if(uni.getSystemInfoSync().platform=='ios'){
				this.platform = 1;
			}else{
				this.platform = 2;
			}
		},
		onShow: function() {},
		onPageScroll() {
			if (this.showmove) {
				this.showFile = false
				this.showEmoji = false
				this.showmove = false;
			}
		},
		onReachBottom() {
			this.tothebottom();
		}
	}
</script>

<style lang="scss" scoped>
	.text-content2 {
		padding: 0 30upx 0;
		font-size: 30upx;
		margin-bottom: 20upx;
	}

	.cu-item .title {
		font-size: 40upx;
		font-weight: 900;
		color: #333333;
		line-height: 100upx;
		padding: 0 30upx;
	}

	.float {
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.hide {
		display: -webkit-box;
	}

	.show {
		display: block;
	}

	.status_bar,
	.container,
	.header,
	.emoji,
	.file {
		background-color: white;
	}

	.emoji {
		height: 400upx;
		padding: 0 0 20upx 20upx;
		position: relative;

		.list {
			width: 100%;
			height: 400upx;
			padding: 20upx 0;
			overflow-y: auto;

			.item {
				float: left;
				display: block;
				height: 60upx;
				line-height: 60upx;
				width: calc(100% / 11);
				margin-right: 20upx;
			}
		}
	}

	.file {
		padding: 30upx 20upx;

		.list {
			overflow: hidden;
			padding-left: 10upx;
			justify-content: flex-start;
		}

		.item {
			float: left;
			width: 110upx;
			height: 200upx;
			border-radius: 10upx;
			margin-right: 40upx;
			background-color: #FFF;

			.icon {
				width: 50upx;
			}

			.text {
				font-size: 24upx;
				margin-top: 4upx;
			}
		}
	}

	.icon {
		width: 48upx;
		height: 48upx;
	}
	.cu-list{
		margin-top: -10upx!important;
	}
	.solids-top::after {
		border-top: 1px solid #eee!important;
	}
	.overlayer{
	    position:fixed;
	    left:0;
	    top:0;
	    width:100%;
	    height:100%;
	    z-index:10;
	}
	.vip{
		background-image: url(../../static/vip.png);
		background-size: 28upx 28upx;
		height: 28upx!important;
		width: 28upx!important;
	}
	.xunzhangshow{
		max-height: 32upx!important;
		max-width: 22upx!important;
		padding-left: 4upx;
	}
	.touxian{
		max-width: 200upx;
		max-height: 100upx;
		position: absolute;
		right: 0;
		margin-top: 50upx;
	}
	.touxian2{
		max-width: 160upx;
		max-height: 80upx;
		position: absolute;
		right: 0;
		margin-top: 40upx;
	}
	.bhh{
		display:inline-block;
		word-wrap:break-word;
		white-space:normal;
	}
	.hbx{
		position: relative;
	}
	.ltsp{
		line-height: 24upx;
	}
</style>
