import Vue from 'vue';
import userCard from './components/comp/user-card';

Vue.component('user-card', userCard);

var app = {};

window.app = app;

export {
  app
};
