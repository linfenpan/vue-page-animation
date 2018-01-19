<template lang="html">
  <div class="page-a">
    <div class="a-header page-a-header clearfix">
      <a href="javascript:;" @click="back" class="back">&lt;</a>
      <div class="text">Page A</div>
    </div>
    <div class="a-content page-a-content">
      <h1>网站快速成型工具</h1>
      <p>
        Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库
        <br>
        <img src="http://cc.fp.ps.netease.com/file/5a0d8af2a7f2527e5e8be335M4mXBfY8?fop=imageView/3/w/320/h/180">
      </p>
      <h2>一致性 Consistency</h2>
      <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
      <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p>
      <h2>反馈 Feedback</h2>
      <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
      <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
      <h2>效率 Efficiency</h2>
      <p>简化流程：设计简洁直观的操作流程；</p>
      <p>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</p>
      <p>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</p>
      <h2>可控 Controllability</h2>
      <p>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</p>
      <p>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</p>
      <img src="http://cc.fp.ps.netease.com/file/5a6065957f9d2a0b77bf7de0z3v87UmN?fop=imageView/3/w/320/h/180" >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      history.back();
    },
  },
}
</script>

<style lang="css">
.page-a-header {
  background: #ff7b2c;
}
.page-a-content {
  padding: 5px;
}
.page-a-content p {
  margin: 10px 0;
}
</style>
