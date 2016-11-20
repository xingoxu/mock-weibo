<template lang="html">
  <div class="index-weibo-single-weibo">
    <single-weibo class="single-weibo-component" @click="showForward=true" :weibo="weibo" :is-single-weibo="false"></single-weibo>
    <expand-operation class="comment expand-operation-wrapper" v-show="showCommentWrapper">
      <div class="container" v-show="commentLoaded">
        <publish-container></publish-container>
        <div class="comment-list">
          <ul>
            <li>
              <comment></comment>
            </li>
          </ul>
        </div>
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

export default {
  props: ['weibo','currentUser'],
  data() {
    return {
      showCommentWrapper: false,
      commentLoaded: false,
    }
  },
  events: {
    expandComment(){
      this.showCommentWrapper = true;
      // 请求comment数据
      setTimeout(()=>{
        this.commentLoaded = true;
      },3000);
    },
    closeComment(){
      this.showCommentWrapper = false;

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
