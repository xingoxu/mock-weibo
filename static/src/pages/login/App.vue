<template lang="html">
  <div>
    <div class="upper">
      <div class="middle-container clrfloat">
        <a class="logo" href="/"></a>
        <div class="left">
          <h1>随时随地发现新鲜事</h1>
        </div>
        <div class="right">
          <div class="login-panel">
            <div class="title">
              <h3>账号登录</h3>
            </div>
            <div class="W_login_form" >
              <div class="info_list username"  >
                <div class="input_wrap" :class="{'focus': blur=='username'}">
                  <input class="W_input" placeholder="用户名" maxlength="128" name="username" type="text" @focus="blur='username'" @blur="blur=''" :disabled="inputDisabled" v-model="model.username">
                </div>
              </div>
              <div class="info_list password">
                <div class="input_wrap" :class="{'focus': blur=='password'}">
                  <input class="W_input" maxlength="24" placeholder="请输入密码" name="password" type="password" @focus="blur='password'" @blur="blur=''" :disabled="inputDisabled" v-model="model.password">
                </div>
              </div>
              <div class="info_list login_btn">
                <button class="W_btn_a btn_32px" @click="submit" :disabled="inputDisabled">
                  <span>登录</span>
                </button>
              </div>
              <div class="info_list register">
                <span class="S_txt2">还没有微博？</span><a target="_blank" href="/register">立即注册!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        blur: '',
        inputDisabled: false,
        model: {
          username: '',
          password: ''
        }
      }
    },
    methods:{
      submit(){
        this.inputDisabled = true;
        this.$http.post('/login',this.model)
        .then((response)=>{
          var data = JSON.parse(response.data);
          if(data.success){
            document.cookie = response.headers.get('Set-Cookie');
            location.href = "/";
          }
          else{
            alert(data.reason);
          }
          return data;
        })
        .then(()=>{
          this.inputDisabled = false;
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../common.less";
  body {
    background: url("http://img.t.sinajs.cn/t6/skin/default/images/body_bg.jpg?id=20140928183500") no-repeat top center, url("http://img.t.sinajs.cn/t6/skin/default/images/body_repeat.png?id=1410943047113") repeat-x center 0 #d4d5e0;
  }
  .upper {
    min-width: 958px;
    height: 452px;
    background: url("../../assets/img/bg_nologin5.jpg") no-repeat center;
    background-size: cover;
    .logo {
      position: absolute;
      display: block;
      width: 140px;
      height: 48px;
      background: url("https://ooo.0o0.ooo/2016/12/06/5846c3063e23e.png") no-repeat 0 50%;
      background-position: 50% 40%;
      background-size: 70%;
      margin-top: 23px;
      margin-left: 10px;
      top: 0;
      left: 0;
    }
  }
  .middle-container {
    width: 958px;
    margin: 0 auto;
    position: relative;
    padding-top: 88px;
    >.left {
      float: left;
      width: ~"calc(100% - 302px)";
      line-height: 302px;
      text-align: center;
      h1 {
        margin: 0;
        color: #FFF;
        letter-spacing: 8px;
        font-size: 34px;
        font-weight: normal;
      }
    }
    >.right {
      float: right;
      width: 300px;
      height: 300px;
      background: rgba(0, 0, 0, .5);
    }
  }
  .login-panel {
    padding: 8px 16px;
    .title>h3 {
      font-size: 16px;
      font-weight: normal;
      line-height: 34px;
      margin: 0;
      text-align: center;
      border-bottom: 2px solid rgb(250, 125, 60);
    }
    .W_login_form {
      padding: 16px;
    }
    .info_list {
      margin-top: 12px;
    }
    .input_wrap {
      background-image: url("../../assets/img/sprite_login.png");
      background-repeat: no-repeat;
      height: 28px;
      padding: 2px 0;
      border: 1px solid #ccc;
      border-radius: 2px;
      background-color: #FFF;
      &.focus{
        border-color: rgb(250, 125, 60);
      }
      .W_input {
        margin-left: 34px;
        width: ~"calc(100% - 36px)";
        border: 0;
        box-shadow: none;
        height: 28px;
        line-height: normal;
        padding: 0 0 0 2px;
        vertical-align: middle;
        outline-style: none;
        color: #808080;
      }
    }
    .username .input_wrap {
      background-position: 11px -91px;
    }
    .password .input_wrap {
      background-position: -39px -91px;
    }
    .register {
      text-align: center;
      a {
        color: #f7671d;
      }
    }
  }
  .btn_32px {
    display: block;
    line-height: 33px;
    padding: 0;
    font-size: 16px;
  }
  .W_btn_a {
    white-space: nowrap;
    border-radius: 2px;
    min-width: 40px;
    text-align: center;
    outline: none;
    background: #ff8140;
    border: 1px solid #f77c3d;
    color: #fff;
    box-shadow: 0px 1px 2px rgba(0,0,0,0.25);
    width: 100%;
    &:hover {
      background: #f7671d;
      border: 1px solid #f06923;
    }
  }
</style>
