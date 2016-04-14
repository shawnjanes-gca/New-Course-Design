// Copyright 1999 Macromedia, Inc. All rights reserved.

//---------------   GLOBAL VARIABLES   ---------------

var helpDoc = MM.HELP_objMeta;
layerno=1;

//---------------     API FUNCTIONS    ---------------

function objectTag() {
 var Form = document.LayerForm;
  var retVal='\n'+
  '<div class="rvLayerOuterDiv">\n'+
	  '<div id="Layerwbutton'+layerno+'" class="rvLayerInnerDiv">\n'+ 
		'<table class="rvLayerButton">\n'+
		  '<tr>\n'+ 
			'<td>\n'+
			  '<p>Correct.</p>\n'+
			  '<p align="center">\n'+
				'<input type="submit" name="Submit" value="CLOSE" class="closeLayer-btn" onClick="MM_showHideLayers(\'Layerwbutton'+layerno+'\',\'\',\'hide\')">\n'+
			  '</p>\n'+
			'</td>\n'+
		  '</tr>\n'+
		'</table>\n'+
	'</div>\n';
  layerno=layerno+1;
 
  return retVal;
}

//---------------    LOCAL FUNCTIONS   ---------------


