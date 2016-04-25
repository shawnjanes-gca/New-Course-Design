

//---------------   GLOBAL VARIABLES   ---------------

var helpDoc = MM.HELP_objMeta;

//---------------     API FUNCTIONS    ---------------

function objectTag() {

var Form = document.theForm;
var fun_answercorrect;
fun_answercorrect='function answerCorrectAnimated(questionNumber, answer, formName)\n'+
'{\n'+
'   	// declare a variable to hold return value\n'+
'	var correct = false;\n'+
'	var questionLength = formName.radQuestionChoiceAnimated.length;\n'+
'	var questionChoice;\n'+
'\n'+
'   	// if answer provided is same as correct answer then correct variable is true\n'+
'   	if (answer == answersAnimated[questionNumber])\n'+
'      	{correct = true;\n'+
'       		for (questionChoice = 0;questionChoice < questionLength;questionChoice++)\n'+
'			{\n'+
'			formName.radQuestionChoiceAnimated[questionChoice].disabled = true;\n'+
'\n'+
'	  		}\n'+
'\n'+
'   	// return whether the answer was correct (true or false)\n'+
'   	return correct;\n'+
'	}\n'+
'}\n'+
'\n'

var fun_getquestion;
fun_getquestion='function getQuestionAnimated(questionNumber)\n'+
'{\n'+
'\n'+
'   var questionHTML = "<P><B>" + questionsAnimated[questionNumber][0] + "</B></P>";\n'+
'   var questionLength = questionsAnimated[questionNumber].length;\n'+
'   var questionChoice;\n'+
'\n'+
'   questionHTML = questionHTML + "<P>";\n'+
'   for (questionChoice = 1;questionChoice < questionLength;questionChoice++)\n'+
'   {\n'+
'      questionHTML = questionHTML + "<label><INPUT TYPE=radio NAME=radQuestionChoiceAnimated onclick=\'return buttonCheckQAnimated_onclick("+questionNumber+", window.document.QuestionForm"+questionNumber+")\'>"\n'+
'      questionHTML = questionHTML + questionsAnimated[questionNumber][questionChoice];\n'+
'      questionHTML = questionHTML + "</label><BR>";\n'+
'   }\n'+
'   questionHTML = questionHTML + "</P>";\n'+
'\n'+
'   return questionHTML;\n'+
'}\n'

var fun_buttoncheckq;
fun_buttoncheckq='function buttonCheckQAnimated_onclick(questionNum, formName)\n'+
'{\n'+
'   var answer = 0;\n'+
'   while (formName.radQuestionChoiceAnimated[answer].checked != true)\n'+
'   {\n'+
'      answer++;\n'+
'   }\n'+
'\n'+
'   var answer2 = String.fromCharCode(65 + answer);\n'+
'   answer++;\n'+
'   if (answerCorrectAnimated(questionNum,answer2, formName) == true)\n'+
'   {\n'+
'      showAnimatedLayer(layersAnimated[questionNum][answer], layersAnimated[questionNum], \'left in px\', \'top in px\', \'width in px\', \'height in px\', \'padding in px\');\n'+
'   }\n'+
'   else\n'+
'   {\n'+
'      showAnimatedLayer(layersAnimated[questionNum][answer], layersAnimated[questionNum], \'left in px\', \'top in px\', \'width in px\', \'height in px\', \'padding in px\');\n'+
'   }\n'+
'}\n'+
'\n'

  var Choices;
  var Layers;
  Choices="";
  Layers="";
  if (Form.AnswerA.value != "")
  {
  	Choices=Choices+'questionsAnimated['+Form.QuestionNumber.value+'][1]="'+Form.AnswerA.value+'";\n'
  	Layers=Layers+'layersAnimated['+Form.QuestionNumber.value+'][1]="'+Form.LayerA.value+'";\n'
  }
  if (Form.AnswerB.value != "")
  {
    	Choices=Choices+'questionsAnimated['+Form.QuestionNumber.value+'][2]="'+Form.AnswerB.value+'";\n'
    	Layers=Layers+'layersAnimated['+Form.QuestionNumber.value+'][2]="'+Form.LayerB.value+'";\n'
  }
  if (Form.AnswerC.value != "")
  {
    	Choices=Choices+'questionsAnimated['+Form.QuestionNumber.value+'][3]="'+Form.AnswerC.value+'";\n'
    	Layers=Layers+'layersAnimated['+Form.QuestionNumber.value+'][3]="'+Form.LayerC.value+'";\n'
  }
  if (Form.AnswerD.value != "")
  {
    	Choices=Choices+'questionsAnimated['+Form.QuestionNumber.value+'][4]="'+Form.AnswerD.value+'";\n'
    	Layers=Layers+'layersAnimated['+Form.QuestionNumber.value+'][4]="'+Form.LayerD.value+'";\n'
  }
  if (Form.AnswerE.value != "")
  {
    	Choices=Choices+'questionsAnimated['+Form.QuestionNumber.value+'][5]="'+Form.AnswerE.value+'";\n'
    	Layers=Layers+'layersAnimated['+Form.QuestionNumber.value+'][5]="'+Form.LayerE.value+'";\n'
  }
  if (Form.AnswerF.value != "")
  {
    	Choices=Choices+'questionsAnimated['+Form.QuestionNumber.value+'][6]="'+Form.AnswerF.value+'";\n'
    	Layers=Layers+'layersAnimated['+Form.QuestionNumber.value+'][6]="'+Form.LayerF.value+'";\n'
  }
  if (Form.AnswerG.value != "")
  {
    	Choices=Choices+'questionsAnimated['+Form.QuestionNumber.value+'][7]="'+Form.AnswerG.value+'";\n'
    	Layers=Layers+'layersAnimated['+Form.QuestionNumber.value+'][7]="'+Form.LayerG.value+'";\n'
  }
  if (Form.AnswerH.value != "")
  {
    	Choices=Choices+'questionsAnimated['+Form.QuestionNumber.value+'][8]="'+Form.AnswerH.value+'";\n'
    	Layers=Layers+'layersAnimated['+Form.QuestionNumber.value+'][8]="'+Form.LayerH.value+'";\n'
  }
  
  var onetimearrays;
  onetimearrays='var questionNumberAnimated;\n'+
  'var questionsAnimated=new Array();\n'+
  'var answersAnimated=new Array();\n'+
  'var layersAnimated=new Array();\n'
  var onetimeheaderopen;
  var onetimeheaderclose;
  onetimeheaderopen='// BEGIN ONE TIME INSERT OBJECTS FOR RADIO BUTTON TEST QUESTIONS\n';
  onetimeheaderclose='// END ONE TIME INSERT OBJECTS FOR RADIO BUTTON TEST QUESTIONS\n\n';
  
  var retVal;
  retVal="";
  
  if (Form.onetime.checked == false)
  {
  fun_answercorrect="";
  fun_getquestion="";
  fun_buttoncheckq="";
  onetimearrays="";
  onetimeheaderclose="";
  onetimeheaderopen="";
  }else{
	  retVal=retVal+
	  '<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>\n'+
	   '<SCRIPT LANGUAGE="JavaScript">\n'+
	   'function showAnimatedLayer(i, otherLayers, lft, top, wdth, hght, pad){\n'+
			'var numOfLayers = otherLayers.length;\n'+
			'var hideLayers;\n'+
			'for (a=1; a < numOfLayers; a++){\n'+
			'	hideLayers = document.getElementById(otherLayers[a]);\n'+
			'	hideLayers.style.display = "none";\n'+
			'}\n'+
			'var myLayer;\n'+
			'myLayer = document.getElementById(i);\n'+
			'myLayer.style.display = "none";\n'+
			'myLayer.style.left = lft;\n'+
			'myLayer.style.top = top;\n'+
			'myLayer.style.width = wdth;\n'+
			'myLayer.style.height = hght;\n'+
			'myLayer.style.padding = pad;\n'+
						
			'$(myLayer).slideDown("slow");\n'+
			'$(myLayer).click(function(){\n'+
			'	$(myLayer).hide();\n'+
			'});\n'+
	
		'}\n'+
		'</script>\n'
  }
  
  retVal=retVal+
  '<SCRIPT LANGUAGE="JavaScript">\n'+
  '<!--\n'+
  onetimeheaderopen+
  fun_answercorrect+
  fun_getquestion+
  fun_buttoncheckq+
  onetimearrays+
  onetimeheaderclose+
  '// BEGIN RADIO QUESTION '+Form.QuestionNumber.value+' CODE\n'+
  'var formNumberAnimated=new Array();\n'+
  'formNumberAnimated['+Form.QuestionNumber.value+']="QuestionForm'+Form.QuestionNumber.value+'";\n'+
  'questionNumberAnimated='+Form.QuestionNumber.value+';\n'+
  'questionsAnimated['+Form.QuestionNumber.value+']=new Array();\n'+
  'layersAnimated['+Form.QuestionNumber.value+']=new Array();\n'+
  '//This is the test question\n'+
  'questionsAnimated['+Form.QuestionNumber.value+'][0]="'+Form.QuestionText.value+'";\n'+
  '\n'+
  '//These are the answer choices\n'+
  Choices+
  '//These are the associated layersAnimated\n'+
  Layers+
  '\n'+
  '//This is the test answer\n'+
  'answersAnimated['+Form.QuestionNumber.value+']="'+Form.Qanswer.value+'";\n'+
  '//-->\n'+
  '</SCRIPT>\n'+
  '<FORM NAME="QuestionForm'+Form.QuestionNumber.value+'">\n'+
  '<SCRIPT>\n'+
  '<!--\n'+
  '// Display Text for Question '+Form.QuestionNumber.value+'\n'+
  'document.write(getQuestionAnimated('+Form.QuestionNumber.value+'));\n'+
  '//-->\n'+
  '</SCRIPT>\n'+
   '</FORM>\n'+
  '<SCRIPT>\n'+
  '<!--\n'+
  '// END RADIO QUESTION '+Form.QuestionNumber.value+' CODE\n'+
  '//-->\n'+
  '</SCRIPT>\n'+
  '<!--put Review Exercise Layer with Feedback here-->\n'
  
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