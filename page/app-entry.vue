<script>
/*
  判断左右切换:
  1. 通过 history api，来保存上一页、下一页的信息，如果不支持，就不开放左右切换的动画
  2. history.state.rtime 记录此页面的请求时间，通过时间来判定切换动画

  修复动画前后的滚动轴位置:
  1.
*/
import VuePageAnimation from '@/src/vue-page-animation';

export default {
  extends: VuePageAnimation
}
</script>

<style>

</style>
