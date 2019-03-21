<template>
  <div class="star">
    <div class="hollow">☆☆☆☆☆</div>
    <div class="solid" :style="style">★★★★★</div>
  </div>
</template>

<script>
export default {
  props: {
    rate: {
      type: [String, Number]
    }
  },
  computed: {
    style () {
      return `width: ${this.rate / 2}em`
    }
  }
}
</script>

<style lang="scss" scoped>
.star {
  text-align: left;
  position: relative;
  display: inline-block;

  .solid {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
  }
}
</style>
