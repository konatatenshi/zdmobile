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
 * 获取基础语音合成结果
 * 更多信息请访问 https://cloud.tencent.com/document/product/1073/37995
 * @param {object} params - 参数包装对象
 * @param {object} param - 语音合成接口相关参数
 * @return {Promise<object>} 评测信息
 */
async function getTtsResult({ param }) {
  // 调用腾讯云基础语音合成接口
  const result = await request('TextToVoice', param);

  return result;
}

module.exports = {
  getTtsResult
};
