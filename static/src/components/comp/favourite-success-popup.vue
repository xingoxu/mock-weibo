<template lang="html">
  <popup class="favourite popup-wrapper" :show.sync="showFavouriteSuccess">
    <span slot="title">收藏</span>
    <div class="popup-body-wrapper" slot="body">
      <div class="favourite-success-tip">
        <div>
          <i class="icon icon-background send-success"></i>
        </div>
        <div class="text">收藏成功</div>
      </div>
      <div class="button-wrapper">
        <button type="button" @click="showFavouriteSuccess=false">确定</button>
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
      show(){
        this.showFavouriteSuccess = true;
      }
    },
    components: {
      popup,
    }
  }
</script>

<style lang="less">
  .favourite.popup-wrapper{
    .popup-body {
      padding-bottom: 0;
    }
    div.favourite-success-tip {
      padding: 10px 0 20px;
      text-align: center;
      font-size: 14px;
      .text {
        margin-top: 16px;
      }
    }
    .button-wrapper {
      background-color: #f2f2f5;
      padding: 10px 0;
      text-align: center;
      >button {
        padding: 0 10px 0 10px;
        border-radius: 2px;
        line-height: 25px;
        font-size: 12px;
        min-width: 40px;
        color: #fff;
        color: #eb7350;
        background: #ff8140;
        border: 1px solid #f77c3d;
        color: #fff;
        box-shadow: 0px 1px 2px rgba(0,0,0,0.25);
        box-sizing: content-box;
        cursor: pointer;
        &:hover {
          background: #f7671d;
          border: 1px solid #f06923;
        }
      }
    }
  }
</style>
