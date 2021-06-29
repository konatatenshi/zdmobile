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
const { appId, appSecretKey } = require('./config.js');
const { request } = require('./utils.js');
const getExtraReportInfo = () => ({ captcha_appid: appId });

/**
 * 获取配置在云函数的短信appid
 */
function getAppId() {
  return appId;
}

/**
 * 核查验证码票据结果
 * @param {*} params
 * @param {integer} params.CaptchaType - 固定填值：9。可在控制台配置不同验证码类型。
 * @param {string} params.Ticket - 前端回调函数返回的用户验证票据
 * @param {string} params.UserIp - 用户操作来源的外网 IP
 * @param {string} params.Randstr - 前端回调函数返回的随机字符串
 * @param {integer} [params.BusinessId] - 业务 ID，网站或应用在多个业务中使用此服务，通过此 ID 区分统计数据
 * @param {integer} [params.SceneId] - 场景 ID，网站或应用的业务下有多个场景使用此服务，通过此 ID 区分统计数据
 * @param {string} [params.MacAddress] - mac 地址或设备唯一标识
 * @param {string} [params.Imei] - 手机设备号
 * @param {integer} [params.NeedGetCaptchaTime] - 是否返回前端获取验证码时间，取值1：需要返回
 */
async function describeCaptchaResult(params) {
  // 配置校验
  if (!appId || !appSecretKey) {
    throw new Error('请在云函数CAPTCHA模块中配置appId和AppSecretKey');
  }
  const auth = uniCloud.auth();
  const userIp = auth.getClientIP();
  // 删除掉云函数带上来的额外参数
  delete params.uniIdToken;
  // 调用核查验证码票据接口
  const result = await request('DescribeCaptchaResult', {
    AppSecretKey: appSecretKey,
    CaptchaAppId: Number(appId),
    UserIp: userIp,
    ...params
  });
  return result;
}

module.exports = {
  getAppId,
  describeCaptchaResult,
  getExtraReportInfo
};
