YUI.add("gallery-overlay-extras",function(c){
/*!
	 * Overlay Extras
	 * 
	 * Oddnut Software
	 * Copyright (c) 2009-2011 Eric Ferraiuolo - http://oddnut.com
	 * YUI BSD License - http://developer.yahoo.com/yui/license.html
	 */
var i="overlay",q="host",o="renderUI",f="bindUI",l="syncUI",b="rendered",s="boundingBox",p="visible",e="zIndex",h="align",m="Change",j=c.Lang.isBoolean,r=c.ClassNameManager.getClassName,d=(function(){
/*! IS_POSITION_FIXED_SUPPORTED - Juriy Zaytsev (kangax) - http://yura.thinkweb2.com/cft/ */
var u=null,v,t;if(document.createElement){v=document.createElement("div");if(v&&v.style){v.style.position="fixed";v.style.top="10px";t=document.body;if(t&&t.appendChild&&t.removeChild){t.appendChild(v);u=(v.offsetTop===10);t.removeChild(v);}}}return u;}()),a,k,n,g;(function(){var w="overlayModal",v="modal",u="mask",t={modal:r(i,v),mask:r(i,u)};a=c.Base.create(w,c.Plugin.Base,[],{_maskNode:null,_uiHandles:null,initializer:function(x){this.afterHostMethod(o,this.renderUI);this.afterHostMethod(f,this.bindUI);this.afterHostMethod(l,this.syncUI);if(this.get(q).get(b)){this.renderUI();this.bindUI();this.syncUI();}},destructor:function(){if(this._maskNode){this._maskNode.remove(true);}this._detachUIHandles();this.get(q).get(s).removeClass(t.modal);},renderUI:function(){var y=this.get(q).get(s),x=y.get("parentNode")||c.one("body");this._maskNode=c.Node.create("<div></div>");this._maskNode.addClass(t.mask);this._maskNode.setStyles({position:d?"fixed":"absolute",width:"100%",height:"100%",top:"0",left:"0",display:"none"});x.insert(this._maskNode,x.get("firstChild"));y.addClass(t.modal);},bindUI:function(){this.afterHostEvent(p+m,this._afterHostVisibleChange);this.afterHostEvent(e+m,this._afterHostZIndexChange);},syncUI:function(){var x=this.get(q);this._uiSetHostVisible(x.get(p));this._uiSetHostZIndex(x.get(e));},_focus:function(){var y=this.get(q),z=y.get(s),x=z.get("tabIndex");z.set("tabIndex",x>=0?x:0);y.focus();z.set("tabIndex",x);},_blur:function(){this.get(q).blur();},_getMaskNode:function(){return this._maskNode;},_uiSetHostVisible:function(x){if(x){c.later(1,this,"_attachUIHandles");this._maskNode.setStyle("display","block");this._focus();}else{this._detachUIHandles();this._maskNode.setStyle("display","none");this._blur();}},_uiSetHostZIndex:function(x){this._maskNode.setStyle(e,x||0);},_attachUIHandles:function(y){if(this._uiHandles){return;}var x=this.get(q),z=x.get(s);this._uiHandles=[z.on("clickoutside",c.bind(this._focus,this)),z.on("focusoutside",c.bind(this._focus,this))];if(!d){this._uiHandles.push(c.one("win").on("scroll",c.bind(function(B){var A=this._maskNode;A.setStyle("top",A.get("docScrollY"));},this)));}},_detachUIHandles:function(){c.each(this._uiHandles,function(x){x.detach();});this._uiHandles=null;},_afterHostVisibleChange:function(x){this._uiSetHostVisible(x.newVal);},_afterHostZIndexChange:function(x){this._uiSetHostZIndex(x.newVal);}},{NS:v,ATTRS:{maskNode:{getter:"_getMaskNode",readOnly:true}},CLASSES:t});}());(function(){var u="overlayKeepaligned",t="keepaligned";k=c.Base.create(u,c.Plugin.Base,[],{_uiHandles:null,initializer:function(v){this.afterHostMethod(f,this.bindUI);this.afterHostMethod(l,this.syncUI);if(this.get(q).get(b)){this.bindUI();this.syncUI();}},destructor:function(){this._detachUIHandles();},bindUI:function(){this.afterHostEvent(p+m,this._afterHostVisibleChange);},syncUI:function(){this._uiSetHostVisible(this.get(q).get(p));},syncAlign:function(){this.get(q)._syncUIPosAlign();},_uiSetHostVisible:function(v){if(v){this._attachUIHandles();}else{this._detachUIHandles();}},_attachUIHandles:function(){if(this._uiHandles){return;}var v=c.bind(this.syncAlign,this);this._uiHandles=[c.on("windowresize",v),c.on("scroll",v)];},_detachUIHandles:function(){c.each(this._uiHandles,function(v){v.detach();});this._uiHandles=null;},_afterHostVisibleChange:function(v){this._uiSetHostVisible(v.newVal);}},{NS:t});}());(function(){var w="overlayAutohide",u="autohide",v="clickedOutside",x="focusedOutside",t="pressedEscape";n=c.Base.create(w,c.Plugin.Base,[],{_uiHandles:null,initializer:function(y){this.afterHostMethod(f,this.bindUI);this.afterHostMethod(l,this.syncUI);if(this.get(q).get(b)){this.bindUI();this.syncUI();}},destructor:function(){this._detachUIHandles();},bindUI:function(){this.afterHostEvent(p+m,this._afterHostVisibleChange);},syncUI:function(){this._uiSetHostVisible(this.get(q).get(p));},_uiSetHostVisible:function(y){if(y){c.later(1,this,"_attachUIHandles");}else{this._detachUIHandles();}},_attachUIHandles:function(){if(this._uiHandles){return;}var A=this.get(q),B=A.get(s),z=c.bind(A.hide,A),y=[];if(this.get(v)){y.push(B.on("clickoutside",z));}if(this.get(x)){y.push(B.on("focusoutside",z));}if(this.get(t)){y.push(B.on("key",z,"down:27"));}this._uiHandles=y;},_detachUIHandles:function(){c.each(this._uiHandles,function(y){y.detach();});this._uiHandles=null;},_afterHostVisibleChange:function(y){this._uiSetHostVisible(y.newVal);}},{NS:u,ATTRS:{clickedOutside:{value:true,validator:j},focusedOutside:{value:true,validator:j},pressedEscape:{value:true,validator:j}}});}());(function(){var w="overlayPointer",u="pointer",v="pointing",t={pointer:r(i,u),pointing:r(i,v)};g=c.Base.create(w,c.Plugin.Base,[],{_pointerNode:null,initializer:function(x){this.afterHostMethod(o,this.renderUI);this.afterHostMethod(f,this.bindUI);this.afterHostMethod(l,this.syncUI);if(this.get(q).get(b)){this.renderUI();this.bindUI();this.syncUI();}},destructor:function(){var y=this.get(q),z=y.get(s),A=y.get(h),x=this._pointerNode;z.removeClass(t.pointing);if(A&&A.points){z.removeClass(r(i,v,A.points[0]));}if(x){x.remove(true);}},renderUI:function(){this._pointerNode=c.Node.create("<span></span>").addClass(t.pointer);this.get(q).get(s).append(this._pointerNode);},bindUI:function(){this.afterHostEvent(h+m,this._afterHostAlignChange);},syncUI:function(){this._uiSetHostAlign(this.get(q).get(h));},_getPointerNode:function(){return this._pointerNode;},_uiSetHostAlign:function(y,x){var A=this.get(q),B=A.get(s),z=this._pointerNode;
if(y&&y.points){B.removeClass(r(i,v,y.points[0]));}if(x&&x.node&&x.points[0]!==c.WidgetPositionAlign.CC){B.addClass(t.pointing);B.addClass(r(i,v,x.points[0]));z.show();}else{z.hide();B.removeClass(t.pointing);}A._syncUIPosAlign();},_afterHostAlignChange:function(x){this._uiSetHostAlign(x.prevVal,x.newVal);}},{NS:u,ATTRS:{pointerNode:{getter:"_getPointerNode",readOnly:true}},CLASSES:t});}());c.Plugin.OverlayModal=a;c.Plugin.OverlayKeepaligned=k;c.Plugin.OverlayAutohide=n;c.Plugin.OverlayPointer=g;},"@VERSION@",{supersedes:["gallery-overlay-modal"],requires:["overlay","plugin","event-resize","gallery-outside-events"]});