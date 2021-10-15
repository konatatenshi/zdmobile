# linke-ux-editor 移动端编辑器
## 一、 关于linke-ux-editor
找了一圈uniapp生态，没一个合适的编辑器，无奈，只能就顺手写了一个完成业务需要。

如果你有刚好也需要，那就拿去吧你~ 

**在线体验【小程序版】**

![ux-editor-example](https://tva1.sinaimg.cn/large/008i3skNgy1gul2f6ul2jj60by0by3zd02.jpg)


## 二、使用
1. 导入插件

   点击右侧导入`hbuilderx`即可

2. 添加页面配置到 `pages.json`
```json
{
	{
		"path": "uni_modules/linke-ux-editor/pages/editPic",
		"style": {
			"navigationBarTitleText": "图片编辑",
			"enablePullDownRefresh": false
		}
	}, {
		"path": "uni_modules/linke-ux-editor/pages/editTitle",
		"style": {
			"navigationBarTitleText": "标题编辑",
			"enablePullDownRefresh": false
		}
	}, {
		"path": "uni_modules/linke-ux-editor/pages/editTxt",
		"style": {
			"navigationBarTitleText": "文本编辑",
			"enablePullDownRefresh": false
		}
	}, {
		"path": "uni_modules/linke-ux-editor/pages/editVideo",
		"style": {
			"navigationBarTitleText": "视频编辑",
			"enablePullDownRefresh": false
		}
	}
}
```

3. 导入处理函数到引入编辑器的页面
```javascript
import uxEditor from '../../uni_modules/linke-ux-editor/components/js/editor.js';
export default {
	data() {
		return {
			content: []
		}
	},
	// 这里是o，不是0，神奇的uniapp，无法显示这个钩子函数名称
	0nShow() {
		uxEditor.tempDataHandler(this.content);
	}
}
```

4. 使用
```html
<linke-ux-editor v-model="content"></linke-ux-editor>
```

5. 内容渲染
```html
<linke-ux-parser :list="content"></linke-ux-parser>
```

## 三、API
### linke-ux-editor 组件
- Props

| 参数  | 类型    | 必填 | 说明                                                         |
| ----- | ------- | ---- | ------------------------------------------------------------ |
| value | Array   | 是   | 内容数据                                                     |
| cloud | Boolean | 否   | 文件上传是否使用云函数，设为`true`需启用`uniCloud`           |
| url   | String  | 否   | 服务端上传完整`url`。<br />如果`cloud`为`false`，则必填。<br />接口返回结果示例为`{data:'http://x.com/s/a.jpg'}` |

### linke-ux-parser 组件

> `linke-ux-parser` 组件用于解析`linke-ux-editor`编辑的内容

- Props

| 参数   | 类型          | 必填 | 说明                             |
| ------ | ------------- | ---- | -------------------------------- |
| list   | Array         | 是   | 同`linke-ux-editor`组件的`value` |
| domain | Array<String> | 否   | 安全域名，用于小程序跳转网页     |


## 四、计划 & 待办
- 视频支持