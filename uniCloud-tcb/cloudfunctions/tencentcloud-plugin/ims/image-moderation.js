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
 * 图片内容检测
 * 更多信息请访问 https://cloud.tencent.com/document/product/669/34503
 * @param {object} params - 参数包装对象
 * @param {string} params.content - 图片文件内容Base64或url地址
 * @return {Promise<object>} 识别结果
 */
async function imageModeration({ content }) {
  if (!content) {
    throw new Error('图片内容不能为空');
  }
  const isUrl = /^https?:\/\//.test(content);
  // 调用腾讯云查询接口
  const { Data } = await request('ImageModeration', {
    FileContent: isUrl ? undefined : content,
    FileUrl: isUrl ? content : undefined
  });
  return Data;
}

module.exports = imageModeration;
