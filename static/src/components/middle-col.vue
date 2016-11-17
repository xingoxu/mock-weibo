<template>
  <div>
    <send-weibo-input class="weibo-send-weibo-wrapper"></send-weibo-input>
    <weibo-homepage-filter></weibo-homepage-filter>
    <div class="weibo-wrapper">
      <single-weibo></single-weibo>
    </div>
  </div>

</template>

<script>
import sendWeiboInput from './comp/send-weibo-input';
import singleWeibo from './comp/single-weibo';

export default {
  data () {
    return {

    }
  },
  components: {
    sendWeiboInput,
    singleWeibo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .weibo-send-weibo-wrapper {
    // margin-bottom: 10px;
  }
</style>
