<template>
  <div class="weibo-send-weibo-wrapper">
    <header>
      <p class="W_swficon ficon_swtxt">
        <em class="spac1">有什么新</em>
        <em class="spac2">鲜</em>
        <em class="spac3">事想告诉大家</em>
        <em class="spac4">?</em>
      </p>
      <span class="pull-right hot-weibo">
        <a href="">热门话题</a>
        <a href="">热门微博</a>
      </span>
      <span class="pull-right length-calc"></span>
    </header>
    <div class="input-wrapper">
      <textarea cols="30" rows="10" v-model="inputWeibo" @keydown="resizeTextArea"></textarea>
      <div class="success-tip">
        <i class="send-success"></i>
        <span>发布成功</span>
      </div>
    </div>
    <div class="input-func">
      <div class="multi">
        <ul>
          <li>表情</li>
          <li>图片</li>
        </ul>
      </div>
      <div class="func pull-right">
        <!--<div class="limits"></div>-->
        <button class="submit">发布</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods:{
    resizeTextArea(event){
      var textarea = event.target;
      textarea.style.height = textarea.scrollHeight+'px';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
