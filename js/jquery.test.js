// JavaScript Document

$(document).ready(function(){

	$('#content-toscroll').scrollbars();
	
	
	$('#increase-scroll-w').click(function(){
		$('#content-toscroll').scrollbars('hide');
		var h = parseFloat($('#content-toscroll').css('height'));
		
		if($('.ui-container-scrollbars').attr('half') == 'true'){
			
			$('.ui-container-scrollbars').animate({width:'810px'},1000,function(){
				$('#content-toscroll').scrollbars('updateDragger');
				$('#content-toscroll-2').scrollbars('updateDragger');
			});
			$('.ui-container-scrollbars').removeAttr('half','true');
		}else{
			$('.ui-container-scrollbars').animate({width:'300px'},1000,function(){
				$('#content-toscroll').scrollbars('updateDragger');
				$('#content-toscroll-2').scrollbars('updateDragger');
			});
			$('.ui-container-scrollbars').attr('half','true');
		}
		
	})
	
	$('#increase-scroll').click(function(){
		var h = parseFloat($('#content-toscroll').css('height'))+50;
		$('#content-toscroll').animate({height:h},250,function(){$('#content-toscroll').scrollbars('updateDragger');});
	})
	
	$('#content-toscroll-2').delay(1000).scrollbars();
	
	prettyPrint();
});