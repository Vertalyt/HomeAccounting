import{u as C,a as b,b as f}from"./index.esm-d4de9650.js";import{K as q,u as z,g as i,_ as N,i as P,o as u,c as m,a as s,t as o,j as L,O as S,U as w,n,y as p,k as M,l as F,q as U}from"./index-7e1ad37d.js";function $(e,t){const a=q(),c=z(),l=6,{isSubmitting:g,handleSubmit:d}=C(),{value:r,errorMessage:B,handleBlur:v}=b("email",f().trim().required(i("EnterEmail")).email(i("MustBeValidEmail"))),{value:E,errorMessage:y,handleBlur:V}=b("password",f().trim().required(i("EnterPassword")).min(l,`${i("PasswordCannotBeSmaller")} ${l} ${i("Symbols")}.`)),k=d(async(h,{resetForm:T})=>{try{await c.dispatch(e.dispatchOnSubmitLogin,{email:h.email,password:h.password}),t("updated"),e.registerCheck&&a.push("/"),T()}catch{}});return{eValue:r,eError:B,eBlur:v,pValue:E,pError:y,pBlur:V,isSubmitting:g,onSubmit:k,getLocalizedText:i}}const O={name:"LoginPasswordForm",emits:["updated"],props:{dispatchOnSubmitLogin:{type:String,requared:!0},registerCheck:{type:Boolean,requared:!1},titleLogin:{type:String,requared:!1},ButtonLogin:{type:String,requared:!0}},setup(e,{emit:t}){return{...$(e,t)}}},R={class:"card-content"},A={key:0,class:"card-title"},D={class:"input-field"},_=s("label",{for:"email"},"Email",-1),j={class:"'input-field"},G={for:"password"},H={class:"card-action"},I=["disabled"],K=s("i",{class:"material-icons right"},"send",-1),J={key:0,class:"center"};function Q(e,t,a,c,l,g){const d=P("RouterLink");return u(),m("form",{class:"card auth-card",onSubmit:t[4]||(t[4]=U((...r)=>e.onSubmit&&e.onSubmit(...r),["prevent"]))},[s("div",R,[a.titleLogin?(u(),m("span",A,o(e.getLocalizedText(a.titleLogin)),1)):L("",!0),s("div",D,[S(s("input",{id:"email",type:"text","onUpdate:modelValue":t[0]||(t[0]=r=>e.eValue=r),class:n({invalid:e.eError}),onBlur:t[1]||(t[1]=(...r)=>e.eBlur&&e.eBlur(...r))},null,34),[[w,e.eValue]]),_,s("small",{class:n(["helper-text",{invalid:e.eError}])},o(e.eError),3)]),s("div",j,[S(s("input",{id:"password",type:"password",class:n(["validate",{invalid:e.pError}]),"onUpdate:modelValue":t[2]||(t[2]=r=>e.pValue=r),onBlur:t[3]||(t[3]=(...r)=>e.pBlur&&e.pBlur(...r))},null,34),[[w,e.pValue]]),s("label",G,o(e.getLocalizedText("Password")),1),s("small",{class:n(["helper-text",{invalid:e.pError}])},o(e.pError),3)])]),s("div",H,[s("div",null,[s("button",{class:"btn waves-effect waves-light auth-submit",type:"submit",disabled:e.isSubmitting},[p(o(e.getLocalizedText(a.ButtonLogin))+" ",1),K],8,I)]),a.registerCheck?(u(),m("p",J,[p(o(e.getLocalizedText("NoAccount"))+" ",1),M(d,{to:"/register"},{default:F(()=>[p(o(e.getLocalizedText("SignUp")),1)]),_:1})])):L("",!0)])],32)}const Z=N(O,[["render",Q]]);export{Z as L};
