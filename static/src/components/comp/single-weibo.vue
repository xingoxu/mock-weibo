<template lang="html">
  <div class="weibo-single-weibo">
    <div class="upper">
      <div class="avatar">
        <user-avatar size="50" :src="weibo.user.avatar" :userid="weibo.user.userid"></user-avatar>
      </div>
      <div class="right">
        <div class="nickname-title">
          <user-card>
            <a href="/user/{{weibo.user.userid}}" class="name-title-link">{{weibo.user.username}}</a>
          </user-card>
        </div>
        <div class="weibo-text-content">
          <weibo-text :weibo-text="weibo.text"></weibo-text>
        </div>
        <!-- 扩展here （图片/转发） -->
        <div class="forward-weibo" v-if="weibo.forwardWeibo">
          <div class="content-wrapper">
            <div class="nickname-title">
              <user-card>
                <a href="/user/{{weibo.forwardWeibo.user.userid}}" class="name-title-link">@{{weibo.forwardWeibo.user.username}}</a>
              </user-card>
            </div>
            <div class="weibo-text-content">
              <weibo-text :weibo-text="weibo.forwardWeibo.text"></weibo-text>
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
        <div class="time">
          <a href="/weibo/{{weibo.weiboid}}">{{weibo.time | showTime}}</a>
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
  props: ['weibo','isSingleWeibo'],
  ready(){
  },
  methods: {
    forwardWeiboLike(){
      //提交业务逻辑
      this.weibo.forwardWeibo.liked = !this.weibo.forwardWeibo.liked;
      if(this.weibo.forwardWeibo.liked){
        this.weibo.forwardWeibo.like++;
      }
      else {
        this.weibo.forwardWeibo.like--;
      }
    }
  },
  components: {
    weiboText,
    userAvatar,
    operation
  }
}
</script>

<style lang="less">
  .weibo-single-weibo {
    background-color: #323233;
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
    border-radius: 2px;
    >.upper {
      padding: 20px 20px 4px;
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
