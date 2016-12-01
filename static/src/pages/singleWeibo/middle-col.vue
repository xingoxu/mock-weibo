<template>
  <div>
    <div class="weibo-wrapper">
      <single-weibo class="weibo-single-weibo" :weibo="weibo" :current-user="currentUser" transition="show-weibo"></single-weibo>
    </div>
  </div>

</template>

<script>
import sendWeiboInput from '../../components/comp/send-weibo-input';
import singleWeibo from '../../components/comp/comment-single-weibo';

export default {
  props:['weibo','currentUser'],
  data () {
    return {

    }
  },
  events: {

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
  .weibo-wrapper {
    .weibo-single-weibo {
    }
  }
</style>
