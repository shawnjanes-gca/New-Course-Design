// Copyright 2010 Greene Consulting All rights reserved.

//---------------   GLOBAL VARIABLES   ---------------

var helpDoc = MM.HELP_objMeta;

var widgetno = 0;

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

function trimpath(path)
{
	if(path.indexOf("/")==0)
	{
		path = path.substring(1, path.length);
		return path;

	}
	else
	{
		return path;
	}
}

function objectTag() 
{
	dom = dreamweaver.getDocumentDOM("document");
	
	var defaultAssetFolder = dom.getDefaultAssetFolder();
	var pathtoassets = trimpath(dom.localPathToSiteRelative(defaultAssetFolder));
	
	if (widgetno == 0)
	  widgetno = 1;
	else if (widgetno > 0)
	  widgetno++;
	
	retVal="";
	var Form = document.theForm;
	
	retVal="";
	var Form = document.theForm;
	
	alert("The new Widget Number is: " +widgetno);
	
	
	if (Form.group1[0].checked==true)
		{
		var Alignment = "left";
		}
	else if (Form.group1[1].checked==true)
		{
		var Alignment = "center";
		}
	else if (Form.group1[2].checked==true)
		{
		var Alignment = "right";
		}
	else 
		{
		var Alignment = "default";
		}
	
	if (Form.group2[0].checked==true)
		{
		var css = "p7EPM05";
		}
	else if (Form.group2[1].checked==true)
		{
		var css = "p7EPM06";
		}
	else
		{
		var css = "p7EPM07";
		}
	
  	if(Form.group3[0].checked==true)
  		{
  		var Measurement = "";
  		}
  	   else
  	   	{
  	   	var Measurement = "%";
  	   	}


	retVal = retVal + '<table width="'+Form.width.value+'" align="'+Alignment+'"border="0" cellspacing="0" cellpadding="6">\n'+
'        <tr>\n'+
'          <td><div id="p7EPM_'+widgetno+'" class="'+css+'">\n'+
'            <div id="p7EPMt_'+widgetno+'" class="p7epm_trigs">\n'+
'              <ul>\n'+
'                <table width="'+Form.width.value+'" border="0" cellspacing="0" cellpadding="0">\n'+
'                  <tr>\n'+
'                    <td width="77">\n'+
'                    <ul><div align="center"><a href="#p7EPMc'+widgetno+'_1" id="p7EPMtrg'+widgetno+'_1" onfocus="if(this.blur)this.blur()"><img src="'+pathtoassets+'DocumentIcon.gif" alt="" width="33" height="33" border="0" /></a> </div></ul></td>\n'+
'                    <td width="604" valign="middle"><div align="left"><p class="instructions">Click the icon to view  example questions.</p></div></td>\n'+
'                  </tr>\n'+
'                </table>\n'+
'                <li class="t1"></li></ul>\n'+
'              <div class="p7epm_ie5clear">&nbsp;</div>\n'+
'            </div>\n'+
'            <div id="p7EPMdw_'+widgetno+'">\n'+
'              <div id="p7EPMw'+widgetno+'_1" class="p7epm_cwrapper">\n'+
'                <div id="p7EPMc'+widgetno+'_1" class="p7epm_content pan1">\n'+
'                  <p><b>Section Title</b></p>\n'+
'                  <div>\n'+
'                <div>Section Body</div>\n'+
'                      </div>\n'+
'                </div>\n'+
'              </div>\n'+
'            </div>\n'+
'            <!--[if IE 5]><style>.p7epm_trigs a {height: 1%;}.p7epm_ie5clear {clear: both;}</style><![endif]-->\n'+
'            <!--[if IE 6]><style>.p7epm_trigs, .p7epm_trigs a {height: 1%;}</style><![endif]-->\n'+
'            <script type="text/javascript">\n'+
'		<!--\n'+
'		  P7_opEPM(\'p7EPM_'+widgetno+'\',0,2,1,0,0,1000);\n'+
'		//-->\n'+
'            </script>\n'+
'          </div></td>\n'+
'        </tr>\n'+
'      </table>\n';

	var assetArray = new Array();
	
	var tempObj = new Object();
	tempObj.srcURL = dw.getConfigurationPath() + "/Objects/Greene Custom/images/DocumentIcon/DocumentIcon.gif";
	tempObj.destURL = "DocumentIcon.gif";
	tempObj.refType = "";
	tempObj.useDefaultFolder = true;
	assetArray.push(tempObj);

	var tempObj = new Object();
	tempObj.srcURL = dw.getConfigurationPath() + "/Objects/Greene Custom/p7epm/p7EPMscripts.js";
	tempObj.destURL = "p7epm/p7EPMscripts.js";
	tempObj.refType = "javascript";
	tempObj.useDefaultFolder = true;
	assetArray.push(tempObj);
	
if (css=="p7EPM05")
		{
		var tempObj = new Object();
		tempObj.srcURL = dw.getConfigurationPath() + "/Objects/Greene Custom/p7epm/epm5/p7EPM05.css";
		tempObj.destURL = "p7epm/epm5/p7EPM05.css";
		tempObj.refType = "link";
		tempObj.useDefaultFolder = true;
		}
	else if (css=="p7EPM06")
		{
		var tempObj = new Object();
		tempObj.srcURL = dw.getConfigurationPath() + "/Objects/Greene Custom/p7epm/epm5/p7EPM06.css";
		tempObj.destURL = "p7epm/epm5/p7EPM06.css";
		tempObj.refType = "link";
		tempObj.useDefaultFolder = true;
		}
	else
		{
		var tempObj = new Object();
		tempObj.srcURL = dw.getConfigurationPath() + "/Objects/Greene Custom/p7epm/epm5/p7EPM07.css";
		tempObj.destURL = "p7epm/epm5/p7EPM07.css";
		tempObj.refType = "link";
		tempObj.useDefaultFolder = true;
		}
		
	
		assetArray.push(tempObj);
	
	dw.getDocumentDOM().copyAssets(assetArray);
			
	return retVal;
	
		
}



//---------------    LOCAL FUNCTIONS   ---------------

function initializeUI(){
  document.theForm.elements["group1"][3].focus();
}