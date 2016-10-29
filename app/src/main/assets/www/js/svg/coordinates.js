var svgTest;

var coordinatesSVG = [];
var coordinatesMapbox = [];

var latScale = d3.scale.linear().domain([0, 500]).range([-8.059272118696054,-8.058726368206603] );

var lngScale = d3.scale.linear().domain([0, 1250]).range([-34.95077133178711, -34.949552938342094]);

function cursorPoint(x, y) {
	pt.x = x;
	pt.y = y;
	return pt.matrixTransform(svgdoc.getScreenCTM().inverse());
}


function showEdgesRect(){
	
	for(t in coordinatesSVG){
		var ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
		ellipse.setAttribute("id", "edge_rect_" + t);
		ellipse.setAttribute("cx", coordinatesSVG[t][0]);
	
		ellipse.setAttribute("cy", coordinatesSVG[t][1]);
		var lat = latScale(coordinatesSVG[t][1]);
		var log = lngScale(coordinatesSVG[t][0]);
		coordinatesMapbox.push([log,lat ]);		
		ellipse.setAttribute("rx", "6");
		ellipse.setAttribute("ry", "6");
		ellipse.setAttribute("style", "fill:yellow; visibility:visible");
		var out = $('svg');
		out.append(ellipse);
		}
	
}


/*var latScale = d3.scale.linear().domain([0, 501]).range([-8.059272118696054,-8.058726368206603] );

var lngScale = d3.scale.linear().domain([0, 1250]).range([-34.95077133178711, -34.949552938342094]);
*/
/*var conv = [500,250];
var x = d3.scale.linear().range([0,1250])
.domain(d3.extent(conv, function(d) {  return d[0]; })),
y = d3.scale.linear().range([500,0])
.domain(d3.extent(conv, function(d) { return d[1]; }));*/

$(document).ready(
					function() {

						
						
						$('#show_edge_rect').click(function() {
							showEdgesRect();
						});
						
						 svgTest = document.getElementById("blocoa-terreo");
						 
						var width_map_svg = parseFloat(svgTest.getAttribute("width"));
						var height_map_svg = parseFloat(svgTest.getAttribute("height"));
						
//						d3.scale.linear().domain([minCoord, maxCoord]).range([minScreen, maxScreen]);

							    
						 pt_svg_test = svgTest.createSVGPoint();
							$("svg g rect").each(
									function(){
										
											/*var x = parseFloat($(this).attr("x"));
											var y = parseFloat($(this).attr("y")) - 530;
											var width = parseFloat($(this).attr("witdh"));
											var height = parseFloat($(this).attr("height"));*/
										if ($(this).attr("type") == "dept"){ 
										var x = parseFloat($(this).attr("x"));
										var y  = parseFloat($(this).attr("y"));
										 y = y - 530 > 0 ? y - 530	 :  530 - y;
									
										var width = parseFloat($(this).attr("width"));
										var height = parseFloat($(this).attr("height"));
										     var pt1 = 0;
										     var pt2 = 0;
										     var loc;
										     pt1 =x;
										     pt2 =y;
                                             var coordinatesTemp = [x, y];
											coordinatesSVG.push(coordinatesTemp)
											
											pt1 = x + width;
											pt2 = y ;
											coordinatesTemp = [pt1, pt2];
											coordinatesSVG.push(coordinatesTemp);
											
										
											pt2 = y + height;
											coordinatesTemp = [pt1, pt2];
											coordinatesSVG.push(coordinatesTemp);
											
											pt1 = x;
											pt2 = y + height;
											coordinatesTemp = [pt1, pt2];
											coordinatesSVG.push(coordinatesTemp);
											
											coordinatesTemp = [x, y];
											coordinatesSVG.push(coordinatesTemp);
										
											
										}

										
										
										 
									}
									
							);
							
							//showEdgesRect();
							}
					

					
					
);
							
function calLongLat ( evt ) {
var curScale = svgTest.currentScale ;
var translat = svgTest.currentTranslate ;
console.log(translat + " - " + curScale);
}
/*
 * var longitude = theXOrigin + ViewboxArray [ 0 ] [ 0 ] + ( parseFloat ( ( evt .
 * clientX − t r a n s l a t . x ) ∗ ViewboxArray [ 0 ] [ 2 ] / ( curScale ∗
 * ExtentArray [ 0 ] [ 0 ] ) ) ) ; var l a t i t u d e = theYOrigin −
 * ViewboxArray [ 0 ] [ 1 ] − ( parseFloat ( ( evt . clientY − t r a n s l a t .
 * y ) ∗ ViewboxArray [ 0 ] [ 3 ] / ( curScale ∗ ExtentArray [ 0 ] [ 1 ] ) ) ) ;
 * longitude = longitude . toFixed ( thePrecision ) ; l a t i t u d e = l a t i
 * t u d e . toFixed ( thePrecision ) ; }
 */

