<template>
  <div>
    <div class="profile-wrapper">
      <ul>
        <li v-for="profilePage in profileArray">
          <fieldset class="S_line2">
            <legend class="tit S_txt1">{{profilePage.text}}</legend>
            <div class="btns" v-if="$index == 0">
              <a class="W_btn_round" href="javascript:void(0)" @click="isEditing = !isEditing"><span>{{isEditing ? '保存' : '编辑'}}</span></a>
            </div>
          </fieldset>
          <ul>
            <li v-for="input in profilePage.inputs" class="field-item">
              <div class="label pull-left">{{input.text}}</div>
              <div class="fields">
                <input type="text" v-model="fullUserData[input.key]" v-if="input.type !='options'" v-show="isEditing" />
                <span class="select-wrapper" v-if="input.type == 'options'" v-show="isEditing">
                  <select v-model="birthday[0]">
                    <option v-for="n in (new Date()).getYear()" :value="n+1900">{{n+1900}}</option>
                  </select>
                  年
                  <select v-model="birthday[1]">
                    <option v-for="n in 12" :value="n+1">{{n+1}}</option>
                  </select>
                  月
                  <select v-model="birthday[2]">
                    <option v-for="n in 31" :value="n+1">{{n+1}}</option>
                  </select>
                  日
                </span>
                <span v-show="!isEditing">{{fullUserData[input.key]}}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>

export default {
  props:['currentUser','fullUserData'],
  data () {
    var profileArray = [{
      text: '基本信息',
      inputs: [{
        text: '昵称',
        key: 'username',
      },{
        text: '简介',
        key: 'intro',
      },{
        text: '所在地',
        key: 'area',
      },{
        text: '生日',
        key: 'birthday',
        type: 'options'
      }]
    },{
      text: '联系信息',
      inputs: [{
        text: '邮箱',
        key: 'mail'
      }]
    }];
    var birthday = this.fullUserData.birthday.split('-');
    return {
      isEditing: false,
      profileArray: profileArray,
      birthday: birthday,
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
  .profile-wrapper {
    background: #323233;
    border-radius: 2px;
    padding: 20px;
    fieldset {
      display: block;
      padding: 0;
      border-color: #282829;
      border-style: solid;
      border-width: 1px 0 0 0;
      margin: 15px 0 11px;
      >legend {
        font-size: 14px;
        padding: 0 5px 0 0;
        font-weight: bold;
        color: #c8c8cc;
        text-decoration: none;
      }
      .btns {
        float: right;
        margin-top: -18px;
        position: relative;
        >a {
          display: inline-block;
          border-width: 1px;
          border-style: solid;
          overflow: hidden;
          vertical-align: middle;
          cursor: pointer;
          border-radius: 13px;
          border-color: #d9d9d9;
          background-color: #f2f2f2;
          margin-left: 5px;
          &:hover {
            background: linear-gradient(to bottom, rgba(255,184,71,1) 0%,rgba(255,162,16,1) 100%);
            border-color: #ff9b01;
            >span {
              border-color: #ffce82;
              color: #FFF;
            }
          }
          >span {
            display: inline-block;
            height: 18px;
            line-height: 18px;
            vertical-align: middle;
            border-style: solid;
            border-width: 1px;
            border-radius: 13px;
            padding: 0px 9px 0 8px;
            border-color: #ffffff;
            color: #333333;
          }
        }
      }
    }
    .label.pull-left {
      width: 53px;
      text-align: right;
      white-space: nowrap;
      color: #999;
      font-size: 12px;
      line-height: 30px;
    }
    .fields {
      margin-left: 67px;
      padding: 0 10px;
      word-wrap: break-word;
      font-size: 12px;
      line-height: 30px;
    }
    .field-item {
      margin-bottom: 5px;
    }
    input[type=text]{
      background-color: #4e4e52;
      border:1px solid #050505;
      border-radius: 2px;
      height: 28px;
      padding: 0 0 0 2px;
      color: #999;
      box-shadow: 0px 1px 1px 0px #eaeaea inset;
      outline: 0;
      font-size: 12px;
      line-height: 1.125;
      &:focus {
        border-color: #FFB941;
      }
    }
    select {
      color: #000;
    }
  }

</style>
