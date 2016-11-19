<template>
  <div class="weibo-frame">
    <top-nav></top-nav>
    <left-col class="weibo-left-col"></left-col>
    <middle-col class="weibo-mid-col"></middle-col>
    <div class="weibo-right-col">
      <right-col></right-col>
    </div>
    <forward-popup v-ref:forward-popup></forward-popup>
  </div>
</template>

<script>
import leftCol from '../../components/left-col';
import middleCol from '../../components/middle-col';
import rightCol from '../../components/right-col';
import topNav from '../../components/comp/top-nav';
import forwardPopup from '../../components/comp/forward-popup';

export default {
  data () {
    return {

    }
  },
  methods: {
    test(){
      this.$refs.forwardPopup.$emit('show');
    }
  },
  events: {
    expandForward(){
      this.$refs.forwardPopup.$emit('show');
    }
  },
  components: {
    leftCol,
    middleCol,
    rightCol,
    topNav,
    forwardPopup
  }
}
</script>

<style lang="less">
@import "../../common.less";
body {
  background: url("http://img.t.sinajs.cn/t6/skin/skin048/images/body_bg.jpg?id=201503261330") no-repeat top center, url("http://img.t.sinajs.cn/t6/skin/skin048/images/body_repeat.png?id=1414052827385") repeat-x center 0 #b4daf0;

  padding-top: 50px;
}
.weibo-frame {
  width: 1000px;
  min-height: ~"calc(100vh - 16px - 50px)";
  margin: 0 auto;
  padding: 16px 0 0;
  position: relative;

  background: rgba(0,0,0,0.25);
  .weibo-left-col {
    position: fixed;
    width: 150px;
  }
  .weibo-right-col {
    position: absolute;
    top: 16px;//same with weibo-frame's padding top;
    right: 0;
    width: 230px;
    margin-right: 10px;
    >div{
      position: fixed;
      width: 230px;
    }
  }
  .weibo-mid-col {
    padding: 0 240px 0 150px;
    margin-right: 10px;
  }
}
</style>
