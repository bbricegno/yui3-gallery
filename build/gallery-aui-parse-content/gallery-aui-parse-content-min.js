YUI.add("gallery-aui-parse-content",function(E){var N=E.Lang,D=N.isString,P="append",I="createDocumentFragment",B="documentElement",Q="firstChild",K="head",O="host",G="innerHTML",H="ParseContent",F="queue",M="script",J="src";var C=E.Component.create({NAME:H,NS:H,ATTRS:{queue:{value:null}},EXTENDS:E.Plugin.Base,prototype:{initializer:function(){var A=this;C.superclass.initializer.apply(this,arguments);A.set(F,new E.AsyncQueue());A._bindAOP();},globalEval:function(R){var S=E.getDoc();var L=S.one(K)||S.get(B);var A=document.createElement(M);A.type="text/javascript";if(R){A.text=N.trim(R);}L.appendChild(A).remove();},parseContent:function(R){var A=this;var L=A._clean(R);A._dispatch(L);return L;},_bindAOP:function(){var A=this;this.doBefore("insert",function(S){var R=Array.prototype.slice.call(arguments);var L=A.parseContent(S);R.splice(0,1,L.fragment);return new E.Do.AlterArgs(null,R);});this.doBefore("setContent",function(R){var L=A.parseContent(R);return new E.Do.AlterArgs(null,[L.fragment]);});},_clean:function(R){var A={};var L=E.getDoc().invoke(I);L.append("<div>_</div>");if(D(R)){E.DOM.addHTML(L,R,P);}else{L.append(R);}A.js=L.all(M).each(function(T,S){T.remove();});L.get(Q).remove();A.fragment=L;return A;},_dispatch:function(R){var L=this;var A=L.get(F);R.js.each(function(T,S){var U=T.get(J);if(U){A.add({autoContinue:false,fn:function(){E.Get.script(U,{onEnd:function(V){V.purge();A.run();}});},timeout:0});}else{A.add({fn:function(){var V=T._node;L.globalEval(V.text||V.textContent||V.innerHTML||"");},timeout:0});}});A.run();}}});E.namespace("Plugin").ParseContent=C;},"gallery-2010.06.02-20-36",{skinnable:false,requires:["async-queue","gallery-aui-base","io","plugin"]});