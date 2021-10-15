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
const { appId, appSign } = require('./config');

/**
 * 发送短信
 * @param {object} params - 参数包装对象
 * @param {string[]} params.phoneNumbers - 手机号列表
 * @param {string} params.templateId - 短信模板ID
 * @param {string[]} params.templateParams - 短信模板参数列表
 * @return {Promise<object>} 短信发送状态信息，详见文档 https://cloud.tencent.com/document/api/382/38778
 */
async function sendSMS({ phoneNumbers, templateId, templateParams }) {
  // 配置校验
  if (!appId || !appSign) {
    throw new Error('请在云函数SMS模块中配置appId和appSign');
  }
  // 调用腾讯云发送SMS接口
  const result = await request('SendSms', {
    SmsSdkAppid: appId,
    Sign: appSign,
    PhoneNumberSet: phoneNumbers,
    TemplateID: templateId,
    TemplateParamSet: templateParams
  });
  return result;
}

module.exports = sendSMS;
