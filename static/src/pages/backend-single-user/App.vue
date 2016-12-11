<template>
  <div class="weibo-backend-app">
    <n3-container fluid>
      <n3-row>
        <n3-column :col="2">
          <backend-nav :backend-nav="backendNav"></backend-nav>
        </n3-column>
        <n3-column :col="10" class="main">
          <div>
            <div class="pull-right">
              <img :src="user.avatar">
            </div>
            <div>
              <p>userID：{{user.userid}}</p>
              <p>简介：{{user.intro}}</p>
              <p>地区：{{user.area}}</p>
              <p>邮箱：{{user.mail}}</p>
            </div>
            <div>
              <label>操作：</label>
              <a href="/user/{{user.userid}}"><n3-button type="primary">前台界面</n3-button></a>
              <n3-button type="danger" @click="submit">{{user.isForbidden ? '解封' : '封禁'}}</n3-button>
            </div>
          </div>
        </n3-column>
      </n3-row>
    </n3-container>
  </div>
</template>

<script>
import { backendNav as backendNavData } from '../../mockdata/backendData.js';
import backendNav from '../../components/backend-comp/backend-nav';
import {tools} from '../../backend-common.js';
// import {currentUser} from '../../mockdata/personalData.js';

export default {
  props: ['user'],
  data () {
    return {
      backendNav: backendNavData,
      // user: currentUser,
    }
  },
  methods: {
    submit(){

    },
  },
  events: {

  },
  components: {
    backendNav
  }
}
</script>

<style lang="less">
  .main {
    padding: 15px;
  }
  .well {
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
  }
  .vertical-top {
    vertical-align: top;
  }
  .pull-right {
    float: right;
  }
</style>
