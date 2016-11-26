<template lang="html">
  <div class="weibo-single-like-wrapper">
    <div class="upper">
      <div class="avatar">
        <user-avatar size="50" :src="like.user.avatar" :userid="like.user.userid"></user-avatar>
      </div>
      <div class="right">
        <div class="nickname-title">
          <user-card :userid="like.user.userid">
            <a href="/user/{{like.user.userid}}" class="name-title-link">{{like.user.username}}</a>
          </user-card>
          <span class="text">赞了我的{{like.weibo ? '微博':'评论'}}</span>
        </div>
        <!-- 扩展here （评论微博/评论） -->
        <div class="extend like-weibo" v-if="like.weibo">
          <div class="content-wrapper">
            <div class="weibo-text-content">
              <user-card :userid="like.user.userid">
                <a href="/user/{{like.user.userid}}" class="name-title-link">@{{like.user.username}}</a>
              </user-card>
              ：<a href="/weibo/{{like.weibo.weiboid}}">{{like.weibo.text}}</a>
            </div>
          </div>
        </div>
        <div class="extend like-comment" v-if="like.comment">
          <div class="content-wrapper">
            <div class="weibo-text-content">
              <user-card :userid="like.user.userid">
                <a href="/user/{{like.user.userid}}" class="name-title-link">@{{like.user.username}}</a>
              </user-card>
              ：<a href="/weibo/{{like.comment.weiboid}}">{{like.comment.text}}</a>
            </div>
          </div>
        </div>
        <div class="time">
          <a href="/weibo/{{like.weibo ? like.weibo.weiboid : like.comment.weiboid }}">{{like.time | showTime}}</a>
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
  props: ['like','currentUser'],
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
  .weibo-single-like-wrapper {
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
      span.text {
        color: #999;
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
          .name-title-link {
            color: #eb7350;
          }
        }
      }
      .name-title-link {
        color: #eb7350;
      }
    }
  }
</style>
