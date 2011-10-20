YUI.add("gallery-slidecheckbox",function(c){var e="SlideCheckbox",j="contentBox",h="wrapper",a="slider",g="sliderwrap",b="labelOn",i="labelOff",d="handle",f=10;c[e]=c.Base.create(e,c.Widget,[c.MakeNode],{anim:null,currentX:null,lastX:null,renderUI:function(){this.src=this.get("srcNode").addClass(this.getClassName("hidden"));this.get(j).append(this._makeNode()).append(this.src);this._locateNodes();var l=this._replacePx(this._labelOnNode.one("span").getStyle("width")),k=this._replacePx(this._labelOffNode.one("span").getStyle("width")),m=this._labelOnNode.get("offsetWidth");if(l>k){this._labelOffNode.one("span").setStyle("width",l);}else{this._labelOnNode.one("span").setStyle("width",k);m=this._labelOnNode.get("offsetWidth");}this.left=-this._labelOnNode.get("offsetWidth")+3;this._slideWrapWidth=3*m+10;this._handleNode.setStyle("width",m-3);this._sliderwrapNode.setStyle("width",this._slideWrapWidth);this._wrapperNode.setStyle("width",2*m).all("> .edge").setStyle("backgroundColor",this.get("backgroundColor"));},bindUI:function(){this.disabled=this.src.get("disabled");var l=new c.DD.Drag({node:this._sliderwrapNode,activeHandle:this._handleNode,lock:this.disabled}),k=this.get(j);this._addDragConstraint(l);l.on("drag:drag",function(n){var m=this._wrapperNode.getXY();if(m[1]!==l.actXY[1]){l.unplug();this._addDragConstraint(l);n.halt(true);}if(l.actXY[0]%2===0){this.lastX=this.currentX;}this.currentX=l.actXY[0];},this);l.on("drag:end",this.move,this);k.on("focus",function(){k.on("key",this.goLeft,"down:37",this);k.on("key",this.goRight,"down:39",this);k.on("key",this.move,"down:32",this);},this);k.on("blur",function(){k.detach("key");},this);},syncUI:function(){this._sliderwrapNode.setStyle("left",this.src.get("checked")?0:this.left);},destructor:function(){this.anim.stop().destroy();this.src=null;},goLeft:function(){this.to=this.left;this._execute();},goRight:function(){this.to=0;this._execute();},move:function(k){this.from=this._replacePx(this._sliderwrapNode.getComputedStyle("left"));if(this.lastX!==null){if(this.currentX<this.lastX||this.from===this.left){this.goLeft();}else{this.goRight();}}if(this.from>this.left){this.goLeft();}else{this.goRight();}},_addDragConstraint:function(k){var l=this._wrapperNode.getXY();k.plug(c.Plugin.DDConstrained,{constrain:{top:l[1],bottom:l[1]+this._wrapperNode.get("offsetHeight"),right:l[0]+this._slideWrapWidth,left:l[0]+this.left}});},_defaultCB:function(k){return null;},_onClick:function(k){this.move();},_onChange:function(){},_execute:function(){if(this.disabled){return;}this.src.set("checked",!this.src.get("checked"));if(this.anim===null){this.anim=new c.Anim({node:this._sliderwrapNode,from:{left:this.from},duration:this.get("duration"),to:{left:this.to},easing:"easeIn"});}this.lastX=null;this.anim.set("from",{left:(this.from?this.from:this.baseX)});this.anim.set("to",{left:this.to});this.anim.run();},_replacePx:function(k){return parseInt(k.replace("px",""));}},{ATTRS:{backgroundColor:{value:"white"},duration:{value:0.2},strings:{value:{labelOn:"ON",labelOff:"OFF"}}},_CLASS_NAMES:[h,a,g,b,i,d],_TEMPLATE:['<div class="{c wrapper}"><span class="edge lt">&nbsp;</span><span class="edge rt">&nbsp;</span>','<div class="{c slider}"><div class="{c sliderwrap}">','<span class="{c labelOn}"><label><span>{s labelOn}</span></label></span>','<div class="{c handle}"><span class="edge lt">&nbsp;</span><span class="edge rt">&nbsp;</span></div>','<span class="{c labelOff}"><label><span>{s labelOff}</span></label></span>',"</div></div></div>"].join("\n"),_EVENTS:{slider:[{type:"click",fn:"_onClick"}]},HTML_PARSER:{value:function(k){return k.getAttribute("checked");}}});},"gallery-2011.10.12-20-24",{skinnable:true,requires:["node-base","anim-base","anim-easing","base-build","event-key","event-move","widget","node-style","gallery-makenode","dd-drag","dd-constrain"]});