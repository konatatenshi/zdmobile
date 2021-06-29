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

const crypto = require('crypto');
const { secretId, secretKey, isReport } = require('./config');

/**
 * 获取腾讯云API签名方法V3
 * @param {string} servicename - 服务名称，例如：ocr、sms等
 * @param {string} payload - 接口请求正文
 * @return {string[]} 返回API请求接口headers所需要的认证信息
 */
function sign(servicename, payload) {
  // 配置校验
  if (!secretId || !secretKey) {
    throw new Error('请检查云函数密钥配置文件!');
  }
  if (!servicename) {
    throw new Error('请填写服务名称');
  }
  const payloadHash = crypto.createHash('sha256').update(payload).digest('hex');
  const requestString = `POST\n/\n\ncontent-type:application/json\nhost:${servicename}.tencentcloudapi.com\n\ncontent-type;host\n${payloadHash}`;
  const currentDate = new Date();
  const timestamp = `${Math.floor(currentDate.getTime() / 1000)}`;
  const dateString = currentDate.toISOString().substr(0, 10);
  const requestStringHash = crypto.createHash('sha256').update(requestString).digest('hex');
  const stringToSign = `TC3-HMAC-SHA256\n${timestamp}\n${dateString}/${servicename}/tc3_request\n${requestStringHash}`;
  const secretDate = crypto.createHmac('sha256', `TC3${secretKey}`).update(dateString).digest();
  const secretService = crypto.createHmac('sha256', secretDate).update(servicename).digest();
  const secretSigning = crypto.createHmac('sha256', secretService).update('tc3_request').digest();
  const signature = crypto.createHmac('sha256', secretSigning).update(stringToSign).digest('hex');
  return [
    timestamp,
    `TC3-HMAC-SHA256 Credential=${secretId}/${dateString}/${servicename}/tc3_request, SignedHeaders=content-type;host, Signature=${signature}`
  ];
}

/**
 * 插件使用统计，异步处理，忽略结果，不阻塞主流程
 * @param {string} module - 模块名称
 * @param {object} extraInfo - 附加信息
 */
function report(module, extraInfo) {
  if (!isReport) {
    return;
  }
  if (!secretId || !secretKey) {
    return;
  }
  uniCloud.callFunction({
    name: 'tencentcloud-base-plugin',
    data: {
      secretId,
      secretKey,
      module,
      extraInfo
    }
  });
}

module.exports = { sign, report };
