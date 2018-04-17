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
      <slot></slot>
    </transition>
  </div>
</template>

<script>
/** @see https://github.com/linfenpan/vue-page-animation */

import { isSupportHistoryApi } from './config';
import PositionFixer from './position-fixer';
import StateHelper from './state-helper';

/*
  forceTransitionName: 如果是 空值，则只能判定，使用到底是 slide 还是 fade 的动画，否则，就强制使用某种动画
  transitionName: 是决定左、右、透明 动画
*/
export default {
  props: {
    forceTransitionName: {
      default: ''
    },
    // 链接驱动保存位置吗
    driveByUrl: {
      default: false
    },
  },

  data() {
    return { transitionName: 'vue-page-animation-fade' };
  },

  created() {
    this.positionFixer = new PositionFixer({});
    this.stateHelper = new StateHelper(this.driveByUrl);
    this.watchRouter();
  },

  beforeDestroy() {
    this.unwatchRouter();
  },

  activated() {
    this.watchRouter();
  },

  deactivated() {
    this.unwatchRouter();
  },

  methods: {
    watchRouter() {
      if (!this._calculateScroll) {
        // @notice 如果有记录 X 轴的同学，改写这行
        this._calculateScroll = (to, fr, next) => {
          this._lastScrollY = window.scrollY || window.pageYOffset || document.body.scrollTop;
          next();
        };
        // @notice vue-router 不知道会在什么时候，把 beforeHooks 这个钩子关掉
        // 最保险的，还是在 router 文件内，调用 beforeEach，然后给 from，添加一个 scrollY 之类的字段
        // 然后通过 $watch('$route') 中的 from 参数，重新读取出来
        this.$router.beforeHooks.push(this._calculateScroll);
      }

      if (!this._unwatchRouter) {
        this._unwatchRouter = this.$watch('$route', (to, from) => {
          if (!this._isWatchingRouter) { return; }
          // 触发这个函数时，history.state 的值，已经更变了，浏览器的高度，也被重置了
          // 唯一的困难，就是把变化前的浏览器高度，给弄回来~~~
          const lastScrollY = this._lastScrollY || 0;
          const stateHelper = this.stateHelper;
          const positionFixer = this.positionFixer;
          
          stateHelper.update();
          stateHelper.saveLastPosition(lastScrollY);

          let transitionName = this.forceTransitionName || '';

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
        });
      }

      this._isWatchingRouter = true;
    },

    unwatchRouter() {
      // @notcie 如果通过 beforeEach 添加的钩子，则可以把这个 if 判断删除
      if (this._calculateScroll) {
        const hooks = this.$router.beforeHooks;
        const fn = this._calculateScroll;
        if (hooks.indexOf(fn) >= 0) {
          this.$router.beforeHooks.splice(hooks.indexOf(fn), 1);
        }
        this._calculateScroll = null;
      }

      this._isWatchingRouter = false;
    },

    beforeLeave(el) {
      const positionFixer = this.positionFixer;
      const stateHelper = this.stateHelper;

      positionFixer.lockScroll();
      this._leaveFixer = positionFixer.fixElementPos(el, stateHelper.getLastPosition() || 0);
    },

    beforeEnter(el) {
      const positionFixer = this.positionFixer;
      const stateHelper = this.stateHelper;

      // @notice 如果强制指定切换后的滚动位置，则按指定的来修复
      let scrollY = null;
      if (stateHelper.isPageBack()) {
        scrollY = el.getAttribute('data-vue-paga-animation-back');
      } else if (stateHelper.isPageForward()) {
        scrollY = el.getAttribute('data-vue-paga-animation-forward');
      }
      scrollY = scrollY || stateHelper.getCurrentPosition();

      positionFixer.lockScroll();
      this._enterFixer = positionFixer.fixElementPos(el, scrollY);
    },

    afterLeave() {
      const positionFixer = this.positionFixer;
      positionFixer.unlockScroll();

      this._leaveFixer && this._leaveFixer.clear();
      this._leaveFixer = null;
    },

    afterEnter(el) {
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
    overflow-x: hidden;
  }

  /* @notice 因为 position: fixed 与 transform 配合使用，会导致 position: fixed 失效的，所以只能用 left 动画代替 */
  /* 如果没有 position:fixed 的元素，请果断使用 transform 动画~ */
  .vue-page-animation-router-view {
    width: 100%;
    position: absolute;
    left: 0;
    will-change: left, opacity;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
    -webkit-transition-property: left, opacity;
    transition-property: left, opacity;
    -webkit-transition-timing-function: cubic-bezier(.55,0,.1,1);
            transition-timing-function: cubic-bezier(.55,0,.1,1);
  }

  .vue-page-animation-left-enter, .vue-page-animation-right-leave-active {
    opacity: 0;
    left: 20px;
  }

  .vue-page-animation-left-leave-active, .vue-page-animation-right-enter {
    opacity: 0;
    left: -20px;
  }

  .vue-page-animation-fade-enter, .vue-page-animation-fade-leave-active {
    opacity: 0;
  }
</style>
