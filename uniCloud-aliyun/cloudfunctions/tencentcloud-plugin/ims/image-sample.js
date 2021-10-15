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
 * 查询图片样本
 * 更多信息请访问 https://cloud.tencent.com/document/product/669/37187
 * @param {object} params - 参数包装对象
 * @param {int} params.limit - 数量限制
 * @param {int} params.offset - 偏移量
 * @return {Promise<object>} 图片样本的信息
 */
async function listImageSample({ limit = 20, offset = 0 }) {
  // 调用腾讯云接口
  const { FileSampleSet, TotalCount } = await request('DescribeFileSample', {
    Limit: limit,
    Offset: offset
  });
  return {
    FileSampleSet,
    TotalCount
  };
}

/**
 * 新增图片样本
 * 更多信息请访问 https://cloud.tencent.com/document/product/669/37189
 * @param {object} params - 参数包装对象
 * @param {string} params.fileName - 图片文件名称
 * @param {string} params.fileUrl - 图片文件路径
 * @param {string} params.fileMd5 - 图片文件MD5
 * @param {string} params.evilType - 恶意类型
 * @param {string} params.label - 样本类型 1：黑库 2：白库
 * @return {Promise<int>} 任务状态
 */
async function createImageSample({ fileName, fileUrl, fileMd5, evilType, label }) {
  if (!fileName || !fileUrl || !fileMd5 || !evilType || !label) {
    throw new Error('fileName/fileUrl/fileMd5/evilType/label不能为空');
  }
  // 调用腾讯云接口
  const { Progress } = await request('CreateFileSample', {
    Contents: [
      {
        FileName: fileName,
        FileUrl: fileUrl,
        FileMd5: fileMd5
      }
    ],
    EvilType: evilType,
    Label: label,
    FileType: 'image'
  });
  return Progress;
}

/**
 * 删除图片样本
 * 更多信息请访问 https://cloud.tencent.com/document/product/669/37188
 * @param {object} params - 参数包装对象
 * @param {string[]} params.ids - 唯一标识数组
 * @return {Promise<int>} 任务状态
 */
async function deleteImageSample({ ids }) {
  if (!ids || !ids.length) {
    throw new Error('ids不能为空');
  }
  // 调用腾讯云接口
  const { Progress } = await request('DeleteFileSample', {
    Ids: ids
  });
  return Progress;
}

module.exports = {
  listImageSample,
  createImageSample,
  deleteImageSample
};
