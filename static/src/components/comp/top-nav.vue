<template lang="html">
  <div>
    <nav class="top-nav" :class="{'has-alpha': !isTop}">
      <div class="center-zone">
        <div class="logo">
          <a href="/" >
            <span class="logo"></span>
          </a>
        </div>
        <div class="search" :class="{'focus': searchFocus}">
          <form action="/search" target="_blank" method="get">
            <input type="text" name="keywords" autocomplete="off" class="W_input" placeholder="搜索微博、找人" @focus="searchFocus=true" @blur="searchFocus=false" @keyup.stop="false" />
            <button title="搜索" class="W_ficon ficon_search S_ficon" >f</button>
          </form>
        </div>
        <div class="right-operation">
          <div class="site-nav">
            <ul>
              <li :class="{'now': navNow=='homepage'}"><a href="/"><em class="W_ficon ficon_home S_ficon">E</em><em class="text">首页</em></a></li>
              <li :class="{'now': navNow=='mypage'}"><a href="/user/{{currentUser.userid}}"><em class="W_ficon ficon_home S_ficon">H</em><em class="text">{{currentUser.username}}</em></a></li>
            </ul>
          </div>
          <div class="nav-func">
            <ul class="gn_set S_line1">
              <li class="gn_set_list">
                <a href="javascript:void(0);" class=" ">
                  <em class="W_ficon ficon_mail S_ficon">I</em>
                </a>
                <div class="menu">
                  <!--tip start-->
                  <ul>
                    <li><a href="/at">@我的</a>
                    </li>
                    <li><a href="/comment">评论</a>
                    </li>
                    <li><a href="/like">赞</a>
                    </li>
                  </ul>
                  <!--tip end-->
                </div>
              </li>
              <li class="gn_set_list">
                <a href="javascript:void(0);" class=" ">
                  <em class="W_ficon ficon_set S_ficon">*</em>
                </a>
                <div class="menu">
                  <!--tip start-->
                  <ul>
                    <li><a href="/profile">个人资料</a>
                    </li>
                    <li><a href="/password">账号安全</a>
                    </li>
                    <li class="line S_line2"></li>
                    <li><a href="/logout">退出</a>
                    </li>
                  </ul>
                  <!--tip end-->
                </div>
              </li>
              <li class="gn_set_list">
                <a href="javascript:void(0);" @click="showNewWeiboPopup"><em class="W_ficon ficon_send S_ficon" title="新微博">ß</em></a>
              </li>
            </ul>
            <div class="gn_topmenulist_tips">
              <!--tip start-->
              <a href="javascript:void(0);" class="W_ficon ficon_close S_ficon">X</a>
              <ul>
                <li>1条新评论，<a href="/comment">查看</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="new-weibo-popup">

    </div>
  </div>
</template>

<script>
  export default {
    props: ['currentUser','navNow','notification'],
    ready() {
      window.addEventListener('scroll',this.windowScroll);
      window.addEventListener('keyup',(event)=>{
        if(event.keyCode == 78) //N
          this.showNewWeiboPopup();
      })
    },
    beforeDestroy(){
      window.removeEventListener('scroll',this.windowScroll);
    },
    data(){
      return {
        searchFocus: false,
        isTop: true,
      }
    },
    methods: {
      windowScroll(event){
        if(document.body.scrollTop > 0) {
          this.isTop = false;
          return;
        }
        this.isTop = true;
      },
      showNewWeiboPopup(){
        this.$dispatch('showNewWeiboPopup');
      }
    },
  }
</script>

<style lang="less">
  @orange: #fa7d3c;
  nav.top-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 48px;
    background: #FFF;
    border-top: 2px solid @orange;
    box-shadow: 0 0 1px 0px rgba(0,0,0,0.15);
    z-index: 99;
    &.has-alpha {
      box-shadow: 0 0 1px 0px rgba(0,0,0,0.3),0 0 6px 2px rgba(0,0,0,0.15);
      background: rgba(255,255,255,0.94);
    }
    .S_ficon {
      font-size: 22px;
      width: 26px;
      color: #696e78;
    }
    .ficon_send {
      width: 26px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      color: #fff;
      border-radius: 2px;
      background: #fa7d3c;
      background: linear-gradient(to bottom,#fa7d3c 0%,#f56010 100%);
      &:hover {
        background: linear-gradient(to bottom,#f4712c 0%,#f15909 100%);
      }
    }
    .center-zone {
      width: 1280px;
      margin: 0 auto;
      >div {
        float: left;
      }
      .right-operation {
        float: right;
      }
    }
    div.logo {
      width: 140px;
      height: 48px;
      >a {
        width: 190px;
        height: 48px;
        margin-left: -50px;
        display: block;
        >span {
          margin-left: 50px;
          display: block;
          width: 140px;
          height: 48px;
          background: url("http://img.t.sinajs.cn/t6/style/images/global_nav/WB_logo.png?id=1404211047727") no-repeat 0 40%;
          background-position: 50% 40%;
        }
      }
    }
    div.search {
      width: 435px;
      margin-top: 9px;
      border: 1px solid #ccc;
      background: #f2f2f5;
      position: relative;
      input {
        border: 0;
        padding: 4px 33px 4px 10px;
        width: 392px;
        font-size: 12px;
        line-height: 20px;
        background: transparent;
        color: #000;
        &:focus {
          outline: 0;
        }
        .placeholder({
          color: #808080;
          font-size: 12px;
        })
      }
      button {
        position: absolute;
        top: 4px;
        right: 10px;
        background: transparent;
        border: 0;
        color: #696e78;
        padding: 0;
        height: 22px;
        width: 18px;
        font-size: 18px;
      }
      &.focus {
        background: #FFF;
        border-color: @orange;
      }
    }
    div.right-operation {
      >.site-nav {
        float: left;
        margin: 11px 20px 11px 0;
        ul {
          li {
            float: left;
            font-size: 14px;
            margin-left: 26px;
            >a {
              display: block;
              line-height: 26px;
              color: #333;
              >em {
                display: inline-block;
                font-style: normal;
                vertical-align: middle;
              }
              &:hover {
                color: @orange;
                >em {
                  color: @orange;
                }
              }
            }
            &.now {
              >a {
                color: @orange;
                >em {
                  color: @orange;
                }
              }
            }
          }
          &:after {
            content: '';
            display: block;
            clear: left;
          }
        }
      }
      >.nav-func {
        float: right;
        margin: 12px 10px 12px 0;
        border-left: 1px solid #d9d9d9;
        position: relative;
        >ul {
          &:after {
            content: '';
            display: block;
            clear: both;
          }
          >li {
            float: left;
            margin-left: 21px;
            line-height: 24px;
            height: 24px;
            position: relative;
            >a {
              text-align: center;
              &:hover {
                em {
                  color: @orange;
                  &.ficon_send {
                    color: #FFF;
                  }
                }
                +.menu {
                  visibility: visible;
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            }
            .menu {
              position: absolute;
              top: 100%;
              margin-top: 12px;
              width: 144px;
              right: -17px;

              z-index: 100;//99+1
              background: #FFF;
              color: #333;
              border: 1px solid #ccc;
              border-radius: 2px;
              padding: 2px;
              box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.2);

              transition: all .2s ease;
              transition-property: visibility,transform,opacity;
              transition-delay: .2s;
              visibility: hidden;
              transform: translateY(-20px);
              opacity: 0;
              &:hover {
                visibility: visible;
                opacity: 1;
                transform: translateY(0);
              }
              .tri(){
                position: absolute;
                top: -9px;
                right: 21px;
                content: '';
                width: 0;
                height: 0;
              }
              &:before { //三角
                .tri();
                top: -10px;
                right: 20px;
                border-left: 9px solid transparent;
                border-right: 9px solid transparent;
                border-bottom: 10px solid #ccc;
              }
              &:after {
                .tri();
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-bottom: 9px solid #FFF;
              }
              a {
                white-space: nowrap;
                min-width: 50px;
                padding: 9px 13px;
                line-height: 1em;
                color: #333;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                &:hover {
                  background-color: #f2f2f5;
                  text-decoration: none;
                  color: #eb7350;
                }
              }
              .line {
                border-bottom: 1px solid #f2f2f5;
                padding: 0;
                height: 2px;
                position: relative;
                top: -1px;
                display: block;
                margin: 0 -2px;
              }
            }
          }
        }
        div.gn_topmenulist_tips {
          position: absolute;
          min-width: 234px;
          top: 36px;
          right: 45px;

          z-index: 99;
          color: #333;
          border: 1px solid #ffeebb;
          border-radius: 0 0 3px 3px;
          padding: 6px 2px;
          box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.1);
          background: rgba(255,249,224,0.94);
          > a {//close button
            float: right;
            font-size: 12px;
            line-height: 30px;
          }
          >ul{
            >li {
              padding: 9px 30px 9px 13px;
              line-height: 1em;
              >a {
                color: #eb7350;
              }
            }
          }
        }
      }
    }
  }
  .placeholder(@rules) {

    &::-webkit-input-placeholder {
        @rules();
    }
    &:-moz-placeholder {
        @rules();
    }
    &::-moz-placeholder {
        @rules();
    }
    &:-ms-input-placeholder {
        @rules();
    }
  }
</style>
