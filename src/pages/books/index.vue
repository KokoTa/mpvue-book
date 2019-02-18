<template>
  <div>
    {{ name }}
  </div>
</template>

<script>
import { get } from '../../utils/util';

export default {
  data() {
    return {
      name: '我是图书页',
    };
  },
  async created() {
    const res = await get('/weapp/test');
    console.log(res);
  },
};
</script>

<style>
</style>
