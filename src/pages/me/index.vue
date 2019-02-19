<template>
  <div class="container">
    <div class="user-info">
      <img :src="userInfo.avatarUrl" alt="头像">
      <p>{{ userInfo.nickName }}</p>
    </div>
    <YearProgress></YearProgress>
    <button class="btn" @click="handleScanBook">添加图书</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    handleScanBook() {
      wx.scanCode({
        onlyFromCamera: false,
        scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
        success: (result) => {
          console.log(result);
        },
        fail: () => {},
        complete: () => {},
      });
    },
  },
  created() {
    const userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo);
    this.userInfo = userInfo;
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx;

  .user-info {
    text-align: center;
    margin: 30rpx 0;

    img {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
    }
  }
}
</style>
