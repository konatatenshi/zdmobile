<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">{{$t('api.back')}}</block>
			<block slot="content">个人资料更改</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="输入你的姓名" name="zm" v-model="zhenming"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<input placeholder="未选" v-model="xingbie" name="guojia"></input>
				<switch class='switch-sex' @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
			</view>
			<view class="cu-form-group">
				<view class="title">国家</view>
				<input placeholder="选择国家/地区" v-model="guojia" name="guojia"></input>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						选择
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">地区</view>
				<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
					<view class="picker">
						{{multiArray[0][multiIndex[0]]}}-{{multiArray[1][multiIndex[1]]}}-{{multiArray[2][multiIndex[2]]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">生日</view>
				<picker mode="date" :value="date" start="1900-01-01" end="2030-09-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">地址</view>
				<input placeholder="输入你的地址" name="dizhi" v-model="dizhi"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">证件类型</view>
				<input placeholder="输入你的证件类型" name="zhengjianleixing" v-model="zjlx"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">证件号</view>
				<input placeholder="输入你的证件号" type="number" name="zhengjianhao" v-model="zjh"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">毕业学校</view>
				<input placeholder="输入你的毕业学校" type="text" name="xuexiao" v-model="byxx"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">工作单位</view>
				<input placeholder="输入你的工作单位" type="text" name="danwei" v-model="gzdw"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">学历</view>
				<input placeholder="选择你的学历" v-model="xueli" name="xueli"></input>
				<picker @change="xlChange" :value="index2" :range="pickerxl">
					<view class="picker">
						选择
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">血型</view>
				<input placeholder="选择你的血型" v-model="xuexx" name="xuexing"></input>
				<picker @change="xxChange" :value="index3" :range="pickerxx">
					<view class="picker">
						选择
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">QQ</view>
				<input placeholder="输入你的QQ号" type="number" name="qq" v-model="qq"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">网址</view>
				<input placeholder="输入你的个人网址" type="text" name="wangzhi" v-model="wz"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">描述</view>
				<input placeholder="输入你的个人描述" type="text" name="miaoshu" v-model="ms"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">兴趣</view>
				<input placeholder="输入你的个人兴趣" type="text" name="xingqu" v-model="xq"></input>
			</view>
			<!-- !!!!! placeholder 在ios表现有偏移 建议使用 第一种样式 -->
			<view class="cu-form-group margin-top">
				<textarea v-model="qianming" maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="输入你的论坛签名，[img]图片URL[/img]可以插入图片。(限制:255字节内)"></textarea>
			</view>
			<view class="text-center align-center">
				<text class="padding text-df text-gray">👆输入你的论坛签名👆<br>[img]图片URL[/img]可以插入图片</text>
			</view>
			<view class="padding">
				<button class="cu-btn block bg-blue margin-tb-sm lg" :disabled="disabled?true:false" type="" @tap="submit"><text v-show="disabled" class="cuIcon-loading2 cuIconfont-spin"></text>{{$t('api.submit')}}</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: -1,
				disabled: false,
				index2: -1,
				index3: -1,
				zhenming: '',
				xingbie: '',
				guojia: '',
				xueli: '',
				xuexx: '',
				dizhi: '',
				zjlx: '',
				zjh: '',
				byxx: '',
				gzdw: '',
				qq: '',
				wz: '',
				ms: '',
				xq: '',
				qianming: '',
				picker: [],
				pickerxl: ['博士','硕士','本科','大专','高中','小学'],
				pickerxx: ['A','B','AB','O','其他'],
				multiArray: [
					[''],
					[''],
					['']
				],
				multiIndex: [0, 0, 0],
				country: [],
				quyuu1: ['其他'],
				quyuu2: ['其他'],
				quyuu3: ['其他'],
				time: '12:01',
				date: '年-月-日',
				regionA: '',
				regionB: '',
				regionC: '',
				switchA: false,
				switchB: true,
				switchC: false,
				switchD: false,
				radio: 'A',
				checkbox: [{
					value: 'A',
					checked: true
				}, {
					value: 'B',
					checked: true
				}, {
					value: 'C',
					checked: false
				}],
				imgList: [],
				modalName: null,
				textareaAValue: '',
				textareaBValue: ''
			};
		},
		mounted() {
			this.getArea();
			this.getcounts();
		},
		methods: {
			async getcounts() {
				let that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:profile', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						type: 1
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if(res.data.code==200){
							that.zhenming = res.data.xingming;
							that.switchC = res.data.switchC;
							that.xingbie = res.data.xingbie;
							that.guojia = res.data.guojia;
							if(res.data.quyu!=false){
								let data = {
									multiArray: this.multiArray,
								};
								that.multiIndex = res.data.quyu;
								let countrydata = require('../../json/pca.json');
								if(that.multiIndex[0]!=0){
									that.regionA = that.quyuu1[that.multiIndex[0]];
									that.quyuu2 = [];
									for (var key in countrydata[that.regionA]){
										that.quyuu2.push(key);
										//console.log(key);
									}
									data.multiArray[1] = that.quyuu2;
									that.regionB = that.quyuu2[that.multiIndex[1]];
									that.quyuu3 = [];
									for (var key in countrydata[that.regionA][that.regionB]){
										that.quyuu3.push(countrydata[that.regionA][that.regionB][key]);
										//console.log(countrydata[that.regionA][that.regionB][key]);
									}
									data.multiArray[2] = that.quyuu3;
								}
								this.multiArray = data.multiArray;
							}
							if(res.data.date!='0-0-0'){
								that.date = res.data.date;
							}
							that.dizhi = res.data.dizhi;
							that.zjlx = res.data.zjlx;
							that.zjh = res.data.zjh;
							that.byxx = res.data.byxx;
							that.gzdw = res.data.gzdw;
							that.xuexx = res.data.xuexx;
							that.xueli = res.data.xueli;
							that.qq = res.data.qq;
							that.wz = res.data.wz;
							that.ms = res.data.ms;
							that.xq = res.data.xq;
							that.qianming = res.data.qianming;
						}
					}
				});
			},
			submit() {
				this.disabled = true;
				let that = this;
				uni.request({
					url: getApp().globalData.zddomain + 'plugin.php?id=ts2t_qqavatar:profile', //获取置顶帖子
					method: 'GET',
					timeout: 10000,
					data: {
						token: that.$token,
						type: 2,
						quyu1: that.multiArray[0][that.multiIndex[0]],
						quyu2: that.multiArray[1][that.multiIndex[1]],
						quyu3: that.multiArray[2][that.multiIndex[2]],
						xingbie: that.xingbie,
						realname: that.zhenming,
						guojia: that.guojia,
						quyu: that.multiIndex,
						birthday: that.date,
						address: that.dizhi,
						idcardtype: that.zjlx,
						idcard: that.zjh,
						graduateschool: that.byxx,
						company: that.gzdw,
						bloodtype: that.xuexx,
						education: that.xueli,
						qq: that.qq,
						site: that.wz,
						bio: that.ms,
						interest: that.xq,
						sign: that.qianming
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						if(res.data.code==200){
							uni.showToast({
								title:'提交成功！'
							})
							that.disabled = false;
						}
					}
				});
			},
			PickerChange(e) {
				console.log(e.detail)
				console.log(this.picker[e.detail.value])
				this.guojia = this.picker[e.detail.value]
			},
			xlChange(e) {
				console.log(e)
				console.log(this.pickerxl[e.detail.value])
				this.xueli = this.pickerxl[e.detail.value]
			},
			xxChange(e) {
				console.log(e)
				console.log(this.pickerxx[e.detail.value])
				this.xuexx = this.pickerxx[e.detail.value]
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			getArea(e) {
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				let that = this;
				let countrydata = require('../../json/pca.json')
				for (var key in countrydata){
					that.quyuu1.push(key);
					//console.log(key);
				}
				data.multiArray[0] = that.quyuu1;
				let countrydatacode = require('../../json/countrycode.json')
				for (var key in countrydatacode){
					that.country.push(countrydatacode[key]['cn']);
					//console.log(countrydatacode[key]['cn']);
				}
				that.picker = that.country;
				that.quyuu2 = ['其他'];
				that.quyuu3 = ['其他'];
				data.multiArray[1] = that.quyuu2;
				data.multiArray[2] = that.quyuu3;
				//console.log(this.quyuu1);
				//console.log(this.quyuu2);
				//console.log(this.quyuu3);
				this.multiArray = data.multiArray;
				this.multiIndex = data.multiIndex;

				//console.log(this.countryList);
			},
			MultiColumnChange(e) {
				let that = this;
				//console.log(e.detail.column);
				//console.log(e.detail.value);
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				let countrydata = require('../../json/pca.json')
				if(e.detail.column==0){
					that.regionA = that.quyuu1[e.detail.value];
					if(e.detail.column==0&&e.detail.value==0){
						that.quyuu2 = ['其他'];
						that.quyuu3 = ['其他'];
						data.multiArray[1] = that.quyuu2;
						data.multiArray[2] = that.quyuu3;
						that.multiArray = data.multiArray;
						that.multiIndex = data.multiIndex;
						return;
					}else{
						that.quyuu2 = [];
					}
					for (var key in countrydata[that.regionA]){
						that.quyuu2.push(key);
						//console.log(key);
					}
					data.multiArray[1] = that.quyuu2;
					that.regionB = that.quyuu2[0];
					that.quyuu3 = [];
					for (var key in countrydata[that.regionA][that.regionB]){
						that.quyuu3.push(countrydata[that.regionA][that.regionB][key]);
						//console.log(countrydata[that.regionA][that.regionB][key]);
					}
					data.multiArray[2] = that.quyuu3;
				}else if(e.detail.column==1){
					that.regionB = that.quyuu2[e.detail.value];
					that.quyuu3 = [];
					for (var key in countrydata[that.regionA][that.regionB]){
						that.quyuu3.push(countrydata[that.regionA][that.regionB][key]);
						//console.log(countrydata[that.regionA][that.regionB][key]);
					}
					data.multiArray[2] = that.quyuu3;
				}else if(e.detail.column==2){
					that.regionC = that.quyuu3[e.detail.value];
				}
				data.multiIndex[e.detail.column] = e.detail.value;
				//console.log(data.multiIndex);
				this.multiArray = data.multiArray;
				this.multiIndex = data.multiIndex;
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			RegionChange(e) {
				this.region = e.detail.value
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			SwitchB(e) {
				this.switchB = e.detail.value
			},
			SwitchC(e) {
				this.switchC = e.detail.value
				if(this.switchC){
					this.xingbie = '男';
				}else{
					this.xingbie = '女';
				}
			},
			SwitchD(e) {
				this.switchD = e.detail.value
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			dashangChange(e) {
				this.guojia = e.detail.value
			},
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
