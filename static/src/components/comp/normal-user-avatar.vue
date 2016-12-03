<template lang="html">
  <div class="normal-user-avatar">
    <user-card :userid="userid" class="user-card-component">
      <a href="/user/{{userid}}">
        <img :src="(src&&src!='null') ? src :'http://tva1.sinaimg.cn/default/images/default_avatar_female_50.gif'" :width="size" :height="size" />
      </a>
    </user-card>
  </div>
</template>

<script>
export default {
  props:['size','src','userid'],
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
