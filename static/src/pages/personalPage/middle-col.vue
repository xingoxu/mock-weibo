<template>
  <div>
    <weibo-homepage-filter></weibo-homepage-filter>
    <div class="weibo-wrapper">
      <single-weibo class="weibo-single-weibo" v-for="weibo in timeline" :weibo="weibo" :current-user="currentUser" transition="show-weibo"></single-weibo>
    </div>
  </div>

</template>

<script>
import singleWeibo from '../../components/comp/index-single-weibo';

export default {
  props:['timeline','currentUser'],
  data () {
    return {

    }
  },
  events: {

  },
  components: {
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
      margin-top: 10px;
    }
  }
  .weibo-single-weibo .forward-weibo .time-func:after {
    clear: right;
  }
</style>
