<template>
  <div class="container">
    <button class="user-info btn-clear" open-type="getUserInfo" @getuserinfo="handleLogin">
      <img :src="userInfo.avatarUrl" alt="头像">
      <p>{{ userInfo.nickName }}</p>
    </button>
    <YearProgress></YearProgress>
    <button v-if="userInfo.openId" class="btn" @click="handleScanBook">添加图书</button>
  </div>
</template>

<script>
import YearProgress from '@/components/YearProgress'
import { login, post, showModal } from '@/utils/util'

export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async handleLogin () { // 登录
      const userInfo = await login()
      if (userInfo) {
        this.userInfo = userInfo
      }
    },
    handleScanBook () { // 扫码
      wx.scanCode({
        onlyFromCamera: false,
        scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
        success: (result) => {
          if (result) {
            this._addBook(result.result)
          }
        },
        fail: () => {},
        complete: () => {}
      })
    },
    async _addBook (isbn) { // 添加图书
      try {
        const res = await post('/weapp/addBook', { // 请求后端，后端请求豆瓣API，最后返回给前端
          isbn,
          openid: this.userInfo.openId
        })
        showModal('提示', res.message)
      } catch (error) {
        showModal('提示', error.message)
      }
    }
  },
  onShow () {
    // 每次进到该页都判断是否登录了
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.userInfo = userInfo
    } else {
      // 未登录时的头像和用户名
      this.userInfo = {
        avatarUrl: 'https://via.placeholder.com/150',
        nickName: '点击登录'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx;

  .user-info {
    margin: 60rpx 0;
    text-align: center;
    line-height: 1.5;

    img {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
    }
  }
}
</style>
