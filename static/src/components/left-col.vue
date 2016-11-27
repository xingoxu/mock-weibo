<template>
  <div class="left-col">
    <ul>
      <li v-for="nav in navs">
        <h3>
          <a :class="{'active': current== nav.key}" :href="nav.link">{{nav.text}}</a>
        </h3>
      </li>
    </ul>
    <div class="divider">
      <fieldset></fieldset>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['current'],
    data() {
      var navs = [{
        text: '首页',
        key: 'index',
        link: '/'
      },{
        text: '我的收藏',
        key: 'favourite',
        link: '/favourite'
      },{
        text: '我的赞',
        key: 'like',
        link: '/my-like',
      }]
      return {
        navs: navs
      }
    }
  }
</script>

<style lang="less">
  .left-col {
    li>h3 {
      font-size: 14px;
      margin: 0;
      line-height: 34px;
      a {
        display: block;
        padding-left: 15px;
        color: #FFF;
        &:hover {
          background-color: rgba(255,255,255,0.2);
        }
        &.active {
          background-color: rgba(255,255,255,0.2);
        }
      }
    }
  }
  .divider {
    fieldset {
      display: block;
      height: 11px;
      padding: 0 0 0 120px;
      zoom: 1;
      clear: both;
      margin-top: 11px;
      border: 0;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

  }
</style>
