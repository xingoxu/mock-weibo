<template>
  <div>
    <div class="weibo-hot-topic">
      <header>
        <span>热门话题</span>
        <button class="pull-right" @click="(++topicPageNow)>= hotTopicPages.length ? topicPageNow=0 : topicPageNow"><em class="W_ficon ficon_rotate S_ficon">e</em>换一换</button>
      </header>
      <ul>
        <li v-for="hotTopicPage in hotTopicPages" v-show="$index == topicPageNow" transition="right-hot-topic" class="hot-topic-page" >
          <ul>
            <li v-for="hotTopic in hotTopicPage" class="topic">
              <a href="/search?keywords={{hotTopic.text}}">#{{hotTopic.text}}#</a>
              <span class="pull-right">{{getFuzzyNumber(hotTopic.number)}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {hotTopic} from '../../mockdata/commonData.js';

export default {
  props: ['currentUser'],
  data () {

    var topicPerPage = 5;
    var hotTopicReComp = [];
    var hotTopicPage = [];
    for (var i = 0; i < hotTopic.length; i++) {
      if(i%topicPerPage == 0 && hotTopicPage.length>0){
        hotTopicReComp.push(hotTopicPage);
        hotTopicPage = [];
      }
      hotTopicPage.push(hotTopic[i]);
    }
    if(hotTopicPage.length>0)
      hotTopicReComp.push(hotTopicPage);

    return {
      hotTopicPages: hotTopicReComp,
      topicPageNow: 0,
    }
  },
  methods: {
    getFuzzyNumber(number){
      if(number>=100000000){
        return (number/100000000).toFixed(1)+'亿';
      }
      if(number>10000){
        return (number/10000)+'万';
      }
      return number;
    }
  }
}
</script>

<style lang="less">
  .weibo-hot-topic {
    background: #323233;
    border-radius: 2px;
    color: #c8c8cc;
    overflow: hidden;
    a {
      color: #c8c8cc;
      &:hover {
        color: #eb7350;
      }
    }
    >header {
      line-height: 38px;
      padding: 0 16px;
      border-bottom: 1px solid #282829;
      >span {
        font-size: 14px;
        font-weight: bold;
      }
      >button {
        background: transparent;
        border: 0;
        line-height: 38px;
        padding: 0;
        font-size: 12px;
        color: #c8c8cc;
        &:hover {
          cursor: pointer;
          color: #eb7350;
          >em {
            color: #eb7350;
          }
        }
        >em {
          font-size: 14px;
          margin-right: 6px;
          vertical-align: middle;
        }
      }
    }
    >ul{
      position: relative;
      padding: 0 16px;
      height: 171px; //子元素position absolute，只能定死line-height并测量
    }
    .hot-topic-page {
      width: ~"calc(100% - 32px)";
      .topic {
        line-height: 1.3;
        margin: 16px 0;
        // padding: 8px 0 5px;
        .pull-right {
          color: #999;
        }
      }
    }

  }
  .right-hot-topic-transition {
    transition: .3s all ease;
    opacity: 1;
    transform: translateX(0);
    position: absolute;
  }
  .right-hot-topic-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .right-hot-topic-leave  {
    opacity: 0;
    transform: translateX(-100%);
  }
</style>
