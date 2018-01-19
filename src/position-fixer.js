'use strict';

export default class PositionFixer {
  constructor({ clsLock: 'vue-body-lock' }) {
    this.clsLock = clsLock;
    this.elBody = document.body || document.getElementsByTagName('body')[0];
  }

  // 锁定滚动
  lockScroll() {
    this.elBody.classList.add(this.clsLock);
  }

  // 解锁滚动
  unloackScroll() {
    this.elBody.classList.remove(this.clsLock);
  }

  // 修正元素的位置
  fixElementPos($el, pos) {
    $el.org_top = $el.style.top;
    $el.style.top = pos + 'px';
    return { clear() { $el.style.top = $el.org_top; $el.org_top = null; } };
  }
}
