import{d as m,r as o,o as l,c as f,a as R,F as y,b as u,w as t,e,f as g,g as i,t as w,h as T,u as D,T as K,i as S,_ as C,j as O,k as V,v as Q,l as W,m as I,n as $,E as X,p as L}from"./index-BGduB5Uj.js";const Y={name:"CustomMenu"},Z=m({...Y,props:{menuList:{type:Array,default:()=>[]}},setup(h){return(p,a)=>{const d=o("el-icon"),_=o("el-menu-item"),c=o("CustomMenu"),b=o("el-sub-menu");return l(!0),f(y,null,R(h.menuList,n=>(l(),f(y,null,[n.meta&&n.meta.hidden?T("",!0):(l(),f(y,{key:0},[!n.children||!n.children.length?(l(),u(_,{index:n.path,key:n.name,route:n.path},{default:t(()=>{var r;return[e(d,null,{default:t(()=>{var s;return[(l(),u(g((s=n.meta)==null?void 0:s.icon)))]}),_:2},1024),i("span",null,w((r=n.meta)==null?void 0:r.title),1)]}),_:2},1032,["index","route"])):n.name==="layout"?(l(),u(_,{index:n.children[0].path,key:n.children[0].name,route:n.children[0].path},{default:t(()=>{var r;return[e(d,null,{default:t(()=>{var s;return[(l(),u(g((s=n.children[0].meta)==null?void 0:s.icon)))]}),_:2},1024),i("span",null,w((r=n.children[0].meta)==null?void 0:r.title),1)]}),_:2},1032,["index","route"])):n.children&&n.children.length?(l(),u(b,{index:n.path,key:n.name},{title:t(()=>{var r;return[e(d,null,{default:t(()=>{var s;return[(l(),u(g((s=n.meta)==null?void 0:s.icon)))]}),_:2},1024),i("span",null,w((r=n.meta)==null?void 0:r.title),1)]}),default:t(()=>[e(c,{menuList:n.children},null,8,["menuList"])]),_:2},1032,["index"])):T("",!0)],64))],64))),256)}}}),ee=m({name:"Main"}),ne=m({...ee,setup(h){const p=D();return(a,d)=>{const _=o("router-view");return l(),f("div",null,[e(_,null,{default:t(({Component:c})=>[e(K,{name:"fade"},{default:t(()=>[(l(),u(g(c),{key:S(p).refresh}))]),_:2},1024)]),_:1})])}}}),te=C(ne,[["__scopeId","data-v-5ae3dc15"]]),oe={};function le(h,p){const a=o("el-icon"),d=o("el-breadcrumb-item"),_=o("el-breadcrumb");return l(),u(_,{"separator-icon":"ArrowRight"},{default:t(()=>[(l(!0),f(y,null,R(h.$route.matched,c=>O((l(),u(d,{key:c.path,to:c.path},{default:t(()=>[e(a,null,{default:t(()=>[(l(),u(g(c.meta.icon)))]),_:2},1024),V(" "+w(c.meta.title),1)]),_:2},1032,["to"])),[[Q,c.name!=="layout"]])),128))]),_:1})}const ae=C(oe,[["render",le]]),se=["src"],ce={class:"el-dropdown-link"},re=m({name:"Setting"}),ue=m({...re,setup(h){const p=W(),a=I(),d=D(),_=()=>{d.refresh++},c=()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()},b=async()=>{await a.logout()&&(p.push("/login"),X.success("退出登陆成功"))},n=$(!1),r=$(!1),s=document.documentElement,E=k=>{k?s.classList.add("dark"):s.classList.remove("dark")},M=$("#409eff"),N=k=>{getComputedStyle(s).getPropertyValue("--el-color-primary"),s.style.setProperty("--el-color-primary",k)};return(k,v)=>{const F=o("el-button"),U=o("el-switch"),B=o("el-form-item"),A=o("el-color-picker"),P=o("el-form"),j=o("el-popover"),q=o("arrow-down"),z=o("el-icon"),G=o("el-dropdown-item"),H=o("el-dropdown-menu"),J=o("el-dropdown");return l(),f(y,null,[e(F,{icon:"Refresh",circle:"",onClick:_}),e(F,{icon:"FullScreen",circle:"",onClick:c}),e(j,{visible:n.value,placement:"top-start",title:"主题设置",width:300},{reference:t(()=>[e(F,{icon:"Setting",circle:"",onClick:v[2]||(v[2]=x=>n.value=!n.value)})]),default:t(()=>[e(P,{"label-width":"70px"},{default:t(()=>[e(B,{label:"暗黑模式"},{default:t(()=>[e(U,{modelValue:r.value,"onUpdate:modelValue":v[0]||(v[0]=x=>r.value=x),"inline-prompt":"","active-icon":"Moon","inactive-icon":"Sunny",onChange:E},null,8,["modelValue"])]),_:1}),e(B,{label:"主题颜色"},{default:t(()=>[e(A,{modelValue:M.value,"onUpdate:modelValue":v[1]||(v[1]=x=>M.value=x),onChange:N},null,8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["visible"]),i("img",{src:S(a).avatar,alt:"avatar",class:"admin-avatar"},null,8,se),e(J,{class:"admin-name",onCommand:b},{dropdown:t(()=>[e(H,null,{default:t(()=>[e(G,null,{default:t(()=>[V("退出登陆")]),_:1})]),_:1})]),default:t(()=>[i("span",ce,[V(w(S(a).username)+" ",1),e(z,{class:"el-icon--right"},{default:t(()=>[e(q)]),_:1})])]),_:1})],64)}}}),_e=C(ue,[["__scopeId","data-v-8603d3a0"]]),de={class:"tab-bar-wrapper"},ie={class:"tab-bar-left"},me={class:"tab-bar-right"},pe=m({name:"TabBar"}),fe=m({...pe,setup(h){return(p,a)=>(l(),f("div",de,[i("div",ie,[e(ae)]),i("div",me,[e(_e)])]))}}),he=C(fe,[["__scopeId","data-v-f4f22ca1"]]),ve={class:"layout-wrapper"},be=m({name:"Layout"}),ke=m({...be,setup(h){const p=I(),a=$(!1);return(d,_)=>{const c=o("el-menu"),b=o("el-scrollbar"),n=o("Fold"),r=o("Expand"),s=o("el-icon");return l(),f("div",ve,[i("div",{class:L(["layout-slider",{isFold:a.value}])},[e(b,{class:"slider-scrollbar"},{default:t(()=>[e(c,{"active-text-color":"#ffd04b","background-color":"#001529",class:"el-menu-vertical","text-color":"#fff",router:"",collapse:a.value,"default-active":d.$route.path},{default:t(()=>[e(Z,{menuList:S(p).menuRoutes},null,8,["menuList"])]),_:1},8,["collapse","default-active"])]),_:1}),e(s,{class:"fold-icon",onClick:_[0]||(_[0]=E=>a.value=!a.value)},{default:t(()=>[a.value?(l(),u(r,{key:1})):(l(),u(n,{key:0}))]),_:1})],2),i("div",{class:L(["layout-top",{isFold:a.value}])},[e(he)],2),i("div",{class:L(["layout-content",{isFold:a.value}])},[e(te)],2)])}}}),ge=C(ke,[["__scopeId","data-v-34fd1b06"]]);export{ge as default};