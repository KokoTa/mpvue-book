<template>
  <div v-if="list.length" class="comment-list">
    <div class="title">评论列表</div>
    <div v-for="(item, index) in list" class="comment" :key="index" @click="handleCommentClick(item)">
      <div class="info">
        {{ item.location || '未知位置' }} - {{ item.phone || '未知型号' }}
      </div>
      <div class="author">
        <image class="image" :src="item.user_info.avatarUrl" mode="aspectFit"></image>
        <span class="name">{{ item.user_info.nickName }}</span>
      </div>
      <div class="content">
        {{ item.comment }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      defualt: []
    },
    type: {
      type: String
    }
  },
  methods: {
    handleCommentClick (comment) {
      if (this.type === 'user') {
        wx.navigateTo({
          url: `/pages/bookDetail/main?id=${comment.bookid}`
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-list {
  font-size: 14px;
  .title {
    background: #eee;
    padding: 20rpx;
  }
  .comment {
    padding: 20rpx;
    border-bottom: 1px solid #eee;
    .author {
      .image {
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        vertical-align: middle;
      }
      .name {
        margin-left: 10rpx;
      }
    }
    .info {
      float: right;
    }
    .content {
      font-size: 14px;
      padding-top: 20rpx;
    }
  }
}
</style>
