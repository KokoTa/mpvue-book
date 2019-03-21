<template>
  <div>
    xxx
  </div>
</template>

<script>
import { get } from '@/utils/util'

export default {
  methods: {
    // 每次点击都递增访问数
    async getDetail () {
      await get('/weapp/bookDetail', {
        id: this.$root.$mp.query.id // mpvue 获取 onLaunch 的 option 的形式alt
      })
    }
  },
  mounted () {
    this.getDetail()
  }
}
</script>

<style lang="scss" scoped>
</style>
