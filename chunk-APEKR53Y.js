import{c as h}from"./chunk-I2SWCO7U.js";import{$ as d,C as r,P as o,Q as a,T as c,V as l,W as m,_ as p,ea as u,ga as f,ha as C,ka as v,oa as g,pa as b}from"./chunk-4WTJQ336.js";function y(s,t){if(s&1&&(p(0,"div",1),f(1),d()),s&2){let n=u();c("ngClass",n.alert.cssClass),o(1),C(n.alert.message)}}var M=(()=>{let t=class t{constructor(e){this.alertService=e}ngOnInit(){this.subscription=this.alertService.onAlert().subscribe(e=>{switch(e?.type){case"success":e.cssClass="alert alert-success";break;case"error":e.cssClass="alert alert-danger";break}this.alert=e})}ngOnDestroy(){this.subscription.unsubscribe()}};t.\u0275fac=function(i){return new(i||t)(a(h))},t.\u0275cmp=r({type:t,selectors:[["alert"]],standalone:!0,features:[v],decls:1,vars:1,consts:[["class","mt-4",3,"ngClass"],[1,"mt-4",3,"ngClass"]],template:function(i,x){i&1&&l(0,y,2,2,"div",0),i&2&&m(0,x.alert?0:-1)},dependencies:[b,g]});let s=t;return s})();export{M as a};