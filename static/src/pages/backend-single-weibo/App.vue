<template>
  <div class="weibo-backend-app">
    <n3-container fluid>
      <n3-row>
        <n3-column :col="2">
          <backend-nav :backend-nav="backendNav"></backend-nav>
        </n3-column>
        <n3-column :col="10" class="main">
          <div v-show="results!=null">
            <div class="">
              <p>weiboID：{{weibo.weiboid}}</p>
              <p>微博内容：{{weibo.text}}</p>
              <p>微博时间：{{new Date(parseInt(weibo.time)) | dateTime}}</p>
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
