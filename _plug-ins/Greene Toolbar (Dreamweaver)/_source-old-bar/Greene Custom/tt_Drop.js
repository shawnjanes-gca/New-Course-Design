

//---------------   GLOBAL VARIABLES   ---------------

var helpDoc = MM.HELP_objMeta;

//---------------     API FUNCTIONS    ---------------

function objectTag() {

var Form = document.theForm;
var fun_drop_buttonCheckQ;
fun_drop_buttonCheckQ='function drop_buttonCheckQ(questionNum, formName)\n'+
'{\n'+
'	var answer=0;\n'+
'	var correct="false";\n'+
'	var selection=formName.selectedIndex\n'+
'	if (formName.selectedIndex==0)\n'+
'	{\n'+
'		return false;\n'+
'	}\n'+
'	answer=String.fromCharCode(64+selection);\n'+
'	if (answer==drop_answers[questionNum])\n'+
'		{\n'+
'			correct="true"\n'+
'		}\n'+
'	if (correct=="true")\n'+
'	{\n'+
'		MM_showHideLayers(drop_layers[questionNum][formName.selectedIndex],\'\',\'show\');\n'+
'		formName.disabled=true;\n'+
'	}\n'+
'	else\n'+
'	{\n'+
'		MM_showHideLayers(drop_layers[questionNum][formName.selectedIndex],\'\',\'show\');\n'+
'	}\n'+
'}\n'
var onetimeheaderopen;
var onetimeheaderclose;
var onetimearrays;
onetimeheaderopen='//BEGIN ONE TIME INSERT OBJECTS FOR DROP-DOWN TEST QUESTIONS\n';
onetimeheaderclose='// END ONE TIME INSERT OBJECTS FOR DROP-DOWN TEST QUESTIONS\n\n';
onetimearrays='var drop_questions=new Array();\n'+
'var drop_answers=new Array();\n'+
'var drop_layers=new Array();\n'+
'var drop_formNumber=new Array();\n'
if (Form.onetime.checked == false)
  {
  fun_drop_buttonCheckQ="";
  onetimeheaderopen="";
  onetimeheaderclose="";
  onetimearrays="";
  }

var Layers;
Layers="";
var answerchoices;
answerchoices="";
var selecthtml;
selecthtml='<form name="dropForm'+Form.QuestionNumber.value+'">\n<select name="dropAnswer'+Form.QuestionNumber.value+'" onChange="return drop_buttonCheckQ('+Form.QuestionNumber.value+', window.document.dropForm'+Form.QuestionNumber.value+'.dropAnswer'+Form.QuestionNumber.value+')">\n';
selecthtml=selecthtml+'<option value="0" selected>Choose Your Answer:</option>\n'
  if (Form.AnswerA.value != "")
  {
  	answerchoices=answerchoices+'drop_answers['+Form.QuestionNumber.value+'][1]="'+Form.AnswerA.value+'";\n'
  	selecthtml=selecthtml+'<option value="'+Form.AnswerA.value+'">'+Form.AnswerA.value+'</option>\n'
  	Layers=Layers+'drop_layers['+Form.QuestionNumber.value+'][1]="'+Form.LayerA.value+'";\n'
  }
  if (Form.AnswerB.value != "")
    {
    	answerchoices=answerchoices+'drop_answers['+Form.QuestionNumber.value+'][2]="'+Form.AnswerB.value+'";\n'
    	selecthtml=selecthtml+'<option value="'+Form.AnswerB.value+'">'+Form.AnswerB.value+'</option>\n'
    	Layers=Layers+'drop_layers['+Form.QuestionNumber.value+'][2]="'+Form.LayerB.value+'";\n'
  }
  if (Form.AnswerC.value != "")
    {
    	answerchoices=answerchoices+'drop_answers['+Form.QuestionNumber.value+'][3]="'+Form.AnswerC.value+'";\n'
    	selecthtml=selecthtml+'<option value="'+Form.AnswerC.value+'">'+Form.AnswerC.value+'</option>\n'
    	Layers=Layers+'drop_layers['+Form.QuestionNumber.value+'][3]="'+Form.LayerC.value+'";\n'
  }
  if (Form.AnswerD.value != "")
    {
    	answerchoices=answerchoices+'drop_answers['+Form.QuestionNumber.value+'][4]="'+Form.AnswerD.value+'";\n'
    	selecthtml=selecthtml+'<option value="'+Form.AnswerD.value+'">'+Form.AnswerD.value+'</option>\n'
    	Layers=Layers+'drop_layers['+Form.QuestionNumber.value+'][4]="'+Form.LayerD.value+'";\n'
  }
  if (Form.AnswerE.value != "")
    {
    	answerchoices=answerchoices+'drop_answers['+Form.QuestionNumber.value+'][5]="'+Form.AnswerE.value+'";\n'
    	selecthtml=selecthtml+'<option value="'+Form.AnswerE.value+'">'+Form.AnswerE.value+'</option>\n'
    	Layers=Layers+'drop_layers['+Form.QuestionNumber.value+'][5]="'+Form.LayerE.value+'";\n'
    	
  }
  if (Form.AnswerF.value != "")
    {
    	answerchoices=answerchoices+'drop_answers['+Form.QuestionNumber.value+'][6]="'+Form.AnswerF.value+'";\n'
    	selecthtml=selecthtml+'<option value="'+Form.AnswerF.value+'">'+Form.AnswerF.value+'</option>\n'
    	Layers=Layers+'drop_layers['+Form.QuestionNumber.value+'][6]="'+Form.LayerF.value+'";\n'    	
  }
  if (Form.AnswerG.value != "")
    {
    	answerchoices=answerchoices+'drop_answers['+Form.QuestionNumber.value+'][7]="'+Form.AnswerG.value+'";\n'
    	selecthtml=selecthtml+'<option value="'+Form.AnswerG.value+'">'+Form.AnswerG.value+'</option>\n'
    	Layers=Layers+'drop_layers['+Form.QuestionNumber.value+'][7]="'+Form.LayerG.value+'";\n'
  }
  if (Form.AnswerH.value != "")
    {
    	answerchoices=answerchoices+'drop_answers['+Form.QuestionNumber.value+'][8]="'+Form.AnswerH.value+'";\n'
    	selecthtml=selecthtml+'<option value="'+Form.AnswerH.value+'">'+Form.AnswerH.value+'</option>\n'
    	Layers=Layers+'drop_layers['+Form.QuestionNumber.value+'][8]="'+Form.LayerH.value+'";\n'
  }

  selecthtml=selecthtml+'</select>\n</form>\n';

var retVal='\n'+
  '<SCRIPT LANGUAGE="JavaScript">\n'+
  '<!--\n'+  
  fun_drop_buttonCheckQ+
  onetimeheaderopen+
  onetimearrays+
  onetimeheaderclose+
  '// BEGIN DROP DOWN QUESTION '+Form.QuestionNumber.value+' CODE\n'+
  'drop_formNumber['+Form.QuestionNumber.value+']="fillForm'+Form.QuestionNumber.value+'";\n'+
  'drop_questions['+Form.QuestionNumber.value+']=new Array();\n'+
  'drop_layers['+Form.QuestionNumber.value+']=new Array();\n'+
  'drop_answers['+Form.QuestionNumber.value+']=new Array();\n'+
  '//here is the question\n'+
  'drop_questions['+Form.QuestionNumber.value+'][0]="'+Form.QuestionText.value+'";\n'+
  '// these are the associated layers\n'+
  Layers+
  '//This is the test answer\n'+
  'drop_answers['+Form.QuestionNumber.value+']="'+Form.Qanswer.value+'";\n'+
  'document.write("<P><B>"+drop_questions['+Form.QuestionNumber.value+'][0]+"</B></P>");\n'+
  '//-->\n'+
  '</script>\n'+
  selecthtml+
  '<script>\n'+
  '<!--\n'+
  '//END DROP DOWN QUESTION '+Form.QuestionNumber.value+' CODE\n'+
  '//-->\n'+
'</script>\n'
  
  
  return retVal;
}

//---------------    LOCAL FUNCTIONS   ---------------

function initializeUI(){
  document.theForm.QuestionNumber.focus(); //set focus in Value text field
}
function windowDimensions(){
	var retval = ""
	retval = "648, 520";
	return retval;
}






