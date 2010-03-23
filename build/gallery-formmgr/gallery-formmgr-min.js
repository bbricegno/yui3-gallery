YUI.add("gallery-formmgr",function(B){function M(P,O){if(arguments.length===0){return;}if(!O){O={};}this.form_name=P;this.status_node=B.one(O.status_node);this.enabled=true;this.default_value_map=O.default_value_map;this.validation={fn:{},regex:{}};this.validation_msgs={};this.has_messages=false;this.has_errors=false;this.button_list=[];this.user_button_list=[];this.has_file_inputs=false;}var C="(?:^|\\s)(?:";var H=")(?:\\s|$)";var F="yiv-required";var L=/(?:^|\s+)yiv-length:\[([0-9]+)?,([1-9][0-9]*)?\](?:\s+|$)/;var K=/(?:^|\s+)yiv-integer(?::\[([-+]?[0-9]+)?,([-+]?[0-9]+)?\])?(?:\s+|$)/;var I=/(?:^|\s+)yiv-decimal(?::\[([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?,([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?\])?(?:\s+|$)/;M.integer_value_re=/^[-+]?[0-9]+$/;M.decimal_value_re=/^[-+]?(?:[0-9]+\.?|[0-9]*\.[0-9]+)$/;M.row_marker_class="formmgr-row";M.status_marker_class="formmgr-message-text";M.status_none_class="formmgr-status-hidden";M.status_success_class="formmgr-status-success";M.status_failure_class="formmgr-status-failure";M.row_status_prefix="formmgr-has";var E=M.status_success_class+"|"+M.status_failure_class;var A=M.row_status_prefix+"([^\\s]+)";var N=new RegExp(C+A+H);M.Strings={validation_error:"Correct errors in the highlighted fields before continuing.",required_string:"This field requires a value.",required_menu:"This field is required. Choose a value from the pull-down list.",length_too_short:"Enter text that is at least {min} characters or longer.",length_too_long:"Enter text that is up to {max} characters long.",length_out_of_range:"Enter text that is {min} to {max} characters long.",integer:"Enter a whole number (no decimal point).",integer_too_small:"Enter a number that is {min} or higher (no decimal point).",integer_too_large:"Enter a number that is {max} or lower (no decimal point).",integer_out_of_range:"Enter a number between or including {min} and {max} (no decimal point).",decimal:"Enter a number.",decimal_too_small:"Enter a number that is {min} or higher.",decimal_too_large:"Enter a number that is {max} or lower.",decimal_out_of_range:"Enter a number between or including {min} and {max}."};M.status_order=["error","warn","success","info"];M.getStatusPrecedence=function(O){for(var P=0;P<M.status_order.length;P++){if(O==M.status_order[P]){return P;}}return M.status_order.length;};M.statusTakesPrecendence=function(P,O){return(!P||M.getStatusPrecedence(O)<M.getStatusPrecedence(P));};M.getElementStatus=function(P){var O=B.one(P).get("className").match(N);return(O&&O.length>1?O[1]:false);};function D(O){if(B.Lang.isString(O)){return O.replace(/^#/,"");}else{if(O instanceof B.Node){return O.get("id");}else{return O.id;}}}M.cleanValues=function(S){var R=false;for(var P=0;P<S.length;P++){var O=S[P];var Q=O.type&&O.type.toLowerCase();if(Q=="file"){R=true;}else{if(Q=="select-multiple"){}else{if(O.value){O.value=B.Lang.trim(O.value);}}}}return R;};function G(O){return(!B.Lang.isUndefined(O)&&O.length>0);}M.validateFromCSSData=function(S,P){var U=B.DOM.hasClass(S,F);if(U&&S.value===""){var T=null;if(P&&P.required){T=P.required;}else{if(S.tagName.toLowerCase()=="select"){T=M.Strings.required_menu;}else{T=M.Strings.required_string;}}return{keepGoing:false,error:T};}else{if(!U&&S.value===""){return{keepGoing:false};}}if(S.className){var O=S.className.match(L);if(O&&O.length){if(G(O[1])&&G(O[2])&&parseInt(O[1],10)>parseInt(O[2],10)){}var T=null;var Q=(G(O[1])&&O[1]!=="0");if(Q&&G(O[2])){T=M.Strings.length_out_of_range;}else{if(Q){T=M.Strings.length_too_short;}else{if(G(O[2])){T=M.Strings.length_too_long;}}}if(S.value&&G(O[1])&&S.value.length<parseInt(O[1],10)){if(P&&P.min_length){T=P.min_length;}T=B.substitute(T,{min:parseInt(O[1],10),max:parseInt(O[2],10)});return{keepGoing:false,error:T};}if(S.value&&G(O[2])&&S.value.length>parseInt(O[2],10)){if(P&&P.max_length){T=P.max_length;}T=B.substitute(T,{min:parseInt(O[1],10),max:parseInt(O[2],10)});return{keepGoing:false,error:T};}}var O=S.className.match(K);if(O&&O.length){if(G(O[1])&&G(O[2])&&parseInt(O[1],10)>parseInt(O[2],10)){}var R=parseInt(S.value,10);if(S.value&&(!M.integer_value_re.test(S.value)||(G(O[1])&&R<parseInt(O[1],10))||(G(O[2])&&R>parseInt(O[2],10)))){var T=null;if(P&&P.integer){T=P.integer;}else{if(G(O[1])&&G(O[2])){T=M.Strings.integer_out_of_range;}else{if(G(O[1])){T=M.Strings.integer_too_small;}else{if(G(O[2])){T=M.Strings.integer_too_large;}else{T=M.Strings.integer;}}}}T=B.substitute(T,{min:parseInt(O[1],10),max:parseInt(O[2],10)});return{keepGoing:false,error:T};}}var O=S.className.match(I);if(O&&O.length){if(G(O[1])&&G(O[2])&&parseFloat(O[1])>parseFloat(O[2])){}var R=parseFloat(S.value);if(S.value&&(!M.decimal_value_re.test(S.value)||(G(O[1])&&R<parseFloat(O[1]))||(G(O[2])&&R>parseFloat(O[2])))){var T=null;if(P&&P.decimal){T=P.decimal;}else{if(G(O[1])&&G(O[2])){T=M.Strings.decimal_out_of_range;}else{if(G(O[1])){T=M.Strings.decimal_too_small;}else{if(G(O[2])){T=M.Strings.decimal_too_large;}else{T=M.Strings.decimal;}}}}T=B.substitute(T,{min:parseFloat(O[1],10),max:parseFloat(O[2],10)});return{keepGoing:false,error:T};}}}return{keepGoing:true};};function J(){var S=(this.button_list.length===0);for(var R=0;R<this.form.elements.length;R++){var V=this.form.elements[R];var Q=V.tagName.toLowerCase();var T=(V.type?V.type.toLowerCase():null);if(S&&(T=="submit"||T=="reset"||Q=="button")){this.button_list.push(V);}if(!V.name){continue;}var O=this.default_value_map[V.name];if(Q=="input"&&T=="file"){V.value="";}else{if(B.Lang.isUndefined(O)){if(Q=="input"&&(T=="password"||T=="text")){this.default_value_map[V.name]=V.value;}else{if(Q=="input"&&T=="checkbox"){this.default_value_map[V.name]=(V.checked?V.value:"");}else{if(Q=="input"&&T=="radio"){var U=this.form[V.name];if(U&&!U.length){this.default_value_map[V.name]=U.value;}else{if(U){this.default_value_map[V.name]=U[0].value;for(var P=0;P<U.length;P++){if(U[P].checked){this.default_value_map[V.name]=U[P].value;break;}}}}}else{if((Q=="select"&&T=="select-one")||Q=="textarea"){this.default_value_map[V.name]=V.value;
}}}}}else{if(Q=="input"&&(T=="password"||T=="text")){V.value=O;}else{if(Q=="input"&&(T=="checkbox"||T=="radio")){V.checked=(V.value==O);}else{if(Q=="select"&&T=="select-one"){V.value=O;if(V.selectedIndex>=0&&V.options[V.selectedIndex].value!==O.toString()){V.selectedIndex=-1;}}else{if(Q=="textarea"){V.value=O;}}}}}}}}M.prototype={getForm:function(){if(!this.form){this.form=document.forms[this.form_name];}return this.form;},hasFileInputs:function(){return this.has_file_inputs;},setDefaultValues:function(O){this.default_value_map=O;},setDefaultValue:function(P,O){this.default_value_map[P]=O;},saveCurrentValuesAsDefault:function(){this.default_value_map={};this.button_list=[];J.call(this);},setFunction:function(P,O){this.validation.fn[D(P)]=O;},setRegex:function(Q,P,O){Q=D(Q);if(B.Lang.isString(P)){this.validation.regex[Q]=new RegExp(P,O);}else{this.validation.regex[Q]=P;}if(!this.validation_msgs[Q]||!this.validation_msgs[Q].regex){}},setErrorMessages:function(P,O){this.validation_msgs[D(P)]=O;},addErrorMessage:function(Q,O,P){Q=D(Q);if(!this.validation_msgs[Q]){this.validation_msgs[Q]={};}this.validation_msgs[Q][O]=P;},clearForm:function(){this.clearMessages();this.form.reset();this.postPopulateForm();},populateForm:function(){if(!this.default_value_map){this.default_value_map={};}this.clearMessages();J.call(this);this.postPopulateForm();},postPopulateForm:function(){},isChanged:function(){for(var Q=0;Q<this.form.elements.length;Q++){var T=this.form.elements[Q];if(!T.name){continue;}var R=(T.type?T.type.toLowerCase():null);var P=T.tagName.toLowerCase();var O=this.default_value_map[T.name];if(O===null||typeof O==="undefined"){O="";}if(P=="input"&&R=="file"){if(T.value){return true;}}else{if(P=="input"&&(R=="password"||R=="text"||R=="file")){if(T.value!=O){return true;}}else{if(P=="input"&&(R=="checkbox"||R=="radio")){var S=(T.value==O);if((S&&!T.checked)||(!S&&T.checked)){return true;}}else{if((P=="select"&&R=="select-one")||P=="textarea"){if(T.value!=O){return true;}}}}}}return false;},prepareForm:function(){this.getForm();if(!this.prePrepareForm.apply(this,arguments)){return false;}this.clearMessages();this.populateForm();return this.postPrepareForm.apply(this,arguments);},prePrepareForm:function(){return true;},postPrepareForm:function(){return true;},initFocus:function(){for(var Q=0;Q<this.form.elements.length;Q++){var S=this.form.elements[Q];if(S.disabled||S.offsetHeight===0){continue;}var O=S.tagName.toLowerCase();var R=(S.type?S.type.toLowerCase():null);if((O=="input"&&(R=="file"||R=="password"||R=="text"))||O=="textarea"){try{S.focus();}catch(P){}S.select();break;}}},validateForm:function(){this.clearMessages();var P=true;var U=this.form.elements;this.has_file_inputs=M.cleanValues(U);for(var Q=0;Q<U.length;Q++){var V=U[Q].id;var O=this.validation_msgs[V];var T=M.validateFromCSSData(U[Q],O);if(T.error){this.displayMessage(U[Q],T.error,"error");P=false;}if(!T.keepGoing){continue;}if(this.validation.regex[V]&&!this.validation.regex[V].test(U[Q].value)){this.displayMessage(U[Q],O?O.regex:null,"error");P=false;continue;}var S=this.validation.fn[V];var R=this;if(B.Lang.isFunction(S)){}else{if(B.Lang.isString(S)){S=R[S];}else{if(S&&S.scope){R=S.scope;S=(B.Lang.isString(S.fn)?R[S.fn]:S.fn);}else{S=null;}}}if(S&&!S.call(R,this.form,B.one(U[Q]))){P=false;continue;}}if(!this.postValidateForm(this.form)){P=false;}if(!P){this.notifyErrors();}return P;},postValidateForm:function(O){return true;},registerButton:function(O){var P={e:B.one(O)};this.user_button_list.push(P);},isFormEnabled:function(){return this.enabled;},enableForm:function(){this.setFormEnabled(true);},disableForm:function(){this.setFormEnabled(false);},setFormEnabled:function(O){this.enabled=O;var Q=!O;for(var P=0;P<this.button_list.length;P++){this.button_list[P].disabled=Q;}for(P=0;P<this.user_button_list.length;P++){var R=this.user_button_list[P];R.e.set("disabled",Q);}},hasMessages:function(){return this.has_messages;},hasErrors:function(){return this.has_errors;},getRowStatus:function(P){var O=B.one(P).ancestor("."+M.row_marker_class);return M.getElementStatus(O);},clearMessages:function(){this.has_messages=false;this.has_errors=false;if(this.status_node){this.status_node.set("innerHTML","");this.status_node.replaceClass(E,M.status_none_class);}for(var O=0;O<this.form.elements.length;O++){var Q=this.form.elements[O];var P=B.one(Q).ancestor("."+M.row_marker_class);if(P&&P.hasClass(A)){P.all("."+M.status_marker_class).set("innerHTML","");P.removeClass(A);}}B.one(this.form).all("fieldset").removeClass(A);},displayMessage:function(T,U,R,P){if(B.Lang.isUndefined(P)){P=true;}T=B.one(T);var S=T.ancestor("."+M.row_marker_class);if(S&&M.statusTakesPrecendence(M.getElementStatus(S),R)){if(U){S.all("."+M.status_marker_class).set("innerHTML",U);}S.removeClass(A);S.addClass(M.row_status_prefix+R);var O=T.ancestor("fieldset");if(O&&M.statusTakesPrecendence(M.getElementStatus(O),R)){O.removeClass(A);O.addClass(M.row_status_prefix+R);}if(!this.has_messages&&P&&T.get("offsetHeight")>0){S.scrollIntoView();try{T.focus();}catch(Q){}}this.has_messages=true;if(R=="error"){this.has_errors=true;}}},notifyErrors:function(){this.displayFormMessage(M.Strings.validation_error,true,false);},displayFormMessage:function(Q,P,O){if(B.Lang.isUndefined(O)){O=true;}if(this.status_node){if(!this.status_node.innerHTML){this.status_node.replaceClass(M.status_none_class,(P?M.status_failure_class:M.status_success_class));this.status_node.set("innerHTML",Q);}if(O){this.status_node.scrollIntoView();}}else{}}};B.FormManager=M;},"gallery-2010.03.23-17-54",{requires:["node-base","substitute"]});