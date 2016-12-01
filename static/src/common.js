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
  // dateArray.push(date.getFullYear() + '年'); //暂时不用显示
  dateArray.push(date.getMonth() + 1 + '月');
  dateArray.push(date.getDate() + '日');
  dateArray = dateArray.map(NumberToTwo);
  return dateArray.join('');
}

Vue.filter('showTime', function(dateStamp) {
  dateStamp = Number.parseInt(dateStamp);
  var dif = Date.now() - dateStamp;
  //1天前显示日期
  if (dif / (1000 * 3600 * 24) > 1 || (new Date()).getDate() - (new Date(
      dateStamp)).getDate() > 0 || (new Date()).getMonth() - (new Date(
          dateStamp)).getMonth() > 0 || (new Date()).getFullYear() - (new Date(
              dateStamp)).getFullYear() > 0)
    return getDate(new Date(dateStamp)) + ' ' + getTime(new Date(dateStamp));
  //1小时前直接显示时间
  if (dif / (1000 * 3600) > 1)
    return '今天 ' + getTime(new Date(dateStamp));
  return Math.ceil(dif / (1000 * 60)) + '分钟前';
});

var app = {
  getAts(string){
    var atRegex = /(@[0-9a-zA-Z_\u0391-\uFFE5-]+$)|(@[0-9a-zA-Z_\u0391-\uFFE5-]+\s)/g;
    return string.match(atRegex);
  },
  weiboFactory(currentUser) {
    return {
      weiboid: 0,
      user: currentUser,
      text: '',
      time: Date.now() + '',
      forward: 0,
      comment: 0,
      like: 0,
      favourited: false,
      liked: false,
    };
  },
  commentFactory(currentUser) {
    return {
      user: currentUser,
      text: '',
      time: Date.now() + '',
      commentid: 0,
      weiboid: 0,
      comment_commentid: 0,
      like: 0,
      liked: false,
    };
  },
  operationFactory(userid){
    return {
      userid: userid,
      weiboid: 0,
      name: null,
      target_userid: 0,
      commentid: 0,
      time: Date.now() + '',
    }
  },
  userCardCache: {

  }
};

window.app = app;

export {
  app
};
