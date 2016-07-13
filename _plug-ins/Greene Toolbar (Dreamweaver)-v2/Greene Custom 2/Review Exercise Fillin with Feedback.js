

//---------------   GLOBAL VARIABLES   ---------------

var helpDoc = MM.HELP_objMeta;

//---------------     API FUNCTIONS    ---------------

function objectTag() {

var Form = document.theForm;
var fun_fill_buttonCheckQ;
fun_fill_buttonCheckQ='function fill_buttonCheckQAnimated_onclick(questionNum, formName)\n'+
'{\n'+
'	var answer=0;\n'+
'	var correct="false";\n'+
'	var answerlength=fill_answersAnimated[questionNum].length;\n'+
'	for (answerchoice=0; answerchoice<answerlength; answerchoice++)\n'+
'		{\n'+
'			if (fill_answersAnimated[questionNum][answerchoice]==formName.value)\n'+
'			{\n'+
'				correct="true";\n'+
'			}\n'+
'		}\n'+
'	if (correct=="true")\n'+
'	{\n'+
'		showAnimatedLayer(layersAnimated[questionNum][answer], layersAnimated[questionNum], \'left in px\', \'top in px\', \'width in px\', \'height in px - leave blank to be dynamic\', \'padding in px\');\n'+
'		formName.disabled=true;\n'+
'	}\n'+
'	else\n'+
'	{\n'+
'		showAnimatedLayer(layersAnimated[questionNum][answer], layersAnimated[questionNum], \'left in px\', \'top in px\', \'width in px\', \'height in px - leave blank to be dynamic\', \'padding in px\');\n'+
'	}\n'+
'}\n'
var onetimeheaderopen;
var onetimeheaderclose;
var onetimearrays;
onetimeheaderopen='//BEGIN ONE TIME INSERT OBJECTS FOR FILL IN THE BLANK TEST QUESTIONS\n';
onetimeheaderclose='// END ONE TIME INSERT OBJECTS FOR FILL IN THE BLANK TEST QUESTIONS\n\n';
onetimearrays='var fill_questionsAnimated=new Array();\n'+
'var fill_answersAnimated=new Array();\n'+
'var fill_layersAnimated=new Array();\n'+
'var fill_formNumberAnimated=new Array();\n'
var retVal;
if (Form.onetime.checked == false)
  {
  fun_fill_buttonCheckQ="";
  onetimeheaderopen="";
  onetimeheaderclose="";
  onetimearrays="";
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
var answerchoices;
answerchoices="";
  if (Form.AnswerA.value != "")
  {
  	answerchoices=answerchoices+'fill_answersAnimated['+Form.QuestionNumber.value+'][0]="'+Form.AnswerA.value+'";\n'
  }
  if (Form.AnswerB.value != "")
    {
    	answerchoices=answerchoices+'fill_answersAnimated['+Form.QuestionNumber.value+'][1]="'+Form.AnswerB.value+'";\n'
  }
  if (Form.AnswerC.value != "")
    {
    	answerchoices=answerchoices+'fill_answersAnimated['+Form.QuestionNumber.value+'][2]="'+Form.AnswerC.value+'";\n'
  }
  if (Form.AnswerD.value != "")
    {
    	answerchoices=answerchoices+'fill_answersAnimated['+Form.QuestionNumber.value+'][3]="'+Form.AnswerD.value+'";\n'
  }
  if (Form.AnswerE.value != "")
    {
    	answerchoices=answerchoices+'fill_answersAnimated['+Form.QuestionNumber.value+'][4]="'+Form.AnswerE.value+'";\n'
  }
  if (Form.AnswerF.value != "")
    {
    	answerchoices=answerchoices+'fill_answersAnimated['+Form.QuestionNumber.value+'][5]="'+Form.AnswerF.value+'";\n'
  }
  if (Form.AnswerG.value != "")
    {
    	answerchoices=answerchoices+'fill_answersAnimated['+Form.QuestionNumber.value+'][6]="'+Form.AnswerG.value+'";\n'
  }
  if (Form.AnswerH.value != "")
    {
    	answerchoices=answerchoices+'fill_answersAnimated['+Form.QuestionNumber.value+'][7]="'+Form.AnswerH.value+'";\n'
  }

  retVal=retVal+'\n'+
  '<SCRIPT LANGUAGE="JavaScript">\n'+
  '<!--\n'+  
  onetimeheaderopen+
  fun_fill_buttonCheckQ+
  onetimeheaderclose+
  onetimearrays+
  '// BEGIN FILL IN THE BLANK QUESTION '+Form.QuestionNumber.value+' CODE\n'+
  'fill_formNumberAnimated['+Form.QuestionNumber.value+']="fillForm'+Form.QuestionNumber.value+'";\n'+
  'fill_questionsAnimated['+Form.QuestionNumber.value+']=new Array();\n'+
  'fill_layersAnimated['+Form.QuestionNumber.value+']=new Array();\n'+
  'fill_answersAnimated['+Form.QuestionNumber.value+']=new Array();\n'+
  '//here is the question\n'+
  'fill_questionsAnimated['+Form.QuestionNumber.value+'][0]="'+Form.QuestionText.value+'";\n'+
  '// these are the correct answers\n'+
  answerchoices+
  '// these are the associated layers\n'+
  '// 1 is correct\n'+
  '// 2 is incorrect\n'+
  'fill_layersAnimated['+Form.QuestionNumber.value+'][1]="'+Form.CorrectLayer.value+'";\n'+
  'fill_layersAnimated['+Form.QuestionNumber.value+'][2]="'+Form.IncorrectLayer.value+'";\n'+
  'document.write("<P><B>"+fill_questionsAnimated['+Form.QuestionNumber.value+'][0]+"</B></P>");\n'+
  '//-->\n'+
  '</script>\n'+
  '<form name="fillForm'+Form.QuestionNumber.value+'" onSubmit="return false">\n'+
    '<input type="text" name="fillAnswer'+Form.QuestionNumber.value+'" id="fillAnswer'+Form.QuestionNumber.value+'" class="fillInSpace"><br/>\n'+
    '<input type="button" name="buttonCheckQ" onClick="return fill_buttonCheckQAnimated_onclick('+Form.QuestionNumber.value+', window.document.fillForm'+Form.QuestionNumber.value+'.fillAnswer'+Form.QuestionNumber.value+')" value="SUBMIT" class="submit-btn">\n'+
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






