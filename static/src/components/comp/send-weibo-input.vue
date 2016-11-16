<template>
  <div class="weibo-send-weibo-wrapper">
    <header>
      <p class="W_swficon ficon_swtxt">
        <em class="spac1">有什么新</em>
        <em class="spac2">鲜</em>
        <em class="spac3">事想告诉大家</em>
        <em class="spac4">?</em>
      </p>
      <span class="pull-right hot-weibo" v-show="!isEditing && inputWeibo.length == 0">
        <a href="">热门话题</a>
        <a href="">热门微博</a>
      </span>
      <span class="pull-right words-total" v-show="inputWeibo.length > 0">
        已输入<span>{{inputWeibo.length}}</span>字
      </span>
      <span class="pull-right length-calc"></span>
    </header>
    <div class="input-wrapper" :class="{'editing': isEditing}">
      <textarea v-model="inputWeibo" @keydown="resizeTextArea" @focus="isEditing=true" @blur="isEditing=false"></textarea>
      <div class="success-tip" v-show="successSended">
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
        <button class="submit" disabled="{{inputWeibo.length == 0}}" @click="submit">发布</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      isEditing: false,
      successSended: false,
      inputWeibo: "",
    }
  },
  methods:{
    resizeTextArea(event){
      var textarea = event.target;
      setTimeout(()=>{
        var height = textarea.scrollHeight;
        if(textarea.style.height == height+'px')
          return;
        textarea.style.height = height+'px';
      },0)
    },
    submit(){
      this.successSended = true;
      setTimeout(()=>{
        this.successSended = false;
      },2000)//animation 2s
    },
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
    height: 68px;
    overflow: hidden;
    font-size: 14px;
    resize: none;
    padding: 0;
    border: 0;
    width: 100%;
    background: transparent;
    color: #999;
    &:focus{
      outline: 0;
      color: #c8c8cc;
    }
  }
  >header {
    line-height:18px;
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

    .success-tip {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 42px;
      margin-top: -21px;
      text-align: center;

      >i,>span {
        vertical-align: middle;
      }
      >i {
        animation: successTipIcon 2s ease both;
      }
      >span {
        color: #c8c8cc;
        display: inline-block;
        margin: 0 0 0 10px;
        font-size: 16px;
        line-height: 22px;
        vertical-align: middle;
        animation: successTipText 2s ease both;
      }
      @keyframes successTipIcon {
        0% {
          opacity: 0;
          transform: translateY(-10px);
        }
        10%,90% {
          opacity: 1;
          transform: translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateY(0);
        }
      }
      @keyframes successTipText {
        0%,10% {
          opacity: 0;
          transform: translateX(-15px);
        }
        50%,90% {
          opacity: 1;
          transform: translateX(0px);
        }
        100% {
          opacity: 0;
          transform: translateX(0px);
        }
      }
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
        &[disabled]{
          background: #ffc09f;
          border: 1px solid #fbbd9e;
          box-shadow: none;
        }
      }
    }
  }
}


</style>
