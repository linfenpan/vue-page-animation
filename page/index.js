'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';

import App from '@/page/App';
import router from './router';

Vue.use(VueRouter);

var app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

export default app;
