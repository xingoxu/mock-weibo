<template>
  <div class="middle-col-wrapper">
    <header>
      <span>全部关注</span> <small>412</small>
    </header>
    <div class="wrapper">
      <ul class="members clrfloat">
        <li v-for="user in users">
          <div>
            <div class="pic-wrapper">
              <a href="/user/{{user.userid}}">
                <img :src="(user.avatar && user.avatar!='null') ? user.avatar :'http://tva1.sinaimg.cn/default/images/default_avatar_female_50.gif'" width="50" height="50">
              </a>
            </div>
            <div class="info">
              <div class="title">
                <a href="/user/{{user.userid}}" class="S_txt1" >{{user.username}}</a>
              </div>
              <div class="status">
                <span v-if="user.followed && user.beFollowed">
                  <em class="W_ficon ficon_addtwo S_ficon">Z</em>互相关注
                  <!-- <em class="W_ficon ficon_arrow_down_lite S_ficon">g</em> -->
                </span>

                <span v-if="user.followed && !user.beFollowed">
                  <em class="W_ficon ficon_right S_ficon">Y</em>已关注
                  <!-- <em class="W_ficon ficon_arrow_down_lite S_ficon">g</em> -->
                </span>
              </div>
              <div class="intro">
                <span>{{user.intro ? user.intro : '他还没有填自我介绍'}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>

export default {
  props:['users'],
  data () {
    return {
    }
  },
  events: {

  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .middle-col-wrapper {
    background: #323233;
    border-radius: 2px;
    // padding: 20px;
    >header {
      line-height: 38px;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-color: #282829;
      padding: 0 6px 0 16px;
      font-weight: bold;
      font-size: 14px;
    }
    .members li {
      float: left;
      width: 274px;
      height: 108px;
      margin: 6px 0 0 6px;
      padding: 16px 0 16px 16px;
      border-radius: 2px;
      background-color: #232324;
      .pic-wrapper {
        float: left;
        position: relative;
        width: 66px;
        height: 108px;
        border-right-width: 1px;
        border-right-style: solid;
        border-color: #19191a;
        a {
          display: block;
          margin-top: 29px;
        }
        img {
          display: block;
          border-radius: 50%;
        }
      }
      .info {
        margin-left: 82px;
        .title {
          line-height: 1em;
          margin-bottom: 5px;
          font-size: 14px;
          font-weight: bold;
          a {
            color: #c8c8cc;
            text-decoration: none;
            &:hover {
              color: #eb7350;
            }
          }
        }
        .status {
          margin-bottom: 5px;
          font-size: 12px;
          color: #c8c8cc;
          em {
            margin-right: 5px;
          }
        }
        .intro {
          padding-right: 10px;
          color: #999;
          word-break: break-all;
        }
      }
    }

  }

</style>
