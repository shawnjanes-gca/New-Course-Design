// Copyright 1999 Macromedia, Inc. All rights reserved.

//---------------   GLOBAL VARIABLES   ---------------

var helpDoc = MM.HELP_objMeta;
layerno=1;

//---------------     API FUNCTIONS    ---------------

function objectTag() {
 var Form = document.LayerForm;
  var retVal='\n'+
  '<div id="Layer'+layerno+'" class="rvAnimatedLayer">Correct.  Put your feedback here.</div>\n';
  layerno=layerno+1;
 
  return retVal;
}

//---------------    LOCAL FUNCTIONS   ---------------


