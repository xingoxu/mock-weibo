<template>
  <div class="security-panel">
    <div class="title">
      <span>账号安全</span>
    </div>
    <div class="panel clrfloat">
      <ul class="left_list S_line1 W_fl">
        <li class="on S_line1">
          <span class="s_icon icon_01"></span><a>修改密码</a>
        </li>
      </ul>
      <div class="right_mod W_fr">
        <div class="form_mod">
            <div class="W_tips tips_warn clearfix">
                <p class="icon"><i class="W_icon icon_warnS icon-background"></i></p>
                <p class="txt">为保障您的帐号安全，修改密码前请填写原密码</p>
            </div>
            <ul class="form_list">
                <li class="item">
                    <span class="tit">原密码：</span>
                    <input type="password" class="W_input" placeholder="请输入原密码">
                </li>
                <li class="item">
                    <span class="tit">新密码：</span>
                    <input type="password" class="W_input" placeholder="请输入新密码" v-model="password">
                </li>
                <li class="item">
                    <span class="tit">确认新密码：</span>
                    <input type="password" class="W_input" placeholder="请再一次输入新密码">
                </li>
            </ul>
            <div class="form_btn S_line2">
              <div class="tip">
                <div class="success" v-show="status=='success'" transition="up">
                  <i class="icon_succS icon-background"></i>修改成功
                </div>
                <div class="failed" v-show="status=='fail'">
                  <i class="icon_rederrorS icon-background"></i>{{failReason}}
                </div>
              </div>
              <button class="W_btn_a btn_34px" @click="submit">修改</button>
            </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  props: ['currentUser'],
  data () {
    return {
      failReason: '',
      status: '',
      password: '',
    }
  },
  methods: {
    submit(){
      this.$http.post('/password',{
        userid: this.currentUser.userid,
        weiboid: 0,
        name: this.password,
        target_userid: 0,
        commentid: 0,
        time: Date.now() + '',
      })
        .then(()=>{
          this.status='success';
          setTimeout(()=>{
            window.location.href="/logout";
          },3000);
        })
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  div.security-panel {

    >.title {
      color: #333;
      height: 46px;
      padding-left: 10px;
      line-height: 46px;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-color: #d9d9d9;
      font-size: 14px;
      font-weight: 700;
      span {
        margin: 0 5px;
      }
    }
    .left_list {
      width: 139px;
      height: 457px;
      padding: 10px 0 0 10px;
      background: #f2f2f5;
      border-right-width: 1px;
      border-right-style: solid;
      border-color: #d9d9d9;
      li {
        width: 129px;
        height: 32px;
        padding-left: 10px;
        line-height: 32px;
        cursor: pointer;
        border-color: #d9d9d9;
        &.on{
          width: 130px;
          padding-left: 9px;
          background: #fff;
          border-width: 1px;
          border-style: solid;
          border-right: 0;
        }
        a {
          color: #333;
        }
        .s_icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 7px;
          vertical-align: middle;
          background-image: url("https://security.weibo.com/app/images/security/security_icon.png");
        }
      }
    }
    .right_mod {
      padding: 0 20px;
      margin-left: 150px;
      p {
        margin: 0;
      }
    }
    .form_mod {
      position: relative;
      height: 447px;
      padding-top: 20px;
      .form_list {
        margin-top: 15px;
        .item {
          line-height: 35px;
          margin-bottom: 7px;
        }
        .tit {
          display: inline-block;
          width: 165px;
          margin-right: 3px;
          text-align: right;
          color: #333;
        }
        .W_input {
          width: 196px;
          padding: 0 0 0 2px;
          height: 33px;
          line-height: 33px;
          background-color: #FFF;
          border: 1px solid #cccccc;
          color: #808080;
          vertical-align: middle;
          box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.15) inset;
          outline: 0;
          &:focus {
            border-color: #fa7d3c;
            box-shadow: none;
          }
        }
      }
    }
    .form_btn {
      position: absolute;
      bottom: 0;
      width: 447px;
      padding: 10px 0;
      text-align: center;
      border-top-width: 1px;
      border-top-style: solid;
      border-color: #f2f2f5;
      >button {
        background: #ff8140;
        border: 1px solid #f77c3d;
        color: #fff;
        box-shadow: 0px 1px 2px rgba(0,0,0,0.25);
        display: inline-block;
        height: 34px;
        font-size: 14px;
        padding: 0 25px;
        border-radius: 2px;
        min-width: 90px;
        cursor: pointer;
        &:hover {
          background: #f7671d;
          border: 1px solid #f06923;
        }
      }
      >.tip {
        position: absolute;
        left: 0;
        height: 28px;
        overflow: hidden;
        width: 100%;
        bottom: 100%;
        text-align: center;
        >div {
          display: inline-block;
          border: 1px solid #e4e7f8;
          background: #f8f9fe;
          padding: 5px 7px 4px 10px;
          color: #808080;
          i {
            display: inline-block;
            vertical-align: middle;
            margin: 0 5px 0 0;
          }
        }
      }
    }
    .W_fl {
      float: left;
    }
    .W_tips {
      font-size: 12px;
      overflow: hidden;
      padding: 5px 7px 4px 10px;
      text-align: center;
      letter-spacing: normal;
      word-spacing: normal;
      &.tips_warn {
        border: 1px solid #e4e7f8;
        background: #f8f9fe;
        line-height: 12px;
        color: #808080;
      }
      p {
        display: inline;
      }
      .icon{
        vertical-align: -3px;
        i {
          display: inline-block;
        }
      }
    }
  }
  .up-transition {
    transition: .2s transform ease;
    transform: translateY(0);
  }
  .up-enter, .up-leave {
    transform: translateY(100%);
  }
</style>
