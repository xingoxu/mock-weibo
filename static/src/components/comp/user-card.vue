<template lang="html">
  <span class="user-card-component">
    <span class="content-wrapper" @mouseenter="isHover=true" @mouseleave="isHover=false">
      <slot></slot>
    </span>
    <div class="card" v-show="isHover" @mouseenter="isHover=true" @mouseleave="isHover=false" transition="user-card">
      <div class="wrapper" v-show="user">
        <div class="upper">
          <a class="pic">
            <img :src="user.avatar" width="50" height="50"/>
          </a>
          <div class="name">
            <a href="#">xingo</a>
          </div>
          <div class="intro">
            {{user.intro}}没有的话先测试一下
          </div>
        </div>
        <div class="lower">
          <div class="count">
            <ul>
              <li><a href="#">关注<em>275</em></a></li>
              <li><a href="#">粉丝<em>860</em></a></li>
              <li><a href="#">微博<em>8326</em></a></li>
            </ul>
          </div>
          <div class="operation">
            <div class="button-wrapper">
              <button href="javascript:void(0);" class="W_btn_b" @click="handleFollow">
                <span v-if="following&&beFollowed&&!loading">
                  <em class="W_ficon ficon_addtwo S_ficon">Z</em>互相关注
                  <!-- <em class="W_ficon ficon_arrow_down_lite S_ficon">g</em> -->
                </span>
                <span v-if="loading&&following">
                  <i class="W_loading"></i>关注中
                </span>
                <span v-if="following&&!beFollowed&&!loading">
                  <em class="W_ficon ficon_right S_ficon">Y</em>已关注
                  <!-- <em class="W_ficon ficon_arrow_down_lite S_ficon">g</em> -->
                </span>
                <span v-if="loading&&!following">
                  <i class="W_loading"></i>取消关注中
                </span>
                <span v-if="!following&&beFollowed&&!loading">
                  <em class="W_ficon ficon_right S_ficon">Y</em><em class="W_vline S_line1"></em><em class="W_ficon ficon_add">+</em>关注
                </span>
                <span v-if="!following&&!beFollowed&&!loading">
                  <em class="W_ficon ficon_add S_ficon">+</em>关注
                </span>
              </button>
            </div>
            <div class="button-wrapper">
              <a href="javascript:void(0);" class="W_btn_b W_btn_pf_menu">
                <em class="W_ficon ficon_menu S_ficon">=</em>
              </a>
              <div class="menu">
                <div class="list_wrap">
                  <div class="list_content W_f14">
                    <ul class="list_ul">
                      <li class="item" v-if="beFollowed"><a class="tlink">移除粉丝</a></li>
                      <!-- <li class="item"><a class="tlink">加入黑名单</a></li> -->
                      <li class="item"><a class="tlink">举报他</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper not-exist" v-show="!user">
        <span>抱歉，这个昵称不存在哦！^_^</span>
      </div>
      <div class="wrapper loading" v-show="userLoading">
        <i class="W_loading"></i>
        <span>正在加载，请稍后...</span>
      </div>
    </div>
  </span>
</template>

<script>
import {app} from '../../common.js';

export default {
  props: ['name','userid'],
  data(){
    return {
      isHover: false,
      user: {
        avatar: 'http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg',
      },
      timeout: 0,
      following: false,
      beFollowed: false,
      loading: false,
      userLoading: false,
    }
  },
  methods: {
    getUserInfo(){

    },
    handleFollow(){
      this.loading = true;
      this.following = !this.following;
      setTimeout(()=>{
        this.loading = false;
      },1000);
    }
  }
}
</script>

<style lang="less">
  .user-card-component {
    position: relative;
    .card {
      position: absolute;
      bottom: 100%;
      left: ~"calc(50% - 187px)";
      margin-bottom: 8px;
      z-index: 999;
      font-size: 12px;
      .wrapper {
        // position: relative;
        background: #fff;
        border-radius: 3px;
        border: 1px solid #ccc;
        box-shadow: 0 4px 20px 1px rgba(0,0,0,0.2);
        width: 374px;
        &.not-exist,&.loading {
          padding: 15px 0;
          text-align: center;
          span {
            color: #000;
          }
        }
      }
      .upper {
        // position: relative;
        width: 100%;
        height: 110px;
        padding-top: 12px;
        background-image: url(http://img.t.sinajs.cn/t6/style/images/layer/personcard_cover.png?id=1419901742185);
        background-position: center top;
        background-repeat: repeat;
        background-size: cover;
        .pic {
          display: block;
          width: 50px;
          height: 50px;
          position: relative;
          margin: 0 auto 15px;
          img {
            border-radius: 50%;
          }
        }
        .name {
          line-height: 1.2em;
          text-align: center;
          color: #fff;
          text-shadow: 0 0 1px #999;
          a {
            font-size: 14px;
            color: #fff;
          }
        }
        .intro {
          padding: 0 12px;
          margin: 7px 0 0;
          line-height: 1.2em;
          text-align: center;
          color: #fff;
          text-shadow: 0 0 1px #999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
        }
      }
      .lower {
        padding: 9px 0 16px;
        text-align: center;
        .count {
          ul{
            display: block;
            li{
              display: inline;
              padding: 0 9px;
              border-right: 1px solid #e6e6e6;
              font-weight: bold;
              &:last-child {
                border-right: 0;
              }
              a {
                color: #333;
                em {
                  font-style: normal;
                  font-family: Arial;
                  padding-left: 3px;
                }
                &:hover {
                  color: #eb7350;
                }
              }
            }
          }
        }
        .operation {
          margin-top: 10px;
          >.button-wrapper{
            display: inline-block;
            position: relative;
            >a,>button {
              display: block;
              white-space: nowrap;
              border-radius: 2px;
              // height: 24px;
              line-height: 25px;
              font-size: 12px;
              text-align: center;
              border: 1px solid #d9d9d9;
              margin-left: 5px;
              padding: 0 8px;
              vertical-align: top;
              cursor: pointer;
              font-size: 12px;
              color: #333;
              background: transparent;
              box-shadow: 0px 1px 2px rgba(0,0,0,0.1);
              transition: box-shadow .3s ease;
              &:hover {
                box-shadow: 0px 1px 1px rgba(0,0,0,0.15);
                border-color: #cccccc;
              }
              em {
                color: #696e78;
                line-height: 11px;
                overflow: hidden;
                margin-right: 4px;
                vertical-align: middle;
                &.ficon_menu {
                  margin-right: 0;
                }
                &.ficon_add {
                  color: #fa7d3c
                }
              }
            }
            >a:hover,>button:hover {
              +.menu {
                visibility: visible;
                opacity: 1;
                transform: translateY(0);
              }
            }
            >.menu {
              transition: all .2s ease;
              transition-property: visibility,transform,opacity;
              transition-delay: .2s;
              visibility: hidden;
              opacity: 0;
              transform: translateY(-20px);

              position: absolute;
              left: 5px;
              top: 100%;
              margin-top: 4px;
              font-size: 12px;
              background: #fff;
              color: #333;
              border: 1px solid #ccc;
              border-radius: 2px;
              padding: 2px;
              width: 100px;
              box-shadow: 0px 2px 8px 1px rgba(0,0,0,0.2);
              text-align: left;
              &:hover {
                visibility: visible;
                opacity: 1;
                transform: translateY(0);
              }
              .tlink {
                display: block;
                // min-width: 98px;
                padding: 9px 13px;
                white-space: nowrap;
                cursor: pointer;

                padding: 7px 13px;
                color: #333;
                &:hover {
                  color: #eb7350;
                  background: #f2f2f5;
                }
              }
            }
          }

          .W_btn_pf_menu {
            em {
              position: relative;
              top: -2px;
              line-height: 24px;
              margin: 0;
            }
          }
        }
      }
      .tri(){
        position: absolute;
        bottom: -7px;
        left: 50%;
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
        border-top: 7px solid #ccc;
      }
      &:after {
        .tri();
        bottom: -5px;
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
        border-top: 6px solid #FFF;
      }
    }
    .user-card-transition {
      transition: .2s all ease;
      transition-property: visibility,opacity,transform;
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
      transition-delay: .5s;
    }
    .user-card-enter,.user-card-leave{
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
    }
    .W_loading {
      margin-right: 5px;
    }
  }

</style>
