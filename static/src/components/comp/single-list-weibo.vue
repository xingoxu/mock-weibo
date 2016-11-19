<template lang="html">
  <div class="single-list-weibo">
    <!-- 单条单行微博（评论/转发） -->
    <user-avatar size="30" class="avatar"></user-avatar>
    <div class="content">
      <div class="weibo-text">
        <user-card>
          <a href="#" class="name-title-link">xingo</a>
        </user-card>：<weibo-text class="text" weibo-text="今天是个好天气@测试 今天是个好天气@测试 今天是个好天气@测试 今天是个好天气@测试"></weibo-text>
      </div>
      <div class="func clrfloat">
        <span class="time">7分钟前</span>
        <div class="operation pull-right">
          <ul class="clrfloat">
            <li class="pull-left">
              <span class="line S_line1">
                <a href="javascript:void(0);" class="S_txt1">回复</a>
              </span>
            </li>
            <li class="pull-left">
              <span class="line S_line1">
                <a href="javascript:void(0);" class="S_txt1" :class="{'liked': isLiked}" @click="isLiked=!isLiked">
                  <em class="W_ficon ficon_praised S_txt2">ñ</em><em>赞</em>
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userAvatar from './normal-user-avatar';
import weiboText from './weibo-text';
export default {
  data(){
    return {
      isLiked: false,
    }
  },
  components: {
    weiboText,
    userAvatar
  }
}
</script>

<style lang="less">
  .single-list-weibo {
    >.avatar {
      float: left;
      padding-top: 6px;
    }
    >.content {
      margin-left: 40px;
      >.weibo-text{
        font-size: 12px;
        line-height: 23px;
        padding-bottom: 2px;
        a {
          color: #eb7350;
        }
        >.text {
          display: inline;
        }
      }
      .func {
        .operation{
          margin-right: -9px;
          >ul>li{
            > span{
              display: block;
              margin: 2px 0;
              padding: 0 10px;
              border-right: 1px solid #19191a;
              line-height: 12px;
              a {
                color: #c8c8cc;
                position: relative;
                em {
                  font-style: normal;
                }
                em.W_ficon {
                  margin-right: 6px;
                }
                &:hover {
                  color: #eb7350;
                }
                &.liked {
                  .W_ficon {
                    visibility: hidden;
                  }
                  &:before{
                    content: '';
                    display: inline-block;
                    position: absolute;
                    left: -6px;
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
            &:last-child>span{
              border-right: 0;
            }
          }
        }
      }
    }
  }
</style>
