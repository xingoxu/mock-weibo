<template>
  <ul class="search-list">
    <li v-for="user in users">
      <div class="list_person clearfix">
        <div class="person_pic">
          <a target="_blank" href="/user/{{user.userid}}"><img class="W_face_radius" :src="user.avatar ? user.avatar :'http://tva1.sinaimg.cn/default/images/default_avatar_female_50.gif'" height="80" width="80"></a>
        </div>
        <div class="person_detail">
          <p class="person_name">
            <a class="W_texta W_fb" target="_blank" href="/user/{{user.userid}}">
              {{user.username}}
            </a>
          </p>
          <p class="person_num">
            <span> 关注 <a class="W_linkb" href="/user/{{user.userid}}/follow" target="_blank" >{{user.following}}</a></span>
            <span> 粉丝 <a class="W_linkb" href="/user/{{user.userid}}/fans" target="_blank">{{user.fans}}</a></span>
            <span> 微博 <a class="W_linkb" href="/user/{{user.userid}}" target="_blank">{{user.weibo}}</a></span></p>
          <div class="person_info">
            <p>简介： {{user.intro ? user.intro : '还没有做自我介绍哦'}}</p>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
  export default {
    props: ['users'],
  }
</script>
<style lang="less">
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
