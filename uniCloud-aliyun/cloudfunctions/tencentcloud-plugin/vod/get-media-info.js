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
const getAntiTheftURL = require('./get-anti-theft-url.js');
const { antiTheftKey } = require('./config');

/**
 * 获取腾讯云云点播媒体详细信息
 * 更多信息请访问 https://cloud.tencent.com/document/api/266/31763
 * @param {object} params - 参数包装对象
 * @param {string[]} params.mediaId - 媒体ID
 * @return {Promise<object>} 媒体详细信息
 */
async function getUploadSignature({ mediaId }) {
  if (!mediaId) {
    throw new Error('待查询媒体ID不能为空');
  }
  // 调用腾讯云查询接口
  const {
    MediaInfoSet: [mediaInfo]
  } = await request('DescribeMediaInfos', {
    FileIds: [mediaId]
  });
  // 如果有配置antiTheftKey则自动生成带签名的url
  if (mediaInfo && antiTheftKey) {
    mediaInfo.BasicInfo.AntiTheftUrl = getAntiTheftURL({
      mediaUrl: mediaInfo.BasicInfo.MediaUrl
    });
  }
  return mediaInfo;
}

module.exports = getUploadSignature;
