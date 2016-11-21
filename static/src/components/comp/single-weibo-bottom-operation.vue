<template lang="html">
  <div class="single-weibo-operation">
    <ul class="WB_row_line WB_row_r4 clearfix S_line2">
      <li :class="{'favourited': weibo.favourited }">
        <a href="javascript:void(0);" class="S_txt2" @click="favouriteWeibo">
          <span class="line S_line1">
            <span>
              <em class="W_ficon ficon_favorite S_ficon">û</em><em>{{weibo.favourited ? '已收藏' : '收藏'}}</em>
            </span>
          </span>
        </a>
      </li>
      <li :class="{'open': forwardExpanded}">
        <a href="javascript:void(0);" class="S_txt2" @click="expandForward">
          <span class="line S_line1">
            <span>
              <em class="W_ficon ficon_forward S_ficon"></em><em>{{weibo.forward>0 ? weibo.forward : '转发'}}</em>
            </span>
          </span>
        </a>
      </li>
      <li :class="{'open': commentExpanded}">
        <a href="javascript:void(0);" class="S_txt2" @click="expandComment">
          <span class="line S_line1">
            <span>
              <em class="W_ficon ficon_repeat S_ficon"></em><em>{{weibo.comment>0 ? weibo.comment : '评论'}}</em>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="javascript:;" class="S_txt2" @click="likeWeibo" :class="{'liked': weibo.liked}">
          <span class="line S_line1">
            <span>
              <em class="W_ficon ficon_praised S_txt2">ñ</em><em>{{weibo.like>0 ? weibo.like : '赞'}}</em>
            </span>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['isSingleWeibo','weibo'],//是否为单条微博，是的话转发则显示三角形
  data(){
    return {
      commentExpanded: false,
      forwardExpanded: false,
    }
  },
  methods:{
    expandComment(){
      this.$dispatch('comment');
      this.commentExpanded = !this.commentExpanded;
      if(this.commentExpanded)
        this.$dispatch('expandComment');
      else
        this.$dispatch('closeComment');
    },
    expandForward(){
      if(this.isSingleWeibo){
        this.forwardExpanded = true;
      }
      this.$dispatch('expandForward',this.weibo);
    },
    favouriteWeibo(){
      if(!this.weibo.favourited){
        //处理业务
        this.$dispatch('weiboFavourited');
        this.weibo.favourited = true;
      }
      else {
        this.$dispatch('cancelFavourite',this.weibo.weiboid);//发送事件给顶层，让顶层转发给popup
      }
    },
    likeWeibo(){
      //提交业务逻辑
      this.weibo.liked = !this.weibo.liked;
      if(this.weibo.liked){
        this.weibo.like++;
      }
      else{
        this.weibo.like--;
      }
    }
  },
  events: {
    weiboFavouritCancelled: function(weiboID){
      if(weiboID==this.weibo.weiboid)
        this.weibo.favourited = false;
    },
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

        position: relative;
        &.open {
          .tri(){
            position: absolute;
            bottom: 0px;
            left: 50%;
            margin-left: -10px;
            content: '';
            width: 0;
            height: 0;
          }
          &:before { //三角
            .tri();
            // top: -10px;
            margin-left: -11px;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 6px solid #19191a;
          }
          &:after {
            .tri();
            bottom: -1px;
            border-left: 9px solid transparent;
            border-right: 9px solid transparent;
            border-bottom: 6px solid #232324;
          }
        }
        &.favourited {
          em.W_ficon {
            color: #fa7d3c;
          }
        }
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
            height: 22px;
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
</style>
