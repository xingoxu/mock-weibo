<template lang="html">
  <textarea class="autoresize" v-model="model" @keydown="resizeTextArea" :style="{
    height: init_height+'px'
  }" :placeholder="placeholder" :disabled="disabled"></textarea>
</template>

<script>
export default {
  data(){
    this.init_height = Number.parseInt(this.init_height);
    return {
    }
  },
  props: ['model','init_height','placeholder','disabled'],
  methods:{
    resizeTextArea(event){
      var textarea = event.target;
      setTimeout(()=>{
        textarea.style.height = this.init_height + 'px';
        var height = textarea.scrollHeight;
        if(this.init_height < height)
          textarea.style.height = height+'px';
      },0)
    }
  }
}
</script>

<style lang="less">
textarea.autoresize {
  overflow: hidden;
  resize: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: #999;
  word-wrap: break-word;
  word-break: break-all;
  &:focus{
    outline: 0;
  }
}
</style>
