(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-artist-artist"],{3023:function(t,a,e){"use strict";e.r(a);var r=e("b0418"),n=e.n(r);for(var i in r)"default"!==i&&function(t){e.d(a,t,(function(){return r[t]}))}(i);a["default"]=n.a},"77b8":function(t,a,e){var r=e("d875");r.__esModule&&(r=r.default),"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var n=e("4f06").default;n("74ae834a",r,!0,{sourceMap:!1,shadowMode:!1})},"86c0":function(t,a,e){"use strict";var r=e("77b8"),n=e.n(r);n.a},a31f:function(t,a,e){"use strict";e.r(a);var r=e("c670"),n=e("3023");for(var i in n)"default"!==i&&function(t){e.d(a,t,(function(){return n[t]}))}(i);e("86c0");var s,c=e("f0c5"),o=Object(c["a"])(n["default"],r["b"],r["c"],!1,null,"d6638cd6",null,!1,r["a"],s);a["default"]=o.exports},b0418:function(t,a,e){"use strict";var r=e("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,e("96cf");var n=r(e("1da1")),i=r(e("383a")),s={data:function(){return{id:"",artist:null}},onLoad:function(t){this.id=t.id},onShow:function(){var t=this;return(0,n.default)(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.getArtistDetail();case 2:case"end":return a.stop()}}),a)})))()},methods:{getArtistDetail:function(){var t=this;return(0,n.default)(regeneratorRuntime.mark((function a(){var e,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i.default.getArtistDetail({id:t.id});case 3:e=a.sent,r=e.data,t.artist=r,a.next=10;break;case 8:a.prev=8,a.t0=a["catch"](0);case 10:case"end":return a.stop()}}),a,null,[[0,8]])})))()}}};a.default=s},c670:function(t,a,e){"use strict";var r;e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return i})),e.d(a,"a",(function(){return r}));var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.artist?e("v-uni-view",[e("v-uni-view",{staticClass:"part1"},[e("v-uni-view",{staticClass:"artist-detail"},[e("span",{staticStyle:{color:"#000000","font-size":"22px","font-weight":"800"}},[t._v(t._s(t.artist.name))]),e("span",{staticStyle:{color:"#666666","font-size":"16px","font-weight":"500"}},[t._v(t._s(t.artist.type))])]),e("img",{attrs:{src:t.artist.avatar,alt:""}})],1),e("v-uni-view",{staticClass:"part2"},[e("v-uni-view",{staticClass:"part2-detail"},[t._v("画家详情")]),e("v-uni-view",{staticClass:"part2-desc"},[t._v(t._s(t.artist.introduction))])],1)],1):t._e()},i=[]},d875:function(t,a,e){var r=e("24fb");a=r(!1),a.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.part1[data-v-d6638cd6]{background-color:#fff;padding:17.5px 15px;display:flex;flex-direction:row;align-items:center;margin-bottom:10px}.part1 .artist-detail[data-v-d6638cd6]{height:80px;display:flex;flex-direction:column;justify-content:space-around}.part1 img[data-v-d6638cd6]{margin-left:auto;width:80px;height:80px;border-radius:50%}.part2[data-v-d6638cd6]{background-color:#fff;padding:28px 15px}.part2 .part2-detail[data-v-d6638cd6]{font-size:18px;font-weight:500;color:#000;margin-bottom:18px}.part2 .part2-desc[data-v-d6638cd6]{font-size:14px;font-weight:500;color:#333}',""]),t.exports=a}}]);