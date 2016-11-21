<template lang="html">
  <div class="index-weibo-single-weibo">
    <single-weibo class="single-weibo-component" @click="showForward=true" :weibo="weibo" :is-single-weibo="false"></single-weibo>
    <expand-operation class="comment expand-operation-wrapper" v-show="showCommentWrapper">
      <div class="container" v-show="commentLoaded">
        <publish-container :current-user="currentUser" :weibo="weibo"></publish-container>
        <div class="comment-list">
          <ul>
            <li v-for="comment in comments.comments" >
              <comment :weibo="comment" :is-forward="false"></comment>
            </li>
          </ul>
        </div>
        <a href="/weibo/{{weibo.weiboid}}" class="WB_cardmore S_txt1 S_line1 more" v-if="comments.total > 10">
          <span class="more_txt">后面还有{{comments.total - 10}}条评论，点击查看<i class="W_ficon ficon_arrow_right S_ficon">a</i></span>
        </a>
      </div>
      <div class="loading-container" v-show="!commentLoaded">
        <div class="empty_con clearfix"> <p class="text"><i class="W_loading"></i>正在加载，请稍候...</p> </div>
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

export default {
  props: ['weibo','currentUser'],
  data() {
    return {
      showCommentWrapper: false,
      commentLoaded: false,
      comments: {},
    }
  },
  events: {
    expandComment(){
      this.showCommentWrapper = true;
      if(!this.commentLoaded) {
        // 请求comment数据
        setTimeout(()=>{
          this.comments = comments;
          this.commentLoaded = true;
        },3000);
      }
    },
    closeComment(){
      this.showCommentWrapper = false;

    },
    newCommentSended(comment) {
      this.comments.comments.unshift(comment);
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
      padding: 16px 0 0;
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
      padding: 0 20px 0 70px;
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
        }
      }
    }
  }
</style>
