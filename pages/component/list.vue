<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true" class="text-shadow1">
				<block slot="backText">{{$t('api.back')}}</block>
				<block slot="right" v-if="uid!=$uid">
					<view class="action">
						<view class="cu-load cuIcon-mail padding-left-sm text-shadow1" @tap="topm()"></view>
						<view class="cu-load cuIcon-more padding-left-sm text-shadow1" @tap="showfriendlist()"></view>
					</view>
				</block>
		</cu-custom>
		<view :style="{'background-image': 'url('+iconlist+')'}" :scroll-y="modalName==null" class="page"
			:class="modalName!=null?'show':''">
			<view class="cu-card dynamic cu-list2 menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar2 round border-custom" :style="{'background-image': 'url('+avatar+')'}" @tap="toavatar(avatar)">
					</view>
					<view class="content flex-sub">
						<view class="text-black">&nbsp;</view>
						<view class="text-black text-sm flex justify-end">
							&nbsp;
							<view class="text-black text-sm">
								<view class="margin-tb-sm text-center padding-right-xl" v-if="uid!=$uid"><button
										class="padding-left-xl padding-right-xl cu-btn round bg-purple" v-if="woguanzhu==1" @tap="guanzhuta()">{{$t('userpage.followhe')}}</button><button
										class="padding-left-xl padding-right-xl cu-btn round bg-purple" v-else @tap="guanzhuta()">{{$t('userpage.unfollowhe')}}</button>
								</view>
								<view class="margin-tb-sm text-center padding-right-xl" v-else>
									<button class="padding-left-xl padding-right-xl cu-btn round bg-purple" @tap="tobjsd()">{{$t('userpage.cardshop')}}</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<img-cache class="cu-avatar round gzlist4" v-if="touxiangkuanglist != ''" :src="touxiangkuanglist"/>
			<view class="cu-bar bg-trans no-border ">
				<view class="action">
					<text class="margin-left-xs text-xxl text-black text-bold text-shadow2">{{username}}</text>
					<text :style="[{ padding: groupid==51?'0 0 0 4upx':'0 0 0 10upx'}]"></text>
						<view class="cu-tag padding-left-xs padding-right-xs" :class="loadlevelicon(groupid,1)">
							{{loadlevelicon(groupid)}}
						</view><text :style="[{ padding: groupid==51?'0 0 0 4upx':'0'}]"></text>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" v-if="$adminid>0" @tap="showModal"
						data-target="menuModal">{{$t('userpage.managebutton')}}</button>
				</view>
			</view>
			<view class="margin-left-sm margin-right-sm" @tap="toxz()"><span v-if="xunzhanglist.length>0"
				v-for="(xzitem,xzindex) in xunzhanglist.slice(0, 15)">
				<image v-if="xzitem.id>0" class="cu-tag xunzhangshow" :src="xzitem.url">
				</image>
			</span></view>
			<view class="margin-left-sm margin-right-sm" @tap="toxz()"><span v-if="xunzhanglist.length>15"
				v-for="(xzitem,xzindex) in xunzhanglist.slice(15, 30)">
				<image v-if="xzitem.id>0" class="cu-tag xunzhangshow" :src="xzitem.url">
				</image>
			</span></view>
			<view class="margin-left-sm margin-right-sm" @tap="toxz()"><span v-if="xunzhanglist.length>30"
				v-for="(xzitem,xzindex) in xunzhanglist.slice(30, 45)">
				<image v-if="xzitem.id>0" class="cu-tag xunzhangshow" :src="xzitem.url">
				</image>
			</span></view>
			<view class="margin-left-sm margin-right-sm" @tap="toxz()"><span v-if="xunzhanglist.length>45"
				v-for="(xzitem,xzindex) in xunzhanglist.slice(45, 60)">
				<image v-if="xzitem.id>0" class="cu-tag xunzhangshow" :src="xzitem.url">
				</image>
			</span></view>
			<view class="cu-list grid col-1 no-border solid-bottom">
				<view class="text-black text-content margin-left-sm text-left "><text
						class="text-shadow1">UID:{{uid}}</text><text
						class="margin-left-xs cuIcon-copy text-shadow1" @tap="copy(uid)"></text><text
						class="margin-right-xs margin-left-xs cuIcon-titles" style="color: #f5f5f5;"></text><text
						class="text-shadow1">{{$t('userpage.registered')}}：{{age}}{{$t('userpage.years')}}</text><text class="margin-right-xs margin-left-xs cuIcon-titles"
						style="color: #f5f5f5;"></text><text v-if="sex==1" class="cuIcon-male text-shadow1"></text><text v-else-if="sex==2" class="cuIcon-female text-shadow1"></text><text v-else class="cuIcon-question text-shadow1"></text></view>
				<view class="flex justify-start padding-left-sm">
					<view class="text-black text-content text-cut text-left text-shadow1" style="width: 75%;" v-if="sig==''">{{$t('userpage.sigtxt')}}</view>
					<view class="text-black text-content text-cut text-left text-shadow1" style="width: 75%;" v-else>{{sig}}</view>
					<view class="text-right text-black text-shadow1" style="width: 25%;" v-if="uid==$uid" @tap="xiugai()">{{$t('userpage.modify')}}<text
							class="margin-left-xs cuIcon-right"></text></view>
				</view>
				<view class="flex justify-start padding-left-sm padding-top-sm">
					<view class="text-xl text-black text-bold text-shadow2">{{zan}}</view>
					<view class="padding-left-sm padding-right-xl text-black text-shadow1">{{$t('userpage.liked')}}</view>
					<view class="text-xl text-black text-bold text-shadow2">{{guanzhu}}</view>
					<view class="padding-left-xs padding-right-xl text-black text-shadow1">{{$t('userpage.followede')}}</view>
					<view class="text-xl text-black text-bold text-shadow2">{{fensi}}</view>
					<view class="padding-left-sm padding-right-sm text-black text-shadow1">{{$t('userpage.followers')}}</view>
				</view>
			</view>


			<scroll-view scroll-x class="bg-white nav">
				<view class="cu-item padding-left-xl padding-right-xl"
					:class="TabCur==0?'text-black text-bold cur':'text-black'" @tap="tabSelect(0)">
					{{$t('userpage.hispost')}} {{fatie}}
				</view>
				<view class="cu-item padding-left-xl padding-right-xl"
					:class="TabCur==1?'text-black text-bold cur':'text-black'" @tap="tabSelect(1)">
					{{$t('userpage.hisreply')}} {{huitie}}
				</view>
			</scroll-view>

			<view class="cu-bar bg-gray border-custom2">
				<scroll-view v-if="TabCur==0" class="list">
					<view class="view_listnow">
						<view class="hometop3">
						</view>
						<view v-if="guanzhupost.length > 0">
							<block v-for="(itemex,indexe1) in guanzhupost" :key="indexe1">
								<view class="solid-bottom text-df article"
									style="padding-top: 10upx; padding-bottom: 10upx;" @tap="tourl(itemex.url)" v-if="itemex.url!=510953">
									<view style="margin-right: 20upx;padding-left: 80upx;" class="text-black text-cut">
										{{itemex.title}}
									</view>
									<view style="padding-left: 80upx;">
										<view>
											<img-cache class="cu-avatar4 round gzlist" :src="itemex.avatar" />
											</img-cache>
											<img-cache class="cu-avatar4 round gzlist2"
												v-if="itemex.touxiangkuanglist != ''" :src="itemex.touxiangkuanglist" />
											</img-cache>
										</view>
										<view class="cu-tag padding-left-xs padding-right-xs"
											:class="loadlevelicon2(itemex.fid)">
											{{itemex.bkname}}
										</view><text class="text-sm text-gray"
											style="padding-left: 8upx;">{{itemex.author}}&nbsp&nbsp{{itemex.replies}}{{$t('home.comment')}}&nbsp&nbsp{{itemex.nowdate}}</text>
										<img-cache v-if="itemex.img!='static/image/common/nophoto.gif'"
											mode="aspectFill" class="gzlist3" :src="itemex.img" />
									</view>
									<view v-if="itemex.img=='static/image/common/nophoto.gif'" class="text-grey"
										style="padding-left: 10upx;padding-top: 5upx;">
										{{itemex.summary}}
									</view>
									<view v-else class="text-grey"
										style="line-height:35upx; font-size: 25upx; padding-left: 10upx; padding-right: 100upx;padding-top: 5upx;text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
										</img-cache>{{itemex.summary}}
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
				</scroll-view>
				<scroll-view v-else-if="TabCur==1" class="list">
					<view class="view_listnow">
						<view class="hometop3">
						</view>
						<view v-if="huifupost.length > 0">
							<block v-for="(iteme2,indexe2) in huifupost" :key="indexe2">
								<view class="solid-bottom text-df article"
									style="padding-top: 10upx; padding-bottom: 10upx;" @tap="tourl(iteme2.url)" v-if="iteme2.url!=496145">
									<view style="margin-right: 20upx;padding-left: 80upx;" class="text-black text-cut">
										{{iteme2.title}}
									</view>
									<view style="padding-left: 80upx;">
										<view>
											<img-cache class="cu-avatar4 round gzlist" :src="iteme2.avatar" />
											</img-cache>
											<img-cache class="cu-avatar4 round gzlist2"
												v-if="iteme2.touxiangkuanglist != ''" :src="iteme2.touxiangkuanglist" />
											</img-cache>
										</view>
										<view class="cu-tag padding-left-xs padding-right-xs"
											:class="loadlevelicon2(iteme2.fid)">
											{{iteme2.bkname}}
										</view><text class="text-sm text-gray"
											style="padding-left: 8upx;">{{iteme2.author}}&nbsp&nbsp{{iteme2.replies}}{{$t('home.floor')}}&nbsp&nbsp{{iteme2.nowdate}}</text>
										<img-cache v-if="iteme2.img!='static/image/common/nophoto.gif'"
											mode="aspectFill" class="gzlist3" :src="iteme2.img" />
									</view>
									<view v-if="iteme2.img=='static/image/common/nophoto.gif'" class="text-grey"
										style="padding-left: 10upx;padding-top: 5upx;">
										{{iteme2.summary}}
									</view>
									<view v-else class="text-grey"
										style="line-height:35upx; font-size: 25upx; padding-left: 10upx; padding-right: 100upx;padding-top: 5upx;text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
										</img-cache>{{iteme2.summary}}
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
				</scroll-view>
				<view class="cu-modal" :class="jifencaozuo!=0?'show':''">
					<button class="cu-btn margin-sm basis-sm shadow bg-orange"
						:class="jifencaozuo==1?'animation-scale-up':'animation-reverse animation-scale-down'">
						<text class="text-xl text-white text-shadow">{{jifenshuoming}}：</text><text
							class="text-xl text-white text-shadow">{{jifenbiangeng}}</text>
					</button>
				</view>
				<view class="cu-modal" :class="modalName=='friendlist'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<view class="cu-list menu text-left solid-top">
							<view class="cu-item" v-if="isfriend">
								<view class="content">
									<text class="text-gray"><text class="cuIcon-roundclose"></text>{{$t('userpage.unfriend')}}</text>
								</view>
							</view>
							<view class="cu-item" v-else @tap="showaddfirend()">
								<view class="content noborder2">
									<text class="text-grey"><text class="cuIcon-friendadd"></text>{{$t('userpage.addfriend')}}</text>
								</view>
							</view>
							<view class="cu-item" v-if="isfriend">
								<view class="content">
									<text class="text-gray"><text class="cuIcon-profile"></text>{{$t('userpage.setnotes')}}</text>
								</view>
							</view>
							<view class="cu-item" v-if="isfriend">
								<view class="content">
									<text class="text-gray"><text class="cuIcon-profile"></text>{{$t('userpage.addfriend')}}</text>
								</view>
							</view>
							<view class="cu-item2 cu-item" v-if="!ifpingbi(username)" @tap="pingbiadd(username)">
								<view class="content noborder2">
									<text class="text-grey"><text
											class="cuIcon-roundclose"></text>{{$t('home.blockauthor')}}：{{username}}</text>
									<view class="text-gray text-sm noborder">{{$t('home.blocktxt')}}</view>
								</view>
							</view>
							<view class="cu-item2 cu-item" v-else @tap="pingbiremove(username)">
								<view class="content noborder2">
									<text class="text-grey"><text
											class="cuIcon-roundclose"></text>{{$t('home.unblock')}}：{{username}}</text>
									<view class="text-gray text-sm noborder">{{$t('home.blocktxt')}}</view>
								</view>
							</view>
							<view class="cu-item2 cu-item" @tap="lahei()">
								<view class="content noborder2">
									<text class="text-grey"><text
											class="cuIcon-attentionforbid"></text>{{laheitext}}：{{username}}</text>
									<view class="text-gray text-sm noborder">{{$t('home.blocktxt2')}}</view>
								</view>
							</view>
							<view class="cu-item" @tap="jubaota()">
								<view class="content">
									<text class="text-grey noborder2"><text class="cuIcon-info"></text>{{$t('userpage.reporthe')}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='friendadd'?'show':''"  @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<view class="cu-bar bg-white justify-end">
							<view class="content">{{$t('userpage.friendreason')}}</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-sm">
							<radio-group class="block" @change="RadioChange">
								<view class="cu-form-group">
									<view class="text-xl">{{$t('userpage.reason1')}}</view>
									<radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
								</view>
								<view class="cu-form-group">
									<view class="text-xl">{{$t('userpage.reason2')}}</view>
									<radio :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio>
								</view>
								<view class="cu-form-group">
									<view class="text-xl">{{$t('userpage.reason3')}}</view>
									<radio :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
								</view>
								<view class="cu-form-group">
									<view class="text-xl">{{$t('userpage.reason4')}}</view>
									<radio :class="radio=='D'?'checked':''" :checked="radio=='D'?true:false" value="D"></radio>
								</view>
								<view class="cu-form-group">
									<view class="text-xl">{{$t('my.reportpick12')}}</view>
									<radio :class="radio=='E'?'checked':''" :checked="radio=='E'?true:false" value="E"></radio>
								</view>
							</radio-group>
							<view class="cu-form-group align-start" v-if="radio=='E'">
								<textarea maxlength="-1" v-model="friendaddmessage" :placeholder="$t('userpage.reason5')"></textarea>
							</view>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view v-if="closed==0" class="action">
								<button class="cu-btn bg-green margin-left" @tap="sendfriendadd">{{$t('home.send')}}</button>
							</view>
						</view>
					</view>
				</view>
				
				<view class="cu-modal" :class="modalName=='cantpost'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<view class="cu-bar bg-white justify-end">
							<view class="content">{{$t('userpage.adderror')}}</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							{{$t('userpage.adderrort')}}：{{cantpostmessage}}
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn bg-green margin-left" @tap="hideModal">{{$t('api.ok')}}</button>
							</view>
						</view>
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
				modalName: null,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				radio: 'A',
				listTouchStart: 0,
				page0: 0,
				page1: 0,
				Page:[0,0,0,0,0,0,0,0],
				uid: 0,
				age: 0,
				closed: 0,
				fatie: 0,
				fensi: 0,
				guanzhu: 0,
				huitie: 0,
				groupid: 0,
				iconlist: "",
				pingbilist: [],
				laheitext: this.$t('userpage.blockher'),
				laheivar: 0,
				friendaddmessage: "",
				sex: 0,
				isfriend: 0,
				sig: this.$t('api.loading'),
				username: this.$t('api.loading'),
				touxiangkuanglist: '',
				zan: 0,
				woguanzhu: 1,
				scrollhight: 0,
				swiperheight: 0,
				avatar: '',
				guanzhupost: [],
				huifupost: [],
				xunzhanglist: [],
				loading: this.$t('api.loading'),
				cantpostmessage: '',
				listTouchDirection: null,
				floorfasong: false,
				TabCur: 0,
				jifenbiangeng: '积分名+1',
				jifenshuoming: '积分变更',
				jifencaozuo: 0,
			};
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			tabSelect(e) {
				this.TabCur = e;
				this.shuaxinlist();
			},
			toavatar(e){
				uni.previewImage({
					urls: [e], //这里一定是数组，不然就报错
				});
			},
			copy(e){
				var that = this;
				uni.setClipboardData({
				    data: e,
				    success: function () {
				        //that.jifenbiandong('复制成功',e + '已复制');
				    }
				});
			},
			getavatar(e) {
				if (this.$imageswitch && this.$wifi == 0) {
					return e;
				} else {
					return e.replace("small", "big");
				}
			},
			jubaota(){
				let that = this;
				this.modalName = null;
				uni.navigateTo({
					url: '../extra/jubaouser?username=' + that.username,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			topm() {
				let that = this;
				uni.navigateTo({
					url: '../extra/pm?touid=' + that.uid + '&username=' + that.username,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			showaddfirend(){
				this.modalName = 'friendadd';
			},
			showfriendlist(){
				this.modalName = 'friendlist';
			},
			sendfriendadd() {
				var that = this;
				this.closed = 1;
				console.log(that.friendaddmessage.length);
				if (that.friendaddmessage.length < 2 && that.radio == 'E') {
					that.modalName = "cantpost";
					that.cantpostmessage = this.$t('userpage.m2');
					this.floorfasong = false;
					return;
				}
				if (!this.floorfasong) {
					that.floorfasong = true;
					if(that.radio=='A'){
						var message = encodeURI(this.$t('userpage.reason1'));
					}else if(that.radio=='B'){
						var message = encodeURI(this.$t('userpage.reason2'));
					}else if(that.radio=='C'){
						var message = encodeURI(this.$t('userpage.reason3'));
					}else if(that.radio=='D'){
						var message = encodeURI(this.$t('userpage.reason4'));
					}else if(that.radio=='E'){
						var message = encodeURI(that.friendaddmessage);
					}
					console.log(message);
					//console.log(that.pingbitid);
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:friend', //获取置顶帖子
						method: 'POST',
						timeout: 10000,
						data: {
							token: that.$token,
							action: 'add',
							message: message,
							fuid: that.uid
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							that.floorfasong = false;
							that.friendaddmessage = '';
							if (res.data.code ==400) {
								that.modalName = "cantpost";
								that.cantpostmessage = res.data.result;
							} else if (res.data.code ==403) {
								that.modalName = "cantpost";
								that.cantpostmessage = that.$t('userpage.senderror1');
							} else if (res.data.code ==406) {
								that.modalName = "cantpost";
								that.cantpostmessage = that.$t('userpage.senderror2');
							} else if (res.data.code ==407) {
								that.modalName = "cantpost";
								that.cantpostmessage = that.$t('userpage.senderror3');
							} else if (res.data.code == 200) {
								that.modalName = null;
								uni.showToast({
									title: that.$t('userpage.sendsuccess'),
									duration: 2000
								})
							} else{
								that.modalName = null;
								uni.showToast({
									title: that.$t('userpage.sendfail'),
									icon: 'error',
									duration: 2000
								})
							}
							that.closed = 0;
						}
					});
				}
			},
			xiugai(){
				uni.navigateTo({
					url: '../extra/profile'
				})
			},
			shuaxinlist() {
				var that = this;
				that.loading = this.$t('api.loading');
				if (this.TabCur == 0) {
					this.page0 = 0;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 3,
							page: that.page0,
							touid: that.uid
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data.userinfo);
							that.guanzhupost = res.data.post;
							if (res.data.post.length < 30) {
								that.loading = this.$t('api.loadtoend');
							}else{
								that.loading = this.$t('api.loadmore');
							}
							if(that.page0 ==0){
								that.uid = res.data.userinfo.uid;
								that.age = res.data.userinfo.age;
								that.fatie = res.data.userinfo.fatie;
								that.fensi = res.data.userinfo.fensi;
								that.guanzhu = res.data.userinfo.guanzhu;
								that.huitie = res.data.userinfo.huitie;
								that.iconlist = res.data.userinfo.iconlist;
								that.touxiangkuanglist = res.data.userinfo.touxiangkuanglist;
								that.xunzhanglist = res.data.userinfo.xunzhanglist;
								that.sex = res.data.userinfo.sex;
								that.sig = res.data.userinfo.sig;
								that.username = res.data.userinfo.username;
								that.zan = res.data.userinfo.zan;
								that.avatar = that.getavatar(res.data.userinfo.avatarlist);
								that.woguanzhu = res.data.userinfo.woguanzhu;
								that.laheivar = res.data.userinfo.blacklist;
								that.groupid = res.data.userinfo.groupid;
								if(JSON.stringify(res.data.userinfo.friends) != '[]'){
									that.isfriend = 1;
									if(res.data.userinfo.friends.note!=''){
										that.sig = res.data.userinfo.friends.note;
									}
								}
							}
							console.log(that.touxiangkuanglist);
							that.page0++;
							setTimeout(function() {
								//that.setHeight("view_listnow");
							}, 100)
						}
					});
				} else if (this.TabCur == 1) {
					this.page1 = 0;
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 4,
							page: that.page1,
							touid: that.uid
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data.post);
							that.huifupost = res.data.post;
							if (res.data.post.length < 30) {
								that.loading = this.$t('api.loadtoend');
							}else{
								that.loading = this.$t('api.loadmore');
							}
							console.log(res.data.length);
							that.page1++;
							setTimeout(function() {
								//that.setHeight("view_listnow");
							}, 100)
						}
					});
				}
			},
			setHeight(e) {
			},
			RadioChange(e) {
				this.radio = e.detail.value;
			},
			loadlevelicon2(e) {
				if (e % 10 == 0) {
					return 'line-red';
				} else if (e % 10 == 1) {
					return 'line-orange';
				} else if (e % 10 == 2) {
					return 'line-olive';
				} else if (e % 10 == 3) {
					return 'line-green';
				} else if (e % 10 == 4) {
					return 'line-cyan';
				} else if (e % 10 == 5) {
					return 'line-blue';
				} else if (e % 10 == 6) {
					return 'line-purple';
				} else if (e % 10 == 7) {
					return 'line-mauve';
				} else if (e % 10 == 8) {
					return 'line-pink';
				} else if (e % 10 == 9) {
					return 'line-brown';
				}
			},
			loadlevelicon(e, f) {
				if (e == 7) {
					if (f == 1) {
						return 'line-gray';
					} else {
						return this.$t('index.guest');
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
						return 'QQ' + this.$t('index.guest');
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
			tothebottom(push) {
				var that = this;
				that.loading = this.$t('api.loading');
				if (that.TabCur == 0) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 3,
							page: that.page0,
							touid: that.uid
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							push = res.data.post;
							console.log(push);
							if (push.length > 0) {
								for (let i = 0; i < push.length; ++i) {
									that.guanzhupost.push(push[i]);
								}
							}
							if (push.length < 30) {
								that.loading = this.$t('api.loadtoend');
							}else{
								that.loading = this.$t('api.loadmore');
							}
							that.page0++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
						}
					});
				} else if (that.TabCur == 1) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 4,
							page: that.page1,
							touid: that.uid
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(that.page1);
							push = res.data.post;
							console.log(push);
							if (push.length > 0) {
								for (let i = 0; i < push.length; ++i) {
									that.huifupost.push(push[i]);
								}
							}
							if (push.length < 30) {
								that.loading = this.$t('api.loadtoend');
							}else{
								that.loading = this.$t('api.loadmore');
							}
							that.page1++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
						}
					});
				}
				console.log("到底了");
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
			guanzhuta(e) {
				let that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:guanzhu', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						touid: that.uid,
						typeid: that.woguanzhu
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.code == 200) {
							that.modalName = null;
							if(that.woguanzhu==1){
								that.jifenbiandong(that.$t('userpage.followed'), that.$t('userpage.likedtxt'));
								that.woguanzhu = 2;
							}else{
								that.jifenbiandong(that.$t('userpage.unfollowed'), that.$t('userpage.likefailedtxt'));
								that.woguanzhu = 1;
							}
						} else{
							that.modalName = null;
							that.jifenbiandong(that.$t('userpage.followfail'), that.$t('userpage.followfail'));
						}
					}
				});
			},
			tobjsd(){
				uni.navigateTo({
					url: '../extra/beijing'
				});
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
						touid: that.uid,
						typeid: that.laheivar
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.code == 200) {
							that.laheitext = that.$t('home.unblock2');
							that.laheivar = 1;
							that.jifenbiandong(that.$t('home.blocksuccess2'), that.pingbiauthor + that.$t('home.blocksuccesstxt2'));
						} else if (res.data.code == 201) {
							that.laheitext = that.$t('home.blockauthor2');
							that.laheivar = 0;
							that.jifenbiandong(that.$t('home.cancelblock2'), that.pingbiauthor + that.$t('home.cancelblocktxt2'));
						} else{
							that.jifenbiandong(that.$t('home.failblock'), res.data.message);
						}
						that.jiazai = 0;
						that.loadwb = 1;
						setTimeout(() => {
							this.modalName = null;
						}, 200)
					}
				});
			},
			pingbiremove(e) {
				var that = this;
				this.pingbilist.splice(this.pingbilist.indexOf(e), 1);
				console.log(this.pingbilist)
				uni.setStorage({
					key: 'pingbilist',
					data: that.pingbilist,
					success: function() {
						that.jifenbiandong(that.$t('home.cancelblock'), that.pingbiauthor + that.$t('home.cancelblocktxt'));
					}
				});
				setTimeout(() => {
					this.modalName = null;
				}, 200)
			},
			toxz(){
				uni.redirectTo({
					url: '../extra/xunzhang'
				});
			},
			pingbiadd(e) {
				var that = this;
				console.log(this.pingbilist);
				console.log(e);
				this.pingbilist.push(e);
				uni.setStorage({
					key: 'pingbilist',
					data: that.pingbilist,
					success: function() {
						that.jifenbiandong(that.$t('home.blocksuccess'), that.pingbiauthor + that.$t('home.blocksuccesstxt'));
					}
				});
				setTimeout(() => {
					this.modalName = null;
				}, 200)
			},
			ifpingbi(e) {
				if (this.pingbilist.indexOf(e) >= 0) {
					//console.log(e);
					return true;
				} else {
					return false;
				}
			},
			more(e) {
				let that = this;
				this.modalName = 'more';
			},
			tourl(e) {
				uni.navigateTo({
					url: '../component/card?tid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
		},
		onLoad: function(option) {
			let that = this;
			this.uid = option.uid;
			//this.uid = 19;
			console.log(option.uid); //打印出上个页面传递的参数。
			//this.loadthread(this.uid);
			this.shuaxinlist();
			uni.getStorage({
				key: 'pingbilist',
				success: function(res) {
					console.log(res.data);
					that.pingbilist = res.data;
				}
			})
		},
		onReady() {
			plus.navigator.setStatusBarStyle('dark'); //改变系统标题颜色
		},
		onReachBottom() {
			console.log("到底了");
			this.tothebottom();
		},
		onPageScroll(res) {
			this.scrollhight = res.scrollTop;
			//console.log(res.scrollTop);//距离页面顶部距离
		},
	}
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}

	.cu-avatar2 {
		font-variant: small-caps;
		margin: 0;
		padding: 0;
		display: inline-flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		color: #ffffff;
		white-space: nowrap;
		position: relative;
		width: 190upx;
		height: 190upx;
		background-size: cover;
		background-position: center;
		vertical-align: middle;
		font-size: 1.5em;
		position: absolute;
		left: 40upx;
	}

	.cu-list2.menu-avatar>.cu-item {
		position: relative;
		display: flex;
		padding-right: 5px;
		height: 200upx;
		background-color: transparent;
		justify-content: flex-end;
		align-items: center;
		transition: all .6s ease-in-out 0s;
		-webkit-transform: translateX(0px);
		transform: translateX(0px);
	}

	.cu-list.grid.no-border {
		margin-top: 0px;
		padding-top: 0px;
		background-color: transparent;
	}

	.page {
		background: white;
		background-repeat: no-repeat;
		background-position: top right;
		background-size: auto 550upx;
	}

	.text-shadow1 {
		text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
	}

	.text-shadow2 {
		text-shadow: -2px 0 white, 0 2px white, 2px 0 white, 0 -2px white;
	}

	.border-custom2 {
		border-top: 10upx solid #f1f1f1;
	}

	.text-df {
		background-color: #FFFFFF !important;
		border-radius: 4%;
		background-position-y: 20%;
		border-top: 6upx solid #f1f1f1;
		border-bottom: 6upx solid #f1f1f1;
		border-left: 15upx solid #f1f1f1;
		border-right: 15upx solid #f1f1f1;
		min-height: 170upx;
	}

	.border-custom {
		border: 6upx solid white;
	}

	.gzlist {
		position: absolute;
		margin: -33upx 0 0 -75upx;
	}

	.gzlist2 {
		position: absolute;
		background-color: transparent!important;
		margin: -47upx 0 0 -88upx!important;
		width: 86upx!important;
		height: 86upx!important;
	}

	.gzlist3 {
		position: absolute;
		right: 10upx;
		margin: 34upx 0 0 -105upx;
		width: 95upx;
		height: 72upx;
	}

	.gzlist4 {
		position: absolute;
		background-color: transparent!important;
		margin: -270upx 0 0 26upx!important;
		width: 280upx!important;
		height: 280upx!important;
	}
	
	.cu-avatar4 {
		justify-content: center;
		align-items: center;
		background-color: #ccc;
		color: #ffffff;
		width: 32px;
		height: 32px;
		background-size: cover;
		background-position: center;
		vertical-align: middle;
		font-size: 1.5em;
	}
	
	
	.vip {
		background-image: url(../../static/vip.png);
		background-size: 28upx 28upx;
		height: 28upx !important;
		width: 28upx !important;
	}
	
	.padding-left-sm .padding-right-xl .text-black .text-shadow1{
		margin-top: 10upx;
	}
	.text-xl{
		font-size: 30upx!important;
	}
	.bg-purple{
		background-color: rgba(196, 16, 212, 0.4);
		border: 4upx solid rgba(221, 255, 253, 0.4);
	}
	.cu-list.menu>.cu-item2 .content {
	    line-height: 1em!important;
	}
	.content.noborder2 {
	    width: 100%;
	}
	.xunzhangshow {
		height: 64upx !important;
		width: 44upx !important;
		padding-left: 4upx;
	}
</style>
