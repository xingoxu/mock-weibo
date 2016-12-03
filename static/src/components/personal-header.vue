<template lang="html">
  <div class="personal-header">
    <div class="upper">
      <div class="coverWrapper">
        <div class="cover"></div>
      </div>
      <div class="shadow">
        <!-- canSelect -->
        <div class="pf_photo">
          <img :src="(user.avatar&&user.avatar!='null') ? user.avatar :'http://tva1.sinaimg.cn/default/images/default_avatar_female_50.gif'" />
        </div>
        <div class="pf_username">
          <span>{{user.username}}</span>
        </div>
        <div class="pf_intro">
          <span>{{user.intro&&user.intro!='null' ? user.intro : '他还没有填自我介绍'}}</span>
        </div>
        <div class="pf_opt" v-if="user.userid!=currentUser.userid">
          <ul class="opt_box clearfix">
              <li class="btn_bed W_fl" >
                <button href="javascript:void(0);" class="W_btn_d btn_34px {{user.followed  ? 'hasFollowed': 'notFollowed'}}" :disabled="loading" @click="handleFollow">
                  <span v-if="user.followed && user.beFollowed &&!loading">
                    <em class="W_ficon ficon_addtwo S_ficon">Z</em>互相关注
                    <!-- <em class="W_ficon ficon_arrow_down_lite S_ficon">g</em> -->
                  </span>
                  <span v-if="loading && user.followed ">
                    <i class="W_loading"></i>关注中
                  </span>
                  <span v-if="user.followed && !user.beFollowed &&!loading">
                    <em class="W_ficon ficon_right S_ficon">Y</em>已关注
                    <!-- <em class="W_ficon ficon_arrow_down_lite S_ficon">g</em> -->
                  </span>
                  <span v-if="loading && !user.followed ">
                    <i class="W_loading"></i>取消关注中
                  </span>
                  <span v-if="!user.followed && user.beFollowed &&!loading">
                    <em class="W_ficon ficon_right S_ficon">Y</em><em class="W_vline S_line1"></em><em class="W_ficon ficon_add">+</em>关注
                  </span>
                  <span v-if="!user.followed && !user.beFollowed && !loading">
                    <em class="W_ficon ficon_add S_ficon">+</em>关注
                  </span>
                </button>
              </li>
              <li class="btn_bed W_fl">
                <a href="javascript:;" class="W_btn_d W_btn_pf_menu btn_34px">
                  <em class="W_ficon ficon_menu S_ficon">=</em>
                </a>
                <div class="menu" v-if="user.beFollowed">
                  <div class="list_wrap">
                    <div class="list_content W_f14">
                      <ul class="list_ul">
                        <li class="item" v-if="user.beFollowed" @click="removeFan"><a class="tlink">移除粉丝</a></li>
                        <!-- <li class="item"><a class="tlink">加入黑名单</a></li> -->
                        <!-- <li class="item"><a class="tlink">举报他</a></li> -->
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="lower">
      <a class="current" href="/user/{{user.userid}}">{{user.userid==currentUser.userid ? '我': '他'}}的主页</a>
    </div>
  </div>
</template>

<script>
export default {
  props:['currentUser','user'],
  data(){
    return {
      loading: false,
    }
  },
  methods:{
    handleFollow(){
      this.loading = true;
      this.user.followed = !this.user.followed;
      var currentUser = app.currentUser;
      var operation = app.operationFactory(currentUser.userid);
      operation.target_userid = this.user.userid;
      if(this.user.followed){
        this.$http.post('/follow',operation)
          .then((response)=>{
            this.loading = false;
          })
      }
      else {
        this.$http.post('/follow/delete',operation)
          .then((response)=>{
            this.loading = false;
          })
      }
      // setTimeout(()=>{
      // },1000);
    },
    removeFan(){
      this.user.beFollowed = false;
      var currentUser = app.currentUser;
      var operation = app.operationFactory(currentUser.userid);
      operation.target_userid = this.user.userid;
      this.$http.post('/follower/delete',operation)
        .then((response)=>{

        });
    },
  }
}
</script>

<style lang="less">
  .W_vline {
    border-left-width: 1px;
    border-left-style: solid;
    width: 0;
    overflow: hidden;
  }

  .personal-header {
    >.upper {
      height: 300px;
      position: relative;
      >.coverWrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        overflow: hidden;
      }
      .cover {
        width: 100%;
        height: 100%;
        background: url("http://ww2.sinaimg.cn/crop.0.0.920.300/6b8bbe7egw1f8iyjjrpmyj20pk08cwg0.jpg") center no-repeat;
        animation: coverAnimation 4s linear;
      }
      @keyframes coverAnimation {
        from {
          transform: scaleX(1.05) scaleY(1.05);
        }
        to {
          transform: scaleX(1) scaleY(1);
        }
      }
      >.shadow {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: linear-gradient(to bottom, rgba(0,0,0,0) 50%,rgba(0,0,0,0.3) 100%);
        text-align: center;
      }
      .pf_photo {
        // position: relative;
        width: 100px;
        height: 100px;
        margin: 48px auto 0;
        padding: 4px;
        background: #fff;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;

        }
        &.canSelect:hover {
          background: none;
          img {
            box-shadow: 0 0 14px #f66214;
          }
        }
      }
      .pf_username {
        margin-top: 6px;
        color: #fff;
        text-align: center;
        text-shadow: 0 0 4px rgba(0,0,0,0.5);
        vertical-align: text-bottom;
        font-size: 22px;
        font-family: Arial;
      }
      .pf_intro {
        margin-top: 4px;
        text-align: center;
        color: #fff;
        line-height: 18px;
        text-shadow: 0 0 4px rgba(0,0,0,0.5);
      }
      .pf_opt {
        margin-top: 15px;
        text-align: center;
        >ul {
          >li {
            position: relative;
            display: inline-block;
            margin: 0 3px;
            font-size: 0;
            // vertical-align: middle;
            >a,>button {
              display: block;
              padding: 0;
              height: 34px;
              line-height: 34px;
              font-size: 14px;
              width: 104px;
              cursor: pointer;
              // height: 34px;
              // line-height: 34px;
              color: #fff;
              box-shadow: 0px 2px 1px rgba(0,0,0,.2);
              border-radius: 2px;
              border: 0;
              background: linear-gradient(to bottom, #696e78 0%,#646973 100%);
              &:hover {
                background: linear-gradient(to bottom, #5f636d 0%,#535861 100%);
              }
              &[disabled] {
                background: #ffc09f;
                color: #fff;
                cursor: default;
              }
              i.W_loading {
                margin: -1px 5px 0 0;
              }
              em {
                color: #FFF;
                font-size: 12px;
                line-height: 11px;
                &.ficon_addtwo {
                  margin-right: 4px;
                }
                &.ficon_arrow_down_lite {
                  margin: 0 -3px 0 3px;
                }
                &.ficon_menu {
                  font-size: 14px;
                }
                &.ficon_add {
                  margin-right: 4px;
                }
                &.ficon_right {
                  margin-right: 4px;
                }
                &.W_vline {
                  border-color: #fa9b6a;
                  line-height: 11px;
                  overflow: hidden;
                  margin-right: 4px;
                  vertical-align: middle;
                }
              }
              &.W_btn_pf_menu {
                min-width: 0;
                width: 34px;
              }
              &.notFollowed {
                background: -webkit-linear-gradient(top, #fa7d3c 0%,#f55f10 100%);
                &:hover {
                  background: linear-gradient(to bottom, #f4722e 0%,#f05807 100%);
                }
                &[disabled] {
                  background: #ffc09f;
                  color: #fff;
                  cursor: default;
                }
              }
              &.hasFollowed {
                background: linear-gradient(to bottom, #696e78 0%,#646973 100%);
                &:hover {
                  background: -webkit-linear-gradient(top, #5f636d 0%,#535861 100%);
                }
                &[disabled] {
                  background: #ffc09f;
                  color: #fff;
                  cursor: default;
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
              left: 0;
              top: 100%;
              margin-top: 4px;
              font-size: 14px;
              background: #fff;
              color: #333;
              border: 1px solid #ccc;
              border-radius: 2px;
              padding: 2px;
              width: 124px;
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
                &:hover {
                  color: #eb7350;
                  background: #f2f2f5;
                }
              }
            }
          }
        }
      }
    }
    >.lower {
      text-align: center;
      background-color: #323233;
      > a {
        display: inline-block;
        margin: 0 auto;
        height: 40px;
        line-height: 38px;
        white-space: nowrap;
        overflow: hidden;
        font-weight: bold;
        vertical-align: middle;
        color: #c8c8cc;
        font-size: 14px;
        padding: 0 7px;
        position: relative;
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          left: 0;
          bottom: -2px;
          background: #f7691d;
          transition: transform .2s ease;
        }
        &:hover {
          &:after {
            transform: translateY(-2px);
          }
        }
        &.current {
          font-weight: bold;
          &:after {
            transform: translateY(-2px);
          }
        }
      }
    }
  }
</style>
