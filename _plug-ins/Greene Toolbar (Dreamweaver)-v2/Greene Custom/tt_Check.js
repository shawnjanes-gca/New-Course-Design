

//---------------   GLOBAL VARIABLES   ---------------

var helpDoc = MM.HELP_objMeta;

//---------------     API FUNCTIONS    ---------------

function objectTag() {

var Form = document.theForm;
var fun_check_buttonCheckQ;
fun_check_buttonCheckQ='function check_buttonCheckQ(questionNum, formName)\n'+
'{\n'+
'	var answer=0;\n'+
'	var correctnum=0;\n'+
'	var correct="false";\n'+
'	var answerlength=check_selection[questionNum].length;\n'+
'	for (answerchoice=0; answerchoice<answerlength; answerchoice++)\n'+
'		{\n'+
'			if (check_selection[questionNum][answerchoice]=="true")\n'+
'			{\n'+
'				correctnum++;\n'+
'			}\n'+
'		}\n'+
'	var correctnum2=0;\n'+
'	for (answerchoice=0; answerchoice<answerlength; answerchoice++)\n'+
'		{\n'+
'			if (formName.elements[answerchoice].checked==true && check_selection[questionNum][answerchoice]=="true")\n'+
'			{\n'+
'				correctnum2++;\n'+
'			}\n'+
'			if (formName.elements[answerchoice].checked==true && check_selection[questionNum][answerchoice]=="false")\n'+
'			{\n'+
'				correctnum2--;\n'+
'			}\n'+
'		}\n'+
'	if (correctnum==correctnum2)\n'+
'	{\n'+
'		correct="true"\n'+
'	}\n'+
'	if (correct=="true")\n'+
'	{\n'+
'		MM_showHideLayers(check_layers[questionNum][1],\'\',\'show\');\n'+
'		var form = formName;\n'+
		var elements = form.elements;\n'+
		for (var i = 0, len = elements.length; i < len; ++i) {\n'+
			elements[i].disabled = true;\n'+
		}\n'+
'	}\n'+
'	else\n'+
'	{\n'+
'		MM_showHideLayers(check_layers[questionNum][2],\'\',\'show\');\n'+
'	}\n'+
'}\n'
var fun_checkgetquestion;
fun_checkgetquestion='function checkgetQuestion(questionNumber)\n'+
'{\n'+
'\n'+
'   var questionHTML = "<P><B>" + check_questions[questionNumber][0] + "</B></P>";\n'+
'   var questionLength = check_answers[questionNumber].length;\n'+
'   var questionChoice;\n'+
'\n'+
'   for (questionChoice = 0;questionChoice < questionLength;questionChoice++)\n'+
'   {\n'+
'      questionHTML = questionHTML + "<INPUT TYPE=checkbox NAME=checkQuestionChoice" +questionChoice+ ">";\n'+
'      questionHTML = questionHTML + check_answers[questionNumber][questionChoice];\n'+
'      questionHTML = questionHTML + "<BR>";\n'+
'   }\n'+
'\n'+
'   return questionHTML;\n'+
'}\n'
var onetimeheaderopen;
var onetimeheaderclose;
var onetimearrays;
onetimeheaderopen='//BEGIN ONE TIME INSERT OBJECTS FOR CHECK BOX TEST QUESTIONS\n';
onetimeheaderclose='// END ONE TIME INSERT OBJECTS FOR CHECK BOX TEST QUESTIONS\n\n';
onetimearrays='var check_questions=new Array();\n'+
'var check_answers=new Array();\n'+
'var check_layers=new Array();\n'+
'var check_formNumber=new Array();\n'+
'var check_selection= new Array();\n'
if (Form.onetime.checked == false)
  {
  fun_check_buttonCheckQ="";
  fun_checkgetquestion="";
  onetimeheaderopen="";
  onetimeheaderclose="";
  onetimearrays="";
  }

var answerchoices;
answerchoices="";
var correctresponse;
correctresponse="";
  if (Form.AnswerA.value != "")
  {
  	answerchoices=answerchoices+'check_answers['+Form.QuestionNumber.value+'][0]="'+Form.AnswerA.value+'";\n'
  	correctresponse=correctresponse+'check_selection['+Form.QuestionNumber.value+'][0]="'+Form.CorrectA.checked+'";\n'
  }
  if (Form.AnswerB.value != "")
    {
    	answerchoices=answerchoices+'check_answers['+Form.QuestionNumber.value+'][1]="'+Form.AnswerB.value+'";\n'
    	correctresponse=correctresponse+'check_selection['+Form.QuestionNumber.value+'][1]="'+Form.CorrectB.checked+'";\n'
  }
  if (Form.AnswerC.value != "")
    {
    	answerchoices=answerchoices+'check_answers['+Form.QuestionNumber.value+'][2]="'+Form.AnswerC.value+'";\n'
    	correctresponse=correctresponse+'check_selection['+Form.QuestionNumber.value+'][2]="'+Form.CorrectC.checked+'";\n'
  }
  if (Form.AnswerD.value != "")
    {
    	answerchoices=answerchoices+'check_answers['+Form.QuestionNumber.value+'][3]="'+Form.AnswerD.value+'";\n'
    	correctresponse=correctresponse+'check_selection['+Form.QuestionNumber.value+'][3]="'+Form.CorrectD.checked+'";\n'
  }
  if (Form.AnswerE.value != "")
    {
    	answerchoices=answerchoices+'check_answers['+Form.QuestionNumber.value+'][4]="'+Form.AnswerE.value+'";\n'
    	correctresponse=correctresponse+'check_selection['+Form.QuestionNumber.value+'][4]="'+Form.CorrectE.checked+'";\n'
  }
  if (Form.AnswerF.value != "")
    {
    	answerchoices=answerchoices+'check_answers['+Form.QuestionNumber.value+'][5]="'+Form.AnswerF.value+'";\n'
    	correctresponse=correctresponse+'check_selection['+Form.QuestionNumber.value+'][5]="'+Form.CorrectF.checked+'";\n'
  }
  if (Form.AnswerG.value != "")
    {
    	answerchoices=answerchoices+'check_answers['+Form.QuestionNumber.value+'][6]="'+Form.AnswerG.value+'";\n'
    	correctresponse=correctresponse+'check_selection['+Form.QuestionNumber.value+'][6]="'+Form.CorrectG.checked+'";\n'
  }
  if (Form.AnswerH.value != "")
    {
    	answerchoices=answerchoices+'check_answers['+Form.QuestionNumber.value+'][7]="'+Form.AnswerH.value+'";\n'
    	correctresponse=correctresponse+'check_selection['+Form.QuestionNumber.value+'][7]="'+Form.CorrectH.checked+'";\n'
  }

var retVal='\n'+
  '<SCRIPT LANGUAGE="JavaScript">\n'+
  '<!--\n'+  
  onetimeheaderopen+
  fun_check_buttonCheckQ+
  fun_checkgetquestion+
  onetimearrays+
  onetimeheaderclose+
  '// BEGIN CHECK BOX QUESTION '+Form.QuestionNumber.value+' CODE\n'+
  'check_formNumber['+Form.QuestionNumber.value+']="fillForm'+Form.QuestionNumber.value+'";\n'+
  'check_questions['+Form.QuestionNumber.value+']=new Array();\n'+
  'check_layers['+Form.QuestionNumber.value+']=new Array();\n'+
  'check_answers['+Form.QuestionNumber.value+']=new Array();\n'+
  'check_selection['+Form.QuestionNumber.value+']=new Array();\n'+
  '//here is the question\n'+
  'check_questions['+Form.QuestionNumber.value+'][0]="'+Form.QuestionText.value+'";\n'+
  '// these are the associated layers\n'+
  '// 1 is correct\n'+
  '// 2 is incorrect\n'+
  'check_layers['+Form.QuestionNumber.value+'][1]="'+Form.CorrectLayer.value+'";\n'+
  'check_layers['+Form.QuestionNumber.value+'][2]="'+Form.IncorrectLayer.value+'";\n'+
  '//These are the test answers\n'+
  answerchoices+
  '//These are the correct responses (all need to be selected in order to be correct!)\n'+
  correctresponse+'\n'+
  '//-->\n'+
  '</script>\n'+
  '<FORM NAME="checkForm'+Form.QuestionNumber.value+'">\n'+
  '<SCRIPT>\n'+
  '<!--\n'+
  '// Display Text for Question '+Form.QuestionNumber.value+'\n'+
  'document.write(checkgetQuestion('+Form.QuestionNumber.value+'));\n'+
  '//-->\n'+
  '</SCRIPT>\n'+
  '<BR><INPUT TYPE="button" VALUE="Submit" Name=buttonCheckQ onclick="return check_buttonCheckQ('+Form.QuestionNumber.value+', window.document.checkForm'+Form.QuestionNumber.value+')">\n'+
  '</FORM>\n'+ 
  '<script>\n'+
  '<!--\n'+
  '//END CHECK BOX QUESTION '+Form.QuestionNumber.value+' CODE\n'+
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






