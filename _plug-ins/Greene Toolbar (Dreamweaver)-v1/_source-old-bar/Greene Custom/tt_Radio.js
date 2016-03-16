

//---------------   GLOBAL VARIABLES   ---------------

var helpDoc = MM.HELP_objMeta;

//---------------     API FUNCTIONS    ---------------

function objectTag() {

var Form = document.theForm;
var fun_answercorrect;
fun_answercorrect='function answerCorrect(questionNumber, answer, formName)\n'+
'{\n'+
'   	// declare a variable to hold return value\n'+
'	var correct = false;\n'+
'	var questionLength = formName.radQuestionChoice.length;\n'+
'	var questionChoice;\n'+
'\n'+
'   	// if answer provided is same as correct answer then correct variable is true\n'+
'   	if (answer == answers[questionNumber])\n'+
'      	{correct = true;\n'+
'       		for (questionChoice = 0;questionChoice < questionLength;questionChoice++)\n'+
'			{\n'+
'			formName.radQuestionChoice[questionChoice].disabled = true;\n'+
'\n'+
'	  		}\n'+
'\n'+
'   	// return whether the answer was correct (true or false)\n'+
'   	return correct;\n'+
'	}\n'+
'}\n'+
'\n'

var fun_getquestion;
fun_getquestion='function getQuestion(questionNumber)\n'+
'{\n'+
'\n'+
'   var questionHTML = "<P><B>" + questions[questionNumber][0] + "</B></P>";\n'+
'   var questionLength = questions[questionNumber].length;\n'+
'   var questionChoice;\n'+
'\n'+
'   questionHTML = questionHTML + "<P>";\n'+
'   for (questionChoice = 1;questionChoice < questionLength;questionChoice++)\n'+
'   {\n'+
'      questionHTML = questionHTML + "<INPUT TYPE=radio NAME=radQuestionChoice onclick=\'return buttonCheckQ_onclick("+questionNumber+", window.document.QuestionForm"+questionNumber+")\'>"\n'+
'      questionHTML = questionHTML + questions[questionNumber][questionChoice];\n'+
'      questionHTML = questionHTML + "<BR>";\n'+
'   }\n'+
'   questionHTML = questionHTML + "</P>";\n'+
'\n'+
'   return questionHTML;\n'+
'}\n'

var fun_buttoncheckq;
fun_buttoncheckq='function buttonCheckQ_onclick(questionNum, formName)\n'+
'{\n'+
'   var answer = 0;\n'+
'   while (formName.radQuestionChoice[answer].checked != true)\n'+
'   {\n'+
'      answer++;\n'+
'   }\n'+
'\n'+
'   var answer2 = String.fromCharCode(65 + answer);\n'+
'   answer++;\n'+
'   if (answerCorrect(questionNum,answer2, formName) == true)\n'+
'   {\n'+
'      MM_showHideLayers(layers[questionNum][answer],\'\',\'show\');\n'+
'   }\n'+
'   else\n'+
'   {\n'+
'      MM_showHideLayers(layers[questionNum][answer],\'\',\'show\');\n'+
'   }\n'+
'}\n'+
'\n'

  var Choices;
  var Layers;
  Choices="";
  Layers="";
  if (Form.AnswerA.value != "")
  {
  	Choices=Choices+'questions['+Form.QuestionNumber.value+'][1]="'+Form.AnswerA.value+'";\n'
  	Layers=Layers+'layers['+Form.QuestionNumber.value+'][1]="'+Form.LayerA.value+'";\n'
  }
  if (Form.AnswerB.value != "")
  {
    	Choices=Choices+'questions['+Form.QuestionNumber.value+'][2]="'+Form.AnswerB.value+'";\n'
    	Layers=Layers+'layers['+Form.QuestionNumber.value+'][2]="'+Form.LayerB.value+'";\n'
  }
  if (Form.AnswerC.value != "")
  {
    	Choices=Choices+'questions['+Form.QuestionNumber.value+'][3]="'+Form.AnswerC.value+'";\n'
    	Layers=Layers+'layers['+Form.QuestionNumber.value+'][3]="'+Form.LayerC.value+'";\n'
  }
  if (Form.AnswerD.value != "")
  {
    	Choices=Choices+'questions['+Form.QuestionNumber.value+'][4]="'+Form.AnswerD.value+'";\n'
    	Layers=Layers+'layers['+Form.QuestionNumber.value+'][4]="'+Form.LayerD.value+'";\n'
  }
  if (Form.AnswerE.value != "")
  {
    	Choices=Choices+'questions['+Form.QuestionNumber.value+'][5]="'+Form.AnswerE.value+'";\n'
    	Layers=Layers+'layers['+Form.QuestionNumber.value+'][5]="'+Form.LayerE.value+'";\n'
  }
  if (Form.AnswerF.value != "")
  {
    	Choices=Choices+'questions['+Form.QuestionNumber.value+'][6]="'+Form.AnswerF.value+'";\n'
    	Layers=Layers+'layers['+Form.QuestionNumber.value+'][6]="'+Form.LayerF.value+'";\n'
  }
  if (Form.AnswerG.value != "")
  {
    	Choices=Choices+'questions['+Form.QuestionNumber.value+'][7]="'+Form.AnswerG.value+'";\n'
    	Layers=Layers+'layers['+Form.QuestionNumber.value+'][7]="'+Form.LayerG.value+'";\n'
  }
  if (Form.AnswerH.value != "")
  {
    	Choices=Choices+'questions['+Form.QuestionNumber.value+'][8]="'+Form.AnswerH.value+'";\n'
    	Layers=Layers+'layers['+Form.QuestionNumber.value+'][8]="'+Form.LayerH.value+'";\n'
  }
  
  var onetimearrays;
  onetimearrays='var questionNumber;\n'+
  'var questions=new Array();\n'+
  'var answers=new Array();\n'+
  'var layers=new Array();\n'
  var onetimeheaderopen;
  var onetimeheaderclose;
  onetimeheaderopen='// BEGIN ONE TIME INSERT OBJECTS FOR RADIO BUTTON TEST QUESTIONS\n';
  onetimeheaderclose='// END ONE TIME INSERT OBJECTS FOR RADIO BUTTON TEST QUESTIONS\n\n';
  
  if (Form.onetime.checked == false)
  {
  fun_answercorrect="";
  fun_getquestion="";
  fun_buttoncheckq="";
  onetimearrays="";
  onetimeheaderclose="";
  onetimeheaderopen="";
  }
  var retVal='\n'+
  '<SCRIPT LANGUAGE="JavaScript">\n'+
  '<!--\n'+
  onetimeheaderopen+
  fun_answercorrect+
  fun_getquestion+
  fun_buttoncheckq+
  onetimearrays+
  onetimeheaderclose+
  '// BEGIN RADIO QUESTION '+Form.QuestionNumber.value+' CODE\n'+
  'var formNumber=new Array();\n'+
  'formNumber['+Form.QuestionNumber.value+']="QuestionForm'+Form.QuestionNumber.value+'";\n'+
  'questionNumber='+Form.QuestionNumber.value+';\n'+
  'questions['+Form.QuestionNumber.value+']=new Array();\n'+
  'layers['+Form.QuestionNumber.value+']=new Array();\n'+
  '//This is the test question\n'+
  'questions['+Form.QuestionNumber.value+'][0]="'+Form.QuestionText.value+'";\n'+
  '\n'+
  '//These are the answer choices\n'+
  Choices+
  '//These are the associated layers\n'+
  Layers+
  '\n'+
  '//This is the test answer\n'+
  'answers['+Form.QuestionNumber.value+']="'+Form.Qanswer.value+'";\n'+
  '//-->\n'+
  '</SCRIPT>\n'+
  '<FORM NAME="QuestionForm'+Form.QuestionNumber.value+'">\n'+
  '<SCRIPT>\n'+
  '<!--\n'+
  '// Display Text for Question '+Form.QuestionNumber.value+'\n'+
  'document.write(getQuestion('+Form.QuestionNumber.value+'));\n'+
  '//-->\n'+
  '</SCRIPT>\n'+
   '</FORM>\n'+
  '<SCRIPT>\n'+
  '<!--\n'+
  '// END RADIO QUESTION '+Form.QuestionNumber.value+' CODE\n'+
  '//-->\n'+
  '</SCRIPT>\n'
  
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