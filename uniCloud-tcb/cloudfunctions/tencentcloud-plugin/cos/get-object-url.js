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
const { secretId, secretKey } = require('../config');
const { bucket, region, expires } = require('./config');

/**
 * 获取腾讯云COS文件的临时访问地址
 * @param {object} params - 参数包装对象
 * @param {string} params.key - 将要访问COS文件的名称
 * @return {string} COS文件的访问地址（包含临时签名）
 */
function getObjectURL({ key }) {
  // 配置校验
  if (!secretId || !secretKey) {
    throw new Error('请云函数配置文件中配置secretId和secretKey');
  }
  if (!bucket || !region) {
    throw new Error('请在云函数COS模块中配置bucket和region');
  }
  if (isNaN(expires) || expires <= 0) {
    throw new Error('请在云函数COS模块中配置有效的expires');
  }
  // 生成签名信息
  const currentDate = new Date();
  const expirationDate = new Date(currentDate.getTime() + expires * 1000);
  const keyTime = `${Math.floor(currentDate.getTime() / 1000)};${Math.floor(expirationDate.getTime() / 1000)}`;
  const signKey = crypto.createHmac('sha1', secretKey).update(keyTime).digest('hex');
  const httpString = `get\n/${key}\n\n\n`;
  const httpStringHash = crypto.createHash('sha1').update(httpString).digest('hex');
  const stringToSign = `sha1\n${keyTime}\n${httpStringHash}\n`;
  const signature = crypto.createHmac('sha1', signKey).update(stringToSign).digest('hex');
  return (
    /* prettier-ignore */
    `https://${bucket}.cos.${region}.myqcloud.com/${key}`
    + `?q-sign-algorithm=sha1`
    + `&q-ak=${secretId}`
    + `&q-sign-time=${keyTime}`
    + `&q-key-time=${keyTime}`
    + `&q-header-list=`
    + `&q-url-param-list=`
    + `&q-signature=${signature}`
  );
}

module.exports = getObjectURL;
