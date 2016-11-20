import Vue from 'vue';
import userCard from './components/comp/user-card';

Vue.component('user-card', userCard);

function NumberToTwo(number) {
  return number < 10 ? '0' + number : number;
}

function getTime(date) {
  var timeArray = [];
  timeArray.push(date.getHours());
  timeArray.push(date.getMinutes());
  // timeArray.push(date.getSeconds());
  timeArray = timeArray.map(NumberToTwo);
  return timeArray.join(':');
}

function getDate(date) {
  var dateArray = [];
  dateArray.push(date.getFullYear() + '年');
  dateArray.push(date.getMonth() + 1 + '月');
  dateArray.push(date.getDate() + '日');
  dateArray = dateArray.map(NumberToTwo);
  return dateArray.join('');
}

Vue.filter('showTime', function(dateStamp) {
  dateStamp = Number.parseInt(dateStamp);
  var dif = Date.now() - dateStamp;
  //1天前显示日期
  if (dif / (1000 * 3600 * 24) > 1)
    return getDate(new Date(dateStamp)) + ' ' + getTime(new Date(dateStamp));
  //1小时前直接显示时间
  if (dif / (1000 * 3600) > 1)
    return '今天 ' + getTime(new Date(dateStamp));
  return Math.ceil(dif / (1000 * 60)) + '分钟前';
});

var app = {};

window.app = app;

export {
  app
};
