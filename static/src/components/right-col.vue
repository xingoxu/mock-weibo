<template>
  <div>
    <div class="personal-card">
      <div class="upper">
        <a href="/{{currentUser.userid}}" class="avatar"></a>
      </div>
      <div class="lower">
        <div class="name">
          <a href="/{{currentUser.userid}}">{{currentUser.username}}</a>
        </div>
        <div class="status">
          <ul>
            <li v-for="status in cardLowerStatus">
              <a href="/{{currentUser.userid}}/{{status.link}}">
                <strong>{{currentUser[status.key]}}</strong>
                <span>{{status.showText}}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="weibo-hot-topic">
      <header>
        <span>热门话题</span>
        <button class="pull-right" @click="(++topicPageNow)>= hotTopicPages.length ? topicPageNow=0 : topicPageNow"><em class="W_ficon ficon_rotate S_ficon">e</em>换一换</button>
      </header>
      <ul>
        <li v-for="hotTopicPage in hotTopicPages" v-show="$index == topicPageNow" transition="right-hot-topic" class="hot-topic-page" >
          <ul>
            <li v-for="hotTopic in hotTopicPage" class="topic">
              <a href="/topic/{{hotTopic.text}}">#{{hotTopic.text}}#</a>
              <span class="pull-right">{{getFuzzyNumber(hotTopic.number)}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {hotTopic} from '../mockdata/commonData.js';

export default {
  props: ['currentUser'],
  data () {
    var cardLowerStatus = [{
      key: 'following',
      link: 'follow',
      showText: '关注'
    },{
      key: 'fans',
      link: 'fans',
      showText: '粉丝'
    },{
      key: 'weibo',
      link: '',
      showText: '微博'
    }];

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
      cardLowerStatus: cardLowerStatus,
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
  .personal-card {
    background: #323233;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 10px;
    >.upper {
      background-image: url(http://ww2.sinaimg.cn/crop.0.0.920.300.230/6b8bbe7egw1f8iyjjrpmyj20pk08cwg0.jpg);
      background-position: center;
      background-repeat: no-repeat;

      position: relative;
      height: 75px;
      .avatar {
        position: absolute;
        width: 60px;
        height: 60px;
        box-shadow: 0 0 0 3px rgba(255,255,255,0.3);
        border-radius: 50%;

        bottom: 0;
        margin-bottom: -30px;
        left: 50%;
        margin-left: -30px;

        background: url("http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg") center no-repeat;
        background-size: cover;

      }
    }
    >.lower {
      padding:30px 16px 9px 16px;
      .link {
        font-size: 14px;
        font-weight: bold;
        color: #c8c8cc;
        &:hover {
          color: #eb7350;
        }
      }
      >div.name {
        padding-top: 5px;
        text-align: center;
        line-height: 16px;
        a {
          .link();
        }
      }
      >.status {
        margin-top: 10px;
        >ul{
          li {
            float: left;
            width: 65px;
            border-right: 1px solid #19191a;
            text-align: center;
            &:last-child {
              border-right: 0;
            }
            >a {
              .link();
              font-size: 18px;
              font-family: Arial, "Microsoft YaHei";
              line-height: 18px;
              strong,span {
                display: block;
              }
              span {
                font-weight: normal;
                font-size: 12px;
                line-height: 1.3;
                color: #999;
              }
              &:hover {
                span {
                  color: #999;
                }
              }
            }
          }
          &:after {
            display:block;
            content: '';
            clear: left;
          }
        }
      }
    }
  }
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
