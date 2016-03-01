// Copyright 1999 Macromedia, Inc. All rights reserved.

//---------------   GLOBAL VARIABLES   ---------------

var helpDoc = MM.HELP_objMeta;

//---------------     API FUNCTIONS    ---------------

function objectTag() {
retVal="";
var Form = document.theForm;
var vaudioArray = Form.vaudiofile.value.split('.');
var vaudioBase = vaudioArray[0];
if (Form.onetime.checked == true)
{
retVal=retVal+
'<script type="text/javascript" src="http://www.greeneconsults.com/topclass/vaudio/mootools.svn.js"></script>\n'+
'<script type="text/javascript" src="http://www.greeneconsults.com/topclass/vaudio/vaudio.js"></script>\n'+
'<script type="text/javascript">\n'+
'function boxOpen(divid, flashLoc, width, height)\n'+
'{\n'+
'	createFlash(divid, flashLoc, width, height);\n'+
'}\n'+
'function boxClose(divid)\n'+
'{\n'+
'    var myBox=	document.getElementById(divid)\n'+
'    myBox.innerHTML="";\n'+
'}\n'+
'function createFlash(divid, flashLoc, width, height)\n'+
'{\n'+
'	if (document.all && !window.opera) \n'+
'	{\n'+
'	    //Explorer\n'+
'		var myBox = document.getElementById(divid)\n'+       
'                 myBox.innerHTML = \'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0" width="\'+width+\'" height="\'+height+\'"><param name="movie" value="\'+flashLoc+\'" /><param name="quality" value="high" /><param name="wmode" value="transparent" /><embed src="\'+flashLoc+\'" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" wmode="transparent" width="\'+width+\'" height="\'+height+\'"></embed></object>\';\n'+
'	} \n'+
'	    else \n'+
'	{\n'+
'		//other browsers\n'+
'		var myBox = document.getElementById(divid)\n'+
'		var flash = document.createElement("object");\n'+
'		flash.setAttribute("classid","clsid:D27CDB6E-AE6D-11cf-96B8-444553540000");\n'+
'		flash.setAttribute("codebase", "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0");\n'+
'		flash.setAttribute("width", width);\n'+
'		flash.setAttribute("height", height);\n'+
'		var par1 = document.createElement("param");\n'+
'		par1.setAttribute("name", "movie");\n'+
'		par1.setAttribute("value", flashLoc);\n'+
'		flash.appendChild(par1);\n'+
'		var par2 = document.createElement("param");\n'+
'		par2.setAttribute("name", "quality");\n'+
'		par2.setAttribute("value", "high");\n'+
'		flash.appendChild(par2);\n'+
'		var par3 = document.createElement("param");\n'+
'		par3.setAttribute("name", "wmode");\n'+
'		par3.setAttribute("value", "transparent");\n'+
'		var embed = document.createElement("embed");\n'+
'		embed.setAttribute("src", "'+Form.vaudiofile.value+'");\n'+
'		embed.setAttribute("quality", "high");\n'+
'		embed.setAttribute("pluginspage", "http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash");\n'+
'		embed.setAttribute("width", width);\n'+
'		embed.setAttribute("height", height);\n'+
'		embed.setAttribute("wmode", "transparent");\n'+	
'		embed.setAttribute("type", "application/x-shockwave-flash");\n'+
'		flash.appendChild(embed);\n'+
'		myBox.appendChild(flash)\n'+ 
'	}\n'+
'}\n'+
'		window.addEvent(\'domready\', function(){\n'+
'			Fx.Morph = Fx.Styles.extend({\n'+
'\n'+
'	start: function(className){\n'+
'\n'+
'		var to = {};\n'+
'\n'+
'		$each(document.styleSheets, function(style){\n'+
'			var rules = style.rules || style.cssRules;\n'+
'			$each(rules, function(rule){\n'+
'				if (!rule.selectorText.test(\'\.\' + className + \'$\')) return;\n'+
'				Fx.CSS.Styles.each(function(style){\n'+
'					if (!rule.style || !rule.style[style]) return;\n'+
'					var ruleStyle = rule.style[style];\n'+
'					to[style] = (style.test(/color/i) && ruleStyle.test(/^rgb/)) ? ruleStyle.rgbToHex() : ruleStyle;\n'+
'				});\n'+
'			});\n'+
'		});\n'+
'		return this.parent(to);\n'+
'	}'+
'\n'+
'});\n'+
'\n'+
'Fx.CSS.Styles = ["backgroundColor", "backgroundPosition", "color", "width", "height", "left", "top", "bottom", "right", "fontSize", "letterSpacing", "lineHeight", "textIndent", "opacity"];\n'+
'\n'+
'Fx.CSS.Styles.extend(Element.Styles.padding);\n'+
'Fx.CSS.Styles.extend(Element.Styles.margin);\n'+
'\n'+
'Element.Styles.border.each(function(border){\n'+
'	[\'Width\', \'Color\'].each(function(property){\n'+
'		Fx.CSS.Styles.push(border + property);\n'+
'	});'+
'});\n'+
'\n'+
'var myMorph = new Fx.Morph(\'morpher\', {wait: false});\n'+
'\n'+
'$(\'morph1\').addEvent(\'click\', function(e){\n'+
'	new Event(e).stop();\n'+
'\n'+
'	myMorph.start(\'morph1\');\n'+
'	morphClose();\n'+
'\n'+
'});\n'+
'function morphOpen()\n'+
'{\n'+
'	document.getElementById("openIcon").style.display = "none";\n'+
'	document.getElementById("closeIcon").style.display = "inline";\n'+
'}\n'+
'function morphClose()\n'+
'{\n'+
'	document.getElementById("openIcon").style.display = "inline";\n'+
'	document.getElementById("closeIcon").style.display = "none";\n'+
'}\n'+
'$(\'morph2\').addEvent(\'click\', function(e){\n'+
'	new Event(e).stop();\n'+
'	morphOpen();\n'+
'	myMorph.start(\'morph2\');\n'+
'\n'+
'});\n'+
'		});\n'+
'</script>\n'+
'\n'
}

retVal = retVal +
'<div id="'+Form.divid.value+'Main">\n'+
'  <div id="morpher" class="morph1">\n'+
'   <table width="100%" height="75" border="0" align="center">\n'+
'     <tr align="center" valign="middle">\n'+
'     	<td id="openIcon"> <table border="0" cellspacing="0">\n'+
'  <tr>\n'+
'    <td valign="middle"><a href="javascript:void(0);" id="morph2" onclick="boxOpen(\''+Form.divid.value+'\', \''+Form.vaudiofile.value+'\',\''+Form.width.value+'\',\''+Form.height.value+'\')"><img src="http://www.greeneconsults.com/topclass/vaudio/MediaIcon_32px.gif" width="32" border="0" align="middle" /></a></td>\n'+
'    <td valign="middle"><strong><font color="#FF0000"> Click the icon to learn more.</font></strong></td>\n'+
'  </tr>\n'+
'</table></td>\n'+
'        <td id="closeIcon" style="display:none;"><table border="0" cellspacing="0">\n'+
'  <tr>\n'+
'    <td valign="middle"><a href="javascript:void(0);" id="morph1" onclick="boxClose(\''+Form.divid.value+'\')"><img src="http://www.greeneconsults.com/topclass/vaudio/MediaIcon_32px.gif" width="32" border="0" align="middle" /></a></td>\n'+
'    <td valign="middle"><strong><font color="#FF0000"> Click the icon to close.</font></strong></td>\n'+
'  </tr>\n'+
'</table></table>\n'+
'    <p align="center">&nbsp;</p>\n'+
'    <p align="center">\n'+
'<div align="center" id="'+Form.divid.value+'">\n'+
'</div></p>\n'+
'    <p align="center"></p>\n'+
'  </div>\n'+
'</div>'

  return retVal;
}

//---------------    LOCAL FUNCTIONS   ---------------

function initializeUI(){
  document.theForm.divid.focus(); //set focus in Value text field
}
