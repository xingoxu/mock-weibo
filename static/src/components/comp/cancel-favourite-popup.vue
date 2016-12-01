<template lang="html">
  <popup class="cancel-favourite popup-wrapper" :show.sync="showCancelFavouritePopup">
    <span slot="title">取消收藏</span>
    <div class="popup-body-wrapper" slot="body">
      <div class="cancel-favourite-tip">
        <div>
          <i class="icon icon-background questionB"></i>
        </div>
        <div class="text">确定要取消收藏吗</div>
      </div>
      <div class="button-wrapper">
        <button type="button" @click="cancelWeiboFavourite">确定</button>
        <button type="button" @click="showCancelFavouritePopup=false" class="cancel">取消</button>
      </div>
    </div>
  </popup>
</template>

<script>
  import popup from './popup';
  export default {
    data(){
      return {
        weiboID: 0,
        showCancelFavouritePopup: false
      }
    },
    methods: {
      cancelWeiboFavourite(){
        //业务
        var operation = app.operationFactory(app.currentUser.userid);
        operation.weiboid = this.weiboID;
        this.$http.post('/favourite/delete',operation)
          .then(()=>{
            this.$dispatch('weiboFavouritCancelled',this.weiboID);
            this.showCancelFavouritePopup = false;
          });
      }
    },
    events: {
      show(weiboID){
        this.weiboID = weiboID;
        this.showCancelFavouritePopup = true;
      }
    },
    components: {
      popup,
    }
  }
</script>

<style lang="less">
  .cancel-favourite.popup-wrapper{
    .popup-body {
      padding-bottom: 0;
    }
    div.cancel-favourite-tip {
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
        &.cancel {
          background: #FFF;
          color: #333;
          border-color: #d9d9d9;
          &:hover {
            border-color: #cccccc;
            background: #FFF;
          }
        }
        &:hover {
          background: #f7671d;
          border: 1px solid #f06923;
        }
      }
    }
  }
</style>
