<template>
  <div class="year-progress">
    <progress :percent="percent" activeColor="#ea5149" />
    <p class="year-progress-text">
      {{ year }} 已经过去 {{ goneDay }} 天，{{ percent }}%
    </p>
  </div>
</template>

<script>
export default {
  name: 'YearProgress',
  methods: {
    // 判断是否闰年
    isLeapYear () {
      const year = new Date().getFullYear()
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 === 0) {
        return true
      }
      return false
    },
    // 获取全年天数
    getDaysOfYear () {
      return this.isLeapYear() ? 366 : 365
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    goneDay () {
      // 当年第一天
      const start = new Date()
      start.setMonth(0)
      start.setDate(1)
      // 当前时间 - 第一天时间 = 过去的时间
      const offset = new Date().getTime() - start.getTime()

      return (
        // 今天也算过去了一天
        Math.ceil(offset / 1000 / 60 / 60 / 24)
      )
    },
    percent () {
      return ((this.goneDay / this.getDaysOfYear()) * 100).toFixed(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.year-progress {
  margin: 30rpx 0;

  .year-progress-text {
    margin: 10rpx 0;
    text-align: center;
    font-size: 14px;
  }
}
</style>
