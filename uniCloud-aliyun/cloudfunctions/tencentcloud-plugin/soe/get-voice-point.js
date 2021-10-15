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

/**
 * 获取参数
 * @param {object} param - 待包装对象
 * @return {object} 包装参数对象
 */
function getParams(param) {
  const paramsData = {
    SeqId: param.seqId,
    IsEnd: param.isEnd,
    VoiceFileType: 3,
    VoiceEncodeType: 1,
    UserVoiceData: param.voiceData,
    SessionId: param.sessionId,
    RefText: param.refText,
    WorkMode: param.workMode,
    EvalMode: param.evalMode,
    ScoreCoeff: param.scoreCoeff
  };

  // 非必填参数
  param.hasOwnProperty('soeAppId') && (paramsData.SoeAppId = param.soeAppId);
  param.hasOwnProperty('storageMode') && (paramsData.StorageMode = param.storageMode);
  param.hasOwnProperty('sentenceInfoEnabled') && (paramsData.SentenceInfoEnabled = param.sentenceInfoEnabled);
  param.hasOwnProperty('serverType') && (paramsData.ServerType = param.serverType);
  param.hasOwnProperty('textMode') && (paramsData.TextMode = param.textMode);

  return paramsData;
}

/**
 * 获取口语评测信息
 * 更多信息请访问 https://cloud.tencent.com/document/api/884/32605
 * @param {object} params - 参数包装对象
 * @param {object} params.param - 口语评测相关参数
 * @return {Promise<object>} 评测信息
 */
async function getVoicePoint({ param }) {
  const paramsData = getParams(param);

  // 调用腾讯云发音数据传输接口附带初始化过程接口
  const evaluateInfo = await request('TransmitOralProcessWithInit', paramsData);

  return evaluateInfo;
}

module.exports = getVoicePoint;
