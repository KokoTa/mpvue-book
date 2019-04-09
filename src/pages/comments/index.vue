<template>
  <div class="comment">
    <CommentList type="user" :list="comments"></CommentList>
    <div class="book-title">我的图书</div>
    <BookCard v-for="book in books" :key="book.id" :book="book"></BookCard>
  </div>
</template>


<script>
import CommentList from '@/components/CommentList'
import BookCard from '@/components/BookCard'
import { get } from '@/utils/util'

export default {
  components: {
    CommentList,
    BookCard
  },
  data () {
    return {
      comments: [],
      books: [],
      userInfo: null
    }
  },
  methods: {
    // 初始化
    init () {
      this.getComments()
      this.getMyBooks()
    },
    // 获取评论
    async getComments () {
      const res = await get('/weapp/commentList', {
        openid: this.userInfo.openId
      })
      this.comments = res.commentList
    },
    // 获取我添加的图书
    async getMyBooks () {
      const res = await get('/weapp/bookList', {
        openid: this.userInfo.openId
      })
      this.books = res.list
    }
  },
  onShow () {
    // 如果未登录就不初始化
    if (!this.userInfo) {
      const userInfo = wx.getStorageSync('userInfo')
      this.userInfo = userInfo
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.book-title {
  font-size: 14px;
  background: #eee;
  padding: 20rpx;
}
</style>
