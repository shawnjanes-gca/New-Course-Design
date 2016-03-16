// Copyright 1999 Macromedia, Inc. All rights reserved.

//---------------   GLOBAL VARIABLES   ---------------

var helpDoc = MM.HELP_objMeta;
layerno=1;

//---------------     API FUNCTIONS    ---------------

function objectTag() {
 var Form = document.LayerForm;
  var retVal='\n'+
  '<div id="Layerwbutton'+layerno+'" style="position:absolute; width:375px; height:35px; z-index:1; left: 55px; top: 125px; visibility: hidden">\n'+ 
    '<table width="100%" border="3" cellpadding="3" bgcolor="#FFFFFF" bordercolor="#000099">\n'+
      '<tr>\n'+ 
        '<td>\n'+
          '<p>Correct.</p>\n'+
          '<p align="center">\n'+
            '<input type="submit" name="Submit" value="close" onClick="MM_showHideLayers(\'Layerwbutton'+layerno+'\',\'\',\'hide\')">\n'+
          '</p>\n'+
        '</td>\n'+
      '</tr>\n'+
    '</table>\n'+
'</div>\n';
  layerno=layerno+1;
 
  return retVal;
}

//---------------    LOCAL FUNCTIONS   ---------------


