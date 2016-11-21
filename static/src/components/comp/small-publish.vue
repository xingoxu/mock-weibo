<template lang="html">
  <div class="publish-container" :class="{'transparent': isWhite, 'forward': isForward, 'popup':isPopup }" >
    <user-avatar size="30" class="avatar" v-if="!isPopup && !isForward" :src="currentUser.avatar" :userid="currentUser.userid"></user-avatar>
    <div class="right">
      <div class="input-wrapper" :class="{'focus': commentInputFocus}">
        <autoresize-textarea :init_height="isForward ? 48 : 20" @focus="commentInputFocus=true" @blur="commentInputFocus=false" :placeholder="isForward ? '请输入转发理由' : false" :model.sync="text"></autoresize-textarea>
        <span class="word-tip" :class="{'red': text.length>140}" v-if="isForward">
          <span>{{140 - text.length}}</span>
        </span>
        <div class="success-sended-tip" v-show="successSended" v-if="isForward">
          <i class="icon icon-background send-success"></i>
          <span>发布成功</span>
        </div>
      </div>
      <div class="publish-options clrfloat">
        <div class="pull-right">
          <button type="button" @click="submit" :disabled="!(text.length>0&&text.length<=140)">{{isForward ? '转发' : '评论'}}</button>
        </div>
        <div class="options clrfloat">
          <span class="icons pull-left">
            <a href="#">表情</a>
          </span>
          <div class="selections pull-left">
            <ul>
              <li v-if="isForward">
                <label>
                  <input type="checkbox" />
                  <span>同时评论给{{weibo.user.username}}</span>
                </label>
              </li>
              <li v-if="!isForward">
                <label>
                  <input type="checkbox" />
                  <span>同时转发到我的微博</span>
                </label>
              </li>
              <li v-if="weibo.forwardWeibo">
                <label>
                  <input type="checkbox" />
                  <span>同时评论给原文作者{{weibo.forwardWeibo.user.username}}</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import autoresizeTextarea from './auto-resize-textarea';
  import userAvatar from './normal-user-avatar';
  export default {
    /**
     * isWhite 使其变成透明背景
     * isPopup 表示其在Popup下工作
     * isForward 表示其是转发功能
     **/
    props: {
      isWhite: Boolean,
      isPopup: Boolean,
      isForward: Boolean,
      currentUser: Object,
      weibo: {
        type: Object,
        default(){
          return {
            user: {

            },
          }
        }
      }
    },
    data(){
      return {
        text: '',
        commentInputFocus: false,
        successSended: false,
      }
    },
    methods:{
      submit(){
        this.successSended = true;
        setTimeout(()=>{
          this.successSended = false;
        },2000)//animation 2s
      },
    },
    components: {
      autoresizeTextarea,
      userAvatar
    }
  }
</script>

<style lang="less">
  .publish-container {
    padding: 0 20px;
    >.avatar {
      float: left;
    }
    >.right {
      padding-left: 50px;
    }
    .input-wrapper {
      padding: 5px 6px 0px;
      border: 1px solid #050505;
      background: #4e4e52;
      margin-bottom: 10px;
      &.focus {
        border-color: #fa7d3c;
      }
      textarea {
        width: 98%;
        line-height: 18px;
        font-size: 12px;
        height: 20px;
        color: #999;
        &:focus {
          color: #c8c8cc;
        }
      }
    }
    .publish-options {
      .selections {
        li {
          margin-bottom: 5px;
        }
        label {
          display: block;
          line-height: normal;
          input {
            margin: 2px 0 0 ;
          }
          input,span {
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
      button {
        padding: 0 10px 0 10px;
        white-space: nowrap;
        display: inline-block;
        border-radius: 2px;
        height: 24px;
        text-decoration: none;
        font-size: 12px;
        min-width: 40px;
        box-sizing: content-box;

        background: #ff8140;
        border: 1px solid #f77c3d;
        color: #fff;
        box-shadow: 0px 1px 2px rgba(0,0,0,0.25);
        cursor: pointer;
        &:hover {
          background: #f7671d;
          border: 1px solid #f06923;
        }
        &[disabled] {
          background: #ffc09f;
          color: #fff;
          border: 1px solid #fbbd9e;
          box-shadow: none;
          cursor: default;
        }
      }
    }

    &.transparent {
      .success-sended-tip>span {
        color: #333;
      }
      .input-wrapper {
        border: 1px solid #cccccc;
        background: transparent;
        &.focus {
          border-color: #fa7d3c;
        }
        textarea {
          color: #808080;
          &:focus {
            color: #333;
          }
        }
      }
    }
    &.forward {
      .input-wrapper {
        padding: 5px 6px 25px;
        position: relative;
        .word-tip {
          position: absolute;
          color: #808080;
          right: 12px;
          bottom: 7px;
          line-height: 18px;
          &.red {
            color: #f00;
          }
        }
      }
      >.right {
        padding-left: 0;
      }
    }
    &.popup {
      padding: 0 16px;
    }
  }
</style>
