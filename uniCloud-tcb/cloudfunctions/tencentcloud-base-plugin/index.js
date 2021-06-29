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

/**
 * 插件模块使用情况统计
 * @param {object} event - 通过uniCloud.callFunction调用云函数时传入的data对象
 * @param {string} event.secretId - 配置的secretId
 * @param {string} event.secretKey - 配置的secretKey
 * @param {string} event.module - 模块名称
 * @param {object} event.extraInfo - 附加信息
 * @return {Promise<void>}
 */
exports.main = async ({ secretId, secretKey, module, extraInfo }) => {
  if (!secretId || !secretKey || !module) {
    throw new Error('secretId,secretKey和module不能为空');
  }
  const db = uniCloud.database();
  // 暂时未在DCloud找到“判断表是否存在”的API，故每次都调用createCollection
  try {
    await db.createCollection('tencentcloud_plugin_report');
  } catch (error) {
    if (/DATABASE_COLLECTION_ALREADY_EXIST/.test(error.message)) {
      // 如果发现表已存在，则忽略错误，继续向下执行
    } else {
      // 其它错误，包括但不限于（阿里云不支持代码自动创建表，暂不统计），直接抛出异常
      throw error;
    }
  }
  const collection = db.collection('tencentcloud_plugin_report');
  // 查找出第一条记录
  let {
    data: [record]
  } = await collection.limit(1).get();
  // 如果为空则创建一条记录，该记录的主键_id作为数据上报的siteId使用，不同模块的上报共用一个siteId
  if (!record) {
    const { id } = await collection.add({});
    record = { _id: id };
  }
  // 如果module已存在，说明已经上报过，直接返回
  if (record[module]) {
    return;
  }
  // 获取UserUin
  const userUin = await getUserUin(secretId, secretKey);
  // 调用上报接口，此接口不返回上报状态
  await uniCloud.httpclient.request('https://appdata.qq.com/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      action: 'activate',
      plugin_type: module.toLowerCase(),
      data: {
        site_id: `uniapp_${record._id}`,
        site_app: 'uni-app',
        site_url: 'uni-app',
        uin: userUin,
        cust_sec_on: 1,
        others: JSON.stringify(extraInfo)
      }
    }
  });
  // 保存上报标识，之后不再上报
  await collection.doc(record._id).update({
    [module]: JSON.stringify(extraInfo)
  });
};

// 获取UserUin
async function getUserUin(secretId, secretKey) {
  const payloadHash = crypto.createHash('sha256').update('{}').digest('hex');
  const requestString = `POST\n/\n\ncontent-type:application/json\nhost:ms.tencentcloudapi.com\n\ncontent-type;host\n${payloadHash}`;
  const currentDate = new Date();
  const timestamp = `${Math.floor(currentDate.getTime() / 1000)}`;
  const dateString = currentDate.toISOString().substr(0, 10);
  const requestStringHash = crypto.createHash('sha256').update(requestString).digest('hex');
  const stringToSign = `TC3-HMAC-SHA256\n${timestamp}\n${dateString}/ms/tc3_request\n${requestStringHash}`;
  const secretDate = crypto.createHmac('sha256', `TC3${secretKey}`).update(dateString).digest();
  const secretService = crypto.createHmac('sha256', secretDate).update('ms').digest();
  const secretSigning = crypto.createHmac('sha256', secretService).update('tc3_request').digest();
  const signature = crypto.createHmac('sha256', secretSigning).update(stringToSign).digest('hex');
  const authorization = `TC3-HMAC-SHA256 Credential=${secretId}/${dateString}/ms/tc3_request, SignedHeaders=content-type;host, Signature=${signature}`;
  const { res } = await uniCloud.httpclient.request('https://ms.tencentcloudapi.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-TC-Action': 'DescribeUserBaseInfoInstance',
      'X-TC-Version': '2018-04-08',
      'X-TC-Timestamp': timestamp,
      Authorization: authorization
    },
    data: {},
    dataType: 'json'
  });
  const { status, statusMessage, data } = res;
  if (status !== 200) {
    throw new Error('获取UserUin失败');
  }
  if (data.Response.Error) {
    throw new Error(data.Response.Error.Message);
  }
  return data.Response.UserUin;
}
