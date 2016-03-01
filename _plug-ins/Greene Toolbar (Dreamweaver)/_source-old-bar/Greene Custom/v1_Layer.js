// Copyright 1999 Macromedia, Inc. All rights reserved.

//---------------   GLOBAL VARIABLES   ---------------

var helpDoc = MM.HELP_objMeta;
layerno=1;

//---------------     API FUNCTIONS    ---------------

function objectTag() {
  var Form = document.theForm;
  var retVal='\n'+
  '<div id="Layerwobutton'+layerno+'" style="position:absolute; width:375px; height:35px; z-index:1; left: 55px; top: 125px; visibility: hidden">\n'+ 
  '  <table width="100%" border="3" bgcolor="#FFFFFF" bordercolor="#000099" cellpadding="3">\n'+
  '    <tr> \n'+
  '      <td> \n'+
  '        <p>Correct.</p>\n'+
  '        </td>\n'+
  '    </tr>\n'+
  '  </table>\n'+
  '</div>';
  layerno=layerno+1;
 
  return retVal;
}

//---------------    LOCAL FUNCTIONS   ---------------