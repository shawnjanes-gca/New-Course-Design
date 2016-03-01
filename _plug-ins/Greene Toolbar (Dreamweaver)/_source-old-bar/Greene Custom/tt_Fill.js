

//---------------   GLOBAL VARIABLES   ---------------

var helpDoc = MM.HELP_objMeta;

//---------------     API FUNCTIONS    ---------------

function objectTag() {

var Form = document.theForm;
var fun_fill_buttonCheckQ;
fun_fill_buttonCheckQ='function fill_buttonCheckQ_onclick(questionNum, formName)\n'+
'{\n'+
'	var answer=0;\n'+
'	var correct="false";\n'+
'	var answerlength=fill_answers[questionNum].length;\n'+
'	for (answerchoice=0; answerchoice<answerlength; answerchoice++)\n'+
'		{\n'+
'			if (fill_answers[questionNum][answerchoice]==formName.value)\n'+
'			{\n'+
'				correct="true";\n'+
'			}\n'+
'		}\n'+
'	if (correct=="true")\n'+
'	{\n'+
'		MM_showHideLayers(fill_layers[questionNum][1],\'\',\'show\');\n'+
'		formName.disabled=true;\n'+
'	}\n'+
'	else\n'+
'	{\n'+
'		MM_showHideLayers(fill_layers[questionNum][2],\'\',\'show\');\n'+
'	}\n'+
'}\n'
var onetimeheaderopen;
var onetimeheaderclose;
var onetimearrays;
onetimeheaderopen='//BEGIN ONE TIME INSERT OBJECTS FOR FILL IN THE BLANK TEST QUESTIONS\n';
onetimeheaderclose='// END ONE TIME INSERT OBJECTS FOR FILL IN THE BLANK TEST QUESTIONS\n\n';
onetimearrays='var fill_questions=new Array();\n'+
'var fill_answers=new Array();\n'+
'var fill_layers=new Array();\n'+
'var fill_formNumber=new Array();\n'
if (Form.onetime.checked == false)
  {
  fun_fill_buttonCheckQ="";
  onetimeheaderopen="";
  onetimeheaderclose="";
  onetimearrays="";
  }
var answerchoices;
answerchoices="";
  if (Form.AnswerA.value != "")
  {
  	answerchoices=answerchoices+'fill_answers['+Form.QuestionNumber.value+'][0]="'+Form.AnswerA.value+'";\n'
  }
  if (Form.AnswerB.value != "")
    {
    	answerchoices=answerchoices+'fill_answers['+Form.QuestionNumber.value+'][1]="'+Form.AnswerB.value+'";\n'
  }
  if (Form.AnswerC.value != "")
    {
    	answerchoices=answerchoices+'fill_answers['+Form.QuestionNumber.value+'][2]="'+Form.AnswerC.value+'";\n'
  }
  if (Form.AnswerD.value != "")
    {
    	answerchoices=answerchoices+'fill_answers['+Form.QuestionNumber.value+'][3]="'+Form.AnswerD.value+'";\n'
  }
  if (Form.AnswerE.value != "")
    {
    	answerchoices=answerchoices+'fill_answers['+Form.QuestionNumber.value+'][4]="'+Form.AnswerE.value+'";\n'
  }
  if (Form.AnswerF.value != "")
    {
    	answerchoices=answerchoices+'fill_answers['+Form.QuestionNumber.value+'][5]="'+Form.AnswerF.value+'";\n'
  }
  if (Form.AnswerG.value != "")
    {
    	answerchoices=answerchoices+'fill_answers['+Form.QuestionNumber.value+'][6]="'+Form.AnswerG.value+'";\n'
  }
  if (Form.AnswerH.value != "")
    {
    	answerchoices=answerchoices+'fill_answers['+Form.QuestionNumber.value+'][7]="'+Form.AnswerH.value+'";\n'
  }

var retVal='\n'+
  '<SCRIPT LANGUAGE="JavaScript">\n'+
  '<!--\n'+  
  onetimeheaderopen+
  fun_fill_buttonCheckQ+
  onetimeheaderclose+
  onetimearrays+
  '// BEGIN FILL IN THE BLANK QUESTION '+Form.QuestionNumber.value+' CODE\n'+
  'fill_formNumber['+Form.QuestionNumber.value+']="fillForm'+Form.QuestionNumber.value+'";\n'+
  'fill_questions['+Form.QuestionNumber.value+']=new Array();\n'+
  'fill_layers['+Form.QuestionNumber.value+']=new Array();\n'+
  'fill_answers['+Form.QuestionNumber.value+']=new Array();\n'+
  '//here is the question\n'+
  'fill_questions['+Form.QuestionNumber.value+'][0]="'+Form.QuestionText.value+'";\n'+
  '// these are the correct answers\n'+
  answerchoices+
  '// these are the associated layers\n'+
  '// 1 is correct\n'+
  '// 2 is incorrect\n'+
  'fill_layers['+Form.QuestionNumber.value+'][1]="'+Form.CorrectLayer.value+'";\n'+
  'fill_layers['+Form.QuestionNumber.value+'][2]="'+Form.IncorrectLayer.value+'";\n'+
  'document.write("<P><B>"+fill_questions['+Form.QuestionNumber.value+'][0]+"</B></P>");\n'+
  '//-->\n'+
  '</script>\n'+
  '<form name="fillForm'+Form.QuestionNumber.value+'" onSubmit="return false">\n'+
    '<input type="text" name="fillAnswer'+Form.QuestionNumber.value+'">\n'+
    '<input type="button" name="buttonCheckQ" onClick="return fill_buttonCheckQ_onclick('+Form.QuestionNumber.value+', window.document.fillForm'+Form.QuestionNumber.value+'.fillAnswer'+Form.QuestionNumber.value+')" value="Submit">\n'+
  '</form>\n'+
  '<script>\n'+
  '<!--\n'+
  '//END FILL IN THE BLANK QUESTION '+Form.QuestionNumber.value+' CODE\n'+
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






