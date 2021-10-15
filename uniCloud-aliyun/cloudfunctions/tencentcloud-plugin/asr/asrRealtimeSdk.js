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

const axios = require('axios');
const crypto = require('crypto');
const { secretId, secretKey, appId } = require('../config');

class RealTime {
  /**
   * 实例化client对象
   * @param {obejct} query 配置参数
   */
  constructor(query) {
    this.query = query || null;
  }

  /**
   * 参数签名
   * @param {string} signStr 需要签名的参数
   * @return {string} 签名后返回的数组
   */
  sign(signStr) {
    const hash = crypto.createHmac('sha1', secretKey || '');
    const sign = hash.update(Buffer.from(signStr, 'utf8')).digest('base64');
    return sign;
  }

  /**
   * 将请求的参数转为stirng类型
   * @param {object} params
   * @return {string}
   */
  formatSignString(params) {
    let strParam = '';
    let signStr = 'POSTasr.cloud.tencent.com/asr/v1/';
    if (appId) {
      signStr += appId;
    }
    const keys = Object.keys(params);
    keys.sort();
    for (const k in keys) {
      if (Object.prototype.hasOwnProperty.call(keys, k)) {
        strParam += `&${keys[k]}=${params[keys[k]]}`;
      }
    }
    const strSign = `${signStr}?${strParam.slice(1)}`;
    return strSign;
  }

  /**
   * 请求参数组装
   */
  createQuery() {
    const params = {};
    const time = new Date().getTime();

    params.projectid = 0;
    params.secretid = secretId;
    params.sub_service_type = 1;
    params.engine_model_type = this.query.engine_model_type;
    params.res_type = this.query.res_type;
    params.voice_format = this.query.voice_format;
    params.source = 0;
    params.timestamp = `${Math.round(time / 1000)}`;
    params.expired = Math.round(time / 1000) + 24 * 60 * 60;
    params.nonce = Math.round(time / 100000);
    params.voice_id = this.query.voice_id;
    params.end = this.query.end;
    params.seq = this.query.seq;

    // 非必填参数
    this.query.hasOwnProperty('hotword_id') && (params.hotword_id = this.query.hotword_id);
    this.query.hasOwnProperty('result_text_format') && (params.result_text_format = this.query.result_text_format);
    this.query.hasOwnProperty('needvad') && (params.needvad = this.query.needvad);
    this.query.hasOwnProperty('filter_dirty') && (params.filter_dirty = this.query.filter_dirty);
    this.query.hasOwnProperty('filter_modal') && (params.filter_modal = this.query.filter_modal);
    this.query.hasOwnProperty('filter_punc') && (params.filter_punc = this.query.filter_punc);
    this.query.hasOwnProperty('convert_num_mode') && (params.convert_num_mode = this.query.convert_num_mode);

    return params;
  }

  /**
   * 发起请求
   * @param {string} url 请求的url
   * @param {object} chunk 音频的buffer
   * @param {object} headers 请求头
   * @return {Promise<object>} 音频识别结果
   */
  async doRequest(url, chunk, headers) {
    const options = {
      url,
      method: 'POST',
      headers,
      data: chunk
    };
    const response = await axios(options);
    const { status, statusText, data } = response;
    if (status !== 200) {
      throw new Error(`实时语音接口调用失败[${status} - ${statusText}]`);
    }
    if (data.code !== 0) {
      throw new Error(data.message);
    }
    return data;
  }

  /**
   * 实时语音请求参数组装
   * @param {object} chunk
   * @return {Promise<object>} 音频识别结果
   */
  sendRequest(chunk) {
    if (chunk.size === 0) {
      return '';
    }
    const query = this.createQuery();
    const signStr = this.formatSignString(query);
    const autho = this.sign(signStr);
    const datalen = chunk.length;

    const headers = {};
    headers.Authorization = autho;
    headers['Content-Length'] = datalen;
    headers['Content-Type'] = 'application/octet-stream';
    headers.Host = 'asr.cloud.tencent.com';

    const reqUrl = `http://${signStr.substring(4, signStr.length)}`;
    const res = this.doRequest(reqUrl, chunk, headers);
    return res;
  }
}

module.exports = RealTime;
