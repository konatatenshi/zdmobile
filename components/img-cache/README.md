## ✨ Feature

- UNIAPP APP 平台（vue）上图片缓存组件
- 可兼容其他平台写法

## 🥗 Install

- 在 uni-app 插件市场右上角选择`使用HBuilderX 导入插件`或者`下载插件ZIP`
- 将下载解压后的`img-cache`文件夹，复制到`components`目录内

## 🥐 Usage

由于 uni-app 的[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)，可以不用引用、注册，直接在页面中使用

```HTML
<img-cache src="https://example.com/image.png"></img-cache>
```

## 🥪 API

### Props

`image`的[属性](https://uniapp.dcloud.io/component/image)在`img-cache`组件上是一样可以用的，这里在原有的基础上加了几个属性

| 属性名       | 类型             | 默认值   | 说明                                             |
| :----------- | :--------------- | :------- | :----------------------------------------------- |
| dir          | string           | imgcache | 缓存的文件目录，文件夹开头不能有\_               |
| width        | string \| number | -        | 宽度，单位任意，如果为数值，则为 rpx 单位        |
| height       | string \| number | -        | 高度，单位任意，如果为数值，则为 rpx 单位        |
| custom-style | object           | -        | 自定义样式，自定义样式宽高权重大于属性设定的宽高 |

### Events

| 属性名 | 类型        | 说明                                                                    |
| :----- | :---------- | :---------------------------------------------------------------------- |
| click  | HandleEvent | 点击事件，请勿使用 @tap 点击事件，微信小程序无效，返回值为点击事件及参数 |

### Method

```Javascript
// 引入
import { resolveFile, getDirSize, removeDir, formatSize, storage } from '@/components/img-cache';
```

① 处理缓存文件（路径格式查看[RelativeURL](http://www.html5plus.org/doc/zh_cn/io.html#plus.io.RelativeURL)）

**resolveFile(url)**

- 获取[目录对象](http://www.html5plus.org/doc/zh_cn/io.html#plus.io.DirectoryEntry)或[文件对象](http://www.html5plus.org/doc/zh_cn/io.html#plus.io.FileEntry)
- 参数：`url` `<string>` 要操作文件或目录的 URL 地址
- 返回：`Promise<object>` 目录或文件对象，若不存在返回 null

**getDirSize(dir)**

- 获取目录大小
- 参数：`dir` `<string>` 目录地址
- 返回：`Promise<number>` 目录大小，单位字节

**removeDir(dir)**

- 删除目录
- 参数：`dir` `<string>` 目录地址
- 返回：`Promise<boolean>` 删除状态

**formatSize(size)**

- 格式化字节大小
- 参数：`size` `<number>` 字节大小
- 返回：`string` 转换后的文字

② 处理缓存数据

**storage.clear()**

- 清空缓存数据
