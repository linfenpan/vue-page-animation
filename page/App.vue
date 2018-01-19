<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import AppEntry from '@/page/app-entry';

export default {
  components: {
    AppEntry
  },
}
</script>

<style lang="css">
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system-font,sans-serif;
  }
  li {
    list-style: none;
  }
  img {
    max-width: 100%;
  }
  .pull-left {
    float: left;
  }
  .pull-right {
    float: right;
  }
  .clear {
    clear: both;
  }
  .clearfix:after {
    content: '';
    display: table;
    clear: both;
  }
  .a-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    color: #fff;
    background: #ffa22c;
  }
  .a-header .text {
    position: absolute;
    top: 0; left: 40px; right: 40px; bottom: 0;
    text-align: center;
  }
  .a-header a {
    display: inline-block;
    padding: 0 5px;
    color: #fff;
    text-decoration: none;
  }
  .a-header .back {
    float: left;
    font-family: cursive, "微软雅黑";
  }
  .a-content {
    margin-top: 40px;
  }
</style>
