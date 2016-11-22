<template>
  <div>
    <div class="weibo-wrapper">
      <single-weibo class="weibo-single-weibo" :weibo="timeline[0]" :current-user="currentUser" transition="show-weibo"></single-weibo>
    </div>
  </div>

</template>

<script>
import sendWeiboInput from '../../components/comp/send-weibo-input';
import singleWeibo from '../../components/comp/comment-single-weibo';

export default {
  props:['timeline','currentUser'],
  data () {
    return {

    }
  },
  events: {
    newWeiboSended(weibo){
      this.timeline.unshift(weibo);
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
  .weibo-wrapper {
    .weibo-single-weibo {
    }
  }
</style>
