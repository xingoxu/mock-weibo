webpackJsonp([8,0],{0:function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}var i=o(3),n=s(i),r=o(12),a=s(r),u=o(289),c=s(u),p=(o(1),o(20)),l=o(11);n.default.use(a.default),n.default.component("App",c.default),new n.default({el:"body",data:{timeline:p.timeline,currentUser:l.currentUser}})},1:function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function i(e){return e<10?"0"+e:e}function n(e){var t=[];return t.push(e.getHours()),t.push(e.getMinutes()),t=t.map(i),t.join(":")}function r(e){var t=[];return t.push(e.getMonth()+1+"月"),t.push(e.getDate()+"日"),t=t.map(i),t.join("")}Object.defineProperty(t,"__esModule",{value:!0}),t.app=void 0;var a=o(13),u=s(a),c=o(3),p=s(c),l=o(10),d=s(l);p.default.component("user-card",d.default),p.default.filter("showTime",function(e){e=(0,u.default)(e);var t=Date.now()-e;return t/864e5>1||(new Date).getDate()-new Date(e).getDate()>0?r(new Date(e))+" "+n(new Date(e)):t/36e5>1?"今天 "+n(new Date(e)):Math.ceil(t/6e4)+"分钟前"});var f={weiboFactory:function(){return{weiboid:"",user:{},text:"",time:Date.now()+"",forward:0,comment:0,like:0,favourited:!1,liked:!1}},commentFactory:function(){return{user:{},text:"",time:Date.now()+"",commentid:"",like:0,liked:!1}}};window.app=f,t.app=f},2:function(e,t,o){var s,i,n={};o(29),s=o(24),i=o(34),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(r.template=i),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},4:function(e,t,o){var s,i,n={};o(28),s=o(23),i=o(33),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(r.template=i),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},5:function(e,t,o){var s,i,n={};o(26),s=o(21),i=o(31),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(r.template=i),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},6:function(e,t,o){var s,i,n={};o(46),s=o(42),i=o(50),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(r.template=i),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},7:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});o(1);t.default={props:["name","userid"],data:function(){return{isHover:!1,user:{avatar:"http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg"},timeout:0,following:!1,beFollowed:!1,loading:!1,userLoading:!1}},methods:{getUserInfo:function(){},handleFollow:function(){var e=this;this.loading=!0,this.following=!this.following,setTimeout(function(){e.loading=!1},1e3)}}}},8:function(e,t){},9:function(e,t){e.exports=' <span class=user-card-component> <span class=content-wrapper @mouseenter="isHover=true" @mouseleave="isHover=false"> <slot></slot> </span> <div class=card v-show=isHover @mouseenter="isHover=true" @mouseleave="isHover=false" transition=user-card> <div class=wrapper v-show=user> <div class=upper> <a class=pic> <img :src=user.avatar width=50 height=50 /> </a> <div class=name> <a href=#>xingo</a> </div> <div class=intro> {{user.intro}}没有的话先测试一下 </div> </div> <div class=lower> <div class=count> <ul> <li><a href=#>关注<em>275</em></a></li> <li><a href=#>粉丝<em>860</em></a></li> <li><a href=#>微博<em>8326</em></a></li> </ul> </div> <div class=operation> <div class=button-wrapper> <button href=javascript:void(0); class=W_btn_b @click=handleFollow> <span v-if=following&&beFollowed&&!loading> <em class="W_ficon ficon_addtwo S_ficon">Z</em>互相关注 </span> <span v-if=loading&&following> <i class=W_loading></i>关注中 </span> <span v-if=following&&!beFollowed&&!loading> <em class="W_ficon ficon_right S_ficon">Y</em>已关注 </span> <span v-if=loading&&!following> <i class=W_loading></i>取消关注中 </span> <span v-if=!following&&beFollowed&&!loading> <em class="W_ficon ficon_right S_ficon">Y</em><em class="W_vline S_line1"></em><em class="W_ficon ficon_add">+</em>关注 </span> <span v-if=!following&&!beFollowed&&!loading> <em class="W_ficon ficon_add S_ficon">+</em>关注 </span> </button> </div> <div class=button-wrapper> <a href=javascript:void(0); class="W_btn_b W_btn_pf_menu"> <em class="W_ficon ficon_menu S_ficon">=</em> </a> <div class=menu> <div class=list_wrap> <div class="list_content W_f14"> <ul class=list_ul> <li class=item v-if=beFollowed><a class=tlink>移除粉丝</a></li> <li class=item><a class=tlink>举报他</a></li> </ul> </div> </div> </div> </div> </div> </div> </div> <div class="wrapper not-exist" v-show=!user> <span>抱歉，这个昵称不存在哦！^_^</span> </div> <div class="wrapper loading" v-show=userLoading> <i class=W_loading></i> <span>正在加载，请稍后...</span> </div> </div> </span> '},10:function(e,t,o){var s,i,n={};o(8),s=o(7),i=o(9),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(r.template=i),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},11:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={userid:"12345",username:"xingo",intro:"立派なショタコン",following:413,fans:758,weibo:8030,avatar:"http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg"},s={userid:"12345",username:"xingo",intro:"立派なショタコン",area:"上海 虹口",birthday:"1995-04-27",mail:"xingoxu@foxmail.com"};t.currentUser=o,t.fullUserData=s},14:function(e,t,o){var s,i,n={};o(30),s=o(25),i=o(35),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(r.template=i),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},15:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["currentUser","navNow"],ready:function(){var e=this;window.addEventListener("scroll",this.windowScroll),window.addEventListener("keyup",function(t){78==t.keyCode&&e.showNewWeiboPopup()})},beforeDestroy:function(){window.removeEventListener("scroll",this.windowScroll)},data:function(){return{searchFocus:!1,isTop:!0}},methods:{windowScroll:function(e){return document.body.scrollTop>0?void(this.isTop=!1):void(this.isTop=!0)},showNewWeiboPopup:function(){this.$dispatch("showNewWeiboPopup")}}}},16:function(e,t){},17:function(e,t){e.exports=' <div> <nav class=top-nav :class="{\'has-alpha\': !isTop}"> <div class=center-zone> <div class=logo> <a href=/ > <span class=logo></span> </a> </div> <div class=search :class="{\'focus\': searchFocus}"> <form action=index.html target=_blank method=get> <input type=text name=q autocomplete=off value="" class=W_input placeholder=搜索微博、找人 @focus="searchFocus=true" @blur="searchFocus=false"/> <button title=搜索 class="W_ficon ficon_search S_ficon">f</button> </form> </div> <div class=right-operation> <div class=site-nav> <ul> <li :class="{\'now\': navNow==\'homepage\'}"><a href=/ ><em class="W_ficon ficon_home S_ficon">E</em><em class=text>首页</em></a></li> <li :class="{\'now\': navNow==\'mypage\'}"><a href=/user/{{currentUser.userid}}><em class="W_ficon ficon_home S_ficon">H</em><em class=text>{{currentUser.username}}</em></a></li> </ul> </div> <div class=nav-func> <ul class="gn_set S_line1"> <li class=gn_set_list> <a href=javascript:void(0); class=""> <em class="W_ficon ficon_mail S_ficon">I</em> </a> <div class=menu> <ul> <li><a href=/at/ >@我的</a> </li> <li><a href=/comment/ >评论</a> </li> <li><a href=/like/ >赞</a> </li> </ul> </div> </li> <li class=gn_set_list> <a href=javascript:void(0); class=""> <em class="W_ficon ficon_set S_ficon">*</em> </a> <div class=menu> <ul> <li><a href=/profile/ >个人资料</a> </li> <li><a href=/password/ >账号安全</a> </li> <li class="line S_line2"></li> <li><a href=/logout/ >退出</a> </li> </ul> </div> </li> <li class=gn_set_list> <a href=javascript:void(0); @click=showNewWeiboPopup><em class="W_ficon ficon_send S_ficon" title=新微博>ß</em></a> </li> </ul> <div class=gn_topmenulist_tips> <a href=javascript:void(0); class="W_ficon ficon_close S_ficon">X</a> <ul> <li>1条新评论，<a href=/comment/ >查看</a> </li> </ul> </div> </div> </div> </div> </nav> <div class=new-weibo-popup> </div> </div> '},18:function(e,t,o){var s,i,n={};o(16),s=o(15),i=o(17),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(r.template=i),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},20:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={userid:"987654321",username:"xingo",avatar:"http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg"},s={weiboid:"12345",user:o,text:"abcdefg，今天是个好天气@测试 ，[微笑]测试[哈哈]",pics:["http://wsqncdn.miaopai.com/stream/a9ukbYtdFibmwKEgeVboyQ___m.jpg","http://ww4.sinaimg.cn/large/6b8bbe7egw1f9rk0b5py8j20vx0hy0zl.jpg","http://ww1.sinaimg.cn/large/6b8bbe7egw1f9rk071we9j20vc0h5wm6.jpg","http://ww2.sinaimg.cn/large/6b8bbe7egw1f9wh3jile4j20xc0xcdw7.jpg"],time:"1479649004555",forward:30,comment:5,like:350,favourited:!1,liked:!1},i={weiboid:"123456789",text:"abcdefg，今天是个好天气@测试 ，[微笑]测试[哈哈]",time:"1479649079293",user:o,forwardWeibo:s,liked:!1,favourited:!0,like:0,forward:1,comment:3},n=[s,i];t.singleWeibo=s,t.forwardWeibo=i,t.timeline=n},21:function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(13),n=s(i);t.default={data:function(){return this.init_height=(0,n.default)(this.init_height),{}},props:["model","init_height","placeholder","disabled"],methods:{resizeTextArea:function(e){var t=this,o=e.target;setTimeout(function(){o.style.height=t.init_height+"px";var e=o.scrollHeight;t.init_height<e&&(o.style.height=e+"px")},0)}}}},22:function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(2),n=s(i),r=o(14),a=s(r);t.default={props:["currentUser"],data:function(){return{showPopup:!1}},events:{show:function(){this.showPopup=!0},newWeiboSended:function(e){return this.showPopup=!1,!0}},components:{popup:n.default,publishContainer:a.default}}},23:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["size","src","userid"]}},24:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={left:0,top:0,currentX:0,currentY:0};t.default={props:{show:{default:!1,twoWay:!0}},data:function(){return{drag:!1}},ready:function(){document.addEventListener("mousemove",this.dragHandler),document.addEventListener("keyup",this.hide)},beforeDestroy:function(){document.removeEventListener("mousemove",this.dragHandler),document.removeEventListener("keyup",this.hide)},methods:{startDrag:function(e){this.drag=!0,o.top=this.$els.layer.style.top,o.left=this.$els.layer.style.left,o.currentX=e.clientX,o.currentY=e.clientY},dragHandler:function(e){if(this.drag){var t=e.clientX,s=e.clientY,i=t-o.currentX,n=s-o.currentY,r=this.$els.layer;r.style.left=parseInt(o.left)+i+"px",r.style.top=parseInt(o.top)+n+"px"}},stopDrag:function(e){this.drag=!1,o.top=this.$els.layer.style.top,o.left=this.$els.layer.style.left},hide:function(e){27==e.keyCode&&(this.show=!1)}},watch:{show:function(e,t){if(e){var o=this.$els.layer;o.style.top=window.innerHeight/2-103+"px",o.style.left=window.innerWidth/2-235+"px"}}}}},25:function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(5),n=s(i),r=o(1);t.default={props:["currentUser","isWhite","isPopup"],data:function(){return{isEditing:!1,successSended:!1,inputWeibo:"",inputDisabled:!1,textareaFirstHeight:77,ctrlPressed:!1}},methods:{submit:function(){var e=this;if(0!=this.inputWeibo.length){this.inputDisabled=!0;var t=r.app.weiboFactory();t.weiboid="8938295392",t.user=this.currentUser,t.text=this.inputWeibo,t.time=""+Date.now(),this.inputWeibo="",this.successSended=!0,setTimeout(function(){e.successSended=!1,e.$dispatch("newWeiboSended",t),e.inputDisabled=!1},2e3)}},enterSubmit:function(e){this.ctrlPressed&&13==e.keyCode&&this.submit(),e.stopPropagation()}},components:{autoResizeTextarea:n.default}}},26:function(e,t){},27:function(e,t){},28:function(e,t){},29:function(e,t){},30:function(e,t){},31:function(e,t){e.exports=" <textarea class=autoresize v-model=model @keydown=resizeTextArea :style=\"{\n  height: init_height+'px'\n}\" :placeholder=placeholder :disabled=disabled></textarea> "},32:function(e,t){e.exports=' <popup class="new-weibo popup-wrapper" :show.sync=showPopup> <span slot=title>有什么新鲜事想告诉大家？</span> <div class=popup-body-wrapper slot=body> <publish-container :is-popup=true :is-white=true :current-user=currentUser></publish-container> </div> </popup> '},33:function(e,t){e.exports=" <div class=normal-user-avatar> <user-card :userid=userid class=user-card-component> <a href=/user/{{userid}}> <img :src=\"src ? src :'http://tva1.sinaimg.cn/default/images/default_avatar_female_50.gif'\" :width=size :height=size /> </a> </user-card> </div> "},34:function(e,t){e.exports=' <div class=popup-wrapper> <div class=popup-layer v-show=show transition=popup v-el:layer> <div class=popup-title @mousedown=startDrag @mouseup=stopDrag> <slot name=title><span>测试标题</span></slot> <span class=close><a href=javascript:; class="W_ficon ficon_close S_ficon" @click.stop="show=false">X</a></span> </div> <div class=popup-body> <slot name=body></slot> </div> </div> <div class=popup-outer v-show=show transition=opacity></div> </div> '},35:function(e,t){e.exports=' <div class=weibo-send-weibo-wrapper :class="{\'white\': isWhite}"> <header class=clrfloat> <p class="W_swficon ficon_swtxt" v-if=!isPopup> <em class=spac1>有什么新</em> <em class=spac2>鲜</em> <em class=spac3>事想告诉大家</em> <em class=spac4>?</em> </p> <span class="pull-right hot-weibo" v-show="!isEditing && inputWeibo.length == 0" v-if=!isPopup> <a href="">热门话题</a> <a href="">热门微博</a> </span> <span class="pull-right words-total" v-show="inputWeibo.length > 0"> 已输入<span :class="{\'red\': inputWeibo.length>140}">{{inputWeibo.length}}</span>字 </span> <span class="pull-right length-calc"></span> </header> <div class=input-wrapper :class="{\'editing\': isEditing}"> <auto-resize-textarea :model.sync=inputWeibo :init_height=textareaFirstHeight @focus="isEditing=true" @blur="isEditing=false" :disabled=inputDisabled @keydown.stop=enterSubmit @keydown.17="ctrlPressed=true" @keyup.17="ctrlPressed=false" @keyup.stop=false></auto-resize-textarea> <div class=success-sended-tip v-show=successSended> <i class="icon icon-background send-success"></i> <span>发布成功</span> </div> </div> <div class=input-func> <div class="multi pull-left"> <ul> <li>表情</li> <li>图片</li> </ul> </div> <div class="func pull-right"> <button class=submit :disabled="!(inputWeibo.length > 0 && inputWeibo.length <= 140) || inputDisabled" @click=submit>发布</button> </div> </div> </div> '},36:function(e,t,o){var s,i,n={};o(27),s=o(22),i=o(32),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(r.template=i),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},38:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=[{text:"跑车-资讯",number:572345678},{text:"大V聊车",number:6913e4},{text:"南瓜色口红",number:1648e4},{text:"暗橘色时尚",number:72e6},{text:"毛衣配半裙",number:75e6},{text:"秀智桃红唇",number:572345678},{text:"我想送你一颗黑凤梨",number:572345678},{text:"线下社交",number:572345678},{text:"酒店点评",number:572345678},{text:"旅游大咖秀",number:572345678},{text:"直播旅行",number:572345678},{text:"就是爱吃路边摊",number:572345678},{text:"朴槿惠闺蜜干政",number:12312321323}];t.hotTopic=o},39:function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(2),n=s(i);t.default={data:function(){return{weiboID:0,showCancelFavouritePopup:!1}},methods:{cancelWeiboFavourite:function(){this.$dispatch("weiboFavouritCancelled",this.weiboID),this.showCancelFavouritePopup=!1}},events:{show:function(e){this.weiboID=e,this.showCancelFavouritePopup=!0}},components:{popup:n.default}}},40:function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(2),n=s(i);t.default={data:function(){return{showFavouriteSuccess:!1}},events:{show:function(){this.showFavouriteSuccess=!0}},components:{popup:n.default}}},41:function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(2),n=s(i),r=o(6),a=s(r);t.default={props:["currentUser"],data:function(){return{weibo:{user:{}},showForward:!1}},events:{show:function(e){this.weibo=e,this.showForward=!0},newWeiboSended:function(){return this.showForward=!1,!0}},components:{popup:n.default,publishContainer:a.default}}},42:function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(5),n=s(i),r=o(4),a=s(r),u=o(1);t.default={props:{isWhite:Boolean,isPopup:Boolean,isForward:Boolean,isReplyOthers:Boolean,currentUser:Object,weibo:{type:Object,default:function(){return{user:{}}}}},data:function(){return{inputWeibo:"",commentInputFocus:!1,successSended:!1,inputDisabled:!1}},methods:{submit:function(){this.isForward?this.submitForward():this.submitComment()},submitForward:function(){var e=this;if(0!=this.inputWeibo.length){this.inputDisabled=!0;var t=u.app.weiboFactory();t.weiboid="8938295392",t.user=this.currentUser,t.text=this.inputWeibo,t.forwardWeibo=this.weibo.forwardWeibo||this.weibo,this.weibo.forward++,this.inputWeibo="",this.successSended=!0,setTimeout(function(){e.successSended=!1,e.$dispatch("newWeiboSended",t),e.inputDisabled=!1},2e3)}},submitComment:function(){if(0!=this.inputWeibo.length){this.inputDisabled=!0;var e=u.app.commentFactory();e.commentid="8938295392",e.user=this.currentUser,e.text=this.inputWeibo,this.inputWeibo="",this.successSended=!0,this.$dispatch("newCommentSended",e),this.inputDisabled=!1}},enterSubmit:function(e){this.ctrlPressed&&13==e.keyCode&&this.submit(),e.stopPropagation()}},events:{show:function(){var e=this;setTimeout(function(){e.isForward?e.inputWeibo="//@"+e.weibo.user.username+" : "+e.weibo.text:e.inputWeibo="回复@"+e.weibo.user.username+" :"},0)}},watch:{weibo:function(e,t){e.forwardWeibo?this.inputWeibo="//@"+e.user.username+" : "+e.text:this.inputWeibo="转发微博"}},components:{autoresizeTextarea:n.default,userAvatar:a.default}}},43:function(e,t){},44:function(e,t){},45:function(e,t){},46:function(e,t){},47:function(e,t){e.exports=' <popup class="cancel-favourite popup-wrapper" :show.sync=showCancelFavouritePopup> <span slot=title>取消收藏</span> <div class=popup-body-wrapper slot=body> <div class=cancel-favourite-tip> <div> <i class="icon icon-background questionB"></i> </div> <div class=text>确定要取消收藏吗</div> </div> <div class=button-wrapper> <button type=button @click=cancelWeiboFavourite>确定</button> <button type=button @click="showCancelFavouritePopup=false" class=cancel>取消</button> </div> </div> </popup> '},48:function(e,t){e.exports=' <popup class="favourite popup-wrapper" :show.sync=showFavouriteSuccess> <span slot=title>收藏</span> <div class=popup-body-wrapper slot=body> <div class=favourite-success-tip> <div> <i class="icon icon-background send-success"></i> </div> <div class=text>收藏成功</div> </div> <div class=button-wrapper> <button type=button @click="showFavouriteSuccess=false">确定</button> </div> </div> </popup> '},49:function(e,t){e.exports=' <popup class="forward popup-wrapper" :show.sync=showForward> <span slot=title>转发微博</span> <div class=popup-body slot=body> <publish-container :is-popup=true :is-forward=true :is-white=true :weibo=weibo :current-user=currentUser v-ref:publish-container></publish-container> </div> </popup> '},50:function(e,t){e.exports=' <div class=publish-container :class="{\'transparent\': isWhite, \'forward\': isForward, \'popup\':isPopup }"> <user-avatar size=30 class=avatar v-if="!isPopup && !isForward" :src=currentUser.avatar :userid=currentUser.userid></user-avatar> <div class=right> <div class=input-wrapper :class="{\'focus\': commentInputFocus}"> <autoresize-textarea :init_height="isForward ? 48 : 20" @focus="commentInputFocus=true" @blur="commentInputFocus=false" :placeholder="isForward ? \'请输入转发理由\' : false" :model.sync=inputWeibo :disabled=inputDisabled @keydown.stop=enterSubmit @keydown.17="ctrlPressed=true" @keyup.17="ctrlPressed=false" @keyup.stop=false></autoresize-textarea> <span class=word-tip :class="{\'red\': inputWeibo.length>140}" v-if=isForward> <span>{{140 - inputWeibo.length}}</span> </span> <div class=success-sended-tip v-show=successSended v-if=isForward> <i class="icon icon-background send-success"></i> <span>发布成功</span> </div> </div> <div class="publish-options clrfloat"> <div class=pull-right> <button type=button @click=submit :disabled="!(inputWeibo.length>0&&inputWeibo.length<=140) || inputDisabled"> <i class=W_loading v-show=inputDisabled></i> <span v-show=inputDisabled> {{isForward ? \'转发中...\' : \'评论中...\'}} </span> <span v-show=!inputDisabled> {{isForward ? \'转发\' : \'评论\'}} </span> </button> </div> <div class="options clrfloat"> <span class="icons pull-left"> <a href=#>表情</a> </span> <div class="selections pull-left"> <ul> <li v-if=isForward> <label> <input type=checkbox /> <span>同时评论给{{weibo.user.username}}</span> </label> </li> <li v-if=!isForward> <label> <input type=checkbox /> <span>同时转发到我的微博</span> </label> </li> <li v-if=weibo.forwardWeibo> <label> <input type=checkbox /> <span>同时评论给原文作者{{weibo.forwardWeibo.user.username}}</span> </label> </li> </ul> </div> </div> </div> </div> </div> '},51:function(e,t,o){var s,i,n={};o(43),s=o(39),i=o(47),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(r.template=i),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},52:function(e,t,o){var s,i,n={};o(44),s=o(40),i=o(48),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(r.template=i),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},53:function(e,t,o){var s,i,n={};o(45),s=o(41),i=o(49),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(r.template=i),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},115:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={}},148:function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(290),n=s(i),r=o(291),a=s(r),u=o(18),c=s(u),p=o(53),l=s(p),d=o(52),f=s(d),v=o(51),h=s(v),m=o(36),b=s(m);t.default={props:["timeline","currentUser"],data:function(){return{keywords:"abcdefg"}},methods:{test:function(){console.log(this.$refs)}},computed:{},events:{expandForward:function(e){this.$refs.forwardPopup.$emit("show",e)},weiboFavourited:function(){this.$refs.favouriteSuccessPopup.$emit("show")},cancelFavourite:function(e){this.$refs.cancelFavouritePopup.$emit("show",e)},weiboFavouritCancelled:function(e){this.$refs.middleCol.$broadcast("weiboFavouritCancelled",e)},newWeiboSended:function(e){this.$refs.middleCol.$emit("newWeiboSended",e)},showNewWeiboPopup:function(){this.$refs.newWeiboPopup.$emit("show")}},components:{middleCol:n.default,rightCol:a.default,topNav:c.default,forwardPopup:l.default,favouriteSuccessPopup:f.default,cancelFavouritePopup:h.default,newWeiboPopup:b.default}}},149:function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(256),n=s(i);t.default={props:[],data:function(){return{}},events:{},components:{userList:n.default}}},150:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=o(38);t.default={props:["currentUser"],data:function(){for(var e=5,t=[],o=[],i=0;i<s.hotTopic.length;i++)i%e==0&&o.length>0&&(t.push(o),o=[]),o.push(s.hotTopic[i]);return o.length>0&&t.push(o),{hotTopicPages:t,topicPageNow:0}},methods:{getFuzzyNumber:function(e){return e>=1e8?(e/1e8).toFixed(1)+"亿":e>1e4?e/1e4+"万":e}}}},172:function(e,t){},205:function(e,t){},206:function(e,t){},207:function(e,t){},214:function(e,t){e.exports=' <ul class=search-list> <li> <div class="list_person clearfix"> <div class=person_pic> <a target=_blank href="http://weibo.com/pokemonxu?refer_flag=1001030201_"><img class=W_face_radius src=http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg height=80 width=80></a> </div> <div class=person_detail> <p class=person_name> <a class="W_texta W_fb" target=_blank href="http://weibo.com/pokemonxu?refer_flag=1001030201_" title=xingo> xingo </a> </p> <p class=person_num> <span> 关注 <a class=W_linkb href="http://weibo.com/1804320382/follow?refer_flag=1001030201_" target=_blank>412</a></span> <span> 粉丝 <a class=W_linkb href="http://weibo.com/1804320382/fans?refer_flag=1001030201_" target=_blank>756</a></span> <span> 微博 <a class=W_linkb href="http://weibo.com/1804320382/profile?refer_flag=1001030201_" target=_blank>8086</a></span></p> <div class=person_info> <p>简介： 立派なショタコン</p> </div> </div> </div> </li> </ul> '},247:function(e,t){e.exports=' <div class=weibo-main-app> <top-nav :current-user=currentUser></top-nav> <div class=weibo-frame> <div class=search-box> <div class=search_head_formbox> <div class=search_logo> <a href=/ class=logo_img></a> </div> <ul class="formbox_tab clrfloat formbox_tab2" node-type=searchItems> <li> <a action-type=searchItem href=javascript:void(0);>综合</a> <a action-type=searchItem class=cur>找人</a> </li> </ul> <form class="search_input clearfix"> <div class=search_input_wrap> <input class=searchInp_form type=text autocomplete=off name=q @keyup.stop=false v-model=keywords> <div class=searchBtn_box> <button type=submit class=searchBtn>搜索</button> </div> </div> </form> </div> </div> <middle-col class=weibo-mid-col v-ref:middle-col :timeline=timeline :current-user=currentUser :keywords.once=keywords></middle-col> <div class=weibo-right-col> <right-col :current-user=currentUser></right-col> </div> </div> <footer> <p>服务热线：4000 960 960（个人/企业）服务时间9:00-21:00 4000 980 980（广告主）服务时间9:00-18:00 （按当地市话标准计算）</p> <p>京ICP证100780号 互联网药品服务许可证 互联网医疗保健许可证 京网文[2014]2046-296号 京ICP备12002058号 增值电信业务经营许可证B2-20140447</p> <p>Copyright © 2009-2016 WEIBO 北京微梦创科网络技术有限公司 京公网安备11000002000019号</p> </footer> <new-weibo-popup v-ref:new-weibo-popup :current-user=currentUser></new-weibo-popup> <forward-popup v-ref:forward-popup :current-user=currentUser></forward-popup> <cancel-favourite-popup v-ref:cancel-favourite-popup></cancel-favourite-popup> <favourite-success-popup v-ref:favourite-success-popup> </favourite-success-popup></div> '},248:function(e,t){e.exports=" <div class=search-user> <div> <user-list></user-list> </div> </div> "},249:function(e,t){e.exports=' <div> <div class=weibo-hot-topic> <header> <span>热门话题</span> <button class=pull-right @click="(++topicPageNow)>= hotTopicPages.length ? topicPageNow=0 : topicPageNow"><em class="W_ficon ficon_rotate S_ficon">e</em>换一换</button> </header> <ul> <li v-for="hotTopicPage in hotTopicPages" v-show="$index == topicPageNow" transition=right-hot-topic class=hot-topic-page> <ul> <li v-for="hotTopic in hotTopicPage" class=topic> <a href=/topic/{{hotTopic.text}}>#{{hotTopic.text}}#</a> <span class=pull-right>{{getFuzzyNumber(hotTopic.number)}}</span> </li> </ul> </li> </ul> </div> </div> '},256:function(e,t,o){var s,i,n={};o(172),s=o(115),i=o(214),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(r.template=i),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},289:function(e,t,o){var s,i,n={};o(205),s=o(148),i=o(247),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(r.template=i),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},290:function(e,t,o){var s,i,n={};o(206),s=o(149),i=o(248),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(r.template=i),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},291:function(e,t,o){var s,i,n={};o(207),s=o(150),i=o(249),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(r.template=i),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})}});