(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],[,,,,,,,,,,,function(e,t,a){e.exports=a(23)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),c=a(6),r=a.n(c),i=(a(16),a(3)),l=a(4),o=a(2),d=a(7),u=a(8),m=a(1),h=a(10),g=a(9);a(17);function p(e){var t=e.data,a=t.name,n=t.weight,c=t.score,r=t.id;return s.a.createElement("div",null,s.a.createElement("input",{className:"component-grade-input text",name:"name",placeholder:"Name",type:"text",value:a,onChange:function(t){return e.handleChange(t,e.sectionID,r)}}),s.a.createElement("input",{className:"component-grade-input num",name:"weight",placeholder:"Weight",type:"number",value:n,onChange:function(t){return e.handleChange(t,e.sectionID,r)}}),s.a.createElement("input",{className:"component-grade-input num",name:"score",placeholder:"Score",type:"number",value:c,onChange:function(t){return e.handleChange(t,e.sectionID,r)}}),s.a.createElement("button",{className:"component-delete-grade-btn",onClick:function(){return e.deleteGrade(e.sectionID,r)}},"Delete"))}a(18);function f(e){var t=e.data,a=t.id,n=t.gradeList;return s.a.createElement("div",null,s.a.createElement("ul",null,n.map((function(t){return s.a.createElement(p,{data:t,sectionID:a,deleteGrade:e.deleteGrade,handleChange:e.handleChange,key:t.id})}))))}a(19);function C(e){var t=e.data,a=t.id,n=t.sectionName,c=t.sectionWeight,r=t.sectionGrade,i=["red","yellow","green","blue","purple"][a%5];return s.a.createElement("div",{className:"component-section-container "+i},s.a.createElement("button",{className:"component-add-grade-btn",onClick:function(){return e.addGrade(a)}},"Add Grade"),s.a.createElement("button",{className:"component-delete-section-btn",onClick:function(){return e.deleteSection(a)}},"X"),s.a.createElement("input",{className:"component-section-input",name:"sectionName",placeholder:"Section Name",type:"text",value:n,onChange:function(t){return e.handleChange(t,a)}}),s.a.createElement("input",{className:"component-section-input num",name:"sectionWeight",placeholder:"Weight",type:"number",value:c,onChange:function(t){return e.handleChange(t,a)}}),s.a.createElement("span",null,"Grade: ",r.toFixed(2)),s.a.createElement(f,{data:e.data,deleteGrade:e.deleteGrade,handleChange:e.handleChange}))}a(20);function v(e){var t=e.data,a=t.id,n=t.name,c=t.classGrade,r=t.sectionList;return s.a.createElement("div",{className:"component-class-container"},s.a.createElement("input",{className:"component-class-name",name:"className",placeholder:"Class Name",type:"text",value:n,onChange:function(t){return e.handleChange(t,a)}}),s.a.createElement("span",{className:"component-class-grade"},"Class grade: ",c.toFixed(2)),s.a.createElement("br",null)," ",s.a.createElement("br",null),s.a.createElement("button",{className:"component-add-section-btn",onClick:e.addSection},"Add Section"),r.map((function(t){return s.a.createElement(C,{data:t,deleteSection:e.deleteSection,addGrade:e.addGrade,deleteGrade:e.deleteGrade,handleChange:e.handleChange})})))}a(21);var b=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).state={classList:[],currClass:0,classKey:0},n.addClass=n.addClass.bind(Object(m.a)(n)),n.deleteClass=n.deleteClass.bind(Object(m.a)(n)),n.addSection=n.addSection.bind(Object(m.a)(n)),n.deleteSection=n.deleteSection.bind(Object(m.a)(n)),n.addGrade=n.addGrade.bind(Object(m.a)(n)),n.deleteGrade=n.deleteGrade.bind(Object(m.a)(n)),n.handleChange=n.handleChange.bind(Object(m.a)(n)),n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=JSON.parse(localStorage.getItem("classList")),t=localStorage.getItem("currClass"),a=parseInt(localStorage.getItem("classKey"));null!==e&&this.setState({classList:e,currClass:t,classKey:a})}},{key:"componentDidUpdate",value:function(){var e=this.state,t=e.classList,a=e.currClass,n=e.classKey;localStorage.setItem("classList",JSON.stringify(t)),localStorage.setItem("currClass",a),localStorage.setItem("classKey",n)}},{key:"addClass",value:function(){this.setState((function(e){return{classList:[].concat(Object(o.a)(e.classList),[{id:e.classKey,name:"",sectionList:[],sectionKey:0,classGrade:0}]),currClass:e.classList.length,classKey:e.classKey+1}}))}},{key:"deleteClass",value:function(e){var t=this;this.setState((function(a){var n=a.classList,s=a.currClass,c=a.classList[a.currClass].id;return c===e?s=t.findNextClass(a.classList,a.currClass):c>e&&s--,{classList:n.filter((function(t){return t.id!==e})),currClass:s}}))}},{key:"addSection",value:function(){this.setState((function(e){var t=Object(o.a)(e.classList),a=t[e.currClass].sectionKey++;return t[e.currClass].sectionList.push({id:a,sectionName:"",sectionWeight:"",sectionGrade:0,gradeList:[],gradeKey:0}),{classList:t}}))}},{key:"deleteSection",value:function(e){this.setState((function(t){var a=Object(o.a)(t.classList);return a[t.currClass].sectionList=a[t.currClass].sectionList.filter((function(t){return t.id!==e})),{classList:a}}))}},{key:"findNextClass",value:function(e,t){return t<e.length-1?t:t>0?t-1:0}},{key:"setActiveIndex",value:function(e,t){console.log(e.target),console.log(e.target.className),"component-class-tab"===e.target.className&&this.setState((function(e){return{currClass:e.classList.map((function(e){return e.id})).indexOf(t)}}))}},{key:"addGrade",value:function(e){this.setState((function(t){var a=Object(o.a)(t.classList);return a[t.currClass].sectionList.map((function(t){if(t.id!==e)return t;var a=t.gradeKey;return t.gradeList.push({id:a,name:"",weight:"",score:""}),t.gradeKey++,t})),{classList:a}}))}},{key:"deleteGrade",value:function(e,t){this.setState((function(a){var n=Object(o.a)(a.classList);return n[a.currClass].sectionList.map((function(a){return a.id!==e||(a.gradeList=a.gradeList.filter((function(e){return e.id!==t}))),a})),{classList:n}}))}},{key:"handleChange",value:function(e,t,a){var n=e.target,s=n.name,c=n.value;"className"===s?this.setState((function(e){var t=e.currClass,a=e.classList;return a[t].name=c,{classList:a}})):"sectionName"===s||"sectionWeight"===s?this.setState((function(e){var a=e.currClass,n=e.classList,r=0;return n[a].sectionList.map((function(e){return e.id!==t?(r+=e.sectionWeight*e.sectionGrade,e):(e[s]=c,r+=e.sectionWeight*e.sectionGrade,e)})),n[a].classGrade=r,{classList:n}})):this.setState((function(e){var n=e.classList,r=e.currClass,o=0;return n[r].sectionList=n[r].sectionList.map((function(e){var n=0;return e.id!==t?(o+=e.sectionWeight*e.sectionGrade,e):(e.gradeList=e.gradeList.map((function(e){return e.id!==a?e:Object(l.a)(Object(l.a)({},e),{},Object(i.a)({},s,c))})),e.gradeList.forEach((function(e){return n+=e.weight*e.score})),e.sectionGrade=n,o+=e.sectionWeight*e.sectionGrade,e)})),n[r].classGrade=o,{classList:n}}))}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("button",{className:"component-add-class-btn",onClick:this.addClass},"Add class"),"        ",s.a.createElement("br",null)," ",s.a.createElement("br",null),s.a.createElement("div",{className:"component-flex-container"},this.state.classList.map((function(t){var a=t.name;return""===a&&(a="Class "+(t.id+1)),s.a.createElement("div",{className:e.state.classList[e.state.currClass].id===t.id?"component-class-tab active":"component-class-tab",onClick:function(a){return e.setActiveIndex(a,t.id)}},a,s.a.createElement("button",{className:"component-delete-class-btn",onClick:function(){return e.deleteClass(t.id)}},"X"))}))),s.a.createElement("br",null)," ",s.a.createElement("br",null),0!==this.state.classList.length?s.a.createElement(v,{data:this.state.classList[this.state.currClass],addSection:this.addSection,deleteSection:this.deleteSection,addGrade:this.addGrade,deleteGrade:this.deleteGrade,handleChange:this.handleChange}):s.a.createElement("h4",null,"Add a class to get started!"))}}]),a}(s.a.Component);a(22);function L(e){return s.a.createElement("div",{className:"app-container"},s.a.createElement("h2",null,"Grade Manager"),s.a.createElement(b,null))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[11,1,2]]]);
//# sourceMappingURL=main.bd2051b8.chunk.js.map