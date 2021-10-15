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

const { report } = require('./common');

const modules = {
  COS: require('./cos'),
  SMS: require('./sms'),
  OCR: require('./ocr'),
  VOD: require('./vod'),
  CAPTCHA: require('./captcha'),
  TIIA: require('./tiia'),
  TMS: require('./tms'),
  IMS: require('./ims'),
  ASR: require('./asr'),
  SOE: require('./soe'),
  HTTPDNS: require('./httpdns'),
  TTS: require('./tts'),
  TMT: require('./tmt'),
  IAI: require('./iai'),
  FACEID: require('./faceid')
};

/**
 * 腾讯云uni-app插件依赖的云函数入口
 * @param {object} event - 通过uniCloud.callFunction调用云函数时传入的data对象
 * @param {string} event.module - 云函数模块（目前仅支付传入"COS"），必传参数
 * @param {string} event.action - 云函数模块下的方法名，必传参数
 * @return {Promise<any>}
 */
exports.main = async (event) => {
  const { module, action, ...params } = event;
  if (!modules[module] || !modules[module][action]) {
    throw new Error(`${module}.${action}不存在`);
  }
  // 数据统计
  const getExtraInfoMethod = modules[module].getExtraReportInfo;
  const extraInfo = getExtraInfoMethod ? getExtraInfoMethod() : {};
  report(module, extraInfo);
  // 调用相应的模块
  const result = await modules[module][action](params);
  return result;
};
