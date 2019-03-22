<template>
  <div>
    <div class="header">
      <image class="back" :src="info.image" mode="aspectFill"></image>
      <div class="front">
        <image class="front-image" :src="info.image" mode="aspectFit"></image>
        <p class="front-title">{{ info.title }}</p>
        <p class="front-author">{{ info.author }}</p>
      </div>
    </div>
    <div class="info">
      <div class="info-column">
        <span class="left">{{ info.user_info && info.user_info.nickName }}</span>
        <span class="right text-primary">{{ info.rate }} <Star :rate="info.rate"></Star></span>
      </div>
      <div class="info-column">
        <span class="left">{{ info.publisher }}</span>
        <span class="right">{{ info.price }}</span>
      </div>
    </div>
    <div class="tags">
      <span class="tag" v-for="tag in tags" :key="tag">{{ tag }}</span>
    </div>
    <div class="paragraphs">
      <p class="paragraph" v-for="(p, i) in paragraphs" :key="i">{{ p }}</p>
    </div>
  </div>
</template>

<script>
import Star from '@/components/Star'

export default {
  props: ['info'],
  components: {
    Star
  },
  computed: {
    tags () {
      return this.info.tags && this.info.tags.split(',')
    },
    paragraphs () {
      return this.info.summary && this.info.summary.split('\n')
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 400rpx;
  position: relative;
  overflow: hidden;

  .back {
    width: 100%;
    filter: blur(15rpx);
  }
  .front {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;

    .front-image {
      width: 100%;
      height: 200rpx;
      margin-top: 30rpx;
    }
    .front-title, .front-author {
      color: #fff;
      line-height: 2;
    }
    .front-author {
      font-size: 14px;
    }
  }
}

.info {
  font-size: 16px;
  line-height: 2.5;
  padding: 20rpx;

  .info-column {

    .right {
      float: right;
    }
  }
}

.tags {

  .tag {
    font-size: 14px;
    display: inline-block;
    padding: 5rpx 10rpx;
    color: #ea5149;
    border: 1px solid #ea5149;
    border-radius: 10px;
    margin: 10rpx;
  }
}

.paragraphs {
  font-size: 16px;
  padding: 20rpx;

  .paragraph {
    text-indent: 2em;
    line-height: 1.5;
  }
}
</style>
