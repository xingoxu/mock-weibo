<template>
  <div class="weibo-backend-app">
    <n3-container fluid>
      <n3-row>
        <n3-column :col="2">
          <backend-nav :backend-nav="backendNav"></backend-nav>
        </n3-column>
        <n3-column :col="10" class="main">
          <div>
            <div>
              <p>weiboID：{{weibo.weiboid}}</p>
              <p>微博内容：{{weibo.text}}</p>
              <p>微博时间：{{new Date(parseInt(weibo.time)) | dateTime}}</p>
            </div>
            <div>
              <label>操作：</label>
              <n3-button type="danger">删除</n3-button>
            </div>
            <n3-tabs>
              <n3-tab header="转发">
                <table v-show="forwards && forwards.length>0">
                  <tr>
                    <th>weiboID</th>
                    <th>用户</th>
                    <th>转发内容</th>
                    <th>时间</th>
                  </tr>
                  <tr v-for="forwardWeibo in forwards">
                    <td><a href="/backend/weibo/{{forwardWeibo.weiboid}}">{{forwardWeibo.weiboid}}</a></td>
                    <td><a href="/backend/user/{{forwardWeibo.user.userid}}">{{forwardWeibo.user.username}}</a></td>
                    <td>{{forwardWeibo.text}}</td>
                    <td>{{new Date(parseInt(weibo.time)) | dateTime}}</td>
                  </tr>
                </table>
                <div v-show="forwards.length==0">
                  该微博没有转发
                </div>
              </n3-tab>
              <n3-tab header="回复">
                <table v-show="comments && comments.length>0">
                  <tr>
                    <th>用户</th>
                    <th>评论内容</th>
                    <th>时间</th>
                    <th>操作</th>
                  </tr>
                  <tr v-for="comment in comments">
                    <td><a href="/backend/user/{{comment.user.userid}}">{{comment.user.username}}</a></td>
                    <td>{{comment.text}}</td>
                    <td>{{new Date(parseInt(comment.time)) | dateTime}}</td>
                    <td><n3-button type="danger">删除</n3-button></td>
                  </tr>
                </table>
                <div v-show="comments.length==0">
                  该微博没有回复
                </div>
              </n3-tab>
            </n3-tabs>
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
import {singleWeibo} from '../../mockdata/weiboData.js';

export default {
  props: [],
  data () {
    return {
      backendNav: backendNavData,
      weibo: singleWeibo,
      forwardUser: [],

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
  .results {
    >table {
      width: 100%;
      td {
        padding: 5px;
      }
    }
  }
</style>
