/**
 * 
 */


function eBlocoAndarPai(vertice_id){
	if("a0" == vertice_id ||  "a1" == vertice_id || 
			"b0" == vertice_id ||  "b1" == vertice_id ||
			"f0" == vertice_id ||  "f1" == vertice_id
			
	){
		return true;
	}
	return false;
	
}

function getAxisX(evt) {
	var e = evt.target;
	var dim = e.getBoundingClientRect();
	return evt.clientX - dim.left;
}

function getAxisY(evt) {
	var e = evt.target;
	var dim = e.getBoundingClientRect();
	return evt.clientX - dim.left;
}

var LAYER_GLOBAL;
var temp_layer = 'layer1'; //define padrao valor mudar p jquery
var temp_layer_anterior;
var svgdoc;
var svgdoc_andar1;
var node;
var cont_Vertice = 0;
var contNotSector = 0
var id_aresta = "";
var destino = "";
var peso = 1;
var origem = "";
var pt;
var pt2;

var origemX;
var origemY;
var destinoX;
var destinoY;

var option_andar = 't';
var opcao_bloco = 'a';

var vertices_t_andar = [];
var vertices_1_andar = [];
var VERTICES_CRIADOS = [];
var ARESTAS_CRIADAS = [];
var ETIQUETA_ANDAR = 't';

var DESTACADO = false;

function getID(evt) {

	node = evt.target;
	console.log(node);
	var value = node.getAttribute("id");
	if ((id_aresta == "")) {
		origem = value;
	} else {
		destino = value;

	}
	id_aresta = id_aresta + "" + value;

}

function getCoordEdge(evt) {
	// node = evt.target;
	var temp = svgdoc.getElementById(destino);
	destinoX = temp.getAttribute("cx");
	destinoY = temp.getAttribute("cy");
	temp = svgdoc.getElementById(origem);
	
	// console.log(origem);
	/*origemX = temp.getAttribute("cx");
	origemY = temp.getAttribute("cy");*/
	if(temp == null){
		temp = $("#"+origem);
		origemX =	$("#"+origem).attr("cx");
		origemY = $("#"+origem).attr("cy");
	}else{

	// console.log(origem);
		console.log(temp);
		
		origemX = temp.getAttribute("cx")
		origemY = temp.getAttribute("cy")
	}

}

function getCoordEdge2(evt) {
	// node = evt.target;
	var temp = svgdoc_andar1.getElementById(destino);
	destinoX = temp.getAttribute("cx");
	destinoY = temp.getAttribute("cy");
	temp = svgdoc_andar1.getElementById(origem);
	
	if(temp == null){
		origemX =	$("#"+origem).attr("cx");
		origemY = $("#"+origem).attr("cy");
	}else{

	// console.log(origem);
	origemX = temp.getAttribute("cx");
	origemY = temp.getAttribute("cy");
	}
}

function putOffPoints() {
	$("svg ellipse").each(
			function() {

				if ($(this).attr("id").indexOf(temp_layer) >= 0
						&& $(this).parent().is("svg")) {
					$(this).hide();
				}
			});
	$("svg line").each(
			function() {

				if ($(this).attr("id").indexOf(temp_layer) >= 0
						&& $(this).parent().is("svg")) {
				}
			});

}

function isAndar() {
	option_andar = $("#andar").val();
	if (option_andar == "0") {
		temp_layer = $("#layer1").attr("id");
	} else if (option_andar == "1") {
		temp_layer = $("#layer2").attr("id");
	}
}

function putOnGraphs() {

	$("#" + temp_layer + " line").each(function() {
		var elem = document.getElementById($(this).attr("id"));
		elem.setAttribute("id", temp_layer + "-" + $(this).attr("id"))
		svgdoc.appendChild(elem);
		elem.setAttribute("id", $(this).attr("id"));
		$(this).show();
	});

	$("#" + temp_layer + " ellipse").each(function() {
		var elem = document.getElementById($(this).attr("id"));

		elem.setAttribute("id", temp_layer + "-" + $(this).attr("id"))
		svgdoc.appendChild(elem);
		elem.setAttribute("id", $(this).attr("id"));
		$(this).show();
	});
}

function cursorPoint(evt) {
	pt.x = evt.clientX;
	pt.y = evt.clientY;
	return pt.matrixTransform(svgdoc.getScreenCTM().inverse());
}

function cursorPoint2(evt2) {
	pt2.x = evt2.clientX;
	pt2.y = evt2.clientY;
	return pt2.matrixTransform(svgdoc_andar1.getScreenCTM().inverse());
}

function createVerticeOnSVG(evt, id, andar, descricao, sigla) {

	//option_andar = $("#andar").val() == 0 ? 't': 1;
	opcao_bloco = $("#bloco").val();
	var loc;
	if(andar == "0"){
	 loc = cursorPoint(evt);
	}else if(andar == "1"){
	 loc = cursorPoint2(evt);
	}
	
	node = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
	node.setAttribute("id","v" + "-" +  opcao_bloco + "-" +andar + "-" +CONT_VERTICE_GLOBAL);

	node.setAttribute("cx", loc.x);
	node.setAttribute("cy", loc.y );
	node.setAttribute("rx", "12");
	node.setAttribute("ry", "12");
	node.setAttribute("style", "fill:black; stroke-width: 12;visibility: visible");
	node.setAttribute("andar", andar);
	node.setAttribute("bloco", opcao_bloco);
	node.setAttribute("descricao", descricao);
	node.setAttribute("sigla", sigla);
	
	if(id == "x"){
		node.setAttribute("ppi", id +CONT_VERTICE_GLOBAL);
	}else{
	node.setAttribute("ppi", id);
	if(id.indexOf("#") > -1){
		$('<option>').attr("id","v" + "-" +"a-" +ETIQUETA_ANDAR + "-" +CONT_VERTICE_GLOBAL).text(id).appendTo('#entrada_dijkstra');
	}else {
		$('<option>').attr("id","v" + "-" +"a-" +ETIQUETA_ANDAR + "-" +CONT_VERTICE_GLOBAL).text(id).appendTo('#saida_dijkstra');
	}
	}
	var transform = correspodingTransformDestacadoVertice(opcao_bloco, andar);
	node.addEventListener("click", getID, false);
	
	if(opcao_bloco == "a"){
		
	}else if (opcao_bloco == "b"){
		/*var iniX = 590;
		var iniY = 1273;
		*/

		var valorY =1250 - loc.x;
		node.setAttribute("cx",loc.y);
		node.setAttribute("cy", valorY);
		
		
		
	}else if (opcao_bloco == "f"){
		/*var iniX = 590;
		var iniY = 1273;
		
		var referX= 1050;
		var referY = 2519;
		*/
		var valorX = 1425 - loc.y ;
		var valorY = 1250 - loc.x;
		node.setAttribute("cx", loc.y);
		node.setAttribute("cy", valorY);
		
		
		
	}
	
	node.setAttribute(
			"transform",
			transform
			);
	/*node.setAttribute(
			"transform",
			"translate(0,551)"
			);*/
	

	if(andar == "0"){
		
		
		/*node.setAttribute(
				"transform",
				"translate(0,551)"
				);*/
		//var andar = document.getElementById("layer1");
		//var transform_matrix = andar.transform.baseVal[0].matrix;
		//$("#andar1 #layer1 g #" +opcao_bloco + "0").append(node);
		//node.setAttribute("style", "fill:black; stroke-width: 12;visibility: visible");
		//svgdoc_andar1.appendChild(node);
		$("#blocoa-terreo #layer1 g #" +opcao_bloco + "" + andar).append(node);


	}else if(andar == "1"){
		var layer_1 = document.getElementById("layer1");
		var transform_matrix_layer1 = layer_1.transform.baseVal[0].matrix;
		//svgdoc.setAttribute("transform","matrix(-0.87262233,0,0,-1.7197165,1363.0336,1330.9315)") ;
	//	node.setAttribute("cy", (loc.y + 50));
	/*	node.setAttributeNS(null,
				"transform",
				"translate(0,551)"
				);
	*/
		console.log(node);
		//$("#andar1").append(node);
		//document.getElementById("andar1").appendChild(node);
		//$("#blocoa-terreo #layer1 g #" +opcao_bloco + "1").append(node);
		//svgdoc.appendChild(node);
		//svgdoc.appendChild(node);
		$("#andar1 #layer1 g #" +opcao_bloco + "" + andar).append(node);


		
	}
	console.log(node);
	//svgdoc.appendChild(node);
//	if(ETIQUETA_ANDAR== 't'){
//	$('svg #layer1').first().append(node);
//	}else if(ETIQUETA_ANDAR== 1){
//		$('svg #layer2').first().append(node);
//	}
	addVerticeToXML(node);
	//VERTICES_CRIADOS.push(node);

	CONT_VERTICE_GLOBAL++;

	$("#qt_vertice").text(CONT_VERTICE_GLOBAL);
	AGRUPADOR_VERTICE_BLOCO_ANDAR[opcao_bloco+andar].push(node);	
	if(andar == '0'){
		$("#qt_vertice_terreo").text(AGRUPADOR_VERTICE_BLOCO_ANDAR[opcao_bloco+andar].length);
	}else if(andar == '1'){
		$("#qt_vertice_1andar").text(AGRUPADOR_VERTICE_BLOCO_ANDAR[opcao_bloco+andar].length);
	} 
	//addVertice(id, loc.x, loc.y);
	
	cont_Vertice++;
/*	if (cont_Vertice == 2) {

		$("#aresta").css("visibility", "visible");
	}*/
	$("#aresta").show();
}

function createArestaOnSVG(andar) {
	opcao_bloco = $("#bloco").val();
	node = document.createElementNS("http://www.w3.org/2000/svg", "line");
	node.setAttribute("id", "a" + "-" +opcao_bloco+ "-"+ andar+"-"+CONT_ARESTA_GLOBAL);
	node.setAttribute("x1", origemX);
	node.setAttribute("y1", origemY);
	node.setAttribute("x2", destinoX);
	node.setAttribute("y2", destinoY);
	node.setAttribute("andar", andar);
	node.setAttribute("bloco", opcao_bloco);
	node.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:4");
	node.setAttribute("aresta",  origem+"#"+destino);
	/*node.setAttribute(
			"transform",
			"translate(0,551)"
			);*/
	
	
	var transform = correspodingTransformDestacadoVertice(opcao_bloco, andar);
		node.setAttribute(
				"transform",
				transform
				);
	
	
	/*if(origem.substr(2,1) != destino.substr(2,1)){
		
		
		$("#blocoa-terreo #layer1").append(node);
	}else{*/
		
	
   if(andar == "0"){
	   
		
	/*	var andar = document.getElementById("layer1");
		var transform_matrix = andar.transform.baseVal[0].matrix;
	*/	
/*		node.setAttributeNS(null,
				"transform",
				"translate(0,551)"
				);*/
		$("#blocoa-terreo #layer1 g #" + opcao_bloco + "" + andar).append(node);
	}else if(andar == "1"){
		/*var andar = document.getElementById("layer2");
		var transform_matrix = andar.transform.baseVal[0].matrix;
	*/	
	/*	node.setAttributeNS(null,
				"transform",
				"translate(0,551)"
				);*/
		
		$("#andar1 #layer1 g #" + opcao_bloco + "" +andar).append(node);
	}
	
/*}*/

   console.log(node);
	addArestaToXML(node);
	

	$("#qt_aresta").text(CONT_ARESTA_GLOBAL);
	if(origem.substr(2,1) != destino.substr(2,1)){
		console.log("Blocos Diferentes");
		
	}
	if(origem.substr(4,1) != destino.substr(4,1)){
		console.log("Andares Diferentes");
		
	}
	if(origem.substr(2,3) == destino.substr(2,3)){
		console.log("Bloco e Andar Iguais");
	}
	
	CONT_ARESTA_GLOBAL++;
	AGRUPADOR_ARESTA_BLOCO_ANDAR[opcao_bloco+andar].push(node);	
	if(andar == '0'){
		$("#qt_aresta_terreo").text(AGRUPADOR_ARESTA_BLOCO_ANDAR[opcao_bloco+andar].length);
	}else if(andar == '1'){
		$("#qt_aresta_1andar").text(AGRUPADOR_ARESTA_BLOCO_ANDAR[opcao_bloco+andar].length);
	} 
	

}
function updateVisionVertices() {
	 var temp_andar = ETIQUETA_ANDAR == 't' ? 1: 't';
	$("svg ellipse[andar='"+ temp_andar +"'][bloco='"+opcao_bloco+"']").css({"stroke":"black", "visibility":"none"});


	for (var i = 0; i < AGRUPADOR_VERTICE_BLOCO_ANDAR[opcao_bloco+ETIQUETA_ANDAR].length; i++) {
		var node_temp = document.createElementNS("http://www.w3.org/2000/svg",
				"ellipse");
		node_temp = AGRUPADOR_VERTICE_BLOCO_ANDAR[opcao_bloco+ETIQUETA_ANDAR][i];
		// node_temp.setAttribute("visibility", "visible");
		svgdoc.appendChild(node_temp);
	}
	 //$("#qt_vertices").text(CONT_VERTICE_GLOBAL +AGRUPADOR_VERTICE_BLOCO_ANDAR["a"+ETIQUETA_ANDAR].length);
}

function updateVisionArestas() {
	 var temp_andar = ETIQUETA_ANDAR == 't' ? 1: 't';
		$("svg ellipse[andar='"+ temp_andar +"'][bloco='"+opcao_bloco+"']").css({"stroke":"black", "visibility":"none"});

	$("svg line[andar='"+temp_andar +"'][bloco='"+opcao_bloco+"']").css({"stroke":"black", "visibility":"none"});

	for (var i = 0; i < AGRUPADOR_ARESTA_BLOCO_ANDAR[opcao_bloco+ETIQUETA_ANDAR].length; i++) {
		var node_temp = document.createElementNS("http://www.w3.org/2000/svg",
				"line");
		node_temp = AGRUPADOR_ARESTA_BLOCO_ANDAR[opcao_bloco+ETIQUETA_ANDAR][i];
		// node_temp.setAttribute("visibility", "visible");
		svgdoc.appendChild(node_temp);
	}
	//$("#qt_arestas").text(CONT_ARESTA_GLOBAL + AGRUPADOR_ARESTA_BLOCO_ANDAR["a"+ETIQUETA_ANDAR].length);
}

function correspodingTransformDestacado(bloco){
	
	if(bloco == "a"){
		return  "translate(0,-551)";
	}else if(bloco == "b"){
		return  "matrix(0, -0.9999983310699463, 0.9999983310699463, 0, -1290.170166015625, 1325.2496337890625)";
	}else if(bloco == "f"){
		return "matrix(0, 0.9999970197677612, -0.9999970197677612, 0, 1915.748046875, 941.9669189453125)"
	}
	
}

function correspodingTransformDestacadoVertice(bloco, andar){
	
	if(bloco == "a"){
		return  "translate(0,551)";
	}else if(bloco == "b"){
		/*return  "matrix(0.4524800181388855, 0.26175928115844727, -0.4524800181388855, 0.26175928115844727, 978.072021484375, -573.13671875)";*/
		if(andar == "0"){
		return "translate(790,1273)";
		}else if(andar == "1"){
			return "translate(800,1273)";
		}
	
	}else if(bloco == "f"){
		return "translate(-950,670)";
	}
	
}

function mudarBloco(bloco){
	var transform;
	if(DESTACADO ==true){
		transform = correspodingTransformDestacado(bloco);
	}else{
		transform =correspodingTransformRetomado(bloco);
	}
	
	$("#map-0 #blocoa-terreo #layer1").attr("transform",transform);
	$("#map-1 #andar1 #layer1").attr("transform",transform);														


}

function correspodingTransformRetomado(bloco){
	
	if(bloco == "a"){
		return  "matrix(0.45248,0.26176,-0.45248,0.26176,728.072,-123.13672)";
	}else if(bloco == "b"){
		return  "matrix(0.4524800181388855, 0.26175928115844727, -0.4524800181388855, 0.26175928115844727, 978.072021484375, -573.13671875)";
	}else if(bloco == "f"){
		return "matrix(0.4524800181388855,0.26175928115844727, -0.4524800181388855, 0.26175928115844727, 1478.072021484375, 76.86328125)"
	}
	
}

$(document)
		.ready(
				function() {
					
					$("#option").hide();
					
					//svgdoc = document.documentElement;

					svgdoc = document.getElementById("blocoa-terreo");
					svgdoc_andar1 = document.getElementById("andar1");

					pt = svgdoc.createSVGPoint(); // ok! Fine!
					pt2 = svgdoc_andar1.createSVGPoint();
					//$("svg #layer2").hide();
					
					$('#visualizar_grafos').change(function() {
						opcao_bloco = $("#bloco").val();
						
						if($("#visualizar_grafos").is(':checked')){

					
							$("ellipse[bloco='"+opcao_bloco+"']").each(
									function(){
										$(this).show();
												//$(this).show();
												$(this).css("style", "visibility:visible");
												$(this).show();
												//$(this).css("style", "display:inline");
												
									});
							
							$("line[bloco='"+opcao_bloco+"']").each(
									function(){
										//$(this).show();
												$(this).show();
									});
							
		
					
						}else{
							/*$("ellipse[bloco='"+opcao_bloco+"']").each(
									function(){
										//$(this).show();
										$(this).hide();
									});*/
						
						$("ellipse[bloco='"+opcao_bloco+"']").each(
								function(){
									//$(this).show();
											$(this).hide();
											
								});
						
						$("line[bloco='"+opcao_bloco+"']").each(
								function(){
									//$(this).show();
											$(this).hide();
								});
						}
					});
					
					$("#bloco")
					.change(
							function() {
								var bloco  = $("#bloco").val();
								 $(".rotulo_bloco").text(bloco.toUpperCase());
								if(DESTACADO == true){
								
								var transform = correspodingTransformDestacado(bloco);
								$("#map-0 #blocoa-terreo #layer1").attr("transform",transform);
								$("#map-1 #andar1 #layer1").attr("transform",transform);														
								}else{
									var transform = correspodingTransformRetomado(bloco);
									$("#map-0 #blocoa-terreo #layer1").attr("transform",transform);
									$("#map-1 #andar1 #layer1").attr("transform",transform);														
								
								}
							}
							);
					
					
					/*$("#andar")
							.change(
									function() {
										
										console.log("Andar atualizado");
		
										option_andar = $("#andar").val();

										if (option_andar == "0") {
											console
											.log("Option Choice Floor: T");
									// $("#layer2").hide();

									LAYER_GLOBAL = document
											.getElementById("layer1");

									temp_layer = $("#layer1")
											.attr("id");
											
											ETIQUETA_ANDAR = 't';
											mapMatrix = document
													.getElementById("layer1");
												
											vertices_1_andar = VERTICES_CRIADOS;
											VERTICES_CRIADOS = vertices_t_andar;
											temp_layer = $("#layer1")
													.attr("id");
											$('#layer1 g #a0').show();
											$('#layer1 g #a1').hide();

											//$('#layer1 g #a0').attr("transform","matrix(0.45248,0.26176,-0.45248,0.26176,728.072,-123.13672)");
											 var temp_andar = ETIQUETA_ANDAR == 't' ? 1: 't';
												$("ellipse[andar='"+ temp_andar +"'][bloco='"+opcao_bloco+"']").each(
														function(){
															//$(this).show();
															
															$(this).hide();
														});
												$("line[andar='"+ temp_andar +"'][bloco='"+opcao_bloco+"']").each(
														function(){
															//$(this).show();
															
															$(this).hide();
														});
											
										} else if (option_andar == "1") {
											
											
											console
											.log("Option Choice Floor: 1");

									LAYER_GLOBAL = document
											.getElementById("layer2");

									temp_layer = $("#layer1").attr("id");
									$('#layer1 g #a1').attr("style", "visibility:visible");
									$('#layer1 g #a1').attr("style", "display:inline");
									$('#layer1 g #a0').attr("style", "visibility:hidden");
									$('#layer1 g #a0').attr("style", "display:none");
									
									$('#layer1 g #a1').show();
									$('#layer1 g #a0').hide();
									//$('#layer1 g #a1').attr("transform","matrix(0.45248,0.26176,-0.45248,0.26176,728.072,-123.13672)");
											
											ETIQUETA_ANDAR = '1';
											mapMatrix = document
													.getElementById("layer1");
											vertices_t_andar = VERTICES_CRIADOS;

											VERTICES_CRIADOS = vertices_1_andar;
											
											 var temp_andar = ETIQUETA_ANDAR == 't' ? 1: 't';

												$("ellipse[andar='"+ temp_andar +"'][bloco='"+opcao_bloco+"']").each(
														function(){
															//$(this).show();
															
															$(this).hide();
														});
												$("line[andar='"+ temp_andar +"'][bloco='"+opcao_bloco+"']").each(
														function(){
															//$(this).show();
															
															$(this).hide();
														});


											temp_layer = $("#layer1")
													.attr("id");
										}
										
										// document.getElementById(temp_layer).setAttributeNS(null,"transform","translate(0,
										// -551)");
										//		
										
										

									});*/
					
					$("#destacar")
					.click(function() {


						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						//$("#visualizar_grafos").prop( "checked", true );
						
							$("#option").show();
							/*$("#andar").hide();*/
							
							var bloco  = $("#bloco").val();
							
							var transform = correspodingTransformDestacado(bloco);
							$("#map-0 #blocoa-terreo #layer1").attr("transform",transform);
							$("#map-1 #andar1 #layer1").attr("transform",transform);														
						
							
							/*$("#map-0  #layer1").attr("transform","translate(0, -551)");
							$("#map-1  #layer1").attr("transform","translate(0, -551)");*/
							/*if(ETIQUETA_ANDAR == 't'){
								document.getElementById("layer1").setAttributeNS(null,"transform","translate(0, -551)");
							}else if(ETIQUETA_ANDAR == '1'){
								document.getElementById("layer1").setAttributeNS(null,"transform","translate(0, -551)");
							}*/
							
							
						//updateVisionVertices();
						
							$("ellipse[andar='"+option_andar +"'][bloco='"+opcao_bloco+"']").each(
									function(){
										//$(this).show();
										$( this ).css( "visibility", "visible" );
										$(this).show();
									});
							$("line[andar='"+option_andar +"'][bloco='"+opcao_bloco+"']").each(
									function(){
										$( this ).css( "visibility", "visible" );
									$(this).show();
									});
					
							$("#retomar").attr("style", "visibility:visible");
							$('#retomar').attr("style", "display:inline");
							$('#destacar').attr("style", "visibility:hidden");
							$('#destacar').attr("style", "display:none");
							
							DESTACADO = true;
							
						
	/*							$("#blocoa-terreo #map-marker").attr("transform","");
								$("#blocoa-terreo #map-marker").attr("transform","");
								$("#andar1 #map-marker").attr("transform","");
								$("#andar1 #map-marker").attr("transform","");
								
							*/
							});
					
					$("#retomar")
					.click(function() {
						DESTACADO = false;
						
					/*		$("#blocoa-terreo #map-marker").attr("transform","skewX(-45 "+ $("#blocoa-terreo #map-marker").attr("x") +  " " +  $("#blocoa-terreo #map-marker").attr("y") + ")");
							$("#blocoa-terreo #map-marker").attr("transform","rotate(-60 "+ $("#blocoa-terreo #map-marker").attr("x") +  " " +  $("#blocoa-terreo #map-marker").attr("y") + ")");
							$("#andar1 #map-marker").attr("transform","skewX(-45 "+ $("#blocoa-terreo #map-marker").attr("x") +  " " +  $("#blocoa-terreo #map-marker").attr("y") + ")");
							$("#andar1 #map-marker").attr("transform","rotate(-60 "+ $("#blocoa-terreo #map-marker").attr("x") +  " " +  $("#blocoa-terreo #map-marker").attr("y") + ")");
						*/
						$("#option").hide();
						/*$("#andar").show();*/
						$("#destacar").attr("style", "visibility:visible");
						$('#destacar').attr("style", "display:inline");
						$('#retomar').attr("style", "visibility:hidden");
						$('#retomar').attr("style", "display:none");
						//document.getElementById("layer1").setAttributeNS(null,"transform","matrix(0.45248,0.26176,-0.45248,0.26176,728.072,-123.13672)");
						
					/*	
						$("#map-0  #layer1").attr("transform","matrix(0.45248,0.26176,-0.45248,0.26176,728.072,-123.13672)");
						$("#map-1  #layer1").attr("transform","matrix(0.45248,0.26176,-0.45248,0.26176,728.072,-123.13672)");*/
						
						var bloco  = $("#bloco").val();
						var transform = correspodingTransformRetomado(bloco);
						$("#map-0 #blocoa-terreo #layer1").attr("transform",transform);
						$("#map-1 #andar1 #layer1").attr("transform",transform);														
					

					});
					

					$(".grafo")
							.click(
									function() {

										

										// svgdoc.setAttributeNS("http://www.w3.org/2000/svg","transform","translate(0,
										// -551)" );

										if ($("input:checked").val() == 'vertice') {
											//$("#visualizar_grafos").prop( "checked", false );
											// $("svg").off("click");
											console
													.log("Click on map to create vertice!");
											// $("svg #" + temp_layer)
											$("#blocoa-terreo").attr('onclick','').unbind('click');
											$("#blocoa-terreo")
											.click(
													function(evt) {
														// svgdoc =
														// evt.dfhgetTarget().getOwnerDocument();
														var node_aux = evt.target;
														var andar_temp = 0;
														

														node = document
																.createElementNS(
																		"http://www.w3.org/2000/svg",
																		"ellipse");
														if (node_aux.nodeName == "svg") {
														
															
															
														
															createVerticeOnSVG(
																	evt,
																	"x",
																	andar_temp,
																	"",
																	"");
															
														} else if (node_aux.parentNode.nodeName == "g" && 
																 eBlocoAndarPai(node_aux.parentNode.getAttribute("id")) != true) {
															if(node_aux.parentNode.getAttribute("type") == "dept" ){
																createVerticeOnSVG(
																		evt,					
																		node_aux.parentNode.getAttribute("id"),
																		andar_temp,
																		node_aux.parentNode.getAttribute("descricao"),
																		node_aux.parentNode.getAttribute("sigla")
																	
																				);
																}else{
																		createVerticeOnSVG(
																				evt,					
																				node_aux.parentNode.getAttribute("id"),
																				andar_temp,
																				node_aux.parentNode.getAttribute("descricao"),
																				node_aux.parentNode.getAttribute("sigla"));
																		
																}
														} else {
															console
																	.log("Vertice is not creating!")
														}
														// node.setAttribute("id",cont_Vertice);

													});
											$("#andar1").attr('onclick','').unbind('click');
											$("#andar1")
											.click(
													function(evt) {
														// svgdoc =
														// evt.dfhgetTarget().getOwnerDocument();
														var node_aux = evt.target;
														var andar_temp = '1';
														/*if (node_aux.getAttribute("id") == "blocoa-terreo"){
															andar_temp = 0;
														}else if (node_aux.getAttribute("id") == "andar1"){
															andar_temp = 1;
														}*/
														// var
														// flagNotInser
														// = true;
														// node =
														// svgdoc.createElement("ellipse");

														node = document
																.createElementNS(
																		"http://www.w3.org/2000/svg",
																		"ellipse");
														if (node_aux.nodeName == "svg") {
														
															
															
														
															createVerticeOnSVG(
																	evt,
																	"x", 		
																	andar_temp,
																	"",
																	"");
															
//															var value = "aux"
//																+ contNotSector;
//														contNotSector++;
														}  else if (node_aux.parentNode.nodeName == "g" && 
																 eBlocoAndarPai(node_aux.parentNode.getAttribute("id")) != true) {
															if(node_aux.parentNode.getAttribute("type") == "dept" ){
																createVerticeOnSVG(
																		evt,					
																		node_aux.parentNode.getAttribute("id"),
																		andar_temp,
																		node_aux.parentNode.getAttribute("descricao"),
																		node_aux.parentNode.getAttribute("sigla")
																	
																				);
																}else{
																		createVerticeOnSVG(
																				evt,					
																				node_aux.parentNode.getAttribute("id"),
																				andar_temp,
																				node_aux.parentNode.getAttribute("descricao"),
																				node_aux.parentNode.getAttribute("sigla"));
																		
																}
														}  else {
															console
																	.log("Vertice is not creating!")
														}
														// node.setAttribute("id",cont_Vertice);

													});


											

										} else if ($("input:checked").val() == 'aresta') {
											console
													.log("Click no mapa para criar ARESTA!");
											//$("#blocoa-terreo").off("click");
											$("#blocoa-terreo").attr('onclick','').unbind('click');
											$("#blocoa-terreo")
													.click(
															function(evt) {
																// $(this).off(
																// "click");
																// svgdoc =
																// evt.dfhgetTarget().getOwnerDocument();

																// node =
																// svgdoc.createElement("ellipse");
																if ((id_aresta != "")
																		&& (destino != "")
																		&& (origem != "")) {
																	getCoordEdge(evt);
																	if(origem != destino){
																		
																	createArestaOnSVG('0');
						
																	}else{
																		console
																		.log("edge wasn't created ! vertice is the same!!!")
																	}
																	id_aresta = "";
																	origem = "";
																	destino = "";
																} else {
																	console
																			.log("Edges weren't Created")
																}
																// console.log(cont_Vertice);
															});
											//$("#andar1").off("click");
											$("#andar1").attr('onclick','').unbind('click');
											$("#andar1")
											.click(
													function(evt) {
														// $(this).off(
														// "click");
														// svgdoc =
														// evt.dfhgetTarget().getOwnerDocument();

														// node =
														// svgdoc.createElement("ellipse");
														if ((id_aresta != "")
																&& (destino != "")
																&& (origem != "")) {
															getCoordEdge2(evt);
															if(origem != destino){
															createArestaOnSVG('1');
				
															}else{
																console
																.log("edge wasn't created ! vertice is the same!!!")
															}
															id_aresta = "";
															origem = "";
															destino = "";
														} else {
															console
																	.log("Edges weren't Created")
														}
														// console.log(cont_Vertice);
													});

										}
									});
					
					

				});
