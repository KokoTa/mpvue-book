<template>
  <div class="book">
    <Top :tops="tops"></Top>
    <BookCard v-for="book in books" :key="book.id" :book="book"></BookCard>
    <p class="more" v-if="!more">没有更多记录啦！</p>
  </div>
</template>

<script>
import Top from '@/components/Top'
import BookCard from '@/components/BookCard'
import { get } from '@/utils/util'

/**
 * 分页逻辑：
 * 1. 下拉：加载第一页数据
 * 2. 上拉：
 *    page: 页数
 *    limit: 一页中的书本数
 *    more: 是否有更多数据
 *          当请求得到的数 < limit 时，more 为 false
 *          反之 more 为 true
 */
export default {
  components: {
    Top,
    BookCard
  },
  data () {
    return {
      books: [],
      page: 0,
      limit: 10,
      more: false,

      tops: []
    }
  },
  methods: {
    // 获取书籍列表，flag 指代是否首次加载
    async getBookList (flag) {
      wx.showNavigationBarLoading()

      if (flag) {
        this.page = 0
        this.more = true
      }

      const data = await get('/weapp/bookList', {
        page: this.page
      })
      this.page++

      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()

      if (flag) {
        this.books = data.list
      } else {
        this.books = this.books.concat(data.list)
      }

      if (data.list.length < this.limit) {
        this.more = false
      }
    },
    async getTop () {
      const tops = await get('/weapp/top')
      this.tops = tops.list
    }
  },
  onPullDownRefresh () {
    this.getBookList(true)
  },
  onReachBottom () {
    if (!this.more) return

    this.getBookList()
  },
  created () {
    this.getBookList(true)
    this.getTop()
  }
}
</script>

<style lang="scss" scoped>
</style>
