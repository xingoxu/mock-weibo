<template>
  <div class="left-col">
    <ul>
      <!-- 各数值 -->
      <li>
        <div class="status">
          <ul>
            <li v-for="status in cardLowerStatus">
              <a href="/user/{{targetUserCard.userid}}{{status.link}}">
                <strong>{{targetUserCard[status.key]}}</strong>
                <span>{{status.showText}}</span>
              </a>
            </li>
          </ul>
        </div>
      </li>
      <!-- 个人资料 -->
      <li>
        <ul class="detail">
          <li class="item S_line2 clrfloat" v-if="targetUser.area">
            <span class="item_ico W_fl"><em class="W_ficon ficon_cd_place S_ficon">2</em></span>
            <span class="item_text W_fl">{{targetUser.area}}</span>
          </li>
          <li class="item S_line2 clrfloat">
            <span class="item_ico W_fl"><em class="W_ficon ficon_constellation S_ficon">ö</em></span>
            <span class="item_text W_fl">{{targetUser.birthday}}</span>
          </li>
          <li class="item S_line2 clrfloat">
            <span class="item_ico W_fl"><em class="W_ficon ficon_pinfo S_ficon">Ü</em></span>
            <span class="item_text W_fl">{{targetUser.intro ? targetUser.intro : '还没有做自我介绍哦'}}</span>
          </li>
          <li class="item S_line2 clrfloat">
            <span class="item_ico W_fl"><em class="W_ficon ficon_email S_ficon">ý</em></span>
            <span class="item_text W_fl">{{targetUser.mail}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['targetUserCard','targetUser'],
    data() {
      var cardLowerStatus = [{
        key: 'following',
        link: '/follow',
        showText: '关注'
      },{
        key: 'fans',
        link: '/fans',
        showText: '粉丝'
      },{
        key: 'weibo',
        link: '',
        showText: '微博'
      }];

      return {
        cardLowerStatus: cardLowerStatus,

      }
    }
  }
</script>

<style lang="less">
  .link() {
    font-size: 14px;
    font-weight: bold;
    color: #c8c8cc;
    &:hover {
      color: #eb7350;
    }
  }
  .left-col {
    >ul {
      >li {
        background: #323233;
        margin-bottom: 16px;
        box-shadow: 0 0 2px rgba(0,0,0,0.2);
        border-radius: 2px;
      }
    }
    .status {
      padding: 12px 0;
      >ul{
        li {
          float: left;
          width: 33%;
          border-right: 1px solid #19191a;
          text-align: center;
          &:last-child {
            border-right: 0;
          }
          >a {
            .link();
            font-size: 18px;
            font-family: Arial, "Microsoft YaHei";
            line-height: 14px;
            strong,span {
              display: block;
            }
            span {
              font-weight: normal;
              font-size: 12px;
              line-height: 1.3;
              color: #999;
            }
            strong {
              font-family: Tahoma;
              font-weight: 400;
              margin: 2px 0 6px 0;
            }
            &:hover {
              span {
                color: #999;
              }
            }
          }
        }
        &:after {
          display:block;
          content: '';
          clear: left;
        }
      }
    }
    .detail {
      padding: 6px 16px 8px;
      >li {
        padding: 7px 0 5px 0;
        border-bottom: 1px solid #282829;
        line-height: 18px;
        &:last-child {
          border-bottom: 0;
        }
        .W_fl {
          float: left;
        }
        .item_ico {
          width: 25px;
        }
        .item_text {
          width: 243px;
          margin-top: 1px;
          word-wrap: break-word;
        }
      }
    }
  }
</style>
