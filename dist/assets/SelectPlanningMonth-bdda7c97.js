import{f as d}from"./currency.filter-780ad7d5.js";import{R as y,_ as M,b as u,f as g,N as h,E as v,g as a,w,o as c,c as m,O as D,P as S,a as f,t as p,F as _,r as b,q as R}from"./index-0a08cbe1.js";function B(l,o){return l.value.map(n=>{const t=o.value.filter(e=>e.idParrent===n.idParrent).filter(e=>e.type==="outcome").reduce((e,s)=>e+=Number(s.amount),0);if(t!==0){const e=t*100/n.limit,s=`${e>100?100:e}%`,r=e<60?"green":e<100?"yellow":"red",i=`${d(n.limit)} - ${d(t)} = ${d(n.limit-t)}`;return{...n,progressPercent:s,progressColor:r,spend:t,tooltip:i}}return null}).filter(n=>n!==null)}async function E(){let o=(await y.dispatch("records/serviseDateRecords")).map(t=>{const e=new Date(t.day),s=e.getFullYear(),r=e.getMonth();return{year:s,month:r}});const n=new Set;return o.forEach(t=>{const e=t.year;n.has(e)||n.add(e)}),o.reduce((t,{year:e,month:s})=>{const r=t.find(i=>i.year===e);return r?r.month.push(s.toString()):t.push({year:e,month:[s.toString()]}),t},[])}async function N(l,o){let n=await y.dispatch("records/listRecords",{yearModel:l,monthModel:o});return n.length&&n.sort((t,e)=>new Date(t.date)-new Date(e.date)),n}const x={name:"SelectPlanningMonth",props:["modelValue","transformedDataMonth"],emits:["onChange","update:modelValue"],setup(l,{emit:o}){const n=u(l.modelValue),t=u(),e=u();g(()=>{h.updateTextFields(),e.value=h.FormSelect.init(t.value)}),v(()=>{e.value&&e.value.destroy&&e.value.destroy()});const s=[{name:a("January")},{name:a("February")},{name:a("March")},{name:a("April")},{name:a("May")},{name:a("June")},{name:a("July")},{name:a("August")},{name:a("September")},{name:a("October")},{name:a("November")},{name:a("December")}];return w(n,r=>{o("update:modelValue",{month:r})}),{nameMounth:s,month:n,refMonth:t,getLocalizedText:a}}},A={class:"input-field col s6"},C={value:"",disabled:"",selected:""},F=["value"];function P(l,o,n,t,e,s){return c(),m("div",A,[D(f("select",{ref:"refMonth","onUpdate:modelValue":o[0]||(o[0]=r=>t.month=r),required:"",onChange:o[1]||(o[1]=R(r=>l.$emit("onChange"),["prevent"]))},[f("option",C,p(t.getLocalizedText("SelectAMonth")),1),(c(!0),m(_,null,b(n.transformedDataMonth,r=>(c(),m("option",{value:r,key:r},p(t.nameMounth[r].name),9,F))),128))],544),[[S,t.month]])])}const k=M(x,[["render",P]]);export{k as S,N as f,E as s,B as u};
