// Copyright 2010 Greene Consulting All rights reserved.

//---------------   GLOBAL VARIABLES   ---------------

var helpDoc = MM.HELP_objMeta;

//---------------     API FUNCTIONS    ---------------

function objectTag() {
  var Form = document.theForm;
  var retVal='\n'+
  	'<table width="100%" >\n'+
	' <tr>\n'+
	'    <td><div align="right"><script language="JavaScript">loadFlashHeader(userCompany, parentFolder);</script></div></td>\n'+
	'  </tr>\n'+
	'  <tr>\n'+
	'    <td>&nbsp;</td>\n'+
	'  </tr>\n'+
	'  <tr>\n'+
	'   <td><blockquote>\n'+
	'      <h2>INSERT PAGE TITLE HERE </h2>\n'+
	'    </blockquote></td>\n'+
	'  </tr>\n'+
	'  <tr>\n'+
	'    <td><blockquote>\n'+
	'      <p>INSERT BODY HERE </p>\n'+
	'    </blockquote></td>\n'+
	'  </tr>\n'+
	'</table>'
  
  	var assetArray = new Array();
 	
  	var tempObj = new Object();
  	tempObj.srcURL = dw.getConfigurationPath() + "/Objects/Greene Custom/css/default.css";
  	tempObj.destURL = "default.css";
  	tempObj.refType = "link";
  	tempObj.useDefaultFolder = true;
  	assetArray.push(tempObj);
  	
  	dw.getDocumentDOM().copyAssets(assetArray);
  		
return retVal;
  
  
}

//---------------    LOCAL FUNCTIONS   ---------------