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

// 腾讯云uni-app短信SMS插件依赖云函数的配置
module.exports = {
  appId: '', // SMS SDK AppID
  appSign: '', // 短信签名
  verificationCodeCollection: 'verification_code', // 验证码数据表名（请提前在服务空间云数据库创建此表）
  verificationCodeTemplateId: '', // 验证码短信模板ID（模板中必需包含且只能包含一个变量值，用于填充验证码）
  verificationCodeLength: 4, // 验证码长度4~8（注：验证码为纯数字）
  verificationCodeExpires: 5, // 验证码有效期（单位：分钟）
  verificationCodeCheckTimes: 5 // 验证码有效次数，即允许用户输入错误次数，达到后自动失效
};
