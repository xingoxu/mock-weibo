<template lang="html">
  <div class="weibo-single-comment-wrapper">
    <div class="upper">
      <div class="avatar">
        <user-avatar size="50" :src="comment.user.avatar" :userid="comment.user.userid"></user-avatar>
      </div>
      <div class="right">
        <div class="nickname-title">
          <user-card :userid="comment.user.userid">
            <a href="/user/{{comment.user.userid}}" class="name-title-link">{{comment.user.username}}</a>
          </user-card>
        </div>
        <div class="weibo-text-content">
          <weibo-text :weibo-text="comment.text"></weibo-text>
        </div>
        <!-- 扩展here （评论微博/评论） -->
        <div class="extend comment-weibo" v-if="comment.weibo">
          <div class="content-wrapper">
            <div class="weibo-text-content">
              <span class="text">评论我的微博：</span><a href="/weibo/{{comment.weibo.weiboid}}">{{comment.weibo.text}}</a>
            </div>
          </div>
        </div>
        <div class="extend comment-comment" v-if="comment.comment">
          <div class="content-wrapper">
            <div class="weibo-text-content">
              <span class="text">回复我的评论：</span><a href="/weibo/{{comment.comment.weiboid}}">{{comment.comment.text}}</a>
            </div>
          </div>
        </div>
        <div class="time">
          <a href="/weibo/{{comment.weibo ? comment.weibo.weiboid : comment.comment.weiboid }}">{{comment.time | showTime}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import weiboText from '../../components/comp/weibo-text';
import userAvatar from '../../components/comp/normal-user-avatar';
import operation from '../../components/comp/single-weibo-bottom-operation';
export default {
  props: ['comment'],
  ready(){
  },
  methods: {

  },
  components: {
    weiboText,
    userAvatar,
    operation
  }
}
</script>

<style lang="less">
  .weibo-single-comment-wrapper {
    background-color: #323233;
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
    border-radius: 2px;
    font-size: 12px;
    >.upper {
      padding: 10px 16px 10px 10px;
      >.avatar {
        width: 50px;
        float: left;
      }
      .right {
        padding-left: 60px;
        >.forward-weibo {
          >.content-wrapper {
            margin: 0 -20px 0 -80px;
            padding: 4px 20px 1px 80px;
          }
        }
      }
    }
    >.lower {
      >.operation {
        border-top: 1px solid #282829;
      }
    }
    .nickname-title {
      margin: 0 0 10px;
      padding: 5px 0 0;
      font-size: 12px;
      .name-title-link {
        font-weight: bold;
        color: #c8c8cc;
        &:hover {
          color: #eb7350;
        }
      }
    }
    .weibo-text-content {
      font-size: 12px;
      padding: 1px 0 0;
      line-height: 23px;
      word-wrap: break-word;
      margin-bottom: 10px;
      a {
        color: #eb7350;
      }
    }
    .time {
      color: #999;
      padding-top: 5px;
      margin-bottom: 2px;
      a {
        color: #999;
        &:hover {
          color: #eb7350;
        }
      }
    }
    .extend {
      >.content-wrapper {
        background: #232324;
        padding: 5px 16px;
        margin: 0 0 10px;
        .weibo-text-content {
          margin: 0;
          padding: 0;
          span.text {
            color: #999;
          }
          a {
            color: #c8c8cc;
            &:hover {
              color: #eb7350;
            }
          }
        }
      }
    }
  }
</style>
