(this["webpackJsonpgia-telefonica"]=this["webpackJsonpgia-telefonica"]||[]).push([[0],{38:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(1),u=n(14),a=n.n(u),s=n(3),i=function(e){var t=e.newSearch,n=e.setNewSearch;return Object(r.jsxs)("div",{children:["filter show with: ",Object(r.jsx)("input",{value:t,onChange:function(e){return n(e.target.value)}})]})},o=n(4),j=n.n(o),b="/api/persons",l=function(e){return j.a.post(b,e).then((function(e){return e.data}))},d=function(e){var t="".concat(b,"/").concat(e);return j.a.delete(t)},f=function(){return j.a.get(b).then((function(e){return e.data}))},h=function(e){var t=e.name,n=e.number;return Object(r.jsxs)("li",{children:[t," ",n]})},O=function(e){var t=e.personsFiltered,n=e.setPersonsFiltered;return Object(r.jsx)("ul",{children:t.map((function(e){return Object(r.jsxs)("div",{children:[Object(r.jsx)(h,{name:e.name,number:e.number}),Object(r.jsx)("button",{onClick:function(){return function(e){window.confirm("Delete ".concat(e.name,"?"))&&d(e.id).then((function(){var r=t.filter((function(t){return t.id!==e.id}));n(r)}))}(e)},children:"Delete "})]},e.id)}))})},m=function(e){var t=e.newNumber,n=e.newName,c=e.allPersons,u=e.setNewName,a=e.setNewNumber,s=e.setAllPersons;return Object(r.jsxs)("form",{onSubmit:function(e){e.preventDefault();var r={name:n,number:t};c.find((function(e){return e.name===n}))?alert("".concat(n," already exist")):function(e){l(e).then((function(e){return s(c.concat(e))})).catch((function(e){var t=e.response.data.error;console.log("ERROR//",t)}))}(r),u(""),a("")},children:[Object(r.jsxs)("div",{children:["name: ",Object(r.jsx)("input",{value:n,onChange:function(e){return u(e.target.value)}})]}),Object(r.jsxs)("div",{children:["number: ",Object(r.jsx)("input",{value:t,onChange:function(e){return a(e.target.value)}})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})},v=function(){var e=Object(c.useState)([]),t=Object(s.a)(e,2),n=t[0],u=t[1],a=Object(c.useState)([]),o=Object(s.a)(a,2),j=o[0],b=o[1],l=Object(c.useState)(""),d=Object(s.a)(l,2),h=d[0],v=d[1],x=Object(c.useState)(""),w=Object(s.a)(x,2),p=w[0],N=w[1],g=Object(c.useState)(""),S=Object(s.a)(g,2),P=S[0],C=S[1];return Object(c.useEffect)((function(){f().then((function(e){return u(e)}))}),[]),Object(c.useEffect)((function(){var e=n.filter((function(e){return e.name.toLowerCase().includes(P.toLowerCase())}));b(e)}),[n,b,P]),Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(i,{newSearch:P,setNewSearch:C}),Object(r.jsx)("h2",{children:"Add a new"}),Object(r.jsx)(m,{newNumber:p,setNewNumber:N,newName:h,setNewName:v,allPersons:n,setAllPersons:u}),Object(r.jsx)("h2",{children:"Numbers"}),Object(r.jsx)(O,{personsFiltered:j,setPersonsFiltered:b})]})};a.a.render(Object(r.jsx)(v,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.29e78202.chunk.js.map