import{_ as k,u as B,b as d,f as F,N as w,E as R,V as W,g as L,o as a,c as r,a as t,O as P,U,n as A,t as n,P as K,F as D,r as G,v as p,q as V,j as b,e as q,A as X,i as T,s as E,k as Y}from"./index-0a08cbe1.js";import{u as j,a as x,b as H,c as Z}from"./index.esm-5e993b4e.js";import{a as $,E as ee}from"./ElementRestor-3c5acbda.js";import{L as te}from"./LoginPasswordForm-4c3daf89.js";const oe={name:"ProfileInfo",props:["infoProfile"],setup(o){const l=B(),s=d(),e=d(),u=d(o.infoProfile.locale),{isSubmitting:m,handleSubmit:i}=j({initialValues:{nameProfile:o.infoProfile.name}}),{value:c,errorMessage:_,handleBlur:f}=x("nameProfile",H().trim().required("Введите имя")),h=i(async v=>{const g={bill:Number(o.infoProfile.bill),debit:Number(o.infoProfile.debit),credit:Number(o.infoProfile.credit),name:v.nameProfile,role:o.infoProfile.role,locale:u.value};await l.dispatch("requests/updateInfo",g)});return F(()=>{w.updateTextFields(),s.value=w.FormSelect.init(e.value)}),R(()=>{s.value&&s.value.destroy&&s.value.destroy()}),{nValue:c,nError:_,nBlur:f,isSubmitting:m,onSubmit:h,selectCategory:e,localeFlag:W,locale:u,getLocalizedText:L}}},ie={class:"col s12 m12"},le={class:"card-content"},ne={class:"input-field"},ae={for:"nameProfile"},se={class:"input-field",id:"locale"},de=["value"],re=["disabled"],ce=t("i",{class:"material-icons right"},"send",-1);function ue(o,l,s,e,u,m){return a(),r("div",ie,[t("form",{onSubmit:l[3]||(l[3]=V((...i)=>e.onSubmit&&e.onSubmit(...i),["prevent"]))},[t("div",le,[t("div",ne,[P(t("input",{id:"nameProfile",type:"text","onUpdate:modelValue":l[0]||(l[0]=i=>e.nValue=i),class:A({invalid:e.nError}),onBlur:l[1]||(l[1]=(...i)=>e.nBlur&&e.nBlur(...i))},null,34),[[U,e.nValue]]),t("label",ae,n(e.getLocalizedText("name")),1),t("span",{class:A(["helper-text",{invalid:e.nError}])},n(e.nError),3)]),t("div",se,[P(t("select",{ref:"selectCategory","onUpdate:modelValue":l[2]||(l[2]=i=>e.locale=i)},[(a(!0),r(D,null,G(e.localeFlag,i=>(a(),r("option",{key:i.flag,value:i.flag},n(i.value),9,de))),128))],512),[[K,e.locale]]),t("label",null,n(e.getLocalizedText("localeSite")),1)]),t("button",{class:"btn waves-effect waves-light",type:"submit",disabled:e.isSubmitting},[p(n(e.getLocalizedText("refresh"))+" ",1),ce],8,re)])],32)])}const me=k(oe,[["render",ue]]);function he(o,{emit:l}){const{isSubmitting:e,handleSubmit:u}=j(),m=B(),i=d(),c=d(),_=d(),{value:f,errorMessage:h,handleBlur:v}=x("nameCard",H().trim().required(L("EnterCategoryName"))),{value:g,errorMessage:y,handleBlur:S}=x("limitCard",Z().required(L("EnterLimit")).min(5e3,`${L("LimitCannotBeLess")} 5000.`));g.value=5e3;const z=u(async(M,{resetForm:I})=>{try{await m.dispatch("card/create",{title:M.nameCard,limit:M.limitCard,bill:M.limitCard,isDetected:!1,type:_.value}),I(),g.value=5e3,l("created")}catch{}});return F(()=>{w.updateTextFields(),c.value=w.FormSelect.init(i.value)}),R(()=>{c.value&&c.value.destroy&&c.value.destroy()}),{isSubmitting:e,nValue:f,nError:h,nBlur:v,lValue:g,lError:y,lBlur:S,onSubmit:z,selectCard:i,current:_,getLocalizedText:L}}const ge={name:"CardCreate",emits:["created"],setup(o,{emit:l}){return{...he(o,{emit:l})}}},_e={class:"col s12 m12"},fe={class:"input-field"},ve={value:"",disabled:"",selected:""},pe={value:"debit"},be={value:"credit"},Le={value:"cash"},ye={class:"input-field"},Ce={for:"nameCard"},Te={class:"input-field"},Me={for:"limitCard"},Ee={class:"input-field"},Ae=["disabled"],Pe=t("i",{class:"material-icons right"},"send",-1);function we(o,l,s,e,u,m){return a(),r("div",_e,[t("form",{onSubmit:l[5]||(l[5]=V((...i)=>o.onSubmit&&o.onSubmit(...i),["prevent"]))},[t("div",fe,[P(t("select",{ref:"selectCard","onUpdate:modelValue":l[0]||(l[0]=i=>o.current=i),required:""},[t("option",ve,n(o.getLocalizedText("ChooseCardType")),1),t("option",pe,n(o.getLocalizedText("Debits")),1),t("option",be,n(o.getLocalizedText("Credits")),1),t("option",Le,n(o.getLocalizedText("Сash")),1)],512),[[K,o.current]])]),t("div",ye,[P(t("input",{id:"nameCard",type:"text","onUpdate:modelValue":l[1]||(l[1]=i=>o.nValue=i),class:A({invalid:o.nError}),onBlur:l[2]||(l[2]=(...i)=>o.nBlur&&o.nBlur(...i))},null,34),[[U,o.nValue]]),t("label",Ce,n(o.getLocalizedText("NameRecord")),1),t("span",{class:A(["helper-text",{invalid:o.nError}])},n(o.nError),3)]),t("div",Te,[P(t("input",{id:"limitCard",type:"number","onUpdate:modelValue":l[3]||(l[3]=i=>o.lValue=i),class:A({invalid:o.lError}),onBlur:l[4]||(l[4]=(...i)=>o.lBlur&&o.lBlur(...i))},null,34),[[U,o.lValue]]),t("label",Me,n(o.getLocalizedText("limit")),1),t("span",{class:A(["helper-text",{invalid:o.lError}])},n(o.lError),3)]),t("div",Ee,[t("button",{class:"btn waves-effect waves-light",type:"submit",disabled:o.isSubmitting},[p(n(o.getLocalizedText("Create"))+" ",1),Pe],8,Ae)])],32)])}const Se=k(ge,[["render",we]]),ze={name:"ActiveMethodAuth",props:["loginMetod"],emits:["updated"],setup(o,{emit:l}){const s=B(),e=async m=>{await s.dispatch("auth/unMethodAuth",m),l("updated")},u={"google.com":"Google",password:L("LoginPass")};return{unlinkAuth:e,authTitle:u,getLocalizedText:L}}},Ie={class:"striped highlight centered teal lighten-4",ref:"cardTableRef"},ke={key:0},Be={key:0},Ve={key:0},Ne=["onClick"],Ue=t("i",{class:"material-icons"},"open_in_new",-1),xe=[Ue];function Fe(o,l,s,e,u,m){return a(),r("table",Ie,[s.loginMetod?(a(),r("thead",ke,[t("tr",null,[t("th",null,n(e.getLocalizedText("Type")),1),t("th",null,n(e.getLocalizedText("Account")),1),s.loginMetod.length>1?(a(),r("th",Be,n(e.getLocalizedText("TurnOff")),1)):b("",!0)])])):b("",!0),t("tbody",null,[(a(!0),r(D,null,G(s.loginMetod,i=>(a(),r("tr",{key:i.providerId},[t("td",null,n(e.authTitle[i.providerId]),1),t("td",null,n(i.email),1),s.loginMetod.length>1?(a(),r("td",Ve,[t("a",{href:"#",class:"btn-small btn",onClick:V(c=>e.unlinkAuth(i.providerId),["prevent"])},xe,8,Ne)])):b("",!0)]))),128))])],512)}const Re=k(ze,[["render",Fe]]),Oe={name:"ProfileView",setup(){const o=B(),l=o.getters["requests/clientInfo"],s=d(0),e="card",u="auth/addLoginPass",m="addLoginPass",i="AddLoginPassword",c=d(),_=d(),f=d(),h=d(),v=d(0),g=d(),y=d(!0),S=d([]),z=d([]);async function M(){c.value=await o.dispatch("auth/verificationMethods"),_.value=c.value.find(C=>C.providerId==="password"),g.value=c.value.find(C=>C.providerId==="google.com")}async function I(){const C=await o.getters["card/list"];C.length&&(z.value=C.filter(N=>N.isDetected===!1),S.value=C.filter(N=>N.isDetected===!0))}const O=async()=>{await I(),s.value++},J=async()=>{await M(),v.value++};F(async()=>{y.value=!0,await M(),await I(),setTimeout(()=>{h.value=w.Collapsible.init(f.value)},0),y.value=!1}),R(()=>{h.value&&h.value.destroy&&h.value.destroy()});const Q=async()=>{await o.dispatch("auth/googleAddAuth")};return{getLocalizedText:L,infoProfile:l,update:O,updateKey:q(()=>s.value),updateKeyAuth:q(()=>v.value),updateCount:s,dispatchOnSubmitElement:e,dispatchOnSubmitLogin:u,ButtonLogin:m,titleLogin:i,passwordMetod:_,loginMetod:c,collapsibleRef:f,updateAuth:J,googleAuth:Q,googleMethod:g,cardListEdit:z,loading:y,cardListRestore:S}},components:{ProfileInfo:me,CardCreate:Se,ElementRestor:$,ElementEdit:ee,LoginPasswordForm:te,ActiveMethodAuth:Re,AppLoading:X}},qe={class:"page-title"},Ke={key:1},De={class:"collapsible",ref:"collapsibleRef"},Ge={class:"collapsible-header"},je=t("i",{class:"material-icons"},"account_circle",-1),He={class:"collapsible-body"},Je={class:"collapsible-header"},Qe=t("i",{class:"material-icons"},"login",-1),We={class:"collapsible-body"},Xe={key:0},Ye={class:"collapsible-header"},Ze=t("i",{class:"material-icons"},"rule_folder",-1),$e={class:"collapsible-body"},et={class:"btn"},tt={class:"collapsible-header"},ot=t("i",{class:"material-icons"},"credit_card",-1),it={class:"collapsible-body"},lt={class:"collapsible-header"},nt=t("i",{class:"material-icons"},"redeem",-1),at={class:"collapsible-body"},st={key:0},dt={class:"collapsible-header"},rt=t("i",{class:"material-icons"},"credit_score",-1),ct={class:"collapsible-body"},ut={key:0};function mt(o,l,s,e,u,m){const i=T("AppLoading"),c=T("ProfileInfo"),_=T("ActiveMethodAuth"),f=T("LoginPasswordForm"),h=T("CardCreate"),v=T("ElementEdit"),g=T("ElementRestor");return a(),r("div",null,[t("div",qe,[t("h3",null,n(e.getLocalizedText("profile-title")),1)]),e.loading?(a(),E(i,{key:0})):(a(),r("section",Ke,[t("ul",De,[t("li",null,[t("div",Ge,[je,p(n(e.getLocalizedText("profile-title")),1)]),t("div",He,[Y(c,{infoProfile:e.infoProfile},null,8,["infoProfile"])])]),t("li",null,[t("div",Je,[Qe,p(n(e.getLocalizedText("ActivatedAuthorizationMethods")),1)]),t("div",We,[(a(),E(_,{key:e.updateKeyAuth,loginMetod:e.loginMetod,onUpdated:e.updateAuth},null,8,["loginMetod","onUpdated"]))])]),!e.passwordMetod||!e.googleMethod?(a(),r("li",Xe,[t("div",Ye,[Ze,p(n(e.getLocalizedText("AddendumMethod")),1)]),t("div",$e,[e.passwordMetod?b("",!0):(a(),E(f,{key:e.updateKeyAuth,onUpdated:e.updateAuth,dispatchOnSubmitLogin:e.dispatchOnSubmitLogin,ButtonLogin:e.ButtonLogin,titleLogin:e.titleLogin},null,8,["onUpdated","dispatchOnSubmitLogin","ButtonLogin","titleLogin"])),e.googleMethod?b("",!0):(a(),r("form",{key:1,action:"",onClick:l[0]||(l[0]=V((...y)=>e.googleAuth&&e.googleAuth(...y),["prevent"]))},[t("button",et,n(e.getLocalizedText("AddGoogle")),1)]))])])):b("",!0),t("li",null,[t("div",tt,[ot,p(n(e.getLocalizedText("CreateCard")),1)]),t("div",it,[(a(),E(h,{key:e.updateKey,onCreated:e.update},null,8,["onCreated"]))])]),t("li",null,[t("div",lt,[nt,p(n(e.getLocalizedText("EditCard")),1)]),t("div",at,[e.cardListEdit.length?b("",!0):(a(),r("p",st,n(e.getLocalizedText("NoElementsToEdit")),1)),(a(),E(v,{key:e.updateKey,onUpdated:e.update,dispash:e.dispatchOnSubmitElement},null,8,["onUpdated","dispash"]))])]),t("li",null,[t("div",dt,[rt,p(n(e.getLocalizedText("RestoreCard")),1)]),t("div",ct,[e.cardListRestore.length?b("",!0):(a(),r("p",ut,n(e.getLocalizedText("NoElementsToRestor")),1)),(a(),E(g,{key:e.updateKey,dispash:e.dispatchOnSubmitElement,onUpdated:e.update},null,8,["dispash","onUpdated"]))])])],512)]))])}const vt=k(Oe,[["render",mt]]);export{vt as default};
