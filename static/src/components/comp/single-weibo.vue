<template lang="html">
  <div class="weibo-single-weibo">
    <div class="upper">
      <div class="avatar">
        <user-avatar size="50" :src="weibo.user.avatar" :userid="weibo.user.userid"></user-avatar>
      </div>
      <div class="right">
        <div class="nickname-title">
          <user-card :userid="weibo.user.userid">
            <a href="/user/{{weibo.user.userid}}" class="name-title-link">{{weibo.user.username}}</a>
          </user-card>
        </div>
        <div class="weibo-text-content">
          <weibo-text :weibo-text="weibo.text" :keywords="keywords"></weibo-text>
        </div>
        <!-- 扩展here （图片/转发） -->
        <div class="forward-weibo" v-if="weibo.forwardWeibo">
          <div class="content-wrapper">
            <div class="nickname-title">
              <user-card :userid="weibo.forwardWeibo.user.userid">
                <a href="/user/{{weibo.forwardWeibo.user.userid}}" class="name-title-link">@{{weibo.forwardWeibo.user.username}}</a>
              </user-card>
            </div>
            <div class="weibo-text-content">
              <weibo-text :weibo-text="weibo.forwardWeibo.text" :keywords="keywords"></weibo-text>
            </div>
            <div class="time-func clrfloat">
              <div class="time pull-left">
                <a href="/weibo/{{weibo.forwardWeibo.weiboid}}">{{weibo.forwardWeibo.time | showTime}}</a>
              </div>
              <div class="pull-right">
                <ul>
                  <li>
                    <span class="line S_line1">
                      <a class="S_txt2" target="_blank" href="/weibo/{{weibo.forwardWeibo.weiboid}}?type=repost" >
                        <!-- 转发 -->
                        <span><em class="W_ficon ficon_forward S_ficon"></em><em>{{weibo.forwardWeibo.forward>0 ? weibo.forwardWeibo.forward : '转发'}}</em></span>
                      </a>
                    </span>
                  </li>
                  <li>
                    <span class="line S_line1">
                      <a class="S_txt2" target="_blank" href="/weibo/{{weibo.forwardWeibo.weiboid}}" >
                        <!-- 回复 -->
                        <span><em class="W_ficon ficon_repeat S_ficon"></em><em>{{weibo.forwardWeibo.forward>0 ? weibo.forwardWeibo.comment : '评论'}}</em></span>
                      </a>
                    </span>
                  </li>
                  <li :class="{'liked': weibo.forwardWeibo.liked}">
                    <span class="line S_line1">
                      <a class="S_txt2" href="javascript:void(0);" @click="forwardWeiboLike">
                        <!-- 点赞 -->
                        <span><em class="W_ficon ficon_praised S_txt2">ñ</em><em>{{weibo.forwardWeibo.like>0 ? weibo.forwardWeibo.like : '赞'}}</em></span>
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="forward-weibo" v-if="!weibo.forwardWeibo && weibo.forward_weiboid">
          <div class="content-wrapper">
            <div class="deleted">
              该微博已被删除
            </div>
          </div>
        </div>
        <div class="time">
          <a href="/weibo/{{weibo.weiboid}}">{{weibo.time | showTime}}</a>
        </div>
      </div>
      <!-- 删除，举报 -->
      <div class="pull-right delete-weibo-operation">
        <div class="screen_box">
          <a href="javascript:void(0);" class="toggle-link"><i class="W_ficon ficon_arrow_down S_ficon">c</i></a>
          <div class="layer_menu_list " node-type="fl_menu_right" style="position: absolute; z-index: 999;">
            <ul>
              <li><a href="/report/{{weibo.weiboid}}" target="_blank">举报</a></li>
              <li><a href="javascript:;" @click="deleteWeibo(weibo.weiboid)" v-if="weibo.user.userid == currentUser.userid">删除</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="lower">
      <operation class="operation" :weibo="weibo" :is-single-weibo="isSingleWeibo"></operation>
    </div>
  </div>
</template>

<script>
import weiboText from './weibo-text';
import userAvatar from './normal-user-avatar';
import operation from './single-weibo-bottom-operation';
export default {
  props: ['weibo','isSingleWeibo','keywords','currentUser'],
  ready(){
  },
  methods: {
    forwardWeiboLike(){
      var like = !this.weibo.forwardWeibo.liked;
      var ajaxURL = like ? '/like' : '/like/delete';
      var operation = app.operationFactory(app.currentUser.userid);
      operation.weiboid = this.weibo.forwardWeibo.weiboid;
      this.$http.post(ajaxURL,operation)
        .then((response)=>{
          this.weibo.forwardWeibo.liked = like;
        })
        .then(()=>{
          if(this.weibo.forwardWeibo.liked){
            this.weibo.forwardWeibo.like++;
          }
          else{
            this.weibo.forwardWeibo.like--;
          }
        })
    },
    deleteWeibo(id){
      this.$http.delete('/weibo/'+id)
        .then(()=>{
          this.$dispatch('weiboDeleted',this.weibo);
        });
    },
  },
  components: {
    weiboText,
    userAvatar,
    operation
  }
}
</script>

<style lang="less">
  .delete-weibo-operation {
    position: absolute;
    right: 16px;
    top: 16px;
    font-size: 12px;
    em,i {
      font-style: normal;
    }
    .toggle-link {
      &:hover+.layer_menu_list {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
      }
    }
    .layer_menu_list {
      width: 80px;
      right: 0;
      background: #fff;
      color: #333;
      border: 1px solid #ccc;
      border-radius: 2px;
      padding: 2px;
      box-shadow: 0px 2px 8px 1px rgba(0,0,0,0.2);

      visibility: hidden;
      transition: .3s all ease;
      opacity: 0;
      transform: translateY(-10px);
      &:hover {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
      }
      a {
        white-space: nowrap;
        min-width: 50px;
        padding: 7px 13px;
        color: #333;
        display: block;
        cursor: pointer;
        text-decoration: none;
        &:hover {
          background-color: #f2f2f5;
          text-decoration: none;
          color: #eb7350;
        }
      }
    }
  }
  .screen_box {
    position: relative;
  }
  .deleted {
    text-align: center;
    line-height: 35px;
    font-size: 14px;
  }
  .weibo-single-weibo {
    background-color: #323233;
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
    border-radius: 2px;
    >.upper {
      padding: 20px 20px 4px;
      position: relative;
      >.avatar {
        width: 50px;
        float: left;
      }
      .right {
        padding-left: 60px;
        >.forward-weibo {
          >.content-wrapper {
            margin: 0 -20px 0 -80px;
            padding: 4px 20px 1px 80px;
          }
        }
      }
    }
    >.lower {
      >.operation {
        border-top: 1px solid #282829;
      }
    }
    .nickname-title {
      margin: 0 0 7px;
      padding: 5px 0 0;
      font-size: 14px;
      .name-title-link {
        font-weight: bold;
        color: #c8c8cc;
        &:hover {
          color: #eb7350;
        }
      }
    }
    .weibo-text-content {
      font-size: 14px;
      padding: 1px 0 0;
      // overflow: hidden;
      line-height: 23px;
      word-wrap: break-word;
      margin-bottom: 2px;
      a {
        color: #eb7350;
      }
    }
    .time {
      color: #999;
      padding-top: 5px;
      margin-bottom: 2px;
      a {
        color: #999;
        &:hover {
          color: #eb7350;
        }
      }
    }
    .forward-weibo {
      >.content-wrapper {
        background: #232324;
      }
      .nickname-title {
        font-size: 12px;
        margin-bottom: 5px;
      }
      .weibo-text-content {
        font-size: 12px;
        margin-top: -3px;
        margin-bottom: 4px;
      }
      .time-func {
        margin: 4px 0 7px;
        color: #999;
        >.time {
          padding: 0;
        }
        >.pull-right {
          ul {
            margin-right: -9px;
            li {
              display: inline-block;
              border-right: 1px solid #19191a;
              margin: 2px 0;
              padding: 0 10px;
              line-height: 12px;
              &:last-child {
                border-right: 0;
              }
              em {
                font-style: normal;
                color: #999;
              }
              em.W_ficon {
                margin-right: 5px;
              }
              a {
                color: #999;
                &:hover {
                  color: #eb7350;
                  em {
                    color: #eb7350;
                  }
                }
              }
              &.liked {
                a {
                  position: relative;
                  .W_ficon {
                    visibility: hidden;
                  }
                  &:before{
                    content: '';
                    display: inline-block;
                    position: absolute;
                    left: -5px;
                    top: -10px;
                    width: 23px;
                    height: 28px;
                    background: url(../../assets/img/steps_praised.png);
                    background-position: right;
                    background-repeat: no-repeat;
                    background-size: 483px 28px;
                    animation: likeStep .65s steps(20) both;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
