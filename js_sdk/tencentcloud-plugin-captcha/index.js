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

"use strict";

/**
 * 加载验证码JS文件
 */
function loadScript(url) {
  return new Promise((resolve, reject) => {
    if (window.TencentCaptcha === undefined) {
      let script = document.createElement("script");
      let head = document.getElementsByTagName("head")[0];
      script.type = "text/javascript";
      script.charset = "UTF-8";
      script.src = url;
      head.appendChild(script);
      // 当脚本加载完成
      script.onload = function () {
        resolve();
      };
      // 脚本加载失败
      script.onerror = function () {
        reject(new Error("验证码脚本加载失败，请重试"));
      };
    } else {
      resolve();
    }
  });
}

/**
 * 验证码creater
 * @param {function} callback 回调函数, 回调结果请参见 https://cloud.tencent.com/document/product/1110/36841
 * @param {object} options 更多配置参数, 请参见 https://cloud.tencent.com/document/product/1110/36841#pzcs
 * @returns {Promise<object>} 返回TencentCaptcha的实例提供一些操作验证码的方法： show() 显示验证码、 destroy() 隐藏验证码、 getTicket() 获取验证码验证成功后的ticket。
 */
async function captchaCreater(callback, options) {
  try {
    // 加载远程验证码脚本
    await loadScript("https://ssl.captcha.qq.com/TCaptcha.js");
    // 从云函数中获取配置的AppId
    const { result } = await uniCloud.callFunction({
      name: "tencentcloud-plugin",
      data: {
        module: "CAPTCHA",
        action: "getAppId",
      },
    });
    return new TencentCaptcha(`${result}`, callback, options);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * 核查验证码票据结果
 * @param {*} params
 * @param {integer} params.captchaType - 固定填值：9。可在控制台配置不同验证码类型。
 * @param {string} params.ticket - 前端回调函数返回的用户验证票据
 * @param {string} params.randstr - 前端回调函数返回的随机字符串
 * @param {integer} [params.businessId] - 业务 ID，网站或应用在多个业务中使用此服务，通过此 ID 区分统计数据
 * @param {integer} [params.sceneId] - 场景 ID，网站或应用的业务下有多个场景使用此服务，通过此 ID 区分统计数据
 * @param {string} [params.macAddress] - mac 地址或设备唯一标识
 * @param {string} [params.imei] - 手机设备号
 * @param {integer} [params.needGetCaptchaTime] - 是否返回前端获取验证码时间，取值1：需要返回
 */
async function describeCaptchaResult({
  captchaType,
  ticket,
  randstr,
  businessId,
  sceneId,
  macAddress,
  imei,
  needGetCaptchaTime,
}) {
  try {
    if (!captchaType || !ticket || !randstr) {
      throw new Error("缺少必要参数");
    }
    const result = await uniCloud.callFunction({
      name: "tencentcloud-plugin",
      data: {
        module: "CAPTCHA",
        action: "describeCaptchaResult",
        CaptchaType: captchaType,
        Ticket: ticket,
        Randstr: randstr,
        BusinessId: businessId,
        SceneId: sceneId,
        MacAddress: macAddress,
        Imei: imei,
        NeedGetCaptchaTime: needGetCaptchaTime,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export { captchaCreater, describeCaptchaResult };
