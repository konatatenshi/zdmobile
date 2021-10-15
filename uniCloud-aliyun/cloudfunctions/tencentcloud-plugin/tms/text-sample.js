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
 * 查询文本样本
 * 更多信息请访问 https://cloud.tencent.com/document/product/669/35618
 * @param {object} params - 参数包装对象
 * @param {int} params.limit - 数量限制
 * @param {int} params.offset - 偏移量
 * @return {Promise<object>} 文本样本的信息
 */
async function listTextSample({ limit = 20, offset = 0 }) {
  // 调用腾讯云接口
  const { TextSampleSet, TotalCount } = await request('DescribeTextSample', {
    Limit: limit,
    Offset: offset
  });
  return {
    TextSampleSet,
    TotalCount
  };
}

/**
 * 新增文本样本
 * 更多信息请访问 https://cloud.tencent.com/document/product/669/35620
 * @param {object} params - 参数包装对象
 * @param {string[]} params.contents - 关键词数组
 * @param {string} params.evilType - 恶意类型
 * @param {string} params.label - 样本类型 1：黑库 2：白库
 * @return {Promise<int>} 任务状态
 */
async function createTextSample({ contents, evilType, label }) {
  if (!contents || !contents.length || !evilType || !label) {
    throw new Error('关键词/恶意类型/样本类型不能为空');
  }
  // 调用腾讯云接口
  const { Progress } = await request('CreateTextSample', {
    Contents: contents,
    EvilType: evilType,
    Label: label
  });
  return Progress;
}

/**
 * 删除文本样本
 * 更多信息请访问 https://cloud.tencent.com/document/product/669/35619
 * @param {object} params - 参数包装对象
 * @param {string[]} params.ids - 唯一标识数组
 * @return {Promise<int>} 任务状态
 */
async function deleteTextSample({ ids }) {
  if (!ids || !ids.length) {
    throw new Error('唯一标识不能为空');
  }
  // 调用腾讯云接口
  const { Progress } = await request('DeleteTextSample', {
    Ids: ids
  });
  return Progress;
}

module.exports = {
  listTextSample,
  createTextSample,
  deleteTextSample
};
