webpackJsonp([1],{"1Bnj":function(e,t,n){e.exports=n.p+"static/img/user.83d9cc8.jpg"},"4KkX":function(e,t){},Zpla:function(e,t){},lO7g:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={data:function(){return{}},computed:{userName:function(){return localStorage.getItem("userName")}},methods:{handleCommand:function(e){"logout"==e&&(localStorage.removeItem("userName"),this.$router.push("/"))}}},s={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"header"},[n("div",{staticClass:"logo"},[e._v("Ccmusic")]),e._v(" "),n("div",{staticClass:"header-right"},[e._m(0),e._v(" "),n("el-dropdown",{staticClass:"user-name",attrs:{trigger:"click"},on:{command:e.handleCommand}},[n("span",{staticClass:"el-dropdown-link"},[e._v("\n                "+e._s(e.userName)+"\n                "),n("i",{staticClass:"el-icon-caret-bottom"})]),e._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{attrs:{command:"logout"}},[e._v("退出登录")])],1)],1)],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"user-avatar"},[t("img",{attrs:{src:n("1Bnj")}})])}]};var r={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"sidebar"},[n("el-menu",{staticClass:"sidebar-el-menue",attrs:{"default-active":e.onRoutes,collapse:e.collapse,"background-color":"#334256","active-text-color":"#20a0ff","text-color":"#ffffff",router:""}},[e._l(e.items,function(t){return[[n("el-menu-item",{key:t.index,attrs:{index:t.index}},[n("i",{class:t.icon}),e._v("\n                  "+e._s(t.title)+"\n              ")])]]})],2)],1)},staticRenderFns:[]};var a={components:{TheHeader:n("VU/8")(o,s,!1,function(e){n("4KkX")},"data-v-2e9708cb",null).exports,TheAside:n("VU/8")({data:function(){return{collapse:!1,items:[{icon:"el-icon-document",index:"Index",title:"系统首页"},{icon:"el-icon-document",index:"Consumer",title:"用户管理"},{icon:"el-icon-document",index:"Singer",title:"歌手管理"},{icon:"el-icon-document",index:"SongSheet",title:"歌单管理"}]}},computed:{onRoutes:function(){return this.$route.path.replace("/","")}}},r,!1,function(e){n("Zpla")},"data-v-23d40b62",null).exports}},i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("the-header"),this._v(" "),t("the-aside"),this._v(" "),t("div",{staticClass:"content-box"},[t("router-view")],1)],1)},staticRenderFns:[]},c=n("VU/8")(a,i,!1,null,null,null);t.default=c.exports}});
//# sourceMappingURL=1.465126fa1990dad4ee88.js.map