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

const sendSMS = require('./send-sms');
const { verificationCodeCollection, verificationCodeTemplateId, verificationCodeLength } = require('./config');

/**
 * 发送短信验证码
 * @async
 * @param {object} params - 参数包装对象
 * @param {string} params.phoneNumber - 手机号码
 * @return {Promise<void>} 验证码发送状态（无异常代表发送成功）
 */
async function sendVerificationCode({ phoneNumber }) {
  // 配置校验
  if (!verificationCodeCollection) {
    throw new Error('请在云函数SMS模块中配置verificationCodeCollection');
  }
  if (!verificationCodeTemplateId) {
    throw new Error('请在云函数SMS模块中配置verificationCodeTemplateId');
  }
  if (isNaN(verificationCodeLength) || verificationCodeLength < 4 || verificationCodeLength > 8) {
    throw new Error('请在云函数SMS模块中配置有效的verificationCodeLength');
  }
  // 参数校验
  if (!phoneNumber) {
    throw new Error('手机号码不能为空');
  }
  // 自动为无前缀手机号码添加+86前缀
  if (!phoneNumber.startsWith('+')) {
    phoneNumber = `+86${phoneNumber}`;
  }
  // 生成随机验证码并存入云数据库
  const verificationCode = `${Math.random()}`.substr(2, verificationCodeLength);
  const db = uniCloud.database();
  const verificationCodes = db.collection(verificationCodeCollection);
  await verificationCodes.add({
    phoneNumber,
    verificationCode,
    createTime: new Date().getTime(),
    checkCounter: 0
  });
  // 发送短信
  const { SendStatusSet } = await sendSMS({
    phoneNumbers: [phoneNumber],
    templateId: verificationCodeTemplateId,
    templateParams: [verificationCode]
  });
  if (SendStatusSet[0].Code !== 'Ok') {
    throw new Error(SendStatusSet[0].Message);
  }
}

module.exports = sendVerificationCode;
