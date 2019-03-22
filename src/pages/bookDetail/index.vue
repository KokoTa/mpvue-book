<template>
  <div>
    <BookInfo :info="info"></BookInfo>
  </div>
</template>

<script>
import BookInfo from '@/components/BookInfo'
import { get } from '@/utils/util'

export default {
  components: {
    BookInfo
  },
  data () {
    return {
      info: {}
    }
  },
  methods: {
    // 每次点击都递增访问数
    async getDetail () {
      const { data } = await get('/weapp/bookDetail', {
        id: this.$root.$mp.query.id // mpvue 获取 onLaunch 的 option 的形式alt
      })
      this.info = data
      wx.setNavigationBarTitle({
        title: data.title
      })
    }
  },
  mounted () {
    this.getDetail()
  },
  onShareAppMessage (info) {
    console.log(info)
  }
}
</script>

<style lang="scss" scoped>
</style>
