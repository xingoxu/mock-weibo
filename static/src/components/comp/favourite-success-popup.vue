<template lang="html">
  <popup class="favourite popup-wrapper" :show.sync="showFavouriteSuccess">
    <span slot="title">收藏</span>
    <div class="popup-body" slot="body">
      <div class="favourite-success-tip">
        <div>
          <i class="icon icon-background send-success"></i>
        </div>
        <div>收藏成功</div>
      </div>
      <div class="button-wrapper">
        <button type="button">确定</button>
      </div>
    </div>
  </popup>
</template>

<script>
  import popup from './popup';
  export default {
    data(){
      return {
        showFavouriteSuccess: false
      }
    },
    events: {
      show(weibo){
        this.showFavouriteSuccess = true;
      }
    },
    components: {
      popup,
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
