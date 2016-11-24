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
                    <n3-option value="weiboID">weiboID</n3-option>
                    <n3-option value="keywords">关键词</n3-option>
                  </n3-select>
                  <n3-input :value.sync="model.keywords" :rules="[{type:'required'}]" class="vertical-top"></n3-input>
                </n3-form-item>
                <n3-form-item need label="时间" :label-col="3">
                    <n3-datepicker :value.sync="model.start"></n3-datepicker>
                    <span>~</span>
                    <n3-datepicker :value.sync="model.end"></n3-datepicker>
                </n3-form-item>
                <n3-form-item need label="排序" :label-col="3">
                  <n3-radio-group :value.sync="model.seq">
                      <n3-radio value="asc" checked>正序</n3-radio>
                      <n3-radio value="desc">倒序</n3-radio>
                    </n3-radio-group>
                </n3-form-item>

                 <n3-form-item :label-col="3">
                   <n3-button type="primary" @click="submit"><n3-loading size="xs" style="vertical-align: middle"></n3-loading> 提交</n3-button>
                </n3-form-item>
            </n3-form>
          </div>
          <div class="results" v-show="results!=null">
            <table v-show="results && results.length>0">
              <tr>
                <th>weiboID</th>
                <th>微博内容</th>
                <th>时间</th>
              </tr>
              <tr v-for="weibo in results">
                <td><a href="/backend/weibo/{{weibo.weiboid}}">{{weibo.weiboid}}</a></td>
                <td>{{weibo.text}}</td>
                <td>{{new Date(parseInt(weibo.time)) | dateTime}}</td>
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
        seq: '',
        condition: 'keywords',
        start: tools.dateToString(new Date()),
        end: tools.dateToString(new Date()),
      },
      results: null,
    }
  },
  methods: {
    submit(){
      this.$refs.form.validateFields(result =>{
        if(result.isvalid){
          if(this.conditionValidate()){
            //ajax逻辑
            this.results = [];
          }
          else {
            alert('weiboID需要纯数字！');
          }
        }
      })
    },
    conditionValidate () {
      if(this.model.condition == 'weiboID'){
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
