<template>
  <div>
    <send-weibo-input></send-weibo-input>
    <weibo-homepage-filter></weibo-homepage-filter>
    <div class="weibo-wrapper">

    </div>
  </div>

</template>

<script>
import sendWeiboInput from './comp/send-weibo-input';

export default {
  data () {
    return {

    }
  },
  components: {
    sendWeiboInput
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
