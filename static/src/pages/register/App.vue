<template lang="html">
  <div class="register-main">
    <div class="reg-header">
      <div class="logo"></div>
    </div>
    <div class="form-wrapper">
      <n3-container fluid>
        <n3-row>
          <n3-column :col="8" class="left-col">
            <n3-form v-ref:form>
              <n3-form-item need label="注册邮箱" :label-col="3">
                <n3-input name="name" :value.sync="email" :rules="[{type:'required'}]" :custom-validate="mailValidate" width="200px"></n3-input>
              </n3-form-item>
              <n3-form-item need label="密码" :label-col="3" >
                <n3-input name="name" :value.sync="password" :rules="[{type:'required'}]" type="password" width="200px"></n3-input>
              </n3-form-item>
              <n3-form-item need label="昵称" :label-col="3" >
                <n3-input name="name" :value.sync="name" :rules="[{type:'required'}]" :custom-validate="nameValidate" width="200px"></n3-input>
              </n3-form-item>
              <n3-form-item :label-col="3">
                <a class="register-button" href="javascript:void(0);" @click="submit" ><span>立即注册</span></a>
              </n3-form-item>
              <n3-form-item :label-col="3" class="register-success" :class="{'show': registerSuccess }" >
                <n3-alert type="success" message="注册成功！" description>
                  注册成功！5秒后转入首页！
                </n3-alert>
              </n3-form-item>
            </n3-form>
          </n3-column>
          <n3-column :col="4" class="right-col">
            <div class="upper">
              已有账号，<a href="/login">直接登录»</a>
            </div>
          </n3-column>
        </n3-row>
      </n3-container>
    </div>
    <footer class="clrfloat">
      <div class="left_link">
        <i class="footer_logo"></i>
        <em class="company_name">北京微梦创科网络技术有限公司</em>
        <a href="http://weibo.com/aj/static/jww.html">京网文[2011]0398-130号</a>
        <a href="http://www.miibeian.gov.cn">京ICP备12002058号</a>
      </div>
      <div class="copy">
        <span>Copyright © 2009-2016 WEIBO</span>
      </div>
    </footer>
  </div>
</template>

<script>
  import { n3Form, n3FormItem,n3Input,n3Alert,n3Row,n3Column,n3Container } from 'N3-components';
  export default {
    data(){
      return {
        blur: '',
        email:'',
        password: '',
        name: '',
        registerSuccess: false,
      }
    },
    methods:{
      mailValidate(val){
        if(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(val))
          return {
            validStatus: 'success'
          }
        return {
          validStatus: 'error',
          tips: '请输入正确邮箱！'
        }
      },
      nameValidate(val){
        if(/^[0-9a-zA-Z_\u0391-\uFFE5-]+$/g.test(val))
          return {
            validStatus: 'success'
          }
        return {
          validStatus: 'error',
          tips: '昵称仅可使用中文，英文字母，与下划线！'
        }
      },
      submit(){
        this.$refs.form.validateFields(result=>{
          if(result.isvalid){
            var registerForm = {
              email: this.email,
              password: this.password,
              name: this.name
            }
            this.$http.post('/register',registerForm)
              .then((response)=>{
                var data = response.data;
                if(data.success){
                  this.registerSuccess = true;
                  document.cookie = response.headers.get('Set-Cookie');
                  setTimeout(()=>{
                    location.href = "/";
                  },5000)
                }
                else {
                  alert(data.reason);
                }
              });
          }
        })
      }
    },
    components: {
      n3Form, n3FormItem,n3Input,n3Alert,n3Row,n3Column,n3Container
    }
  }
</script>

<style lang="less">
  @import "../../common.less";
  body {
    background: url("http://img.t.sinajs.cn/t5/style/images/register/reg_repeat_bg.png?id=1370232467958") repeat-x #bee1f5;
  }
  .register-main {
    width: 900px;
    margin: 0 auto;
  }
  .reg-header{
    height: 164px;
    background: url("http://img.t.sinajs.cn/t5/style/images/register/bg_reg_wave.png?id=1370232467958") no-repeat center bottom;
    margin: 0 auto;
    padding: 10px 0;
    .logo {
      width: 200px;
      height: 72px;
      margin: 0 auto;
      margin-top: 26px;
      background: url("http://img.t.sinajs.cn/t5/style/images/register/logo_big.png?id=1395992824012") no-repeat;
    }
  }
  div.form-wrapper {
    margin: 0 auto 15px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 2px 3px #98b4c4;
    .left-col {
      padding: 29px 0 78px 20px;
      >form {
        border-right: 1px solid rgb(222,222,222);
      }
    }
    .right-col {
      padding: 29px 29px 78px 20px;
      font-size: 14px;
      line-height: 22px;
      a {
        color: #0a8cd2;
        &:hover {
          text-decoration: underline;
        }
      }
      .upper {
        padding: 30px 0 6px 0;
        border-bottom: 1px dotted #ccc;
      }
    }
    .n3-form-control {
      box-shadow: 0px 1px 1px 0px #eaeaea inset;
      border-radius: 2px;
      border: 1px solid #ccc;
      color: #808080;
      padding: 0 0 0 2px;
      height: 30px;
      width: 196px;
      font-size: 14px;
      line-height: 1.125;
      &:focus {
        border-color: #FFB941;
      }
    }
    .n3-form-control-feedback {
      height: 30px;
      line-height: 30px;
    }
    .n3-err-tip {
      line-height: normal;
    }
    .register-button {
      display: block;
      width: 200px;
      text-align: center;
      color: #FFF;
      border: 1px solid #ff9b01;
      border-radius: 2px;
      background: #FFA00A;
      line-height: 38px;
      font-size: 16px;
      &:hover {
        background: linear-gradient(to bottom, rgba(255,184,71,1) 0%,rgba(255,162,16,1) 100%);
      }
    }

  }
  footer {
    font-size: 12px;
    line-height: 1.125;
    margin-bottom: 10px;
    .left_link {
      float: left;
      margin-right: 10px;
      color: #6e9ab8;
      a,em {
        margin-right: 10px;
        color: #6e9ab8;
      }
      .footer_logo {
        display: inline-block;
        width: 26px;
        height: 21px;
        background: url("http://img.t.sinajs.cn/t5/style/images/register/reg_ico.png?id=1370232467958") no-repeat 0 4px;
        vertical-align: -4px;
      }
    }
    .copy {
      float: right;
      text-align: right;
      color: #6e9ab8;
    }
  }
  em {
    font-style: normal;
    font-weight: normal;
  }
  .register-success {
    opacity: 0;
    transition: .2s opacity ease;
    &.show {
      opacity: 1;
    }
  }
</style>
