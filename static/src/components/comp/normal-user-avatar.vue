<template lang="html">
  <div class="normal-user-avatar">
    <user-card name="" class="user-card-component">
      <a href="/user/{{userid ? userid : username}}">
        <img :src="src ? src :'https://cdn.v2ex.co/gravatar/5ec95789500564dba72703b6a2cbbbb8?s=48&d=retro'" :width="size" :height="size" />
      </a>
    </user-card>
  </div>
</template>

<script>
export default {
  props:['size','src','userid','username'],
}
</script>

<style lang="less">
  .normal-user-avatar {
    .user-card-component {
      display: block;
      .content-wrapper {
        img {
          display: block;
        }
      }
    }
  }
</style>
