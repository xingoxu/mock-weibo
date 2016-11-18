<template lang="html">
  <div class="weibo-text">
    <partial name="weiboTextPart"></partial>
  </div>
</template>

<script>
export default {
  props: ['weiboText'],
  partials: {
    weiboTextPart: '<span></span>'
  },
  created(){
    if(this.weiboText){
      this.$options.partials.weiboTextPart = this.compileText(this.weiboText.trim());
    }
  },
  methods: {
    compileText(text){
      //微博字符转换
      var atRegex = /(@[0-9a-zA-Z_\u0391-\uFFE5-]+$)|(@[0-9a-zA-Z_\u0391-\uFFE5-]+\s)/g;
      return text.replace(atRegex,(match)=>{ console.log(match); return `<user-card name="${match.substr(1).trim()}"><span>@${match.substr(1).trim()}</span></user-card>` });
    }
  },
}
</script>

<style lang="less">
</style>
