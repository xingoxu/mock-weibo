<template lang="html">
  <div class="weibo-text">
    <partial name="weiboTextPart"></partial>
  </div>
</template>

<script>
import {emotions} from '../../mockdata/emotions.js';

export default {
  props: ['weiboText','keywords'],
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
      text = text.replace(atRegex,(match)=>{
        console.log(match);
        var username = match.substr(1).trim();
        return `
          <user-card name="${username}">
            <a href="/user/name/${username}"><span>@${username}</span></a>
          </user-card>`.trim();
      });
      var topicRegex = /#[0-9a-zA-Z\u0391-\uFFE5]+#/g;


      if(this.keywords&&this.keywords!=''){
        var htmlCode = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;
        this.keywords = this.keywords.replace(htmlCode,(match)=>{
          var c = match.charCodeAt(0), r = ["&#"];
          c = (c == 0x20) ? 0xA0 : c;
          r.push(c); r.push(";");
          return r.join("");
        });
        console.log(this.keywords);
        text = text.replace(eval(`/${this.keywords}/g`),(match)=>{
          return `<span class="red">${match}</span>`
        });
      }

      for(var i = 0;i<emotions.length;i++){
        text = text.replace(eval(`/\\${emotions[i].text}/g`),(match)=>{
          return `<img src=${emotions[i].src} />`;
        })
      }
      return text;
    }
  },
}
</script>

<style lang="less">
</style>
