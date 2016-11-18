<template lang="html">
  <div class="weibo-single-weibo">
    <div>
      <div class="avatar">
        <user-avatar></user-avatar>
      </div>
      <div class="right">
        <div class="nickname-title">
          <user-card>
            <a href="#">xingo</a>
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
  </div>
</template>

<script>
import weiboText from './weibo-text';
export default {
  components: {
    weiboText
  }
}
</script>

<style lang="less">
</style>
