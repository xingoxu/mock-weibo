<template>
  <div class="weibo-main-app">
    <top-nav :current-user="currentUser" :notification="notification"></top-nav>
    <div class="weibo-frame">
      <middle-col class="weibo-mid-col" :current-user="currentUser"></middle-col>
    </div>
    <footer>
      <p>服务热线：4000 960 960（个人/企业）服务时间9:00-21:00 4000 980 980（广告主）服务时间9:00-18:00 （按当地市话标准计算）</p>
      <p>京ICP证100780号 互联网药品服务许可证 互联网医疗保健许可证 京网文[2014]2046-296号 京ICP备12002058号 增值电信业务经营许可证B2-20140447</p>
      <p>Copyright © 2009-2016 WEIBO 北京微梦创科网络技术有限公司 京公网安备11000002000019号</p>
    </footer>
  </div>
</template>

<script>
import leftCol from '../personalPage/left-col';
import middleCol from './middle-col';
import topNav from '../../components/comp/top-nav';

export default {
  props: ['currentUser','notification'],
  data () {
    return {

    }
  },
  methods: {

  },
  events: {

  },
  components: {
    leftCol,
    middleCol,
    topNav,
  }
}
</script>

<style lang="less">
@import "../../common.less";
body {
  background-color: #d4d5e0;
  background-image: url("https://imgs.t.sinajs.cn/t6/skin/default/images/body_repeat.png?id=1410943047113");
  background-repeat: repeat-x;
  background-position: center 0;

  padding-top: 50px;
}
.weibo-frame {
  width: 656px;
  font-size: 12px;
  line-height: 1.3;

  min-height: ~"calc(100vh - 16px - 50px - 108px - 10px)"; //108 - 10底部高度
  padding: 16px 0 0;
  margin: 0 auto;
  position: relative;

  padding-bottom: 10px;
  .weibo-personal-header {
    margin-bottom: 16px;
  }
  .weibo-mid-col {
    margin: 40px auto 0;
    background: #fff;
    border-top: 2px #fa7d3c solid;
    border-radius: 2px;
    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.2);
  }
}
.weibo-main-app {
  background: url("https://imgs.t.sinajs.cn/t6/skin/default/images/body_bg.jpg?id=20140928183500")  no-repeat top center;
  >footer {
    background: #232324;
    padding: 20px 0;
    text-align: center;
    color: #999;
    position: relative;
    p {
      margin: 0 0 10px;
      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
