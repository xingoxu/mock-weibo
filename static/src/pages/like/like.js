import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
import App from './App';
import { app as commonApp } from '../../common.js';
import { likes } from '../../mockdata/likesData.js';
import { currentUser } from '../../mockdata/personalData.js';
/* eslint-disable no-new */
Vue.component('App', App);
window.Vue = Vue;


// new Vue({
//   el: 'body',
//   data: {
//     likes: likes,
//     currentUser: currentUser,
//   }
// });
