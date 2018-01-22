'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import PageA from '@/page/pageA';
import PageB from '@/page/pageB';
import Home from '@/page/home';

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/pageA',
      component: PageA
    },
    {
      path: '/pageB',
      component: PageB
    }
  ],
  // // @notice 如果不要动画效果，其实用 scrollBehavior 已经足够啦
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
});

export default router
