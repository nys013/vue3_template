import{D as U,d as $,n as d,J as B,q as X,z as D,r,K as Y,o as w,c as Z,e,w as l,g as y,k as v,j as ee,b as T,i as x,L as M,M as ae,E as c,I as te,_ as le}from"./index-HRP16b-e.js";const oe=(n,p)=>U.get(`/admin/product/baseTrademark/${n}/${p}`),re=n=>n.id?U.put("/admin/product/baseTrademark/update",n):U.post("/admin/product/baseTrademark/save",n),se=n=>U.delete(`/admin/product/baseTrademark/remove/${n}`),ne={class:"btn-wrapper"},de={class:"image-slot"},ie={class:"image-slot"},ue={class:"dialog-footer"},ce=$({name:"TradeMark"}),pe=$({...ce,setup(n){const p=d(!1),z=d([]),i=d(1),m=d(3),V=d(0),f=async()=>{p.value=!0;const t=await oe(i.value,m.value);V.value=t.data.total,m.value=t.data.size,i.value=t.data.current,z.value=t.data.records||[],p.value=!1};B(m,()=>{i.value!==1?i.value=1:f()}),B(i,()=>{f()}),X(()=>{f()});const _=d(),s=D({tmName:"",logoUrl:""});let b=d("");const u=d(!1),E=()=>{_.value.resetFields(),_.value.clearValidate()},O=()=>{u.value=!0,b.value="添加"},j=t=>{u.value=!0,s.logoUrl=t.logoUrl,s.tmName=t.tmName,s.id=t.id,b.value="修改"},P=D({tmName:[{required:!0,message:"请输入品牌名称",trigger:"blur"}],logoUrl:[{required:!0,message:"请上传品牌图片",trigger:"blur"}]}),q=t=>{s.logoUrl=t.data,_.value.clearValidate("logoUrl")},A=t=>{if(["image/jpeg","image/png","image/jpg"].includes(t.type)){if(t.size/1024/1024>2)return c.error("上传图片大小不能超过2MB!"),!1}else return c.error("上传图片格式错误"),!1;return!0},I=async()=>{await _.value.validate();try{const t=await re(s);t.code===200?(c.success(b.value+"成功"),u.value=!1,f()):c.error(t.data)}catch{}},L=t=>{t.id&&te.confirm("确定删除该品牌?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{try{(await se(t.id)).code===200?(c.success("删除成功"),f()):c.error("删除失败")}catch{}})};return(t,a)=>{const g=r("el-button"),k=r("el-table-column"),C=r("el-icon"),N=r("el-image"),S=r("el-table"),G=r("el-pagination"),R=r("el-card"),J=r("el-input"),h=r("el-form-item"),K=r("el-upload"),F=r("el-form"),H=r("el-dialog"),Q=Y("loading");return w(),Z("div",null,[e(R,{class:"box-card"},{default:l(()=>[y("div",ne,[e(g,{size:"small",type:"primary",onClick:O},{default:l(()=>a[5]||(a[5]=[v("+添加品牌")])),_:1})]),ee((w(),T(S,{data:z.value,border:"",style:{width:"100%"}},{default:l(()=>[e(k,{type:"index",label:"序号",width:"80"}),e(k,{prop:"tmName",label:"品牌名称",width:"180"}),e(k,{prop:"logo",label:"品牌LOGO"},{default:l(o=>[e(N,{src:o.row.logoUrl,style:{width:"80px",height:"80px"}},{error:l(()=>[y("div",de,[e(C,null,{default:l(()=>[e(x(M))]),_:1})])]),_:2},1032,["src"])]),_:1}),e(k,{fixed:"right",prop:"operation",label:"操作",width:"200"},{default:l(o=>[e(g,{size:"small",type:"warning",onClick:W=>j(o.row)},{default:l(()=>a[6]||(a[6]=[v("编辑")])),_:2},1032,["onClick"]),e(g,{size:"small",type:"danger",onClick:W=>L(o.row)},{default:l(()=>a[7]||(a[7]=[v("删除")])),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[Q,p.value]]),e(G,{class:"pagination-wrapper","current-page":i.value,"onUpdate:currentPage":a[0]||(a[0]=o=>i.value=o),"page-size":m.value,"onUpdate:pageSize":a[1]||(a[1]=o=>m.value=o),background:"",layout:"prev, pager, next, jumper, ->, sizes, total","page-sizes":[3,5,10,30],total:V.value},null,8,["current-page","page-size","total"])]),_:1}),e(H,{modelValue:u.value,"onUpdate:modelValue":a[4]||(a[4]=o=>u.value=o),title:x(b)+"品牌",width:"50%","show-close":!1,onClose:E},{footer:l(()=>[y("span",ue,[e(g,{onClick:a[3]||(a[3]=o=>u.value=!1)},{default:l(()=>a[8]||(a[8]=[v("关闭")])),_:1}),e(g,{type:"primary",onClick:I},{default:l(()=>a[9]||(a[9]=[v(" 确认 ")])),_:1})])]),default:l(()=>[e(F,{ref_key:"formRef",ref:_,model:s,rules:P,"label-width":"100px","status-icon":"",class:"form-wrapper"},{default:l(()=>[e(h,{label:"品牌名称",prop:"tmName"},{default:l(()=>[e(J,{modelValue:s.tmName,"onUpdate:modelValue":a[2]||(a[2]=o=>s.tmName=o)},null,8,["modelValue"])]),_:1}),e(h,{label:"品牌LOGO",prop:"logoUrl"},{default:l(()=>[e(K,{class:"avatar-uploader",action:"api/admin/product/fileUpload","show-file-list":!1,"on-success":q,"before-upload":A},{default:l(()=>[s.logoUrl?(w(),T(N,{key:0,src:s.logoUrl,class:"avatar"},{error:l(()=>[y("div",ie,[e(C,null,{default:l(()=>[e(x(M))]),_:1})])]),_:1},8,["src"])):(w(),T(C,{key:1,class:"avatar-uploader-icon"},{default:l(()=>[e(x(ae))]),_:1}))]),_:1})]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue","title"])])}}}),fe=le(pe,[["__scopeId","data-v-008f2eb5"]]);export{fe as default};
