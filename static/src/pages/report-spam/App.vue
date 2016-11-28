<template>
  <div class="report-spam">
    <div class="cp_paper clearfix">
      <!--头部-->
      <div class="cp_paper_head clrfloat">
        <!--我要举报的是-->
        <div class="cp_txt_to">我要举报的是 “<a href="miit" class="cp_link_blue">@工信微报</a>” 发的微博：</div>
        <!--//我要举报的是-->
        <!--举报的微博-->
        <div class="cp_wb_short" node-type="abstract">
          <dl class="clrfloat">
            <dt>
              <a target="_blank" href="miit"><img src="http://tva2.sinaimg.cn/crop.0.0.149.149.50/005CvelIjw1ev7n15yxc6j3046046glq.jpg"></a>
            </dt>
            <dd>
              <a target="_blank" href="miit" class="cp_link_blue">@工信微报</a>
              ：为完善云服务市场环境，促进互联网产业健康有序发展，工信部起草了《关于规范云服务...
            </dd>
          </dl>
        </div>
        <!--举报原因单选-->
        <div class="cp_radiobox clrfloat">
          <span class="radiobox_tit"> 请选择举报类型：</span>
          <div class="radiobox">
            <p v-for="type in types">
              <label class="cholab" >
                <input type="radio" class="W_radio" name="type" :value="type" v-model="selected">
                <span>{{type}}</span>
              </label>
            </p>
          </div>
        </div>
        <!--//举报原因单选-->
      </div>
      <!--//头部-->
      <!--主体-->
      <div class="cp_paper_body clrfloat">
        <!--补充说明-->
        <div class="cp_input_intro" style="visibility: visible; overflow: hidden; height: 130px;">
          <span class="intro_txt">补充举报说明：</span>
          <span class="intro_num">还可以输入<span>140</span>字</span>
          <textarea style="color: rgb(51, 51, 51);" placeholder="请详细填写，以确保举报能够被受理"></textarea>
        </div>
        <div class="cp_btnbox">
          <div>
            <button type="button" @click="submit">提交</button>
          </div>
        </div>
      </div>
      <!--//主体-->
      <!--尾部-->
      <div class="cp_paper_bottom clrfloat">
        <div class="cp_footbox">举报电话: 4000 960 960（个人） 4000 980 980（企业）</div>
      </div>
      <!--//尾部-->
    </div>

  </div>
</template>

<script>

export default {
  props: ['weibo'],
  data () {
    var types=['垃圾营销','不实信息','有害信息','违法信息','淫秽色情','人身攻击我'];
    return {
      types: types,
      selected: '',
    }
  },
  methods: {
    submit(){
      //去首页
    }
  },
  computed: {

  },
}
</script>

<style lang="less">
  @import "../../common.less";
  body {
    background: url("http://img.t.sinajs.cn/t4/appstyle/complaint/images/bg_fill_h.jpg?id=1384510631791") repeat-x ,url("http://img.t.sinajs.cn/t4/appstyle/complaint/images/bg.jpg?id=1384510631791") no-repeat center 0 #abcedf;
    padding-top: 25px;
    color: #333;
  }
  a {
    color: #0078b6;
  }
  .cp_paper {
    margin: 0 auto;
    width: 462px;
  }
  .cp_txt_to {
    display: inline;
    float: left;
    color: #666;
  }
  .cp_wb_short {
    display: inline;
    float: left;
    width: 380px;
    height: 50px;
    background: #e6e6e6;
    overflow: hidden;
    margin-top: 10px;
  }
  .cp_wb_short dl {
    margin-top: 10px;
  }
  .cp_radiobox {
    position: relative;
    display: inline;
    float: left;
    width: 380px;
    margin-top: 20px;
    padding-bottom: 19px;
    .radiobox {
      padding: 10px;
      p {
        margin: 0;
        display: inline-block;
        width: 50%;
        line-height: 25px;
      }
    }
  }
  .cp_radiobox .radiobox_tit {
    display: block;
    margin-left: 20px;
    padding-bottom: 2px;
    color: #666;
    font-size: 14px;
  }
  .cp_wb_short dt {
    display: inline;
    float: left;
    margin-left: 10px;
    width: 30px;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .cp_wb_short dd {
    margin-left: 50px;
    line-height: 15px;
  }
  .cp_paper_head {
    width: 462px-41px-41px;
    min-height: 290px-54px;
    background: url("http://img.t.sinajs.cn/t4/appstyle/complaint/images/paper.png?id=1384510631791") no-repeat;
    padding: 54px 41px 0px;
  }
  .cp_paper_body {
    min-height: 36px;
    background: url("http://img.t.sinajs.cn/t4/appstyle/complaint/images/bg_paperfill.png?id=1384510631791") repeat-y;
    .cp_input_intro {
      float: left;
      height: 130px;
      margin-left: 11px;
      background: url("http://img.t.sinajs.cn/t4/appstyle/complaint/images/bg_other.jpg?id=1384510631791") no-repeat;
      .intro_txt {
        float: left;
        margin: 15px 0 0 49px;
        color: #666;
        font-size: 14px;
      }
      .intro_num {
        float: right;
        margin: 3px 31px 0 0;
        color: #999;
        font-size: 12px;
        span {
          font-size: 24px;
          font-family: Constantia;
          font-weight: bold;
          font-style: italic;
        }
      }
      textarea {
        display: inline;
        float: left;
        margin: 10px 0 0 49px;
        padding: 5px;
        width: 348px;
        height: 58px;
        border: solid 1px #ccc;
        border-radius: 3px;
        color: #ccc;
        line-height: 16px;
        resize: none;
        outline: 0;
      }
    }
  }
  .cp_btnbox {
    margin: 20px 0 0 61px;
    padding-bottom: 30px;
    float: left;
  }
  .cp_paper_bottom {
    width: 462px;
    height: 38px;
    background: url("http://img.t.sinajs.cn/t4/appstyle/complaint/images/paper.png") no-repeat 0 bottom;
  }
  .cp_footbox {
    margin: 0 0 0 11px;
  }
  .cp_footbox {
    width: 440px;
    border-top: dashed 1px #ccc;
    color: #bbb;
    text-align: center;
    line-height: 30px;
    text-shadow: 0 1px 1px #fff;
  }
  .cp_btnbox button {
    display: block;
    width: 55px;
    height: 24px;
    background: url("http://img.t.sinajs.cn/t4/appstyle/complaint/images/btn.png?id=1384510631791") no-repeat;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    border: 0;
    cursor: pointer;
    &:hover {
      background-position: 0 -40px;
      text-decoration: none;
    }
    &[disabled]{
      background: rgb(187, 187, 187);
    }
  }
</style>
