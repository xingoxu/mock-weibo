webpackJsonp([12,0],{0:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var s=o(3),n=i(s),r=o(12),a=i(r),c=o(269),u=i(c),l=(o(1),o(110)),p=o(11);n.default.use(a.default),n.default.component("App",u.default),new n.default({el:"body",data:{comments:l.comments,currentUser:p.currentUser}})},1:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function s(e){return e<10?"0"+e:e}function n(e){var t=[];return t.push(e.getHours()),t.push(e.getMinutes()),t=t.map(s),t.join(":")}function r(e){var t=[];return t.push(e.getMonth()+1+"月"),t.push(e.getDate()+"日"),t=t.map(s),t.join("")}Object.defineProperty(t,"__esModule",{value:!0}),t.app=void 0;var a=o(13),c=i(a),u=o(3),l=i(u),p=o(10),d=i(p);l.default.component("user-card",d.default),l.default.filter("showTime",function(e){e=(0,c.default)(e);var t=Date.now()-e;return t/864e5>1||(new Date).getDate()-new Date(e).getDate()>0?r(new Date(e))+" "+n(new Date(e)):t/36e5>1?"今天 "+n(new Date(e)):Math.ceil(t/6e4)+"分钟前"});var f={weiboFactory:function(){return{weiboid:"",user:{},text:"",time:Date.now()+"",forward:0,comment:0,like:0,favourited:!1,liked:!1}},commentFactory:function(){return{user:{},text:"",time:Date.now()+"",commentid:"",like:0,liked:!1}}};window.app=f,t.app=f},2:function(e,t,o){var i,s,n={};o(29),i=o(24),s=o(34),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;s&&(r.template=s),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},4:function(e,t,o){var i,s,n={};o(28),i=o(23),s=o(33),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;s&&(r.template=s),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},5:function(e,t,o){var i,s,n={};o(26),i=o(21),s=o(31),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;s&&(r.template=s),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},7:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});o(1);t.default={props:["name","userid"],data:function(){return{isHover:!1,user:{avatar:"http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg"},timeout:0,following:!1,beFollowed:!1,loading:!1,userLoading:!1}},methods:{getUserInfo:function(){},handleFollow:function(){var e=this;this.loading=!0,this.following=!this.following,setTimeout(function(){e.loading=!1},1e3)}}}},8:function(e,t){},9:function(e,t){e.exports=' <span class=user-card-component> <span class=content-wrapper @mouseenter="isHover=true" @mouseleave="isHover=false"> <slot></slot> </span> <div class=card v-show=isHover @mouseenter="isHover=true" @mouseleave="isHover=false" transition=user-card> <div class=wrapper v-show=user> <div class=upper> <a class=pic> <img :src=user.avatar width=50 height=50 /> </a> <div class=name> <a href=#>xingo</a> </div> <div class=intro> {{user.intro}}没有的话先测试一下 </div> </div> <div class=lower> <div class=count> <ul> <li><a href=#>关注<em>275</em></a></li> <li><a href=#>粉丝<em>860</em></a></li> <li><a href=#>微博<em>8326</em></a></li> </ul> </div> <div class=operation> <div class=button-wrapper> <button href=javascript:void(0); class=W_btn_b @click=handleFollow> <span v-if=following&&beFollowed&&!loading> <em class="W_ficon ficon_addtwo S_ficon">Z</em>互相关注 </span> <span v-if=loading&&following> <i class=W_loading></i>关注中 </span> <span v-if=following&&!beFollowed&&!loading> <em class="W_ficon ficon_right S_ficon">Y</em>已关注 </span> <span v-if=loading&&!following> <i class=W_loading></i>取消关注中 </span> <span v-if=!following&&beFollowed&&!loading> <em class="W_ficon ficon_right S_ficon">Y</em><em class="W_vline S_line1"></em><em class="W_ficon ficon_add">+</em>关注 </span> <span v-if=!following&&!beFollowed&&!loading> <em class="W_ficon ficon_add S_ficon">+</em>关注 </span> </button> </div> <div class=button-wrapper> <a href=javascript:void(0); class="W_btn_b W_btn_pf_menu"> <em class="W_ficon ficon_menu S_ficon">=</em> </a> <div class=menu> <div class=list_wrap> <div class="list_content W_f14"> <ul class=list_ul> <li class=item v-if=beFollowed><a class=tlink>移除粉丝</a></li> <li class=item><a class=tlink>举报他</a></li> </ul> </div> </div> </div> </div> </div> </div> </div> <div class="wrapper not-exist" v-show=!user> <span>抱歉，这个昵称不存在哦！^_^</span> </div> <div class="wrapper loading" v-show=userLoading> <i class=W_loading></i> <span>正在加载，请稍后...</span> </div> </div> </span> '},10:function(e,t,o){var i,s,n={};o(8),i=o(7),s=o(9),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;s&&(r.template=s),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},11:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={userid:"12345",username:"xingo",intro:"立派なショタコン",following:413,fans:758,weibo:8030,avatar:"http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg"},i={userid:"12345",username:"xingo",intro:"立派なショタコン",area:"上海 虹口",birthday:"1995-04-27",mail:"xingoxu@foxmail.com"};t.currentUser=o,t.fullUserData=i},14:function(e,t,o){var i,s,n={};o(30),i=o(25),s=o(35),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;s&&(r.template=s),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},15:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["currentUser","navNow"],ready:function(){var e=this;window.addEventListener("scroll",this.windowScroll),window.addEventListener("keyup",function(t){78==t.keyCode&&e.showNewWeiboPopup()})},beforeDestroy:function(){window.removeEventListener("scroll",this.windowScroll)},data:function(){return{searchFocus:!1,isTop:!0}},methods:{windowScroll:function(e){return document.body.scrollTop>0?void(this.isTop=!1):void(this.isTop=!0)},showNewWeiboPopup:function(){this.$dispatch("showNewWeiboPopup")}}}},16:function(e,t){},17:function(e,t){e.exports=' <div> <nav class=top-nav :class="{\'has-alpha\': !isTop}"> <div class=center-zone> <div class=logo> <a href=/ > <span class=logo></span> </a> </div> <div class=search :class="{\'focus\': searchFocus}"> <form action=index.html target=_blank method=get> <input type=text name=q autocomplete=off value="" class=W_input placeholder=搜索微博、找人 @focus="searchFocus=true" @blur="searchFocus=false"/> <button title=搜索 class="W_ficon ficon_search S_ficon">f</button> </form> </div> <div class=right-operation> <div class=site-nav> <ul> <li :class="{\'now\': navNow==\'homepage\'}"><a href=/ ><em class="W_ficon ficon_home S_ficon">E</em><em class=text>首页</em></a></li> <li :class="{\'now\': navNow==\'mypage\'}"><a href=/user/{{currentUser.userid}}><em class="W_ficon ficon_home S_ficon">H</em><em class=text>{{currentUser.username}}</em></a></li> </ul> </div> <div class=nav-func> <ul class="gn_set S_line1"> <li class=gn_set_list> <a href=javascript:void(0); class=""> <em class="W_ficon ficon_mail S_ficon">I</em> </a> <div class=menu> <ul> <li><a href=/at/ >@我的</a> </li> <li><a href=/comment/ >评论</a> </li> <li><a href=/like/ >赞</a> </li> </ul> </div> </li> <li class=gn_set_list> <a href=javascript:void(0); class=""> <em class="W_ficon ficon_set S_ficon">*</em> </a> <div class=menu> <ul> <li><a href=/profile/ >个人资料</a> </li> <li><a href=/password/ >账号安全</a> </li> <li class="line S_line2"></li> <li><a href=/logout/ >退出</a> </li> </ul> </div> </li> <li class=gn_set_list> <a href=javascript:void(0); @click=showNewWeiboPopup><em class="W_ficon ficon_send S_ficon" title=新微博>ß</em></a> </li> </ul> <div class=gn_topmenulist_tips> <a href=javascript:void(0); class="W_ficon ficon_close S_ficon">X</a> <ul> <li>1条新评论，<a href=/comment/ >查看</a> </li> </ul> </div> </div> </div> </div> </nav> <div class=new-weibo-popup> </div> </div> '},18:function(e,t,o){var i,s,n={};o(16),i=o(15),s=o(17),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;s&&(r.template=s),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},19:function(e,t,o){var i,s,n={};o(57),i=o(55),s=o(59),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;s&&(r.template=s),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},21:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=o(13),n=i(s);t.default={data:function(){return this.init_height=(0,n.default)(this.init_height),{}},props:["model","init_height","placeholder","disabled"],methods:{resizeTextArea:function(e){var t=this,o=e.target;setTimeout(function(){o.style.height=t.init_height+"px";var e=o.scrollHeight;t.init_height<e&&(o.style.height=e+"px")},0)}}}},22:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=o(2),n=i(s),r=o(14),a=i(r);t.default={props:["currentUser"],data:function(){return{showPopup:!1}},events:{show:function(){this.showPopup=!0},newWeiboSended:function(e){return this.showPopup=!1,!0}},components:{popup:n.default,publishContainer:a.default}}},23:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["size","src","userid"]}},24:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={left:0,top:0,currentX:0,currentY:0};t.default={props:{show:{default:!1,twoWay:!0}},data:function(){return{drag:!1}},ready:function(){document.addEventListener("mousemove",this.dragHandler),document.addEventListener("keyup",this.hide)},beforeDestroy:function(){document.removeEventListener("mousemove",this.dragHandler),document.removeEventListener("keyup",this.hide)},methods:{startDrag:function(e){this.drag=!0,o.top=this.$els.layer.style.top,o.left=this.$els.layer.style.left,o.currentX=e.clientX,o.currentY=e.clientY},dragHandler:function(e){if(this.drag){var t=e.clientX,i=e.clientY,s=t-o.currentX,n=i-o.currentY,r=this.$els.layer;r.style.left=parseInt(o.left)+s+"px",r.style.top=parseInt(o.top)+n+"px"}},stopDrag:function(e){this.drag=!1,o.top=this.$els.layer.style.top,o.left=this.$els.layer.style.left},hide:function(e){27==e.keyCode&&(this.show=!1)}},watch:{show:function(e,t){if(e){var o=this.$els.layer;o.style.top=window.innerHeight/2-103+"px",o.style.left=window.innerWidth/2-235+"px"}}}}},25:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=o(5),n=i(s),r=o(1);t.default={props:["currentUser","isWhite","isPopup"],data:function(){return{isEditing:!1,successSended:!1,inputWeibo:"",inputDisabled:!1,textareaFirstHeight:77,ctrlPressed:!1}},methods:{submit:function(){var e=this;if(0!=this.inputWeibo.length){this.inputDisabled=!0;var t=r.app.weiboFactory();t.weiboid="8938295392",t.user=this.currentUser,t.text=this.inputWeibo,t.time=""+Date.now(),this.inputWeibo="",this.successSended=!0,setTimeout(function(){e.successSended=!1,e.$dispatch("newWeiboSended",t),e.inputDisabled=!1},2e3)}},enterSubmit:function(e){this.ctrlPressed&&13==e.keyCode&&this.submit(),e.stopPropagation()}},components:{autoResizeTextarea:n.default}}},26:function(e,t){},27:function(e,t){},28:function(e,t){},29:function(e,t){},30:function(e,t){},31:function(e,t){e.exports=" <textarea class=autoresize v-model=model @keydown=resizeTextArea :style=\"{\n  height: init_height+'px'\n}\" :placeholder=placeholder :disabled=disabled></textarea> "},32:function(e,t){e.exports=' <popup class="new-weibo popup-wrapper" :show.sync=showPopup> <span slot=title>有什么新鲜事想告诉大家？</span> <div class=popup-body-wrapper slot=body> <publish-container :is-popup=true :is-white=true :current-user=currentUser></publish-container> </div> </popup> '},33:function(e,t){e.exports=" <div class=normal-user-avatar> <user-card :userid=userid class=user-card-component> <a href=/user/{{userid}}> <img :src=\"src ? src :'http://tva1.sinaimg.cn/default/images/default_avatar_female_50.gif'\" :width=size :height=size /> </a> </user-card> </div> "},34:function(e,t){e.exports=' <div class=popup-wrapper> <div class=popup-layer v-show=show transition=popup v-el:layer> <div class=popup-title @mousedown=startDrag @mouseup=stopDrag> <slot name=title><span>测试标题</span></slot> <span class=close><a href=javascript:; class="W_ficon ficon_close S_ficon" @click.stop="show=false">X</a></span> </div> <div class=popup-body> <slot name=body></slot> </div> </div> <div class=popup-outer v-show=show transition=opacity></div> </div> '},35:function(e,t){e.exports=' <div class=weibo-send-weibo-wrapper :class="{\'white\': isWhite}"> <header class=clrfloat> <p class="W_swficon ficon_swtxt" v-if=!isPopup> <em class=spac1>有什么新</em> <em class=spac2>鲜</em> <em class=spac3>事想告诉大家</em> <em class=spac4>?</em> </p> <span class="pull-right hot-weibo" v-show="!isEditing && inputWeibo.length == 0" v-if=!isPopup> <a href="">热门话题</a> <a href="">热门微博</a> </span> <span class="pull-right words-total" v-show="inputWeibo.length > 0"> 已输入<span :class="{\'red\': inputWeibo.length>140}">{{inputWeibo.length}}</span>字 </span> <span class="pull-right length-calc"></span> </header> <div class=input-wrapper :class="{\'editing\': isEditing}"> <auto-resize-textarea :model.sync=inputWeibo :init_height=textareaFirstHeight @focus="isEditing=true" @blur="isEditing=false" :disabled=inputDisabled @keydown.stop=enterSubmit @keydown.17="ctrlPressed=true" @keyup.17="ctrlPressed=false" @keyup.stop=false></auto-resize-textarea> <div class=success-sended-tip v-show=successSended> <i class="icon icon-background send-success"></i> <span>发布成功</span> </div> </div> <div class=input-func> <div class="multi pull-left"> <ul> <li>表情</li> <li>图片</li> </ul> </div> <div class="func pull-right"> <button class=submit :disabled="!(inputWeibo.length > 0 && inputWeibo.length <= 140) || inputDisabled" @click=submit>发布</button> </div> </div> </div> '},36:function(e,t,o){var i,s,n={};o(27),i=o(22),s=o(32),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;s&&(r.template=s),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},38:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=[{text:"跑车-资讯",number:572345678},{text:"大V聊车",number:6913e4},{text:"南瓜色口红",number:1648e4},{text:"暗橘色时尚",number:72e6},{text:"毛衣配半裙",number:75e6},{text:"秀智桃红唇",number:572345678},{text:"我想送你一颗黑凤梨",number:572345678},{text:"线下社交",number:572345678},{text:"酒店点评",number:572345678},{text:"旅游大咖秀",number:572345678},{text:"直播旅行",number:572345678},{text:"就是爱吃路边摊",number:572345678},{text:"朴槿惠闺蜜干政",number:12312321323}];t.hotTopic=o},54:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["isSingleWeibo","weibo"],data:function(){return{commentExpanded:!1,forwardExpanded:!1}},ready:function(){function e(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),o=window.location.search.substr(1).match(t);return null!=o?unescape(o[2]):null}this.isSingleWeibo&&("repost"==e("type")?this.expandForward():this.expandComment())},methods:{expandComment:function(){return this.isSingleWeibo?(this.commentExpanded=!0,this.forwardExpanded=!1,void this.$dispatch("expandComment")):(this.commentExpanded=!this.commentExpanded,void(this.commentExpanded?this.$dispatch("expandComment"):this.$dispatch("closeComment")))},expandForward:function(){this.isSingleWeibo&&(this.forwardExpanded=!0,this.commentExpanded=!1),this.$dispatch("expandForward",this.weibo)},favouriteWeibo:function(){this.weibo.favourited?this.$dispatch("cancelFavourite",this.weibo.weiboid):(this.$dispatch("weiboFavourited"),this.weibo.favourited=!0)},likeWeibo:function(){this.weibo.liked=!this.weibo.liked,this.weibo.liked?this.weibo.like++:this.weibo.like--}},events:{weiboFavouritCancelled:function(e){e==this.weibo.weiboid&&(this.weibo.favourited=!1)}}}},55:function(module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={props:["weiboText","keywords"],partials:{weiboTextPart:"<span></span>"},created:function(){this.weiboText&&(this.$options.partials.weiboTextPart=this.compileText(this.weiboText.trim()))},methods:{compileText:function compileText(text){var atRegex=/(@[0-9a-zA-Z_\u0391-\uFFE5-]+$)|(@[0-9a-zA-Z_\u0391-\uFFE5-]+\s)/g;text=text.replace(atRegex,function(e){console.log(e);var t=e.substr(1).trim();return('\n          <user-card name="'+t+'">\n            <a href="/user/'+t+'"><span>@'+t+"</span></a>\n          </user-card>").trim()});var topicRegex=/#[0-9a-zA-Z\u0391-\uFFE5]+#/g;if(this.keywords&&""!=this.keywords){var htmlCode=/"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;this.keywords=this.keywords.replace(htmlCode,function(e){var t=e.charCodeAt(0),o=["&#"];return t=32==t?160:t,o.push(t),o.push(";"),o.join("")}),console.log(this.keywords),text=text.replace(eval("/"+this.keywords+"/g"),function(e){return'<span class="red">'+e+"</span>"})}return text}}}},56:function(e,t){},57:function(e,t){},58:function(e,t){e.exports=' <div class=single-weibo-operation> <ul class="WB_row_line WB_row_r4 clearfix S_line2"> <li :class="{\'favourited\': weibo.favourited }"> <a href=javascript:void(0); class=S_txt2 @click=favouriteWeibo> <span class="line S_line1"> <span> <em class="W_ficon ficon_favorite S_ficon">û</em><em>{{weibo.favourited ? \'已收藏\' : \'收藏\'}}</em> </span> </span> </a> </li> <li :class="{\'open\': forwardExpanded}"> <a href=javascript:void(0); class=S_txt2 @click=expandForward> <span class="line S_line1"> <span> <em class="W_ficon ficon_forward S_ficon"></em><em>{{weibo.forward>0 ? weibo.forward : \'转发\'}}</em> </span> </span> </a> </li> <li :class="{\'open\': commentExpanded}"> <a href=javascript:void(0); class=S_txt2 @click=expandComment> <span class="line S_line1"> <span> <em class="W_ficon ficon_repeat S_ficon"></em><em>{{weibo.comment>0 ? weibo.comment : \'评论\'}}</em> </span> </span> </a> </li> <li> <a href=javascript:; class=S_txt2 @click=likeWeibo :class="{\'liked\': weibo.liked}"> <span class="line S_line1"> <span> <em class="W_ficon ficon_praised S_txt2">ñ</em><em>{{weibo.like>0 ? weibo.like : \'赞\'}}</em> </span> </span> </a> </li> </ul> </div> '},59:function(e,t){e.exports=" <div class=weibo-text> <partial name=weiboTextPart></partial> </div> "},60:function(e,t,o){var i,s,n={};o(56),i=o(54),s=o(58),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;s&&(r.template=s),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},67:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=o(38);t.default={props:["currentUser"],data:function(){for(var e=[{key:"following",link:"follow",showText:"关注"},{key:"fans",link:"fans",showText:"粉丝"},{key:"weibo",link:"",showText:"微博"}],t=5,o=[],s=[],n=0;n<i.hotTopic.length;n++)n%t==0&&s.length>0&&(o.push(s),s=[]),s.push(i.hotTopic[n]);return s.length>0&&o.push(s),{cardLowerStatus:e,hotTopicPages:o,topicPageNow:0}},methods:{getFuzzyNumber:function(e){return e>=1e8?(e/1e8).toFixed(1)+"亿":e>1e4?e/1e4+"万":e}}}},72:function(e,t){},77:function(e,t){e.exports=' <div> <div class=personal-card> <div class=upper> <a href=/{{currentUser.userid}} class=avatar></a> </div> <div class=lower> <div class=name> <a href=/{{currentUser.userid}}>{{currentUser.username}}</a> </div> <div class=status> <ul> <li v-for="status in cardLowerStatus"> <a href=/{{currentUser.userid}}/{{status.link}}> <strong>{{currentUser[status.key]}}</strong> <span>{{status.showText}}</span> </a> </li> </ul> </div> </div> </div> <div class=weibo-hot-topic> <header> <span>热门话题</span> <button class=pull-right @click="(++topicPageNow)>= hotTopicPages.length ? topicPageNow=0 : topicPageNow"><em class="W_ficon ficon_rotate S_ficon">e</em>换一换</button> </header> <ul> <li v-for="hotTopicPage in hotTopicPages" v-show="$index == topicPageNow" transition=right-hot-topic class=hot-topic-page> <ul> <li v-for="hotTopic in hotTopicPage" class=topic> <a href=/topic/{{hotTopic.text}}>#{{hotTopic.text}}#</a> <span class=pull-right>{{getFuzzyNumber(hotTopic.number)}}</span> </li> </ul> </li> </ul> </div> </div> '},82:function(e,t,o){var i,s,n={};o(72),i=o(67),s=o(77),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;s&&(r.template=s),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},94:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["current"],data:function(){var e=[{text:"@我的",link:"/at"},{text:"评论",link:"/comment"},{text:"赞",link:"/like"}];return{menus:e}}}},97:function(e,t){},100:function(e,t){e.exports=' <div class=left-col> <ul> <li class=title> <h3> 我的消息箱 </h3> </li> <li v-for="menu in menus"> <a :href=menu.link :class="{\'active\': menu.link.substr(1)==current}"> <em class="W_ficon ficon_dot S_ficon" v-if="menu.link.substr(1)!=current">D</em> <em class="W_ficon ficon_dot S_ficon" v-if="menu.link.substr(1)==current">B</em> {{menu.text}}</a> </li> </ul> <div class=divider> <fieldset></fieldset> </div> </div> '},103:function(e,t,o){var i,s,n={};o(97),i=o(94),s=o(100),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;s&&(r.template=s),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},110:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={userid:"987654321",username:"xingo",avatar:"http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg"},i={user:o,text:"好天气就要@测试 ，大家说是不是啊！[哈哈]",time:"1479649004555",commentid:"432311",weibo:{weiboid:"12345",text:"诶嘿"}},s={user:o,commentid:"1234343",text:"好天气就要@测试 ，大家说是不是啊！[哈哈]",time:"1479649004555",comment:{weiboid:"12345",text:"好天气就要@测试 ，大家说是不是啊！[哈哈]好天气就要@测试 ，大家说是不是啊！[哈哈]好天气就要@测试 ，大家说是不是啊！[哈哈]"}},n=[i,s];t.comments=n},128:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=o(103),n=i(s),r=o(271),a=i(r),c=o(82),u=i(c),l=o(18),p=i(l),d=o(36),f=i(d);t.default={props:["comments","currentUser"],data:function(){return{}},methods:{},events:{showNewWeiboPopup:function(){this.$refs.newWeiboPopup.$emit("show")}},components:{leftCol:n.default,middleCol:a.default,rightCol:u.default,topNav:p.default,newWeiboPopup:f.default}}},129:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=o(19),n=i(s),r=o(4),a=i(r),c=o(60),u=i(c);t.default={props:["comment"],ready:function(){},methods:{},components:{weiboText:n.default,userAvatar:a.default,operation:u.default}}},130:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=o(270),n=i(s);t.default={props:["comments","currentUser"],data:function(){return{}},events:{},components:{comment:n.default}}},185:function(e,t){},186:function(e,t){},187:function(e,t){},227:function(e,t){e.exports=" <div class=weibo-main-app> <top-nav nav-now=homepage :current-user=currentUser></top-nav> <div class=weibo-frame> <left-col class=weibo-left-col current=comment></left-col> <middle-col class=weibo-mid-col v-ref:middle-col :comments=comments :current-user=currentUser></middle-col> <div class=weibo-right-col> <right-col :current-user=currentUser></right-col> </div> </div> <footer> <p>服务热线：4000 960 960（个人/企业）服务时间9:00-21:00 4000 980 980（广告主）服务时间9:00-18:00 （按当地市话标准计算）</p> <p>京ICP证100780号 互联网药品服务许可证 互联网医疗保健许可证 京网文[2014]2046-296号 京ICP备12002058号 增值电信业务经营许可证B2-20140447</p> <p>Copyright © 2009-2016 WEIBO 北京微梦创科网络技术有限公司 京公网安备11000002000019号</p> </footer> <new-weibo-popup v-ref:new-weibo-popup :current-user=currentUser></new-weibo-popup> </div> "},228:function(e,t){e.exports=' <div class=weibo-single-comment-wrapper> <div class=upper> <div class=avatar> <user-avatar size=50 :src=comment.user.avatar :userid=comment.user.userid></user-avatar> </div> <div class=right> <div class=nickname-title> <user-card :userid=comment.user.userid> <a href=/user/{{comment.user.userid}} class=name-title-link>{{comment.user.username}}</a> </user-card> </div> <div class=weibo-text-content> <weibo-text :weibo-text=comment.text></weibo-text> </div> <div class="extend comment-weibo" v-if=comment.weibo> <div class=content-wrapper> <div class=weibo-text-content> <span class=text>评论我的微博：</span><a href=/weibo/{{comment.weibo.weiboid}}>{{comment.weibo.text}}</a> </div> </div> </div> <div class="extend comment-comment" v-if=comment.comment> <div class=content-wrapper> <div class=weibo-text-content> <span class=text>回复我的评论：</span><a href=/weibo/{{comment.comment.weiboid}}>{{comment.comment.text}}</a> </div> </div> </div> <div class=time> <a href="/weibo/{{comment.weibo ? comment.weibo.weiboid : comment.comment.weiboid }}">{{comment.time | showTime}}</a> </div> </div> </div> </div> '},229:function(e,t){e.exports=' <div> <div class=weibo-wrapper> <comment class=weibo-comment v-for="comment in comments" :comment=comment track-by=commentid></comment> </div> </div> '},269:function(e,t,o){var i,s,n={};o(185),i=o(128),s=o(227),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;s&&(r.template=s),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},270:function(e,t,o){var i,s,n={};o(186),i=o(129),s=o(228),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;s&&(r.template=s),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})},271:function(e,t,o){var i,s,n={};o(187),i=o(130),s=o(229),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;s&&(r.template=s),r.computed||(r.computed={}),Object.keys(n).forEach(function(e){var t=n[e];r.computed[e]=function(){return t}})}});