<template>
  <div class="weibo-backend-app">
    <n3-container fluid>
      <n3-row>
        <n3-column :col="2">
          <backend-nav :backend-nav="backendNav"></backend-nav>
        </n3-column>
        <n3-column :col="10" class="main">
          <div class="well">
            <n3-form v-ref:form>
                <n3-form-item need label="条件" :label-col="3">
                  <n3-select :value.sync="model.condition" :cancelled="false" class="vertical-top">
                    <n3-option value="userID">userID</n3-option>
                    <n3-option value="keywords">用户名</n3-option>
                  </n3-select>
                  <n3-input :value.sync="model.keywords" :rules="[{type:'required'}]" class="vertical-top"></n3-input>
                </n3-form-item>

                 <n3-form-item :label-col="3">
                   <n3-button type="primary" @click="submit" :loading="loading" :disabled="loading">提交</n3-button>
                </n3-form-item>
            </n3-form>
          </div>
          <div class="results" v-show="results!=null">
            <table v-show="results && results.length>0">
              <tr>
                <th>userID</th>
                <th>用户名</th>
              </tr>
              <tr v-for="user in results">
                <td><a href="/backend/user/{{user.userid}}">{{user.userid}}</a></td>
                <td>{{user.username}}</td>
              </tr>
            </table>
            <span v-show="results && results.length==0">没有搜索出结果</span>
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
import {timeline} from '../../mockdata/weiboData.js';

export default {
  props: [],
  data () {
    return {
      backendNav: backendNavData,
      model: {
        keywords: '',
        condition: 'keywords',
      },
      loading: false,
      results: null,
    }
  },
  methods: {
    submit(){
      this.$refs.form.validateFields(result =>{
        if(result.isvalid){
          if(this.conditionValidate()){
            var params = this.model;
            this.loading = true;
            this.$http.get('/backend/users',{
              params: params
            })
            .then((result)=>{
              this.loading = false;
              this.results = result.data;
            })
          }
          else {
            alert('userID需要纯数字！');
          }
        }
      })
    },
    conditionValidate () {
      if(this.model.condition == 'userID'){
        if(!((/^\d+$/g).test(this.model.keywords))){
          return false;
        }
      }
      return true;
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
