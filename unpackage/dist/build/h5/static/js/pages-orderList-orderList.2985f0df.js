(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-orderList-orderList"],{"21ef":function(t,e,n){"use strict";var r=n("4ea4");n("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n("2909"));n("96cf");var o=r(n("1da1")),a=r(n("383a")),c={data:function(){return{current:0,tabs:["全部","待确定","已完成"],hasNextPage:!1,items:[],loading:!1}},onLoad:function(t){var e={toConfirm:1,finished:2};t.type||(this.current=0),"all"===t.type&&(this.current=0),e[t.type]?this.current=e[t.type]:this.current=0},onShow:function(){var t=this;return(0,o.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.items=[],t.hasNextPage=!1,t.loading=!1,e.next=5,t.getOrderList({start:0,hit:10});case 5:case"end":return e.stop()}}),e)})))()},onReachBottom:function(){var t=this;return(0,o.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.hasNextPage){e.next=3;break}return e.next=3,t.getOrderList({start:t.items.length,hit:10});case 3:case"end":return e.stop()}}),e)})))()},methods:{gotoPage:function(t,e){uni.navigateTo({url:"".concat(t,"?id=").concat(e)})},onClickItem:function(t){var e=this;return(0,o.default)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.currentIndex===e.current){n.next=6;break}return e.current=t.currentIndex,e.items=[],e.hasNextPage=!1,n.next=6,e.getOrderList({start:0,hit:10});case 6:case"end":return n.stop()}}),n)})))()},getOrderList:function(t){var e=this;return(0,o.default)(regeneratorRuntime.mark((function n(){var r,o,c,s,d,u,l;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=t.start,o=void 0===r?0:r,c=t.hit,s=void 0===c?10:c,!1!==e.hasNextPage||0===e.items.length){n.next=3;break}return n.abrupt("return");case 3:return e.loading=!0,d="1",0===e.current&&(d="3"),1===e.current&&(d="1"),2===e.current&&(d="2"),n.prev=8,n.next=11,a.default.getOrderList({start:o,hit:s,type:d});case 11:u=n.sent,l=u.data,e.items=[].concat((0,i.default)(e.items),(0,i.default)(l.items)),e.hasNextPage=l.hasNextPage,n.next=19;break;case 17:n.prev=17,n.t0=n["catch"](8);case 19:return n.prev=19,e.loading=!1,n.finish(19);case 22:case"end":return n.stop()}}),n,null,[[8,17,19,22]])})))()},confirmOrder:function(t){var e=this;uni.showModal({title:"确认",content:"是否确认该订单",success:function(n){n.confirm&&a.default.confirmOrder({id:t}).then((function(n){n&&(uni.showToast({title:"购买成功",duration:2e3}),setTimeout((function(){e.gotoPage("/pages/orderDetail/orderDetail",t)}),1e3))}))},fail:function(){}})}}};e.default=c},2909:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=s;var r=c(n("6005")),i=c(n("db90")),o=c(n("06c5")),a=c(n("3427"));function c(t){return t&&t.__esModule?t:{default:t}}function s(t){return(0,r.default)(t)||(0,i.default)(t)||(0,o.default)(t)||(0,a.default)()}},3427:function(t,e,n){"use strict";function r(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},"3ad8":function(t,e,n){"use strict";n.r(e);var r=n("e0ac"),i=n("ae7a");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("bd3f");var a,c=n("f0c5"),s=Object(c["a"])(i["default"],r["b"],r["c"],!1,null,"550ed54d",null,!1,r["a"],a);e["default"]=s.exports},"4eb5":function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={name:"UniSegmentedControl",emits:["clickItem"],props:{current:{type:Number,default:0},values:{type:Array,default:function(){return[]}},activeColor:{type:String,default:"#2979FF"},styleType:{type:String,default:"button"}},data:function(){return{currentIndex:0}},watch:{current:function(t){t!==this.currentIndex&&(this.currentIndex=t)}},created:function(){this.currentIndex=this.current},methods:{_onClick:function(t){this.currentIndex!==t&&(this.currentIndex=t,this.$emit("clickItem",{currentIndex:t}))}}};e.default=r},6005:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=o;var r=i(n("6b75"));function i(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t))return(0,r.default)(t)}},9343:function(t,e,n){"use strict";n.r(e);var r=n("e9cf"),i=n("a867");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("f9a8");var a,c=n("f0c5"),s=Object(c["a"])(i["default"],r["b"],r["c"],!1,null,"1c64cd4e",null,!1,r["a"],a);e["default"]=s.exports},a856:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.header[data-v-550ed54d]{background-color:#fff}.content[data-v-550ed54d]{margin:15px}.content .item[data-v-550ed54d]{background-color:#fff;border-radius:10px;margin-bottom:10px}.content .title[data-v-550ed54d]{padding:20px 12px 18.5px 12px;display:flex;flex-direction:row}.content .title .left[data-v-550ed54d]{font-size:15px;font-weight:500;color:#555;line-height:24px}.content .title .right[data-v-550ed54d]{font-size:15px;font-weight:500;color:#fa9f29;line-height:24px;margin-left:auto}.content .pic[data-v-550ed54d]{padding:0 12px 16px 12px;display:flex;flex-direction:row}.content .pic img[data-v-550ed54d]{height:74.5px;width:99px;border-radius:10px;margin-right:19.5px}.content .pic .info[data-v-550ed54d]{display:flex;flex-direction:column;justify-content:space-between}.content .pic .info .upper[data-v-550ed54d]{font-size:15px;font-weight:500;color:#333;line-height:24px}.content .pic .info .downer[data-v-550ed54d]{font-size:15px;font-weight:500;line-height:24px}.content .button[data-v-550ed54d]{padding:4px 12px 18px 0;display:flex;flex-direction:row;justify-content:flex-end}.content .button .btn-single[data-v-550ed54d]{text-align:center;height:33px;width:75px;font-size:13px;font-weight:500;color:#333;line-height:33px;border:1px solid #d2d2d2;border-radius:16.5px}.no-more[data-v-550ed54d]{height:20px;color:#ccc;text-align:center}',""]),t.exports=e},a867:function(t,e,n){"use strict";n.r(e);var r=n("4eb5"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},ae7a:function(t,e,n){"use strict";n.r(e);var r=n("21ef"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},b1c3:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.segmented-control[data-v-1c64cd4e]{display:flex;box-sizing:border-box;flex-direction:row;height:36px;overflow:hidden;cursor:pointer}.segmented-control__item[data-v-1c64cd4e]{display:inline-flex;box-sizing:border-box;position:relative;flex:1;justify-content:center;align-items:center}.segmented-control__item--button[data-v-1c64cd4e]{border-style:solid;border-top-width:1px;border-bottom-width:1px;border-right-width:1px;border-left-width:0}.segmented-control__item--button--first[data-v-1c64cd4e]{border-left-width:1px;border-top-left-radius:5px;border-bottom-left-radius:5px}.segmented-control__item--button--last[data-v-1c64cd4e]{border-top-right-radius:5px;border-bottom-right-radius:5px}.segmented-control__item--text[data-v-1c64cd4e]{border-bottom-style:solid;border-bottom-width:2px;padding:6px 0}.segmented-control__text[data-v-1c64cd4e]{font-size:14px;line-height:20px;text-align:center}',""]),t.exports=e},bd3f:function(t,e,n){"use strict";var r=n("c4fb"),i=n.n(r);i.a},c4fb:function(t,e,n){var r=n("a856");r.__esModule&&(r=r.default),"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("4f06").default;i("1a336202",r,!0,{sourceMap:!1,shadowMode:!1})},db90:function(t,e,n){"use strict";function r(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}n("a4d3"),n("e01a"),n("d28b"),n("a630"),n("d3b7"),n("3ca3"),n("ddb0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},e0ac:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var r={uniSegmentedControl:n("9343").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("uni-segmented-control",{staticClass:"header",attrs:{current:t.current,values:t.tabs,styleType:"text"},on:{clickItem:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickItem.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"content"},t._l(t.items,(function(e){return n("v-uni-view",{key:e.id,staticClass:"item",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.gotoPage("/pages/orderDetail/orderDetail",e.id)}}},[n("v-uni-view",{staticClass:"title"},[n("v-uni-view",{staticClass:"left"},[t._v("订单号："+t._s(e.id))]),n("v-uni-view",{staticClass:"right"},[t._v(t._s(e.statusName))])],1),n("v-uni-view",{staticClass:"pic"},[n("img",{attrs:{src:e.avatar,alt:""}}),n("v-uni-view",{staticClass:"info"},[n("v-uni-view",{staticClass:"upper"},[t._v(t._s(e.name))]),n("v-uni-view",{staticClass:"downer"},[n("span",{staticStyle:{color:"#fd6464"}},[t._v(t._s(e.credit))]),n("span",[t._v("积分")])])],1)],1),"2"===e.typeCode&&"1"===e.statusCode?n("v-uni-view",{staticClass:"button"},[n("v-uni-view",{staticClass:"btn-single",on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.confirmOrder(e.id)}}},[t._v("确认订单")])],1):t._e()],1)})),1),!t.hasNextPage&&t.items.length?n("v-uni-view",{staticClass:"no-more"},[t._v("没有更多了~")]):n("v-uni-view",{staticClass:"no-more"},[t._v("暂无订单~")])],1)},o=[]},e487:function(t,e,n){var r=n("b1c3");r.__esModule&&(r=r.default),"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("4f06").default;i("dd592cb6",r,!0,{sourceMap:!1,shadowMode:!1})},e9cf:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"segmented-control",class:["text"===t.styleType?"segmented-control--text":"segmented-control--button"],style:{borderColor:"text"===t.styleType?"":t.activeColor}},t._l(t.values,(function(e,r){return n("v-uni-view",{key:r,staticClass:"segmented-control__item",class:["text"===t.styleType?"":"segmented-control__item--button",r===t.currentIndex&&"button"===t.styleType?"segmented-control__item--button--active":"",0===r&&"button"===t.styleType?"segmented-control__item--button--first":"",r===t.values.length-1&&"button"===t.styleType?"segmented-control__item--button--last":""],style:{backgroundColor:r===t.currentIndex&&"button"===t.styleType?t.activeColor:"",borderColor:r===t.currentIndex&&"text"===t.styleType||"button"===t.styleType?t.activeColor:"transparent"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._onClick(r)}}},[n("v-uni-view",[n("v-uni-text",{staticClass:"segmented-control__text",class:"text"===t.styleType&&r===t.currentIndex?"segmented-control__item--text":"",style:{color:r===t.currentIndex?"text"===t.styleType?t.activeColor:"#fff":"text"===t.styleType?"#000":t.activeColor}},[t._v(t._s(e))])],1)],1)})),1)},o=[]},f9a8:function(t,e,n){"use strict";var r=n("e487"),i=n.n(r);i.a}}]);