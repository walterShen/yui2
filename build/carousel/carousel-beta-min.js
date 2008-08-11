(function(){var U,g=YAHOO.util.Dom,e=YAHOO.util.Event,q=YAHOO.lang;YAHOO.widget.Carousel=function(t,s){YAHOO.widget.Carousel.superclass.constructor.call(this,t,s);};U=YAHOO.widget.Carousel;var N="Carousel";var S={};var F="afterScroll";var c="beforeHide";var I="beforePageChange";var k="beforeScroll";var Y="beforeShow";var C="blur";var X="focus";var b="hide";var Q="itemAdded";var p="itemRemoved";var D="itemSelected";var J="loadItems";var H="navigationStateChange";var i="pageChange";var G="render";var V="show";var Z="startAutoPlay";var r="stopAutoPlay";U.getById=function(s){return S[s]?S[s]:false;};YAHOO.extend(U,YAHOO.util.Element,{_carouselEl:null,_clipEl:null,_firstItem:0,_isAnimationInProgress:false,_isTabIndexSet:false,_itemsTable:null,_navEl:null,_nextEnabled:true,_pages:{},_prevEnabled:true,_recomputeSize:true,CLASSES:{BUTTON:"yui-carousel-button",CAROUSEL:"yui-carousel",CONTAINER:"yui-carousel-container",CONTENT:"yui-carousel-content",DISABLED:"disabled",FIRST_BUTTON:" first",FIRST_DISABLED:"first-disabled",HORIZONTAL:"yui-carousel-horizontal",NAVIGATION:"yui-carousel-nav",NEXT_PAGE:"yui-carousel-next",PAGE_NAV:"yui-carousel-pages",NAV_CONTAINER:"yui-carousel-buttons",PREV_PAGE:"yui-carousel-prev",SELECTED_ITEM:"yui-carousel-selected",VERTICAL:"yui-carousel-vertical",VERTICAL_CONTAINER:"yui-carousel-vertical-container",VISIBLE:"yui-carousel-visible"},CONFIG:{FIRST_VISIBLE:0,ITEM_LOADING:"<img "+'src="../../../img/ajax-loader.gif" '+'alt="Loading" '+'style="margin-top:-32px;position:relative;top:50%;">',ITEM_TAG_NAME:"LI",MAX_PAGER_BUTTONS:5,MIN_WIDTH:99,NUM_VISIBLE:3,TAG_NAME:"OL"},STRINGS:{NEXT_BUTTON_TEXT:"Next",PAGER_PREFIX_TEXT:"Go to page ",PREVIOUS_BUTTON_TEXT:"Previous"},addItem:function(y,t){var w,x,v,s,u=this.get("numItems");if(!y){return false;}if(q.isString(y)||y.nodeName){x=y.nodeName?y.innerHTML:y;}else{if(q.isObject(y)){x=y.content;}else{return false;}}w=y.className||"";s=y.id?y.id:g.generateId();if(q.isUndefined(t)){this._itemsTable.items.push({item:x,className:w,id:s});}else{if(t<0||t>=u){return false;}this._itemsTable.items.splice(t,0,{item:x,className:w,id:s});}this._itemsTable.numItems++;if(u<this._itemsTable.items.length){this.set("numItems",this._itemsTable.items.length);}this.fireEvent(Q,{pos:t,ev:Q});return true;},addItems:function(s){var t,v,u=true;if(!q.isArray(s)){return false;}for(t=0,v=s.length;t<v;t++){if(this.addItem(s[t][0],s[t][1])===false){u=false;}}return u;},blur:function(){this._carouselEl.blur();this.fireEvent(C);},clearItems:function(){var s=this.get("numItems");while(s>0){this.removeItem(0);s--;}},focus:function(){this._carouselEl.focus();this.fireEvent(X);},hide:function(){if(this.fireEvent(c)!==false){this.removeClass(this.CLASSES.VISIBLE);this.fireEvent(b);}},init:function(u,t){var s=u,v=false;if(!u){return ;}this._itemsTable={loading:{},numItems:0,items:[],size:0};if(q.isString(u)){u=g.get(u);}else{if(!u.nodeName){return ;}}if(u){if(!u.id){u.setAttribute("id",g.generateId());}this._parseCarousel(u);v=true;}else{u=this._createCarousel(s);}s=u.id;U.superclass.init.call(this,u,t);this.initEvents();if(v){this._parseCarouselItems();}if(!t||typeof t.isVertical=="undefined"){this.set("isVertical",false);}this._parseCarouselNavigation(u);this._navEl=K.call(this);S[s]=this;d.call(this);},initAttributes:function(s){U.superclass.initAttributes.call(this,s);this.setAttributeConfig("currentPage",{readOnly:true,value:0});this.setAttributeConfig("firstVisible",{method:this._setFirstVisible,validator:this._validateFirstVisible,value:this.CONFIG.FIRST_VISIBLE});this.setAttributeConfig("numVisible",{method:this._setNumVisible,validator:this._validateNumVisible,value:this.CONFIG.NUM_VISIBLE});this.setAttributeConfig("numItems",{method:this._setNumItems,validator:this._validateNumItems,value:this._itemsTable.numItems});this.setAttributeConfig("scrollIncrement",{validator:this._validateScrollIncrement,value:1});this.setAttributeConfig("selectedItem",{method:this._setSelectedItem,validator:q.isNumber,value:0});this.setAttributeConfig("revealAmount",{method:this._setRevealAmount,validator:this._validateRevealAmount,value:0});this.setAttributeConfig("isCircular",{validator:q.isBoolean,value:false});this.setAttributeConfig("isVertical",{method:this._setOrientation,validator:q.isBoolean,value:false});this.setAttributeConfig("navigation",{method:this._setNavigation,validator:this._validateNavigation,value:{prev:null,next:null,page:null}});this.setAttributeConfig("animation",{validator:this._validateAnimation,value:{speed:0,effect:null}});this.setAttributeConfig("autoPlay",{validator:q.isNumber,value:0});},initEvents:function(){this.on.call(this,"keydown",A,this);this.subscribe(F,n);this.subscribe(Q,O);this.subscribe(Q,n);this.subscribe(p,O);this.subscribe(p,n);this.subscribe(D,o);this.subscribe(J,O);this.subscribe(i,h);this.subscribe(G,n);this.subscribe(G,h);this.on("click",P,this);this.on("click",B,this);this.on("click",E,this);},getItem:function(s){if(s<0||s>=this.get("numItems")){return null;}return this._itemsTable.numItems>s?this._itemsTable.items[s]:null;},getItemPositionById:function(u){var s=0,t=this._itemsTable.numItems;while(s<t){if(this._itemsTable.items[s].id==u){return s;}s++;}return -1;},removeItem:function(t){var u,s=this.get("numItems");if(t<0||t>=s){return false;}u=this._itemsTable.items.splice(t,1);if(u&&u.length==1){this.set("numItems",s-1);this.fireEvent(p,{item:u[0],pos:t,ev:p});return true;}return false;},render:function(u){var t=this.CONFIG,s=this.CLASSES,v;if(!this._clipEl){this._clipEl=this._createCarouselClip();this._clipEl.appendChild(this._carouselEl);}if(u){this.appendChild(this._clipEl);this.appendTo(u);R.call(this);}else{if(!g.inDocument(this.get("element"))){return false;}this.appendChild(this._clipEl);}if(this.get("isVertical")){v=L.call(this);v=v<t.MIN_WIDTH?t.MIN_WIDTH:v;this.setStyle("width",v+"px");this.addClass(s.VERTICAL_CONTAINER);}else{this.addClass(s.CONTAINER);}if(this.get("numItems")<1){return false;}M.call(this);this.set("selectedItem",this.get("firstVisible"));
T.call(this);this.fireEvent(G);return true;},scrollBackward:function(){this.scrollTo(this._firstItem-this.get("scrollIncrement"));},scrollForward:function(){this.scrollTo(this._firstItem+this.get("scrollIncrement"));},scrollPageBackward:function(){this.scrollTo(this._firstItem-this.get("numVisible"));},scrollPageForward:function(){this.scrollTo(this._firstItem+this.get("numVisible"));},scrollTo:function(AH){var v,u,z=this.get("animation"),w=this.get("isCircular"),AG,AF,AE=this._firstItem,t,AC=this.get("numItems"),AD=this.get("numVisible"),y,AB=this.get("currentPage"),s,AA,x;if(AH==AE){return ;}if(this._isAnimationInProgress){return ;}if(AH<0){if(w){AH=AC+AH;}else{return ;}}else{if(AH>AC-1){if(this.get("isCircular")){AH=AC-AH;}else{return ;}}}AF=(this._firstItem>AH)?"backward":"forward";AA=AE+AD;AA=(AA>AC-1)?AC-1:AA;s=this.fireEvent(k,{dir:AF,first:AE,last:AA});if(s===false){return ;}this.fireEvent(I,{page:AB});AG=AE-AH;this._firstItem=AH;this.set("firstVisible",AH);d.call(this);AA=AH+AD;AA=(AA>AC-1)?AC-1:AA;x=this.get("isVertical")?"top":"left";y=l.call(this,AG);if(z.speed>0){this._isAnimationInProgress=true;if(this.get("isVertical")){u={points:{by:[0,y]}};}else{u={points:{by:[y,0]}};}v=new YAHOO.util.Motion(this._carouselEl,u,z.speed,z.effect);v.onComplete.subscribe(function(AJ){var AK=this.get("firstVisible"),AI=this.get("numVisible");this._isAnimationInProgress=false;this.fireEvent(F,{first:AK,last:AA});},null,this);v.animate();v=null;}else{y+=f(this._carouselEl,x);g.setStyle(this._carouselEl,x,y+"px");this.fireEvent(F,{first:AH,last:AA});}t=parseInt(this._firstItem/AD,10);if(t!=AB){this.setAttributeConfig("currentPage",{value:t});this.fireEvent(i,t);}if(AH!=this._selectedItem){this.set("selectedItem",this._getSelectedItem(AH));}delete this._autoPlayTimer;if(this.get("autoPlay")>0){this.startAutoPlay();}},show:function(){var s=this.CLASSES;if(this.fireEvent(Y)!==false){this.addClass(s.VISIBLE);g.addClass(this._carouselEl,s.VISIBLE);this.fireEvent(V);}},startAutoPlay:function(){var s=this,t=this.get("autoPlay");if(t>0){if(!q.isUndefined(this._autoPlayTimer)){return ;}this.fireEvent(Z);this._autoPlayTimer=setTimeout(function(){a.call(s);},t);}},stopAutoPlay:function(){if(!q.isUndefined(this._autoPlayTimer)){clearTimeout(this._autoPlayTimer);delete this._autoPlayTimer;this.set("autoPlay",0);this.fireEvent(r);}},toString:function(){return N+(this.get?" (#"+this.get("id")+")":"");},_createCarousel:function(t){var s=this.CLASSES;var u=W("DIV",{className:s.CONTAINER,id:t});if(!this._carouselEl){this._carouselEl=W(this.CONFIG.TAG_NAME,{className:s.CAROUSEL});}return u;},_createCarouselClip:function(){var s=W("DIV",{className:this.CLASSES.CONTENT});R.call(this,s);return s;},_createCarouselItem:function(s){return W(this.CONFIG.ITEM_TAG_NAME,{className:s.className,content:s.content,id:s.id});},_getSelectedItem:function(v){var s=this.get("isCircular"),u=this.get("numItems"),t=u-1;if(v<0){if(s){v=u+v;}else{v=this.get("selectedItem");}}else{if(v>t){if(s){v=v-u;}else{v=this.get("selectedItem");}}}return v;},_parseCarousel:function(u){var x,s,w,t,v;s=this.CLASSES;w=false;for(x=u.firstChild;x;x=x.nextSibling){if(x.nodeType==1){v=x.nodeName;if(v.toUpperCase()==this.CONFIG.TAG_NAME||(t=g.hasClass(x,s.CAROUSEL))){this._carouselEl=x;if(!t){g.addClass(this._carouselEl,s.CAROUSEL);}w=true;}}}return w;},_parseCarouselItems:function(){var w,s,t=this._itemsTable.numItems,v,u=this._carouselEl;for(w=u.firstChild;w;w=w.nextSibling){if(w.nodeType==1){v=w.nodeName;if(v.toUpperCase()==this.CONFIG.ITEM_TAG_NAME){if(w.id){s=w.id;}else{s=g.generateId();w.setAttribute("id",s);}this.addItem(w);}}}},_parseCarouselNavigation:function(v){var t,s=this.CLASSES,u,w=false;u=g.getElementsByClassName(s.PREV_PAGE,"*",v);if(u.length>0){t={prev:u[0]};}u=g.getElementsByClassName(s.NEXT_PAGE,"*",v);if(u.length>0){if(t){t.next=u[0];}else{t={next:u[0]};}}if(t){this.set("navigation",t);w=true;}return w;},_setFirstVisible:function(s){if(s>=0&&s<this.get("numItems")){this.scrollTo(s);}else{s=this.get("firstVisible");}return s;},_setNavigation:function(s){if(s.prev){e.on(s.prev,"click",j,this);}if(s.next){e.on(s.next,"click",m,this);}},_setNumVisible:function(s){if(s>1&&s<this.get("numItems")){R.call(this,this._clipEl,s);}else{s=this.get("numVisible");}return s;},_setNumItems:function(t){var s=this._itemsTable.numItems;if(q.isArray(this._itemsTable.items)){if(this._itemsTable.items.length!=s){s=this._itemsTable.items.length;this._itemsTable.numItems=s;}}if(t<s){while(s>t){this.removeItem(s-1);s--;}}return t;},_setOrientation:function(t){var s=this.CLASSES;if(t){g.replaceClass(this._carouselEl,s.HORIZONTAL,s.VERTICAL);}else{g.replaceClass(this._carouselEl,s.VERTICAL,s.HORIZONTAL);}this._itemsTable.size=0;return t;},_setRevealAmount:function(s){if(s>=0&&s<=100){s=parseInt(s,10);s=q.isNumber(s)?s:0;R.call(this);}else{s=this.get("revealAmount");}return s;},_setSelectedItem:function(s){this._selectedItem=s;this.fireEvent(D,s);},_validateAnimation:function(s){var t=true;if(q.isObject(s)){if(s.speed){t=t&&q.isNumber(s.speed);}if(s.effect){t=t&&q.isFunction(s.effect);}else{s.effect=YAHOO.util.Easing.easeOut;}}else{t=false;}return t;},_validateFirstVisible:function(s){var t=false;if(q.isNumber(s)){t=(s>=0&&s<this.get("numItems"));}return t;},_validateNavigation:function(s){if(!q.isObject(s)){return false;}if(s.prev&&!(q.isString(s.prev)||q.isString(s.prev.nodeName))){return false;}if(s.next&&!(q.isString(s.next)||q.isString(s.next.nodeName))){return false;}return true;},_validateNumItems:function(s){var t=false;if(q.isNumber(s)){t=s>0;}return t;},_validateNumVisible:function(s){var t=false;if(q.isNumber(s)){t=s>0&&s<this.get("numItems");}return t;},_validateRevealAmount:function(s){var t=false;if(q.isNumber(s)){t=s>=0&&s<100;}return t;},_validateScrollIncrement:function(s){var t=false;if(q.isNumber(s)){t=(s>0&&s<this.get("numItems"));}return t;}});function a(){var s=this._firstItem;if(s>=this.get("numItems")-1){if(this.get("isCircular")){index=0;}else{this.stopAutoPlay();
}}else{index=s+this.get("numVisible");}this.scrollTo.call(this,index);}function W(t,s){var u=document.createElement(t);if(s.className){g.addClass(u,s.className);}if(s.parent){s.parent.appendChild(u);}if(s.id){u.setAttribute("id",s.id);}if(s.content){if(s.content.nodeName){u.appendChild(s.content);}else{u.innerHTML=s.content;}}return u;}function L(u){var v,t=0,s=false;if(this._itemsTable.numItems==0){return 0;}if(typeof u==="undefined"){if(this._itemsTable.size>0){return this._itemsTable.size;}}v=g.get(this._itemsTable.items[0].id);if(typeof u==="undefined"){s=this.get("isVertical");}else{s=u=="height";}if(s){t=f(v,"height");}else{t=f(v,"width");}if(typeof u==="undefined"){this._itemsTable.size=t;}return t;}function l(v){var u=0,t=this.get("revealAmount"),s=0;u=L.call(this);s=u*v;if(this.get("isVertical")){s-=v;}return s;}function f(u,t,s){var w;function v(z,y){var AA;AA=parseInt(g.getStyle(z,y),10);return q.isNumber(AA)?AA:0;}function x(z,y){var AA;AA=parseFloat(g.getStyle(z,y));return q.isNumber(AA)?AA:0;}if(typeof s==="undefined"){s="int";}switch(t){case"height":w=u.offsetHeight;if(w>0){w+=v(u,"marginTop")+v(u,"marginBottom");}else{w=x(u,"height")+v(u,"marginTop")+v(u,"marginBottom")+v(u,"borderTopWidth")+v(u,"borderBottomWidth")+v(u,"paddingTop")+v(u,"paddingBottom");}break;case"width":w=u.offsetWidth;if(w>0){w+=v(u,"marginLeft")+v(u,"marginRight");}else{w=x(u,"width")+v(u,"marginLeft")+v(u,"marginRight")+v(u,"borderLeftWidth")+v(u,"borderRightWidth")+v(u,"paddingLeft")+v(u,"paddingRight");}break;default:if(s=="int"){w=v(u,t);if(t=="marginRight"&&YAHOO.env.ua.webkit){w=w<0?0:w;}}else{if(s=="float"){w=x(u,t);}else{w=g.getStyle(u,t);}}break;}return w;}function B(v,x){var s=x.get("element"),t,u,w=YAHOO.util.Event.getTarget(v);while(w&&w!=s&&w.id!=x._carouselEl){t=w.nodeName;if(t.toUpperCase()==x.CONFIG.ITEM_TAG_NAME){break;}w=w.parentNode;}if((u=x.getItemPositionById(w.id))>=0){x.set("selectedItem",x._getSelectedItem(u));}}function A(v,w){var u=e.getCharCode(v),t=false,s=0;if(w._isAnimationInProgress){return ;}switch(u){case 37:case 38:s=w.get("selectedItem");w.set("selectedItem",w._getSelectedItem(s-w.get("scrollIncrement")));t=true;break;case 39:case 40:s=w.get("selectedItem");w.set("selectedItem",w._getSelectedItem(s+w.get("scrollIncrement")));t=true;break;case 33:w.scrollPageBackward();t=true;break;case 34:w.scrollPageForward();t=true;break;}if(t){e.preventDefault(v);}}function d(){var w=this.get("firstVisible"),t=0,s=this.get("numItems"),u=this.get("numVisible"),v=this.get("revealAmount");t=w+u-1+(v?1:0);t=t>s-1?s-1:t;if(!this.getItem(w)||!this.getItem(t)){this.fireEvent(J,{ev:J,first:w,last:t,num:t-w});}}function E(t,v){var s,u=e.getTarget(t),w;w=u.href||u.value;if(w&&(s=w.match(/.*?-(\d+)$/))){if(s.length==2){v.scrollTo((s[1]-1)*v.get("numVisible"));e.preventDefault(t);}}}function j(s,t){t.scrollPageBackward();e.preventDefault(s);}function m(s,t){t.scrollPageForward();e.preventDefault(s);}function R(t,v){var w,s,x,y,z,AA,u;x=this.get("isVertical");z=this.get("revealAmount");u=x?"height":"width";w=x?"top":"left";t=t||this._clipEl;v=v||this.get("numVisible");y=L.call(this,u);AA=y*v;this._recomputeSize=AA==0;if(this._recomputeSize){return ;}if(!t){return ;}if(z>0){z=y*(z/100)*2;AA+=z;s=parseFloat(g.getStyle(this._carouselEl,w));s=q.isNumber(s)?s:0;g.setStyle(this._carouselEl,w,s+(z/2)+"px");}if(x){AA+=f(this._carouselEl,"marginTop")+f(this._carouselEl,"marginBottom")+f(this._carouselEl,"paddingTop")+f(this._carouselEl,"paddingBottom")+f(this._carouselEl,"borderTop")+f(this._carouselEl,"borderBottom");g.setStyle(t,u,(AA-(v-1))+"px");}else{AA+=f(this._carouselEl,"marginLeft")+f(this._carouselEl,"marginRight")+f(this._carouselEl,"paddingLeft")+f(this._carouselEl,"paddingRight")+f(this._carouselEl,"borderLeft")+f(this._carouselEl,"borderRight");g.setStyle(t,u,AA+"px");}T.call(this,t);}function T(u,s){var v,t;v=this.get("isVertical");if(v){return ;}u=u||this._clipEl;s=s||(v?"height":"width");t=parseFloat(g.getStyle(u,s),10);t=q.isNumber(t)?t:0;t+=f(u,"marginLeft")+f(u,"marginRight")+f(u,"paddingLeft")+f(u,"paddingRight")+f(u,"borderLeft")+f(u,"borderRight");this.setStyle(s,t+"px");}function P(s,t){if(t&&t.focus){t.focus();}}function o(v){var t=this.CLASSES,x,z=this._firstItem,w=this.get("numItems"),y=this.get("numVisible"),s=this.get("selectedItem"),u=z+y-1;if(s>=0&&s<w){x=g.get(this._itemsTable.items[s].id);if(x){g.removeClass(x,t.SELECTED_ITEM);}}if(q.isNumber(v)){v=parseInt(v,10);v=q.isNumber(v)?v:0;}else{v=z;}if(q.isUndefined(this._itemsTable.items[v])){this.scrollTo(v);}x=g.get(this._itemsTable.items[v].id);if(x){g.addClass(x,t.SELECTED_ITEM);}if(v<z||v>u){this.scrollTo(v);}}function K(){var t,s,v,x,w,u;s=this.CLASSES;v=g.getElementsByClassName(s.NAVIGATION,"DIV",this.get("element"));if(v.length==0){v=W("DIV",{className:s.NAVIGATION});this.insertBefore(v,g.getFirstChild(this.get("element")));}else{v=v[0];}this._pages.el=W("UL",{className:s.PAGE_NAV});v.appendChild(this._pages.el);nav=this.get("navigation");if(nav.prev){v.appendChild(nav.prev);}else{u=W("SPAN",{className:s.BUTTON+s.FIRST_BUTTON});u.innerHTML='<input type="button" '+'value="'+this.STRINGS.PREVIOUS_BUTTON_TEXT+'" '+'name="'+this.STRINGS.PREVIOUS_BUTTON_TEXT+'">';v.appendChild(u);t={prev:u};}if(nav.next){v.appendChild(nav.next);}else{x=W("SPAN",{className:s.BUTTON});x.innerHTML='<input type="button" '+'value="'+this.STRINGS.NEXT_BUTTON_TEXT+'" '+'name="'+this.STRINGS.NEXT_BUTTON_TEXT+'">';v.appendChild(x);if(t){t.next=x;}else{t={next:x};}}if(t){this.set("navigation",t);}return v;}function M(){if(!this._isTabIndexSet){if(!this._carouselEl.getAttribute("tabindex")){this._carouselEl.setAttribute("tabindex",0);this._isTabIndexSet=true;}}}function n(){var u=false,t=this.CLASSES,s,v;s=this.get("navigation");v=this._firstItem+this.get("numVisible");if(s.prev){if(this._firstItem==0){if(!this.get("isCircular")){e.removeListener(s.prev,"click",j);g.addClass(s.prev,t.FIRST_DISABLED);this._prevEnabled=false;}else{u=!this._prevEnabled;
}}else{u=!this._prevEnabled;}if(u){e.on(s.prev,"click",j,this);g.removeClass(s.prev,t.FIRST_DISABLED);this._prevEnabled=true;}}u=false;if(s.next){if(v>=this.get("numItems")){if(!this.get("isCircular")){e.removeListener(s.next,"click",m);g.addClass(s.next,t.DISABLED);this._nextEnabled=false;}else{u=!this._nextEnabled;}}else{u=!this._nextEnabled;}if(u){e.on(s.next,"click",m,this);g.removeClass(s.next,t.DISABLED);this._nextEnabled=true;}}this.fireEvent(H,{next:this._nextEnabled,prev:this._prevEnabled});}function h(w){var u,t="",s,v=this.get("numVisible");w=w||0;s=Math.ceil(this.get("numItems")/v);this._pages.num=s;this._pages.cur=w;if(s>this.CONFIG.MAX_PAGER_BUTTONS){t="<form><select>";}else{t="";}for(u=0;u<s;u++){if(s>this.CONFIG.MAX_PAGER_BUTTONS){t+='<option value="#yui-carousel-page-'+(u+1)+'" '+'id="#yui-carousel-page-'+(u+1)+'" '+(u==w?" selected":"")+'">'+this.STRINGS.PAGER_PREFIX_TEXT+" "+(u+1)+"</option>";}else{t+="<li"+(u==0?' class="first">':">")+'<a href="#page-'+(u+1)+'" '+(u==w?' class="selected"':"")+"><em>"+this.STRINGS.PAGER_PREFIX_TEXT+" "+(u+1)+"</em></a></li>";}}if(s>this.CONFIG.MAX_PAGER_BUTTONS){t+="</select></form>";}this._pages.el.innerHTML=t;t=null;}function O(y){var w,u,x,t,s,z,v;if(!q.isObject(y)){return ;}M.call(this);switch(y.ev){case Q:z=q.isUndefined(y.pos)?this._itemsTable.numItems-1:y.pos;x=this._itemsTable.items[z];s=g.get(x.id);if(!s){w=this._createCarouselItem({className:x.className,content:x.item,id:x.id});if(q.isUndefined(y.pos)){if((s=this._itemsTable.loading[z])){this._carouselEl.replaceChild(w,s);}else{this._carouselEl.appendChild(w);}}else{v=g.get(this._itemsTable.items[y.pos+1].id);if(v){this._carouselEl.insertBefore(w,v);}else{}}}else{if(q.isUndefined(y.pos)){if(!g.isAncestor(this._carouselEl,s)){this._carouselEl.appendChild(obj.el);}}else{if(!g.isAncestor(this._carouselEl,s)){this._carouselEl.insertBefore(s,g.get(this._itemsTable.items[y.pos+1].id));}}}if(this._recomputeSize){R.call(this);}break;case p:t=this.get("numItems");x=y.item;z=y.pos;if(x&&(w=g.get(x.id))){if(w&&g.isAncestor(this._carouselEl,w)){e.purgeElement(w,true);this._carouselEl.removeChild(w);}if(this.get("selectedItem")==z){z=z>=t?t-1:z;this.set("selectedItem",z);}}else{}break;case J:for(u=y.first;u<=y.last;u++){w=this._createCarouselItem({content:this.CONFIG.ITEM_LOADING,id:g.generateId()});if(w){if(this._itemsTable.items[y.last+1]){v=g.get(this._itemsTable.items[y.last+1].id);if(v){this._carouselEl.insertBefore(w,v);}else{}}else{this._carouselEl.appendChild(w);}}this._itemsTable.loading[u]=w;}break;}}})();YAHOO.register("carousel",YAHOO.widget.Carousel,{version:"@VERSION@",build:"@BUILD@"});