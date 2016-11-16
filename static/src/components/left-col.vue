<template>
  <div class="left-col">
    <ul>
      <li>
        <h3>
          <a>首页</a>
        </h3>
      </li>
      <li>
        <h3>
          <a>我的收藏</a>
        </h3>
      </li>
      <li>
        <h3>
          <a>我的赞</a>
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
    data() {
      return {

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
