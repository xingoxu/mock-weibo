<template>
  <div>
    <div class="user-wrapper" v-if="users && users.length>0">
      <user-list :users="users"></user-list>
    </div>
    <div class="weibo-wrapper">
      <single-weibo class="weibo-single-weibo" v-for="weibo in timeline" :weibo="weibo" :current-user="currentUser" transition="show-weibo" :keywords="keywords"></single-weibo>
    </div>
  </div>

</template>

<script>
import sendWeiboInput from '../../components/comp/send-weibo-input';
import singleWeibo from '../../components/comp/index-single-weibo';
import userList from '../../components/comp/search-user-list';

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
    singleWeibo,
    userList
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
  .user-wrapper {
    margin-bottom: 10px;
    background-color: #323233;
  }
</style>
