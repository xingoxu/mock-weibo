<template>
  <div>
    <div class="weibo-wrapper">
      <like class="weibo-like" v-for="like in likes" :like="like" track-by="likeid" :currentUser="currentUser" ></like>
    </div>
  </div>

</template>

<script>
import like from './like-comp';

export default {
  props:['likes','currentUser'],
  data () {
    return {

    }
  },
  events: {

  },
  components: {
    like
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .weibo-send-weibo-wrapper {
    // margin-bottom: 10px;
  }
  .weibo-wrapper {
    .weibo-like {
      margin-bottom: 10px;
    }
  }
</style>
