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
 * 为腾讯云COS的POST Object API进行签名
 * 更多信息请访问 https://cloud.tencent.com/document/product/436/14690
 * @return {object} 上传URL以及其它签名信息
 */
function signPostObjectAPI() {
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
  const policy = JSON.stringify({
    expiration: expirationDate.toISOString(),
    conditions: [{ 'q-sign-algorithm': 'sha1' }, { 'q-ak': secretId }, { 'q-sign-time': keyTime }]
  });
  const signKey = crypto.createHmac('sha1', secretKey).update(keyTime).digest('hex');
  const stringToSign = crypto.createHash('sha1').update(policy).digest('hex');
  const signature = crypto.createHmac('sha1', signKey).update(stringToSign).digest('hex');
  return {
    host: `https://${bucket}.cos.${region}.myqcloud.com`,
    signAlgorithm: 'sha1',
    ak: secretId,
    keyTime,
    signature,
    policy: Buffer.from(policy).toString('base64')
  };
}

module.exports = signPostObjectAPI;
