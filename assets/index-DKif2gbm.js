import{d as m,z as V,m as g,l as v,n as k,o as C,c as B,g as i,e as o,w as s,r as l,i as p,A as N,B as U,k as b,C as f,_ as z}from"./index-HRP16b-e.js";const E={class:"login-wrapper"},I={class:"form-wrapper"},L=m({name:"Login"}),R=m({...L,setup(S){const t=V({username:"admin",password:"111111"}),c=g(),_=v(),a=k(!1),w=async()=>{try{a.value=!0,await c.loginRequest(t)&&(_.push("/"),f({title:"登陆成功！",type:"success"}))}catch(n){f({title:n,type:"error"})}finally{a.value=!1}};return(n,e)=>{const d=l("el-input"),r=l("el-form-item"),x=l("el-button"),y=l("el-form");return C(),B("div",E,[i("div",I,[e[3]||(e[3]=i("h1",null,"HI~",-1)),e[4]||(e[4]=i("h2",null,"欢迎来到登陆页面",-1)),o(y,{model:t,class:"form"},{default:s(()=>[o(r,null,{default:s(()=>[o(d,{modelValue:t.username,"onUpdate:modelValue":e[0]||(e[0]=u=>t.username=u),"prefix-icon":p(N)},null,8,["modelValue","prefix-icon"])]),_:1}),o(r,null,{default:s(()=>[o(d,{modelValue:t.password,"onUpdate:modelValue":e[1]||(e[1]=u=>t.password=u),"prefix-icon":p(U),type:"password","show-password":""},null,8,["modelValue","prefix-icon"])]),_:1}),o(r,null,{default:s(()=>[o(x,{type:"primary",size:"default",onClick:w,style:{width:"100%"},loading:a.value},{default:s(()=>e[2]||(e[2]=[b(" 登陆 ")])),_:1},8,["loading"])]),_:1})]),_:1},8,["model"])])])}}}),q=z(R,[["__scopeId","data-v-faef4584"]]);export{q as default};
