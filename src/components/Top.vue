<template>
  <div>
    <swiper
      :indicator-dots="true"
      :autoplay="true"
      :interval="5000"
      :duration="500"
      :circular="true"
    >
      <swiper-item v-for="(books, index) in chunks" :key="index" class="swiper-item">
        <image v-for="(book, i) in books" :key="i" class="swiper-image" :src="book.image" @click="handleNavigate(book)"></image>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    tops: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    // 将一维数组二维分组化
    chunks () {
      const chunkLength = 2
      const arrLength = this.tops.length
      const arr = this.tops
      let count = 0
      let newArr = []
      while ((count <= arrLength)) {
        newArr.push(arr.slice(count, count + chunkLength))
        count += chunkLength
      }

      return newArr
    }
  },
  methods: {
    handleNavigate (book) {
      wx.navigateTo({ url: `/pages/bookDetail/main?id=${book.id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-item {

  .swiper-image {
    width: 50%;
  }
}
</style>
