<template lang="html">
  <div class="single-list-weibo">
    <!-- 单条单行微博（评论/转发） -->
    <user-avatar size="30" class="avatar" :src="weibo.user.avatar" :userid="weibo.user.username"></user-avatar>
    <div class="content">
      <div class="weibo-text">
        <user-card>
          <a href="/user/{{weibo.user.userid}}" class="name-title-link">{{weibo.user.username}}</a>
        </user-card>：<weibo-text class="text" :weibo-text="weibo.text"></weibo-text>
      </div>
      <div class="func clrfloat">
        <span class="time">{{weibo.time | showTime}}</span>
        <div class="operation pull-right">
          <ul class="clrfloat">
            <li class="pull-left">
              <span class="line S_line1">
                <a href="javascript:void(0);" class="S_txt1" @click="toggleReplyWrapper">{{isForward ? '转发' : '回复'}}</a>
              </span>
            </li>
            <li class="pull-left">
              <span class="line S_line1">
                <a href="javascript:void(0);" class="S_txt1" :class="{'liked': weibo.liked }" @click="likeComment">
                  <em class="W_ficon ficon_praised S_txt2">ñ</em><em>{{weibo.like>0 ? weibo.like : '赞'}}</em>
                </a>
              </span>
            </li>
          </ul>
        </div>
        <div class="replyWrapper" v-show="showReplyWrapper">
          <publish-container :current-user="currentUser" :weibo="weibo" :is-popup="true" :is-forward="isForward" v-ref:publish-container :is-reply-others="true"></publish-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userAvatar from './normal-user-avatar';
import weiboText from './weibo-text';
import publishContainer from './small-publish';

export default {
  props: ['weibo','isForward','currentUser'],
  data(){
    return {
      showReplyWrapper: false,
    }
  },
  methods: {
    likeComment() {
      //并不只是comment,还有forward
      this.weibo.liked = !this.weibo.liked;
      if(this.weibo.liked){
        this.weibo.like++;
      }
      else {
        this.weibo.like--;
      }
    },
    toggleReplyWrapper() {
      this.$refs.publishContainer.$emit('show');
       this.showReplyWrapper=!this.showReplyWrapper;
    }
  },
  components: {
    weiboText,
    userAvatar,
    publishContainer
  }
}
</script>

<style lang="less">
  .single-list-weibo {
    >.avatar {
      float: left;
      padding-top: 6px;
    }
    >.content {
      margin-left: 40px;
      >.weibo-text{
        font-size: 12px;
        line-height: 23px;
        padding-bottom: 2px;
        a {
          color: #eb7350;
        }
        >.text {
          display: inline;
        }
      }
      .func {
        .operation{
          margin-right: -9px;
          >ul>li{
            > span{
              display: block;
              margin: 2px 0;
              padding: 0 10px;
              border-right: 1px solid #19191a;
              line-height: 12px;
              a {
                color: #c8c8cc;
                position: relative;
                em {
                  font-style: normal;
                }
                em.W_ficon {
                  margin-right: 6px;
                }
                &:hover {
                  color: #eb7350;
                }
                &.liked {
                  .W_ficon {
                    visibility: hidden;
                  }
                  &:before{
                    content: '';
                    display: inline-block;
                    position: absolute;
                    left: -6px;
                    top: -10px;
                    width: 23px;
                    height: 28px;
                    background: url(../../assets/img/steps_praised.png);
                    background-position: right;
                    background-repeat: no-repeat;
                    background-size: 483px 28px;
                    animation: likeStep .65s steps(20) both;
                  }
                }
              }
            }
            &:last-child>span{
              border-right: 0;
            }
          }
        }
        .replyWrapper {
          margin: 8px 0 3px -40px;
          background-color: #323233;
          padding: 16px 0 10px;
          position: relative;
          .tri(){
            position: absolute;
            top: -6px;
            right: 55px;
            content: '';
            width: 0;
            height: 0;
          }
          &:after {
            .tri();
            border-left: 9px solid transparent;
            border-right: 9px solid transparent;
            border-bottom: 6px solid #323233;
          }
        }
      }
    }
  }
</style>
