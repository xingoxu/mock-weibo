<template lang="html">
  <div class="single-weibo-operation">
    <ul class="WB_row_line WB_row_r4 clearfix S_line2">
      <li>
        <a href="javascript:void(0);" class="S_txt2">
          <span class="line S_line1">
            <span>
              <em class="W_ficon ficon_favorite S_ficon">û</em><em>收藏</em>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);" class="S_txt2">
          <span class="line S_line1">
            <span>
              <em class="W_ficon ficon_forward S_ficon"></em><em>转发</em>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);" class="S_txt2">
          <span class="line S_line1">
            <span>
              <em class="W_ficon ficon_repeat S_ficon"></em><em>评论</em>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="javascript:;" class="S_txt2" @click="isLiked=!isLiked" :class="{'liked': isLiked}">
          <span class="line S_line1">
            <span>
              <em class="W_ficon ficon_praised S_txt2">ñ</em><em>赞</em>
            </span>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isLiked: false
    }
  }
}
</script>

<style lang="less">
  .single-weibo-operation {
    ul {
      display: block;
      li {
        display: inline-block;
        margin-right: -4px;
        width: 25%;
        text-align: center;
        font-size: 12px;
        em {
          font-style: normal;
        }
        a {
          display: block;
          padding: 7px 0;
          font-size: 12px;
          color: #999;
          >.line {
            display: block;
            border-right: 1px solid #19191a;
            line-height: 22px;
            >span {
              position: relative;
            }
          }
          em {
            margin: 0 3px;
            vertical-align: middle;
          }
          .W_ficon {
            font-size: 15px;
            vertical-align: sub;
          }
        }
        &:last-child {
          a {
            >.line {
              border-right: 0;
            }
          }
        }
        &:hover {
          a {
            color: #eb7350;
            em {
              color: #eb7350;
            }
          }
        }

        a.liked {
          >.line>span {
            .W_ficon {
              visibility: hidden;
            }
            &:before{
              content: '';
              display: inline-block;
              position: absolute;
              left: -1px;
              top: -8px;
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
  @keyframes likeStep {
    0% {
      background-position: left;
    }
    100% {
      background-position: right;
    }
  }
</style>
