<template name="basics">
	<page-meta :root-font-size="$fontsize"></page-meta>
	<view>
		<view class="box">
			<view class="cu-bar bg-cyan search hometop"  :class="'bt-'+themeColor.name">
				<view>
					<img-cache v-show="avatarimgLoaded" class="cu-avatar round" :src="$avatarsmall" @tap="userinfo"
						data-id="0" @load="onSuccessImg()" />
					</img-cache>
					<img-cache v-show="!avatarimgLoaded" class="cu-avatar round" :src="$avatarsmalldefault"
						@tap="userinfo" data-id="0" style="margin-left: 11px;" />
					</img-cache>
				</view>
				<view class="search-form radius"  :class="'bt-'+themeColor.name">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" @confirm="searchconfirm" :adjust-position="false"
						type="text" placeholder="搜索图片、文章、视频"></input>
				</view>
			</view>
		</view>
		<scroll-view scroll-x class="nav-sm bg-gray hometop0" scroll-with-animation :scroll-left="scrollLeft" :class="'bg-light-'+themeColor.name">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in 7" :key="index"
				@tap="tabSelect" :data-id="index">
				{{tabname[index]}}
			</view>
		</scroll-view>
		<!-- 搜索历史 -->
		<view class="searchHistory" :style="'display: '+ searchstyle +';'">
			<view
				style="display:flex;justify-content: space-between;box-sizing: border-box;padding: 0px 10upx;z-index: 999;"
				:style="'margin-top:'+ iStatusBarHeight +'upx;'">
				<view>搜索历史:</view>

				<view style="color: red;font-size: 3rem;" @click="empty">×</view>
			</view>
			<view class="searchHistoryItem">
				<view v-for="(item3, index3) in searchHistoryList" :key="index3">
					<view class="cu-tag padding-left-xs padding-right-xs" :class="loadlevelicon2(index3)"
						@tap="searchconfirm2(item3)">
						{{item3}}
					</view>
				</view>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="view_head" @touchstart="start" @touchend="end">
			<scroll-view v-if="TabCur==0" class="list">
				<view class="view_listnow"  :class="'bg-'+themeColor.name">
					<view class="hometop3">
					</view>
					<view v-if="guanzhupost.length > 0">
						<block v-for="(itemex,indexe1) in guanzhupost" :key="indexe1">
							<view class="solid-bottom text-df article text-min"  :class="'bg-'+themeColor.name"
								style="padding-top: 10upx; padding-bottom: 10upx;" @tap="tourl(itemex.url)">
								<view style="margin-right: 20upx;padding-left: 80upx;" class="text-black text-cut" :class="'bt-'+themeColor.name">
									{{itemex.title}}</view>
								<view style="padding-left: 80upx;">
									<view>
										<img-cache class="cu-avatar round gzlist" :src="itemex.avatar" />
										</img-cache>
										<img-cache class="cu-avatar round gzlist2" v-if="itemex.touxiangkuanglist != ''"
											:src="itemex.touxiangkuanglist" />
										</img-cache>
									</view>
									<view class="cu-tag padding-left-xs padding-right-xs"
										:class="loadlevelicon2(itemex.fid)">
										{{itemex.bkname}}
									</view><text class="text-sm text-gray"
										style="padding-left: 8upx;">{{itemex.author}}&nbsp&nbsp{{itemex.replies}}评&nbsp&nbsp{{itemex.nowdate}}</text>
									<img-cache v-if="itemex.img!='static/image/common/nophoto.gif'" mode="aspectFill"
										class="gzlist3" :src="itemex.img" />
								</view>
								<view v-if="itemex.img=='static/image/common/nophoto.gif'" class="text-content" :class="'bt-'+themeColor.name"
									style="padding-left: 10upx;padding-top: 5upx;">
									{{itemex.summary}}
								</view>
								<view v-else class="text-content" :class="'bt-'+themeColor.name"
									style="line-height:35upx; font-size: 0.8rem; padding-left: 10upx; padding-right: 100upx;padding-top: 5upx;text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
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
					<swiper class="screen-swiper square-dot hometop3" :indicator-dots="true" :circular="true"
						:autoplay="true" interval="5000" duration="500">
						<swiper-item v-for="(item,index) in swiperList" :key="index" @tap="tourl(item.url)">
							<image v-if="isImage" :src="item.img" mode="aspectFill"></image>
							<image v-else src="../../static/noimg.png" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
					<view v-if="toplist.length > 0">
						<block v-for="(item,index1) in toplist" :key="index1">
							<view class="solid-bottom text-df article"  :class="'bg-'+themeColor.name"
								style="padding-top: 10upx; padding-bottom: 10upx;"  v-if="!(ifpingbi(item.author)&&$adminid<=0)">
								<view @tap="tourl(item.url)">
									<text class="text-black text-cut" :class="'bt-'+themeColor.name" style="width: 100%;">{{item.title}}</text>
								</view>
								<view> <text class="text-sm text-red padding-sm" @tap="tourl(item.url)">置顶</text> <text
										class="text-sm text-gray padding-sm" @tap="tourl(item.url)">{{item.author}}&nbsp&nbsp{{item.replies}}评</text>
												<view class="chacha text-gray cuIcon-close" @tap="more2(item.author,item.url)">
												</view>
								</view>
							</view>
						</block>
					</view>
					<view v-if="tuijiantie.length > 0">
						<block v-for="(item,index2) in tuijiantie" :key="index2">
							<view class="solid-bottom cu-card article no-card"  v-if="!(ifpingbi(item.author)&&$adminid<=0)">
								<view class="cu-item shadow"  :class="'bg-'+themeColor.name">
									<view class="title" @tap="tourl(item.url)">
										<view class="text-cut text-black" :class="'bt-'+themeColor.name">{{item.title}}</view>
									</view>
									<view class="content">
										<image v-if="isImage" :src="item.img" mode="aspectFill" @tap="tourl(item.url)"></image>
										<view class="desc">
											<view class="text-content"  :class="'bt-'+themeColor.name" @tap="tourl(item.url)">
												{{item.summary}}
											</view>
											<view>
												<view class="cu-tag bg-red light sm round">{{item.author}}
												</view>
												<view class="cu-tag bg-green light sm round">{{item.replies}}评
												</view>
												<view class="chacha text-gray cuIcon-close" @tap="more2(item.author,item.url)">
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</block>
					</view>
					<view v-if="newpost.length > 0">
						<block v-for="(item,index3) in newpost" :key="index3">
							<view class="solid-bottom cu-card article no-card"  v-if="!(ifpingbi(item.author)&&$adminid<=0)">
								<view class="cu-item shadow"  :class="'bg-'+themeColor.name">
									<view class="title" @tap="tourl(item.url)">
										<view class="text-cut text-black" :class="'bt-'+themeColor.name">{{item.title}}</view>
									</view>
									<view class="content">
										<image v-if="item.img != 'static/image/common/nophoto.gif'&&isImage"
											:src="item.img" mode="aspectFill" @tap="tourl(item.url)"></image>
										<view class="desc">
											<view class="text-content"  :class="'bt-'+themeColor.name" @tap="tourl(item.url)">
												{{item.summary}}
											</view>
											<view>
												<view class="cu-tag bg-red light sm round">{{item.author}}
												</view>
												<view class="cu-tag bg-green light sm round">{{item.replies}}评
												</view>
												<view class="chacha text-gray cuIcon-close"  @tap="more2(item.author,item.url)">
												</view>
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
			</scroll-view>
			<scroll-view v-else-if="TabCur==2" class="list">
				<view class="view_listnow">
					<view class="hometop3">
					</view>
					<view v-if="rebangpost.length > 0">
						<block v-for="(itemex,indexe1) in rebangpost" :key="indexe1">
							<view class="solid-bottom text-df article text-min"  :class="'bg-'+themeColor.name"
								style="padding-top: 10upx; padding-bottom: 10upx;" v-if="!(ifpingbi(itemex.author)&&$adminid<=0)">
								<view style="margin-right: 20upx;padding-left: 80upx;" class="text-black text-cut" :class="'bt-'+themeColor.name" @tap="tourl(itemex.url)">
									{{itemex.title}}</view>
								<view style="padding-left: 80upx;">
									<view>
										<img-cache class="cu-avatar round gzlist" :src="itemex.avatar" />
										</img-cache>
										<img-cache class="cu-avatar round gzlist2" v-if="itemex.touxiangkuanglist != ''"
											:src="itemex.touxiangkuanglist" />
										</img-cache>
									</view>
									<view class="cu-tag padding-left-xs padding-right-xs"
										:class="loadlevelicon2(itemex.fid)">
										{{itemex.bkname}}
									</view><text class="text-sm text-gray"
										style="padding-left: 8upx;">{{itemex.author}}&nbsp&nbsp{{itemex.replies}}评&nbsp&nbsp{{itemex.nowdate}}</text>
									<img-cache v-if="itemex.img!='static/image/common/nophoto.gif'" mode="aspectFill"
										class="gzlist3" :src="itemex.img" />
								</view>
								<view class="chacha text-gray cuIcon-close" @tap="more2(itemex.author,itemex.url)">
								</view>
								<view v-if="itemex.img=='static/image/common/nophoto.gif'" class="text-content"  :class="'bt-'+themeColor.name"
									style="padding-left: 10upx;padding-top: 5upx;"  @tap="tourl(itemex.url)">
									{{itemex.summary}}
								</view>
								<view v-else class="text-content" :class="'bt-'+themeColor.name" @tap="tourl(itemex.url)"
									style="line-height:35upx; font-size: 0.8rem; padding-left: 10upx; padding-right: 100upx;padding-top: 5upx;text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
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
			<scroll-view v-else-if="TabCur==3" class="list">
				<view class="view_listnow">
					<view class="hometop3">
					</view>
					<view v-if="zixunpost.length > 0">
						<block v-for="(itemex,indexe1) in zixunpost" :key="indexe1">
							<view class="solid-bottom text-df article text-min"  :class="'bg-'+themeColor.name"
								style="padding-top: 10upx; padding-bottom: 10upx;" v-if="!(ifpingbi(itemex.author)&&$adminid<=0)">
								<view style="margin-right: 20upx;padding-left: 80upx;" class="text-black text-cut" :class="'bt-'+themeColor.name" @tap="tourl(itemex.url)">
									{{itemex.title}}</view>
								<view style="padding-left: 80upx;">
									<view>
										<img-cache class="cu-avatar round gzlist" :src="itemex.avatar" />
										</img-cache>
										<img-cache class="cu-avatar round gzlist2" v-if="itemex.touxiangkuanglist != ''"
											:src="itemex.touxiangkuanglist" />
										</img-cache>
									</view>
									<view class="cu-tag padding-left-xs padding-right-xs"
										:class="loadlevelicon2(itemex.fid)">
										{{itemex.bkname}}
									</view><text class="text-sm text-gray"
										style="padding-left: 8upx;">{{itemex.author}}&nbsp&nbsp{{itemex.replies}}评&nbsp&nbsp{{itemex.nowdate}}</text>
									<img-cache v-if="itemex.img!='static/image/common/nophoto.gif'" mode="aspectFill"
										class="gzlist3" :src="itemex.img" />
								</view>
								<view class="chacha text-gray cuIcon-close" @tap="more2(itemex.author,itemex.url)">
								</view>
								<view v-if="itemex.img=='static/image/common/nophoto.gif'" class="text-content"   :class="'bt-'+themeColor.name"
									style="padding-left: 10upx;padding-top: 5upx;" @tap="tourl(itemex.url)">
									{{itemex.summary}}
								</view>
								<view v-else class="text-content"  :class="'bt-'+themeColor.name" @tap="tourl(itemex.url)"
									style="line-height:35upx; font-size: 0.8rem; padding-left: 10upx; padding-right: 100upx;padding-top: 5upx;text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
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
			<scroll-view v-else-if="TabCur==4" class="list">
				<view class="view_listnow">
					<view class="hometop3">
					</view>
					<view v-if="taolunpost.length > 0">
						<block v-for="(itemex,indexe1) in taolunpost" :key="indexe1">
							<view class="solid-bottom text-df article text-min"  :class="'bg-'+themeColor.name"
								style="padding-top: 10upx; padding-bottom: 10upx;" v-if="!(ifpingbi(itemex.author)&&$adminid<=0)">
								<view style="margin-right: 20upx;padding-left: 80upx;" class="text-black text-cut" :class="'bt-'+themeColor.name" @tap="tourl(itemex.url)">
									{{itemex.title}}</view>
								<view style="padding-left: 80upx;">
									<view>
										<img-cache class="cu-avatar round gzlist" :src="itemex.avatar" />
										</img-cache>
										<img-cache class="cu-avatar round gzlist2" v-if="itemex.touxiangkuanglist != ''"
											:src="itemex.touxiangkuanglist" />
										</img-cache>
									</view>
									<view class="cu-tag padding-left-xs padding-right-xs"
										:class="loadlevelicon2(itemex.fid)">
										{{itemex.bkname}}
									</view><text class="text-sm text-gray"
										style="padding-left: 8upx;">{{itemex.author}}&nbsp&nbsp{{itemex.replies}}评&nbsp&nbsp{{itemex.nowdate}}</text>
									<img-cache v-if="itemex.img!='static/image/common/nophoto.gif'" mode="aspectFill"
										class="gzlist3" :src="itemex.img" />
								</view>
								<view class="chacha text-gray cuIcon-close" @tap="more2(itemex.author,itemex.url)">
								</view>
								<view v-if="itemex.img=='static/image/common/nophoto.gif'" class="text-content"  :class="'bt-'+themeColor.name"
									style="padding-left: 10upx;padding-top: 5upx;" @tap="tourl(itemex.url)">
									{{itemex.summary}}
								</view>
								<view v-else class="text-content"  :class="'bt-'+themeColor.name" @tap="tourl(itemex.url)"
									style="line-height:35upx; font-size: 0.8rem; padding-left: 10upx; padding-right: 100upx;padding-top: 5upx;text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
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
			<scroll-view v-else-if="TabCur==5" class="list">
				<view class="view_listnow">
					<view class="hometop3">
					</view>
					<view v-if="meitupost.length > 0" id="waterfull">
						<view v-for="(itemex,indexe1) in meitupost" :key="indexe1" v-if="!(ifpingbi(itemex.author)&&$adminid<=0)">
							<view class="item">
								<img-cache v-if="itemex.img!='static/image/common/nophoto.gif'" mode="aspectFill"
									class="itemImg" :src="itemex.img" @tap="tourl(itemex.url)"></img-cache><image v-else class="itemImg" src="../../static/img/loadzd.gif" @tap="tourl(itemex.url)"></image>
								<view class="userInfo" :class="'bg-light-'+themeColor.name">
									<img-cache class="avatar round" :src="itemex.avatar"  @tap="tourl(itemex.url)">
									</img-cache>
									<text class="username text-df article text-gray" :class="'bg-light-'+themeColor.name" @tap="tourl(itemex.url)">{{itemex.author}}</text>
									<text class="text-gray cuIcon-close" @tap="more2(itemex.author,itemex.url)">
									</text>
									<view class="text-df article text-black text-cut" :class="'bg-light-'+themeColor.name" @tap="tourl(itemex.url)">{{itemex.title}}</view>
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
				</view>
			</scroll-view>
			<scroll-view v-else-if="TabCur==6" class="list">
				<view class="view_listnow">
					<view class="hometop3">
					</view>
					<view v-if="labapost.length > 0">
						<view v-for="(itemexs,indexe1) in labapost" :key="indexe1">
							<view v-if="!(ifpingbi(itemexs.author)&&$adminid<=0)">
								<view v-if="itemexs.level=='all'" class="padding-xs radius shadow margin-top-xs text-black" :class="'bg-light-'+themeColor.name"><button class="cu-btn bg-green padding0">全站</button>
										<image class="avatar round" :src="itemexs.avatarlist"  @tap="touserpage(itemexs.uid)">
										</image><text class="text-blue"  @tap="touserpage(itemexs.uid)">{{itemexs.username}}</text><text class="lg text-gray cuIcon-time"></text><text class="text-gray">{{itemexs.dateline}}</text><rich-text :nodes="itemexs.content"></rich-text></view>
								<view v-else-if="itemexs.level=='system'" class="padding-xs radius shadow bg-red margin-top-xs text-black"><button class="cu-btn bg-red padding0">系统</button><text class="text-blue">{{itemexs.username}}</text><text class="lg text-gray cuIcon-time"></text><text class="text-gray">{{itemexs.dateline}}</text><rich-text :nodes="itemexs.content"></rich-text></view>
								<view class="chacha text-gray cuIcon-close" @tap="more2(itemexs.username,itemexs.id,1)">
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
				</view>
			</scroll-view>
		</view>
		<view class="cu-modal" :class="modalName=='pingbi'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-list menu text-left solid-top" :class="'bg-'+themeColor.name">
					<view class="cu-item"  :class="'bg-'+themeColor.name" v-if="pingbiauthor==$username">
						<view class="content">
							<text class="text-gray"><text class="cuIcon-roundclose"></text>屏蔽自己</text>
						</view>
					</view>
					<view class="cu-item"  :class="'bg-'+themeColor.name" v-else-if="!ifpingbi(pingbiauthor)" @tap="pingbiadd(pingbiauthor)">
						<view class="content noborder2">
							<text class="text-grey"><text class="cuIcon-roundclose"></text>屏蔽作者：{{pingbiauthor}}</text>
							<view class="text-gray text-sm noborder">屏蔽后，你将不会收到他的信息。</view>
						</view>
					</view>
					<view class="cu-item" :class="'bg-'+themeColor.name" v-else @tap="pingbiremove(pingbiauthor)">
						<view class="content noborder2">
							<text class="text-grey"><text class="cuIcon-roundclose"></text>取消屏蔽：{{pingbiauthor}}</text>
							<view class="text-gray text-sm noborder">屏蔽后，你将不会收到他的信息。</view>
						</view>
					</view>
					<view class="cu-item" :class="'bg-'+themeColor.name" v-if="pingbiauthor==$username">
						<view class="content">
							<text class="text-gray"><text class="cuIcon-attentionforbid"></text>拉黑自己</text>
						</view>
					</view>
					<view class="cu-item" :class="'bg-'+themeColor.name" v-else @tap="lahei(pingbitid)">
						<view class="content noborder2">
							<text class="text-grey"><text class="cuIcon-attentionforbid"></text>{{laheitext}}：{{pingbiauthor}}</text>
							<view class="text-gray text-sm noborder">拉黑后，他将不能回复和私聊你任何信息。</view>
						</view>
					</view>
					<view class="cu-item" :class="'bg-'+themeColor.name" v-if="jubaovalue==1" @tap="jubaota(pingbitid)">
						<view class="content">
							<text class="text-grey noborder2"><text class="cuIcon-info"></text>举报此内容</text>
							<view class="text-gray text-sm noborder">标题夸张，内容质量差等。</view>
						</view>
					</view>
					<view class="cu-item" :class="'bg-'+themeColor.name" v-if="$adminid>0&&jubaovalue==0" @tap="deletelaba(pingbitid)">
						<view class="content">
							<text class="text-grey noborder2"><text class="cuIcon-info"></text>删除此喇叭</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='jubaoxinxi'?'show':''"  @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end":class="'bg-light-'+themeColor.name">
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
				<view class="cu-bar justify-end" :class="'bg-light-'+themeColor.name">
					<view v-if="closed==0" class="action">
						<button class="cu-btn bg-green margin-left" @tap="sendjbxx">发送</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='cantpost'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end" :class="'bg-light-'+themeColor.name">
					<view class="content">举报错误</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					无法举报，错误提示：{{cantpostmessage}}
				</view>
				<view class="cu-bar justify-end" :class="'bg-light-'+themeColor.name">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='update'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-bar justify-end" :class="'bg-light-'+themeColor.name">
					<view class="content">发现新版本</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="text-left padding-bottom-xl padding-left-xl padding-right-xl">
					<text class="text-bold">最新版本：</text>{{versionnew}}<br><text class="text-bold">新版本特性：</text><br>{{versiontext}}
				</view>
				<view class="cu-bar justify-end" :class="'bg-light-'+themeColor.name">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="toupdate">立即更新</button>
					</view>
					<view class="action">
						<button class="cu-btn line-green margin-left" @tap="hideModal">暂不更新</button>
					</view>
					<view class="action">
						<button class="cu-btn bg-red margin-left" @tap="dismiss">永不提醒</button>
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
		name: "basics",
		data() {
			return {
				scrollLeft: 0,
				iStatusBarHeight: 0,
				page: 0,
				page0: 0,
				page2: 0,
				page3: 0,
				page4: 0,
				page5: 0,
				page6: 1,
				tab0enabled: 0,
				tab1enabled: 0,
				tab2enabled: 0,
				tab3enabled: 0,
				tab4enabled: 0,
				tab5enabled: 0,
				tab6enabled: 0,
				isImage: 1,
				jifencaozuo: 0,
				loadProgress: 0,
				pingbiauthor: "",
				pingbitid: 0,
				modalName: null,
				laheivar: 0,
				jubaovalue: 0,
				laheitext: '拉黑作者',
				loadwb: 0,
				radio: 'A',
				swiperList: [],
				toplist: [],
				tuijiantie: [],
				newpost: [],
				pingbilist: [],
				guanzhupost: [],
				rebangpost: [],
				zixunpost: [],
				taolunpost: [],
				meitupost: [],
				labapost: [],
				scrollht: [0, 0, 0, 0, 0, 0, 0, 0],
				tabname: ["关注", "推荐", "热榜", "资讯", "讨论", "美图", "喇叭"],
				avatarimgLoaded: false,
				TabCur: 1,
				fontsize: '',
				version: '',
				versionnew: '',
				versiontext: '',
				chechdate: 0,
				closed: 0,
				mydate: 0,
				olddate: 0,
				platform: 0,
				jubaomessage: '',
				cantpostmessage: '',
				loading: "载入中……",
				searchstyle: "none",
				jifenbiangeng: '积分名+1',
				jifenshuoming: '积分变更',
				searchHistoryList: [], //搜索出来的内容
				swiperheight: 1000, //高度
				startData: {
					clientX: 0,
					clientY: 0
				}
			};
		},
		methods: {
			hideModal(e) {
				this.modalName = null
			},
			tothebottom(push) {
				var that = this;
				this.loading = '加载中……';
				that.loadwb = 0;
				that.LoadProgresss();
				if (this.$token == '') {
					that.loading = '登录以看更多内容……';
					return;
				}
				if (that.TabCur == 1) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 1,
							page: that.page,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(that.page);
							push = res.data.post;
							console.log(push);
							if (push.length > 0) {
								for (let i = 0; i < push.length; ++i) {
									that.newpost.push(push[i]);
								}
							}
							if (res.data.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				} else if (that.TabCur == 0) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 2,
							page: that.page0,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(that.page0);
							push = res.data.post;
							console.log(push);
							if (push.length > 0) {
								for (let i = 0; i < push.length; ++i) {
									that.guanzhupost.push(push[i]);
								}
							}
							if (push.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page0++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				} else if (that.TabCur == 2) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 5,
							page: that.page2,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(that.page2);
							push = res.data.post;
							console.log(push);
							if (push.length > 0) {
								for (let i = 0; i < push.length; ++i) {
									that.rebangpost.push(push[i]);
								}
							}
							if (push.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page2++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				} else if (that.TabCur == 3) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 6,
							page: that.page3,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(that.page3);
							push = res.data.post;
							console.log(push);
							if (push.length > 0) {
								for (let i = 0; i < push.length; ++i) {
									that.zixunpost.push(push[i]);
								}
							}
							if (push.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page3++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				} else if (that.TabCur == 4) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 7,
							page: that.page4,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(that.page4);
							push = res.data.post;
							console.log(push);
							if (push.length > 0) {
								for (let i = 0; i < push.length; ++i) {
									that.taolunpost.push(push[i]);
								}
							}
							if (push.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page4++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				} else if (that.TabCur == 5) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 8,
							page: that.page5,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(that.page5);
							push = res.data.post;
							console.log(push);
							if (push.length > 0) {
								for (let i = 0; i < push.length; ++i) {
									that.meitupost.push(push[i]);
								}
							}
							if (push.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page5++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				}else if (that.TabCur == 6) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:laba', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							page: that.page6,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(that.page6);
							push = res.data;
							console.log(push);
							if (push.length > 0) {
								for (let i = 0; i < push.length; ++i) {
									that.labapost.push(push[i]);
								}
							}
							if (push.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page6++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				}
				console.log("到底了");
			},
			start(e) {
				//console.log("开始下滑坐标", e.changedTouches[0].clientY)
				this.startData.clientX = e.changedTouches[0].clientX;
				this.startData.clientY = e.changedTouches[0].clientY;
			},
			end(e) {
				//console.log("结束下滑坐标", e.changedTouches[0].clientY)
				const subX = e.changedTouches[0].clientX - this.startData.clientX;
				const subY = e.changedTouches[0].clientY - this.startData.clientY;
				if (subY < -50) {
					//console.log('下滑')
				} else if (subY > 50) {
					console.log('上滑');
					console.log(this.$scrollheight);
					if(this.$scrollheight<0){
						this.shuaxinlist();
					}
				} else if (subX > 50) {
					console.log('左滑');
					this.scrollht[this.TabCur] = this.$scrollheight;
					if(this.TabCur>0){
						this.TabCur --;
						if((this.TabCur==0&&this.page0==0)||(this.TabCur==2&&this.page2==0)||(this.TabCur==3&&this.page3==0)||(this.TabCur==4&&this.page4==0)||(this.TabCur==5&&this.page5==0)||(this.TabCur==6&&this.page6==1)){
							this.shuaxinlist();
						}
					}
					uni.pageScrollTo({
						scrollTop: this.scrollht[this.TabCur],
						duration: 0
					});
				} else if (subX < -50) {
					console.log('右滑')
					this.scrollht[this.TabCur] = this.$scrollheight;
					if(this.TabCur<6){
						this.TabCur ++;
						if((this.TabCur==0&&this.page0==0)||(this.TabCur==2&&this.page2==0)||(this.TabCur==3&&this.page3==0)||(this.TabCur==4&&this.page4==0)||(this.TabCur==5&&this.page5==0)||(this.TabCur==6&&this.page6==1)){
							this.shuaxinlist();
						}
					}
					uni.pageScrollTo({
						scrollTop: this.scrollht[this.TabCur],
						duration: 0
					});
				} else {
					console.log('无效')
				}
			},
			shuaxinlist(e){
				var that = this;
				that.loadwb = 0;
				that.LoadProgresss();
				if (this.$token == '') {
					uni.redirectTo({
						url: '../../components/ay-login/login-password'
					});
				}
				if(e == 1){
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 200
					});
				}
				if (this.TabCur == 0) {
					this.page0 = 0;
					this.loading = '加载中……';
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 2,
							page: that.page0,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data.post);
							that.guanzhupost = res.data.post;
							if (res.data.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page0++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				} else if (this.TabCur == 1) {
					this.page = 0;
					this.loading = '加载中……';
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:zhidingtie', //获取置顶帖子
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							that.tuijiantie = res.data.tuijiantie.data;
							that.toplist = res.data.toplist.data;
							that.newpost = res.data.newpost.data;
							console.log(that.tuijiantie);
							if (uni.getSystemInfoSync().platform == 'ios') {
								setTimeout(function() {
									that.setHeight("view_listnow");
								}, 100)
								setTimeout(function() {
									that.setHeight("view_listnow");
								}, 500)
							} else {
								setTimeout(function() {
									that.setHeight("view_listnow");
								}, 100)
								setTimeout(function() {
									that.setHeight("view_listnow");
								}, 500)
								setTimeout(function() {
									that.setHeight("view_listnow");
								}, 1000)
							}
							that.loadwb = 1;
							that.tab1enabled = 1;
							if (that.$nowdate != res.data.date && that.$token != '') {
								that.jifenbiandong('每日登录', '金币+1，点币+1，宠物经验+1');
								Vue.prototype.$nowdate = res.data.date;
								uni.setStorage({
									key: 'nowdata',
									data: res.data.date,
									success: function() {}
								});
							}
						}
					});
					setTimeout(function() {
						that.loadwb = 1;
					}, 500)
				}else if (this.TabCur == 2) {
					this.page2 = 0;
					this.loading = '加载中……';
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 5,
							page: that.page2,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data.post);
							that.rebangpost = res.data.post;
							if (res.data.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page2++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				} else if (this.TabCur == 3) {
					this.page3 = 0;
					this.loading = '加载中……';
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 6,
							page: that.page3,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data.post);
							that.zixunpost = res.data.post;
							if (res.data.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page3++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				} else if (this.TabCur == 4) {
					this.page4 = 0;
					this.loading = '加载中……';
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 7,
							page: that.page4,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data.post);
							that.taolunpost = res.data.post;
							if (res.data.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page4++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				} else if (this.TabCur == 5) {
					this.page5 = 0;
					this.loading = '加载中……';
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 8,
							page: that.page5,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data.post);
							that.meitupost = res.data.post;
							if (res.data.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page5++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				} else if (this.TabCur == 6) {
					this.page6 = 1;
					this.loading = '加载中……';
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:laba', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							page: that.page6,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data);
							that.labapost = res.data;
							if (res.data.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page6++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				} 
			},
			setHeight(e) {
				var query = uni.createSelectorQuery();
				query.select('.' + e).boundingClientRect(rect => {
					if (rect) {
						//console.log(e + ".height = " + rect.height)
						this.swiperheight = rect.height + uni.getSystemInfoSync().statusBarHeight +
							460; //页面可见区域 - 头部高度
						//console.log("this.height = " + this.swiperheight)
					}
				}).exec();

			},
			userinfo(e) {
				if (this.$token == '') {
					uni.redirectTo({
						url: '../../components/ay-login/login-password'
					});
				} else {
					this.$emit("returnDat", "about")
				}
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
			InputFocus(e) {
				let that = this;
				this.InputBottom = e.detail.height
				this.searchstyle = "inherit";
				console.log(this.searchHistoryList);
				//调取搜索历史记录
				uni.getStorage({
					key: 'searchList',
					success: function(res) {
						console.log(res.data);
						that.searchHistoryList = JSON.parse(res.data);
						console.log(that.searchHistoryList);
						//console.log(that.forumdata);
					}
				});
			},
			InputBlur(e) {
				this.InputBottom = 0;
				this.searchstyle = "none";
			},
			toupdate(){
				if (this.platform == 2) {
					let appurl = "market://details?id=bbs.zdfx.net"; //这个是通用应用市场，如果想指定某个应用商店，需要单独查这个应用商店的包名或scheme及参数
					plus.runtime.openURL(appurl,(err) =>{
						plus.runtime.openURL('https://bbs.zdfx.net/api/downapp.html', function(res) {
							console.log(res);
						});
					  },'com.android.vending');
				}else {
					let appleId=1592697237 //app的appleId
					plus.runtime.launchApplication({
					  action: `itms-apps://itunes.apple.com/us/app/id${appleId}?mt=8`
					}, function(e) {
					  console.log('Open system default browser failed: ' + e.message);
					});
				}
			},
			touserpage(e) {
				if (this.$token == '') {
					uni.redirectTo({
						url: '../../components/ay-login/login-password',
						animationType: 'pop-in',
						animationDuration: 200
					});
					return;
				}
				uni.navigateTo({
					url: '../component/list?uid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			searchconfirm(e) {
				this.searchstyle = "none";
				if (e.detail.value == '') {
					uni.showModal({
						title: '搜索内容不能为空'
					});
					return;
				} else {
					if (!this.searchHistoryList.includes(e.detail.value)) {
						this.searchHistoryList.unshift(e.detail.value);
						uni.setStorage({
							key: 'searchList',
							data: JSON.stringify(this.searchHistoryList)
						});
					} else {
						//有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
						let i = this.searchHistoryList.indexOf(e.detail.value);
						this.searchHistoryList.splice(i, 1);
						this.searchHistoryList.unshift(e.detail.value);
						uni.showToast({
							title: '重复搜索，搜索词提前'
						});
						uni.setStorage({
							key: 'searchList',
							data: JSON.stringify(this.searchHistoryList)
						});
					}
				}
				console.log(e)
				uni.navigateTo({
					url: '../basics/layout?s=' + encodeURIComponent(e.detail.value),
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			searchconfirm2(e) {
				this.searchstyle = "none";
				if (e == '') {
					uni.showModal({
						title: '搜索内容不能为空'
					});
					return;
				} else {
					if (!this.searchHistoryList.includes(e)) {
						this.searchHistoryList.unshift(e);
						uni.setStorage({
							key: 'searchList',
							data: JSON.stringify(this.searchHistoryList)
						});
					} else {
						//有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
						let i = this.searchHistoryList.indexOf(e);
						this.searchHistoryList.splice(i, 1);
						this.searchHistoryList.unshift(e);
						//uni.showToast({
						//	title: '不能重复添加'
						//});
						uni.setStorage({
							key: 'searchList',
							data: JSON.stringify(this.searchHistoryList)
						});
					}
				}
				console.log(e)
				uni.navigateTo({
					url: '../basics/layout?s=' + encodeURIComponent(e),
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			//清空历史记录
			empty() {
				uni.showToast({
					title: '已清空'
				});
				uni.removeStorage({
					key: 'searchList'
				});

				this.searchHistoryList = [];
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
			onSuccessImg() {
				this.avatarimgLoaded = true;
			},
			tabSelect(e) {
				let that = this;
				this.loading = '加载中……';
				this.loadwb = 0;
				this.LoadProgresss();
				if (this.$scrollheight > 0) {
					this.scrollht[this.TabCur] = this.$scrollheight;
				} else {
					this.scrollht[this.TabCur] = 0;
				}
				if (this.TabCur == e.currentTarget.dataset.id) {
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					});
				} else {
					uni.pageScrollTo({
						scrollTop: this.scrollht[e.currentTarget.dataset.id],
						duration: 0
					});
				}
				if (this.$token == '') {
					uni.redirectTo({
						url: '../../components/ay-login/login-password'
					});
				}
				if (e.currentTarget.dataset.id == 0 && that.page0 == 0) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 2,
							page: that.page0,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data.post);
							that.guanzhupost = res.data.post;
							if (res.data.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page0++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				}else if (e.currentTarget.dataset.id == 2 && that.page2 == 0) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 5,
							page: that.page2,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data.post);
							that.rebangpost = res.data.post;
							if (res.data.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page2++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				}else if (e.currentTarget.dataset.id == 3 && that.page3 == 0) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 6,
							page: that.page3,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data.post);
							that.zixunpost = res.data.post;
							if (res.data.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page3++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				}else if (e.currentTarget.dataset.id == 4 && that.page4 == 0) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 7,
							page: that.page4,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data.post);
							that.taolunpost = res.data.post;
							if (res.data.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page4++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				}else if (e.currentTarget.dataset.id == 5 && that.page5 == 0) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:thread', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							typeid: 8,
							page: that.page5,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data.post);
							that.meitupost = res.data.post;
							if (res.data.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page5++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				}else if (e.currentTarget.dataset.id == 6 && that.page6 == 1) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:laba', //获取轮播列表
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
							page: that.page6,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(res.data.post);
							that.labapost = res.data;
							if (res.data.length < 30) {
								that.loading = '竟然到底了！';
							}
							that.page6++;
							setTimeout(function() {
								that.setHeight("view_listnow");
							}, 100)
							that.loadwb = 1;
						}
					});
				}else{
					setTimeout(function() {
						that.loadwb = 1;
					}, 100)
				}
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				console.log(this.swiperheight);
			},
			tabChange(e) {
				this.scrollht[this.TabCur] = this.$scrollheight;
				console.log(this.scrollht[this.TabCur]);
				//this.setHeight();
				this.currentIndex = e.detail.current;
				this.TabCur = e.detail.current;
				uni.pageScrollTo({
					scrollTop: this.scrollht[e.detail.current],
					duration: 0
				});
				if (this.$token == '') {
					uni.redirectTo({
						url: '../../components/ay-login/login-password'
					});
				}
				var that = this;
				if (this.TabCur == 1 && this.tab1enabled == 0) {
					uni.request({
						url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:zhidingtie', //获取置顶帖子
						method: 'GET',
						timeout: 10000,
						data: {
							token: that.$token,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							that.tuijiantie = res.data.tuijiantie.data;
							that.toplist = res.data.toplist.data;
							that.newpost = res.data.newpost.data;
							console.log(that.tuijiantie);
							if (that.platform == 1) {
								setTimeout(function() {
									that.setHeight("view_listnow");
								}, 100)
								setTimeout(function() {
									that.setHeight("view_listnow");
								}, 500)
							} else {
								setTimeout(function() {
									that.setHeight("view_listnow");
								}, 100)
								setTimeout(function() {
									that.setHeight("view_listnow");
								}, 500)
								setTimeout(function() {
									that.setHeight("view_listnow");
								}, 1000)
							}
							that.tab1enabled = 1;
						}
					});
				}
			},
			tourl(e) {
				uni.navigateTo({
					url: '../component/card?tid=' + e,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			more2(e,f,g) {
				let that = this;
				this.pingbiauthor = e;
				this.pingbitid = f;
				this.modalName = 'pingbi';
				if(g==1){
					this.jubaovalue = 0;
				}else{
					this.jubaovalue = 1;
				}
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
			dismiss(){
				uni.setStorage({
					key: 'chechnew',
					data: 99,
					success: function() {
						that.olddate = 99;
						console.log(that.olddate);
						uni.showToast({
							title:'关闭成功'
						})
					}
				});
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
		created() {
			this.fontsize = this.$fontsize;
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight + 170;
			plus.navigator.setStatusBarStyle('light'); //改变系统标题颜色
			var that = this;
			plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
				that.version = wgtinfo.version;
				console.log(that.version);
			});
			uni.getStorage({
				key: 'chechnew',
				success: function(res) {
					that.olddate = res.data;
					console.log(that.olddate);
				}
			});
			uni.getStorage({
				key: 'lunbolist',
				success: function(res) {
					that.swiperList = res.data.data;
					//console.log(that.swiperList);
				}
			});
			if (uni.getSystemInfoSync().platform == 'ios') {
				this.platform = 1;
			} else {
				this.platform = 2;
			}
			if (this.$imageswitch && this.$wifi == 0) {
				this.isImage = 0;
			} else {
				this.isImage = 1;
			}
			uni.request({
				url: getApp().globalData.zddomain + 'api.php?mod=app&bid=158', //获取轮播列表
				method: 'GET',
				timeout: 10000,
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: (res) => {
					console.log(res.data)
					uni.setStorage({
						key: 'lunbolist',
						data: res.data.data,
						success: function() {
							that.swiperList = res.data.data;
							//console.log(that.swiperList);
						}
					});
					if (that.platform == 1) {
						that.versionnew = res.data.ios;
					}else{
						that.versionnew = res.data.android;
					}
						var myDate=new Date();
						that.mydate = myDate.getDate();
						let mya = that.version.split('.');
						let sev = that.versionnew.split('.');
						if(((Number(mya[0])<Number(sev[0]))||(Number(mya[0])==Number(sev[0]))&&(Number(mya[1])<Number(sev[1]))||(Number(mya[0])==Number(sev[0]))&&(Number(mya[1])==Number(sev[1]))&&(Number(mya[2])<Number(sev[2])))&&that.olddate!=that.mydate&&that.olddate<99){
							console.log(res.data)
							that.versiontext = res.data.updatemessage;
							that.modalName = 'update';
							uni.setStorage({
								key: 'chechnew',
								data: that.mydate,
								success: function() {
									that.olddate = that.mydate;
									console.log(that.olddate);
								}
							});
						}
				}
			});
			uni.request({
				url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:zhidingtie', //获取置顶帖子
				method: 'GET',
				timeout: 10000,
				data: {
					token: that.$token,
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: (res) => {
					//console.log(res.data);
					that.tuijiantie = res.data.tuijiantie.data;
					that.toplist = res.data.toplist.data;
					that.newpost = res.data.newpost.data;
					//console.log(that.tuijiantie);
					//console.log(that.newpost);
					if (uni.getSystemInfoSync().platform == 'ios') {
						setTimeout(function() {
							that.setHeight("view_listnow");
						}, 100)
						setTimeout(function() {
							that.setHeight("view_listnow");
						}, 500)
					} else {
						setTimeout(function() {
							that.setHeight("view_listnow");
						}, 100)
						setTimeout(function() {
							that.setHeight("view_listnow");
						}, 500)
						setTimeout(function() {
							that.setHeight("view_listnow");
						}, 1000)
					}
					that.tab1enabled = 1;
					if (that.$nowdate != res.data.date && that.$token != '') {
						that.jifenbiandong('每日登录', '宠物经验+1');
						Vue.prototype.$nowdate = res.data.date;
						uni.setStorage({
							key: 'nowdata',
							data: res.data.date,
							success: function() {}
						});
					}
				}
			});
			//调取搜索历史记录
			uni.getStorage({
				key: 'searchList',
				success: function(res) {
					console.log(res.data);
					that.searchHistoryList = JSON.parse(res.data);
					console.log(that.searchHistoryList);
					//console.log(that.forumdata);
				}
			});
			//载入屏蔽名单
			uni.getStorage({
				key: 'pingbilist',
				success: function(res) {
					console.log(res.data);
					that.pingbilist = res.data;
				}
			});
		},
		mounted() {
			//this.setHeight();
		},
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
	.text-min {
		min-height: 160upx;
	}
	.article {
		margin: 10upx;
	}

	.page {
		height: 100vh;
	}

	.nav-sm {
		white-space: nowrap;
	}

	.nav-sm .cu-item.cur {
		border-bottom: 3upx solid;
	}

	.nav-sm .cu-item {
		height: 40upx;
		display: inline-block;
		line-height: 40upx;
		margin: 0 8upx;
		padding: 0 16upx;
	}

	.searchHistory {
		width: 100%;
		margin-top: 8upx;
	}

	.searchHistoryItem {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.searchHistoryItem view {
		/* width: 50px; */
		height: 30upx;
		border: 1upx solid #eee;
		margin: 0upx 8upx;
	}

	.gzlist {
		position: absolute;
		margin: -33upx 0 0 -75upx;
	}

	.gzlist2 {
		position: absolute;
		background-color: transparent;
		margin: -45upx 0 0 -85upx;
		width: 86upx;
		height: 86upx;
	}

	.gzlist3 {
		position: absolute;
		right: 10upx;
		margin: 34upx 0 0 -105upx;
		width: 95upx;
		height: 72upx;
	}
	.chacha{
		position: absolute;
		margin: -30upx 0 0 0;
		right: 20upx;
	}
	.noborder{
		padding-top: 0px!important;
		margin-top: 0px!important;
	}
	#waterfull {
	     margin: 0 auto;
	     width: 100%;
	}
	/* 每一列图片包含层 */
	.item {
	     margin-bottom: 15upx;
	     /* 防止多列布局，分页媒体和多区域上下文中的意外中断 */
	     break-inside: avoid;
	     background: #fff;
		 width: 49%;
		 float: left;
		 margin-right: 8upx;
	}
	.item:hover {
	     box-shadow: 3upx 3upx 3upx rgba(0, 0, 0, .5);
	}
	/* 图片 */
	.itemImg {
	     width: 100%;
	     vertical-align: middle;
	}
	/* 图片下的信息包含层 */
	.userInfo {
	     padding: 8upx 12upx;
	}
	.avatar {
	     vertical-align: middle;
	     width: 40upx;
	     height: 40upx;
	     border-radius: 50%;
	}
	.username {
	     margin-left: 8upx;
	     text-shadow: 3upx 3upx 3upx rgba(0, 0, 0, .3);
	}
	.padding0{
		padding:0 4upx 0 4upx;
		margin:0 4upx 0 4upx;
		height: 32upx;
		font-size: 0.8rem;
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
	.text-black.bt-black{
		color: #fff!important;
	}
	.text-content.bt-black{
		color: #c8c8c8!important;
	}
	.search-form.bt-gray{
		background-color: #fff!important;
	}
	.search-form.bt-grey{
		background-color: #fff!important;
	}
	.bg-cyan.bt-black{
		background-color: #393939!important;
	}
</style>
