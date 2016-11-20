<template lang="html">
  <div class="weibo-single-weibo">
    <div class="upper">
      <div class="avatar">
        <user-avatar size="50"></user-avatar>
      </div>
      <div class="right">
        <div class="nickname-title">
          <user-card>
            <a href="#" class="name-title-link">xingo</a>
          </user-card>
        </div>
        <div class="weibo-text-content">
          <weibo-text weibo-text="今天是个好天气@测试"></weibo-text>
        </div>
        <!-- 扩展here （图片/转发） -->
        <div class="forward-weibo">
          <div class="content-wrapper">
            <div class="nickname-title">
              <user-card>
                <a href="#" class="name-title-link">@xingo</a>
              </user-card>
            </div>
            <div class="weibo-text-content">
              <weibo-text weibo-text="今天是个好天气@测试"></weibo-text>
            </div>
            <div class="time-func clrfloat">
              <div class="time pull-left">
                <a href="#">7分钟前</a>
              </div>
              <div class="pull-right">
                <ul>
                  <li>
                    <span class="line S_line1">
                      <a class="S_txt2" target="_blank" href="/1199444583/Eij3crYHz?type=repost" >
                        <!-- 转发 -->
                        <span><em class="W_ficon ficon_forward S_ficon"></em><em>53</em></span>
                      </a>
                    </span>
                  </li>
                  <li>
                    <span class="line S_line1">
                      <a class="S_txt2" target="_blank" href="/1199444583/Eij3crYHz" >
                        <!-- 回复 -->
                        <span><em class="W_ficon ficon_repeat S_ficon"></em><em>4</em></span>
                      </a>
                    </span>
                  </li>
                  <li>
                    <span class="line S_line1">
                      <a class="S_txt2" href="javascript:void(0);">
                        <!-- 点赞 -->
                        <span><em class="W_ficon ficon_praised S_txt2">ñ</em><em>9</em></span>
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="time">
          <a href="#">7分钟前</a>
        </div>
      </div>
    </div>
    <div class="lower">
      <operation class="operation"></operation>
    </div>
  </div>
</template>

<script>
import weiboText from './weibo-text';
import userAvatar from './normal-user-avatar';
import operation from './single-weibo-bottom-operation';
export default {
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
              }
            }
          }
        }
      }
    }
  }
</style>
