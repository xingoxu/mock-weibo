<template lang="html">
  <div class="popup-wrapper">
    <div class="popup-layer" v-show="show" transition="popup" v-el:layer >
      <div class="popup-title" @mousedown="startDrag" @mouseup="stopDrag">
        <slot name="title"><span>测试标题</span></slot>
        <span class="close"><a href="javascript:;" class="W_ficon ficon_close S_ficon" @click.stop="show=false">X</a></span>
      </div>
      <div class="popup-body">
        <slot name="body"></slot>
      </div>
    </div>
    <div class="popup-outer" v-show="show" transition="opacity"></div>
  </div>
</template>

<script>
var params = {
	left: 0,
	top: 0,
	currentX: 0,
	currentY: 0,
};
export default {
  props: {
    show: {
      default: false,
      twoWay: true
    }
  },
  data(){
    return {
      drag: false,
    }
  },
  ready(){
    document.addEventListener('mousemove',this.dragHandler);
  },
  beforeDestroy(){
    document.removeEventListener('mousemove',this.dragHandler);
  },
  methods: {
    startDrag(event){
      this.drag = true;
      params.top = this.$els.layer.style.top;
      params.left = this.$els.layer.style.left;
      params.currentX = event.clientX;
      params.currentY = event.clientY;
    },
    dragHandler(event){
      if(!this.drag)
        return;
      var nowX = event.clientX, nowY = event.clientY;
  		var disX = nowX - params.currentX, disY = nowY - params.currentY;
      var target = this.$els.layer;
  		target.style.left = parseInt(params.left) + disX + "px";
  		target.style.top = parseInt(params.top) + disY + "px";
    },
    stopDrag(event) {
        this.drag = false;
        params.top = this.$els.layer.style.top;
        params.left = this.$els.layer.style.left;
    }
  },
  watch: {
    show(newVal,old){
      if(newVal) {
        var layer = this.$els.layer;
        layer.style.top = window.innerHeight / 2 - 103 + 'px';
        layer.style.left = window.innerWidth / 2 - 235 + 'px';
      }
    }
  }
}
</script>

<style lang="less">
  .popup-outer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 998;
  }
  .popup-layer {
    position: fixed;
    // top: 50%;
    // left: 50%;
    width: 470px; //height: 207px
    // margin-left: -235px;
    // margin-top: -103px;
    z-index: 999;

    border-top: 2px solid #fa7f40;
    background: #FFF;
    border-radius: 3px;
    color: #333;
    .popup-title {
      border-bottom: 1px solid #f2f2f5;
      line-height: 38px;
      padding-left: 16px;
      font-size: 14px;
      font-weight: bold;

      cursor: move;
      >span.close {
        position: absolute;
        right: 12px;
        top: 0;
        font-size: 18px;
        a {
          color: #696e78;
          &:hover {
            color: #fa7d3c;
          }
        }
      }
    }
  }
  .popup-enter {
    animation: popup-bounceIn .2s ease;
  }
  .popup-leave {
    animation: popup-bounceOut .2s ease;
  }
  @keyframes popup-bounceIn {
    0% {
        transform: scale(.5);
        opacity: 0;
    }

    70% {
        transform: scale(1.03);
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
  }
  @keyframes popup-bounceOut {
    100% {
        transform: scale(.7);
        opacity: 0;
    }

    30% {
        transform: scale(1.03);
    }

    0% {
        transform: scale(1);
        opacity: 1;
    }
  }
</style>
