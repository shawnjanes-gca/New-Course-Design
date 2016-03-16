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
  	'		<td>&nbsp;</td>\n'+
  	'	</tr>\n'
}   

var retVal='\n'+
  '<table width="100%" >\n'+
	tableBuild+
  '</table>' 
  
  return retVal;
}

//---------------    LOCAL FUNCTIONS   ---------------

