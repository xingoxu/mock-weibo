import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
import App from './App';
import commonjs from '../../backend-common.js';

/* eslint-disable no-new */
Vue.component('App', App);
window.Vue = Vue;
