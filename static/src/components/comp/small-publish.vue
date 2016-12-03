<template lang="html">
  <div class="publish-container" :class="{'transparent': isWhite, 'forward': isForward, 'popup':isPopup }" >
    <user-avatar size="30" class="avatar" v-if="!isPopup && !isForward" :src="currentUser.avatar" :userid="currentUser.userid"></user-avatar>
    <div class="right">
      <div class="input-wrapper" :class="{'focus': commentInputFocus}">
        <autoresize-textarea :init_height="isForward ? 48 : 20" @focus="commentInputFocus=true" @blur="commentInputFocus=false" :placeholder="isForward ? '请输入转发理由' : false" :model.sync="inputWeibo" :disabled="inputDisabled" @keydown.stop="enterSubmit" @keydown.17="ctrlPressed=true" @keyup.17="ctrlPressed=false"  @keyup.stop="false" ></autoresize-textarea>

        <span class="word-tip" :class="{'red': inputWeibo.length>140}" v-if="isForward">
          <span>{{140 - inputWeibo.length}}</span>
        </span>
        <div class="success-sended-tip" v-show="successSended" v-if="isForward">
          <i class="icon icon-background send-success"></i>
          <span>发布成功</span>
        </div>
      </div>
      <div class="publish-options clrfloat">
        <div class="pull-right">
          <button type="button" @click="submit" :disabled="!(inputWeibo.length>0&&inputWeibo.length<=140) || inputDisabled">
            <i class="W_loading" v-show="inputDisabled"></i>
            <span v-show="inputDisabled">
              {{isForward ? '转发中...' : '评论中...'}}
            </span>
            <span v-show="!inputDisabled">
              {{isForward ? '转发' : '评论'}}
            </span>
          </button>
        </div>
        <div class="options clrfloat">
          <span class="icons pull-left">
            <!-- <a href="#">表情</a> -->
            <emotion></emotion>

          </span>
          <div class="selections pull-left">
            <ul>
              <li v-if="isForward">
                <label>
                  <input type="checkbox" v-model="alsoComment" />
                  <span>同时评论给{{weibo.user.username}}</span>
                </label>
              </li>
              <li v-if="!isForward">
                <label>
                  <input type="checkbox" v-model="alsoForward" />
                  <span>同时转发到我的微博</span>
                </label>
              </li>
              <li v-if="weibo.forwardWeibo">
                <label>
                  <input type="checkbox" v-model="alsoCommentForward"/>
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
  import emotion from '../emtion';
  import {app} from '../../common.js';

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
      isReplyOthers: Boolean,
      currentUser: Object,
      commentid: null,
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
        inputWeibo: '',
        commentInputFocus: false,
        successSended: false,
        inputDisabled: false,
        alsoComment: false,
        alsoForward: false,
        alsoCommentForward: false,
      }
    },
    methods:{
      submit(){
        if(this.isForward){
          this.submitForward();
          if(this.alsoComment){
            this.submitComment();
          }
        }
        else{
          this.submitComment();
          if(this.alsoForward){
            this.submitForward();
          }
        }
        if(this.alsoCommentForward){
          this.submitCommentForward();
        }
      },
      submitForward(){
        if(this.inputWeibo.length == 0) return;
        this.inputDisabled = true;


        var weibo = app.weiboFactory(app.currentUser);
        weibo.text = this.inputWeibo;
        weibo.ats = app.getAts(weibo.text);
        weibo.forward_weiboid = this.weibo.forwardWeibo ? this.weibo.forwardWeibo.weiboid : this.weibo.weiboid;

        //weibo.pics =

        this.$http.post('/weibo',weibo)
          .then((response)=>{
            var data = JSON.parse(response.data);
            weibo.weiboid = data.id;
          })
          .then(()=>{
            this.weibo.forward++;
            this.inputWeibo = '';
            this.successSended = true;
            weibo.forwardWeibo = this.weibo.forwardWeibo ? this.weibo.forwardWeibo : this.weibo;
            setTimeout(()=>{
              this.successSended = false;
              this.$dispatch('newWeiboSended',weibo);
              this.inputDisabled = false;
            },2000)//animation 2s
          })
      },
      submitComment(){
        if(this.inputWeibo.length == 0) return;
        this.inputDisabled = true;

        var comment = app.commentFactory(app.currentUser);
        comment.weiboid = this.weibo.weiboid;
        if(this.isReplyOthers)
          comment.comment_commentid = this.commentid;
        comment.text = this.inputWeibo;
        // comment.ats = app.getAts(comment.text);
        this.$http.post('/comment',comment)
          .then((response)=>{
            comment.commentid = JSON.parse(response.data).id;
            this.inputWeibo = '';
            this.successSended = true;
            this.$dispatch('newCommentSended',comment);
            this.inputDisabled = false;
          })

      },
      submitCommentForward(){
        var comment = app.commentFactory(app.currentUser);
        comment.weiboid = this.weibo.forwardWeibo.weiboid;
        comment.text = this.inputWeibo;
        comment.ats = app.getAts(comment.text);
        this.$http.post('/comment',comment);
      },
      enterSubmit(event) {
        if(this.ctrlPressed && event.keyCode==13) {
          this.submit();
        }
        event.stopPropagation();
      },
    },
    events: {
      show(){
        setTimeout(()=>{
          if(this.isForward){
            this.inputWeibo = `//@${this.weibo.user.username} : ${this.weibo.text}`;
          }
          else {
            this.inputWeibo = `回复@${this.weibo.user.username} :`;
          }
        }, 0);
      },
      emotion(text){
        this.inputWeibo += text;
      }
    },
    watch: {
      weibo(weibo,old){
        if(weibo.forwardWeibo)
          this.inputWeibo = `//@${weibo.user.username} : ${weibo.text}`;
        else
          this.inputWeibo = '转发微博';
      }
    },
    components: {
      autoresizeTextarea,
      userAvatar,
      emotion,
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
        >.W_loading {
          position: relative;
          top: -1px;
          margin: 0 5px 0 0;
        }
      }
      .emotion-wrapper {
        margin-right: 10px;
        .emotion-link {
          line-height: 18px;
          color: #000;
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
      >.right {
        padding-left: 0;
      }
    }
  }
</style>
