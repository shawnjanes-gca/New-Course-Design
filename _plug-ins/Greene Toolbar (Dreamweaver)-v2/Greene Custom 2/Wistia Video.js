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
	
	


	retVal = retVal +					
	'<script>\n'+

    '        function getUrlVars() {\n'+
    '            var vars = {};\n'+
    '            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {\n'+
    '            vars[key] = value;\n'+
    '            });\n'+
    '        return vars;\n'+
    '        }\n'+
    '    </script>\n'+

    '   <!-- GET SPECFIC VARIABLES FROM THE URL AND STORE THEM AS A NEW VARIABLE -->\n'+
    '    <script>\n'+
    '        var userEmail = getUrlVars()["userEmail"];\n'+
    '    </script>\n'+
	'    <script charset="ISO-8859-1" src="//fast.wistia.com/assets/external/E-v1.js"></script>\n'+
	'    <div id="wistia_embed wistia_async_'+Form.wistiaEmbedId.value+'" class="" style="width:'+Form.width.value+'px; height:'+Form.height.value+'px; align:'+Alignment+';">&nbsp;</div>\n'+ 	
  	'    <script>\n'+
  	'    wistiaEmbed = Wistia.embed("'+Form.wistiaEmbedId.value+'",{trackEmail: userEmail});\n'+
    '   </script>\n'
  	
  return retVal;
}

//---------------    LOCAL FUNCTIONS   ---------------

function initializeUI(){
  document.theForm.elements["group3"][3].focus();
}