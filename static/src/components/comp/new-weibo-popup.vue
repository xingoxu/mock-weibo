<template lang="html">
  <popup class="new-weibo popup-wrapper" :show.sync="showPopup">
    <span slot="title">有什么新鲜事想告诉大家？</span>
    <div class="popup-body-wrapper" slot="body">
      <publish-container :is-popup="true" :is-white="true" :current-user="currentUser"></publish-container>
    </div>
  </popup>
</template>

<script>
  import popup from './popup';
  import publishContainer from './send-weibo-input';
  export default {
    props: ['currentUser'],
    data(){
      return {
        showPopup: false,
      }
    },
    events: {
      show(){
        this.showPopup = true;
      },
      newWeiboSended(weibo){
        this.showPopup = false;
        return true;
      }
    },
    components: {
      popup,
      publishContainer
    }
  }
</script>

<style lang="less">
  div.popup-body-wrapper {
    margin-top: -16px;
    margin-bottom: -6px;
    // padding-top: 16px;
    // padding-top: 10px;
    // padding-bottom: 6px;
  }
</style>
