// Copyright 2010 Greene Consulting All rights reserved.

//---------------   GLOBAL VARIABLES   ---------------

var helpDoc = MM.HELP_objMeta;

//---------------     API FUNCTIONS    ---------------

function hasFunctionCall() 
{
	dom = dreamweaver.getDocumentDOM("document");
	var myretVal=false;
	var allScripts = dom.getElementsByTagName("SCRIPT");
  
	for (var i=0; i<allScripts.length; i++) 
	{
		if (allScripts[i].innerHTML.search('window.onload=function')>=0) 
		{
			
			myretVal=true;
			break;
    		}
  	}
  	return myretVal;
}

function objectTag() {
  var Form = document.theForm;
  
  if(Form.group1[0].checked==true)
  		{
  		var Measurement = "px";
  		}
  	   else
  	   	{
  	   	var Measurement = "%";
  	   	}
 
  var cwidth = Form.width.value / 5;
    
  var retVal='\n'+
  
  	'<style type="text/css">\n'+
  	'  #beigetable {width: '+Form.width.value+''+Measurement+';}\n'+
  	'  #tralttd {width: '+cwidth+'px;}\n'+
	'</style>\n'+
	'<table align="center" cellpadding="6"cellspacing="0" id="beigetable">\n'+
	'  <tr id="trhdr">\n'+
	'    <td><b><div align="center">Header 1</div></b></td>\n'+
	'    <td><b><div align="center">Header 2</div></b></td>\n'+
	'    <td><b><div align="center">Header 3</div></b></td>\n'+
	'    <td><b><div align="center">Header 4</div></b></td>\n'+
	'    <td><b><div align="center">Header 5</div></b></td>\n'+
	'  </tr>\n'+
	'  <tr id="tralt">\n'+
	'    <td class="trhdralt">&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'  </tr>\n'+
	'  <tr id="tralt">\n'+
	'    <td class="trhdralt">&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'  </tr>\n'+
	'  <tr id="tralt">\n'+
	'    <td class="trhdralt">&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'  </tr>\n'+
	'  <tr id="tralt">\n'+
	'    <td class="trhdralt">&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'  </tr>\n'+
	'  <tr id="tralt">\n'+
	'    <td class="trhdralt">&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'  </tr>\n'+
	'  <tr id="tralt">\n'+
	'    <td class="trhdralt">&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'    <td>&nbsp;</td>\n'+
	'  </tr>\n'+
	'</table>\n';
	
	
	var assetArray = new Array();
	
	var tempObj = new Object();
	tempObj.srcURL = dw.getConfigurationPath() + "/Objects/Greene Custom/css/tt_beige_callout_table.css";
	tempObj.destURL = "tt_beige_callout_table.css";
	tempObj.refType = "link";
	tempObj.useDefaultFolder = true;
	assetArray.push(tempObj);
	
	dw.getDocumentDOM().copyAssets(assetArray);	
		
  return retVal;
}

//---------------    LOCAL FUNCTIONS   ---------------
function initializeUI(){
  document.theForm.width.focus();
}