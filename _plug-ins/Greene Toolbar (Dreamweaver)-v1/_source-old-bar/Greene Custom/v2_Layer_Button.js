// Copyright 2010 Greene Consulting Associates All rights reserved.

//---------------   GLOBAL VARIABLES   ---------------

var helpDoc = MM.HELP_objMeta;

//---------------     API FUNCTIONS    ---------------

function objectTag() {
 var Form = document.LayerForm;
  var retVal='\n'+
  '<div id="'+Form.LayerName.value+'" style="position:absolute; width:600px; height:35px; z-index:1; left: 55px; top: 125px; visibility: hidden">\n'+ 
    '<table width="100%" border="1" cellpadding="6" cellspacing="0" bgcolor="#EEEEEE" bordercolor="#000000">\n'+
      '<tr>\n'+ 
        '<td>\n'+
          '<p></p>\n'+
          '<p align="center">\n'+
            '<input type="submit" name="Submit" value="close" onClick="MM_showHideLayers(\''+Form.LayerName.value+'\',\'\',\'hide\')">\n'+
          '</p>\n'+
        '</td>\n'+
      '</tr>\n'+
    '</table>\n'+
'</div>\n'
 
  return retVal;
}

//---------------    LOCAL FUNCTIONS   ---------------


