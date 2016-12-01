<template lang="html">
  <popup class="forward popup-wrapper" :show.sync="showForward">
    <span slot="title">转发微博</span>
    <div class="popup-body" slot="body">
      <publish-container :is-popup="true" :is-forward="true" :is-white="true" :weibo.sync="weibo" :current-user="currentUser" v-ref:publish-container></publish-container>
    </div>
  </popup>
</template>

<script>
  import popup from './popup';
  import publishContainer from './small-publish';
  export default {
    props: ['currentUser'],
    data(){
      return {
        weibo: {
          user: {}
        },
        showForward: false,
      }
    },
    events: {
      show(weibo){
        this.weibo = weibo;
        this.showForward = true;
        // this.$refs.publishContainer.$emit('forwardShow');
      },
      newWeiboSended(){
        this.showForward = false;
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
  div.popup-body {
    // padding-top: 16px;
    padding-top: 10px;
    padding-bottom: 6px;
  }
</style>
