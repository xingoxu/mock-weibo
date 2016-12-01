<template>
  <div class="weibo-send-weibo-wrapper" :class="{'white': isWhite}">
    <header class="clrfloat">
      <p class="W_swficon ficon_swtxt" v-if="!isPopup">
        <em class="spac1">有什么新</em>
        <em class="spac2">鲜</em>
        <em class="spac3">事想告诉大家</em>
        <em class="spac4">?</em>
      </p>
      <span class="pull-right hot-weibo" v-show="!isEditing && inputWeibo.length == 0" v-if="!isPopup">
        <a href="">热门话题</a>
        <a href="">热门微博</a>
      </span>
      <span class="pull-right words-total" v-show="inputWeibo.length > 0">
        已输入<span :class="{'red': inputWeibo.length>140}">{{inputWeibo.length}}</span>字
      </span>
      <span class="pull-right length-calc"></span>
    </header>
    <div class="input-wrapper" :class="{'editing': isEditing}">
      <auto-resize-textarea :model.sync="inputWeibo" :init_height="textareaFirstHeight" @focus="isEditing=true" @blur="isEditing=false" :disabled="inputDisabled" @keydown.stop="enterSubmit" @keydown.17="ctrlPressed=true" @keyup.17="ctrlPressed=false"  @keyup.stop="false"></auto-resize-textarea>
      <div class="success-sended-tip" v-show="successSended">
        <i class="icon icon-background send-success"></i>
        <span>发布成功</span>
      </div>
    </div>
    <div class="input-func">
      <div class="multi pull-left">
        <ul>
          <li>表情</li>
          <li>图片</li>
        </ul>
      </div>
      <div class="func pull-right">
        <!--<div class="limits"></div>-->
        <button class="submit" :disabled="!(inputWeibo.length > 0 && inputWeibo.length <= 140) || inputDisabled" @click="submit">发布</button>
      </div>
    </div>
  </div>

</template>

<script>
import autoResizeTextarea from './auto-resize-textarea';
import {app} from '../../common.js';

export default {
  props: ['currentUser','isWhite','isPopup'],
  data () {
    return {
      isEditing: false,
      successSended: false,
      inputWeibo: "",
      inputDisabled: false,
      textareaFirstHeight: 77,
      ctrlPressed: false,
    }
  },
  methods:{
    submit(){
      if(this.inputWeibo.length == 0) return;
      this.inputDisabled = true;


      var weibo = app.weiboFactory(app.currentUser);
      weibo.text = this.inputWeibo;
      weibo.ats = app.getAts(weibo.text);
      //weibo.pics =

      this.$http.post('/weibo',weibo)
        .then((response)=>{
          var data = JSON.parse(response.data);
          weibo.weiboid = data.id;
        })
        .then(()=>{
          this.inputWeibo = '';
          this.successSended = true;
          setTimeout(()=>{
            this.successSended = false;
            this.$dispatch('newWeiboSended',weibo);
            this.inputDisabled = false;
          },2000)//animation 2s
        })
    },
    enterSubmit(event) {
      if(this.ctrlPressed && event.keyCode==13) {
        this.submit();
      }
      event.stopPropagation();
    },
  },
  components: {
    autoResizeTextarea
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.weibo-send-weibo-wrapper {
  padding: 15px 10px 10px;
  background: #323233;
  border-radius: 2px;

  textarea {
    font-size: 14px;
    resize: none;
    padding: 0;
    border: 0;
    width: 100%;
    color: #999;
    &:focus{
      color: #c8c8cc;
    }
  }
  >header {
    line-height:18px;
    height: 21px;
    p {
      margin: 0;
    }
    .ficon_swtxt {
      color: #FFF;
    }
    .words-total {
      color: #999;
      >span {
        font-weight: 700;
        font-size: 22px;
        font-style: italic;
        font-family: Constantia, Georgia;
        &.red {
          color: #f90;
        }
      }
    }
    .hot-weibo a {
      text-decoration: none;
      color: #eb7350;
    }
  }
  .input-wrapper {
    margin-top: 4px;
    padding: 5px;
    border: 1px solid #050505;
    background: #4e4e52;
    position: relative;
    &.editing {
      border-color: #fa7d3c;
    }
  }
  .input-func {
    padding-top: 5px;
    &:after {
      display: block;
      content: '';
      clear: both;
    }
    .multi {
      li {
        display: inline-block;
        margin-right: -4px;
      }
    }
    .func {
      >div,>button {
        display: inline-block;
      }
      >button {
        width: 60px;
        line-height: 29px;
        font-size: 14px;
        padding: 0 10px;
        box-sizing: content-box;
        border-radius: 2px;

        background: #ff8140;
        border: 1px solid #f77c3d;
        color: #fff;
        box-shadow: 0px 1px 2px rgba(0,0,0,0.25);
        cursor: pointer;
        &:hover {
          background: #f7671d;
          border: 1px solid #f06923;
        }
        &[disabled]{
          background: #ffc09f;
          border: 1px solid #fbbd9e;
          box-shadow: none;
          cursor: default;
        }
      }
    }
  }

  &.white {
    background: transparent;
    .words-total {
      color: #808080;
    }
    .input-wrapper {
      background: transparent;
      border-color: #cccccc;
      box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.15) inset;
      &.editing {
        border-color: #fa7d3c;
        box-shadow: none;
      }
      textarea {
        color: #808080;
        &:focus {
          color: #333;
        }
      }
    }
    .success-sended-tip>span {
      color: #333;
    }
  }
}


</style>
