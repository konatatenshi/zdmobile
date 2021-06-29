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

const { verificationCodeCollection, verificationCodeExpires, verificationCodeCheckTimes } = require('./config');

/**
 * 校验验证码是否正确
 * @async
 * @param {object} params - 参数包装对象
 * @param {string} params.phoneNumber - 手机号码
 * @param {string} params.verificationCode - 用户输入的验证码
 * @return {Promise<void>} 验证码核验状态（无异常代表正确）
 */
async function checkVerificationCode({ phoneNumber, verificationCode }) {
  // 配置校验
  if (!verificationCodeCollection) {
    throw new Error('请在云函数SMS模块中配置verificationCodeCollection');
  }
  if (!verificationCodeExpires || isNaN(verificationCodeExpires) || verificationCodeExpires <= 0) {
    throw new Error('请在云函数SMS模块中配置有效的verificationCodeExpires');
  }
  if (!verificationCodeCheckTimes || isNaN(verificationCodeCheckTimes) || verificationCodeCheckTimes <= 0) {
    throw new Error('请在云函数SMS模块中配置有效的verificationCodeCheckTimes');
  }
  // 参数校验
  if (!phoneNumber) {
    throw new Error('手机号码不能为空');
  }
  if (!verificationCode) {
    throw new Error('验证码不能为空');
  }
  // 自动为无前缀手机号码添加+86前缀
  if (!phoneNumber.startsWith('+')) {
    phoneNumber = `+86${phoneNumber}`;
  }
  const db = uniCloud.database();
  const verificationCodes = db.collection(verificationCodeCollection);
  // 清理过期验证码记录
  const result = await verificationCodes
    .where({
      createTime: db.command.lt(new Date().getTime() - verificationCodeExpires * 60 * 1000)
    })
    .remove();
  if (result.deleted) {
    console.log(`已自动清理掉${result.deleted}条过期记录`);
  }
  // 验证码查询并核对
  const {
    data: [record]
  } = await verificationCodes
    .where({
      phoneNumber
    })
    .orderBy('createTime', 'desc')
    .limit(1)
    .get();
  if (!record) {
    throw new Error('验证码不正确');
  }
  // 每个验证码仅支持核验有限次数（防止字典遍历）
  if (record.checkCounter >= verificationCodeCheckTimes) {
    throw new Error('验证码不正确');
  }
  // 增加验证码核验次数
  if (record.verificationCode !== verificationCode) {
    await verificationCodes.doc(record._id).update({
      checkCounter: record.checkCounter + 1
    });
    throw new Error('验证码不正确');
  }
  // 验证成功后异步删除验证码记录
  try {
    verificationCodes
      .where({
        phoneNumber
      })
      .remove();
  } catch (error) {
    console.log(error);
  }
}

module.exports = checkVerificationCode;
