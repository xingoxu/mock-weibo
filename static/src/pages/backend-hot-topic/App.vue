<template>
  <div class="weibo-backend-app">
    <n3-container fluid>
      <n3-row>
        <n3-column :col="2">
          <backend-nav :backend-nav="backendNav"></backend-nav>
        </n3-column>
        <n3-column :col="10" class="main">
          <div>
            <n3-form v-ref:form>
              <n3-form-item need v-for="topic in hotTopic" track-by="text" :label-col="1">
                <n3-input :value.sync="topic.text" :rules="[{type:'required'}]"></n3-input>
                <n3-button class="vertical-top" :disabled="loading" type="danger" @click="remove($index)">删除</n3-button>
                <n3-button class="vertical-top" :disabled="loading" type="primary" v-if="$index!=0" @click="up($index)">↑</n3-button>
                <n3-button class="vertical-top" :disabled="loading" type="primary" v-if="$index!=hotTopic.length-1" @click="down($index)">↓</n3-button>
              </n3-form-item>
            </n3-form>
            <n3-column :col="11" :offset="1" class="context">
              <n3-button type="info" @click="add" :disabled="loading" >添加</n3-button>
              <n3-button type="primary" @click="submit" :disabled="loading" >完成</n3-button>
            </n3-column>
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
import {hotTopic} from '../../mockdata/commonData.js';

export default {
  props: [],
  data () {
    return {
      backendNav: backendNavData,
      hotTopic: hotTopic,
    }
  },
  methods: {
    up(index){
      var exchangeOne = this.hotTopic[index-1];
      this.hotTopic.$set(index-1,this.hotTopic[index]);
      this.hotTopic.$set(index,exchangeOne);
    },
    down(index){
      var exchangeOne = this.hotTopic[index+1];
      this.hotTopic.$set(index+1,this.hotTopic[index]);
      this.hotTopic.$set(index,exchangeOne);
    },
    remove(index){
      this.hotTopic.splice(index,1);
    },
    add(){
      if(this.hotTopic[this.hotTopic.length-1].text == '')
        return;
      this.hotTopic.push({
        text: '',
      });
    },
    submit(){
      this.$refs.form.validateFields(result=>{
         console.log(this.hotTopic);
      })
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
    vertical-align: top !important;
  }
  .pull-right {
    float: right;
  }
</style>
