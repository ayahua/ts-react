(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(e,t,n){e.exports={section:"_36ubK"}},31:function(e,t,n){},54:function(e,t,n){"use strict";n.r(t);function a(e){var t=e.children;return c.a.createElement(c.a.Fragment,null,t)}var r=n(0),c=n.n(r),o=n(23),s=n.n(o),u=n(10),l=n(1);n(31);a.defaultProps={};var i=a,p=n(24),m={401:"需要登录",403:"用户没有权限",404:"请求地址有误",500:"服务器错误",502:"网关错误"};function f(e){console.log("network error! ".concat(e))}function d(e){return e}function E(e){throw e}function h(e){var t=e.data,n=t.data,a=t.success,r=t.msg,c=void 0===r?null:r,o=t.code,s=void 0===o?null:o;if(!a)throw f("403"===s?"请登录":c),{message:c,code:s};return n}function w(e){throw"ECONNABORTED"===e.code&&f("请求超时"),e.response?(401===e.response.status&&f("请登录"),f(m[e.response.status])):f(e.message),e}function v(){var e=Object(l.f)();return Object(r.useEffect)(function(){var e;e={data:123},k.post("/testReq",e)},[]),c.a.createElement("section",null,"React Home",c.a.createElement("button",{onClick:function(){e.push("/result")}},"go result"))}function b(){return c.a.createElement("section",null,"React Result")}var g,R,k=(g="/",(R=n.n(p).a.create({baseURL:g,timeout:12e4,headers:{Accept:"*/*"},withCredentials:!0})).interceptors.request.use(d,E),R.interceptors.response.use(h,w),R),O=n(26),C=n.n(O);s.a.render(c.a.createElement(i,null,c.a.createElement("section",{className:C.a.section},"hello typescript react !!!"),c.a.createElement(u.a,null,c.a.createElement(l.c,null,c.a.createElement(l.a,{exact:!0,path:"/",component:v}),c.a.createElement(l.a,{path:"/result",component:b})))),document.getElementById("react-root"))}},[[54,1,2]]]);
//# sourceMappingURL=main.js.map