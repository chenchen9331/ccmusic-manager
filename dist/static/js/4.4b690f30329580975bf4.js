webpackJsonp([4],{P7ryO:function(e,r,s){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=s("is1l"),t=s("gyMJ"),a={mixins:[o.a],data:function(){return{roleForm:{username:"admin",password:"admin"},rules:{username:{required:!0,message:"请输入用户名",trigger:"blur"},password:{required:!0,message:"请输入密码",trigger:"blur"}}}},methods:{loginForm:function(){var e=this,r=new URLSearchParams;r.append("username",this.roleForm.username),r.append("password",this.roleForm.password),Object(t.t)(r).then(function(r){2e4==r.code?(e.$router.push("/Index"),localStorage.setItem("userName",e.roleForm.username),e.notify("登录成功","success")):e.notify(r.message,"error")})}}},n={render:function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",{staticClass:"login-wrap"},[s("div",{staticClass:"ms-title"},[e._v("Ccmusic 后台管理登录")]),e._v(" "),s("div",{staticClass:"ms-login"},[s("el-form",{ref:"roleForm",attrs:{model:e.roleForm,rules:e.rules}},[s("el-form-item",{attrs:{prop:"username"}},[s("el-input",{attrs:{placeholder:"用户名"},model:{value:e.roleForm.username,callback:function(r){e.$set(e.roleForm,"username",r)},expression:"roleForm.username"}})],1),e._v(" "),s("el-form-item",{attrs:{prop:"password"}},[s("el-input",{attrs:{type:"password",placeholder:"密码"},model:{value:e.roleForm.password,callback:function(r){e.$set(e.roleForm,"password",r)},expression:"roleForm.password"}})],1),e._v(" "),s("div",{staticClass:"login-btn"},[s("el-button",{attrs:{type:"primary"},on:{click:e.loginForm}},[e._v("登录")])],1)],1)],1)])},staticRenderFns:[]};var l=s("VU/8")(a,n,!1,function(e){s("k13v")},"data-v-e9a1af5c",null);r.default=l.exports},k13v:function(e,r){}});
//# sourceMappingURL=4.4b690f30329580975bf4.js.map