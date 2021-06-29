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

const axios = require('axios');
const { sign } = require('../common');

/**
 * 请求腾讯云验证码接口公共方法
 * @param {string} action - 接口请求action
 * @param {object} payload - 接口请求体
 * @returns {object} API返回的有效数据
 */
async function request(action, payload) {
  const [timestamp, authorization] = sign('captcha', JSON.stringify(payload));
  const options = {
    url: 'https://captcha.tencentcloudapi.com',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-TC-Action': action,
      'X-TC-Version': '2019-07-22',
      'X-TC-Timestamp': timestamp,
      Authorization: authorization
    },
    data: payload
  };
  const response = await axios(options);
  const { status, statusText, data } = response;
  if (status !== 200) {
    throw new Error(`${action}接口调用失败[${status} - ${statusText}]`);
  }
  if (data.Response.Error) {
    throw new Error(data.Response.Error.Message);
  }
  return data.Response;
}

module.exports = { request };
