<template lang="html">
  <popup class="forward popup-wrapper" :show.sync="showForward">
    <span slot="title">转发微博</span>
    <div class="popup-body" slot="body">
      <publish-container :is-popup="true" :is-forward="true" :is-white="true"></publish-container>
    </div>
  </popup>
</template>

<script>
  import popup from './popup';
  import publishContainer from './small-publish';
  export default {
    data(){
      return {
        showForward: false
      }
    },
    events: {
      show(weibo){
        this.showForward = true;
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
