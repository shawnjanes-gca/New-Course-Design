// Copyright 1999 Macromedia, Inc. All rights reserved.

//---------------   GLOBAL VARIABLES   ---------------

var helpDoc = MM.HELP_objMeta;

//---------------     API FUNCTIONS    ---------------

function objectTag() {
 var Form = document.QuestionForm;
var tableBuild = '';
for (questionChoice = 1;questionChoice <= Form.QuestionNumber.value;questionChoice++)
{
	tableBuild = tableBuild + '	<tr>\n'+
 	'		<td width="55" align="right" valign="top"><p align="right"><strong>'+questionChoice+'.</strong></p></td>\n'+
  	'		<td><p class="questionStyle">put question here</p>&nbsp;</td>\n'+
  	'	</tr>\n'
}   

var retVal='\n'+
  '<div id="qTable"><table>\n'+
	tableBuild+
  '</table></div>' 
  
  return retVal;
}

//---------------    LOCAL FUNCTIONS   ---------------
