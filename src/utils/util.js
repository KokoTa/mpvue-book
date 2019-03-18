/**
 * 工具函数
 */

import qcloud from 'wafer2-client-sdk'
import config from './config'

/**
 * 请求 Promise 化
 * @param {String} url 请求地址
 * @param {Object} data 请求数据体
 */
export function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      header: { 'content-type': 'application/json' },
      data,
      method,
      success: (res) => {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export function get (url, data) {
  return request(url, 'get', data)
}
export function post (url, data) {
  return request(url, 'post', data)
}

/**
 * 成功的 toast
 */
export function showSuccess (message) {
  wx.showToast({
    title: message
  })
}

/**
 * 点击登录
 */
export function login () {
  const session = qcloud.Session.get()

  // 设置登录地址
  qcloud.setLoginUrl(config.login)

  if (session) {
    // 第二次登录
    // 或者本地已经有登录态
    // 可使用本函数更新登录态
    return new Promise((resolve, reject) => {
      qcloud.loginWithCode({
        success: (res) => {
          wx.setStorageSync('userInfo', res)
          showSuccess('登陆成功')
          resolve(res)
        },
        fail: (err) => {
          console.error(err)
          console.log('登录错误', err.message)
          reject(err)
        }
      })
    })
  }

  // 首次登录
  return new Promise((resolve, reject) => {
    qcloud.login({
      success: (res) => {
        wx.setStorageSync('userInfo', res)
        showSuccess('登陆成功')
        resolve(res)
      },
      fail: (err) => {
        console.error(err)
        console.log('登录错误', err.message)
        reject(err)
      }
    })
  })
}
