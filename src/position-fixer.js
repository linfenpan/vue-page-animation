'use strict';

export default class PositionFixer {
  constructor({ clsLock = 'vue-page-animation-lock' }) {
    this.clsLock = clsLock;
    this.elBody = document.body || document.getElementsByTagName('body')[0];
  }

  // 锁定滚动
  lockScroll() {
    this.elBody.classList.add(this.clsLock);
  }

  // 解锁滚动
  unlockScroll() {
    this.elBody.classList.remove(this.clsLock);
  }

  // 修正元素的位置
  fixElementPos($el, pos) {
    $el.org_top = $el.style.top;
    $el.style.top = (0 - pos) + 'px';
    return {
      clear(isFixWindowScroll, scrollY) {
        const top = $el.org_top;
        $el.style.top = top;
        $el.org_top = null;
        if (isFixWindowScroll) {
          window.scrollTo(0, scrollY != null ? scrollY : pos || 0);
        }
      }
    };
  }
}
