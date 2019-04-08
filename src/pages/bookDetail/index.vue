<template>
  <div>
    <!-- 图书详情 -->
    <BookInfo :info="info"></BookInfo>
    <!-- 评论列表 -->
    <CommentList :list="comments"></CommentList>
    <!-- 评论框：一人只能评论一次，如果已评论或未登录，则不现实该框 -->
    <div class="comment" v-if="showAddComment">
      <textarea class="comment-textarea" v-model="comment" :maxlength="100" placeholder="请输入评论"></textarea>
      <div class="location">
        地理位置：
        <switch color="#ea5a49" :checked="location" @change="getLocation"></switch>
        <span class="text-primary">{{ location }}</span>
      </div>
      <div class="phone-type">
        手机型号：
        <switch color="#ea5a49" :checked="phoneType" @change="getPhoneType"></switch>
        <span class="text-primary">{{ phoneType }}</span>
      </div>
      <button class="btn" @click="addComment">评论</button>
    </div>
    <div v-else class="no-add-comment">
      您还未登录或者您已经评论过了，所以不能评论咯！
    </div>
  </div>
</template>

<script>
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'
import { get, post, showSuccess } from '@/utils/util'

// 腾讯地图 SDK 引入
import QQMapWX from '@/utils/qqmap-wx-jssdk.js'
const apiKey = 'DMTBZ-X7IWQ-J6P5Q-GR2QD-XFMD3-6NBSV'

export default {
  components: {
    BookInfo,
    CommentList
  },
  data () {
    return {
      userInfo: {},
      info: {},
      bookId: '',
      comment: '',
      location: '',
      phoneType: '',
      qqmapsdk: null,
      comments: []
    }
  },
  computed: {
    showAddComment () {
      // 未登录
      if (!this.userInfo) return false
      // 已评论
      if (this.comments.findIndex((item) => item.openid === this.userInfo.openId) !== -1) return false

      return true
    }
  },
  methods: {
    // 获取图书详情
    // 每次点击都递增访问数
    async getDetail () {
      this.bookId = this.$root.$mp.query.id // mpvue 获取 onLaunch 的 option 的形式
      const { data } = await get('/weapp/bookDetail', {
        id: this.bookId
      })
      this.info = data
      wx.setNavigationBarTitle({
        title: data.title
      })
    },
    // 获取地理位置
    async getLocation (e) {
      const { value } = e.mp.detail
      if (value) {
        // 获取经纬度
        wx.getLocation({
          type: 'wgs84',
          altitude: false,
          success: (result) => {
            const { latitude, longitude } = result

            // 经纬度转地址
            this.qqmapsdk.reverseGeocoder({
              location: {
                latitude, longitude
              },
              success: (res) => {
                const { city } = res.result.ad_info
                this.location = city
              },
              fail: () => wx.showToast({ title: '获取地址失败' })
            })
          },
          fail: () => wx.showToast({ title: '获取坐标失败' })
        })
      } else {
        this.location = ''
      }
    },
    // 获取手机型号
    async getPhoneType (e) {
      const { value } = e.mp.detail
      if (value) {
        const { model } = wx.getSystemInfoSync()
        this.phoneType = model
      } else {
        this.phoneType = ''
      }
    },
    // 添加评论
    async addComment () {
      // 未登录或者评论为空都不会提交
      if (!(this.userInfo && this.comment)) {
        return
      }

      // 需要的参数：图书 id、用户 openid、评论内容、地理位置、手机型号
      const data = {
        bookid: this.bookId,
        openid: this.userInfo.openId,
        comment: this.comment,
        location: this.location,
        phone: this.phoneType
      }
      const res = await post('/weapp/addComment', data)
      showSuccess(res.message)
      this.comment = ''

      this.getComments()
    },
    // 获取评论
    async getComments () {
      const data = {
        bookid: this.bookId
      }
      const res = await get('/weapp/commentList', data)
      this.comments = res.commentList
    }
  },
  mounted () {
    // 获取用户信息
    this.userInfo = wx.getStorageSync('userInfo')

    // 获取详情
    this.getDetail()

    // 获取评论
    this.getComments()

    // 初始化腾讯地图 api
    this.qqmapsdk = new QQMapWX({
      key: apiKey
    })
  },
  onShareAppMessage (info) {
    console.log(info)
  }
}
</script>

<style lang="scss" scoped>
.comment {
  width: 100%;
  .comment-textarea {
    width: 100%;
    height: 200rpx;
    padding: 10px;
    background: #eee;
    font-size: 14px;
  }
  .location, .phone-type {
    font-size: 14px;
    box-sizing: border-box;
    padding: 10rpx;
  }
}
.no-add-comment {
  font-size: 14px;
  padding: 10rpx;
  background: #eee;
  text-align: center;
}
</style>
