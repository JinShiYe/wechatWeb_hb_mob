webpackJsonp([0],{"0On3":function(e,t,s){"use strict";var a=s("8yBh"),n=s("N1ep"),i=s("VU/8"),o=i(a.a,n.a,null,null,null);t.a=o.exports},"2Nak":function(e,t,s){"use strict";s("YaEn");t.a={name:"extra-file",props:{msgType:{type:Number,default:1}},data:function(){return{uploadFiles:[],uploadReal:!1}},created:function(){},methods:{getAcceptType:function(){var e;switch(this.msgType){case 0:e="添加文字";break;case 1:e="添加文本";break;case 2:case 3:e="image/jpeg,image/png";break;case 4:e="audio/AMR";break;case 5:e="video/mp4";break;case 6:e="*"}return e},getHintInfo:function(){console.log("选择文件时的文件类型："+this.msgType);var e;switch(this.msgType){case 0:e="添加文字";break;case 1:e="添加文本";break;case 2:e="添加图文";break;case 3:e="添加图片";break;case 4:e="添加语音";break;case 5:e="添加视频";break;case 6:e="添加文件"}return e},selectFile:function(e){}}}},"5e12":function(e,t,s){"use strict";var a=s("jVla"),n=s("F/cP"),i=s("VU/8"),o=i(a.a,n.a,null,null,null);t.a=o.exports},"6Ldw":function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"weui-flex"},e._l(e.msgBanners,function(t,a){return s("div",{staticClass:"weui-flex__item",class:[{active:a===e.activeIndex}],on:{click:function(s){e.bannerClick(a,t)}}},[s("div",{staticClass:"placeholder"},[e._v(e._s(t.content))])])}))},n=[],i={render:a,staticRenderFns:n};t.a=i},"6jvF":function(e,t,s){"use strict";t.a={name:"msg-search",data:function(){return{}},methods:{}}},"6oqw":function(e,t,s){"use strict";var a=s("EF91");t.a={name:"msg-detail",props:["msgId"],components:{replyList:a.a},data:function(){return{}},methods:{}}},"7mNt":function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("msg-search"),e._v(" "),s("msg-banner"),e._v(" "),s("msg-list")],1)},n=[],i={render:a,staticRenderFns:n};t.a=i},"8SfJ":function(e,t,s){"use strict";function a(e){s("InRP")}var n=s("pqQu"),i=s("7mNt"),o=s("VU/8"),r=a,l=o(n.a,i.a,r,null,null);t.a=l.exports},"8yBh":function(e,t,s){"use strict";var a=s("MHe+");t.a={components:{extraFile:a.a},name:"extra-publish",props:{msgType:{type:Number,default:0}},data:function(){return{title:"",description:"",uploadReal:!0}},created:function(){},computed:{},methods:{}}},"93kB":function(e,t,s){"use strict";var a=s("sPQq"),n=s("ZbU0"),i=s("VU/8"),o=i(a.a,n.a,null,null,null);t.a=o.exports},"A+8S":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAMAAAC7m5rvAAAAllBMVEUAAAC/v7+qqqrHx8evr6/ExMS5ubmxsbGsrKysrKytra2pqam8vLy9vb2lpaXExMT////s7Oz8/Pz09PTu7u729vb5+fnp6enMzMzLy8vm5ub4+Pjj4+O3t7fx8fHb29vAwMDHx8ePj4/S0tLf39+rq6ulpaWSkpK7u7vY2NjR0dGnp6eenp6ampqysrLPz8+fn5+ioqKXtObzAAAAEHRSTlMA6wT4/e/f0KyZSy/z8mz4uKbH2gAAA6FJREFUSMellody2zAMhuXEGU6TVBgkbGp529np+79cKREUpbrxdfxnn7g+cYACkKku7m5vricPl4v5Yq5arWLJN14+TK5vbu8udLhCsyuHeY6QD0Q0rEHb765mA/DbJIw4j4XGybdIPV5q13lMC9NHnWvKpxhiAVBYPMX4ezffxSQnHmFoahFgkRpEmHCEMeWTdn8zygOnmAVhkxZZ1AImYdyOnvnJrrohrBiymF/3ZgGsYty1XV1kdy6MATKGnJRgoiAVuRRH/inhTe4uu9U1Q8MMmy0nOcdJ5bMwbEs9g9vsJg8yjq2UXxugdJYBtHKTXUeM64bO2c00bGP/dTbBIAIBERyIaFgTASHQyiS7hyC3KaHcQNSm2r2+vbwvBFRt91OjlfssXizZ+q2WjN3yqvXrcfWxmS/362lYGJfYjQm6zBah4InWbtRyy3UlGPaGvDxU6B8EvqVo9NgX2TwUGDosJzb7vQyPBHafxNSZ2zq9hXOdzYoJWM6Hyo5P0h4PkAcMwI5mAxOx/bvgGEOpfqBihoezoeSKLffWAA4xBLIvS8VywYR5RjFaix8PmDBs77+sa8XYDDA2ilVV9xbAiCF0cFUpZniASa6Yn0y5aICO8tMplkvCMGKbV8x7jqhbYSf8fI4YJgwUq46+FjmillIdK8UgYQUrtlvliaspUflqpxgXHbYiIhD/d77w+kG9oGkg1T5eiYhLImkbV2PsbUO96qcnStq8jbCwyFoX+TJPjhK8kpucv+gi66LfmwXF3peJMkQmcct3xcCeGmCxx55qDdBzuF8kA5yYW9bcUy3Wc7x2p+bOuQgYTJdKxctVBG65g4AVMMCoVgwOECjFlOMDKFbTbz+camcRilwxvS84rX79cPQztYrh51HM+DMtZPmGilkYOQUDiuX1iVPA44F7p2DGLghYZwP+8SJDjKdvADqbg+SCOtmyw9p94anDKwCDw7Pq8JJ7LduTga69rtaf0b3uIJyneAySe32AIPdc+r8D1bM6c23oulzvzB9S6BDnf1+HDifkUugYBCrT1OcCVd1QClQpLALQubDoHAGlsBiDMG3J0pMUthdzKhfw5LtLiUE4hnx0AgDNtnEQVZYQ5XyHf8jWasjXBAPBxgQDziQYFqwmGNmMlIrpDH+ZzihHs5A8+co4eeKUPEFKngKHIXnKvn0H++epmoWppoaP079JDL8//lsa+p9Jb0qx77sUexG0WmmhS7HvRyn2TxZ1zUyK+LY0AAAAAElFTkSuQmCC"},BRbc:function(e,t){},EF91:function(e,t,s){"use strict";function a(e){s("yrVV")}var n=s("ZqH5"),i=s("r6xv"),o=s("VU/8"),r=a,l=o(n.a,i.a,r,null,null);t.a=l.exports},"F/cP":function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.isLoading?s("div",[e._v("loading")]):s("div",{staticClass:"weui-cells"},[e._l(e.listData,function(t,a){return[t.name?s("label",{staticClass:"weui-cell weui-check__label",attrs:{for:t.userid}},[s("div",{staticClass:"weui-cell__hd"},[s("input",{staticClass:"weui-check",attrs:{type:"checkbox",id:t.userid},domProps:{value:t.userid,checked:e.isAllChecked||t.isChecked},on:{change:function(s){e.togglePerson(t,s)}}}),e._v(" "),s("i",{staticClass:"weui-icon-checked"})]),e._v(" "),s("div",{staticClass:"weui-cell__bd"},[s("p",[e._v(e._s(t.name))])])]):s("a",{staticClass:"weui-cell weui-cell_access"},[s("div",{staticClass:"weui-cell__hd"},[s("label",{attrs:{for:t.value}},[s("input",{attrs:{type:"checkbox",id:t.value},domProps:{value:t.value,checked:e.isAllChecked||t.isChecked},on:{change:function(t){e.toggleDepart(e.item$event)}}}),e._v(" "),s("i",{staticClass:"weui-icon-checked"})])]),e._v(" "),s("div",{staticClass:"weui-cell__bd",on:{click:function(s){e.clickEvent(t)}}},[s("p",[e._v(e._s(t.title))])]),e._v(" "),s("div",{staticClass:"weui-cell__ft",on:{click:function(s){e.clickEvent(t)}}})])]})],2)},n=[],i={render:a,staticRenderFns:n};t.a=i},FjHR:function(e,t,s){"use strict";t.a={MAINURL:"https://jsypay.jiaobaowang.net/wxth/appschweb/schwebapi.aspx",CONFIGURL:"https://jsypay.jiaobaowang.net/wxth/jssdkapi.aspx",UPLOADURL:"https://jsypay.jiaobaowang.net/wxth/appschweb/FileUpLoad.ashx",KEY_DEPARTS:"key-departments",KEY_CHOOSE_PERSONS:"key-choosePersons",KEY_CHOOSE_DEPARTS:"key-chooseDeparts",KEY_CHOSE_MAP:"key-choseMap",KEY_DEPART_POSITION:"key-depart-position",MSGHOMEBARS:[{img:"../images/icon_tabbar.png",label:"新建通知",routerLink:"dynamic-publish"},{img:"../images/icon_tabbar.png",label:"查看通知",routerLink:"message-container"}],MSGSTYLES:[{type:"text",msgtype:"text",typeNo:0,typeName:"文字"},{type:"textcard",msgtype:"textcard",typeNo:1,typeName:"文本卡片"},{type:"news",msgtype:"news",typeNo:2,typeName:"图文"},{type:"image",msgtype:"image",typeNo:3,typeName:"图片"},{type:"voice",msgtype:"voice",typeNo:4,typeName:"语音"},{type:"video",msgtype:"video",typeNo:5,typeName:"视频"},{type:"file",msgtype:"file",typeNo:6,typeName:"文件"}],MSGBANNERS:[{type:0,content:"全部"},{type:1,content:"已阅读"},{type:2,content:"未阅读"},{type:3,content:"我发的"}]}},GEEi:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"weui-uploader"},[s("div",{staticClass:"weui-uploader__bd"},[s("ul",{staticClass:"weui-uploader__files",attrs:{id:"uploaderFiles"}},e._l(e.uploadFiles,function(e){return s("li",{staticClass:"weui-uploader__file",style:{"background-image":"url("+e.fileurl+")"}})})),e._v(" "),s("div",{staticClass:"weui-uploader__input-box"},[s("input",{staticClass:"weui-uploader__input",attrs:{id:"uploaderInput",type:"file",accept:e.getAcceptType()},on:{change:function(t){e.selectFile(t)}}})])])])},n=[],i={render:a,staticRenderFns:n};t.a=i},GPIM:function(e,t,s){"use strict";var a=s("mvHQ"),n=s.n(a),i=s("MHe+"),o=s("FjHR"),r=s("YaEn");t.a={name:"dynamic-publish",props:{chosePersons:{type:Array,default:function(){return[]}},content:""},components:{extraFile:i.a},data:function(){return{msgType:1,msgStyles:o.a.MSGSTYLES,title:"",description:""}},created:function(){console.log("获取的类型数据："+n()(o.a.MSGSTYLES))},methods:{publishMethod:function(){},routeToPersons:function(){r.a.push({name:"choose-person",params:{id:-1}})},getType:function(e){console.log(e.target.value),this.msgType=parseInt(e.target.value)}}}},GUFS:function(e,t,s){"use strict";function a(e){s("Hp6M")}var n=s("nA+z"),i=s("PI+T"),o=s("VU/8"),r=a,l=o(n.a,i.a,r,null,null);t.a=l.exports},Hp6M:function(e,t){},InRP:function(e,t){},KyrF:function(e,t,s){"use strict";var a=s("FjHR");t.a={name:"msg-banner",data:function(){return{msgBanners:a.a.MSGBANNERS,activeIndex:0}},methods:{bannerClick:function(e,t){this.activeIndex=e,this.$emit("choseBanner",t)}}}},M93x:function(e,t,s){"use strict";var a=s("xJD8"),n=s("VIFX"),i=s("VU/8"),o=i(a.a,n.a,null,null,null);t.a=o.exports},"MHe+":function(e,t,s){"use strict";var a=s("2Nak"),n=s("GEEi"),i=s("VU/8"),o=i(a.a,n.a,null,null,null);t.a=o.exports},N1ep:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"weui-cells weui-cells_form"},[s("div",{staticClass:"weui-cell"},[s("div",{staticClass:"weui-cell__bd"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.title,expression:"title",modifiers:{trim:!0}}],staticClass:"weui-input",attrs:{type:"text",placeholder:"在此输入标题"},domProps:{value:e.title},on:{input:function(t){t.target.composing||(e.title=t.target.value.trim())},blur:function(t){e.$forceUpdate()}}})])]),e._v(" "),s("div",{staticClass:"weui-cell",attrs:{v:""}},[s("div",{staticClass:"weui-cell_bd"},[s("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:e.description,expression:"description",modifiers:{trim:!0}}],staticClass:"weui-textarea",attrs:{rows:"10",placeholder:"在此输入正文"},domProps:{value:e.description},on:{input:function(t){t.target.composing||(e.description=t.target.value.trim())},blur:function(t){e.$forceUpdate()}}})])]),e._v(" "),s("extra-file",{attrs:{msgType:e.msgType}}),e._v(" "),s("a",{staticClass:"weui-btn weui-btn_mini weui-btn_primary",on:{click:function(t){e.finishMethod()}}},[e._v("完成")]),e._v(" "),s("a",{staticClass:"weui-btn weui-btn_mini weui-btn_default",on:{click:function(t){e.cancelMethod()}}},[e._v("取消")])],1)},n=[],i={render:a,staticRenderFns:n};t.a=i},NDNE:function(e,t){},NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("7+uW"),n=s("M93x"),i=s("YaEn"),o=s("BRbc"),r=(s.n(o),s("U8mb")),l=(s.n(r),s("7t+N"));s.n(l);new a.a({el:"#app",router:i.a,template:"<App></App>",components:{App:n.a}})},"PI+T":function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container",attrs:{id:"container"}},[a("div",{staticClass:"page tabbar js_show"},[a("div",{staticClass:"page__bd",staticStyle:{height:"100%"}},[a("div",{staticClass:"weui-tab"},[a("div",{staticClass:"weui-tab__panel"},[a("router-view")],1),e._v(" "),a("div",{staticClass:"weui-tabbar"},e._l(e.bars,function(t,n){return a("router-link",{key:n,staticClass:"weui-tabbar__item",attrs:{to:t.routerLink,"active-class":"weui-bar__item_on"}},[a("span",{staticClass:"tabbar-span"},[a("img",{attrs:{src:s("A+8S")}})]),e._v(" "),a("p",{staticClass:"weui-tabbar__label"},[e._v(e._s(t.label))])])}))])])])])},n=[],i={render:a,staticRenderFns:n};t.a=i},PJFI:function(e,t,s){"use strict";function a(e){s("oOAe")}var n=s("KyrF"),i=s("6Ldw"),o=s("VU/8"),r=a,l=o(n.a,i.a,r,"data-v-716b4f96",null);t.a=l.exports},U8mb:function(e,t){},VIFX:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},n=[],i={render:a,staticRenderFns:n};t.a=i},VwQt:function(e,t,s){"use strict";var a=s("mvHQ"),n=s.n(a);t.a={toggleValueInSessionArray:function(e,t,s){var a=this.getSessionArray(e);console.log("获取的本地的值："+n()(a)),sessionStorage.setItem(e,n()(this.toggleValueInArray(a,t,s)))},toggleValueInArray:function(e,t,s){console.log("是否添加数据？"+s+",要处理的值:"+t);var a=this.isExistInArray(e,t);return s?a[1]<0&&a[0].push(t):a[1]>=0&&a[0].splice(a[1],1),console.log("加载或删除后的数组："+n()(a[0])),a[0]},getSessionArray:function(e){var t=void 0;return t=sessionStorage.getItem(e)?JSON.parse(sessionStorage.getItem(e)):[],console.log("获取的本地存储数组："+n()(t)),t},isExistInSessionArray:function(e,t){var s=this.getSessionArray(e);return this.isExistInArray(s,t)},isExistInArray:function(e,t){var s=[e,e.indexOf(t)];return console.log("获取的是否值是否存在于数组中："+n()(s)),s},getSessionMap:function(e){return console.log("****getSessionMap***获取的本地值:"+sessionStorage.getItem(e)),sessionStorage.getItem(e)?JSON.parse(sessionStorage.getItem(e)):{}},getSessionMapValue:function(e,t){var s=this.getSessionMap(e);return console.log("***getSessionMapValue***获取的部门已选择的人的数组"+n()(s)),s[t]?s[t]:[]},setSessionMapValue:function(e,t,s){var a=this.getSessionMap(e);a[t]=s,sessionStorage.setItem(e,n()(a)),console.log("****setSessionMapValue***放置的本地值："+n()(a))}}},YaEn:function(e,t,s){"use strict";var a=s("7+uW"),n=s("/ocq"),i=s("mTVx"),o=s("0On3"),r=s("GUFS"),l=s("8SfJ"),c=s("a8PK"),u=s("5e12");a.a.use(n.a),t.a=new n.a({routes:[{path:"/",redirect:"/msg-home"},{path:"/msg-home",name:"msg-home",component:r.a,children:[{path:"dynamic-publish",name:"dynamic-publish",component:i.a},{path:"message-container",name:"message-container",component:l.a},{path:"",redirect:{name:"dynamic-publish"}}]},{path:"/extra-publish",name:"extra-publish",component:o.a},{path:"/message-detail/:id",name:"message-detail",component:c.a},{path:"/choose-person/:id",name:"choose-person",component:u.a}]})},ZbU0:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[e.listData.length>0?e._l(e.listData,function(t,a){return s("div",[s("div",{staticClass:"weui-flex"},[s("div",{staticClass:"weui-flex__item"},[s("p",[s("span"),e._v(e._s(t.title))])]),e._v(" "),s("p",[e._v(e._s(t.date))])]),e._v(" "),s("p",[e._v(e._s(t.content))]),e._v(" "),s("div")])}):s("div")],2)},n=[],i={render:a,staticRenderFns:n};t.a=i},ZqH5:function(e,t,s){"use strict";t.a={name:"reply-list",props:{msgId:{type:Number}},data:function(){return{lsitData:[]}}}},a8PK:function(e,t,s){"use strict";var a=s("6oqw"),n=s("j73e"),i=s("VU/8"),o=i(a.a,n.a,null,null,null);t.a=o.exports},eQSN:function(e,t){},j73e:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div"),e._v(" "),s("div"),e._v(" "),s("reply-list",{attrs:{msgId:e.msgId}})],1)},n=[],i={render:a,staticRenderFns:n};t.a=i},jVla:function(e,t,s){"use strict";var a=s("mvHQ"),n=s.n(a),i=s("FjHR"),o=s("VwQt"),r=s("vLgD"),l=s("YaEn");t.a={name:"choose-person",data:function(){return{listData:[],isLoading:!1,id:this.depart_id,choseItems:[],isAllChecked:!1,count:0,allCount:0,depart_id:this.$route.params.id}},created:function(){console.log("获取的的id"+this.$route.params.id),this.setPosition(),-1===this.depart_id?this.getAllListData():this.getCurDeparts()},watch:{$route:function(e,t){console.log("当前路由id:"+this.$route.params.id),this.setPosition(),-1===this.depart_id?this.getAllListData():this.getCurDeparts()}},methods:{getAllListData:function(){console.log("*********getAllListData******");var e=this;e.isLoading=!0,r.a.getDepartList(function(t){console.log("getAllListData获取的部门列表："+n()(JSON.parse(t))),sessionStorage.setItem(i.a.KEY_DEPARTS,t),e.getCurDeparts()})},getCurDeparts:function(){console.log("*********getCurDeparts******"),this.isLoading=!0;var e=this.getLocalChildren();console.log("获取当前部门*****"+n()(e)),e&&e.length>0?(this.setItemsStatus(e),this.listData=e,this.isLoading=!1):this.requestChildren()},requestChildren:function(){console.log("*********requestChildren获取本页列表数据******");var e=0;e=-1===this.depart_id?1:this.depart_id;var t=JSON.parse(sessionStorage.getItem(i.a.KEY_DEPARTS));console.log(t);var s=t.filter(function(t){return t.parentvalue==e});console.log("获取的当前部门的子部门:"+n()(s)),this.getChildDepartsPersen(s)},getChildDepartsPersen:function(e){console.log("********getChildDepartsPersen********");var t=this;if(e.length>0)for(var s in e)e[s].children=this.getAllChildDeparts(e[s].value),this.getSingleDepartAllPersen(e[s],e),this.getSingleDepartPersen(e[s],e);else console.log("沒有子部门时，获取成员，子部门："+n()(e)),t.getCurPersen(e)},getDepartAllPersen:function(e,t){console.log("********getDepartAllPersen********"),r.a.getDepartPersons(e,1,0,function(e){console.log("递归获取的本部门人员:"+n()(e)),t(e)})},getSingleDepartAllPersen:function(e,t){console.log("********getSingleDepartAllPersen********");var s=this;s.getDepartAllPersen(e,function(a){s.allCount++,e.allPersen=a,console.log("当前的depart:"+n()(e)),s.allCount==t.length&&(console.log("获取的部门所有人员:"+n()(t)),s.allCount==t.length&&s.count==t.length&&(s.getCurPersen(t),s.allCount=0,s.count=0))})},getSingleDepartPersen:function(e,t){console.log("********getSingleDepartPersen********");var s=this;s.getDepartPersen(e,function(a){s.count++,e.persen=a,console.log("当前的depart:"+n()(e)),s.count==t.length&&(console.log("获取的部门人员:"+n()(t)),s.allCount==t.length&&s.count==t.length&&(s.getCurPersen(t),s.allCount=0,s.count=0))})},getDepartPersen:function(e,t){console.log("********getDepartAllPersen********"),r.a.getDepartPersons(e,0,0,function(e){console.log("递归获取的本部门人员:"+n()(e)),t(e)})},getCurPersen:function(e){console.log("********getCurPersen获取当前部门人员********");var t=this;-1==t.$route.params.id||t.$route.params.id,r.a.getDepartPersons(t.$route.params.id,0,0,function(s){console.log("获取的本部门人员:"+n()(s));var a=s.concat(e);t.setItemsStatus(a),t.listData=a,t.isLoading=!1,t.setAsChildren()})},clickEvent:function(e){console.log("********clickEvent********"),e.value?(console.log("路由跳转"),this.routerTo(e)):(console.log("人员选择"),this.choosePerson(e))},setItemsStatus:function(e){console.log("********setItemsStatus设置列表选择状态********"),console.log("要改变的部门和人员数据:"+n()(e));var t=o.a.isExistInSessionArray(i.a.KEY_CHOOSE_DEPARTS,this.$route.params.id);console.log("此部门是否存在于已选部门列表中:"+n()(t)),t[1]>=0?this.isAllChecked=!0:(this.isAllChecked=!1,e=this.getSingleChecked(e)),console.log("是否已全选？"+this.isAllChecked)},getSingleChecked:function(e){console.log("********getSingleChecked人员部门选择状态获取********");for(var t in e)e[t].isChecked=this.isItemChecked(e[t]);return console.log("遍历获取部门或人员状态后的值："+n()(e)),e},isItemChecked:function(e){return console.log("********isItemChecked********"),console.log("要设置的item的数据："+n()(e)),console.log("部门对应的人员的map值："+n()(o.a.getSessionMap(i.a.KEY_CHOSE_MAP))),console.log("已选部门的值："+n()(o.a.getSessionArray(i.a.KEY_CHOOSE_DEPARTS))),e.userid?o.a.isExistInArray(o.a.getSessionMapValue(i.a.KEY_CHOSE_MAP,this.$route.params.id),e.userid)[1]>=0:(o.a.toggleValueInSessionArray(i.a.KEY_CHOOSE_DEPARTS,e.value,this.isAllChildrenChose(e)),o.a.isExistInSessionArray(i.a.KEY_CHOOSE_DEPARTS,e.value)[1]>=0)},isAllChildrenChose:function(e){console.log("********isAllChildrenInLocal********"),console.log("要处理的部门数据:"+n()(e));for(var t in e.children)if(o.a.isExistInSessionArray(i.a.KEY_CHOOSE_DEPARTS,e.children[t].value)[1]<0)return!1;return o.a.getSessionMapValue(i.a.KEY_CHOSE_MAP,e.value).length===e.persen.length},togglePerson:function(e,t){console.log("********togglePerson人员选择********");var s=t.target.checked;console.log("********关注的人事件传递********"),this.$emit("togglePerson",[e],s),this.changeSessionByPerson(e,s),this.setItemsStatus(this.listData)},changeSessionByPerson:function(e,t){console.log("********changeSessionByPerson人员选择后的响应********");var s=this;e.department.forEach(function(a){s.togglePersonInDepart(a,e,t),t||o.a.toggleValueInSessionArray(i.a.KEY_CHOOSE_DEPARTS,a,t)})},togglePersonInDepart:function(e,t,s){console.log("********togglePersonInDepart相关部门内数据的存取********");var a=o.a.toggleValueInArray(o.a.getSessionMapValue(i.a.KEY_CHOSE_MAP,e),t.userid,s);o.a.setSessionMapValue(i.a.KEY_CHOSE_MAP,e,a),console.log("保存的map数据:"+n()(o.a.getSessionMap(i.a.KEY_CHOSE_MAP)))},toggleDepart:function(e,t){console.log("********toggleDepart部门选取事件********");var s=this,a=t.target.checked;console.log("******传递事件togglePerson******"),s.$emit("togglePerson",e.allPersen,a);var n=this.getAllChildDeparts(e.value);n.push(e),n.forEach(function(e){o.a.toggleValueInSessionArray(i.a.KEY_CHOOSE_DEPARTS,e.value,a)}),console.log("保存或删除本部门及子部门："+o.a.getSessionArray(i.a.KEY_CHOOSE_DEPARTS)),e.allPersen.forEach(function(e){s.changeSessionByPerson(e,a)}),s.setItemsStatus(s.listData)},getAllChildDeparts:function(e){console.log("********getAllChildDeparts 递归获取所有子部门********");var t=o.a.getSessionArray(i.a.KEY_DEPARTS),s=t.filter(function(t){return t.parentvalue===e});if(s.length>0)for(var a in s)s=s.concat(this.getAllChildDeparts(s[a].value));return console.log("departId为:"+e+"的获取的所有子部门"+n()(s)),s},setAsChildren:function(){console.log("********setAsChildren将子部门数据保存至本地数组中********");var e=this.$route.params.id;1===e&&(e=-1);var t=o.a.getSessionArray(i.a.KEY_DEPARTS);t[this.getDepartIndex(e)].children=this.listData,console.log("要保存至本地的列表数据："+n()(t)),sessionStorage.setItem(i.a.KEY_DEPARTS,n()(t))},getDepartIndex:function(){console.log("********getDepartIndex获取部门在部门列表中的序号********");var e=this.$route.params.id,t=JSON.parse(sessionStorage.getItem(i.a.KEY_DEPARTS));for(var s in t)if(t[s].value===e)return s},getLocalChildren:function(){console.log("********getLocalChildren获取保存至本地的本部门子部门和人員********");var e=this.$route.params.id,t=o.a.getSessionArray(i.a.KEY_DEPARTS),s=t.filter(function(t){return t.value===e});return s&&s.length>0?s[0].children:[]},getDepartInfo:function(){var e=JSON.parse(sessionStorage.getItem(i.a.KEY_DEPARTS));for(var t in e)if(this.$route.params.id===e[t].value)return e[t]},setPosition:function(){if(console.log("********setPosition********"),-1===parseInt(this.$route.params.id))o.a.setSessionMapValue(i.a.KEY_DEPART_POSITION,1,1);else{var e=this.getDepartInfo(),t=o.a.getSessionMapValue(i.a.KEY_DEPART_POSITION,e.parentvalue);o.a.setSessionMapValue(i.a.KEY_DEPART_POSITION,e.value,parseInt(t)+1)}console.log("本地存储的部门位置:"+n()(o.a.getSessionMap(i.a.KEY_DEPART_POSITION)))},routerTo:function(e){console.log("********routerTo路由跳转********"),l.a.push({name:"choose-person",params:{id:parseInt(e.value)}})}}}},lL0Y:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"weui-cells"},[s("div",{staticClass:"weui-cell"},[s("div",{staticClass:"weui-cell__bd"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.title,expression:"title",modifiers:{trim:!0}}],staticClass:"weui-input",attrs:{type:"text",placeholder:"在此输入通知标题"},domProps:{value:e.title},on:{input:function(t){t.target.composing||(e.title=t.target.value.trim())},blur:function(t){e.$forceUpdate()}}})])]),e._v(" "),s("div",{staticClass:"weui-cell",attrs:{v:""}},[s("div",{staticClass:"weui-cell_bd"},[s("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:e.description,expression:"description",modifiers:{trim:!0}}],staticClass:"weui-textarea",attrs:{rows:"10",placeholder:"在此输入通知内容"},domProps:{value:e.description},on:{input:function(t){t.target.composing||(e.description=t.target.value.trim())},blur:function(t){e.$forceUpdate()}}}),e._v(" "),s("extra-file",{attrs:{msgType:e.msgType}})],1)]),e._v(" "),s("div",{staticClass:"weui-cell weui-cell_access",on:{click:e.routeToPersons}},[s("div",{staticClass:"weui-cell__bd"},[e._v("\n        通知人员选择\n      ")]),e._v(" "),s("div",{staticClass:"weui-cell__ft"},[e._v("\n        "+e._s(e.chosePersons.length>99?"99":e.chosePersons.length)+"\n      ")])]),e._v(" "),e._m(0)]),e._v(" "),s("a",{staticClass:"weui-btn weui-btn_primary",on:{click:e.publishMethod}},[e._v("发布")])])},n=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"weui-cell weui-cell_switch"},[s("div",{staticClass:"weui-cell__bd"},[e._v("\n        是否短信同步\n      ")]),e._v(" "),s("div",{staticClass:"weui-cell__ft"},[s("input",{staticClass:"weui-switch",attrs:{type:"checkbox"}})])])}],i={render:a,staticRenderFns:n};t.a=i},mTVx:function(e,t,s){"use strict";function a(e){s("NDNE")}var n=s("GPIM"),i=s("lL0Y"),o=s("VU/8"),r=a,l=o(n.a,i.a,r,"data-v-3f79ee0e",null);t.a=l.exports},"nA+z":function(e,t,s){"use strict";var a=s("FjHR");t.a={name:"msg-home",data:function(){return{bars:a.a.MSGHOMEBARS,activeLink:0}},methods:{}}},oOAe:function(e,t){},p18j:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},n=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"weui-search-bar",attrs:{id:"searchBar"}},[s("form",{staticClass:"weui-search-bar__form"},[s("div",{staticClass:"weui-search-bar__box"},[s("i",{staticClass:"weui-icon-search"}),e._v(" "),s("input",{staticClass:"weui-search-bar__input",attrs:{type:"search",placeholder:"搜索",id:"searchInput",required:""}}),e._v(" "),s("a",{staticClass:"weui-icon-clear",attrs:{id:"searchClear"}})]),e._v(" "),s("label",{staticClass:"weui-search-bar__label"},[s("i",{staticClass:"weui-icon-search"}),e._v(" "),s("span",[e._v("搜索")])])])])}],i={render:a,staticRenderFns:n};t.a=i},pqQu:function(e,t,s){"use strict";var a=s("yaPe"),n=s("PJFI"),i=s("93kB");t.a={name:"message-container",data:function(){return{}},components:{msgSearch:a.a,msgBanner:n.a,msgList:i.a},methods:{}}},r6xv:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div"),e._v(" "),s("ul",e._l(e.listData,function(t,a){return s("li",[s("img"),e._v(" "),e._m(0,!0)])}))])},n=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",[s("p"),e._v(" "),s("p")]),e._v(" "),s("p")])}],i={render:a,staticRenderFns:n};t.a=i},sPQq:function(e,t,s){"use strict";t.a={name:"msg-list",data:function(){return{listData:[]}},methods:{}}},vLgD:function(e,t,s){"use strict";var a=s("mvHQ"),n=s.n(a),i=s("FjHR");t.a={getData:function(e,t,s){jQuery.getJSON(e,t,s)},postData:function(e,t,s){jQuery.post(e,t,s)},getDepartList:function(e){this.postData(i.a.MAINURL,n()({cmd:"persondeparts",type:"findpage"}),function(t){console.log("获取的部门列表值："+n()(t)),0==t.RspCode&&e(t.RspData)})},getDepartPersons:function(e,t,s,a){s=s?"info":"base",void 0!==e.value&&(e=e.value),this.postData(i.a.MAINURL,n()({cmd:"departpersons",type:"findpage",colid:e,colv:t,callcol:s}),function(e){console.log("获取的部门人员列表列表值："+n()(e)),a(0==e.RspCode?e.RspData:[])})},publishMessage:function(e,t,s){var a={cmd:"msg",type:"text",touser:userids.join("|"),toparty:"",totag:"",content:t,tousername:usernames.join("|"),topartyname:"",totagname:""};this.postData(i.a.MAINURL,n()(a),function(e){console.log("发布消息返回的值："+n()(e)),s(e)})},postMessage:function(e,t,s){var a=e.map(function(e){return e.userid}),o=e.map(function(e){return e.name}),r={cmd:"msg",touser:a.join("|"),toparty:"",totag:"",safe:0,tousername:o.join("|"),topartyname:"",totagname:""};jQuery.extend(r,t),console.log("发布信息传递的值："+n()(r)),this.postData(i.a.MAINURL,n()(r),function(e){console.log("发布消息返回的值："+n()(e)),s(e)})}}},xJD8:function(e,t,s){"use strict";t.a={name:"app"}},yaPe:function(e,t,s){"use strict";function a(e){s("eQSN")}var n=s("6jvF"),i=s("p18j"),o=s("VU/8"),r=a,l=o(n.a,i.a,r,null,null);t.a=l.exports},yrVV:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.55afed542fd75d377984.js.map