/**
 * 工具函数
 */

import config from './config';

/**
 * get 请求 Promise 化
 * @param {String} url 请求地址
 */
export function get(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if (res.data.code === 0) {
          resolve(res.data.data);
        } else {
          reject(res.data);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

/**
 * post 请求 Promise 化
 * @param {String} url 请求地址
 * @param {Object} data 请求数据体
 */
export function post(url, data) {
  return new Promise((resolve, reject) => {

  });
}
