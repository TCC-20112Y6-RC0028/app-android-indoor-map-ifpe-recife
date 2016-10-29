
var svgMap = "";
var node ;
var pos = "";
var id="";

var TEMP_WL;
function removeCircle() {
	pos.remove();
}


function changeDisplayFloor(value){
	
	if(value == "0"){
		
	}else {
		
	}
}

function createCircle(radius) {

	node = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
	var rect = pos.find("rect");
	node.setAttribute("id", 'circle_temp');
	node.setAttribute("cx", parseInt(rect.attr("x")) - 1);
	node.setAttribute("cy", parseInt(rect.attr("y")) - 531);
	node.setAttribute("r", radius);
	 node.setAttribute("stroke", "red");
	//node.setAttribute("fill", "red");
	 $('svg').append(node);
}

function increaseRadius() {
	if (typeof node !== "undefined") {
		removeCircle();

	} else {
		

	}
	
	createCircle(50);
	setTimeout(decreaseRadius(), 10000);

}

function decreaseRadius() {
	removeCircle();
	createCircle(10);
//	setTimeout(increaseRadius(), 10000);

}

function getPosition(id) {
	//return $('svg').find(id);
	return svgMap.find(id).find('rect');
};

function writeOnMap() {
	increaseRadius();
}

$(document).ready(function() {
/*	$('#layer1 g #a0').attr("style", "visibility:visible");
	$('#layer1 g #a0').attr("style", "display:inline");
	$('#layer1 g #a1').attr("style", "visibility:hidden");
	$('#layer1 g #a1').attr("style", "display:none");*/
	$("#map-0  #layer1 #a #a1").hide();
	$("#map-0  #layer1 #b #b1").hide();
	$("#map-0  #layer1 #f #f1").hide();
	
	$("#map-1  #layer1 #a #a0").hide();
	
	$("#map-1  #layer1 #b #b0").hide();
	$("#map-1  #layer1 #f #f0").hide();

	
	$(".map-marker").each(
			function(){
				//$(this).show();
						$(this).hide();
						
			});
	
	$(".street-view").each(
			function(){
				//$(this).show();
						$(this).hide();
						
			});
	
		
		$("use[andar= '1']").click(function(){
			
			
			         window.location = "#map-1"; // redirect
			   
		});
		
		$("use[andar= '0']").click(function(){
			
			
			 
		         window.location = "#map-0"; // redirect
		     
		});
		
	
	
	$("use").mouseleave(function(){
		
		$(this).css("fill", "#000000");
		$(this).css("stroke", "#000000");

	});
	
	$("use").mouseenter(function(){
		
		$(this).css("fill", "yellow");
		$(this).css("stroke", "yellow");
	});
	

	
	$("use").click(function(){
		if($(this).attr("bloco") !== undefined){
		mudarBloco(	$(this).attr("bloco"));
		$("#bloco").val($(this).attr("bloco"));
		$(".rotulo_bloco").text($(this).attr("bloco").toUpperCase());
		}
	});

	$("rect").click(function() {
	 
	    $("#descricao").text(   $( this).parent().attr("descricao"));
		$("#num_sala").text( $( this).parent().attr("id"));
		$("#sigla").text($( this).parent().attr("sigla"));
		$("#ramal").text($( this).parent().attr("ramal"));
		
		$("#foto").attr("src", "img/"+ $( this).parent().attr("id") + ".JPG" );
		$("#foto").load(function(){
			console.log("Image loaded");
			   }).error(function(){
				   console.log("Image not loaded");
	    	$("#foto").attr("src", "img/not_found.png" );
	    	$("#foto").load(function(){
	    		console.log("Image loaded");
	        }).error(function(){
	            console.log("Image not loaded");
	        });   	
	    });
		
		
	  });
	
	$("#andar").change(function(){
	 var url = $(this).val(); // get selected value
     if (url) { // require a URL
         window.location = url; // redirect
     }
	 });
	
	
 
	
	/*$('#andar').change(function() {
		var val_andar = $('#andar').val();
		
		if(val_andar == "1"){
			$('#layer1 g #a1').attr("style", "visibility:visible");
			$('#layer1 g #a1').attr("style", "display:inline");
			$('#layer1 g #a0').attr("style", "visibility:hidden");
			$('#layer1 g #a0').attr("style", "display:none");
		}else{
			$('#layer1 g #a0').attr("style", "visibility:visible");
			$('#layer1 g #a0').attr("style", "display:inline");
			$('#layer1 g #a1').attr("style", "visibility:hidden");
			$('#layer1 g #a1').attr("style", "display:none");
		}
		
		

	});*/
	
	/*$('#visualizar_grafos').change(function() {
		
		if($("#visualizar_grafos").is(':checked')){

			$("svg ellipse[andar ='t']").each(function(){
				$(this).show();
			});
			
		}else{
			$("svg ellipse[andar ='t']").each(function(){
				$(this).hide();
			});
		}
		
		

	});
	*/
	
	
	
});