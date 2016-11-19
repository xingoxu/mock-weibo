<template lang="html">
  <div class="normal-user-avatar">
    <user-card name="" class="user-card-component">
      <a href="#">
        <img src="http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg" :width="size" :height="size" />
      </a>
    </user-card>
  </div>
</template>

<script>
export default {
  props:['size'],
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
