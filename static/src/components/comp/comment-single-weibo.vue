<template lang="html">
  <div class="index-weibo-single-weibo">
    <single-weibo class="single-weibo-component" @click="showForward=true" :weibo="weibo" :is-single-weibo="true"></single-weibo>
    <expand-operation class="comment expand-operation-wrapper" v-show="showCommentWrapper">
      <div class="container" v-show="commentLoaded">
        <publish-container :current-user="currentUser" :weibo="weibo" :is-popup="true"></publish-container>
        <div class="comment-list">
          <ul>
            <li v-for="comment in comments.comments" >
              <comment :weibo="comment" :is-forward="false" :current-user="currentUser"></comment>
            </li>
            <li class="WB_innerwrap no-comment" v-if="comments.total == 0">
              <div class="empty_con clearfix">
                <p class="icon_bed"><i class="W_icon icon_warnB icon icon-background"></i></p>
                <p class="text">还没有人评论，赶快抢个沙发</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!commentLoaded">
        <div class="empty_con clearfix"> <p class="text"><i class="W_loading"></i>正在加载，请稍候...</p> </div>
      </div>
    </expand-operation>
    <expand-operation class="forward expand-operation-wrapper" v-show="showForwardWrapper">
      <div class="container" v-show="forwardLoaded">
        <publish-container :current-user="currentUser" :weibo="weibo" :is-popup="true"></publish-container>
        <div class="comment-list">
          <ul>
            <li v-for="comment in forwards.forwards" >
              <comment :weibo="comment" :is-forward="true" :current-user="currentUser"></comment>
            </li>
            <li class="WB_innerwrap no-comment" v-if="forwards.total == 0">
              <div class="empty_con">
                <p class="icon_bed"><i class="W_icon icon_warnB icon icon-background"></i></p>
                <p class="text">还没有人转发，赶快分享给你的好友</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!forwardLoaded">
        <div class="empty_con"> <p class="text"><i class="W_loading"></i>正在加载，请稍候...</p> </div>
      </div>
    </expand-operation>
  </div>
</template>

<script>
import singleWeibo from './single-weibo';
import expandOperation from './expand-operation-wrapper';
import comment from './single-list-weibo';
import publishContainer from './small-publish';
import {comments} from '../../mockdata/commentsData.js';
import {forwards} from '../../mockdata/forwardsData.js';

export default {
  props: ['weibo','currentUser'],
  data() {
    return {
      showCommentWrapper: false,
      showForwardWrapper: false,
      commentLoaded: false,
      forwardLoaded: false,
      forwards: {},
      comments: {
        total: 0,
        comments: [],
      },
    }
  },
  events: {
    expandComment(){
      this.showCommentWrapper = true;
      this.showForwardWrapper = false;
      if(!this.commentLoaded) {
        // 请求comment数据
        // setTimeout(()=>{
        //   this.comments = comments;
        //   this.commentLoaded = true;
        // },3000);
        this.$http.get(`/comments/${this.weibo.weiboid}`)
          .then((response)=>{
            var data = response.data;
            if(data==null)
              data={
                comments: [],
                total: 0,
              };
            this.comments = data;
            this.commentLoaded = true;
          });
      }
    },
    closeComment(){
      this.showCommentWrapper = false;
    },
    expandForward(){
      this.showCommentWrapper = false;
      this.showForwardWrapper = true;
      if(!this.forwardLoaded) {
        // // 请求comment数据
        // setTimeout(()=>{
        //   this.forwards = forwards;
        //   this.forwardLoaded = true;
        // },3000);
        this.$http.get(`/forwards/${this.weibo.weiboid}`)
          .then((response)=>{
            var data = response.data;
            if(data==null)
              data={
                forwards: [],
                total: 0,
              };
            this.forwards = data;
            this.forwardLoaded = true;
          });
      }
    },
    newCommentSended(comment) {
      this.comments.comments.unshift(comment);
    },
    newWeiboSended() {

    }
  },
  components: {
    singleWeibo,
    expandOperation,
    comment,
    publishContainer
  },
}
</script>

<style lang="less">
  .expand-operation-wrapper {
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    .container {
      padding: 16px 0 6px;
      margin-top: -1px;
      border-top: 1px solid #19191a;
      >a.more {
        display: block;
        text-align: center;
        line-height: 35px;
        color: #c8c8cc;
        i {
          color: #c8c8cc;
          font-style: normal;
        }
        &:hover {
          color: #eb7350;
          i {
            color: #eb7350;
          }
        }
      }
    }
    .loading-container {
      margin-top: -1px;
      border-top: 1px solid #19191a;
      text-align: center;
      padding: 16px;
      font-size: 14px;
      line-height: 18px;
      p {
        margin: 0;
      }
      .W_loading {
        margin-right: 5px;
      }
    }
    .comment-list {
      padding: 0 20px;
      margin-top: 6px;
      >ul {
        border-top: 1px solid #19191a;
        padding-top: 12px;
        >li {
          padding: 5px 0 7px;
          border-bottom: 1px solid #19191a;
          &:first-child {
            padding-top: 0;
          }
          &:last-child {
            border-bottom: 0;
          }
          &.no-comment {
            padding: 16px;
            text-align: center;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
