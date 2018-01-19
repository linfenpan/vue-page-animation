<template lang="html">
  <div class="vue-page-animation">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
/*
  判断左右切换:
  1. 通过 history api，来保存上一页、下一页的信息，如果不支持，就一切都 sayGoodBye 吧
  2. history.state.rtime 记录此页面的请求时间，通过时间来判定切换动画
  3. history.state.rid 记录下此页面的唯一 id，滚动距离之类的，都通过此 id 进行记录

  修复动画前后的滚动轴位置:
  1. 在动画前，锁定滚动轴
  2. 如何锁定滚动轴？给 body 设置 position: fixed; width: 100%; overflow-y: scroll;
  3. 然后，给当前离开的页面，修正 top 的位置
  4. 同时，获取正在进入的页面的高度，以及滚动距离；如果高度<=滚动距离，则不做响应。否则修正此元素的 top 位置
  5. 待动画结束后，删除 body 的样式，同时，删除正在进入元素的 top 属性，同时修正滚动轴的位置
*/

import { isSupportHistoryApi } from './config';

export default {
  data() {
    /*
      transitionMode: 如果是 空值，则只能判定，使用到底是 slide 还是 fade 的动画，否则，就强制使用某种动画
      transitionName: 是决定左、右 动画的
    */
    return { transitionMode: '', transitionName: '' };
  },

  beforeRouteLeave(to, from, next) {
    console.log('leave', location.href);
    next();
  },

  beforeRouteUpdate(to, from, next) {
    console.log('update', location.href);
    let isBack = this.$router.isBack;
    if (isBack) {
      this.transitionName = 'slide-right';
    } else {
      this.transitionName = 'slide-left';
    }
    this.$router.isBack = false;
    next();
  },
}
</script>

<style lang="css">
  .vue-page-animation {

  }

  .child-view {
    width: 100%;
    position: absolute;
    transition: all .8s cubic-bezier(.55,0,.1,1);
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    transform: translate(50px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    transform: translate(-50px, 0);
  }
</style>
