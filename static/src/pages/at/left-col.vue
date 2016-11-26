<template>
  <div class="left-col">
    <ul>
      <li class="title">
        <h3>
          我的消息箱
        </h3>
      </li>
      <li v-for="menu in menus">
        <a :href="menu.link" :class="{'active': menu.link.substr(1)==current}">
          <em class="W_ficon ficon_dot S_ficon" v-if="menu.link.substr(1)!=current">D</em>
          <em class="W_ficon ficon_dot S_ficon" v-if="menu.link.substr(1)==current">B</em>
          {{menu.text}}</a>
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
      var menus = [{
        text: '@我的',
        link: '/at',
      },{
        text: '评论',
        link: '/comment',
      },{
        text: '赞',
        link: '/like',
      }]
      return {
        menus: menus,
      }
    }
  }
</script>

<style lang="less">
  .left-col {
    li{
      line-height: 34px;
      font-size: 14px;
      color: #FFF;
      h3 {
        font-size: 14px;
        padding-left: 15px;
        margin: 0;
      }
      a {
        display: block;
        padding-left: 15px;
        font-size: 12px;
        color: #FFF;
        em {
          color: #FFF;
          margin-right: 2px;
        }
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
