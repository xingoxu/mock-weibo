<template>
  <div class="search-user">
    <div>
      <ul class="search-list">
        <li>
          <div class="list_person clearfix">
            <div class="person_pic">
              <a target="_blank" href="http://weibo.com/pokemonxu?refer_flag=1001030201_"><img class="W_face_radius" src="http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg" height="80" width="80"></a>
            </div>
            <div class="person_detail">
              <p class="person_name">
                <a class="W_texta W_fb" target="_blank" href="http://weibo.com/pokemonxu?refer_flag=1001030201_" title="xingo">
                  xingo
                </a>
              </p>
              <p class="person_num">
                <span> 关注 <a class="W_linkb" href="http://weibo.com/1804320382/follow?refer_flag=1001030201_" target="_blank" >412</a></span>
                <span> 粉丝 <a class="W_linkb" href="http://weibo.com/1804320382/fans?refer_flag=1001030201_" target="_blank">756</a></span>
                <span> 微博 <a class="W_linkb" href="http://weibo.com/1804320382/profile?refer_flag=1001030201_" target="_blank">8086</a></span></p>
              <div class="person_info">
                <p>简介： 立派なショタコン</p>
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
  props:[],
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
  .search-user {
    >div {
      background-color: #323233;
    }
  }

  .search-list {
    li {
      padding: 16px 14px 17px 18px;
      color: #c8c8cc;
      a {
        font-weight: bold;
        color: #c8c8cc;
        &:hover {
          color: #eb7350;
        }
      }
      .person_pic {
        float: left;
        margin-top: 4px;
        img {
          border-radius: 50%;
        }
      }
      .person_detail {
        margin: 0 30px 0 95px;
        line-height: 21px;
        zoom: 1;
      }
    }
  }

</style>
