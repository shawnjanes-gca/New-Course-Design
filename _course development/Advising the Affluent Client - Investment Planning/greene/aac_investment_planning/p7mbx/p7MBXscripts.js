
/* 
 ================================================
 PVII Magic Box scripts
 Copyright (c) 2015-2016 Project Seven Development
 www.projectseven.com
 Version: 1.2.1 -build 20
 ================================================
 
*/

var p7MBX={
	ctl: [],
	once: false,
	body: null,
	prf: 'none',
	ie: false,
	active: false,
	overlay: null,
	currentShow: null,
	slideHeight: 0,
	boxAnimDuration: 400,
	swipeDuration: 400,
	animDelay: (1000/60),
	cntDefWidth: '80%',
	cntDefMaxWidth: '1280',
	urlOpen: false,
	autoCaptionFormat: ['* \\ **', 'Slide * of **', 'Image * of **', '* of **', 'Slide# *'],
	autoCaption: 0,
	urlSlide: 0
};
function P7_MBXset(){
	var h,hd,sh='',ie=P7_MBXgetIEver();
	if(!document.getElementById){
		return;
	}
	sh+='div.p7MBX {position:absolute;top: -9000px;left: -9000px;width: 100%;height: auto;background-color:transparent;z-index: 99999910;}\n';
	sh+='div.p7mbx-overlay {position:fixed;top:-100%;left:0;width:100%;height:100%;background-color:transparent;overflow:hidden;z-index: 99999905;opacity:0;}\n';
	sh+='div.p7mbx-list {display: none;}\n';
	sh+='div.p7mbx-toolbar {display: none;}\n';
	sh+='div.p7MBX.active .p7mbx-toolbar {display:block;}\n';
	sh+='div.p7mbx-slide-wrapper {position:relative;width:100%;padding:0;margin:0;z-index:99999915;}\n';
	sh+='div.mbx-slide-box {position:absolute;top:-9000px;left:-9000px;width:100%;margin:0;padding:0;border:none;z-index:99999935;visibility:hidden;}\n';
	sh+='div.mbx-slide-container {position:absolute;margin:0 auto;}\n';
	sh+='div.mbx-slide {position:relative;}\n';
	sh+='div.mbx-slide.mbx-image img {height:auto;width:auto;max-width:100%;}\n';
	sh+='.mbx-slide-box.current-slide {z-index:99999945;}\n';
	sh+='div.p7mbx-content {position:absolute;top:-9000px;left:-9000px;}\n';
	sh+='.p7mbx-pointer {touch-action: pan-y pinch-zoom;}\n';
	sh+='.p7mbx-ms-pointer {ms-touch-action: pan-y pinch-zoom;}\n';
	sh+='.mbx-slide-sw {position:relative;}\n';
	if(ie>5&&ie<9){
		sh+='div.p7MBX, div.p7MBX div, #p7MBXov {zoom: 100%;}\n';
		sh+='#p7MBXov.dark.p7mbx-overlay.transparency {background-color:#fff;}\n';
		sh+='#p7MBXov.light.p7mbx-overlay.transparency {background-color:#000;}\n';
	}
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
	p7MBX.prf=P7_MBXgetCSSPre();
}
P7_MBXset();
function P7_MBXbb(){
}
function P7_MBXaddLoad(){
	var ie=P7_MBXgetIEver();
	if(!document.getElementById || (ie>0&&ie<6)){
		return;
	}
	if(window.addEventListener){
		document.addEventListener("DOMContentLoaded", P7_MBXinit, false);
		window.addEventListener("load",P7_MBXinit,false);
		window.addEventListener("unload",P7_MBXbb,false);
		document.addEventListener("keydown",P7_MBXkey,false);
		window.addEventListener("resize",P7_MBXrsz,false);
	}
	else if(window.attachEvent){
		document.write("<script id=p7ie_mbx defer src=\"//:\"><\/script>");
		document.getElementById("p7ie_mbx").onreadystatechange=function(){
			if (this.readyState=="complete"){
				if(p7MBX.ctl.length>0){
					P7_MBXinit();
				}
			}
		};
		window.attachEvent("onload",P7_MBXinit);
		window.attachEvent("onunload",P7_MBXbb);
		document.attachEvent("onkeydown",P7_MBXkey);
		window.attachEvent("onresize",P7_MBXrsz);
	}
}
P7_MBXaddLoad();
function P7_MBXop(){
	if(!document.getElementById){
		return;
	}
	p7MBX.ctl[p7MBX.ctl.length]=arguments;
}
function P7_MBXinit(){
	var i,j,k,kj,tD,bx,el,tU,tA,tC,sW,ie,pli=0,cN,tR,cl,md,hs,num,sn,frms;
	if(p7MBX.ctl.length<1){
		return;
	}
	if(p7MBX.once){
		return;
	}
	p7MBX.once=true;
	p7MBX.body=document.body.parentNode;
	if(/KHTML|WebKit/i.test(navigator.userAgent) || P7_MBXgetIEver()==5 ){
		p7MBX.body=document.body;
	}
	document.p7mbxpre=[];
	ie=P7_MBXgetIEver();
	el=document.createElement('div');
	el.setAttribute('id','p7MBXov');
	el.setAttribute('class','p7mbx-overlay');
	document.getElementsByTagName('BODY')[0].appendChild(el);
	p7MBX.overlay=el;
	el.onclick=function(evt){
		evt=(evt)?evt:event;
		var pp=(evt.fromElement)?evt.fromElement:evt.target;
		if(pp==this){
			var d=p7MBX.currentShow;
			if(d && d.p7opt[17]==1){
				P7_MBXcloseBox();
			}
		}
	};
	for(j=0;j<p7MBX.ctl.length;j++){
		tD=document.getElementById(p7MBX.ctl[j][0]);
		if(tD){
			tD.p7opt=p7MBX.ctl[j];
			if(tD.p7opt[17]==1){
				P7_MBXsetCloser(tD);
			}
			if(p7MBX.prf=='none' && tD.p7opt[1]>2){
				tD.p7opt[1]=1;
			}
			if(tD.parentNode.nodeName!='BODY'){
				document.getElementsByTagName('BODY')[0].appendChild(tD);
			}
			el=document.createElement('div');
			el.setAttribute('id',tD.id.replace('_','ldg_'));
			el.className='p7mbx-loading';
			tD.mbxLoading=el;
			tD.appendChild(el);
			tD.mbxStatus='closed';
			tD.mbxBoxNum=parseInt(tD.id.replace('p7MBX_',''),10);
			P7_MBXremClass(tD,'p7MBXnoscript');
			sW=document.getElementById(tD.id.replace('_','sw_'));
			if(!sW){
				sW=document.createElement('div');
				sW.setAttribute('id',tD.id.replace('_','sw_'));
				sW.className='p7mbx-slide-wrapper';
				tD.appendChild(sW);
			}
			tD.mbxSW=sW;
			sW.mbxDiv=tD;
			if(tD.p7opt[17]==1){
				P7_MBXsetCloser(sW);
			}
			tD.mbxControls=[];
			tD.mbxSlides=[];
			tD.mbxCurrentSlideNum=0;
			tD.mbxPreviousSlideNum=1;
			tD.mbxNumPlays=1;
			tD.mbxDirection='right';
			tD.mbxShowMode='pause';
			tU=document.getElementById(tD.id.replace('_','list_'));
			tA=tU.getElementsByTagName('A');
			k=0;
			for(i=0;i<tA.length;i++){
				cl=tA[i].className;
				if(tA[i].parentNode.nodeName=="LI" && cl && (/mbx/.test(cl))){
					k++;
					tD.mbxSlides[k]=tA[i];
					tA[i].mbxDiv=tD.id;
					tA[i].mbxSlideNum=k;
					tD.mbxSlideNums=tD.mbxSlides.length-1;
					if(cl && (/mbx-image/.test(cl))){
						tA[i].mbxSlideType='image';
						document.p7mbxpre[pli]=new Image();
						document.p7mbxpre[pli].cmp=false;
						document.p7mbxpre[pli].mbxDiv=tD.id;
						tA[i].mbxPreIndex=pli;
						tA[i].mbxPreImage=document.p7mbxpre[pli];
						if(k<2){
							document.p7mbxpre[pli].src=tA[i].href;
						}
						pli++;
					}
					else if(cl && (/mbx-cnt/.test(cl))){
						tA[i].mbxSlideType='content';
						hs=tA[i].hash;
						el=null;
						if(hs && hs.length>1){
							el=document.getElementById(hs.substring(1));
						}
						if(el){
							tA[i].mbxContentDiv=el.id;
							frms=el.getElementsByTagName('IFRAME');
							if(frms && frms.length){
								tA[i].mbxFrames=[];
								for(kj=0;kj<frms.length;kj++){
									if(/video-wrapper/.test(frms[kj].parentNode.className)){
										tA[i].mbxFrames[kj]=frms[kj];
										frms[kj].mbxSrc=frms[kj].src;
										frms[kj].src='';
									}
								}
							}
						}
						else{
							tD.mbxSlides.pop();
							k--;
						}
					}
				}
			}
			tD.mbxControls[3]=P7_MBXsetCC(tD.id,'rp_','prev');
			tD.mbxControls[5]=P7_MBXsetCC(tD.id,'rn_','next');
			el=document.getElementById(tD.id.replace('_','rpp_'));
			if(el){
				el.p7state='pause';
				el.mbxDiv=tD.id;
				tD.mbxControls[4]=el;
				el.onclick=function(){
					var ac=(this.p7state=='play')?'pause':'play';
					P7_MBXcontrol(this.mbxDiv,ac);
					return false;
				};
				el.mbxSetButtonState=function(st){
					var tx;
					if(st=='play'){
						tx='Pause';
						P7_MBXremClass(this,'play');
					}
					else{
						tx='Play';
						P7_MBXsetClass(this,'play');
					}
					this.setAttribute('title',tx);
				};
			}
			el=document.getElementById(tD.id.replace('_','cl_'));
			if(el){
				el.onclick=function(){
					P7_MBXcloseBox();
					return false;
				};
			}
			if(tD.p7opt[15]==1){
				p7MBX.urlOpen = tD.id;
				p7MBX.urlSlide = tD.p7opt[3];
			}
			P7_MBXurl(tD.id);
		}
	}
	tR=P7_MBXgetElementsByClassName('p7mbx-trigger');
	if(tR && tR.length){
		for(i=0;i<tR.length;i++){
			num=parseInt(tR[i].getAttribute('data-mbx'),10);
			sn=parseInt(tR[i].getAttribute('data-mbx-slide'),10);
			tR[i].mbxDiv='p7MBX_'+num;
			tR[i].mbxTrigSlide=(sn)?sn:1;
			tR[i].onclick=function(){
				return P7_MBXshowSlide(this.mbxDiv, this.mbxTrigSlide);
			};
		}
	}
	if(p7MBX.urlOpen){
		P7_MBXshowSlide(p7MBX.urlOpen, p7MBX.urlSlide);
	}
}
function P7_MBXctrl(dv,ac){
	return P7_MBXcontrol(dv,ac);
}
function P7_MBXcontrol(dv,ac,bp,tch){
	var i,tD,cs,ts,op,sn,eI,eC,eD,tm=0,pauseOnAction,rs=false,m=false;
	tD=document.getElementById(dv);
	if(tD&&tD.mbxSlides){
		if(tD.mbxShowTimer){
			clearTimeout(tD.mbxShowTimer);
		}
		pauseOnAction=(tD.p7opt[8]==1)?true:false;
		cs=tD.mbxCurrentSlideNum;
		ts=tD.mbxSlideNums;
		if(ac=='pause'){
			P7_MBXpause(dv);
			return m;
		}
		if(ac=='close'){
			P7_MBXcloseBox();
			return m;
		}
		if(!bp && pauseOnAction){
			P7_MBXpause(dv);
			tD.mbxShowResume=false;
		}
		if(ac=='play'){
			tD.mbxShowMode='play';
			tD.mbxShowResume=false;
			if(tD.mbxControls[4]){
				tD.mbxControls[4].p7state='play';
				tD.mbxControls[4].mbxSetButtonState('play');
			}
			if(tD.mbxControls[7]){
				tD.mbxControls[7].p7state='play';
				tD.mbxControls[7].mbxSetButtonState('play');
			}
			ac='next';
			rs=true;
		}
		if(ac=='first'){
			tD.mbxDirection='left';
			sn=1;
		}
		else if(ac=='prev'){
			tD.mbxDirection='left';
			sn=cs-1;
			if(sn<1){
				sn=ts;
			}
		}
		else if(ac=='next'){
			sn=cs+1;
			tD.mbxDirection='right';
			if(tD.mbxShowMode=='play'){
				if(sn>ts){
					tD.mbxNumPlays++;
					if(tD.p7opt[6]>0 && tD.mbxNumPlays>tD.p7opt[6]){
						tD.mbxNumPlays=0;
						sn=(tD.p7opt[7]==1)?1:tD.mbxSlideNums;
						P7_MBXpause(tD.id);
					}
					else{
						sn=1;
					}
				}
			}
			else{
				if(sn>ts){
					sn=1;
				}
			}
		}
		else if(ac=='last'){
			tD.mbxDirection='right';
			sn=ts;
		}
		else{
			tD.mbxDirection='right';
			sn=ac;
		}
		sn=(sn<1)?1:sn;
		sn=(sn>tD.mbxSlideNums)?tD.mbxSlideNums:sn;
		if(sn==tD.mbxCurrentSlideNum&&bp!=1){
			return m;
		}
		if(rs){
			tm=100;
			setTimeout("P7_MBXshowSlide('"+tD.id+"',"+sn+","+bp+")",tm );
		}
		else{
			P7_MBXshowSlide(tD.id,sn,bp,tch);
		}
	}
	return false;
}
function P7_MBXpause(d){
	var cD,tD=document.getElementById(d);
	if(tD){
		tD.mbxShowMode='pause';
		if(tD.mbxShowTimer){
			clearTimeout(tD.mbxShowTimer);
		}
		if(tD.mbxControls[4]){
			tD.mbxControls[4].p7state='pause';
			tD.mbxControls[4].mbxSetButtonState('pause');
		}
		if(tD.mbxControls[7]){
			tD.mbxControls[7].p7state='pause';
			tD.mbxControls[7].mbxSetButtonState('pause');
		}
	}
}
function P7_MBXopenBox(dv){
	var tD;
	tD=document.getElementById(dv);
	if(p7MBX.currentShow != tD){
		if(p7MBX.currentShow){
			P7_MBXcloseBox();
		}
		p7MBX.currentShow=tD;
		p7MBX.overlay.className='p7mbx-overlay '+tD.className;
	}
	if(tD.mbxStatus!='open'){
		tD.mbxStatus='open';
		p7MBX.currentShow=tD;
		P7_MBXsetClass(document.getElementsByTagName('BODY')[0],'p7mbx-running');
		if(tD.p7opt[4]==1){
			tD.mbxShowMode='play';
			if(tD.mbxControls[4]){
				tD.mbxControls[4].p7state='play';
				tD.mbxControls[4].mbxSetButtonState('play');
			}
			if(tD.mbxControls[7]){
				tD.mbxControls[7].p7state='play';
				tD.mbxControls[7].mbxSetButtonState('play');
			}
		}
		P7_MBXoverlay(tD,'open');
		tD.style.top=p7MBX.body.scrollTop+'px';
		tD.style.left='0px';
		P7_MBXsetClass(tD,'active');
	}
}
function P7_MBXcloseBox(){
	var tD=p7MBX.currentShow;
	tD.mbxStatus='closed';
	P7_MBXremClass(document.getElementsByTagName('BODY')[0],'p7mbx-running');
	if(tD.mbxShowTimer){
		clearTimeout(tD.mbxShowTimer);
	}
	if(tD.mbxWait){
		clearTimeout(tD.mbxWait);
	}
	P7_MBXremClass(tD,'active');
	tD.mbxLoading.style.display='none';
	tD.style.left='-9000px';
	tD.style.top='-9000px';
	P7_MBXcloseSlide(tD.id,0,1);
	tD.mbxCurrentSlide=null;
	p7MBX.currentShow=null;
	tD.mbxCurrentSlideNum=0;
	P7_MBXoverlay(tD,'close');
}
function P7_MBXoverlay(el,ac){
	var s,oV=p7MBX.overlay,mx=(p7MBX.ie && p7MBX.ie < 9)?80:100;;
	if(ac=='open'){
		s=(el.p7opt[1]>0)?1:mx;
		P7_MBXfade(oV,s,mx,p7MBX.boxAnimDuration,'quad');
		oV.style.top='0px';
	}
	else{
		s=(el.p7opt[1]>0)?mx:0;
		P7_MBXfade(oV,s,0,p7MBX.boxAnimDuration,'quad',function(){
			this.style.top='-100%';
		}
		);
	}
}
function P7_MBXshowSlide(dv,sn,bp,tch){
	var i,tD,tA,sW,sB,iM,el,sL,aM,sC,cP,cN,cl,dD,tx,sLW,setLow;
	bp=(bp)?bp:null;
	tD=document.getElementById(dv);
	if(!tD.mbxSlides[sn]){
		return false;
	}
	P7_MBXopenBox(dv);
	if(tD.mbxCurrentSlideNum==sn && bp!=1){
		return false;
	}
	if(tD.mbxShowTimer){
		clearTimeout(tD.mbxShowTimer);
	}
	if(tD.mbxWait){
		clearTimeout(tD.mbxWait);
	}
	if(tD.mbxCurrentSlideNum!==0){
		tD.mbxPreviousSlideNum=tD.mbxCurrentSlideNum;
	}
	tD.mbxCurrentSlideNum=sn;
	tA=tD.mbxSlides[sn];
	setLow=true;
	if(tA.mbxBuiltSlide){
		P7_MBXdispA(tD.id,sn,tA.mbxBuiltSlide,bp,tch);
	}
	else{
		sB=document.createElement('div');
		sB.className='mbx-slide-box mbx-'+tA.mbxSlideType;
		if(tD.p7opt[17]==1){
			P7_MBXsetCloser(sB);
		}
		sB.mbxMode = tA.getAttribute('data-mbx-mode');
		if(sB.mbxMode=='fit'){
			sB.style.margin = '0px 0px';
		}
		else{
			sB.style.margin =tD.p7opt[10]+'px 0px';
		}
		sB.mbxSlideNum=sn;
		sB.mbxDiv=tD.id;
		sB.mbxMode = tA.getAttribute('data-mbx-mode');
		sC=document.createElement('div');
		sC.className='mbx-slide-container '+tA.className;
		sC.style.position='absolute';
		sB.mbxSC=sC;
		P7_MBXassignSwipe(sC,dv);
		sL=document.createElement('div');
		sL.className='mbx-slide '+tA.className;
		sC.mbxSlideType=tA.mbxSlideType;
		sC.mbxCaption=false;
		sC.mbxDesc=false;
		if(tD.p7opt[11]>0){
			tx=tA.innerHTML;
			if(tD.p7opt[16]==1){
				tx=p7MBX.autoCaptionFormat[p7MBX.autoCaption].replace('**',tD.mbxSlideNums);
				tx=tx.replace('*',sn);
			}
			if(tx && tx!='' && tx!=' '){
				cP=document.createElement('div');
				sC.mbxCaption=cP;
				cP.className='mbx-caption';
				cP.style.display='none';
				cP.innerHTML=tx;
			}
		}
		if(sC.mbxSlideType=='image'){
			cN=tA.parentNode.childNodes;
			for(var kk=0;kk<cN.length;kk++){
				cl=cN[kk].className;
				if(tD.p7opt[12]>0){
					if(cl && /mbx_desc/i.test(cl)){
						dD=document.createElement('div');
						sC.mbxDesc=dD;
						dD.className = 'mbx-description'+cl.replace('mbx_desc','');
						dD.style.display='none';
						P7_MBXcopyCN(dD,cN[kk]);
					}
				}
				if(cl && /mbx_link/i.test(cl)){
					el=cN[kk].getElementsByTagName('A');
					if(el && el[0]){
						tA.mbxLink=el[0];
					}
				}
			}
			aM=document.createElement('A');
			aM.className='p7mbx-image-link';
			if(tA.mbxLink){
				aM.setAttribute('href',tA.mbxLink.getAttribute('href'));
				aM.setAttribute('title',tA.mbxLink.innerHTML);
				if(tA.mbxLink.target && tA.mbxLink.target!==''){
					aM.setAttribute('target',tA.mbxLink.target);
				}
			}
			iM=document.createElement('IMG');
			iM.className='p7mbx-image';
			P7_MBXsetImage(iM);
			iM.mbxCnt=0;
			iM.src=tA.href;
			cl=tA.getAttribute('data-mbx-max-h');
			if(cl && cl !==''){
				iM.style.maxHeight=cl+'px';
			}
			iM.oncontextmenu=function(){
				return false;
			};
			aM.appendChild(iM);
			if(cP && (tD.p7opt[11]==1 || tD.p7opt[11]==3)){
				P7_MBXsetClass(cP,'caption-top');
				if(tD.p7opt[11]==3){
					P7_MBXsetClass(cP,'overlay');
				}
				sL.appendChild(cP);
				setLow=false;
			}
			if(dD && ( tD.p7opt[12]==1 || tD.p7opt[12]==3)){
				P7_MBXsetClass(dD,'description-top');
				if(tD.p7opt[12]==3){
					P7_MBXsetClass(dD,'overlay');
				}
				sL.appendChild(dD);
				setLow=false;
			}
			sLW=document.createElement('DIV');
			sLW.className='mbx-slide-sw';
			sC.mbxSlideDiv = sLW;
			if(tD.p7opt[13]==1){
				P7_MBXbuildPN(tD.id,sLW);
			}
			if(tD.p7opt[14]==1){
				P7_MBXbuildCB(tD.id,sL,setLow);
			}
			sLW.appendChild(aM);
			sL.appendChild(sLW);
			if(cP && (tD.p7opt[11]==2 || tD.p7opt[11]==4 )){
				P7_MBXsetClass(cP,'caption-bottom');
				if(tD.p7opt[11]==4){
					P7_MBXsetClass(cP,'overlay');
				}
				else{
					sC.mbxBottom=true;
				}
				sL.appendChild(cP);
			}
			if(dD && (tD.p7opt[12]==2 || tD.p7opt[12]==4)){
				P7_MBXsetClass(dD,'description-bottom');
				if(tD.p7opt[12]==4){
					P7_MBXsetClass(dD,'overlay');
				}
				else{
					sC.mbxBottom=true;
				}
				sL.appendChild(dD);
			}
			sC.appendChild(sL);
			sB.appendChild(sC);
			tD.mbxSW.appendChild(sB);
			sC.mbxImage=iM;
tD.mbxWait=setInterval(function(){
	P7_MBXloadImage(tD,sC,iM,sn,bp,tch);
}
,60);
}
else if(sC.mbxSlideType=='content'){
if(cP && (tD.p7opt[11]==1 || tD.p7opt[11]==3)){
	P7_MBXsetClass(cP,'caption-top');
	if(tD.p7opt[11]==3){
		P7_MBXsetClass(cP,'overlay');
	}
	sL.appendChild(cP);
	setLow=false;
}
sLW=document.createElement('DIV');
sLW.className='mbx-slide-sw';
if(tD.p7opt[13]==1){
	P7_MBXbuildPN(tD.id,sLW);
}
if(tD.p7opt[14]==1){
	P7_MBXbuildCB(tD.id,sL,setLow);
}
el=document.getElementById(tA.mbxContentDiv);
sLW.appendChild(el);
sL.appendChild(sLW);
P7_MBXremClass(el,'p7mbx-content');
P7_MBXsetClass(el,'p7mbx-content-slide');
if(cP && (tD.p7opt[11]==2 || tD.p7opt[11]==4 )){
	P7_MBXsetClass(cP,'caption-bottom');
	if(tD.p7opt[11]==4){
		P7_MBXsetClass(cP,'overlay');
	}
	sL.appendChild(cP);
}
sC.appendChild(sL);
sB.appendChild(sC);
tD.mbxSW.appendChild(sB);
if(tA.mbxFrames){
	sB.mbxFrames=tA.mbxFrames;
}
cl=tA.getAttribute('data-mbx-width');
if(!cl || cl===''){
	cl=p7MBX.cntDefWidth;
}
sC.style.width=cl;
cl=tA.getAttribute('data-mbx-max-w');
if(!cl || cl===''){
	cl=p7MBX.cntDefMaxWidth;
}
sC.style.maxWidth=cl+'px';
sC.mbxMaxWidth = cl;
if(sC.mbxCaption){
	sC.mbxCaption.style.display='block';
}
sC.style.position = 'relative';
P7_MBXdispA(dv,sn,sB,bp,tch);
}
}
return false;
}
function P7_MBXloadImage(tD,sC,im,sn,bp,tch){
	var sB,tA,cl;
	im.mbxCnt++;
	if(im.cmp && im.complete && im.height>10 && im.width > 10){
		clearTimeout(tD.mbxWait);
		if(im.p7Status=='load_error'){
			im.style.width='400px';
			im.style.height='400px';
		}
		else{
			tD.mbxLoading.style.display='none';
		}
		tA=tD.mbxSlides[sn];
		cl=tA.getAttribute('data-mbx-max-w');
		if(cl && cl !=='' && cl < sC.offsetWidth){
			sC.style.maxWidth = cl+'px';
			sC.mbxMaxWidth=cl;
		}
		else{
			sC.style.maxWidth = sC.offsetWidth+'px';
			sC.mbxMaxWidth = sC.offsetWidth;
		}
		sC.mbxImWidth= im.width;
		sC.mbxImHeight = im.height;
		sC.mbxHSpace = sC.mbxMaxWidth - im.width;
		sC.style.position = 'relative';
		if(sC.mbxCaption){
			sC.mbxCaption.style.display='block';
		}
		if(sC.mbxDesc){
			sC.mbxDesc.style.display='block';
		}
		sC.mbxTopSpace = Math.abs(sC.getBoundingClientRect().top - sC.mbxImage.getBoundingClientRect().top);
		P7_MBXdispA(tD.id,sn,sC.parentNode,bp,tch);
	}
	else{
		if(im.mbxCnt>3 || im.p7Status=='load_error'){
			tD.mbxLoading.style.display='block';
		}
	}
	if(im.mbxCnt>100 || im.p7Status=='load_error' && !im.cmp){
		im.cmp=true;
		im.complete=true;
		im.width=400;
		im.height=400;
	}
}
function P7_MBXsetImage(im){
	this.p7Status='';
	im.onload=function(){
		this.cmp=true;
	};
	im.onerror=function(){
		this.p7Status='load_error';
	};
}
function P7_MBXdispA(dv,sn,sB,bp,tch){
	var tA,tD,an,dur,sW,h,nh,x;
	tD=document.getElementById(dv);
	sW=tD.mbxSW;
	tA=tD.mbxSlides[sn];
	if(!tA.mbxBuiltSlide){
		if(tD.mbxCurrentSlideNum==sn){
			tA.mbxBuiltSlide=sB;
		}
	}
	if(tD.mbxCurrentSlideNum!=sn){
		return false;
	}
	tD.mbxCurrentSlide=sB;
	an=(bp && bp==1)?0:tD.p7opt[1];
	dur=tD.p7opt[2];
	sB.mbxState='current';
	P7_MBXsetClass(sB,'current-slide');
	if(tch){
		an=2;
		dur=p7MBX.swipeDuration;
	}
	if(an>0){
		h = p7MBX.slideHeight;
		nh = sB.offsetHeight+tD.p7opt[10];
		if(sB.mbxMode=='fit'){
			nh = p7MBX.overlay.offsetHeight;
		}
		if( nh>h){
			h=nh;
		}
		p7MBX.slideHeight=h;
		sW.style.height=h+'px';
		sW.style.overflow='hidden';
	}
	if(tD.mbxPreviousSlideNum != sn){
		P7_MBXcloseSlide(dv,tD.mbxPreviousSlideNum,0,tch);
	}
	if(sB.mbxMode=='fit'){
		P7_MBXresizer(tD,sB);
	}
	if(an==1){
		sB.style.left='0px';
		sB.style.top='0px';
		P7_MBXfade(sB,5,100,dur,'quad',function(){
			P7_MBXdispB(this);
		}
		);
		P7_MBXdispFin(dv,sn,bp);
	}
	else if(an==2){
		x=sW.offsetWidth;
		if(sB.filters){
			sB.style.filter='';
		}
		else{
			sB.style.opacity=1;
		}
		if(tD.mbxDirection=='left'){
			x=x*-1;
		}
		sB.style.top='0px';
		sB.style.left=x+'px';
		P7_MBXanimate(sB,'left','px',x,0,dur,'quad',function(){
			P7_MBXdispB(this);
		}
		);
		P7_MBXdispFin(dv,sn,bp);
	}
	else if(an==3){
		x=100;
		if(tD.mbxDirection=='left'){
			x=x*-1;
		}
		sB.style.opacity=0;
		sB.style.left=x+'px';
		sB.style.top='0px';
		sB.style.visibility='visible';
		sB.offsetWidth = sB.offsetWidth;
		sB.style[p7MBX.prf+'transition']='all '+dur+'ms ease-out';
		if(sB.mbxAnimB){
			clearTimeout(sB.mbxAnimB);
		}
sB.mbxAnimB=setTimeout(function(){
	P7_MBXdispB(sB);
}
,dur);
sB.style.left='0px';
sB.style.opacity=1;
P7_MBXdispFin(dv,sn,bp);
}
else if(an==4){
sB.style[p7MBX.prf+'transform']='scale(0.1)';
sB.style.opacity=1;
sB.style.left='0px';
sB.style.top='0px';
sB.style.visibility='visible';
sB.offsetWidth = sB.offsetWidth;
sB.style[p7MBX.prf+'transition']=p7MBX.prf+'transform '+dur+'ms linear';
if(sB.mbxAnimB){
	clearTimeout(sB.mbxAnimB);
}
sB.mbxAnimB=setTimeout(function(){
	P7_MBXdispB(sB);
}
,dur);
sB.style[p7MBX.prf+'transform']='scale(1)';
P7_MBXdispFin(dv,sn,bp);
}
else{
sB.style.left='0px';
sB.style.top='0px';
sB.style.position='relative';
sB.style.visibility='visible';
if(sB.mbxFrames){
	P7_MBXframes(sB,'on');
}
P7_MBXdispFin(dv,sn,bp);
}
}
function P7_MBXdispB(sB){
	var tD;
	tD=document.getElementById(sB.mbxDiv);
	if(tD.p7opt[1]>0){
		sB.style[p7MBX.prf+'transition']=null;
		sB.style[p7MBX.prf+'transform']=null;
		if(sB.filters){
			sB.style.filter='';
		}
		else{
			sB.style.opacity=1;
		}
	}
	if(sB.mbxSlideNum != tD.mbxCurrentSlideNum){
		if(sB.mbxState != 'closed'){
			P7_MBXcloseSlideBox(tD.id,sB);
		}
		return;
	}
	sB.style.position='relative';
	tD.mbxSW.style.height='auto';
	tD.mbxSW.style.overflow='visible';
	if(sB.mbxFrames){
		P7_MBXframes(sB,'on');
	}
}
function P7_MBXcloseSlide(dv,sn,bp,tch){
	var tD,sB,an,dur,x;
	bp=(bp)?bp:null;
	tD=document.getElementById(dv);
	if(sn>0){
		sB=tD.mbxSlides[sn].mbxBuiltSlide;
	}
	else{
		sB=tD.mbxCurrentSlide;
	}
	if(!sB){
		return;
	}
	an=tD.p7opt[1];
	dur=tD.p7opt[2];
	sB.mbxState='closed';
	P7_MBXremClass(sB,'current-slide');
	if(tch && bp!=1){
		an=2;
		dur=p7MBX.swipeDuration;
	}
	if(sB.mbxFrames){
		P7_MBXframes(sB,'off');
	}
	if(an==1){
		sB.style.position='absolute';
		P7_MBXfade(sB,100,0,dur,'quad',function(){
			P7_MBXcloseSlideBox(dv,sB);
		}
		);
	}
	else if(an==2){
		x=tD.mbxSW.offsetWidth*-1;
		if(tD.mbxDirection=='left'){
			x=x*-1;
		}
		sB.style.top='0px';
		sB.style.left=x+'px';
		P7_MBXanimate(sB,'left','px',0,x,dur,'quad',function(){
			P7_MBXcloseSlideBox(dv,sB);
		}
		);
		P7_MBXdispFin(dv,sn,bp);
	}
	else if(an==3){
		x=-100;
		if(tD.mbxDirection=='left'){
			x=x*-1;
		}
		sB.offsetWidth = sB.offsetWidth;
		sB.style[p7MBX.prf+'transition']='all '+dur+'ms ease-out';
		if(sB.mbxAnimB){
			clearTimeout(sB.mbxAnimB);
		}
sB.mbxAnimB=setTimeout(function(){
	P7_MBXcloseSlideBox(dv,sB);
}
,dur);
sB.style.left=x+'px';
sB.style.opacity=0;
}
else if(an==4){
sB.offsetWidth = sB.offsetWidth;
sB.style[p7MBX.prf+'transition']='all '+dur+'ms ease-out';
if(sB.mbxAnimB){
	clearTimeout(sB.mbxAnimB);
}
sB.mbxAnimB=setTimeout(function(){
	P7_MBXcloseSlideBox(dv,sB);
}
,dur);
sB.style.opacity=0;
}
else{
sB.style.left='-9000px';
sB.style.top='-9000px';
sB.style.position='absolute';
sB.style.visibility='hidden';
}
}
function P7_MBXcloseSlideBox(dv,sB){
	var tD;
	tD=document.getElementById(dv);
	sB.mbxState='closed';
	P7_MBXremClass(sB,'current-slide');
	if(tD.p7opt[1]>0 && p7MBX.prf!='none'){
		sB.style[p7MBX.prf+'transition']=null;
		sB.style[p7MBX.prf+'transform']=null;
		if(sB.filters){
			sB.style.filter='';
		}
		else{
			sB.style.opacity=1;
		}
		sB.offsetWidth=sB.offsetWidth;
	}
	sB.style.left='-9000px';
	sB.style.top='-9000px';
	sB.style.position='absolute';
	sB.style.visibility='hidden';
}
function P7_MBXdispFin(dv,sn,bp){
	var tD,ns,tA,tm,sB;
	tD=document.getElementById(dv);
	if(tD.mbxCurrentSlideNum!=sn){
		return false;
	}
	tm=tD.p7opt[5]*1000;
	ns=tD.mbxCurrentSlideNum+1;
	ns=(ns<=tD.mbxSlides.length-1)?ns:1;
	tA=tD.mbxSlides[ns];
	if(tA.mbxSlideType=='image'){
		if(!tA.mbxPreImage.cmp){
			tA.mbxPreImage.src=tA.href;
		}
	}
	if(tD.mbxShowMode=='play'){
		tD.mbxShowMode='play';
		tD.mbxShowResume=false;
		if(tD.mbxShowTimer){
			clearTimeout(tD.mbxShowTimer);
		}
		tD.mbxShowTimer=setTimeout("P7_MBXcontrol('"+tD.id+"','next',2)",tm);
	}
}
function P7_MBXframes(sB,ac){
	var i,tD;
	if(sB && sB.mbxFrames && sB.mbxFrames.length){
		for(i=0;i<sB.mbxFrames.length;i++){
			if(ac=='on'){
				tD=document.getElementById(sB.mbxDiv);
				if(tD.mbxStatus=='open'){
					sB.mbxFrames[i].src=sB.mbxFrames[i].mbxSrc;
				}
			}
			else{
				sB.mbxFrames[i].src='';
			}
		}
	}
}
function P7_MBXgetTime(st){
	var d = new Date();
	return d.getTime() - st;
}
function P7_MBXanim(tp,t,b,c,d){
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
function P7_MBXanimate(ob,prop,un,fv,tv,dur,typ,cb){
	if(ob.p7AnimRunning){
		ob.p7AnimRunning=false;
		clearInterval(ob.p7MBXanim);
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
	ob.p7animStartTime=P7_MBXgetTime(0);
	ob.p7animDuration=dur;
	if(!ob.p7AnimRunning){
		ob.p7AnimRunning=true;
ob.p7MBXanim=setInterval(function(){
	P7_MBXanimator(ob,cb);
}
, p7MBX.animDelay);
}
}
function P7_MBXanimator(el,cb,op){
	var i,tB,tA,tS,et,nv,m=false;
	et=P7_MBXgetTime(el.p7animStartTime);
	if(et>=el.p7animDuration){
		et=el.p7animDuration;
		m=true;
	}
	if(el.p7animCurrentVal!=el.p7animFinishVal){
		nv=P7_MBXanim(el.p7animType, et, el.p7animStartVal, el.p7animFinishVal-el.p7animStartVal, el.p7animDuration);
		el.p7animCurrentVal=nv;
		el.style[el.p7animProp]=nv+el.p7animUnit;
	}
	if(m){
		el.p7AnimRunning=false;
		clearInterval(el.p7MBXanim);
		if(cb && typeof(cb) === "function"){
			cb.call(el);
		}
	}
}
function P7_MBXfade(ob,from,to,dur,typ,cb){
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
	ob.fadeStartTime=P7_MBXgetTime(0);
	ob.fadeDuration=dur;
	ob.p7FadeRunning=true;
ob.p7Fade=setInterval(function(){
	P7_MBXfader(ob,cb);
}
,p7MBX.animDelay);
}
function P7_MBXfader(el,cb){
	var i,tC,tA,op,et,cet,m=false;
	et=P7_MBXgetTime(el.fadeStartTime);
	if(et>=el.fadeDuration){
		et=el.fadeDuration;
		m=true;
	}
	if(el.p7CurrentFade!=el.p7FinishFade){
		op=P7_MBXanim(el.p7fadeType,et,el.p7StartFade,el.p7FinishFade-el.p7StartFade,el.fadeDuration);
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
function P7_MBXrsz(bp){
	if(p7MBX.currentShow){
		P7_MBXresizer(p7MBX.currentShow);
	}
}
function P7_MBXresizer(tD,sB){
	var sC,sD,w,h,wh,ww,iw,ih,nl,nt,pb,bf=20,nw,nh,pw,df,btm;
	if(!tD){
		return;
	}
	if(!sB || sB===null){
		sB = tD.mbxCurrentSlide;
	}
	if(!sB){
		return;
	}
	sC=sB.mbxSC;
	if(sB.mbxMode == 'fit' && sC.mbxSlideType=='image'){
		wh=p7MBX.overlay.offsetHeight;
		wh-= (bf*2);
		ww=p7MBX.overlay.offsetWidth;
		ww-= (bf*2);
		iw=sC.mbxImWidth;
		ih=sC.mbxImHeight;
		pw = sC.mbxMaxWidth;
		if(ww < pw){
			pw = ww;
		}
		nw = pw - sC.mbxHSpace;
		nh = ih * ( nw / iw );
		btm=(sC.mbxBottom)?20:0;
		pb = sC.mbxTopSpace + nh + btm;
		if(pb >= wh){
			df = pb - wh;
			nh = nh - df;
			nw = iw * (nh / ih);
			pw = nw + sC.mbxHSpace;
		}
		sC.style.width = pw+'px';
		nl= (ww-pw)/2;
		nt = (wh+(bf*2)-sC.offsetHeight)/2;
		nt=(nt<bf)?bf:nt;
		sC.style.top=nt+'px';
	}
}
var p7MBXtch={
	el: null,
	fCnt: 0,
	startX: 0,
	curX: 0,
	curY: 0
};
function P7_MBXtchStart(evt){
	if(evt.pointerType){
		p7MBXtch.fCnt=1;
		p7MBXtch.startX=evt.clientX;
		p7MBXtch.startY=evt.clientY;
		if(!p7MBXtch.el){
			p7MBXtch.el=this;
		}
	}
	else if(evt.touches.length==1){
		p7MBXtch.fCnt=evt.touches.length;
		p7MBXtch.startX=evt.touches[0].pageX;
		p7MBXtch.startY=evt.touches[0].pageY;
		if(!p7MBXtch.el){
			p7MBXtch.el=this;
		}
	}
	else{
		P7_MBXtchCancel(evt);
	}
}
function P7_MBXtchMove(evt){
	var x;
	if(p7MBXtch.startX!==0){
		if(evt.pointerType){
			x=Math.abs(evt.clientX-p7MBXtch.startX);
			if(x>4 || navigator.maxTouchPoints || navigator.msMaxTouchPoints){
				evt.stopPropagation();
				evt.preventDefault();
				p7MBXtch.curX=evt.clientX;
				p7MBXtch.curY=evt.clientY;
			}
			else{
				P7_MBXtchCancel(evt);
			}
		}
		else if(evt.touches.length==1){
			x=Math.abs(evt.touches[0].pageX-p7MBXtch.startX);
			if(x>4){
				evt.stopPropagation();
				evt.preventDefault();
				p7MBXtch.curX=evt.touches[0].pageX;
				p7MBXtch.curY=evt.touches[0].pageY;
			}
			else{
				P7_MBXtchCancel(evt);
			}
		}
		else{
			P7_MBXtchCancel(evt);
		}
	}
	else{
		P7_MBXtchCancel(evt);
	}
}
function P7_MBXtchEnd(evt){
	var swl,swa,swd,x,y,z,r;
	if(p7MBXtch.fCnt==1 && p7MBXtch.curX!==0){
		evt.preventDefault();
		swl=Math.round(Math.sqrt(Math.pow(p7MBXtch.curX - p7MBXtch.startX,2) + Math.pow(p7MBXtch.curY - p7MBXtch.startY,2)));
		if(swl>=72){
			x=p7MBXtch.startX-p7MBXtch.curX;
			y=p7MBXtch.curY-p7MBXtch.startY;
			r=Math.atan2(y,x);
			swa=Math.round(r*180/Math.PI);
			if(swa<0){
				swa=360-Math.abs(swa);
			}
			if((swa<=45)&&(swa>=0)){
				swd='left';
			}
			else if((swa<=360)&&(swa>=315)){
				swd='left';
			}
			else if((swa>=135)&&(swa<=225)){
				swd='right';
			}
			else if((swa>45)&&(swa<135)){
				swd='down';
			}
			else{
				swd='up';
			}
			p7MBXtch.el.onSwiped(swd);
			P7_MBXtchCancel(evt);
		}
		else{
			P7_MBXtchCancel(evt);
		}
	}
	else{
		P7_MBXtchCancel(evt);
	}
}
function P7_MBXtchCancel(evt){
	p7MBXtch.fCnt=0;
	p7MBXtch.startX=0;
	p7MBXtch.startY=0;
	p7MBXtch.curX=0;
	p7MBXtch.curY=0;
	p7MBXtch.el=null;
}
function P7_MBXbindSwipe(ob,fn){
	if(ob.addEventListener){
		ob.onSwiped=fn;
		if(navigator.maxTouchPoints){
			ob.addEventListener('pointerdown',P7_MBXtchStart,false);
			ob.addEventListener('pointerup',P7_MBXtchEnd,false);
			ob.addEventListener('pointermove',P7_MBXtchMove,false);
			P7_MBXsetClass(ob,'p7mbx-pointer');
		}
		else if(navigator.msMaxTouchPoints){
			ob.addEventListener('MSPointerDown',P7_MBXtchStart,false);
			ob.addEventListener('MSPointerUp',P7_MBXtchEnd,false);
			ob.addEventListener('MSPointerMove',P7_MBXtchMove,false);
			P7_MBXsetClass(ob,'p7mbx-ms-pointer');
		}
		else{
			ob.addEventListener('touchstart',P7_MBXtchStart,false);
			ob.addEventListener('touchend',P7_MBXtchEnd,false);
			ob.addEventListener('touchmove',P7_MBXtchMove,false);
			ob.addEventListener('touchcancel',P7_MBXtchCancel,false);
		}
	}
}
function P7_MBXassignSwipe(el,dv){
	P7_MBXbindSwipe(el,function(dir){
		if(dir=='left'){
			P7_MBXcontrol(dv,'next',null,true);
		}
		else if(dir=='right'){
			P7_MBXcontrol(dv,'prev',null,true);
		}
	}
	);
}
function P7_MBXurl(dv){
	var i,h,s,x,k,d='mbx',pn,tD,n=dv.replace('p7MBX_','');
	tD=document.getElementById(dv);
	h=document.location.search;
	if(h){
		h=h.replace('?','');
		s=h.split(/[=&]/g);
		if(s&&s.length){
			for(i=0;i<s.length;i+=2){
				if(s[i]==d){
					x=s[i+1];
					if(n!=x.charAt(0)){
						x=false;
					}
					if(x&&x.length>2){
						p7MBX.urlOpen = tD.id;
						p7MBX.urlSlide = P7_MBXparsePN(x);
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
		if(x&&x.indexOf(d)===0&&x.length>5){
			p7MBX.urlOpen = tD.id;
			p7MBX.urlSlide = P7_MBXparsePN(x);
		}
	}
}
function P7_MBXparsePN(d){
	var x=d.lastIndexOf('_');
	return parseInt(d.substr(x+1),10);
}
function P7_MBXkey(evt){
	var dv,k,tg,nn,ac,m=true;
	if(!p7MBX.currentShow){
		return;
	}
	else{
		dv=p7MBX.currentShow.id;
	}
	evt=(evt)?evt:event;
	tg=(evt.target)?evt.target:evt.srcElement;
	nn=tg.nodeName.toLowerCase();
	if(!evt.altKey&&!evt.ctrlKey){
		if(nn!='input'&&nn!='textarea'){
			k=evt.keyCode;
			if(k==27 || (k==88&&typeof(opera)!='object')){
				P7_MBXcloseBox();
				m=false;
			}
			else if(k==33||k==37||k==109 || k==32&&evt.shiftKey){
				P7_MBXcontrol(dv,'prev');
				m=false;
			}
			else if(k==34||k==39||k==107||k==32){
				P7_MBXcontrol(dv,'next');
				m=false;
			}
			else if(k==35){
				P7_MBXcontrol(dv,'last');
				m=false;
			}
			else if(k==36){
				P7_MBXcontrol(dv,'first');
				m=false;
			}
			else if(k==80){
				if(p7MBX.currentShow.mbxShowMode){
					ac=(p7MBX.currentShow.mbxShowMode=='play')?'pause':'play';
					P7_MBXcontrol(dv,ac);
					m=false;
				}
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
function P7_MBXsetCloser(el){
	el.onclick=function(evt){
		evt=(evt)?evt:event;
		var pp=(evt.fromElement)?evt.fromElement:evt.target;
		if(pp==this){
			P7_MBXcloseBox();
			evt.stopPropagation();
		}
	};
}
function P7_MBXsetClass(ob,cl){
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
function P7_MBXsetCC(dd,rp,ac){
	var d,tC;
	d=dd.replace('_',rp);
	tC=document.getElementById(d);
	if(tC){
		tC.onclick=function(){
			return P7_MBXcontrol(dd,ac);
		};
	}
	return tC;
}
function P7_MBXbuildPN(dv,sC){
	var pD,el,a;
	pD=document.createElement('DIV');
	pD.className='p7mbx-arrows';
	el=document.createElement('DIV');
	el.className='arrow-left';
	a=document.createElement('A');
	a.href="#";
	a.innerHTML='&lsaquo;';
	a.onclick=function(){
		return P7_MBXcontrol(dv,'prev');
	};
	el.appendChild(a);
	pD.appendChild(el);
	el=document.createElement('DIV');
	el.className='arrow-right';
	a=document.createElement('A');
	a.href="#";
	a.innerHTML='&rsaquo;';
	a.onclick=function(){
		return P7_MBXcontrol(dv,'next');
	};
	el.appendChild(a);
	pD.appendChild(el);
	sC.appendChild(pD);
}
function P7_MBXbuildCB(dv,pn,setLow){
	var cB,a;
	cB=document.createElement('DIV');
	cB.className='p7mbx-ex';
	if(setLow){
		cB.className='p7mbx-ex set-low';
	}
	else{
		cB.className='p7mbx-ex';
	}
	a=document.createElement('A');
	a.href="#";
	a.innerHTML='&nbsp;';
	a.onclick=function(){
		P7_MBXcloseBox();
		return false;
	};
	cB.appendChild(a);
	pn.appendChild(cB);
}
function P7_MBXgetElementsByClassName(cls){
	var i,x=0,aL,aT,rS=[];
	if(typeof(document.getElementsByClassName)!='function'){
		aL=document.getElementsByTagName('*');
		for(i=0;i<aL.length;i++){
			aT=aL[i].className;
			if(aT && aT.indexOf(cls)>-1){
				rS[x]=aL[i];
				x++;
			}
		}
	}
	else{
		rS=document.getElementsByClassName(cls);
	}
	return rS;
}
function P7_MBXremClass(ob,cl){
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
function P7_MBXgetDim(el,d){
	var b,x;
	b=el.getBoundingClientRect();
	if(d=='height'){
		x=b.bottom-b.top;
	}
	else if(d=='width'){
		x=b.right-b.left;
	}
	return x;
}
function P7_MBXgetCSSPre(){
	var i,dV,pre=['animationDuration','WebkitAnimationDuration'];
	var c='none',cssPre=['','-webkit-'];
	dV=document.createElement('div');
	for(i=0;i<pre.length;i++){
		if(dV.style[pre[i]]!==undefined){
			c=cssPre[i];
			break;
		}
	}
	p7MBXprf=c;
	return c;
}
function P7_MBXcopyCN(tD,tS){
	while(tS.childNodes.length>0){
		tD.appendChild(tS.childNodes[0]);
	}
}
function P7_MBXgetIEver(){
	var j,v=-1,nv,m=false;
	nv=navigator.userAgent.toLowerCase();
	j=nv.indexOf("msie");
	if(j>-1){
		v=parseFloat(nv.substring(j+4,j+8));
		if(document.documentMode){
			v=document.documentMode;
		}
		p7MBX.ie=v;
	}
	return v;
}
