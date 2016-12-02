<template>
  <div class="weibo-main-app">
    <top-nav :current-user="currentUser" :notification="notification"></top-nav>
    <div class="weibo-frame">
      <div class="search-box">
        <div class="search_head_formbox">
          <div class="search_logo">
            <a href="/" class="logo_img"></a>
          </div>
          <ul class="formbox_tab clrfloat formbox_tab2" node-type="searchItems">
            <li>
              <a action-type="searchItem" href="/search?keywords={{keywords}}">综合</a>
              <a action-type="searchItem" class="cur">找人</a>
            </li>
          </ul>
          <form class="search_input clearfix" action="/search/user">
            <div class="search_input_wrap">
              <input class="searchInp_form" type="text" autocomplete="off" name="keywords" @keyup.stop="false" v-model="keywords">
              <!-- <div class="searchInp_box">
                <div class="searchInp_auto">
                </div>
              </div> -->
              <div class="searchBtn_box">
                <button type="submit" class="searchBtn">搜索</button>
              </div>
            </div>
          </form>
          <!-- /search_input -->
        </div>
      </div>
      <middle-col class="weibo-mid-col" v-ref:middle-col :users="users"></middle-col>
      <div class="weibo-right-col">
        <right-col ></right-col>
      </div>
    </div>
    <footer>
      <p>服务热线：4000 960 960（个人/企业）服务时间9:00-21:00 4000 980 980（广告主）服务时间9:00-18:00 （按当地市话标准计算）</p>
      <p>京ICP证100780号 互联网药品服务许可证 互联网医疗保健许可证 京网文[2014]2046-296号 京ICP备12002058号 增值电信业务经营许可证B2-20140447</p>
      <p>Copyright © 2009-2016 WEIBO 北京微梦创科网络技术有限公司 京公网安备11000002000019号</p>
    </footer>
  </div>
</template>

<script>
import middleCol from './middle-col';
import rightCol from '../search/right-col';
import topNav from '../../components/comp/top-nav';
import newWeiboPopup from '../../components/comp/new-weibo-popup';

export default {
  props: ['users','notification','currentUser','keywords'],
  data () {
    return {
    }
  },
  created(){
    app.currentUser = this.currentUser;
  },
  methods: {

  },
  computed: {

  },
  events: {
    showNewWeiboPopup(){
      this.$refs.newWeiboPopup.$emit('show');
    }
  },
  components: {
    middleCol,
    rightCol,
    topNav,
    newWeiboPopup,
  }
}
</script>

<style lang="less">
@import "../../common.less";
body {
  // background: url("http://img.t.sinajs.cn/t6/skin/skin048/images/body_bg.jpg?id=201503261330") no-repeat top center, url("http://img.t.sinajs.cn/t6/skin/skin048/images/body_repeat.png?id=1414052827385") repeat-x center 0 #b4daf0;
  background: url("http://img.t.sinajs.cn/t6/skin/skin055/images/body_bg.jpg?id=1410943047113") no-repeat top center #1f160e;

  padding-top: 50px;
}
.weibo-frame {
  width: 1000px;
  min-height: ~"calc(100vh - 16px - 50px)";
  margin: 0 auto;
  padding: 26px 0 0;
  position: relative;

  // background: rgba(0,0,0,0.25);
  padding-bottom: 10px;
  .weibo-right-col {
    position: absolute;
    top: 141px;//same with weibo-frame's padding top;
    right: 0;
    width: 300px;
    >div{
      width: 300px;
    }
  }
  .weibo-mid-col {
    padding: 0 300px 0 0px;
    margin-right: 10px;
  }
  >.search-box {
    margin-bottom: 30px;
    .search_logo {
      background: url("http://img.t.sinajs.cn/t4/appstyle/searchV45/images_v6/common/search_logo.png?id=201409221153") no-repeat;
      width: 114px;
      height: 34px;
      float: left;
      margin-right: 34px;
      &.logo_img {
        display: block;
        width: 114px;
        height: 34px;
      }
    }
    .search_head_formbox .formbox_tab {
      margin-bottom: 14px;
      padding: 13px 0 0 3px;
      li a {
        float: left;
        margin-right: 22px;
        font-size: 14px;
        line-height: 20px;
        color: #fefefe;
        &.cur {
          font-weight: bold;
          text-decoration: none;
          // color: #367bbb;
          color: #eb7350;
        }
      }
    }
    .searchInp_form {
      width: 674px;
      padding: 0 8px;
      // background: none;
      height: 36px;
      overflow: hidden;
      border: none;
      line-height: 28px;
      font-size: 20px;
      color: #333;
      border-radius: 2px;
      box-shadow: 0 0 2px rgba(0,0,0,0.2);
      vertical-align: middle;
      &:focus {
        outline: 0;
      }
    }
    .searchBtn_box {
      display: inline-block;
      vertical-align: middle;
      margin-left: 6px;
      >button {
        display: block;
        width: 100px;
        line-height: 34px;
        text-align: center;
        outline: none;
        background: #ff8140;
        border: 0;
        border-radius: 2px;
        color: #fefefe;
        font-size: 16px;
        cursor: pointer;
        &:hover {
          background: #f7671d;
        }
      }
    }
  }
}
.weibo-main-app {
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
