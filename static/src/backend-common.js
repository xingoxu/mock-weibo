import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
import N3Components from 'N3-components';
N3Components.install(Vue)

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
  dateArray.push(date.getFullYear()); //暂时不用显示
  dateArray.push(date.getMonth()+1);
  dateArray.push(date.getDate());
  dateArray = dateArray.map(NumberToTwo);
  return dateArray.join('-');
}

let tools = {
  dateToString(date){
    return getDate(date);
  },
  timeToString(date){
    return getTime(date);
  },
  dateTimeToString(date){
    return getDate(date)+' '+getTime(date);
  }
}

Vue.filter('dateTime',function(date){
  return tools.dateTimeToString(date);
});

export {tools};
