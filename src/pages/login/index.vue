<template>
  <div>
    <button open-type="getUserInfo" @getuserinfo="doLogin">使用前请先登录</button>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk';
import config from '../../utils/config';
import { showSuccess } from '../../utils/util';

export default {
  methods: {
    // sdk 官方登录方法
    doLogin() {
      const session = qcloud.Session.get();

      // 设置登录地址
      qcloud.setLoginUrl(config.login);

      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: (res) => {
            wx.setStorageSync('userInfo', res);
            showSuccess('登陆成功');
            setTimeout(() => {
              wx.switchTab({ url: '/pages/books/main' });
            }, 1000);
          },
          fail: (err) => {
            console.error(err);
            console.log('登录错误', err.message);
          },
        });
      } else {
        // 首次登录
        qcloud.login({
          success: (res) => {
            wx.setStorageSync('userInfo', res);
            showSuccess('登陆成功');
            setTimeout(() => {
              wx.switchTab({ url: '/pages/books/main' });
            }, 1000);
          },
          fail: (err) => {
            console.error(err);
            console.log('登录错误', err.message);
          },
        });
      }
    },
  },
  mounted() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      wx.switchTab({ url: '/pages/books/main' });
    }
  },
};
</script>

<style>
</style>
