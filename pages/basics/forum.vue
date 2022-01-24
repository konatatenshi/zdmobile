<!-- 板块列表页 -->
<template name="basics">
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom class="statustop" :bgColor="'bg-gradual-'+themeColor.name" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{forumname}}</block>
			<block slot="right">
				<view class="action">
					<view class="cu-load cuIcon-roundadd" v-if="canpost==1" @tap="add()"></view>
					<view class="padding-left cu-load cuIcon-refresh" @tap="refresh()"></view>
				</view>
			</block>
		</cu-custom>
		<scroll-view scroll-x class="nav-sm" :class="'bg-'+themeColor.name" :style="'margin-top: -' + iStatusBarHeight +'px;'"
			scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item black" :class="index==TabCur?'text-green cur bg-'+themeColor.name:'bg-'+themeColor.name" v-for="(item,index) in tabarray"
				:key="index" @tap="tabSelect" :data-id="index">
				{{tabname[index]}}
			</view>
		</scroll-view>
		<view class="view_head">
			<view class="swiper-box" :style="'height: ' + swiperheight +'px;'">
					<view class="view_listnow">
						<view v-if="threadlist.length > 0">
							<block v-for="(item,index2) in threadlist" :key="index2">
								<view class="solid-bottom article text-df"
									style="padding-top: 10upx; padding-bottom: 10upx;" :class="'bg-'+themeColor.name" v-if="item.displayorder>0&&!(ifpingbi(item.author)&&$adminid<=0)">
									<view @tap="topost(item.tid)">
										<text class="text-black text-cut" style="width: 100%;" :style="geshihua(item.highlight,item.tid)">{{item.subject}}</text>
									</view>
									<view> <text class="text-sm text-red padding-sm">置顶</text> <text
											class="text-sm text-gray padding-sm">{{item.author}}&nbsp&nbsp{{item.replies}}评</text>
												<view class="chacha text-gray cuIcon-close" @tap="more2(item.author,item.tid)">
												</view>
									</view>
								</view>
								<view class="cu-card article no-card" v-else-if="!(ifpingbi(item.author)&&$adminid<=0)">
									<view class="cu-card dynamic solid-bottom">
										<view class="cu-item shadow white" :class="'bg-'+themeColor.name">
											<view class="cu-list menu-avatar">
												<view class="cu-item white" :class="'bg-'+themeColor.name">
													<view class="cu-avatar round lg"
														:style="[{ backgroundImage:'url(' + item.userinfo.avatarlist + ')' }]">
														</img-cache>
														<view v-show="item.userinfo.sex==1"
															class="cu-tag badge cuIcon-male bg-blue"></view>
														<view v-show="item.userinfo.sex==2"
															class="cu-tag badge cuIcon-female bg-pink"></view>
													</view>
													<img-cache class="cu-avatar round gzlist2" v-if="item.userinfo.touxiangkuanglist != ''" :src="item.userinfo.touxiangkuanglist"/>
													<view class="content flex-sub hbx">
														<view v-if="isImage">
															<img-cache class="touxian" :src="item.userinfo.touxian">
															</img-cache>
														</view>
														<view class="flex justify-between">
															<view
																:style="[{ color: item.userinfo.groupid==51?randomcolor():''}]">
																<span class="bhh">{{item.author}}<text
																		:style="[{ padding: item.userinfo.groupid==51?'0 0 0 4upx':'0 0 0 10upx'}]"></text>
																	<view
																		class="cu-tag padding-left-xs padding-right-xs"
																		:class="loadlevelicon(item.userinfo.groupid,1)">
																		{{loadlevelicon(item.userinfo.groupid)}}</view>
																	<text
																		:style="[{ padding: item.userinfo.groupid==51?'0 0 0 4upx':'0'}]"></text><span
																		v-if="item.userinfo.xunzhanglist.length>0&&isImage"
																		v-for="(xzitem,xzindex) in item.userinfo.xunzhanglist.slice(0, 6)">
																		<img-cache v-if="xzitem.id>0"
																			class="cu-tag xunzhangshow"
																			:src="xzitem.url"></img-cache>
																	</span>
																</span>
																<view class="text-gray text-sm flex justify-between">
																	{{item.nowdate}}
																</view>
															</view>
														</view>
													</view>
												</view>
											</view>
											<view class="forumtitle text-cut" :style="geshihua(item.highlight,item.tid)" @tap="topost(item.tid)">
												{{item.subject}}
											</view>
											<view class="text-content text-red flex justify-center float"
												v-if="item.readperm>0" @tap="topost(item.tid)">
												<view
													style="overflow: hidden;border: 1px dashed #FF9A9A;margin: 8px 0;padding: 10px;zoom: 1;width: 100%;text-align: center;">
													需要阅读权限：{{item.readperm}}</view>
											</view>
											<view v-else class="text-content" @tap="topost(item.tid)">
												{{item.summary}}
											</view>
											<view v-if="item.attachment==3&&isImage"
												class="grid flex-sub padding-lr col-1">
												<view v-if="item.attachlist[0].attachment!=null"
													@click="imgMap(item.attachlist[0].attachment)"
													class="bg-img only-img"
													:style="[{ backgroundImage:'url(' + item.attachlist[0].attachment + ')' }]">
												</view>
											</view>
											<view v-else-if="item.attachment==4&&isImage"
												class="grid flex-sub padding-lr col-3 grid-square">
												<view v-if="item.attachlist[0].attachment!=null"
													@click="imgMap(item.attachlist[0].attachment)" class="bg-img"
													:style="[{ backgroundImage:'url(' + item.attachlist[0].attachment + ')' }]">
												</view>
												<view v-if="item.attachlist[1].attachment!=null"
													@click="imgMap(item.attachlist[1].attachment)" class="bg-img"
													:style="[{ backgroundImage:'url(' + item.attachlist[1].attachment + ')' }]">
												</view>
											</view>
											<view v-else-if="item.attachment>4&&isImage"
												class="grid flex-sub padding-lr col-3 grid-square">
												<view v-if="item.attachlist[0].attachment!=null"
													@click="imgMap(item.attachlist[0].attachment)" class="bg-img"
													:style="[{ backgroundImage:'url(' + item.attachlist[0].attachment + ')' }]">
												</view>
												<view v-if="item.attachlist[1].attachment!=null"
													@click="imgMap(item.attachlist[1].attachment)" class="bg-img"
													:style="[{ backgroundImage:'url(' + item.attachlist[1].attachment + ')' }]">
												</view>
												<view v-if="item.attachlist[2].attachment!=null"
													@click="imgMap(item.attachlist[2].attachment)" class="bg-img"
													:style="[{ backgroundImage:'url(' + item.attachlist[2].attachment + ')' }]">
												</view>
											</view>
											<view class="flex justify-between">
												<view class="text-gray text-sm text-left padding-top2 padding-left">
													<text v-if="item.icon==1"
														class="cu-tag line-red padding-left-xs padding-right-xs">新人帖</text>
													<text v-if="item.attachment>2"
														class="cu-tag line-green padding-left-xs padding-right-xs">图文帖</text>
													<text v-if="item.replycredit>999" 
														class="cu-tag line-purple padding-left-xs padding-right-xs">回帖奖励:1k+</text>
													<text v-else-if="item.replycredit>0"
														class="cu-tag line-pink padding-left-xs padding-right-xs">回帖奖励:{{item.heats}}</text>
													<text v-else-if="item.heats>9999"
														class="cu-tag line-purple padding-left-xs padding-right-xs">热度:1w+</text>
													<text v-else-if="item.heats>999"
														class="cu-tag line-purple padding-left-xs padding-right-xs">热度:1k+</text>
													<text v-else-if="item.heats>200"
														class="cu-tag line-purple padding-left-xs padding-right-xs">热度:{{item.heats}}</text>
													<text v-else-if="item.heats>100"
														class="cu-tag line-mauve padding-left-xs padding-right-xs">热度:{{item.heats}}</text>
													<text v-else-if="item.heats>50"
														class="cu-tag line-pink padding-left-xs padding-right-xs">热度:{{item.heats}}</text>
													<text v-else-if="item.rate==1"
														class="cu-tag line-cyan padding-left-xs padding-right-xs">被赞赏</text>
													<text v-else-if="item.rate==-1"
														class="cu-tag line-yellow padding-left-xs padding-right-xs">被扣分</text>
													<text v-else-if="item.digest>0"
														class="cu-tag line-blue padding-left-xs padding-right-xs">精华帖</text>
												</view>
												<view class="text-gray text-sm text-right padding">
													<text class="cuIcon-attentionfill margin-lr-xs"></text>
													{{item.views}}
													<text class="cuIcon-appreciatefill margin-lr-xs"></text>
													{{item.recommends}}
													<text class="cuIcon-messagefill margin-lr-xs"></text>
													{{item.replies}}
													<text class="text-gray cuIcon-close margin-lr-xs" @tap="more2(item.author,item.tid)"></text>
												</view>
											</view>
										</view>
									</view>
								</view>
							</block>
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
					</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='needlogin'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">需要登录</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					你需要登录才可以使用此功能。
				</view>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="tologin">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='cantview'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">权限不足</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					无法进入板块，错误提示：{{cantviewmessage}}
				</view>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="back">确定</button>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='pingbi'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-list menu text-left solid-top">
					<view class="cu-item" v-if="pingbiauthor==$username" :class="'bg-'+themeColor.name">
						<view class="content">
							<text class="text-gray"><text class="cuIcon-roundclose"></text>屏蔽自己</text>
						</view>
					</view>
					<view class="cu-item" v-else-if="!ifpingbi(pingbiauthor)" @tap="pingbiadd(pingbiauthor)" :class="'bg-'+themeColor.name">
						<view class="content noborder2">
							<text class="text-grey"><text class="cuIcon-roundclose"></text>屏蔽作者：{{pingbiauthor}}</text>
							<view class="text-gray text-sm noborder">屏蔽后，你将不会收到他的信息。</view>
						</view>
					</view>
					<view class="cu-item" v-else @tap="pingbiremove(pingbiauthor)" :class="'bg-'+themeColor.name">
						<view class="content noborder2">
							<text class="text-grey"><text class="cuIcon-roundclose"></text>取消屏蔽：{{pingbiauthor}}</text>
							<view class="text-gray text-sm noborder">屏蔽后，你将不会收到他的信息。</view>
						</view>
					</view>
					<view class="cu-item" v-if="pingbiauthor==$username" :class="'bg-'+themeColor.name">
						<view class="content">
							<text class="text-gray"><text class="cuIcon-attentionforbid"></text>拉黑自己</text>
						</view>
					</view>
					<view class="cu-item" v-else @tap="lahei(pingbitid)" :class="'bg-'+themeColor.name">
						<view class="content noborder2">
							<text class="text-grey"><text class="cuIcon-attentionforbid"></text>{{laheitext}}：{{pingbiauthor}}</text>
							<view class="text-gray text-sm noborder">拉黑后，他将不能回复和私聊你任何信息。</view>
						</view>
					</view>
					<view class="cu-item" @tap="jubaota(pingbitid)" :class="'bg-'+themeColor.name">
						<view class="content">
							<text class="text-grey noborder2"><text class="cuIcon-info"></text>举报此内容</text>
							<view class="text-gray text-sm noborder">标题夸张，内容质量差等。</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='jubaoxinxi'?'show':''"  @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">请输入举报理由</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-sm">
					<radio-group class="block" @change="RadioChange">
						<view class="cu-form-group">
							<view class="text-xl">广告垃圾</view>
							<radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
						</view>
						<view class="cu-form-group">
							<view class="text-xl">违规内容</view>
							<radio :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio>
						</view>
						<view class="cu-form-group">
							<view class="text-xl">恶意灌水</view>
							<radio :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
						</view>
						<view class="cu-form-group">
							<view class="text-xl">重复内容</view>
							<radio :class="radio=='D'?'checked':''" :checked="radio=='D'?true:false" value="D"></radio>
						</view>
						<view class="cu-form-group">
							<view class="text-xl">其他</view>
							<radio :class="radio=='E'?'checked':''" :checked="radio=='E'?true:false" value="E"></radio>
						</view>
					</radio-group>
					<view class="cu-form-group align-start" v-if="radio=='E'">
						<textarea maxlength="-1" v-model="jubaomessage" placeholder="请在此输入想要说的话"></textarea>
					</view>
				</view>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view v-if="closed==0" class="action">
						<button class="cu-btn bg-green margin-left" @tap="sendjbxx">发送</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="jifencaozuo!=0?'show':''">
			<button class="cu-btn margin-sm basis-sm shadow bg-orange"
				:class="jifencaozuo==1?'animation-scale-up':'animation-reverse animation-scale-down'">
				<text class="text-xl text-white text-shadow">{{jifenshuoming}}：</text><text
					class="text-xl text-white text-shadow">{{jifenbiangeng}}</text>
			</button>
		</view>
		<view class="cu-modal" :class="modalName=='cantpost'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end" :class="'bg-'+themeColor.name">
					<view class="content">举报错误</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					无法举报，错误提示：{{cantpostmessage}}
				</view>
				<view class="cu-bar justify-end :class="'bg-'+themeColor.name"">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="load-progress" v-show="loadProgress!=0" :style="[{top:CustomBar+'px'}]">
			<view class="load-progress-bar bg-green"
				:style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
			<view class="load-progress-spinner text-green"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "basics",
		data() {
			return {
				scrollLeft: 0,
				forumname: "载入中……",
				cantviewmessage: "unknown",
				iStatusBarHeight: 0,
				isImage: 1,
				swiperList: [],
				threadlist: [],
				threadlisttitle: [],
				pingbilist: [],
				tabname: ["新帖", "全部", "热门", "精华"],
				tabarray: [0, 1, 2, 3],
				avatarimgLoaded: false,
				iscard: false,
				modalName: null,
				laheivar: 0,
				laheitext: '拉黑作者',
				loadwb: 0,
				radio: 'A',
				TabCur: 99,
				forumid: 2,
				Wifi: 0,
				mainpage: 0,
				InputBottom: 0,
				loadwb: 0,
				loadProgress: 0,
				canpost: 0,
				pingbiauthor: "",
				pingbitid: 0,
				closed: 0,
				jubaomessage: '',
				cantpostmessage: '',
				loading: "上拉可加载更多帖子",
				jifencaozuo: 0,
				jifenbiangeng: '积分名+1',
				jifenshuoming: '积分变更',
				swiperheight: 1000, //高度
			};
		},
		methods: {
			hideModal(e) {
				this.modalName = null
			},
			tologin(e) {
				uni.redirectTo({
					url: '../../components/ay-login/login-password'
				});
			},
			jifenbiandong(e, f) {
				this.jifenshuoming = e;
				this.jifenbiangeng = f;
				this.jifencaozuo = 1;
				setTimeout(() => {
					this.jifencaozuo = 2;
				}, 1000)
				setTimeout(() => {
					this.jifencaozuo = 0;
				}, 2000)
			},
			refresh(e) {
				this.mainpage = 0;
				this.loadthread(this.forumid);
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			topost(e) {
				uni.navigateTo({
					url: '../component/card?tid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			back(){
				uni.navigateBack();
			},
			tothebottom() {
				if(this.TabCur==0){
					this.loadthread(this.forumid, this.mainpage, 'new');
				}else if(this.TabCur==1){
					this.loadthread(this.forumid, this.mainpage);
				}
				console.log("到底了");
			},
			imgMap(url) {
				uni.previewImage({
					urls: [url], //这里一定是数组，不然就报错
				});
			},
			geshihua(f,g){
				if(f==0){
					return '';
				}
				var shiwei = f.substr(0, 1);
				if(f.toString().length==2){
					var gewei = parseInt(f.substr(1, 1));
				}else{
					var gewei = parseInt(f);
				}
				var css = '';
				shiwei = parseInt(shiwei).toString(2); 
				if(parseInt(shiwei/100)==1){
					css = 'font-weight:bolder;';
				}
				if(parseInt((shiwei)/10)==1){
					css = css + 'font-style:italic;';
				}
				if(parseInt(shiwei%10)==1&&gewei==0){
					if(Math.round(Math.random())<1){
						css = css + 'color: #2897C5;';
					}else{
						css = css + 'color: #EE1B2E;';
					}
				}
				console.log(g + ':' + gewei + ':' + f);
				switch (gewei) {
					case 9:
						break;
					case 0:
						css = css + 'color:#000;';
						break;
					case 1:
						css = css + 'color:#EE1B2E;';
						break;
					case 2:
						css = css + 'color:#EE5023;';
						break;
					case 3:
						css = css + 'color:#996600;';
						break;
					case 4:
						css = css + 'color:#3C9D40;';
						break;
					case 5:
						css = css + 'color:#2897C5;';
						break;
					case 6:
						css = css + 'color:#2B65B7;';
						break;
					case 7:
						css = css + 'color:#8F2A90;';
						break;
					case 8:
						css = css + 'color:#EC1282;';
						break;
				}
				//console.log(css);
				return css;
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
			randomcolor() {
				let r = Math.floor(Math.random() * 200 + 55);
				let g = Math.floor(Math.random() * 200 + 55);
				let b = Math.floor(Math.random() * 200 + 55);
				return 'rgba(' + r + ',' + g + ',' + b + ',0.8)';
			},
			LoadProgresss(e) {
				this.loadProgress = this.loadProgress + 2;
				if (this.loadProgress < 100) {
					if (this.loadwb == 1) {
						this.loadProgress = 0;
						return;
					}
					//console.log(this.loadProgress);
					setTimeout(() => {
						this.LoadProgresss();
					}, 100)
				} else {
					this.loadProgress = 0;
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
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			onSuccessImg() {
				this.avatarimgLoaded = true;
			},
			loadthread(forumid, page, orderby, dateline, filter, typeid) {
				let that = this;
				if (this.$imageswitch && this.$wifi == 0) {
					this.isImage = 0;
				} else {
					this.isImage = 1;
				}
				console.log(orderby);
				console.log(page);
				if (page == 0) {
					that.threadlist = [];
				}
				that.loading = '加载中';
				that.loadwb = 0;
				that.LoadProgresss();
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						forumid: forumid,
						page: page,
						orderby: orderby,
						dateline: dateline,
						filter: filter,
						typeid: typeid,
						isImage: that.isImage
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						//console.log(res.data)
						if (res.data.code == 404) {
							that.modalName = "needlogin";
						} else if (res.data.code == 401) {
							that.modalName = "cantview";
							that.cantviewmessage = res.data.message;
						} else {
							if (that.mainpage == 0) {
								that.threadlist = res.data.post;
								that.threadlisttitle = res.data.postinfo;
							} else {
								for (let i = 0; i < res.data.post.length; ++i) {
									that.threadlist.push(res.data.post[i]);
									that.loading = '上拉可加载更多帖子';
								}
								if (res.data.post.length < 30) {
									that.loading = '到底了。';
								}
							}
							console.log(that.$groupid);
							console.log(res.data.foruminfo2.postperm);
							if(res.data.foruminfo2.postperm.indexOf(that.$groupid)>=0&&Object.keys(res.data.foruminfo2.postperm).length>0){
								that.canpost = 1;
							}
							that.mainpage++;
							that.forumname = res.data.foruminfo1.name;
							console.log(res.data.foruminfo2.threadtypes != false)
							if (res.data.foruminfo2.threadtypes != false && that.tabname.length<=4) {
								Object.getOwnPropertyNames(res.data.foruminfo2.threadtypes.types).forEach(
									function(key) {
										console.log(res.data.foruminfo2.threadtypes.types[key], key)
										that.tabname.push(res.data.foruminfo2.threadtypes.types[key]);
										that.tabarray.push(key);
									});
							}
							//console.log(that.threadlist);
							if (uni.getSystemInfoSync().platform == 'ios') {
								setTimeout(function() {
									that.setHeight("view_listnow");
									setTimeout(function() {
										that.setHeight("view_listnow");
										setTimeout(function() {
											that.setHeight("view_listnow");
											setTimeout(function() {
												that.setHeight("view_listnow");
												setTimeout(function() {
													that.setHeight(
														"view_listnow"
														);
												}, 100);
											}, 100);
										}, 100);
									}, 100);
								}, 100);
							} else {
								setTimeout(function() {
									that.setHeight("view_listnow");
									setTimeout(function() {
										that.setHeight("view_listnow");
										setTimeout(function() {
											that.setHeight("view_listnow");
											setTimeout(function() {
												that.setHeight("view_listnow");
												setTimeout(function() {
													that.setHeight(
														"view_listnow"
														);
												}, 200);
											}, 200);
										}, 200);
									}, 200);
								}, 200);
							}
							that.loadwb = 1;
						}
					}
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				console.log(this.TabCur);
				if(this.TabCur==0){
					this.mainpage = 0;
					this.loadthread(this.forumid, this.mainpage, 'new');
				}else if(this.TabCur==1){
					this.mainpage = 0;
					this.loadthread(this.forumid, this.mainpage);
				}
			},
			add() {
				console.log(this.forumid);
				uni.navigateTo({
					url: '../basics/background?url=' + this.forumid
				})
			},
			tabChange(e) {
				//this.setHeight();
				this.currentIndex = e.detail.current;
				this.TabCur = e.detail.current;
				//this.loadthread(this.forumid);
			},
			tourl(e) {
				console.log(this.swiperheight)
			},
			more2(e,f) {
				let that = this;
				this.pingbiauthor = e;
				this.pingbitid = f;
				this.modalName = 'pingbi';
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:guanzhu', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						tid: f,
						typeid: 0,
						lahei: 1
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.code == 200) {
							that.guanzhutext = '取消关注';
							that.guanzhuvar = 2;
						} else if (res.data.code == 404) {
							that.guanzhutext = '关注作者';
							that.guanzhuvar = 1;
						} 
						if (res.data.blacklist == 1) {
							that.laheitext = '取消拉黑';
							that.laheivar = 1;
						}else{
							that.laheitext = '拉黑作者';
							that.laheivar = 0;
						}
						if(res.data.pm == 1){
							that.pm = 1;
						}else{
							that.sixintxt = '私信作者（无权限使用）';
						}
					}
				});
			},
			pingbiremove(e){
				var that = this;
				this.pingbilist.splice(this.pingbilist.indexOf(e), 1);
				console.log(this.pingbilist)
				uni.setStorage({
					key: 'pingbilist',
					data: that.pingbilist,
					success: function() {
						that.jifenbiandong('屏蔽取消', '你已将此作者从屏蔽列表移除');
					}
				});
				setTimeout(() => {
					this.modalName = null;
				}, 200)
			},
			pingbiadd(e){
				var that = this;
				console.log(this.pingbilist);
				console.log(e);
				this.pingbilist.push(e);
				uni.setStorage({
					key: 'pingbilist',
					data: that.pingbilist,
					success: function() {
						that.jifenbiandong('屏蔽成功', '你已将此作者加入屏蔽列表');
					}
				});
				setTimeout(() => {
					this.modalName = null;
				}, 200)
			},
			ifpingbi(e){
				if(this.pingbilist.indexOf(e)>=0){
					//console.log(e);
					return true;
				}else{
					return false;
				}
			},
			lahei(e) {
				let that = this;
				this.jiazai = 1;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:blacklist', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						tid: e,
						typeid: that.laheivar
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.code == 200) {
							that.laheitext = '取消拉黑';
							that.laheivar = 1;
							that.jifenbiandong('拉黑成功', that.pingbiauthor + '已加入黑名单');
						} else if (res.data.code == 201) {
							that.laheitext = '拉黑作者';
							that.laheivar = 0;
							that.jifenbiandong('拉黑取消', that.pingbiauthor + '已移除黑名单');
						} else{
							that.jifenbiandong('拉黑失败', res.data.message);
						}
						that.jiazai = 0;
						that.loadwb = 1;
						setTimeout(() => {
							this.modalName = null;
						}, 200)
					}
				});
			},
			jubaota(e) {
				this.modalName = 'jubaoxinxi';
				this.pingbitid = e;
			},
			RadioChange(e) {
				this.radio = e.detail.value;
			},
			sendjbxx() {
				var that = this;
				this.closed = 1;
				console.log(that.jubaomessage.length);
				if (that.jubaomessage.length < 2 && that.radio == 'E') {
					that.modalName = "cantpost";
					that.cantpostmessage = '请输入大于等于2个字的举报内容。';
					this.floorfasong = false;
					return;
				}
				if (!this.floorfasong) {
					that.floorfasong = true;
					if(that.radio=='A'){
						var message = encodeURI('广告垃圾');
					}else if(that.radio=='B'){
						var message = encodeURI('违规内容');
					}else if(that.radio=='C'){
						var message = encodeURI('恶意灌水');
					}else if(that.radio=='D'){
						var message = encodeURI('重复发帖');
					}else if(that.radio=='E'){
						var message = encodeURI(that.jubaomessage);
					}
					console.log(message);
					console.log(that.pingbitid);
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:jubao', //获取置顶帖子
						method: 'POST',
						timeout: 10000,
						data: {
							token: that.$token,
							message: message,
							tid: that.pingbitid
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							that.floorfasong = false;
							that.jubaomessage = '';
							if (res.data.code ==400) {
								that.modalName = "needlogin";
							} else if (res.data.code == 200) {
								that.modalName = null;
								that.jifenbiandong('举报成功','你的举报发送完毕。')
								that.siliaotxt = '';
							} else{
								that.modalName = null;
								that.jifenbiandong('举报失败',res.data.message);
							}
							that.closed = 0;
						}
					});
				}
			},
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			this.forumid = option.forumid;
			console.log(option.forumid); //打印出上个页面传递的参数。
			var groups = ['88', '51', '95', '45', '61', '60', '44', '70', '2', '92', '82'];
			if(groups.indexOf(option.forumid)>=0){
				this.TabCur = 0;
				this.loadthread(option.forumid, 0, 'new');
			}else{
				this.TabCur = 1;
				this.loadthread(option.forumid);
			}
			console.log(this.TabCur)
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
		},
		mounted() {
			//this.setHeight();
		},
		onReachBottom() {
			this.tothebottom();
		}
	}
</script>

<style>
	.cu-card>.cu-item {
		background-color: #FFFFFF;
		border-radius: 4%;
		background-position-y: 9%;
		margin: 0;
	}

	.text-df {
		background-color: #FFFFFF;
		border-radius: 4%;
		background-position-y: 9%;
		margin: 0;
	}

	.cu-list.menu-avatar>.cu-item {
		background-color: transparent;
		height: 110upx;
	}

	.page {
		height: 100vh;
	}

	.nav-sm {
		white-space: nowrap;
	}

	.nav-sm .cu-item.cur {
		border-bottom: 2px solid;
	}

	.nav-sm .cu-item {
		height: 30px;
		display: inline-block;
		line-height: 30px;
		margin: 0 5px;
		padding: 0 11px;
	}

	.forumtitle {
		font-size: 0.95rem;
		font-weight: 900;
		color: #333333;
		line-height: 1.1rem;
		padding: 0 15px;
	}

	.float {
		display: -webkit-box;
		display: block;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.article {
		margin: 10upx;
	}

	.vip {
		background-image: url(../../static/vip.png);
		background-size: 28upx 28upx;
		height: 28upx !important;
		width: 28upx !important;
	}

	.xunzhangshow {
		max-height: 32upx !important;
		max-width: 22upx !important;
		padding-left: 4upx;
	}
	.cu-item.white{
		color: #666;
	}
	.touxian {
		max-width: 200upx;
		max-height: 100upx;
		position: absolute;
		right: 0;
		margin-top: 50upx;
	}

	.bhh {
		display: inline-block;
		word-wrap: break-word;
		white-space: normal;
	}

	.hbx {
		position: relative;
	}

	.padding-top2 {
		padding-top: 26upx;
	}
	.gzlist2 {		position: absolute;
		background-color: transparent;		margin: -0upx 0 0 -28upx;
		width: 140upx;
		height: 140upx;
	}
	.badge {		z-index: 9;
	}
	.chacha{
		position: absolute;
		margin: -30upx 0 0 0;
		right: 20upx;
	}
	.cu-item.bg-black {
		background-color: #747474 !important;
	}
	
	.VerticalNav.nav.bc-black .bg-black.cu-item.cur::after {
		background-color: #c3c3c3 !important;
	}
	.bc-black {
		background-color: #747474 !important;
	}
	.cu-item.text-green.cur.bg-black {
	    background-color: #c3c3c3! important;
	}
	.black.cu-item.bg-black{
		background-color: #333333! important;
	}
	.bg-light-red{
		background-color: #ffdbca!important;
	}
	.bg-red.text-df{
		background-color: #ffdbca!important;
	}
	.bg-red.cu-item{
		background-color: #ffdbca!important;
	}
	.bg-light-black{
		background-color: #747474!important;
		color: #fff;
	}
	.bg-black.text-df{
		background-color: #747474!important;
		color: #fff;
	}
	.bg-black.cu-item{
		background-color: #747474!important;
		color: #fff;
	}
	.bg-cyan.bt-black{
		background-color: #393939!important;
	}
</style>
