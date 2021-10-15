/*
 * Copyright (C) 2020 Tencent Cloud.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const { request } = require('./utils');

/**
 * 获取OCR识别结果
 * @param {object} params - 参数包装对象
 * @param {string} params.name - 对应OCR API的Action值 https://cloud.tencent.com/document/api/866/34938
 * @param {object} params.payload - API需要的参数
 * @param {string} [params.payload.ImageBase64] - 图片的 Base64 值。支持的图片格式：PNG、JPG、JPEG，暂不支持 GIF 格式。支持的图片大小：所下载图片经 Base64 编码后不超过 3M。图片下载时间不超过 3 秒。
 * @param {string} [params.payload.ImageUrl] - 图片的 Url 地址。支持的图片格式：PNG、JPG、JPEG，暂不支持 GIF 格式。支持的图片大小：所下载图片经 Base64 编码后不超过 3M。图片下载时间不超过 3 秒。
 * @returns {object} API返回的有效数据
 */
async function getOcrResult(params) {
  if (!params.name) {
    throw new Error('缺少API Action参数');
  }
  if (!(params.payload.ImageBase64 || params.payload.ImageUrl)) {
    throw new Error('ImageUrl 和 ImageBase64 必须有一个不为空');
  }
  // 调用OCR识别接口
  try {
    const result = await request(params.name, params.payload);
    return result;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = getOcrResult;
