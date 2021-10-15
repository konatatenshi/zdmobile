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
const { appId } = require('./config');

/**
 * 获取腾讯云SMS产品套餐包状态
 * @param {object} params - 参数包装对象
 * @param {number} params.limit - 最大上限(需要拉取的套餐包个数)
 * @return {Promise<object>} 短信套餐包状态信息，详见文档 https://cloud.tencent.com/document/api/382/39533
 */
async function getPackagesStatistics({ limit = 10 }) {
  // 配置校验
  if (!appId) {
    throw new Error('请在云函数SMS模块中配置appId');
  }
  // 调用腾讯云查询SMS状态接口
  const result = await request('SmsPackagesStatistics', {
    SmsSdkAppid: appId,
    Limit: limit,
    Offset: 0
  });
  return result;
}

module.exports = getPackagesStatistics;
