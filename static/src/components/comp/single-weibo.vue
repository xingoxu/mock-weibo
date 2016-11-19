<template lang="html">
  <div class="weibo-single-weibo">
    <div class="upper">
      <div class="avatar">
        <user-avatar size="50"></user-avatar>
      </div>
      <div class="right">
        <div class="nickname-title">
          <user-card>
            <a href="#" class="name-title-link">xingo</a>
          </user-card>
        </div>
        <div class="weibo-text-content">
          <weibo-text weibo-text="今天是个好天气@测试"></weibo-text>
        </div>
        <!-- 扩展here （图片/转发） -->
        <div class="time">
          <a href="#">7分钟前</a>
        </div>
      </div>
    </div>
    <div class="lower">
      <operation class="operation"></operation>
    </div>
  </div>
</template>

<script>
import weiboText from './weibo-text';
import userAvatar from './normal-user-avatar';
import operation from './single-weibo-bottom-operation';
export default {
  components: {
    weiboText,
    userAvatar,
    operation
  }
}
</script>

<style lang="less">
  .weibo-single-weibo {
    background-color: #323233;
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
    border-radius: 2px;
    >.upper {
      padding: 20px 20px 4px;
      >.avatar {
        width: 50px;
        float: left;
      }
      .right {
        padding-left: 60px;
      }
    }
    >.lower {
      >.operation {
        border-top: 1px solid #282829;
      }
    }
    .nickname-title {
      margin: 0 0 7px;
      padding: 5px 0 0;
      .name-title-link {
        font-size: 14px;
        font-weight: bold;
        color: #c8c8cc;
        &:hover {
          color: #eb7350;
        }
      }
    }
    .weibo-text-content {
      font-size: 14px;
      padding: 1px 0 0;
      // overflow: hidden;
      line-height: 23px;
      word-wrap: break-word;
      margin-bottom: 2px;
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
  }
</style>
