/**
 * 
 */
var transMatrix = [ 0.4524800000000001, 0.26176000000000016,
		-0.4524800000000001, 0.26176000000000016, 428.0719999999999,
		27.477759999999904 ];
// var mapMatrix = $("svg #layer1");
var mapMatrix;
var width;
var height;
var TRANSLATE_MAP = "";
$(document).ready(
		function() {

			mapMatrix = document.getElementById("layer1");
			// mapMatrix = document.getElementById("test_layer");

			temp = document.getElementById("blocoa-terreo");
			width = parseInt(temp.getAttribute("width"));
			height = parseInt(temp.getAttribute("height"));
			createZoomElement();
			//translateMap = mapMatrix.getAttributeNS(null, "transform").slice(0,25);
			$("#zoom-in").click(
					function() {
						// console.log(mapMatrix);
						// var element = mapMatrix;
						// var scaleX = element.getBoundingClientRect().width /
						// element.offsetWidth;
						var scaleX = mapMatrix
								.getAttributeNS(null, "transform").slice(7, -1)
								.split(' ');console.log("ScaleX " +scaleX );
						zoomScale(0.8 + scaleX);
					});

			$("#zoom-out").click(
					function() {

//						var scale = 0.2;
//						var transMatrixDefault = [ 0, 0, 0, 0, 0, 0 ];
//				//transMatrixDefault = transMatrix;
//						for (var i = 0; i < transMatrixDefault.length; i++) {
//							transMatrixDefault[i] *= scale;
//						}
//						transMatrixDefault[4] += ((1 - scale) * width / 2);
//						transMatrixDefault[5] += ((1 - scale) * height / 2);
//
//						transMatrixDefault = "matrix(" + transMatrixDefault.join(' ')
//								+ ")";

	//						$("svg #layer1").attr("transform", 
	//								transMatrix);

					});

		});

function zoomScale(factor) {
	mapMatrix.setAttribute("transform", "scale(" + factor + ")")
	mapMatrix.setAttribute("transform", "scale(" + factor + ")");
}

function pan(dx, dy) {

	//mapMatrix.setAttribute("transform", newMatrix + " " + translateMap);
	var size_transform = mapMatrix.getAttributeNS(null, "transform").length;
	
	if(size_transform< 83){
	 //transMatrix = [ 0, 0, 0, 0, 0,0];
	 transMatrix[4] += dx;
		transMatrix[5] += dy;
		newMatrix = "matrix(" + transMatrix.join(' ') + ")";
		mapMatrix.setAttribute("transform", "translate(0,0)" + " " +newMatrix  );
	}else{
		transMatrix[4] += dx;
		transMatrix[5] += dy;
		var newMatrix = "matrix(" + transMatrix.join(' ') + ")";
		mapMatrix.setAttributeNS(null,"transform", newMatrix  );
	}
}

function zoom(scale) {

	for (var i = 0; i < transMatrix.length; i++) {
		transMatrix[i] *= scale;
	}
	transMatrix[4] += ((1 - scale) * width / 2);
	transMatrix[5] += ((1 - scale) * height / 2);

	newMatrix = "matrix(" + transMatrix.join(' ') + ")";
	
	
	// mapMatrix.setAttribute( "transform", newMatrix + " " + translateMap);
	//mapMatrix.setAttribute("transform", translateMap + " " + newMatrix);
	mapMatrix.setAttribute("transform",  newMatrix );

	var ballon = $("svg").find("g4151");
	if (ballon !== undefined) {
		ballon.attr("transform", newMatrix);

	}
	var circles = $("svg g circle");
	if (circles !== undefined) {

		circles.each(function() {
			$(this).attr("transform", "translate(0,0)");

		});
	}

	var lines = $("svg  line");
	if (lines !== undefined) {

		lines.each(function() {
			$(this).attr("transform", "translate(0,0)");

		});
	}

}

function createZoomElement() {

	var ellipse = document.createElementNS("http://www.w3.org/2000/svg",
			"circle");
	ellipse.setAttribute("cx", "50");
	ellipse.setAttribute("cy", "50");
	ellipse.setAttribute("r", "8");
	ellipse.setAttribute("fill", "white");
	ellipse.setAttribute("opacity", "0.75");

	var out = $("svg");
	out.append(ellipse);
	
	
	

	var ellipse = document
			.createElementNS("http://www.w3.org/2000/svg", "path");
	ellipse.setAttribute("class", "button");
	ellipse.setAttribute("d", "M50 10 l12   20 a40, 70 0 0,0 -24,  0z");
	ellipse.setAttribute("onclick", "pan(0, 50)");
	out.append(ellipse);

	ellipse = document.createElementNS("http://www.w3.org/2000/svg", "path");
	ellipse.setAttribute("class", "button");
	ellipse.setAttribute("d", "M10 50 l20  -12 a70, 40 0 0,0   0, 24z");
	ellipse.setAttribute("onclick", "pan( 50, 0)");

	out.append(ellipse);

	ellipse = document.createElementNS("http://www.w3.org/2000/svg", "path");
	ellipse.setAttribute("class", "button");
	ellipse.setAttribute("d", "M50 90 l12  -20 a40, 70 0 0,1 -24,  0z");
	ellipse.setAttribute("onclick", "pan( 0,-50)");

	out.append(ellipse);

	ellipse = document.createElementNS("http://www.w3.org/2000/svg", "path");
	ellipse.setAttribute("class", "button");
	ellipse.setAttribute("d", "M90 50 l-20 -12 a70, 40 0 0,1   0, 24z");
	ellipse.setAttribute("onclick", "pan( -50, 0)");

	out.append(ellipse);

	ellipse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	ellipse.setAttribute("cx", "50");
	ellipse.setAttribute("cy", "50");
	ellipse.setAttribute("r", "20");
	ellipse.setAttribute("class", "compass");

	out.append(ellipse);

	ellipse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	ellipse.setAttribute("cx", "50");
	ellipse.setAttribute("cy", "41");
	ellipse.setAttribute("r", "8");
	ellipse.setAttribute("class", "button");
	ellipse.setAttribute("onclick", "zoom(0.8)");

	out.append(ellipse);

	ellipse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	ellipse.setAttribute("cx", "50");
	ellipse.setAttribute("cy", "59");
	ellipse.setAttribute("r", "8");
	ellipse.setAttribute("class", "button");
	ellipse.setAttribute("onclick", "zoom(1.25)");

	out.append(ellipse);

	ellipse = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	ellipse.setAttribute("x", "46");
	ellipse.setAttribute("y", "39.5");
	ellipse.setAttribute("width", "8");
	ellipse.setAttribute("height", "3");
	ellipse.setAttribute("class", "plus-minus");

	out.append(ellipse);

	ellipse = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	ellipse.setAttribute("x", "46");
	ellipse.setAttribute("y", "57.5");
	ellipse.setAttribute("width", "8");
	ellipse.setAttribute("height", "3");
	ellipse.setAttribute("class", "plus-minus");

	out.append(ellipse);

	ellipse = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	ellipse.setAttribute("x", "48.5");
	ellipse.setAttribute("y", "55");
	ellipse.setAttribute("width", "3");
	ellipse.setAttribute("height", "8");
	ellipse.setAttribute("class", "plus-minus");

	out.append(ellipse);

}
