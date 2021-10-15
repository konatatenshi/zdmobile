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
const querystring = require('querystring');
const { secretId, secretKey } = require('../config');
const { uploadExpires } = require('./config');

/**
 * 获取腾讯云云点播文件上传签名
 * 更多信息请访问 https://cloud.tencent.com/document/product/266/9221
 * @return {string} 云点播文件上传签名
 */
function getUploadSignature() {
  // 配置校验
  if (!secretId || !secretKey) {
    throw new Error('请云函数配置文件中配置secretId和secretKey');
  }
  if (isNaN(uploadExpires) || uploadExpires <= 0) {
    throw new Error('请在云函数VOD模块中配置有效的uploadExpires');
  }
  // 生成签名信息
  const current = Math.floor(new Date().getTime() / 1000);
  const args = {
    secretId,
    currentTimeStamp: current,
    expireTime: current + uploadExpires,
    random: Math.round(Math.random() * Math.pow(2, 32))
  };
  const orignal = querystring.stringify(args);
  const orignalBuffer = new Buffer(orignal, 'utf8');
  const hmacBuffer = crypto.createHmac('sha1', secretKey).update(orignalBuffer).digest();
  const signature = Buffer.concat([hmacBuffer, orignalBuffer]).toString('base64');
  return signature;
}

module.exports = getUploadSignature;
