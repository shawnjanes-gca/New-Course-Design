// Copyright 1999 Macromedia, Inc. All rights reserved.

//---------------   GLOBAL VARIABLES   ---------------

var helpDoc = MM.HELP_objMeta;

//---------------     API FUNCTIONS    ---------------

function objectTag() {
  var Form = document.theForm;
  var retVal='\n'+
  '<script language="JavaScript">loadFlashHeader(userCompany, parentFolder);</script>'
  return retVal;
}

//---------------    LOCAL FUNCTIONS   ---------------