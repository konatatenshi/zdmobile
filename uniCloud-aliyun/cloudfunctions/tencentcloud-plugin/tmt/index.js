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
const { request } = require('./utils.js');

/**
 * 获取机器翻译结果
 * @param {object} params - 参数包装对象
 * @param {string} params.name - 机器翻译 API的Action值 https://cloud.tencent.com/document/product/551/15612
 * @param {object} params.payload - API需要的参数
 * @return {Promise<object>} API返回数据
 */
async function getTmtResult(params) {
  if (!params.name) {
    throw new Error('缺少API Action参数');
  }
  try {
    const result = await request(params.name, params.payload);
    return result;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  getTmtResult
};
