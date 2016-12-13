<template>
  <div class="weibo-backend-app">
    <n3-container fluid>
      <n3-row>
        <n3-column :col="2">
          <backend-nav :backend-nav="backendNav"></backend-nav>
        </n3-column>
        <n3-column :col="10" class="main">
          <div>
            <table v-show="spamInfos.length>0">
              <tr>
                <th>举报微博ID</th>
                <th>举报内容</th>
                <th>操作</th>
              </tr>
              <tr v-for="spam in spamInfos" track-by="spamid">
                <td><a href="/backend/weibo/{{spam.weiboid}}">{{spam.weiboid}}</a></td>
                <td>{{spam.text}}</td>
                <td><n3-button type="success" @click="submit(spam.spamid,$index)">我已处理</n3-button></td>
              </tr>
            </table>
            <div class="no-spam" v-show="spamInfos.length == 0">
              wow 没有举报待处理哦！
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
import {spamInfos} from '../../mockdata/spamInfos.js';

export default {
  props: ['spamInfos'],
  data () {
    return {
      backendNav: backendNavData,
      // spamInfos: spamInfos,
    }
  },
  methods: {
    submit(spamid, index) {
      this.$http.post('/backend/processSpam', {
          spamid: spamid
        })
        .then(() => {
          this.spamInfos.splice(index, 1);
        });
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
  table {
    width: 100%;
    td {
      padding: 10px;
    }
  }
  .vertical-top {
    vertical-align: top;
  }
  .pull-right {
    float: right;
  }
</style>
