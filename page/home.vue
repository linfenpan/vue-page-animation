<template lang="html">
  <div class="page-home">
    <div class="a-header clearfix">
      <div class="text">Home</div>
    </div>
    <div class="a-content home-content">
      <ul>
        <li>
          <router-link to="/pageA">Page A</router-link>
        </li>
        <li>
          <router-link to="/pageB">Page B</router-link>
        </li>
      </ul>
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
.home-content { padding: 5px; }
.home-content li { border-bottom: 1px solid #eee; }
.home-content a { display: block; padding: 10px; text-align: center; text-decoration: none; background: #0396ef; color: #ff8f00; }
</style>
