'use stirct';
import { isSupportHistoryApi } from './config';

/*
判断左右切换:
1. 通过 history api，来保存上一页、下一页的信息，如果不支持，就一切都 sayGoodBye 吧
2. history.state.rtime 记录此页面的请求时间，通过时间来判定切换动画
3. history.state.rid 记录下此页面的唯一 id，滚动距离之类的，都通过此 id 进行记录
*/

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
    const state = Object.assign({}, history.state || {});
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
    return this.state.rid < this.lastState.rid;
  }

  isPageForward() {
    return this.state.rid > this.lastState.rid;
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
