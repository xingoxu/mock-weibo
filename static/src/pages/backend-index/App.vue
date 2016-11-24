<template>
  <div class="weibo-backend-app">
    <n3-container fluid>
      <n3-row>
        <n3-column :col="2">
          <backend-nav :backend-nav="backendNav"></backend-nav>
        </n3-column>
        <n3-column :col="10">
          <div class="index-main">
            <h1>这里是微博后台！</h1>
          </div>
        </n3-column>
      </n3-row>
    </n3-container>
  </div>
</template>

<script>
import { backendNav as backendNavData } from '../../mockdata/backendData.js';
import backendNav from '../../components/backend-comp/backend-nav';

export default {
  props: [],
  data () {
    return {
      backendNav: backendNavData,
    }
  },
  methods: {

  },
  events: {

  },
  components: {
    backendNav
  }
}
</script>

<style lang="less">
  .index-main {
    text-align: center;
    >h1 {
      margin-top: 20px;
    }
  }
</style>
