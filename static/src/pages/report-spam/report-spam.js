import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
import App from './App';
import { app as commonApp } from '../../common.js';
import { singleWeibo } from '../../mockdata/weiboData.js';
import { currentUser } from '../../mockdata/personalData.js';
/* eslint-disable no-new */
Vue.component('App', App);
new Vue({
  el: 'body',
  data: {
    weibo: singleWeibo
  }
});
