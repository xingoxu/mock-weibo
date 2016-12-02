<template>
  <div>
    <div class="weibo-wrapper">
      <single-weibo class="weibo-single-weibo" v-for="weibo in timeline" :weibo="weibo" :current-user="currentUser" transition="show-weibo" :keywords="keywords"></single-weibo>
    </div>
  </div>

</template>

<script>
import sendWeiboInput from '../../components/comp/send-weibo-input';
import singleWeibo from '../../components/comp/index-single-weibo';

export default {
  props:['timeline','currentUser','keywords','users'],
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
      margin-bottom: 10px;
    }
  }
</style>
