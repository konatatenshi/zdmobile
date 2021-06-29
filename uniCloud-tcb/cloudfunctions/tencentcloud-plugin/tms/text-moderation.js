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
 * 文本内容检测
 * 更多信息请访问 https://cloud.tencent.com/document/product/669/34502
 * @param {object} params - 参数包装对象
 * @param {string} params.content - 需要识别的文本内容
 * @return {Promise<object>} 识别结果
 */
async function textModeration({ content }) {
  if (!content) {
    throw new Error('文本内容不能为空');
  }
  // 调用腾讯云查询接口
  const { Data } = await request('TextModeration', {
    Content: Buffer.from(content).toString('base64')
  });
  return Data;
}

module.exports = textModeration;
