<template lang="html">
  <n3-nav theme="dark" type="vertical" class="nav">
    <n3-nav-item v-for="navGroup in backendNav">
      <n3-sub-nav>
        <a slot="title">{{navGroup.text}}</a>
        <n3-nav-item v-for="nav in navGroup.features" :active="nav.link==currentPath">
          <a :href="nav.link">{{nav.text}}</a>
        </n3-nav-item>
      </n3-sub-nav>
    </n3-nav-item>
  </n3-nav>
</template>

<script>

  export default {
    props: ['backendNav'],
    computed: {
      currentPath() {
        return location.pathname;
      }
    },
    components: {
    }
  }
</script>

<style lang="less">
  .nav{
    height: 100vh;
    overflow: auto;
    margin: 0 -5px;
    // background-color: #f5f5f5;
    // border-right: 1px solid #eee;
    // font-size: 14px;
    // padding-left: 20px;
    // padding-top: 10px;
  }
</style>
