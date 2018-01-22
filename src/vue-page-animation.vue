<template lang="html">
  <div class="vue-page-animation">
    <transition
      :name="transitionName"
      @before-leave="beforeLeave"
      @before-enter="beforeEnter"
      @after-leave="afterLeave"
      @after-enter="afterEnter"
      @enter-cancelled="cancelAnimation"
      @leave-cancelled="cancelAnimation"
      >
      <keep-alive>
        <router-view class="vue-page-animation-router-view"></router-view>
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
import PositionFixer from './position-fixer';
import StateHelper from './state-helper';

export default {
  data() {
    /*
      transitionMode: 如果是 空值，则只能判定，使用到底是 slide 还是 fade 的动画，否则，就强制使用某种动画
      transitionName: 是决定左、右 动画的
    */
    return { transitionMode: '', transitionName: '' };
  },

  created() {
    this.positionFixer = new PositionFixer({});
    this.stateHelper = new StateHelper({ clsLock: 'vue-page-animation-lock' });
  },

  // TODO 考虑一下，用 watch 来代替吧，这个方法，看着就坑啦~~~~
  // watch 的时候，判断一下，当前组件是否 created/beforeDestroy, activated/deactivated
  beforeRouteUpdate(to, from, next) {
    const lastScrollY = window.scrollY || document.body.scrollTop;
    next();

    const stateHelper = this.stateHelper;
    const positionFixer = this.positionFixer;
    stateHelper.update();
    stateHelper.saveLastPosition(lastScrollY);

    let transitionName = this.transitionMode || '';

    if (!transitionName) {
      if (stateHelper.isPageBack()) {
        transitionName = 'vue-page-animation-right';
      } else if (stateHelper.isPageForward()) {
        transitionName = 'vue-page-animation-left';
      } else {
        transitionName = 'vue-page-animation-fade';
      }
    }

    this.transitionName = transitionName;
  },

  methods: {
    beforeLeave(el) {
      const positionFixer = this.positionFixer;
      const stateHelper = this.stateHelper;

      positionFixer.lockScroll();
      this._leaveFixer = positionFixer.fixElementPos(el, stateHelper.getLastPosition() || 0);
    },
    beforeEnter(el) {
      const positionFixer = this.positionFixer;
      const stateHelper = this.stateHelper;

      positionFixer.lockScroll();
      this._enterFixer = positionFixer.fixElementPos(el, stateHelper.getCurrentPosition() || 0);
    },
    afterLeave() {
      this._leaveFixer && this._leaveFixer.clear();
      this._leaveFixer = null;
    },
    afterEnter() {
      const positionFixer = this.positionFixer;
      positionFixer.unlockScroll();

      const isFixWindowScroll = true;
      this._enterFixer && this._enterFixer.clear(isFixWindowScroll);
      this._enterFixer = null;
    },
    cancelAnimation() {
      this.afterLeave();
      this.afterEnter();
    }
  }
}
</script>

<style lang="css">
  .vue-page-animation-lock {
    position: fixed;
    width: 100%;
    overflow-y: scroll;
  }

  /* 因为 position: fixed 与 transform 配合使用，会导致 position: fixed 失效的，所以只能用 left 动画代替 */
  .vue-page-animation-router-view {
    width: 100%;
    position: absolute;
    left: 0;
    -webkit-transition-duration: .5s;
    transition-duration: .5s;
    -webkit-transition-property: left, opacity;
    transition-property: left, opacity;
    -webkit-transition-timing-function: ease;
            transition-timing-function: ease;
    /* transition-timing-function: cubic-bezier(.55,0,.1,1); */
  }

  .vue-page-animation-left-enter, .vue-page-animation-right-leave-active {
    opacity: 0;
    left: 50px;
    /* transform: translate(50px, 0); */
  }

  .vue-page-animation-left-leave-active, .vue-page-animation-right-enter {
    opacity: 0;
    left: -50px;
    /* transform: translate(-50px, 0); */
  }

  .vue-page-animation-fade-enter, .vue-page-animation-fade-leave-active {
    opacity: 0;
  }
</style>
