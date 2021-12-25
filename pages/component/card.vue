<!-- 帖子页面 -->
<template>
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<cu-custom class="statustop" bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{postname}}</block>
			<block slot="right">
				<view class="action">
					<view class="cu-load cuIcon-moreandroid" @tap="more()"></view>
				</view>
			</block>
		</cu-custom>
		<view class="cu-card dynamic no-card" :style="'margin-top: -' + iStatusBarHeight +'px;'">
			<view class="cu-item shadow">
				<view class="title">
					<view class="text-cut">{{postname}}</view>
				</view>
				<view class="cu-list menu-avatar" @tap="totheuid(authorid)">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + avatarlist + ')' }]">
							<view v-show="sex==1" class="cu-tag badge cuIcon-male bg-blue"></view>
							<view v-show="sex==2" class="cu-tag badge cuIcon-female bg-pink"></view>
						</view>
						<img-cache class="cu-avatar round gzlist2" v-if="touxiangkuanglist != ''"
							:src="touxiangkuanglist" />
						<view class="content flex-sub hbx">
							<view v-if="isImage">
								<img-cache class="touxian" :src="touxian"></img-cache>
							</view>
							<view :style="[{ color: groupid==51?randomcolor():''}]">{{postup}}<text
									:style="[{ padding: groupid==51?'0 0 0 4upx':'0 0 0 10upx'}]"></text>
								<view class="cu-tag padding-left-xs padding-right-xs" :class="loadlevelicon(groupid,1)">
									{{loadlevelicon(groupid)}}
								</view><text :style="[{ padding: groupid==51?'0 0 0 4upx':'0'}]"></text><span
									v-if="xunzhanglist.length>0&&isImage"
									v-for="(xzitem,xzindex) in xunzhanglist.slice(0, 6)">
									<img-cache v-if="xzitem.id>0" class="cu-tag xunzhangshow" :src="xzitem.url">
									</img-cache>
								</span>
							</view>
							<view><span v-if="xunzhanglist.length>6&&isImage"
									v-for="(xzitem,xzindex) in xunzhanglist.slice(6, 20)">
									<img-cache v-if="xzitem.id>0" class="cu-tag xunzhangshow" :src="xzitem.url">
									</img-cache>
								</span></view>
							<view class="text-gray text-sm flex justify-start">
								{{nowdate}}
								<view v-if="status&128&&status&8" class="text-xs text-blue cuIcon-mobile">来自iPhone客户端
								</view>
								<view v-else-if="status&256&&status&8" class="text-xs text-green cuIcon-mobile">
									来自Android客户端</view>
								<view v-else-if="status&8" class="text-xs text-gray cuIcon-mobile">来自手机网页版</view>
							</view>
						</view>
					</view>
				</view>
				<view class="text-content2">
					<view v-if="content==''" class="cu-load text-gray loading"></view>
					<view v-if="replycredit>0"
						class="padding-xs radius shadow shadow-lg bg-yellow text-xs ltsp text-red">
						回帖奖励还剩：{{replycredit}}金币，每人限{{membertimes}}次<text v-if="rprandom>0">，概率为{{rprandom}}%</text>。</view>
					<mp-html :content="content" @linktap="linktap" selectable="true" />
					<view v-if="jiance.type>0" class="text-center" @tap="jiancequery()">
						<view v-if="jiance.type==1"
							class="padding-xs radius shadow shadow-lg bg-cyan margin-top text-sm ltsp"><text
								:class="loadModal?'cuIcon-loading2 cuIconfont-spin':''"></text>[{{jiance.time}}]网盘检测存活，失效点此
							<view
								class="margin-left-xs margin-bottom-xs padding-left-xs padding-right-xs cu-capsule bg-gray">
								<view class="cu-tag line-red">{{jiance.cishu}}</view>
							</view>
						</view>
						<view v-else-if="jiance.type==2"
							class="padding-xs radius shadow shadow-lg bg-orange margin-top text-sm ltsp"><text
								:class="loadModal?'cuIcon-loading2 cuIconfont-spin':''"></text>[{{jiance.time}}]百度盘失效，重检点此
							<view
								class="margin-left-xs margin-bottom-xs padding-left-xs padding-right-xs cu-capsule bg-gray">
								<view class="cu-tag line-red">{{jiance.cishu}}</view>
							</view>
						</view>
						<view v-else-if="jiance.type==3"
							class="padding-xs radius shadow shadow-lg bg-yellow margin-top text-sm ltsp"><text
								:class="loadModal?'cuIcon-loading2 cuIconfont-spin':''"></text>[{{jiance.time}}]Google盘失效，重检点此
							<view
								class="margin-left-xs margin-bottom-xs padding-left-xs padding-right-xs cu-capsule bg-gray">
								<view class="cu-tag line-red">{{jiance.cishu}}</view>
							</view>
						</view>
						<view v-else-if="jiance.type==4"
							class="padding-xs radius shadow shadow-lg bg-black margin-top text-sm ltsp"><text
								:class="loadModal?'cuIcon-loading2 cuIconfont-spin':''"></text>[{{jiance.time}}]百度谷歌失效，重检点此
							<view
								class="margin-left-xs margin-bottom-xs padding-left-xs padding-right-xs cu-capsule bg-gray">
								<view class="cu-tag line-red">{{jiance.cishu}}</view>
							</view>
						</view>
						<view v-else-if="jiance.type==5"
							class="padding-sm radius shadow shadow-lg bg-blue margin-top text-sm ltsp"><text
								:class="loadModal?'cuIcon-loading2 cuIconfont-spin':''"></text>如链接失效请点此检测</view>
					</view>
					<view v-if="lucky>=0" class="text-center">
						<view v-if="lucky==1"
							class="padding-xs radius shadow shadow-lg bg-green margin-top text-xs ltsp">
							发帖际遇：{{luckymessage}}</view>
						<view v-else class="padding-xs radius shadow shadow-lg bg-red margin-top text-xs ltsp">
							发帖际遇：{{luckymessage}}</view>
					</view>
					<view class="padding flex p-xs mb-sm">
						<view class="cu-capsule flex-sub">
							<view class='cu-tag bg-pink padding-sm' @tap="dianzan()">
								<text class='cuIcon-appreciatefill'>点赞</text>
							</view>
							<view class="cu-tag line-pink padding-sm">
								<text :class="loadModal2?'cuIcon-loading2 cuIconfont-spin':''"></text>{{ding}}
							</view>
						</view>
						<view class="cu-capsule flex-sub">
							<view class='cu-tag bg-blue padding-sm' @tap="dashangadd()">
								<text class='cuIcon-moneybagfill'>打赏</text>
							</view>
							<view class="cu-tag line-blue padding-sm">
								<text :class="loadModal3?'cuIcon-loading2 cuIconfont-spin':''"></text>{{dashang}}
							</view>
						</view>
						<view class="cu-capsule flex-sub" @tap="shoucang()">
							<view class='cu-tag bg-red padding-sm'>
								<text class='cuIcon-likefill'>收藏</text>
							</view>
							<view class="cu-tag line-red padding-sm">
								<text :class="loadModal1?'cuIcon-loading2 cuIconfont-spin':''"></text>{{favorite}}
							</view>
						</view>
						<view class="cu-capsule flex-sub chacha" @tap="more2(authorid,postup,pid)">
							<text class='text-gray cuIcon-close'></text>
						</view>
					</view>
					<view class="margin-bottom-sm" style="max-height: 500rpx;" v-if="sightml!=''">
						<image mode='widthFix' src="../../static/sigline.gif"></image>
						<rich-text mode='widthFix' :nodes="formatRichText(sightml)"></rich-text>
					</view>
				</view>
				<view class="cu-list menu-avatar comment solids-top" v-for="(item,index) in huifulist" :key="index"
					:data-id="index">
					<view class="cu-item" v-if="!(ifpingbi(item.author)&&$adminid<=0)">
						<view class="cu-avatar round" :style="[{ backgroundImage:'url(' + item.avatarlist + ')' }]"
							@tap="totheuid(item.authorid)">
						</view>
						<view class="content hbx">
							<view v-if="isImage">
								<img-cache class="touxian2" :src="item.touxian"></img-cache>
							</view>
							<img-cache class="cu-avatar round gzlist3" v-if="item.touxiangkuanglist"
								:src="item.touxiangkuanglist" />
							<view class="flex justify-between" @tap="totheuid(item.authorid)">
								<view :style="[{ color: item.groupid==51?randomcolor():'text-gray'}]">
									{{item.author}}<text
										:style="[{ padding: item.groupid==51?'0 0 0 4upx':'0 0 0 10upx'}]"></text><span
										class="cu-tag padding-left-xs padding-right-xs"
										:class="loadlevelicon(item.groupid,1)">{{loadlevelicon(item.groupid)}}</span><text
										:style="[{ padding: item.groupid==51?'0 0 0 4upx':'0'}]"></text><span
										v-if="item.xunzhanglist.length>0&&isImage"
										v-for="(xxzitem,xxzindex) in item.xunzhanglist.slice(0, 6)">
										<img-cache v-if="xxzitem.id>0" class="cu-tag xunzhangshow" :src="xxzitem.url">
										</img-cache>
									</span>
								</view>
								<view v-show="item.dateline!='刚刚'" class="text-grey text-sm">{{item.position}}楼</view>
							</view>
							<view class="flex justify-start">
								<view class="text-gray text-sm">{{item.dateline}}</view>
								<view v-if="item.status&128&&item.status&8" class="text-xs text-blue cuIcon-mobile">
									来自iPhone客户端</view>
								<view v-else-if="item.status&256&&item.status&8"
									class="text-xs text-green cuIcon-mobile">来自Android客户端</view>
								<view v-else-if="item.status&8" class="text-xs text-gray cuIcon-mobile">来自手机网页版</view>
							</view>
							<view v-if="item.replycredit>0"
								class="padding-xs radius shadow shadow-lg bg-yellow text-xs ltsp text-red">
								回帖奖励： +{{item.replycredit}}金币</view>
							<mp-html v-if="item.status&1" class="text-content text-df float"
								:class="isfloat[index]?'show':'hide'" :content="pingbi" @linktap="linktap"
								selectable="true" />
							<mp-html v-else-if="!isfloat[index]" class="text-content text-df float"
								:class="isfloat[index]?'show':'hide'" :content="item.html.substr(0,140)"
								@linktap="linktap" selectable="true" />
							<mp-html v-else class="text-content text-df float" :class="isfloat[index]?'show':'hide'"
								:content="item.html" @linktap="linktap" selectable="true" />
							<view class="text-blue" v-if="Letter(item.html).length>70&&isfloat[index]!= true"
								@tap="loadmore(index)">展开</view>
							<view v-if="item.luckypost.key>=0" class="text-center">
								<view v-if="item.luckypost.key==1"
									class="padding-xs radius shadow shadow-lg bg-green margin-top text-xs ltsp">
									发帖际遇：{{item.luckypost.msg}}</view>
								<view v-else class="padding-xs radius shadow shadow-lg bg-red margin-top text-xs ltsp">
									发帖际遇：{{item.luckypost.msg}}</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view v-if="animation[index]">
									<text class="cuIcon-appreciatefill"
										:class="animation[index]==1?'text-red':'text-gray'"
										@tap="zanpo(item.pid,index,item.support,dianzannumber[index])"><text
											v-if="dianzannumber[index]>0">{{dianzannumber[index]}}</text></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"
										@tap="lzpo(item.pid,index)"></text>
									<text v-if="item.authorid==$uid" class="cuIcon-writefill text-gray margin-left-sm"
										@tap="edithuifu(item.pid)"></text>
								</view>
								<view v-else>
									<text class="cuIcon-appreciatefill" :class="item.zan?'text-red':'text-gray'"
										@tap="zanpo(item.pid,index,item.support,item.zan)"><text
											v-if="item.support>0">{{item.support}}</text></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"
										@tap="lzpo(item.pid,index)"></text>
									<text v-if="item.authorid==$uid" class="cuIcon-writefill text-gray margin-left-sm"
										@tap="edithuifu(item.pid)"></text>
								</view>
								<view>
									<text class="cuIcon-close text-gray margin-right-sm"
										@tap="more2(item.authorid,item.author,item.pid)"></text>
								</view>
							</view>
							<view v-if="item.reply>0" class="bg-gray padding-sm radius margin-top-sm  text-sm">
								<view class="flex" v-for="(rpitem,rpindex) in item.floor" :key="'b' + rpindex"
									:data-id="rpindex">
									<rich-text class="flex-sub float2 hide" :nodes="rpitem.content"
										@tap="lzlpo(rpitem.uid,item.pid,index)"></rich-text>
								</view>
								<view class="flex" v-for="(rpxitem,rpxindex) in rplist[index]" :key="'c' + rpxindex"
									:data-id="rpxindex">
									<rich-text class="flex-sub float2 hide" :nodes="rpxitem.content"
										@tap="lzlpo(rpxitem.uid,item.pid,index)" />
									</rich-text>
								</view>
								<view class="flex text-blue" v-if="item.reply>5&&jiazaiwanbi[index]!=1&&jiazai==0"
									@tap="loadfloor(item.pid,index)">共
									{{item.reply}} 条回复<text class="cuIcon-right"></text>
								</view>
								<view class="flex text-blue" v-else-if="item.reply>5&&jiazaiwanbi[index]!=1&&jiazai==1">
									加载中<text class="cuIcon-right"></text>
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
				<view class="cu-modal" :class="modalName=='needlogin'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
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
				<view class="cu-modal" :class="modalName=='more'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<view class="cu-list menu text-left solid-top">
							<view class="cu-item" v-if="authorid==$uid">
								<view class="content noborder2">
									<text class="text-gray"><text class="cuIcon-attention"></text>关注自己</text>
								</view>
							</view>
							<view class="cu-item" v-else @tap="guanzhu()">
								<view class="content noborder2">
									<text class="text-grey"><text class="cuIcon-attention"></text>{{guanzhutext}}</text>
								</view>
							</view>
							<view v-if="pm==1" class="cu-item" @tap="siliaozuozhe">
								<view class="content">
									<text class="text-grey"><text class="cuIcon-mark"></text>私信作者</text>
								</view>
							</view>
							<view v-else class="cu-item">
								<view class="content">
									<text class="text-gray"><text class="cuIcon-mark"></text>{{sixintxt}}</text>
								</view>
							</view>
							<view class="cu-item" @tap="totheuid(authorid)">
								<view class="content">
									<text class="text-grey"><text class="cuIcon-form"></text>查看资料</text>
								</view>
							</view>
							<view class="cu-item" @tap="jubaota(jubaopid)">
								<view class="content">
									<text class="text-grey"><text class="cuIcon-info"></text>举报此帖</text>
								</view>
							</view>
							<view class="cu-item" v-if="authorid==$uid" @tap="editpost()">
								<view class="content">
									<text class="text-grey"><text class="cuIcon-attention"></text>编辑此帖</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='pingbi'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<view class="cu-list menu text-left solid-top">
							<view class="cu-item" v-if="pingbiauthor==$username">
								<view class="content">
									<text class="text-gray"><text class="cuIcon-roundclose"></text>屏蔽自己</text>
								</view>
							</view>
							<view class="cu-item" v-else-if="!ifpingbi(pingbiauthor)" @tap="pingbiadd(pingbiauthor)">
								<view class="content noborder2">
									<text class="text-grey"><text
											class="cuIcon-roundclose"></text>屏蔽作者：{{pingbiauthor}}</text>
									<view class="text-gray text-sm noborder">屏蔽后，你将不会收到他的信息。</view>
								</view>
							</view>
							<view class="cu-item" v-else @tap="pingbiremove(pingbiauthor)">
								<view class="content noborder2">
									<text class="text-grey"><text
											class="cuIcon-roundclose"></text>取消屏蔽：{{pingbiauthor}}</text>
									<view class="text-gray text-sm noborder">屏蔽后，你将不会收到他的信息。</view>
								</view>
							</view>
							<view class="cu-item" v-if="pingbiauthor==$username">
								<view class="content">
									<text class="text-gray"><text class="cuIcon-attentionforbid"></text>拉黑自己</text>
								</view>
							</view>
							<view class="cu-item" v-else @tap="lahei()">
								<view class="content noborder2">
									<text class="text-grey"><text
											class="cuIcon-attentionforbid"></text>{{laheitext}}：{{pingbiauthor}}</text>
									<view class="text-gray text-sm noborder">拉黑后，他将不能回复和私聊你任何信息。</view>
								</view>
							</view>
							<view v-if="pm==1&&jubaopid!=pid" class="cu-item" @tap="siliaozuozhe2">
								<view class="content">
									<text class="text-grey"><text class="cuIcon-mark"></text>私信作者</text>
								</view>
							</view>
							<view v-else-if="jubaopid!=pid" class="cu-item">
								<view class="content">
									<text class="text-gray"><text class="cuIcon-mark"></text>{{sixintxt}}</text>
								</view>
							</view>
							<view class="cu-item" v-if="pingbiuid == 0&& jubaopid!=pid" @tap="totheuid(pingbiuid)">
								<view class="content">
									<text class="text-grey"><text class="cuIcon-form"></text>查看资料</text>
								</view>
							</view>
							<view class="cu-item" @tap="jubaota(jubaopid)" v-if="jubaopid!=pid">
								<view class="content">
									<text class="text-grey noborder2"><text class="cuIcon-info"></text>举报此回复</text>
									<view class="text-gray text-sm noborder">标题夸张，内容质量差等。</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='cantview'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
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
				<view class="cu-modal" :class="modalName=='cantpost'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
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
				<view class="cu-modal" :class="modalName=='testpan'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
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
				<view class="cu-load load-modal" v-if="loadModal==100">
					<!-- <view class="cuIcon-emojifill text-orange"></view> -->
					<image src="../../static/img/loadzd.gif" style="border-radius: 50%;" mode="aspectFit"></image>
					<view class="gray-text">检测中...</view>
				</view>
				<view class="cu-modal" :class="modalName=='floorpost'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
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
				<view class="cu-modal" :class="modalName=='siliao'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<view class="cu-bar bg-white justify-end">
							<view class="content">私聊给{{postup}}</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							<view class="cu-form-group align-start">
								<textarea maxlength="-1" v-model="siliaotxt" placeholder="请在此输入想要说的话"></textarea>
								<text class="cuIcon-emojifill text-grey" @tap="togglePicker(200, 'emoji')"></text>
							</view>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view v-if="closed==0" class="action">
								<button class="cu-btn bg-green margin-left" @tap="sendsl">发送</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='siliao2'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<view class="cu-bar bg-white justify-end">
							<view class="content">私聊给{{pingbiauthor}}</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							<view class="cu-form-group align-start">
								<textarea maxlength="-1" v-model="siliaotxt" placeholder="请在此输入想要说的话"></textarea>
								<text class="cuIcon-emojifill text-grey" @tap="togglePicker(200, 'emoji')"></text>
							</view>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view v-if="closed==0" class="action">
								<button class="cu-btn bg-green margin-left" @tap="sendsl2">发送</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='jubaoxinxi'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<view class="cu-bar bg-white justify-end">
							<view class="content">请输入举报理由</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-sm">
							<radio-group class="block" @change="RadioChange">
								<view class="cu-form-group">
									<view class="text-xl">广告垃圾</view>
									<radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A">
									</radio>
								</view>
								<view class="cu-form-group">
									<view class="text-xl">违规内容</view>
									<radio :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B">
									</radio>
								</view>
								<view class="cu-form-group">
									<view class="text-xl">恶意灌水</view>
									<radio :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C">
									</radio>
								</view>
								<view class="cu-form-group">
									<view class="text-xl">重复内容</view>
									<radio :class="radio=='D'?'checked':''" :checked="radio=='D'?true:false" value="D">
									</radio>
								</view>
								<view class="cu-form-group">
									<view class="text-xl">其他</view>
									<radio :class="radio=='E'?'checked':''" :checked="radio=='E'?true:false" value="E">
									</radio>
								</view>
							</radio-group>
							<view class="cu-form-group align-start" v-if="radio=='E'">
								<textarea maxlength="-1" v-model="jubaomessage" placeholder="请在此输入想要说的话"></textarea>
							</view>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view v-if="closed==0" class="action">
								<button class="cu-btn bg-green margin-left" @tap="sendjbxx">发送</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='dashang'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<view class="cu-bar bg-white justify-end">
							<view class="content">请输入打赏金币的数目</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							<view class="cu-form-group margin-top">
								<text class='cuIcon-moneybagfill text-yellow'></text>
								<input :placeholder="tishi" v-model="dashangjinbi" name="input" type="number"></input>
								<picker @change="PickerChange" :value="index" :range="picker">
									<view class="picker">
										选择金币
									</view>
								</picker>
							</view>
							<view class="cu-form-group margin-top">
								<input placeholder="可输入评分理由" v-model="pingfenliyou" name="liyou"></input>
							</view>
							<view class="cu-form-group margin-top">
								<text class='cuIcon-notificationfill text-cyan'>通知作者</text>
								<switch @change="sendpfnofi" :class="sendpfno?'checked':''"
									:checked="sendpfno?true:false"></switch>
							</view>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view v-if="closed==0" class="action">
								<button class="cu-btn bg-green margin-left" @tap="senddashang"><text
										:class="loadModal4?'cuIcon-loading2 cuIconfont-spin':''"></text>打赏</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='postnew'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
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
				<view class="cu-modal" :class="isShowVaptcha?'show':''">
					<view class="cu-dialog" style="width: 100%;">
						<view class="yzbg">
							<sliding-image-verification v-if="isShowVaptcha"
								style="width: 100%;height: 60vw;z-index: 9999;" :bgImg=bgimg :successNumber=randomunmber
								:allowError="3" :canvasH="10" @success="sendmessage" @refresh="refreshyzm">
							</sliding-image-verification>
						</view>
						<view class="padding-xl">
							请左右滑动上图的滑块来完成拼图以便认证真人操作。
							<button class="cu-btn bg-green margin-left" @tap="reshow()">重置</button>
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
								<view class="item" @tap="floorhuif(item)" v-for="(item, index) in emojis" :key="index">
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
		<view v-if="InputBottom!=0" class="overlayer" @touchmove.stop.prevent="doNothing">
		</view>
		<view class="cu-bar foot input button__box" :style="[{bottom:InputBottom+'px'}]"
			@touchmove.stop.prevent="doNothing">
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="1000" cursor-spacing="10"
				@focus="InputFocus" @blur="InputBlur" v-model="contenthuifu"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey" @tap="togglePicker(200, 'emoji')"></text>
				<text class="cuIcon-roundadd text-grey" @tap="togglePicker(100, 'file')"></text>
			</view>
			<button v-if="closed==0&&yzm==1" @tap="showVaptcha" class="cu-btn bg-green shadow"><text
					class="cuIconfont-spin" :class="fasong?'cuIcon-loading2':''"></text>发送</button>
			<button v-else-if="closed==0" @tap="sendmessage" class="cu-btn bg-green shadow"><text
					class="cuIconfont-spin" :class="fasong?'cuIcon-loading2':''"></text>发送</button>
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
			<view class="load-progress-bar bg-green"
				:style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
			<view class="load-progress-spinner text-green"></view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				isCard: false,
				sendpfno: false,
				postname: '加载中',
				sightml: '',
				contenthuifu: '',
				floorhuifu: '',
				siliaotxt: '',
				content: '',
				sixintxt: '私信作者',
				pingbiauthor: '',
				pingbiuid: 0,
				dashangjinbi: '',
				picker: [],
				postup: '加载中',
				tishi: '输入金币数目',
				nowdate: '加载中',
				jifenbiangeng: '积分名+1',
				jifenshuoming: '积分变更',
				pingbi: '<div style=\"overflow: hidden;border: 1px dashed #FF9A9A;margin: 8px 0;padding: 10px;zoom: 1;\">此帖因违规被屏蔽，不可见。</div>',
				cantviewmessage: '',
				cantpostmessage: '',
				replykey: '',
				touxian: '',
				touxiangkuanglist: '',
				bgimg: '',
				radio: 'A',
				lucky: -1,
				yzm: 0,
				luckymessage: '',
				pingfenliyou: '',
				luckyme: [],
				jiance: [],
				iStatusBarHeight: 0,
				replycredit: 0,
				membertimes: 0,
				rprandom: 0,
				isImage: 0,
				sex: 0,
				status: 0,
				ding: 0,
				favorite: 0,
				dashang: 0,
				daoxu: 0,
				replies: 0,
				loadProgress: 0,
				jifencaozuo: 0,
				tid: 0,
				fid: 0,
				closed: 0,
				groupid: 0,
				pid: 0,
				jubaopid: 0,
				page: 0,
				toUID: 0,
				toPID: 0,
				index: 0,
				pm: 0,
				authorid: 0,
				fasong: false,
				floorfasong: false,
				loadModal: false,
				loadModal1: false,
				loadModal2: false,
				loadModal3: false,
				loadModal4: false,
				floorpage: [],
				jiazai: 0,
				pm: 0,
				laheivar: 0,
				laheitext: '拉黑作者',
				jiazaiwanbi: [],
				InputBottom: 0,
				randomunmber: 0,
				platform: 0,
				loadwb: 0,
				csss: 0,
				guanzhutext: '关注作者',
				jubaomessage: '',
				guanzhuvar: 1,
				huifulist: [],
				pingbilist: [],
				rplist: [],
				isfloat: [],
				xunzhanglist: [],
				isfloats: false,
				modalName: null,
				isShowVaptcha: false,
				loading: "上拉可加载更多回复",
				animation: [],
				dianzannumber: [],
				avatarlist: '../../static/avatar.jpg',
				emojis: ["{:4_91:}", "{:4_107:}", "{:4_100:}", "{:4_115:}", "{:4_104:}", "{:4_98:}", "{:4_114:}",
					"{:4_88:}",
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
				return e.substr(0, 200);
			},
			RadioChange(e) {
				this.radio = e.detail.value;
			},
			jubaota(e) {
				this.modalName = 'jubaoxinxi';
			},
			more(e) {
				let that = this;
				this.pingbiuid = this.uid;
				this.pingbiauthor = this.postup;
				this.jiazai = 1;
				this.jubaopid = this.pid;
				this.modalName = 'more';
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:guanzhu', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						touid: that.authorid,
						typeid: 0
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
						if (res.data.pm == 1) {
							that.pm = 1;
						} else {
							that.sixintxt = '私信作者（无权限使用）';
						}
						that.jiazai = 0;
						that.loadwb = 1;
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
						that.jifenbiandong('屏蔽取消', '你已将此作者从屏蔽列表移除');
					}
				});
				setTimeout(() => {
					this.modalName = null;
				}, 200)
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
						that.jifenbiandong('屏蔽成功', '你已将此作者加入屏蔽列表');
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
			more2(e, f, g) {
				let that = this;
				this.pingbiuid = e;
				this.pingbiauthor = f;
				this.jubaopid = g;
				this.jiazai = 1;
				this.modalName = 'pingbi';
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:guanzhu', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						touid: that.pingbiuid,
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
						} else {
							that.laheitext = '拉黑作者';
							that.laheivar = 0;
						}
						if (res.data.pm == 1) {
							that.pm = 1;
						} else {
							that.sixintxt = '私信作者（无权限使用）';
						}
						that.jiazai = 0;
						that.loadwb = 1;
					}
				});
			},
			guanzhu(e) {
				let that = this;
				this.jiazai = 1;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:guanzhu', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						touid: that.authorid,
						typeid: that.guanzhuvar
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.code == 200) {
							that.modalName = null;
							if (that.guanzhuvar == 1) {
								that.jifenbiandong('关注成功', '恭喜，你已关注该作者');
							} else {
								that.jifenbiandong('取关成功', '你已不再关注该作者');
							}
						} else {
							that.modalName = null;
							that.jifenbiandong('关注失败', '关注失败');
						}
						that.jiazai = 0;
						that.loadwb = 1;
					}
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
						touid: that.pingbiuid,
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
						} else {
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
			Letter(str) {
				let result;
				let reg = /[a-zA-Z]+/; //[a-zA-Z]表示匹配字母，g表示全局匹配			
				while (result = str.match(reg)) { //判断str.match(reg)是否没有字母了			
					str = str.replace(result[0], ''); //替换掉字母  result[0] 是 str.match(reg)匹配到的字母			
				}
				return str;
			},
			closeemoji(e) {
				this.showEmoji = false
			},
			back() {
				uni.navigateBack();
			},
			PickerChange(e) {
				console.log(e.detail)
				console.log(this.picker[e.detail.value])
				this.dashangjinbi = this.picker[e.detail.value]
			},
			sendpfnofi(e) {
				this.sendpfno = e.detail.value
			},
			formatRichText(html) {
				// 去掉img标签里的style、width、height属性
				let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				// 修改所有style里的width属性为max-width:100%
				newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi,
						'max-width:100%;');
					return match;
				});
				// 去掉<br/>标签
				newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				// img标签添加style属性：max-width:100%;height:auto
				newContent = newContent.replace(/\<img/gi,
					'<img style="max-width:100%;height:auto;display:block;margin:0px auto;"');
				return newContent;
			},
			LoadProgresss(e) {
				this.loadProgress = this.loadProgress + 3;
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
			loadmore(e) {
				Vue.set(this.isfloat, e, true);
				console.log(e);
				console.log(this.isfloat[e]);
			},
			loadfloor(e, j) {
				if (this.$floorswitch) {
					if (this.floorpage[j] == undefined) {
						this.floorpage[j] = 0;
					}
					this.loadfloors(e, this.floorpage[j], 0, 0, 0, j);
				} else {
					console.log(e);
					this.tofloor(e);
				}
			},
			louindex(e) {
				if (this.daoxu == 0) {
					return e + 2;
				} else {
					return this.replies - e + 1;
				}
			},
			doNothing: function() {
				//
			},
			jiancequery() {
				if (this.loadModal == true) {
					return;
				}
				this.modalName = 'testpan';
			},
			jiancequery2() {
				let that = this;
				console.log(this.jiance);
				console.log(this.pid);
				this.modalName = null;
				this.loadModal = true;
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
							that.jifenbiandong('网盘检测', '恭喜，该链接有效');
							that.loadthread(that.tid);
						} else if (res.data.code == 400) {
							that.jifenbiandong('网盘检测', '该链接检测已失效');
							that.loadthread(that.tid);
						} else if (res.data.code == 500) {
							that.jifenbiandong('网盘检测', '检测频率过快，稍后再试');
						} else if (res.data.code == 301) {
							that.jifenbiandong('网盘检测', '只能作者或管理员验证');
						} else {
							that.jifenbiandong('网盘检测', '功能错误');
						}
						that.loadModal = false;
					}
				});
			},
			shoucang() {
				if (this.loadModal1 == true) {
					return;
				}
				let that = this;
				console.log(this.tid);
				this.modalName = null;
				this.loadModal1 = true;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:shoucang', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						tid: that.tid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.code == 200) {
							that.jifenbiandong('收藏成功', '已经加进您的收藏夹');
							that.favorite = parseInt(that.favorite) + 1;
						} else if (res.data.code == 404) {
							that.jifenbiandong('收藏失败', '帖子不存在');
							that.loadthread(that.tid);
						} else if (res.data.code == 202) {
							that.jifenbiandong('收藏失败', '您已经收藏了此帖子');
						}
						that.loadModal1 = false;
					}
				});
			},
			dianzan() {
				if (this.loadModal2 == true) {
					return;
				}
				let that = this;
				console.log(this.tid);
				this.modalName = null;
				this.loadModal2 = true;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:dianzan', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						tid: that.tid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.code == 200) {
							that.jifenbiandong('点赞成功', '此帖支持度+1');
							that.ding = parseInt(that.ding) + 1;
						} else if (res.data.code == 404) {
							that.jifenbiandong('点赞失败', '帖子不存在');
							that.loadthread(that.tid);
						} else if (res.data.code == 202) {
							that.jifenbiandong('点赞失败', '您已经点赞了此帖子');
						} else if (res.data.code == 201) {
							that.jifenbiandong('取消成功', '您取消点赞了此帖子');
							that.ding = parseInt(that.ding) - 1;
						}
						that.loadModal2 = false;
					}
				});
			},
			dashangadd() {
				if (this.loadModal3 == true) {
					return;
				}
				let that = this;
				console.log(this.tid);
				this.modalName = null;
				this.loadModal3 = true;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:dashang', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						pid: that.pid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.code == 200) {
							that.modalName = 'dashang';
							that.picker = res.data.area[0];
							that.tishi = res.data.tishi[0];
						} else if (res.data.code == 400) {
							that.jifenbiandong('打赏失败', '您无权打赏');
						} else if (res.data.code == 401) {
							that.jifenbiandong('打赏失败', '此板块禁止打赏');
						} else if (res.data.code == 410) {
							that.jifenbiandong('打赏失败', '不能给自己打赏');
						} else if (res.data.code == 202) {
							that.jifenbiandong('打赏失败', '您已经打赏了此帖子');
						}
						that.loadModal3 = false;
					}
				});
			},
			senddashang(e) {
				if (this.loadModal4 == true) {
					return;
				}
				let that = this;
				if (that.sendpfno) {
					that.pm = 1
				} else {
					that.pm = 0
				}
				console.log(this.tid);
				this.modalName = null;
				this.loadModal4 = true;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:dashang', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						typeid: 1,
						score: that.dashangjinbi,
						pm: that.pm,
						reason: that.pingfenliyou,
						pid: that.pid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.code == 200) {
							that.modalName = null;
							that.jifenbiandong('打赏成功', '您将被扣除相应积分');
							that.dashang = parseInt(that.dashang) + parseInt(that.dashangjinbi);
							if (that.dashang > 0) {
								that.dashang = "+" + that.dashang;
							}
						} else if (res.data.code == 400) {
							that.jifenbiandong('打赏失败', '您无权打赏');
						} else if (res.data.code == 401) {
							that.jifenbiandong('打赏失败', '此板块禁止打赏');
						} else if (res.data.code == 410) {
							that.jifenbiandong('打赏失败', '不能给自己打赏');
						} else if (res.data.code == 402) {
							that.jifenbiandong('打赏失败', '打赏金额不正确');
						} else if (res.data.code == 403) {
							that.jifenbiandong('打赏失败', '所拥有的金币不足以打赏');
						} else if (res.data.code == 202) {
							that.jifenbiandong('打赏失败', '您已经打赏了此帖子');
						}
						that.loadModal4 = false;
					}
				});
			},
			editpost() {
				let that=this;
				console.log(that.fid);
				console.log(that.tid);
				console.log(that.pid);
				uni.navigateTo({
					url: '../extra/editor?fid=' + that.fid + '&tid=' + that.tid + '&pid=' +that.pid,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			edithuifu(e) {
				let that=this;
				console.log(that.fid);
				console.log(that.tid);
				console.log(e);
				uni.navigateTo({
					url: '../extra/editor?fid=' + that.fid + '&tid=' + that.tid + '&pid=' +e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			lzlpo(e, f, g) {
				if (this.$floorswitch) {
					console.log(e);
					console.log(f);
					this.toUID = e;
					this.toPID = f;
					this.modalName = 'floorpost';
					this.index = g;
				} else {
					console.log(e);
					console.log(f);
					console.log(g);
					this.tofloor(f);
				}
			},
			lzpo(f, g) {
				console.log(f);
				this.toUID = 0;
				this.toPID = f;
				this.index = g;
				this.modalName = 'floorpost';
			},
			siliaozuozhe() {
				this.modalName = 'siliao';
			},
			siliaozuozhe2() {
				this.modalName = 'siliao2';
			},
			zanpo(f, g, h, i) {
				console.log(f);
				let that = this;
				//this.toPID = f;
				//this.index = g;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:zanpo', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						pid: f
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
					}
				});
				if (i == 1) {
					this.unshake(g, parseInt(h));
				} else {
					this.shake(g, parseInt(h));
				}
			},
			shake(e, f) {
				console.log(f);
				Vue.set(this.animation, e, 1);
				Vue.set(this.dianzannumber, e, f + 1);
				if (this.platform == 1) { //iOS自带触感反馈
					var UIImpactFeedbackGenerator = plus.ios.importClass(
						'UIImpactFeedbackGenerator'
					)
					var impact = new UIImpactFeedbackGenerator()
					impact.prepare()
					impact.init(1)
					impact.impactOccurred()
				} else { //Android只能用震动模拟
					uni.vibrateShort({
						success: function() {
							console.log('success');
						}
					});
				}
			},
			unshake(e, f) {
				console.log(f);
				Vue.set(this.animation, e, 2);
				Vue.set(this.dianzannumber, e, f - 1);
				if (this.platform == 1) { //iOS自带触感反馈
					var UIImpactFeedbackGenerator = plus.ios.importClass(
						'UIImpactFeedbackGenerator'
					)
					var impact = new UIImpactFeedbackGenerator()
					impact.prepare()
					impact.init(1)
					impact.impactOccurred()
				} else { //Android只能用震动模拟
					uni.vibrateShort({
						success: function() {
							console.log('success');
						}
					});
				}
			},
			floorhuif(e) {
				if (this.modalName == 'floorpost') {
					this.floorhuifu += e;
					this.showEmoji = false;
				} else if (this.modalName == 'siliao') {
					this.siliaotxt += e;
					this.showEmoji = false;
				} else {
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
				} else if (e.target == 'forum') {
					uni.navigateTo({
						url: '../basics/forum?forumid=' + e.apphref,
						animationType: 'pop-in',
						animationDuration: 200
					});
				} else if (e.target == 'down') {
					uni.downloadFile({
						url: e.apphref,
						filePath: '_doc/app_down/' + e.name,
						success: (res) => {
							console.log(res);
							if (res.statusCode === 200) {
								uni.showToast({
									icon: 'none',
									mask: true,
									title: '文件已保存：' + res.tempFilePath, //保存路径
									duration: 300,
								});
								setTimeout(() => {
									//打开文档查看
									uni.openDocument({
										filePath: res.tempFilePath,
										success: function(res) {
											// console.log('打开文档成功');
										}
									});
								}, 300)
							}
						}
					});
				} else if (e.innerText.indexOf("@") == 0) {
					uni.navigateTo({
						url: '../component/list?uid=' + e.href.replace(/[^0-9]/ig, ""),
						animationType: 'pop-in',
						animationDuration: 200
					});
				} else if (e.target == 'hbbtn1') {
					let that = this;
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
								that.jifenbiandong(res.data.title, res.data.message);
								that.loadthread(that.tid);
							} else {
								that.jifenbiandong('领取失败', res.data);
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
			randomcolor() {
				let r = Math.floor(Math.random() * 200 + 55);
				let g = Math.floor(Math.random() * 200 + 55);
				let b = Math.floor(Math.random() * 200 + 55);
				return 'rgba(' + r + ',' + g + ',' + b + ',0.8)';
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
			reshow(){
				let that = this;
				this.isShowVaptcha = false;
				this.bgimg = '../../static/img/loading2.gif';
				setTimeout(function() {
					that.showVaptcha();
				},200)
			},
			showVaptcha() {
				this.isShowVaptcha = true;
				this.bgimg = 'http://bbs.zdfx.net/img/style/i/yzm_pic/' + Math.floor(Math.random() * 218) + '.jpg';
				//this.bgimg = '../../static/headPic.png';
				console.log(this.bgimg)
				this.randomunmber = Math.random() * 100;
				// #ifdef APP-PLUS
				var page = this.$mp.page.$getAppWebview();
				page.setStyle({
					popGesture: 'none'
				});
				// #endif
			},
			refreshyzm() {
				if(this.csss<3){
					uni.showToast({
						icon: "none",
						title: "重试"
					});
					this.csss++;
				}else{
					this.csss = 0;
					this.reshow();
				}
			},
			handleMessage(res) {
				this.isShowVaptcha = false
				if (res.signal === 'pass') {
					//验证通过后获取到token和server进行后续操作
					console.log('验证通过')
					console.log('token:' + res.data.token)
					console.log('server:' + res.data.server)
					this.sendmessage();
				}
				if (res.signal === 'cancel') {
					console.log('取消验证')
				}
				if (res.signal === 'error') {
					console.log('请求超时')
				}
			},
			sendmessage() {
				this.isShowVaptcha = false
				// #ifdef APP-PLUS
				var page = this.$mp.page.$getAppWebview();
				page.setStyle({
					popGesture: 'close'
				});
				// #endif
				var that = this;
				console.log(that.contenthuifu.length);
				if (that.contenthuifu.length < 4) {
					that.modalName = "cantpost";
					that.cantpostmessage = '请输入大于等于4个字的回复内容。';
					this.fasong = false;
					return;
				}
				if (this.replykey == '') {
					that.modalName = "cantpost";
					that.cantpostmessage = '帖子发送参数未获取，发送失败。';
					this.fasong = false;
					return;
				}
				if (!this.fasong) {
					that.fasong = true;
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
								if (res.data.credit) {
									that.jifenbiandong(res.data.credit, res.data.credittxt);
								}
								if (res.data.luckypost.key >= 0) {
									that.luckyme = res.data.luckypost;
								}
								that.refresh(message);
							}
						}
					});
				}
			},
			sendfloor() {
				var that = this;
				console.log(that.floorhuifu.length);
				if (that.floorhuifu.length < 2) {
					that.modalName = "cantpost";
					that.cantpostmessage = '请输入大于等于2个字的回复内容。';
					this.floorfasong = false;
					return;
				}
				if (!this.floorfasong) {
					that.floorfasong = true;
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
								that.jifenbiandong('楼中楼', '回楼中楼成功，刷新可见');
								that.modalName = null;
							}
						}
					});
				}
			},
			sendsl() {
				var that = this;
				console.log(that.siliaotxt.length);
				if (that.siliaotxt.length < 2) {
					that.modalName = "cantpost";
					that.cantpostmessage = '请输入大于等于2个字的回复内容。';
					this.floorfasong = false;
					return;
				}
				if (!this.floorfasong) {
					that.floorfasong = true;
					var message = encodeURI(that.siliaotxt);
					console.log(that.siliaotxt);
					console.log(that.toUID);
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:sendpm', //获取置顶帖子
						method: 'POST',
						timeout: 10000,
						data: {
							token: that.$token,
							action: 'pm_send',
							message: message,
							msgto: that.authorid
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data)
							if (res.data.code == 400) {
								that.modalName = "needlogin";
							} else if (res.data.code == 200) {
								that.modalName = null;
								that.jifenbiandong('私信成功', '你的私信发送完毕。');
								that.siliaotxt = '';
							} else {
								that.modalName = null;
								that.jifenbiandong('私信失败', res.data.message);
							}
						}
					});
				}
			},
			sendsl2() {
				var that = this;
				console.log(that.siliaotxt.length);
				if (that.siliaotxt.length < 2) {
					that.modalName = "cantpost";
					that.cantpostmessage = '请输入大于等于2个字的回复内容。';
					this.floorfasong = false;
					return;
				}
				if (!this.floorfasong) {
					that.floorfasong = true;
					var message = encodeURI(that.siliaotxt);
					console.log(that.siliaotxt);
					console.log(that.toUID);
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:sendpm', //获取置顶帖子
						method: 'POST',
						timeout: 10000,
						data: {
							token: that.$token,
							action: 'pm_send',
							message: message,
							msgto: that.pingbiuid
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data)
							if (res.data.code == 400) {
								that.modalName = "needlogin";
							} else if (res.data.code == 200) {
								that.modalName = null;
								that.jifenbiandong('私信成功', '你的私信发送完毕。')
								that.siliaotxt = '';
							} else {
								that.modalName = null;
								that.jifenbiandong('私信失败', res.data.message);
							}
						}
					});
				}
			},
			sendjbxx() {
				var that = this;
				console.log(that.jubaomessage.length);
				if (that.jubaomessage.length < 2 && that.radio == 'E') {
					that.modalName = "cantpost";
					that.cantpostmessage = '请输入大于等于2个字的举报内容。';
					this.floorfasong = false;
					return;
				}
				if (!this.floorfasong) {
					that.floorfasong = true;
					if (that.radio == 'A') {
						var message = encodeURI('广告垃圾');
					} else if (that.radio == 'B') {
						var message = encodeURI('违规内容');
					} else if (that.radio == 'C') {
						var message = encodeURI('恶意灌水');
					} else if (that.radio == 'D') {
						var message = encodeURI('重复发帖');
					} else if (that.radio == 'E') {
						var message = encodeURI(that.jubaomessage);
					}
					console.log(that.jubaomessage);
					console.log(that.jubaopid);
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:jubao', //获取置顶帖子
						method: 'POST',
						timeout: 10000,
						data: {
							token: that.$token,
							message: message,
							pid: that.jubaopid
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							that.floorfasong = false;
							that.jubaomessage = '';
							if (res.data.code == 400) {
								that.modalName = "needlogin";
							} else if (res.data.code == 200) {
								that.modalName = null;
								that.jifenbiandong('举报成功', '你的举报发送完毕。')
								that.siliaotxt = '';
							} else {
								that.modalName = null;
								that.jifenbiandong('举报失败', res.data.message);
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
				fasonginfo.avatarlist = 'https://zd.tiangal.com/uc_server/avatar.php?uid=' + this.$uid + '&size=small';
				fasonginfo.dateline = '刚刚';
				fasonginfo.groupid = 0;
				fasonginfo.html = decodeURI(e);
				fasonginfo.pid = 0;
				fasonginfo.position = 0;
				fasonginfo.reply = 0;
				if (uni.getSystemInfoSync().platform == 'ios') {
					fasonginfo.status = 136;
				} else {
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
			totheuid(e) {
				this.modalName = null;
				uni.navigateTo({
					url: '../component/list?uid=' + e,
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
					this.isImage = 0;
				} else {
					var isImage = 1;
					this.isImage = 1;
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
							that.authorid = res.data.authorid;
							that.postname = res.data.subject;
							that.replykey = res.data.replykey;
							that.content = res.data.html;
							that.avatarlist = res.data.userinfo.avatarlist;
							that.nowdate = res.data.nowdate;
							that.sex = res.data.userinfo.sex;
							that.groupid = res.data.userinfo.groupid;
							that.touxian = res.data.userinfo.touxian;
							that.xunzhanglist = res.data.userinfo.xunzhanglist;
							that.touxiangkuanglist = res.data.userinfo.touxiangkuanglist;
							that.lucky = res.data.luckypost.key;
							that.luckymessage = res.data.luckypost.msg;
							that.status = res.data.status;
							that.jiance = res.data.jiance;
							that.ding = res.data.ding;
							that.favorite = res.data.favorite;
							that.dashang = res.data.rate;
							that.yzm = res.data.yzm;
							that.daoxu = res.data.daoxu;
							that.replies = res.data.replies;
							that.sightml = res.data.userinfo.sightml;
							that.replycredit = res.data.replycredit;
							that.membertimes = res.data.membertimes;
							that.rprandom = res.data.rprandom;
							if (that.dashang > 0) {
								that.dashang = "+" + that.dashang;
							}
							//console.log(that.threadlist);
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100);
							that.loadwb = 1;
							if (res.data.replykey == 'closed') {
								that.contenthuifu = '回帖已关闭';
								that.closed = 1;
							}
						}
					}
				});
			},
			loadfloors(pid, page, orderby, dateline, filter, index) {
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
						that.jiazai = 0;
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
				that.loading = '载入中';
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
						console.log(res.data);
						if (res.data.code == 404) {
							that.modalName = "needlogin";
						} else if (res.data.code == 401) {
							that.modalName = "cantview";
							that.cantviewmessage = res.data.message;
						} else {
							if (that.page == 0) {
								that.huifulist = res.data;
								if (res.data.length == 0) {
									that.loading = '还没有任何回复，快来抢沙发吧！';
								} else {
									that.loading = '上拉可加载更多回复';
								}
							} else {
								for (let i = 0; i < res.data.length; ++i) {
									that.huifulist.push(res.data[i]);
									that.loading = '上拉可加载更多回复';
								}
								if (res.data.length < 30) {
									that.loading = '到底了。';
								}
							}
							//console.log(res.data);
							that.page++;
							that.loadwb = 1;
						}
					}
				});
			},
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数 
			this.tid = option.tid;
			var that = this;
			console.log(option.tid); //打印出上个页面传递的参数。
			this.loadthread(this.tid);
			this.loadhuifu(this.tid, this.page, '', '', '', '1');
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			if (uni.getSystemInfoSync().platform == 'ios') {
				this.platform = 1;
			} else {
				this.platform = 2;
			}
			this.randomunmber = Math.random() * 100;
			this.bgimg = 'http://bbs.zdfx.net/img/style/i/yzm_pic/' + Math.floor(Math.random() * 208) + '.jpg';
			//载入屏蔽名单
			uni.getStorage({
				key: 'pingbilist',
				success: function(res) {
					console.log(res.data);
					that.pingbilist = res.data;
				}
			})
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
		font-size: 1.05rem;
		margin-bottom: 20upx;
	}

	.cu-item .title {
		font-size: 1.4rem;
		font-weight: 900;
		color: #333333;
		line-height: 100upx;
		padding: 0 30upx;
	}

	.cu-modal .cu-item .content {
		border-bottom: 1upx solid #ccc !important;
		padding-bottom: 20upx;
	}

	.float {
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.float2 {
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
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
				font-size: 0.8rem;
				margin-top: 4upx;
			}
		}
	}

	.icon {
		width: 48upx;
		height: 48upx;
	}

	.cu-list {
		margin-top: -10upx !important;
	}

	.solids-top::after {
		border-top: 1px solid #eee !important;
	}

	.overlayer {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
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

	.touxian {
		max-width: 200upx;
		max-height: 100upx;
		position: absolute;
		right: 0;
		margin-top: 50upx;
	}

	.touxian2 {
		max-width: 160upx;
		max-height: 80upx;
		position: absolute;
		right: 0;
		margin-top: 40upx;
	}

	.bhh {
		display: inline-block;
		word-wrap: break-word;
		white-space: normal;
	}

	.hbx {
		position: relative;
	}

	.ltsp {
		line-height: 24upx;
	}

	.gzlist2 {
		position: absolute;
		background-color: transparent;
		margin: -0upx 0 0 -28upx;
		width: 140upx;
		height: 140upx;
	}

	.badge {
		z-index: 9;
	}

	.gzlist3 {
		position: absolute;
		background-color: transparent;
		margin: -13upx 0 0 -100upx;
		width: 86upx;
		height: 86upx;
	}

	.noborder {
		padding-top: 0px !important;
		margin-top: 0px !important;
	}

	.noborder2 {
		padding-top: 30upx;
	}

	.chacha {
		position: absolute;
		right: 30upx;
	}
	
	.yzbg {
		background-image: url(../../static/img/loading2.gif);
		background-size:contain;
	}
</style>
