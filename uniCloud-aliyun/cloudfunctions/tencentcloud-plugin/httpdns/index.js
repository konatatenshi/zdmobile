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
const { encId, encKey } = require('./config.js');

/**
 * 核查验证码票据结果
 * @param {*} params
 * @param {integer} params.domainName - 需要解析的域名
 * @param {string?} params.ip - 用户IP 默认取用户客户端ip
 * @param {number?} params.ttl - 是否递归服务器缓存时间 1：返回
 * @param {number?} params.clientip - 是否返回用户公网出口IP 1:返回
 * @param {boolean} param.isEnc - 是否加密 true(调用企业版API): 加密 false:不加密(调用免费版API)
 */
async function describeDnsResult({ domainName, ip, ttl, clientip, isEnc }) {
  // 配置校验
  if (isEnc && (!encId || !encKey)) {
    throw new Error('请在云函数HTTPDNS模块中配置encId和encKey');
  }
  // 如果不传入ip，就取客户端ip
  if (!ip) {
    const auth = uniCloud.auth();
    ip = auth.getClientIP();
  }
  // 企业版API调用需加密
  if (isEnc) {
    domainName = encrypt(domainName);
    ip = encrypt(ip);
  }

  const params = {
    dn: domainName,
    ip,
    ttl,
    clientip,
    id: isEnc ? encId : undefined
  };
  const { status, statusText, data } = await uniCloud.httpclient.request('http://119.29.29.29/d', {
    method: 'GET',
    dataType: 'text',
    data: params
  });

  if (status !== 200) {
    throw new Error(`接口调用失败[${status} - ${statusText}]`);
  }
  if (!data) {
    throw new Error('域名解析失败');
  }
  if (isEnc) {
    return decrypt(data);
  }

  return data;
}

/**
 * 加密
 * @param {string} encString - 需要加密的字符串
 * @return {string} 加密数据
 */
function encrypt(encString) {
  try {
    if (!encString) {
      throw new Error('请传入待加密数据');
    }
    const iv = Buffer.alloc(0);
    const cipher = crypto.createCipheriv('des-ecb', encKey, iv);
    let encrypText = cipher.update(encString, 'utf8', 'hex');
    encrypText += cipher.final('hex');
    return encrypText;
  } catch (e) {
    throw new Error('加密失败');
  }
}

/**
 * 解密
 * @param {string} decString - 需要解密的字符串
 * @return {string}  解密数据
 */
function decrypt(decString) {
  try {
    if (!decString) {
      throw new Error('请传入待解密数据');
    }
    const iv = Buffer.alloc(0);
    const cipher = crypto.createDecipheriv('des-ecb', encKey, iv);
    let decryptText = cipher.update(decString, 'hex', 'utf8');
    decryptText += cipher.final('utf8');
    return decryptText;
  } catch (e) {
    throw new Error('解密失败');
  }
}

module.exports = {
  describeDnsResult
};
