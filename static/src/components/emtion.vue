<template lang="html">
  <div class="emotion-wrapper">
    <a class="S_txt1 emotion-link" href="javascript:void(0);" @click="showEmotion=!showEmotion"><em class="W_ficon ficon_face">o</em>表情</a>
    <div class="emotions-container" v-show="showEmotion" transition="fade-in">
      <div class="content">
        <div class="layer_faces">
          <ul class="list">
            <li v-for="icon in emotions" @click="$dispatch('emotion',icon.text)">
              <img :src="icon.src">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {emotions} from '../mockdata/emotions.js';
  export default {
    data(){
      return {
        emotions: emotions,
        showEmotion: false,
      }
    }
  }
</script>

<style lang="less">
  .emotion-wrapper {
    display: inline-block;
    position: relative;
  }
  .emotion-link {
    display: block;
    line-height: 24px;
    color: #c8c8cc;
    font-size: 12px;
    &:hover {
      color: #eb7350;
    }
    em {
      font-size: 20px;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  .emotions-container {
    position: absolute;
    z-index: 999;
    top: 35px;
    // left: 0px;
    width: 408px;
    left: 4px;
    background: #fff;
    border-radius: 3px;
    border: 1px solid #ccc;
    box-shadow: 0 4px 20px 1px rgba(0,0,0,0.2);
    .content {
      padding: 26px 16px 15px;
    }
    .tri(){
      position: absolute;
      top: -6px;
      left: 34px;
      margin-left: -10px;
      content: '';
      width: 0;
      height: 0;
    }
    &:before { //三角
      .tri();
      // top: -10px;
      margin-left: -11px;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 6px solid #fff;
    }
  }

  .weibo-send-weibo-wrapper,.publish-container {
    .layer_faces {
      >ul.list {
        li {
          float: left;
          display: block;
          margin: 0;
          border: 1px solid #e8e8e8;
          height: 22px;
          width: 26px;
          margin: -1px 0 0 -1px;
          overflow: hidden;
          padding: 4px 2px;
          text-align: center;
          cursor: pointer;
          &:hover {
            border: 1px solid #eb7350;
            background: #fff9ec;
            position: relative;
            z-index: 2;
          }
        }
        &:after{
          clear: left;
          content: '';
          display: block;
        }
      }
    }
  }
  .ficon_face {
    color: #ffa405;
  }
  //transition and animation
  .fade-in-transition {
    transition: all .2s ease-out;
    transform: translateY(0);
    opacity: 1;
  }
  .fade-in-enter, .fade-in-leave {
    transform: translateY(-10px);
    opacity: 0;
  }


</style>
