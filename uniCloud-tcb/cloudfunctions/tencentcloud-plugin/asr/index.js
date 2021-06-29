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
const RealTime = require('./asrRealtimeSdk');
/**
 * 获取语音识别相关接口
 * @param {object} params - 参数包装对象
 * @param {string} params.name - 对应图像识别 API的Action值 https://cloud.tencent.com/document/product/1093/35637
 * @param {object} params.payload - API需要的参数
 * @return {Promise<object>} API返回的有效数据
 */
async function getAsrResult(params) {
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

/**
 * 实时语音识别
 * @param {object} params
 * @param {object} params.data // 音频文件
 * @param {object} params.params // 参数
 * @return {Promise<object>} 语音识别结果
 */
async function realTimeVoice({ data: voiceData, params }) {
  try {
    // 创建调用实例
    const asrReq = new RealTime(params);
    const chunk = Buffer.from(voiceData, 'base64');
    const result = await asrReq.sendRequest(chunk);
    return result;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  getAsrResult,
  realTimeVoice
};
