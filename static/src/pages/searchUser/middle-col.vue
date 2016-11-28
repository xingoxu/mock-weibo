<template>
  <div class="search-user">
    <div>
      <user-list></user-list>
    </div>
  </div>

</template>

<script>
  import userList from '../../components/comp/search-user-list';
  export default {
    props:[],
    data () {
      return {

      }
    },
    events: {

    },
    components: {
      userList,
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .search-user {
    >div {
      background-color: #323233;
    }
  }

</style>
