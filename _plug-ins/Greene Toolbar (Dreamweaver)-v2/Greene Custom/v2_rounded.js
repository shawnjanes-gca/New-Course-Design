// Copyright 2010 Greene Consulting All rights reserved.

//---------------   GLOBAL VARIABLES   ---------------

// var helpDoc = MM.HELP_objMeta;

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

	if (Form.onetime.checked == true)
	{
		retVal=retVal+
			'<table width="'+Form.width.value+'" align="'+Alignment+'" cellpadding="6">\n'+
		  	'<tr>\n'+
    			'<td>\n'+
			'\n'
	}

	retVal = retVal +
		'<style type="text/css">\n'
	
	if(Form.group2[0].checked==true)
		{
		var Measurement = "px";
		}
	   else
	   	{
	   	var Measurement = "%";
	   	}

	if(Form.group1[0].checked==true)
	{
		retVal = retVal +
			'div#'+Form.divid.value+'{background: #FFF;color:#333;font: 76% Arial,sans-serif;}\n'+
			'div#'+Form.divid.value+'{margin:0;padding:0;list-style:none;}\n'+
			'div#'+Form.divid.value+'{float:left;width:'+Form.width.value+''+Measurement+';margin:0 10px 10px 0;}\n'+
			'div#'+Form.divid.value+' h3{font: normal 120%/1.3 Verdana,sans-serif;text-transform:uppercase;margin:0px;padding: 5px 0 0;text-align:center;color: #000;}\n'+
			'div#'+Form.divid.value+' p{margin:0;padding:5px 8px 15px;}\n'+
			'div#'+Form.divid.value+'{background: '+Form.color1.value+';}\n'
	}

	if(Form.group1[1].checked==true)
	{
		retVal = retVal +
			'div#'+Form.divid.value+'{background: #FFF;color:#333;font: 76% Arial,sans-serif;}\n'+
			'div#'+Form.divid.value+'{margin:0;padding:0;list-style:none;}\n'+
			'div#'+Form.divid.value+'{float:left;width:'+Form.width.value+''+Measurement+';margin:0 10px 10px 0;}\n'+
			'div#'+Form.divid.value+' h3{font: normal 120%/1.3 Verdana,sans-serif;text-transform:uppercase;margin:0px;padding: 5px 0 0;text-align:center;color: #000;}\n'+
			'div#'+Form.divid.value+' p{margin:0;padding:5px 8px 15px;}\n'+
			'div#'+Form.divid.value+' h3{background: '+Form.color1.value+';}\n'+
			'div#'+Form.divid.value+' div{background: '+Form.color2.value+';}\n'+
			'div#'+Form.divid.value+' div{border:2px solid '+Form.color1.value+';}\n'
	}

	retVal = retVal +
		'</style>';

	if(hasFunctionCall()==false)
	{
		retVal = retVal +
			'<script type="text/javascript">\n'+
			'window.onload=function(){'

		if(Form.group1[0].checked==true)
		{
			retVal = retVal +
				'Nifty("div#'+Form.divid.value+'","big");'
		}

		if(Form.group1[1].checked==true)
		{
			retVal = retVal +
				'Nifty("div#'+Form.divid.value+' h3","top");\n'+
				'Nifty("div#'+Form.divid.value+' div","none same-height");\n'
		}

		retVal = retVal +
			'}\n'+
			'</script>\n'
	}
	else
	{
		dom = dreamweaver.getDocumentDOM("document");
		var allScripts = dom.getElementsByTagName("SCRIPT");	
		for (var i=0; i<allScripts.length; i++) 
		{
			if (allScripts[i].innerHTML.search('window.onload=function')>=0) 
			{
				foundatpos=allScripts[i].innerHTML.indexOf("}");
				newstring = allScripts[i].innerHTML.substring(0,foundatpos-1)
				if(Form.group1[0].checked==true)
				{
					allScripts[i].innerHTML=newstring+'\nNifty("div#'+Form.divid.value+'","big");\n}\n'
				}

				if(Form.group1[1].checked==true)
				{
					allScripts[i].innerHTML=newstring+'\nNifty("div#'+Form.divid.value+' h3","top");\n'+'Nifty("div#'+Form.divid.value+' div","none same-height");\n}\n'
				}
			}
  		}
	}
	
	retVal = retVal + '<div id="'+Form.divid.value+'">\n'+
		'  <h3>'+Form.headertext.value+'</h3>\n'+
		'  <div><p>'+Form.bodytext.value+'</p></div>\n'+
		'</div>\n'+
		'</td>\n'+
		'</tr>\n'+
		'</table>\n';
	
	var assetArray = new Array();
	
	var tempObj = new Object();
	tempObj.srcURL = dw.getConfigurationPath() + "/Objects/Greene Custom/js/niftycube/nifty.js";
	tempObj.destURL = "js/niftycube/nifty.js";
	tempObj.refType = "";
	tempObj.useDefaultFolder = true;
	assetArray.push(tempObj);
	
	var tempObj = new Object();
	tempObj.srcURL = dw.getConfigurationPath() + "/Objects/Greene Custom/js/niftycube/niftyCorners.css";
	tempObj.destURL = "js/niftycube/niftyCorners.css";
	tempObj.refType = "";
	tempObj.useDefaultFolder = true;
	assetArray.push(tempObj);
	
	var tempObj = new Object();
	tempObj.srcURL = dw.getConfigurationPath() + "/Objects/Greene Custom/js/niftycube/niftycube.js";
	tempObj.destURL = "js/niftycube/niftycube.js";
	tempObj.refType = "javascript";
	tempObj.useDefaultFolder = true;
	assetArray.push(tempObj);
	
	var tempObj = new Object();
	tempObj.srcURL = dw.getConfigurationPath() + "/Objects/Greene Custom/js/niftycube/niftyPrint.css";
	tempObj.destURL = "js/niftycube/niftyPrint.css";
	tempObj.refType = "";
	tempObj.useDefaultFolder = true;
	assetArray.push(tempObj);
	
	dw.getDocumentDOM().copyAssets(assetArray);
		
	return retVal;
			
}

//---------------    LOCAL FUNCTIONS   ---------------

function initializeUI(){
  document.theForm.divid.focus(); //set focus in Value text field
}