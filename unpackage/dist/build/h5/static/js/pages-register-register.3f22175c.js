(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-register-register"],{3594:function(t,e,n){"use strict";var i=n("5383"),a=n.n(i);a.a},3916:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.container[data-v-c77c6654]{background:linear-gradient(0deg,#217bfb,#4491ff);height:calc(100vh - 134px);padding:0 15px;padding-top:90px}.container .register[data-v-c77c6654]{height:427px;background-color:#fff;border-radius:19px;padding:24px 30px}.container .register .content[data-v-c77c6654]{display:flex;flex-direction:column}.vcode-gene[data-v-c77c6654]{display:flex;flex-direction:row;align-items:center}.line-edit[data-v-c77c6654]{height:50px;padding-bottom:2px;border-bottom:1px solid #efefef;font-size:15px;display:flex;flex-direction:column;justify-content:center}.line-edit .line-input .uni-input-placeholder[data-v-c77c6654]{color:#ccc}.button-login[data-v-c77c6654]{margin:21px 0 30px 0;display:flex;justify-content:center;align-items:center;background:linear-gradient(86deg,#4391ff,#217bfb);height:44px;border-radius:22px}.button-login span[data-v-c77c6654]{color:#fff;font-size:16px;font-weight:500}.bottom-reg[data-v-c77c6654]{margin:20px 0 33px 0;text-align:center}.canvas-img-code[data-v-c77c6654]{display:inline-block}',""]),t.exports=e},5383:function(t,e,n){var i=n("3916");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("88be4e7e",i,!0,{sourceMap:!1,shadowMode:!1})},"59c7":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"container"},[n("v-uni-view",{staticClass:"register"},[n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticStyle:{"font-size":"26px","font-weight":"800",color:"#222222","margin-bottom":"15px"}},[n("v-uni-text",[t._v("注册")])],1),n("v-uni-view",{staticClass:"line-edit"},[n("v-uni-input",{staticClass:"line-input",attrs:{type:"phone",placeholder:"请输入手机号"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),n("v-uni-view",{staticClass:"line-edit"},[n("v-uni-view",{staticClass:"vcode-gene"},[n("v-uni-input",{staticClass:"line-input",attrs:{type:"text",placeholder:"请输入验证码"},model:{value:t.inputVcode,callback:function(e){t.inputVcode=e},expression:"inputVcode"}}),n("v-uni-view",{staticClass:"canvas-img-code",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.refresh()}}},[n("v-uni-canvas",{style:{width:t.width+"px",height:t.height+"px"},attrs:{"canvas-id":"imgcanvas"},on:{error:function(e){arguments[0]=e=t.$handleEvent(e),t.canvasIdErrorCallback.apply(void 0,arguments)}}})],1)],1)],1),n("v-uni-view",{staticClass:"line-edit"},[n("v-uni-input",{staticClass:"line-input",attrs:{type:"password",placeholder:"请输入密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),n("v-uni-view",{staticClass:"line-edit"},[n("v-uni-input",{staticClass:"line-input",attrs:{type:"text",placeholder:"请输入真实姓名"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),n("v-uni-view",{staticClass:"line-edit"},[n("v-uni-input",{staticClass:"line-input",attrs:{type:"text",placeholder:"请输入推荐人邀请码"},model:{value:t.inviteCode,callback:function(e){t.inviteCode=e},expression:"inviteCode"}})],1),n("v-uni-button",{staticClass:"button-login"},[n("span",[t._v("立即注册")])]),n("v-uni-view",{staticClass:"bottom-reg",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.gotoPage("/pages/login/index")}}},[n("span",[t._v("已有账号？")]),n("span",{staticStyle:{color:"#217bfb"}},[t._v("立即登录")])])],1)],1)],1)},c=[]},"8bc8":function(t,e,n){"use strict";n("cb29"),n("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{phone:"",password:"",name:"",inviteCode:"",vcode:"",inputVcode:"",width:120,height:30}},onShow:function(){if(!this.vcode){var t=this;setTimeout((function(){t.init()}),500)}},methods:{gotoPage:function(t){uni.navigateTo({url:t})},init:function(){var t=uni.createCanvasContext("imgcanvas",this),e=this.width,n=this.height;t.setFillStyle("white"),t.setLineWidth(5),t.fillRect(0,0,e,n);for(var i=["A","B","C","D","E","F","G","H","I","J","K","L","I","M","N","O","P","Q","R","S","T","U","V","W","S","Y","Z","1","2","3","4","5","6","7","8","9","0"],a="",c=0;c<4;c++){var o=i[this.rn(0,i.length-1)],s=this.rn(-30,30);t.setFontSize(18),t.setTextBaseline("top"),t.setFillStyle(this.rc(80,150)),t.save(),t.translate(30*c+15,parseInt(n/1.5)),t.rotate(s*Math.PI/180),t.fillText(o,-10,-15),t.restore(),a+=o}this.vcode=a;for(var r=0;r<40;r++)t.beginPath(),t.arc(this.rn(0,e),this.rn(0,n),1,0,2*Math.PI),t.closePath(),t.setFillStyle(this.rc(150,200)),t.fill();t.draw()},refresh:function(){this.init()},rc:function(t,e){var n=this.rn(t,e),i=this.rn(t,e),a=this.rn(t,e);return"rgb("+n+","+i+","+a+")"},rn:function(t,e){return parseInt(Math.random()*(t-e))+e},canvasIdErrorCallback:function(t){console.error(t.detail.errMsg)}}};e.default=i},b213:function(t,e,n){"use strict";n.r(e);var i=n("59c7"),a=n("eece");for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);n("3594");var o,s=n("f0c5"),r=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"c77c6654",null,!1,i["a"],o);e["default"]=r.exports},cb29:function(t,e,n){var i=n("23e7"),a=n("81d5"),c=n("44d2");i({target:"Array",proto:!0},{fill:a}),c("fill")},eece:function(t,e,n){"use strict";n.r(e);var i=n("8bc8"),a=n.n(i);for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);e["default"]=a.a}}]);