<template>
  <div class="middle-col-wrapper">
    <header>
      <span>全部关注</span> <small>412</small>
    </header>
    <div class="wrapper">
      <ul class="members clrfloat">
        <li>
          <div>
            <div class="pic-wrapper">
              <a href="#">
                <img src="http://tva2.sinaimg.cn/crop.157.181.589.589.50/005D4NPMjw8f15pcd6v37j30pb0qcmyt.jpg" width="50" height="50">
              </a>
            </div>
            <div class="info">
              <div class="title">
                <a target="_blank" href="/u/5158086142?from=myfollow_all" class="S_txt1" >Splendent 丶 star 太上...</a>
              </div>
              <div class="status">
                <em class="W_ficon ficon_right S_ficon">Y</em>
                <span class="S_txt1"> 已关注</span>
              </div>
              <div class="intro">
                简介： 1234567
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
  props:['currentUser'],
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
