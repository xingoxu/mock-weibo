<template>
  <div>
    <div class="weibo-wrapper">
      <comment class="weibo-comment" v-for="comment in comments" :comment="comment" track-by="commentid"></comment>
    </div>
  </div>

</template>

<script>
import comment from './comment-comp';

export default {
  props:['comments','currentUser'],
  data () {
    return {

    }
  },
  events: {

  },
  components: {
    comment
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .weibo-send-weibo-wrapper {
    // margin-bottom: 10px;
  }
  .weibo-wrapper {
    .weibo-comment {
      margin-bottom: 10px;
    }
  }
</style>
