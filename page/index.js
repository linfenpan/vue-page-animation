'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';

import App from '@/page/App';
import router from './router';

Vue.use(VueRouter);

Vue.config.errorHandler = function (err, vm, info) {
  alert(err);
  alert(info);
}

var app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

export default app;
