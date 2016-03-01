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

function objectTag() 
{
	retVal="";
	var Form = document.theForm;

	if (Form.group3[0].checked==true)
		{
		var Alignment = "left";
		}
	else if (Form.group3[1].checked==true)
		{
		var Alignment = "center";
		}
	else if (Form.group3[2].checked==true)
		{
		var Alignment = "right";
		}
	else 
		{
		var Alignment = "default";
		}
	
	
	if(Form.group2[0].checked==true)
		{
		var Measurement = "";
		}
	   else
	   	{
	   	var Measurement = "%";
	   	}

	retVal = retVal +
	'<table width="'+Form.width.value+''+Measurement+'" border="1" align="'+Alignment+'" cellpadding="6" cellspacing="0" bordercolor="'+Form.bordercolor.value+'" bgcolor="'+Form.backgroundcolor.value+'">\n'+
  	'    <tr>\n'+
  	'      <td>&nbsp;</td>\n'+
  	'    </tr>\n'+
      	'</table>'
  	
  return retVal;
}

//---------------    LOCAL FUNCTIONS   ---------------

function initializeUI(){
  document.theForm.elements["group3"][1].focus();
}