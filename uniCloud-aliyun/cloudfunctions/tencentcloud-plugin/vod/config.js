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

// 腾讯云uni-app云点播VOD插件依赖云函数的配置
module.exports = {
  uploadExpires: 60, // 上传签名有效期（单位：秒）
  antiTheftKey: '', // 防盗链key，如果未开启Key防盗链，请留空此项
  antiTheftExpires: 60 // 防盗链接有效时长（单位：分钟）
};
