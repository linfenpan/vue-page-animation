'use stirct';
import { isSupportHistoryApi } from './config';

function merge(a, b) {
  for (const k in b) {
    if (b.hasOwnProperty(k)) {
      a[k] = b[k];
    }
  }
  return a;
}

export default class StateHelper {
  constructor() {
    this.posMap = {};

    this.lastState = null;
    this.state = null;

    this.lastUri = '';
    this.uri = '';

    this.update();
  }

  update() {
    // const state = Object.assign({}, history.state || {}); // es6 手机支持不够友好呢
    const state = merge({}, history.state || {});

    if (!state.rid) {
      state.rid = new Date/1;
      history.replaceState(state, null);
    }

    this.lastState = this.state;
    this.state = state;

    this.lastUri = this.uri;
    this.uri = location.href;

    if (this.lastState == null) {
      this.lastState = state;
    }
    if (this.lastUri == '') {
      this.lastUri = this.uri;
    }
  }

  isPageBack() {
    return isSupportHistoryApi ? this.state.rid < this.lastState.rid : false;
  }

  isPageForward() {
    return isSupportHistoryApi ? this.state.rid > this.lastState.rid : false;
  }

  getCurrentPosition() {
    const key = isSupportHistoryApi ? this.state.rid : this.uri;
    return this.posMap[key];
  }

  getLastPosition() {
    const key = isSupportHistoryApi ? this.lastState.rid : this.lastUri;
    return this.posMap[key];
  }

  saveLastPosition(pos) {
    const key = isSupportHistoryApi ? this.lastState.rid : this.lastUri;
    this.posMap[key] = pos || 0;
  }
}
