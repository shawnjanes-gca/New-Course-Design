// JavaScript Document

jQuery(document).ready(function(e) {

	var circleOne = jQuery(".circle1");
	var circleTwo = jQuery(".circle2");
	var blueBorder = jQuery(".blue-border");
	var resetButton  = jQuery("#resetButton");


		
		
	/**Circle One**/
	function circle(){
		TweenLite.to(circleOne, 1, {top:"-55px", width: "140px", autoAlpha:1, ease: Power2.easeInOut});	
	}


	/**Circle Two**/
	function circle2(){
	//	TweenLite.to(circleTwo, 2, {right:"40%" , top:"75%", scale:0.1, autoAlpha:0, ease: Power2.easeInOut});	
	TweenLite.to(circleTwo, 1, {top:"-10px", width: "150px", autoAlpha:1, ease: Power2.easeInOut});	
	}

	/**Circle Two**/
	function Final(){
		TweenLite.to(circleOne, 2, {left:"38%" , top:"75%", scale:0.1, autoAlpha:0, ease: Power2.easeInOut});	
		TweenLite.to(circleTwo, 2, {right:"40%" , top:"75%", scale:0.1, autoAlpha:0, ease: Power2.easeInOut});	
		TweenLite.to(blueBorder, 1, { y:"0px", scale:1, autoAlpha:1, delay:1 ,ease: Power2.easeInOut});	
	}

	/**Reset **/
	function Reset(){
		TweenLite.to(circleOne, 1, {top:"-195px", left:"100px",width: "0", scale:1, autoAlpha:1, ease: Power2.easeInOut});	
		TweenLite.to(circleTwo, 1, {top:"-190px", right:"100px", width: "0",scale:1,  autoAlpha:1, ease: Power2.easeInOut});	
		TweenLite.to(blueBorder, 1, { y:"-70px", scale:0.1, autoAlpha:0, ease: Power2.easeInOut});	
	}	

	jQuery("td.left-bar .checkbox-design input").click(function(){
		var i = 0;
		jQuery('td.left-bar .checkbox-design input:checked').each(function(){
			i++;
		});
		// alert(i)
		if (i == 1) {
			circle();
		}else{
			jQuery('.circle1').attr('style','');
		}
	});


	jQuery("td.right-bar .checkbox-design input").click(function(){
		var j = 0;
		jQuery('td.right-bar .checkbox-design input:checked').each(function(){
			j++;
		});

		var i = 0;
		jQuery('td.left-bar .checkbox-design input:checked').each(function(){
			i++;
		});

		// alert(j)
		if (j == 3 && i == 1) {
			var style = jQuery('.circle1').attr('style');
			if (style == "") {
				circle();
			};
			circle2();
		}else{
			jQuery('.circle2').attr('style','');
		}
		if (j == 3 && i == 1) {
			setTimeout(function(){
			  Final();
			}, 1000);
		};
	});
	
	
/**Reset**/
jQuery("#resetButton").click(function(){
	Reset();
});	
	
});




