import Vue from 'vue';

import App from './App';
import commonjs from '../../backend-common.js';

/* eslint-disable no-new */
Vue.component('App', App);
new Vue({
  el: 'body',
  data: {
  }
});
