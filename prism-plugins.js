!function(){if("undefined"!=typeof Prism&&"undefined"!=typeof document){var e="line-numbers",n=/\n(?!$)/g,t=Prism.plugins.lineNumbers={getLine:function(n,t){if("PRE"===n.tagName&&n.classList.contains(e)){var i=n.querySelector(".line-numbers-rows");if(i){var r=parseInt(n.getAttribute("data-start"),10)||1,s=r+(i.children.length-1);t<r&&(t=r),t>s&&(t=s);var l=t-r;return i.children[l]}}},resize:function(e){r([e])},assumeViewportIndependence:!0},i=void 0;window.addEventListener("resize",(function(){t.assumeViewportIndependence&&i===window.innerWidth||(i=window.innerWidth,r(Array.prototype.slice.call(document.querySelectorAll("pre.line-numbers"))))})),Prism.hooks.add("complete",(function(t){if(t.code){var i=t.element,s=i.parentNode;if(s&&/pre/i.test(s.nodeName)&&!i.querySelector(".line-numbers-rows")&&Prism.util.isActive(i,e)){i.classList.remove(e),s.classList.add(e);var l,o=t.code.match(n),a=o?o.length+1:1,u=new Array(a+1).join("<span></span>");(l=document.createElement("span")).setAttribute("aria-hidden","true"),l.className="line-numbers-rows",l.innerHTML=u,s.hasAttribute("data-start")&&(s.style.counterReset="linenumber "+(parseInt(s.getAttribute("data-start"),10)-1)),t.element.appendChild(l),r([s]),Prism.hooks.run("line-numbers",t)}}})),Prism.hooks.add("line-numbers",(function(e){e.plugins=e.plugins||{},e.plugins.lineNumbers=!0}))}function r(e){if(0!=(e=e.filter((function(e){var n,t=(n=e,n?window.getComputedStyle?getComputedStyle(n):n.currentStyle||null:null)["white-space"];return"pre-wrap"===t||"pre-line"===t}))).length){var t=e.map((function(e){var t=e.querySelector("code"),i=e.querySelector(".line-numbers-rows");if(t&&i){var r=e.querySelector(".line-numbers-sizer"),s=t.textContent.split(n);r||((r=document.createElement("span")).className="line-numbers-sizer",t.appendChild(r)),r.innerHTML="0",r.style.display="block";var l=r.getBoundingClientRect().height;return r.innerHTML="",{element:e,lines:s,lineHeights:[],oneLinerHeight:l,sizer:r}}})).filter(Boolean);t.forEach((function(e){var n=e.sizer,t=e.lines,i=e.lineHeights,r=e.oneLinerHeight;i[t.length-1]=void 0,t.forEach((function(e,t){if(e&&e.length>1){var s=n.appendChild(document.createElement("span"));s.style.display="block",s.textContent=e}else i[t]=r}))})),t.forEach((function(e){for(var n=e.sizer,t=e.lineHeights,i=0,r=0;r<t.length;r++)void 0===t[r]&&(t[r]=n.children[i++].getBoundingClientRect().height)})),t.forEach((function(e){var n=e.sizer,t=e.element.querySelector(".line-numbers-rows");n.style.display="none",n.innerHTML="",e.lineHeights.forEach((function(e,n){t.children[n].style.height=e+"px"}))}))}}}();
!function(){if("undefined"!=typeof Prism&&"undefined"!=typeof document){var e={"(":")","[":"]","{":"}"},t={"(":"brace-round","[":"brace-square","{":"brace-curly"},n={"${":"{"},r=0,c=/^(pair-\d+-)(close|open)$/;Prism.hooks.add("complete",(function(c){var i=c.element,d=i.parentElement;if(d&&"PRE"==d.tagName){var u=[];if(Prism.util.isActive(i,"match-braces")&&u.push("(","[","{"),0!=u.length){d.__listenerAdded||(d.addEventListener("mousedown",(function(){var e=d.querySelector("code"),t=s("brace-selected");Array.prototype.slice.call(e.querySelectorAll("."+t)).forEach((function(e){e.classList.remove(t)}))})),Object.defineProperty(d,"__listenerAdded",{value:!0}));var f=Array.prototype.slice.call(i.querySelectorAll("span."+s("token")+"."+s("punctuation"))),h=[];u.forEach((function(c){for(var i=e[c],d=s(t[c]),u=[],p=[],v=0;v<f.length;v++){var m=f[v];if(0==m.childElementCount){var b=m.textContent;(b=n[b]||b)===c?(h.push({index:v,open:!0,element:m}),m.classList.add(d),m.classList.add(s("brace-open")),p.push(v)):b===i&&(h.push({index:v,open:!1,element:m}),m.classList.add(d),m.classList.add(s("brace-close")),p.length&&u.push([v,p.pop()]))}}u.forEach((function(e){var t="pair-"+r+++"-",n=f[e[0]],c=f[e[1]];n.id=t+"open",c.id=t+"close",[n,c].forEach((function(e){e.addEventListener("mouseenter",a),e.addEventListener("mouseleave",o),e.addEventListener("click",l)}))}))}));var p=0;h.sort((function(e,t){return e.index-t.index})),h.forEach((function(e){e.open?(e.element.classList.add(s("brace-level-"+(p%12+1))),p++):(p=Math.max(0,p-1),e.element.classList.add(s("brace-level-"+(p%12+1))))}))}}}))}function s(e){var t=Prism.plugins.customClass;return t?t.apply(e,"none"):e}function i(e){var t=c.exec(e.id);return document.querySelector("#"+t[1]+("open"==t[2]?"close":"open"))}function a(){Prism.util.isActive(this,"brace-hover",!0)&&[this,i(this)].forEach((function(e){e.classList.add(s("brace-hover"))}))}function o(){[this,i(this)].forEach((function(e){e.classList.remove(s("brace-hover"))}))}function l(){Prism.util.isActive(this,"brace-select",!0)&&[this,i(this)].forEach((function(e){e.classList.add(s("brace-selected"))}))}}();