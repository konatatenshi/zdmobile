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
const { antiTheftKey, antiTheftExpires } = require('./config');

/**
 * 获取云点播文件防盗链链接
 * 更多信息请访问 https://cloud.tencent.com/document/product/266/14047
 * @param {object} params - 参数包装对象
 * @param {string} params.mediaUrl - 云点播文件地址
 * @return {string} 云点播文件完整url（包含签名）
 */
function getAntiTheftURL({ mediaUrl }) {
  // 配置校验
  if (!antiTheftKey) {
    throw new Error('请在云函数VOD模块中配置有效的antiTheftKey');
  }
  if (isNaN(antiTheftExpires) || antiTheftExpires <= 0) {
    throw new Error('请在云函数VOD模块中配置有效的antiTheftExpires');
  }
  // 生成包含签名的url
  const result = new RegExp('^https?://[^/]*(.*/)[^/]*$').exec(mediaUrl);
  if (!result) {
    throw new Error('无效的媒体文件Url');
  }
  const dir = result[1];
  const t = Math.floor(new Date().getTime() / 1000 + antiTheftExpires * 60).toString(16);
  const sign = crypto.createHash('md5').update(`${antiTheftKey}${dir}${t}`).digest('hex');
  return `${mediaUrl}?t=${t}&sign=${sign}`;
}

module.exports = getAntiTheftURL;
