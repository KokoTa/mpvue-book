<template>
  <div class="card" @click="handleNavigate">
    <div class="card-left">
      <image class="card-image" :src="book.image" mode="aspectFit" @click.stop="handlePreview"></image>
    </div>
    <div class="card-right">
      <div class="card-info-left">
        <div class="text-primary">{{ book.title }}</div>
        <div>{{ book.author }}</div>
        <div>{{ book.publisher }}</div>
      </div>
      <div class="card-info-right">
        <div class="text-primary">{{ book.rate }} <Star :rate="book.rate"></Star></div>
        <div>浏览量：</div>
        <div>{{ book.user_info.nickName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from '@/components/Star'

export default {
  components: {
    Star
  },
  props: ['book'],
  methods: {
    handleNavigate () {
      wx.navigateTo({ url: `/pages/bookDetail/main?id=${this.book.id}` })
    },
    handlePreview () {
      wx.previewImage({
        current: this.book.image,
        urls: [this.book.image]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding: 20rpx;
  overflow: hidden;
  line-height: 1.5;

  .card-left {
    width: 140rpx;
    height: 140rpx;
    float: left;

    .card-image {
      width: 100%;
      height: 100%;
    }
  }

  .card-right {
    font-size: 16px;

    .card-info-left {
      float: left;
    }

    .card-info-right {
      float: right;
      text-align: right;
    }
  }
}
</style>
