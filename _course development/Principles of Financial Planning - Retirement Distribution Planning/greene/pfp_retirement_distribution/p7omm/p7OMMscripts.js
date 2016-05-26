
/* 
 ================================================
 PVII Overlay Menu Magic scripts
 Copyright (c) 2014-2016 Project Seven Development
 www.projectseven.com
 Version: 1.1.3 -build 23
 ================================================
 
*/

var p7OMMover='_over';
var p7OMMopen='_down';
var p7OMM={
	ctl: [],
	adv: [],
	triggers: [],
	boxes: [],
	status: false,
	once: false,
	prf: 'none',
	trsnd: '',
	animDelay: (1000/60)
};
function P7_OMMset(){
	var i,h,hd,sh='',ie=P7_OMMgetIEver();
	if(!document.getElementById || (ie>4 && ie<6)){
		return;
	}
	sh+='div.p7OMM {position:absolute;top:-9000px;left:0;width:100%;height:auto;background-color:transparent;z-index:99999999;}\n';
	sh+='div.p7OMM.p7OMM-overlay {position:fixed;top:-100%;left:0;width:100%;height:100%;background-color:transparent;overflow:hidden;z-index:99999995;opacity:0;}\n';
	sh+='div.p7OMM-panels-wrapper {position:relative;overflow:hidden;padding:0;margin:0;}\n';
	sh+='div.p7OMM-panel {position:absolute;visibility:hidden;top:0px;left:0px;}\n';
	p7OMM.prf=P7_OMMgetCSSPre();
	p7OMM.trsnd=(p7OMM.prf=='-webkit-'?'webkitTransitionEnd':'transitionend');
	hd=document.head || document.getElementsByTagName('head')[0];
	h=document.createElement('style');
	h.type='text/css';
	if(h.styleSheet){
		h.styleSheet.cssText=sh;
	}
	else{
		h.appendChild(document.createTextNode(sh));
	}
	hd.appendChild(h);
}
P7_OMMset();
function P7_OMMop(){
	if(!document.getElementById){
		return;
	}
	p7OMM.ctl[p7OMM.ctl.length]=arguments;
}
function P7_OMMbb(){
	P7_OMMshutall();
}
function P7_OMMaddLoad(){
	var ie=P7_OMMgetIEver();
	if(!document.getElementById || (ie>4 && ie<6)){
		return;
	}
	if(window.addEventListener){
		document.addEventListener("DOMContentLoaded",P7_OMMinit,false);
		window.addEventListener("load",P7_OMMinit,false);
		window.addEventListener("unload",P7_OMMbb,false);
		window.addEventListener("resize",P7_OMMrsz,false);
		document.addEventListener("keydown",P7_OMMkey,false);
	}
	else if(window.attachEvent){
		document.write("<script id=p7ie_omm defer src=\"//:\"><\/script>");
		document.getElementById("p7ie_omm").onreadystatechange=function(){
			if (this.readyState=="complete"){
				if(p7OMM.ctl.length>0){
					P7_OMMinit();
				}
			}
		};
		window.attachEvent("onload",P7_OMMinit);
		window.attachEvent("onunload",P7_OMMbb);
		window.attachEvent("onresize",P7_OMMrsz);
		document.attachEvent("onkeydown",P7_OMMkey);
	}
}
P7_OMMaddLoad();
function P7_OMMinit(){
	var i,j,k,ie,tD,tr,el,tA,tP,iM,sr,x,s1,s2;
	if(p7OMM.ctl.length<1){
		return;
	}
	if(p7OMM.once){
		return;
	}
	p7OMM.once=true;
	document.p7OMMpreload=[];
	ie=P7_OMMgetIEver();
	for(j=0;j<p7OMM.ctl.length;j++){
		tD=document.getElementById(p7OMM.ctl[j][0]);
		if(tD){
			tD.p7opt=p7OMM.ctl[j];
			if(tD.parentNode.nodeName!='BODY'){
				document.getElementsByTagName('BODY')[0].appendChild(tD);
			}
			P7_OMMremClass(tD,'p7OMMnoscript');
			el=document.createElement('div');
			el.setAttribute('id',tD.id.replace('_','ov_'));
			el.setAttribute('class','p7OMM-overlay '+tD.className);
			el.ommDiv=tD.id;
			document.getElementsByTagName('BODY')[0].appendChild(el);
			tD.ommOv=el;
			if(window.addEventListener){
				el.addEventListener("click",P7_OMMcloseBox,false);
			}
			else if(window.attachEvent){
				el.attachEvent("click",P7_OMMcloseBox,false);
			}
			tD.ommState='closed';
			tD.ommDefaultPanel=tD.p7opt[3];
			p7OMM.boxes[p7OMM.boxes.length]=tD;
			tD.ommDirection='right';
			if(p7OMM.prf=='none' && tD.p7opt[1]>2){
				tD.p7opt[1]=1;
			}
			if(tD.p7opt[11]>0){
				el=document.getElementById(tD.id.replace('_','box_'));
				if(el){
					el.style.maxWidth=tD.p7opt[11]+'px';
				}
			}
			tr=document.getElementById(tD.id.replace('_','trig_'));
			p7OMM.triggers[p7OMM.triggers.length]=tr;
			if(tr){
				tr.ommState=tD.ommState;
				tr.ommBox=tD;
				tD.ommTrigger=tr;
				tr.onclick=function(){
					return P7_OMMtrigBox(this);
				};
			}
			el=document.getElementById(tD.id.replace('_','close_'));
			if(el){
				el.ommBox=tD;
				el.onclick=function(){
					return P7_OMMclose(this.ommBox);
				};
			}
			if(window.addEventListener){
				tD.addEventListener("click",P7_OMMcloseBox,false);
			}
			else if(window.attachEvent){
				tD.attachEvent("click",P7_OMMcloseBox,false);
			}
			tD.ommTabs=[];
			tD.ommPanels=[];
			tD.ommCurrentPanel=-1;
			el=document.getElementById(tD.id.replace('_','tabs_'));
			tA=el.getElementsByTagName('A');
			for(i=0;i<tA.length;i++){
				if(tA[i].id && (/p7OMMtab/.test(tA[i].id)) ){
					tD.ommTabs[i]=tA[i];
					tD.ommPanels[i]=null;
					tA[i].ommDiv=tD.id;
					tA[i].ommPanelNum=i+1;
					tA[i].ommPanel=false;
					tA[i].ommState='closed';
					tA[i].onclick=function(){
						return P7_OMMpanelTrig(this);
					};
					tA[i].hasImg=false;
					iM=tA[i].getElementsByTagName("IMG");
					if(iM&&iM[0]){
						sr=iM[0].getAttribute("src");
						iM[0].ommSwap=tD.p7opt[6];
						x=sr.lastIndexOf(".");
						s1=sr.substring(0,x)+p7OMMover+'.'+sr.substring(x+1);
						s2=sr.substring(0,x)+p7OMMopen+'.'+sr.substring(x+1);
						if(iM[0].ommSwap==1){
							iM[0].p7imgswap=[sr,s1,s1];
							P7_OMMpreloader(s1);
						}
						else if (iM[0].ommSwap==2){
							iM[0].p7imgswap=[sr,s1,s2];
							P7_OMMpreloader(s1,s2);
						}
						else{
							iM[0].p7imgswap=[sr,sr,sr];
						}
						iM[0].p7state='closed';
						iM[0].mark=false;
						iM[0].rollover=tD.p7opt[7];
						if(iM[0].ommSwap>0){
							tA[i].hasImg=true;
							iM[0].onmouseover=function(){
								P7_OMMimovr(this);
							};
							iM[0].onmouseout=function(){
								P7_OMMimout(this);
							};
							tA[i].onfocus=function(){
								P7_OMMimovr(this.getElementsByTagName('IMG')[0]);
							};
							tA[i].onblur=function(){
								P7_OMMimout(this.getElementsByTagName('IMG')[0]);
							};
						}
					}
					tP=document.getElementById(tA[i].id.replace('tab','p'));
					if(tP){
						tD.ommPanels[i]=tP;
						tP.ommDiv=tD.id;
						tP.ommTab=tA[i];
						tA[i].ommPanel=tP;
						if(tD.p7opt[1]==3){
tP.addEventListener(p7OMM.trsnd, function(){
	if(this.ommTab.ommState!='open'){
		P7_OMMpanelReset(this,1);
	}
}
, false);
}
el=tP.getElementsByTagName('IFRAME');
if(el && el.length){
tP.ommFrames=[];
for(k=0;k<el.length;k++){
	if(/video-wrapper/.test(el[k].parentNode.className)){
		tP.ommFrames[k]=el[k];
		el[k].ommSrc=el[k].src;
		el[k].src='';
	}
}
}
}
}
}
if(tD.p7opt[4]==1){
P7_OMMcurrentMark(tD);
}
P7_OMMurl(tD.id);
if(tD.ommDefaultPanel>0 && tD.ommDefaultPanel<tD.ommTabs.length+1){
P7_OMMpanelOpen(tD.ommTabs[tD.ommDefaultPanel-1]);
}
if(tD.p7opt[9]==1 || tD.ommAutoOpen){
P7_OMMopen(tD.id);
}
}
}
P7_OMMrsz();
}
function P7_OMMpreloader(){
	var i,x;
	for(i=0;i<arguments.length;i++){
		x=document.p7OMMpreload.length;
		document.p7OMMpreload[x]=new Image();
		document.p7OMMpreload[x].src=arguments[i];
	}
}
function P7_OMMimovr(im){
	var m=true;
	if(im.p7state=='open' && im.rollover===0){
		m=false;
	}
	if(m){
		im.src=im.p7imgswap[1];
	}
}
function P7_OMMimout(im){
	if(im.p7state=='open' || im.mark){
		im.src=im.p7imgswap[2];
	}
	else{
		im.src=im.p7imgswap[0];
	}
}
function P7_OMMtrigBox(a){
	if(a.ommState=='closed'){
		P7_OMMopen(a.ommBox);
	}
	else{
		P7_OMMclose(a.ommBox);
	}
	return false;
}
function P7_OMMopen(dv){
	var i,x,tD;
	if(typeof(dv)=='object'){
		tD=dv;
	}
	else{
		tD=document.getElementById(dv);
	}
	if(!tD || tD.ommState=='open'){
		return;
	}
	P7_OMMshutall();
	if(tD.ommTrigger){
		P7_OMMsetClass(tD.ommTrigger,'open');
		tD.ommTrigger.ommState='open';
	}
	tD.ommState='open';
	P7_OMMsetClass(tD,'open');
	tD.ommScrollTop=P7_OMMscroll('get');
	P7_OMMsetFrames(tD,tD.ommPanels[tD.ommCurrentPanel-1],'on');
	P7_OMMoverlay(tD,'open');
	if(tD.p7opt[10]==1){
		P7_OMMfade(tD,5,100,tD.p7opt[2],'quad');
		tD.style.top=tD.ommScrollTop+'px';
	}
	else if(tD.p7opt[10]==2){
		x=(tD.offsetHeight*-1)+tD.ommScrollTop;
		tD.style.top=x+'px';
		P7_OMManimate(tD,'top','px',x,tD.ommScrollTop,tD.p7opt[2],'quad');
	}
	else{
		tD.style.top='0px';
		tD.style.top=tD.ommScrollTop+'px';
	}
	if(typeof(P7_TP3rsz)=='function'){
		P7_TP3rsz();
	}
	return false;
}
function P7_OMMclose(dv){
	var i,x,tD;
	if(typeof(dv)=='object'){
		tD=dv;
	}
	else{
		tD=document.getElementById(dv);
	}
	if(!tD || tD.ommState=='closed'){
		return;
	}
	if(tD.ommTrigger){
		P7_OMMremClass(tD.ommTrigger,'open');
		tD.ommTrigger.ommState='closed';
	}
	tD.ommState='closed';
	P7_OMMremClass(tD,'open');
	P7_OMMoverlay(tD,'close');
	P7_OMMscroll('set',tD.ommScrollTop);
	P7_OMMsetFrames(tD,tD.ommPanels[tD.ommCurrentPanel-1],'off');
	if(tD.p7opt[10]==1){
		P7_OMMfade(tD,100,0,tD.p7opt[2],'quad',function(){
			this.style.top='-9000px';
		}
		);
	}
	else if(tD.p7opt[10]==2){
		x=tD.offsetHeight*-1;
		P7_OMManimate(tD,'top','px',0,x,tD.p7opt[2],'quad',function(){
			this.style.top='-9000px';
		}
		);
	}
	else{
		tD.style.top='-9000px';
	}
	if(tD.p7opt[8]==1){
		P7_OMMpanelOpen(tD.ommTabs[tD.ommDefaultPanel-1]);
	}
	return false;
}
function P7_OMMsetFrames(tD,tP,ac){
	var t=(tD.p7opt[1]>0)?tD.p7opt[2]:0;
setTimeout(function(){
	P7_OMMframes(tP,ac);
}
,t+100);
}
function P7_OMMframes(tP,ac,fr){
	var tD;
	if(tP && tP.ommFrames && tP.ommFrames.length){
		for(var i=0;i<tP.ommFrames.length;i++){
			if(ac=='on'){
				tD=document.getElementById(tP.ommDiv);
				if(tD.ommState=='open'){
					tP.ommFrames[i].src=tP.ommFrames[i].ommSrc;
				}
			}
			else{
				tP.ommFrames[i].src='';
			}
		}
	}
}
function P7_OMMoverlay(el,ac){
	if(ac=='open'){
		if(el.p7opt[1]>0){
			P7_OMMfade(el.ommOv,5,100,el.p7opt[2],'quad');
			el.ommOv.style.top='0px';
		}
		else{
			el.ommOv.style.top='0px';
		}
	}
	else{
		if(el.p7opt[1]>0){
			P7_OMMfade(el.ommOv,100,0,el.p7opt[2],'quad',function(){
				this.style.top='-100%';
			}
			);
		}
		else{
			el.ommOv.style.top='-100%';
		}
	}
}
function P7_OMMshutall(){
	for(var j=0;j<p7OMM.boxes.length;j++){
		if(p7OMM.boxes[j].ommState=='open'){
			P7_OMMclose(p7OMM.boxes[j].id);
		}
	}
}
function P7_OMMcloseBox(evt){
	evt=(evt)?evt:event;
	var pp=(evt.fromElement)?evt.fromElement:evt.target;
	if(pp==this){
		if(this.ommDiv){
			P7_OMMclose(this.ommDiv);
		}
		else{
			P7_OMMclose(this);
		}
	}
}
function P7_OMMctrl(dv,ac,tr){
	return P7_OMMcontrol(dv,ac,tr);
}
function P7_OMMcontrol(dv,ac,tr){
	var i,tD;
	tD=document.getElementById(dv);
	if(ac=='closeBox'){
		P7_OMMclose(dv);
	}
	else if(ac=='openBox'){
		P7_OMMopen(dv);
	}
	else if(tr && tD.ommTabs[tr-1]){
		if(ac=='openPanel'){
			P7_OMMopen(dv);
			P7_OMMpanelOpen(tD.ommTabs[tr-1]);
		}
		else if(ac=='closePanel'){
			P7_OMMpanelClose(tD.ommTabs[tr-1]);
		}
	}
	return false;
}
function P7_OMMpanelTrig(a){
	var wH,m=false;
	wH=window.location.href;
	if(a.href!=wH && a.href!=wH+'#'){
		if(a.href.toLowerCase().indexOf('javascript:')==-1){
			m=true;
		}
	}
	if(m && a.ommPanel && a.ommState=='closed'){
		m=false;
	}
	if(a.ommState=='closed'){
		P7_OMMpanelOpen(a);
	}
	if(m){
		P7_OMMshutall();
	}
	return m;
}
function P7_OMMpanelOpen(a){
	var i,k,tD,op,tP,ph,pW,x,iM;
	if(a.ommState=='open'){
		return;
	}
	tD=document.getElementById(a.ommDiv);
	op=tD.p7opt[1];
	a.ommState='open';
	P7_OMMsetClass(a,'open');
	P7_OMMsetClass(a.parentNode,'open');
	if(op>0){
		pW=document.getElementById(tD.id.replace('_','pw_'));
		ph=pW.offsetHeight;
		pW.style.height=ph+'px';
	}
	P7_OMMpanelToggle(a);
	if(a.hasImg){
		iM=a.getElementsByTagName("IMG")[0];
		iM.p7state='open';
		iM.src=iM.p7imgswap[2];
	}
	if(a.ommPanel){
		tP=a.ommPanel;
		tD.ommCurrentPanel=a.ommPanelNum;
		P7_OMMsetClass(tP,'open');
		tP.style.visibility='hidden';
		tP.style.top='0px';
		tP.style.left='0px';
		tP.style.position='relative';
		if(op>0){
			P7_OMManimate(pW,'height','px',ph,tP.offsetHeight,500,'quad',function(){
				this.style.height='auto';
			}
			);
		}
		if(op==1){
			P7_OMMfade(tP,5,100,tD.p7opt[2],'quad');
		}
		else if(op==2){
			x=pW.offsetWidth;
			tP.style.left=x+'px';
			P7_OMManimate(tP,'left','px',x,0,tD.p7opt[2],'quad');
		}
		else if(op==3){
			x=100;
			tP.style[p7OMM.prf+'transition']='none';
			tP.offsetWidth = tP.offsetWidth;
			tP.style.left=x+'px';
			tP.style.opacity=0.1;
			tP.style.visibility='visible';
			tP.offsetWidth = tP.offsetWidth;
			tP.style[p7OMM.prf+'transition']='all '+tD.p7opt[2]+'ms ease-out';
			tP.style.left='0px';
			tP.style.opacity=1;
		}
		else{
			tP.style.visibility='visible';
		}
		P7_OMMsetFrames(tD,tP,'on');
	}
	else{
		if(op>0){
			P7_OMManimate(pW,'height','px',ph,0,500,'quad',function(){
				this.style.height='auto';
			}
			);
		}
		else{
			tP.style.visibility='visible';
		}
	}
}
function P7_OMMpanelClose(a){
	var i,k,tD,op,tP,pW,trsnd,iM;
	if(a.ommState=='closed'){
		return;
	}
	tD=document.getElementById(a.ommDiv);
	op=tD.p7opt[1];
	a.ommState='closed';
	P7_OMMremClass(a,'open');
	P7_OMMremClass(a.parentNode,'open');
	pW=document.getElementById(tD.id.replace('_','pw_'));
	if(a.hasImg){
		iM=a.getElementsByTagName("IMG")[0];
		iM.p7state='closed';
		iM.src=iM.p7imgswap[0];
	}
	if(a.ommPanel){
		tP=a.ommPanel;
		P7_OMMsetFrames(tD,tP,'off');
		P7_OMMremClass(tP,'open');
		tP.style.position='absolute';
		tP.style.width=pW.offsetWidth+'px';
		if(op==1){
			P7_OMMfade(tP,100,0,tD.p7opt[2],'quad',function(){
				P7_OMMpanelReset(tP);
			}
			);
		}
		else if(op==2){
			var x=pW.offsetWidth*-1;
			P7_OMManimate(tP,'left','px',0,x,tD.p7opt[2],'quad',function(){
				P7_OMMpanelReset(tP);
			}
			);
		}
		else if(op==3){
			x=-100;
			tP.style.left=x+'px';
			tP.style.opacity=0;
		}
		else{
			P7_OMMpanelReset(tP);
		}
	}
}
function P7_OMMpanelReset(el,v){
	if(el){
		if(v==1){
			el.style[p7OMM.prf+'transition']='none';
			el.offsetWidth = el.offsetWidth;
		}
		el.style.top='-9000px';
		el.style.left='-9000px';
		el.visibility='hidden';
		el.style.width='auto';
	}
}
function P7_OMMpanelToggle(a){
	var i,tD;
	if(typeof(a)=='object'){
		tD=document.getElementById(a.ommDiv);
	}
	else if(typeof(a)=='string'){
		tD=document.getElementById(a);
	}
	else{
		return;
	}
	for(i=0;i<tD.ommTabs.length;i++){
		if(tD.ommTabs[i] && tD.ommTabs[i] != a){
			if(tD.ommTabs[i].ommState!='closed'){
				P7_OMMpanelClose(tD.ommTabs[i]);
			}
		}
	}
}
function P7_OMMgetTime(st){
	var d = new Date();
	return d.getTime() - st;
}
function P7_OMManim(tp,t,b,c,d){
	if(tp=='quad'){
		if((t/=d/2)<1){
			return c/2*t*t+b;
		}
		else{
			return -c/2*((--t)*(t-2)-1)+b;
		}
	}
	else{
		return (c*(t/d))+b;
	}
}
function P7_OMMfade(ob,from,to,dur,typ,cb){
	if(ob.p7FadeRunning){
		clearInterval(ob.p7Fade);
		ob.p7FadeRunning=false;
	}
	typ=(!typ)?'quad':typ;
	ob.p7fadeType=typ;
	ob.p7StartFade=from;
	ob.p7FinishFade=to;
	ob.p7CurrentFade=ob.p7StartFade;
	if(ob.filters){
		ob.style.filter='alpha(opacity='+ob.p7CurrentFade+')';
	}
	else{
		ob.style.opacity=ob.p7CurrentFade/100;
	}
	ob.style.visibility='visible';
	ob.fadeStartTime=P7_OMMgetTime(0);
	ob.fadeDuration=dur;
	ob.p7FadeRunning=true;
ob.p7Fade=setInterval(function(){
	P7_OMMfader(ob,cb);
}
,p7OMM.animDelay);
}
function P7_OMMfader(el,cb){
	var i,tC,tA,op,et,cet,m=false;
	et=P7_OMMgetTime(el.fadeStartTime);
	if(et>=el.fadeDuration){
		et=el.fadeDuration;
		m=true;
	}
	if(el.p7CurrentFade!=el.p7FinishFade){
		op=P7_OMManim(el.p7fadeType,et,el.p7StartFade,el.p7FinishFade-el.p7StartFade,el.fadeDuration);
		el.p7CurrentFade=op;
		if(el.filters){
			el.style.filter='alpha(opacity='+el.p7CurrentFade+')';
		}
		else{
			el.style.opacity=el.p7CurrentFade/100;
		}
	}
	if(m){
		el.p7FadeRunning=false;
		clearInterval(el.p7Fade);
		if(cb && typeof(cb) === "function"){
			cb.call(el);
		}
	}
}
function P7_OMManimate(ob,prop,un,fv,tv,dur,typ,cb){
	if(ob.p7AnimRunning){
		ob.p7AnimRunning=false;
		clearInterval(ob.p7OMManim);
	}
	typ=(!typ)?'quad':typ;
	ob.p7animType=typ;
	ob.p7animProp=prop;
	ob.p7animUnit=un;
	ob.p7animStartVal=fv;
	ob.p7animCurrentVal=ob.p7animStartVal;
	ob.p7animFinishVal=tv;
	ob.style[ob.p7animProp]=ob.p7animCurrentVal+ob.p7animUnit;
	ob.style.visibility='visible';
	ob.p7animStartTime=P7_OMMgetTime(0);
	ob.p7animDuration=dur;
	if(!ob.p7AnimRunning){
		ob.p7AnimRunning=true;
ob.p7OMManim=setInterval(function(){
	P7_OMManimator(ob,cb);
}
, p7OMM.animDelay);
}
}
function P7_OMManimator(el,cb,op){
	var i,tB,tA,tS,et,nv,m=false;
	et=P7_OMMgetTime(el.p7animStartTime);
	if(et>=el.p7animDuration){
		et=el.p7animDuration;
		m=true;
	}
	if(el.p7animCurrentVal!=el.p7animFinishVal){
		nv=P7_OMManim(el.p7animType, et, el.p7animStartVal, el.p7animFinishVal-el.p7animStartVal, el.p7animDuration);
		el.p7animCurrentVal=nv;
		el.style[el.p7animProp]=nv+el.p7animUnit;
	}
	if(m){
		el.p7AnimRunning=false;
		clearInterval(el.p7OMManim);
		if(cb && typeof(cb) === "function"){
			cb.call(el);
		}
	}
}
function P7_OMMmark(){
	p7OMM.adv[p7OMM.adv.length]=arguments;
}
function P7_OMMcurrentMark(el){
	var j,i,x,wH,cm=false,mt=['',1,'',''],op,r1,k,kk,tA,aU,pp,tr,aT,aP,d,pn,im;
	wH=window.location.href;
	if(el.p7opt[5]!=1){
		wH=wH.replace(window.location.search,'');
	}
	if(wH.charAt(wH.length-1)=='#'){
		wH=wH.substring(0,wH.length-1);
	}
	for(k=0;k<p7OMM.adv.length;k++){
		if(p7OMM.adv[k][0]&&p7OMM.adv[k][0]==el.id){
			mt=p7OMM.adv[k];
			cm=true;
			break;
		}
	}
	op=mt[1];
	if(op<1){
		return;
	}
	r1=/index\.[\S]*/i;
	k=-1;
	kk=-1;
	tA=el.getElementsByTagName('A');
	for(j=0;j<tA.length;j++){
		aU=tA[j].href.replace(r1,'');
		if(op>0){
			if(tA[j].href==wH || aU==wH){
				k=j;
				kk=-1;
			}
		}
		if(op==2){
			if(tA[j].firstChild){
				if(tA[j].firstChild.nodeValue==mt[2]){
					kk=j;
				}
			}
		}
		if(op==3&&tA[j].href.indexOf(mt[2])>-1){
			kk=j;
		}
		if(op==4){
			for(x=2;x<mt.length;x+=2){
				if(wH.indexOf(mt[x])>-1){
					if(tA[j].firstChild&&tA[j].firstChild.nodeValue){
						if(tA[j].firstChild.nodeValue==mt[x+1]){
							kk=j;
						}
					}
				}
			}
		}
	}
	k=(kk>k)?kk:k;
	if(k>-1){
		if(tA[k].ommDiv){
			tr=tA[k];
		}
		else{
			P7_OMMsetClass(tA[k],'current_mark');
			pp=tA[k].parentNode;
			while (pp){
				if(pp.ommDiv && pp.id && pp.id.indexOf('p7OMMp')===0){
					if(pp.ommDiv==el.id){
						tr=pp.ommTab;
						if(tr){
							break;
						}
					}
				}
				pp=pp.parentNode;
			}
		}
		if(tr){
			P7_OMMsetClass(tr,'current_mark');
			P7_OMMsetClass(tr.parentNode,'current_mark');
			if(tr.hasImg){
				im=tr.getElementsByTagName('IMG')[0];
				im.mark=true;
				im.src=im.p7imgswap[2];
			}
			if(tr.ommPanelNum){
				el.ommDefaultPanel=tr.ommPanelNum;
			}
		}
	}
}
function P7_OMMurl(dv){
	var i,h,s,x,tB,d='omm',dd='omo',pn,n=dv.replace("p7OMM_",""),tr;
	if(document.getElementById){
		tB=document.getElementById(dv);
		h=document.location.search;
		if(h){
			h=h.replace('?','');
			s=h.split(/[=&]/g);
			if(s&&s.length){
				for(i=0;i<s.length;i+=2){
					if(s[i]==d || s[i]==dd){
						x=s[i+1];
						if(n!=x.charAt(0)){
							x=false;
						}
						if(x){
							pn='p7OMMtab'+x;
							tr=document.getElementById(pn);
							if(tr){
								if(tr.ommPanelNum){
									tB.ommDefaultPanel=tr.ommPanelNum;
									if(s[i]==dd){
										tB.ommAutoOpen=true;
									}
								}
							}
						}
					}
				}
			}
		}
		h=document.location.hash;
		if(h){
			x=h.substring(1,h.length);
			if(n!=x.charAt(3)){
				x=false;
			}
			if(x && (x.indexOf(d)===0 || x.indexOf(dd)===0)){
				pn='p7OMMtab'+x.substring(3);
				tr=document.getElementById(pn);
				if(tr){
					if(tr.ommPanelNum){
						tB.ommDefaultPanel=tr.ommPanelNum;
						if(x.indexOf(dd)===0){
							tB.ommAutoOpen=true;
						}
					}
				}
			}
		}
	}
}
function P7_OMMrsz(){
	var w=document.body.offsetWidth;
	var sw=document.body.scrollWidth;
	for(var j=0;j<p7OMM.boxes.length;j++){
		if((w+4)<sw){
			p7OMM.boxes[j].style.minWidth=sw+'px';
			if(/responsive/.test(p7OMM.boxes[j].className)){
				P7_OMMremClass(p7OMM.boxes[j],'responsive');
				p7OMM.boxes[j].ommResp=true;
			}
		}
		else{
			p7OMM.boxes[j].style.minWidth='0px';
			if(p7OMM.boxes[j].ommResp){
				P7_OMMsetClass(p7OMM.boxes[j],'responsive');
			}
		}
	}
}
function P7_OMMkey(evt){
	var k,tg,nn,m=true;
	evt=(evt)?evt:event;
	tg=(evt.target)?evt.target:evt.srcElement;
	nn=tg.nodeName.toLowerCase();
	if(!evt.altKey&&!evt.ctrlKey){
		if(nn!='input'&&nn!='textarea'){
			k=evt.keyCode;
			if(k==27 || (k==88&&typeof(opera)!='object')){
				P7_OMMshutall();
				m=false;
			}
		}
	}
	if(!m){
		if(evt.preventDefault){
			evt.preventDefault();
		}
	}
	return m;
}
function P7_OMMscroll(ac,nt){
	var st=0,bd;
	bd=document.body.parentNode;
	st=bd.scrollTop;
	if(!st){
		bd=document.body;
		st=bd.scrollTop;
		if(!st){
			bd=null;
			st=0;
		}
	}
	if(bd && ac=='set'){
		bd.scrollTop=nt;
	}
	return st;
}
function P7_OMMaddSheet(sh){
	var h,hd;
	h=document.createElement('style');
	h.type='text/css';
	h.appendChild(document.createTextNode(sh));
	hd=document.getElementsByTagName('head');
	hd[0].appendChild(h);
}
function P7_OMMgetIEver(){
	var j,v=-1,nv,m=false;
	nv=navigator.userAgent.toLowerCase();
	j=nv.indexOf("msie");
	if(j>-1){
		v=parseFloat(nv.substring(j+4,j+8));
		if(document.documentMode){
			v=document.documentMode;
		}
	}
	return v;
}
function P7_OMMgetCSSPre(){
	var i,dV,pre=['animationDuration','WebkitAnimationDuration'];
	var c='none',cssPre=['','-webkit-'];
	dV=document.createElement('div');
	for(i=0;i<pre.length;i++){
		if(dV.style[pre[i]]!==undefined){
			c=cssPre[i];
			break;
		}
	}
	p7OMMprf=c;
	return c;
}
function P7_OMMsetCC(dd,rp,ac){
	var d,tC;
	d=dd.replace('_',rp);
	tC=document.getElementById(d);
	if(tC){
		tC.onclick=function(){
			return P7_OMMcontrol(dd,ac);
		};
	}
	return tC;
}
function P7_OMMchangeClass(ob,clf,clt){
	if(ob){
		var cc,nc;
		cc=ob.className;
		if(cc&&cc.indexOf(clf>-1)){
			nc=cc.replace(clf,clt);
			ob.className=nc;
		}
		else{
			P7_OMMsetClass(ob,clt);
		}
	}
}
function P7_OMMsetClass(ob,cl){
	if(ob){
		var cc,nc,r=/\s+/g;
		cc=ob.className;
		nc=cl;
		if(cc&&cc.length>0){
			if(cc.indexOf(cl)==-1){
				nc=cc+' '+cl;
			}
			else{
				nc=cc;
			}
		}
		nc=nc.replace(r,' ');
		ob.className=nc;
	}
}
function P7_OMMremClass(ob,cl){
	if(ob){
		var cc,nc;
		cc=ob.className;
		if(cc&&cc.indexOf(cl>-1)){
			nc=cc.replace(cl,'');
			nc=nc.replace(/\s+/g,' ');
			nc=nc.replace(/\s$/,'');
			nc=nc.replace(/^\s/,'');
			ob.className=nc;
		}
	}
}
