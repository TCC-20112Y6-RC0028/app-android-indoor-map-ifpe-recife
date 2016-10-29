
var docXML;
var distancia = [];
var percorrido = [];
var caminho = [];
var caminho_temp = [] ;
var ant = [];
var dist = [];
var visitado = [];
var grau;

var  wrapGraphArray;
var  coordenadas = [];
function ElemAdj(id, peso, x, y, adj){
	this.id = id;
	this.peso = peso;
	this.x = x;
	this.y =y;
	this.adj = adj;
}

function Vertice (id, x, y, peso,andar,bloco) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.andar = andar;
	this.bloco = bloco;
}

function Aresta (id, x, y, peso,andar,bloco) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.andar = andar;
	this.bloco = bloco;
	this.peso = peso;
}

function grau_vertice(){
	this.vizinhos = {};
}

var grid_easystar;
var grid_dijkistra;

function gerarRota(){
	
	/*$("#layer1 line").attr("style", "visibility:hidden");
	$("#layer1 ellipse").attr("style", "visibility:hidden");*/
/*	$("#blocoa-terreo #street-view").hide();
	$("#blocoa-terreo #map-marker").hide();
	$("#andar1 #street-view").hide();
	$("#andar1 #map-marker").hide();
	*/

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
	
	
/*	$("ellipse[bloco='"+opcao_bloco+"']").each(
			function(){
				//$(this).show();
						$(this).hide();
						
			});*/
	$("ellipse").each(
			function(){
				//$(this).show();
						$(this).hide();
						
			});
	
	/*$("line[bloco='"+opcao_bloco+"']").each(
			function(){
				//$(this).show();
						$(this).hide();
			});*/
	
	$("line").each(
			function(){
				//$(this).show();
						$(this).hide();
			})

	var e = document.getElementById("entrada_dijkstra");
	var d = document.getElementById("saida_dijkstra");
	destino = d.options[d.selectedIndex].getAttribute("id");
	
	var origem  = $("#destino").val();
	if(origem == "" || origem === undefined){
	 origem = e.options[e.selectedIndex].getAttribute("id");
	}
	destino = $("#entrada").val();
	
	if(destino == "" || destino === undefined){
		destino = e.options[e.selectedIndex].getAttribute("id");
		}
	
	console.log("source: [" + origem + "]\ndestin: [" + destino +"]"  );

	
	if(wrapGraphArray.indexOf(origem) > -1  && wrapGraphArray.indexOf(destino) > -1  ){
		/*	if(circleB !== undefined && circleA !== undefined  ){
			pulseOffCircles();	
		}*/
		
	origem = wrapGraphArray.indexOf(origem);
			
		destino = wrapGraphArray.indexOf(destino);
		dijkstra(origem,destino);
		
		/*$("#destino").val("");
		$("#entrada").val("");*/
		
		//pulseCircles(wrapGraphArray[origem], wrapGraphArray[destino]);
		
	}else{
		console.log("Id not Found Array!");
	}
}

function gerarRotaParam(origin, destin){
	if(origin!== undefined  && destin  !== undefined){
		
	   // origem = wrapGraphArray.indexOf(origem);
			
		// destino = wrapGraphArray.indexOf(destino);
		var temp_origem = wrapGraphArray.indexOf(origin);
		
		var temp_destino = wrapGraphArray.indexOf(destin);
		dijkstra(temp_origem,temp_destino);
		
		/*pulseCircles(origin,destin);*/
		
	}else{
		console.log("Id not Found Array!");
	}
}
  
var parametersURL;

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

  
function getParametersFromURL()  
  {  
	var querystr = [];  
   loc = window.location.search.substr(1).split('&');  
   for (query in loc)  
     {  
      var q = loc[query].split('=');  
      querystr[q[0]] = q[1];  
     }  
   return querystr;  l
  }  



$(document).ready(function() {
	
	
	
	this.DESTACADO = false;
	AGRUPADOR_BLOCO_ANDAR.push("a0");
	AGRUPADOR_BLOCO_ANDAR.push("a1");
	AGRUPADOR_BLOCO_ANDAR.push("b0");
	AGRUPADOR_BLOCO_ANDAR.push("b1");
	AGRUPADOR_BLOCO_ANDAR.push("f0");
	AGRUPADOR_BLOCO_ANDAR.push("f1");
	
	 AGRUPADOR_VERTICE_BLOCO_ANDAR  = {AGRUPADOR_BLOCO_ANDAR};
	 AGRUPADOR_ARESTA_BLOCO_ANDAR  = {AGRUPADOR_BLOCO_ANDAR}; 
	 AGRUPADOR_VERTICE_BLOCO_ANDAR["a0"] = [];
	 AGRUPADOR_VERTICE_BLOCO_ANDAR["a1"] = [];
	 AGRUPADOR_VERTICE_BLOCO_ANDAR["b0"] = [];
	 AGRUPADOR_VERTICE_BLOCO_ANDAR["b1"] = [];
	 AGRUPADOR_VERTICE_BLOCO_ANDAR["f0"] = [];
	 AGRUPADOR_VERTICE_BLOCO_ANDAR["f1"] = [];
	 AGRUPADOR_ARESTA_BLOCO_ANDAR["a0"] = [];
	 AGRUPADOR_ARESTA_BLOCO_ANDAR["a1"] = [];
	 AGRUPADOR_ARESTA_BLOCO_ANDAR["b0"] = [];
	 AGRUPADOR_ARESTA_BLOCO_ANDAR["b1"] = [];
	 AGRUPADOR_ARESTA_BLOCO_ANDAR["f0"] = [];
	 AGRUPADOR_ARESTA_BLOCO_ANDAR["f1"] = [];
	
	$('#criar').click(function() {
		salvaXML();
	});
	parametersURL = getParametersFromURL();
	
	docXML = abrirDoc();
	loadGrafosFromFileXML();
	parseXMLJQuery();
	
	
	if( parametersURL["ppi"]  != null && parametersURL["destin"]  != null){
		
	/*gerarRotaParam( parametersURL["ppi"] + "#", parametersURL["destin"]+ "#");*/
	gerarRotaParam( parametersURL["ppi"] , parametersURL["destin"]);
		}else{
	
/*	if( parametersURL["ppi"]  != null){
		pulseCircle( parametersURL["ppi"] + "#" );
		}
		if( parametersURL["destin"]  != null){
			pulseCircle( parametersURL["destin"] + "#" );
			}*/
		}
	
});


function abrirDoc() {
	// var parser = new DOMParser();

	// return parser.parseFromString(, "text/xml");
	

	
	return getFileXML();

	
	
	
	


}

function getFileXML(){
	var result;
	//var xml_path_url = "http://localhost:8888/" + $('svg').attr("id")+".xml"
	// ;
	// var xml_path_url = "http://localhost:8888/ServletUpdateMap?id_map=" +
	// $('svg').attr("id") ; //localhost
	// var xml_path_url = "/ServletUpdateMap?id_map=" + $('svg').attr("id") ;
	 var xml_path_url = "/ServletUpdateMap?id_map=a" ;


	$.ajax({
		url : xml_path_url,
		type : 'GET',
		dataType : 'xml',
		async: false,
		processData: true ,
		success : function(response) {
		// console.log(response);
			result = response;
		},
		error : function(xhr, status, error) {
			result = xhr;
		console.log(xhr);
		}
	});
	
	return result;
	
}

var xml= "";
function parseXMLJQuery(){
	 xml = docXML;
// $(xml).find('*').each(function(){
// var quote_text = $(this).text()
// console.log(quote_text);
// });
}

function addVerticeToXML(node) {
	
	
	var vertice = docXML.createElement("vertice");
	vertice.setAttribute("id", node.getAttribute("id"));
	vertice.setAttribute("x", node.getAttribute("cx"));
	vertice.setAttribute("y", node.getAttribute("cy"));
	vertice.setAttribute("type", "vertice");
	vertice.setAttribute("bloco", node.getAttribute("bloco"));
	vertice.setAttribute("andar", node.getAttribute("andar"));
	vertice.setAttribute("ppi", node.getAttribute("ppi"));
	vertice.setAttribute("descricao", node.getAttribute("descricao"));
	vertice.setAttribute("sigla", node.getAttribute("sigla"));
	docXML.documentElement.appendChild(vertice);
	// console.log(docXML);
	return true;
}


function addArestaToXML(node) {

		var aresta  = docXML.createElement("aresta");
		var x1 = node.getAttribute("x1");
		var x2 =node.getAttribute("x2");
		var y1 =node.getAttribute("y1")
		var y2 =node.getAttribute("y2")
			
		aresta.setAttribute("id", node.getAttribute("id"));
		aresta.setAttribute("x1", node.getAttribute("x1"));
		aresta.setAttribute("y1", node.getAttribute("y1") );
		aresta.setAttribute("x2", node.getAttribute("x2"));
		aresta.setAttribute("y2", node.getAttribute("y2"));
		aresta.setAttribute("type", "aresta");
		aresta.setAttribute("peso", Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)));
		aresta.setAttribute("bloco",node.getAttribute("bloco"));
		aresta.setAttribute("andar",node.getAttribute("andar"));
		aresta.setAttribute("aresta",node.getAttribute("aresta"));
		docXML.documentElement.appendChild(aresta);
		// console.log(docXML);
		return true;
	
}



function addOnBloco(andar, bloco ){
	var bloco_jquery;
	try{
		bloco_jquery =  xml.find( "bloco#" +bloco );
	}catch(e){
		
	}
	if(!(undefined === bloco_jquery) ){	
		bloco_jquery.append(andar);
		
	}else{
		bloco_jquery  = $("<bloco id=\"" +bloco +"\"></bloco>"); 		
		bloco_jquery.append(andar);
	}
	
	return bloco_jquery;
}

function addOnAndar(node, andar,bloco){
	var andar_jquery;
	var bloco_jquery;
	try{
		bloco_jquery =  $xml.find( "bloco#" + bloco + " andar#" + andar );
}catch(e){
	
}
	if(!(undefined === bloco_jquery) ){
	andar_jquery = $(node);
	}else{
		andar_jquery  = $("<andar id=\"" +andar +"\">"+ $(node).attr("id")+ "</andar>"); 
				
	}
	
	return andar_jquery;
}


function salvaXML() {
	var xml_path_url = '/ServletUpdateMap?id_map='+ $('svg').attr("id");

	$.ajax({
		url : xml_path_url,
		type : 'POST',
		dataType : 'xml',
		data : "xml=" + docXML.documentElement.outerHTML,
		ansyc: true,
		processData : true,
		success : function(response) {
			console.log(response);
		},
		error : function(xhr, status, error) {
			console.log(xhr.responseText);
		}
	});

}

function FileLoad() {
	getURL(filename, abrirDoc);
	function abrirDoc(data) {
		var string = '';
		if (data.success) {
			string = data.content;
			var document = parseXML(string, document);
			file = document.childNodes.item(0);
			return file;
		} else {
			return;
		}
	}
}


function adicionarGrafosNaColecaoAgrupado(no){
	
	var tipo = no.getAttribute("type");
	var bloco = no.getAttribute("bloco");
	var andar = no.getAttribute("andar");
	
	if(bloco ==  "a"){
		if(andar == "0"){
			if(tipo == "vertice"){
				AGRUPADOR_VERTICE_BLOCO_ANDAR["a0"].push(no);
			}else if(tipo == "aresta"){
				
				 AGRUPADOR_ARESTA_BLOCO_ANDAR["a0"].push(no);
			}
		}else
		if(andar == "1"){
			if(tipo == "vertice"){
				AGRUPADOR_VERTICE_BLOCO_ANDAR["a1"].push(no);
			}else if(tipo == "aresta"){
				
				 AGRUPADOR_ARESTA_BLOCO_ANDAR["a1"].push(no);
			}
		}
	}else if(bloco ==  "b"){
			if(andar == "0"){
				if(tipo == "vertice"){
					AGRUPADOR_VERTICE_BLOCO_ANDAR["b0"].push(no);
				}else if(tipo == "aresta"){
					
					 AGRUPADOR_ARESTA_BLOCO_ANDAR["b0"].push(no);
				}
			}else
			if(andar == "1"){
				if(tipo == "vertice"){
					AGRUPADOR_VERTICE_BLOCO_ANDAR["b1"].push(no);
				}else if(tipo == "aresta"){
					
					 AGRUPADOR_ARESTA_BLOCO_ANDAR["b1"].push(no);
				}
			}
		
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

function loadGrafosFromFileXML() {
	// xml = abrirDoc(data);
  	var x = docXML.getElementsByTagName("vertice");
	// svgdoc = evt.getTarget().getOwnerDocument();
	wrapGraphArray= [];
	var indexSelectEntrada = 0;
	var indexSelectSaida = 0;
	var cont_vertice = 0;
	for (var i = 0; i < x.length; i++) {
		var vertice_x = x.item(i).getAttribute("x");
		var vertice_y = x.item(i).getAttribute("y");
		var vertice_id = x.item(i).getAttribute("id");
		var vertice_ppi = 	x.item(i).getAttribute("ppi");
		var vertice_key = 	x.item(i).getAttribute("key");
		var vertice_andar = 	x.item(i).getAttribute("andar");
		var vertice_bloco = 	x.item(i).getAttribute("bloco");
		var vertice_tipo = 	x.item(i).getAttribute("type");
		
		var vertice_sigla = 	x.item(i).getAttribute("sigla");
		var vertice_descricao = 	x.item(i).getAttribute("descricao");
		
		// var vertice_id_parse = vertice_id.replace("#", "");
		var type_shape; 
		var option;
		

		
		if(vertice_ppi.indexOf("#") > -1) {
		
			// type_shape = $("svg " + vertice_ppi).attr("descricao");
			
			/* option = new Option(
					 vertice_ppi ,  vertice_id);*/
			option = new Option(
					vertice_sigla+ " - " + vertice_descricao ,  vertice_id);
			 //vertice_ppi+ " - " + type_shape  - mudar depois de criar rota
			 
			 document.getElementById("entrada_dijkstra").options[indexSelectEntrada] = option;
			document.getElementById("entrada_dijkstra").options[indexSelectEntrada].setAttribute("id",vertice_id );

				indexSelectEntrada++;
		}else if(vertice_ppi.length  > 1 && vertice_ppi.indexOf("x") == -1 ){
			// vertice_id_parse ="#" + vertice_id_parse;
			type_shape = $("svg #" + vertice_ppi).attr("sigla");
			// vertice_id_parse = vertice_id_parse.replace("#", "");
			option = new Option(
					vertice_ppi+ " - " + type_shape,  vertice_id);
			document.getElementById("saida_dijkstra").options[indexSelectSaida] = option;
			document.getElementById("saida_dijkstra").options[indexSelectSaida].setAttribute("id",vertice_id);
			indexSelectSaida++;
		
		}
		


		
		var ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
		ellipse.setAttribute("id", vertice_id);
		ellipse.setAttribute("cx", vertice_x);
		//ellipse.setAttribute("cy", eval(vertice_y) +551);
		ellipse.setAttribute("cy", eval(vertice_y) );
		/*
		 * ellipse.setAttribute("rx", "6"); ellipse.setAttribute("ry", "6");
		 */
		ellipse.setAttribute("rx", "12");
		ellipse.setAttribute("ry", "12");

		ellipse.setAttribute("andar", vertice_andar);
		ellipse.setAttribute("type", vertice_tipo);

		ellipse.setAttribute("bloco", vertice_bloco);
		ellipse.setAttribute("ppi", vertice_ppi);
		
		//ellipse.setAttribute("style", "visibility:hidden");
		$(ellipse).hide();
		ellipse.addEventListener("click", getID, true);
		// $('svg').append(ellipse);
		var transform = correspodingTransformDestacadoVertice(vertice_bloco, vertice_andar);
		ellipse.setAttributeNS(null,"transform", transform);
		
		if(vertice_andar == "0"){
			
		
			
			//$('#blocoa-terreo #layer1').first().append(ellipse);
			$("#blocoa-terreo #layer1 #"+vertice_bloco+ " #" +vertice_bloco + "" + vertice_andar).append(ellipse);
			//$("#blocoa-terreo #layer1 g #" +vertice_bloco + "" + vertice_andar).append(ellipse);
		}else if(vertice_andar == "1"){
	
			/*ellipse.setAttributeNS(null,
					"transform",
					"translate(0,551)"
					);
			*/
			//$('#andar1 #layer1').first().append(ellipse);
			$("#andar1  #layer1 #"+vertice_bloco+ " #" +vertice_bloco + "" + vertice_andar).append(ellipse);
			//$("#andar1 #layer1 g #" +aresta_bloco + "" + aresta_andar).append(ellipse);

		}
		//svgdoc.appendChild(ellipse);
		//$("svg").append(ellipse);
		wrapGraphArray.push(vertice_id);
		
		
		//AGRUPADOR_VERTICE_BLOCO_ANDAR["at"].push(ellipse);
		adicionarGrafosNaColecaoAgrupado(ellipse);
	}
	grau= {wrapGraphArray};
	
	var totalGraph = $("svg ellipse").length;
	
	initMatrixAdj(totalGraph, totalGraph);
	
	
	
  	var x = docXML.getElementsByTagName("aresta");
	// svgdoc = evt.getTarget().getOwnerDocument();
  	 
	for (var i = 0; i < x.length; i++) {
		var aresta_x1 = x.item(i).getAttribute("x1");
		var aresta_y1 = x.item(i).getAttribute("y1");
		var aresta_x2 = x.item(i).getAttribute("x2");
		var aresta_y2 = x.item(i).getAttribute("y2");
		var aresta_id = x.item(i).getAttribute("id");
		var aresta_key = x.item(i).getAttribute("key");
		var aresta_aresta = x.item(i).getAttribute("aresta");
		var aresta_bloco = x.item(i).getAttribute("bloco");
		var aresta_andar = x.item(i).getAttribute("andar");
		var aresta_peso = x.item(i).getAttribute("peso");
		var aresta_type = x.item(i).getAttribute("type");
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");		
 
		var graph_a =aresta_aresta.substr(0,aresta_aresta.indexOf("#"));
		
		var graph_b =aresta_aresta.substr(aresta_aresta.indexOf("#")+1, aresta_aresta.length );
		grid_dijkistra[graph_a][graph_b].id =  aresta_aresta;
	    grid_dijkistra[graph_a][graph_b].peso = parseInt(aresta_peso);
	    grid_dijkistra[graph_a][graph_b].adj = wrapGraphArray.indexOf(graph_b);
	    grau[graph_a].push(graph_b);
	    
	    
	    grid_dijkistra[graph_b][graph_a].id = aresta_aresta;
	    grid_dijkistra[graph_b][graph_a].peso = parseInt(aresta_peso);
	    grid_dijkistra[graph_b][graph_a].adj = wrapGraphArray.indexOf(graph_a);
	    grau[graph_b].push(graph_a);
	    // console.log("Aresta Peso [" + graph_a +"]["+ graph_b+"]:"
		// +aresta_peso );
	    // grid_easystar[ grid_dijkistra[graph_a][graph_b].x][
		// grid_dijkistra[graph_a][graph_b].y] = 1;
	    aresta_y1 = eval(aresta_y1);
	  	aresta_y2 = eval(aresta_y2);
	  
		line.setAttribute("id", aresta_id);
		line.setAttribute("x1",aresta_x1 );
		//line.setAttribute("y1", aresta_y1 + 551 );
		line.setAttribute("y1", aresta_y1 );
		line.setAttribute("x2", aresta_x2);
		line.setAttribute("y2",aresta_y2 );

//		line.setAttribute("y2",aresta_y2 + 551);
		line.setAttribute("andar",  aresta_andar);
		
		line.setAttribute("bloco",  aresta_bloco);
		line.setAttribute("aresta", aresta_aresta);
		line.setAttribute("type", aresta_type);
		line.setAttribute("style", "stroke:rgb(0,0,0); stroke-width:2; visibility:invisible");
		$(line).hide();
		
		var transform = correspodingTransformDestacadoVertice(aresta_bloco, aresta_andar);
		line.setAttributeNS(null,"transform", transform);
		
		
		
		if(aresta_andar == "0"){
			

			
			/*line.setAttributeNS(null,
					"transform",
					"translate(0,551)"
					);*/
			//$('#blocoa-terreo #layer1').first().append(line);
			$("#blocoa-terreo #layer1 #"+aresta_bloco+ " #" +aresta_bloco + "" + aresta_andar).append(line);

			//$("#blocoa-terreo #layer1 g #" +aresta_bloco + "" + aresta_andar).append(line);
		}else if(aresta_andar == "1"){

/*			line.setAttributeNS(null,
					"transform",
					"translate(0,551)"
					);*/
			
			//$('#andar1 #layer1').first().append(line);
			$("#andar1 #layer1 #"+aresta_bloco+ " #" +aresta_bloco + "" + aresta_andar).append(line);
			//$("#andar1 #layer1 g #" +aresta_bloco + "" + aresta_andar).append(line);
			
		}
		
		//$('svg').append(line);
		
		
		//AGRUPADOR_ARESTA_BLOCO_ANDAR["at"].push(line);
		adicionarGrafosNaColecaoAgrupado(line);
		
	}
	$("#qt_aresta").text(AGRUPADOR_ARESTA_BLOCO_ANDAR["a0"].length+AGRUPADOR_ARESTA_BLOCO_ANDAR["a1"].length);
	$("#qt_vertice").text(AGRUPADOR_VERTICE_BLOCO_ANDAR["a0"].length + AGRUPADOR_VERTICE_BLOCO_ANDAR["a1"].length);
	
	$("#qt_aresta_terreo").text(AGRUPADOR_ARESTA_BLOCO_ANDAR["a0"].length);
	$("#qt_vertice_terreo").text(AGRUPADOR_VERTICE_BLOCO_ANDAR["a0"].length);
	
	$("#qt_aresta_1andar").text(AGRUPADOR_ARESTA_BLOCO_ANDAR["a1"].length);
	$("#qt_vertice_1andar").text(AGRUPADOR_VERTICE_BLOCO_ANDAR["a1"].length);
	CONT_VERTICE_GLOBAL = AGRUPADOR_VERTICE_BLOCO_ANDAR["a0"].length+AGRUPADOR_VERTICE_BLOCO_ANDAR["a1"].length;
	CONT_ARESTA_GLOBAL = AGRUPADOR_ARESTA_BLOCO_ANDAR["a0"].length+AGRUPADOR_ARESTA_BLOCO_ANDAR["a1"].length
}



function initMatrixAdj(width, height) {
	grid_easystar = [];
	grid_dijkistra = {wrapGraphArray};
	for (var i = 0; i < wrapGraphArray.length; i++) {	
		
		grau[wrapGraphArray[i]] = [];
		grid_dijkistra[wrapGraphArray[i]] = {wrapGraphArray};
		ant[i] = -1;
		dist[i] = -1;
		visitado[i] = 0;
 
		for (var j = 0; j < wrapGraphArray.length; j++) {

			grid_dijkistra[wrapGraphArray[i]][wrapGraphArray[j]] = (new ElemAdj());
			grid_dijkistra[wrapGraphArray[i]][wrapGraphArray[j]].id = "#";
			grid_dijkistra[wrapGraphArray[i]][wrapGraphArray[j]].peso = -1;
			grid_dijkistra[wrapGraphArray[i]][wrapGraphArray[j]].adj = -1;
			
		
			grid_dijkistra[wrapGraphArray[i]][wrapGraphArray[j]].x = i;
			grid_dijkistra[wrapGraphArray[i]][wrapGraphArray[j]].y = j;
		}
	}	
}

function initArraysAuxiliares(){
	for (var i = 0; i < wrapGraphArray.length; i++) {	

		ant[i] = -1;
		dist[i] = -1;
		visitado[i] = 0;
	}
}


function dijkstra(ini, destin){

	var u;
	var ind;
	dist[ini] = 0 ;
	var u = ini;
	var cont = wrapGraphArray.length;
	while(cont >  0){
		
		var menor = -1;
		var primeiro = 1;
		for (var i = 0; i < wrapGraphArray.length; i++) {
			if(dist[i] >= 0 && visitado[i] ==0){
				if(primeiro){
					menor = i ;
					primeiro = 0;
					u = menor;
				}else{
					if(dist[menor] > dist[i]){
						menor = i;
						u = menor;
					}
				}
				
			}
			
		}
				
		if(u == -1){
			break;
		}
		
		visitado[u] =1;
		cont--;
		
		// for (var i = 0; i < grau[wrapGraphArray[u]]; i++){
		for (var i = 0; i < grau[wrapGraphArray[u]].length ; i++){
			ind = grid_dijkistra[wrapGraphArray[u]][grau[wrapGraphArray[u]][i]].adj;
			var peso = grid_dijkistra[wrapGraphArray[u]][grau[wrapGraphArray[u]][i]].peso;
			if(dist[ind] <  0){
				dist[ind] = dist[u] + peso;
				ant[ind] = u;
 				
			}else{
				if(dist[ind] > dist[u] + peso){
					dist[ind] = dist[u] + peso;
					ant[ind] =  u;
				}
				
			}
			
		}
		
	}
	
	var vertice = destin;
	// $("svg #" + destin)
	//$("ellipse[id='"+wrapGraphArray[destin]+"']").show();
	//
	var andar_map_marker = new String(wrapGraphArray[destin]).substr(4,1);
	var bloco_map_marker = new String(wrapGraphArray[destin]).substr(2,1);
	var transform = correspodingTransformDestacadoVertice(bloco_map_marker, andar_map_marker);
	if(new String(wrapGraphArray[destin]).substr(4,1).valueOf() == "1"){
		$("#andar1 #" + bloco_map_marker + " #map-marker").attr("x", $("ellipse[id='"+wrapGraphArray[destin]+"']").attr("cx")-50);
		$("#andar1 #" + bloco_map_marker + " #map-marker").attr("y", $("ellipse[id='"+wrapGraphArray[destin]+"']").attr("cy"));
		
		$("#andar1 #" + bloco_map_marker + " #map-marker").show();
		
		
	}else if(new String(wrapGraphArray[destin]).substr(4,1).valueOf() == "0"){
		$("#blocoa-terreo #" + bloco_map_marker + " #map-marker").attr("x", $("ellipse[id='"+wrapGraphArray[destin]+"']").attr("cx")-50);
		$("#blocoa-terreo #" + bloco_map_marker + " #map-marker").attr("y", $("ellipse[id='"+wrapGraphArray[destin]+"']").attr("cy"));
		$("#blocoa-terreo #" + bloco_map_marker + " #map-marker").show();
		/*$("#blocoa-terreo #map-marker").attr("transform","skewY(-45)");*/
	} 
	
	/*if(this.DESTACADO == false){
		$("#blocoa-terreo #map-marker").attr("transform","skewX(-45 "+ $("#blocoa-terreo #map-marker").attr("x") +  " " +  $("#blocoa-terreo #map-marker").attr("y") + ")");
		$("#blocoa-terreo #map-marker").attr("transform","rotate(-60 "+ $("#blocoa-terreo #map-marker").attr("x") +  " " +  $("#blocoa-terreo #map-marker").attr("y") + ")");
		$("#andar1 #map-marker").attr("transform","skewX(-45 "+ $("#blocoa-terreo #map-marker").attr("x") +  " " +  $("#blocoa-terreo #map-marker").attr("y") + ")");
		$("#andar1 #map-marker").attr("transform","rotate(-60 "+ $("#blocoa-terreo #map-marker").attr("x") +  " " +  $("#blocoa-terreo #map-marker").attr("y") + ")");
		
	}else{
		$("#blocoa-terreo #map-marker").attr("transform","");
		$("#blocoa-terreo #map-marker").attr("transform","");
		$("#andar1 #map-marker").attr("transform","");
		$("#andar1 #map-marker").attr("transform","");
		
	}*/
	var vertice_ppi = $("svg #" + wrapGraphArray[destin] ).attr("ppi").replace("#", "");  
	$("#descricao").text($("svg #" + vertice_ppi).attr("descricao"));
	$("#num_sala").text( $("svg #" + vertice_ppi).attr("id"));
	$("#sigla").text($("svg #" + vertice_ppi).attr("sigla"));
	$("#ramal").text($("svg #" + vertice_ppi).attr("ramal"));
	//$("#email").text($("svg #" + vertice_ppi).attr("email"));
	/* var obj = document.getElementById( wrapGraphArray[destin]);
	 obj.setAttribute('style', "stroke:rgb(0,0,0);stroke-width:2; visibility:visible");	 
	*/
	 //obj.setAttribute("style","stroke:blue");
	// $("#" + wrapGraphArray[destin]).show();
	$("#foto").attr("src", "img/"+ vertice_ppi + ".JPG" ).load(function(){
		console.log("Image loaded");
		   }).error(function(){
			   /*console.log("Image not loaded");*/
    	$("#foto").attr("src", "img/not_found.png" );
    	$("#foto").load(function(){
    		/*console.log("Image loaded");*/
        }).error(function(){
            /*console.log("Image not loaded");*/
        });   	
    });
	 var id_aresta;
	 $("svg #"+ wrapGraphArray[ini]).css({display:"inline", fill: "rgb(255,0,0)"}).show();
	 $("svg #"+ wrapGraphArray[destin]).css({ display:"inline", fill: "rgb(255,0,0)"}).show();
	 if(ini == destin){
		 alert("A origem e igual ao  destino!")
		 
			var andar_map_marker = new String(wrapGraphArray[ini]).substr(4,1);
			var bloco_map_marker = new String(wrapGraphArray[ini]).substr(2,1);
			
			$("#bloco").val(bloco_map_marker);
			this.mudarBloco(bloco_map_marker);
			var andar_interface = "#map-"+andar_map_marker;
			$("#andar").val(andar_interface);
			window.location = andar_interface; 

	 }else{
		 
	while( vertice != ini && vertice !== undefined ){

		
		try{
		
			id_aresta = (wrapGraphArray[ant[vertice]]+"#"+wrapGraphArray[vertice]);
			    var aresta  = $("line[aresta='"+ id_aresta+"'");
	    aresta = document.getElementById(aresta.attr("id"));
	    if((new String(wrapGraphArray[ant[vertice]]).substr(2,3).valueOf() == new String(wrapGraphArray[vertice]).substr(2,3).valueOf())   ){
	    aresta.setAttribute('style', 'stroke:rgb(255,0,0);stroke-width:4; visibility:visible');
	    $(aresta).show();
	    }else{
	    	var andar_map_marker = new String(wrapGraphArray[vertice]).substr(4,1);
	    	var bloco_map_marker = new String(wrapGraphArray[vertice]).substr(2,1);
	    	if(new String(wrapGraphArray[vertice]).substr(4,1).valueOf() == "0"){
	    	
	    	$("#blocoa-terreo #" + bloco_map_marker + " #street-view").attr("x", $("ellipse[id='"+wrapGraphArray[vertice]+"']").attr("cx")-50);
			$("#blocoa-terreo #" + bloco_map_marker + " #street-view").attr("y", $("ellipse[id='"+wrapGraphArray[vertice]+"']").attr("cy"));
			$("#blocoa-terreo #" + bloco_map_marker + " #street-view").show();
	    	}else if(new String(wrapGraphArray[vertice]).substr(4,1).valueOf() == "1"){
	    		$("#andar1 #" + bloco_map_marker + " #street-view").attr("x", $("ellipse[id='"+wrapGraphArray[vertice]+"']").attr("cx")-50);
				$("#andar1 #" + bloco_map_marker + " #street-view").attr("y", $("ellipse[id='"+wrapGraphArray[vertice]+"']").attr("cy"));
				$("#andar1 #" + bloco_map_marker + " #street-view").show();	
	    	}
	    }
	  
			// aresta.css({"stroke":"rgb(0,0,0)","stroke-width":"2", "visibility":"visible"});
		}catch(err){
		}
	    id_aresta = (wrapGraphArray[vertice] + "#" + wrapGraphArray[ant[vertice]]);
	    try{
	    aresta  = $("line[aresta='"+ id_aresta+"'");
	    aresta = document.getElementById(aresta.attr("id"));
	    if((new String(wrapGraphArray[ant[vertice]]).substr(2,3).valueOf() == new String(wrapGraphArray[vertice]).substr(2,3).valueOf())    ){
		    aresta.setAttribute('style', 'stroke:rgb(255,0,0);stroke-width:4; visibility:visible');
		    $(aresta).show();
		    }else{
		    	var andar_map_marker = new String(wrapGraphArray[vertice]).substr(4,1);
		    	var bloco_map_marker = new String(wrapGraphArray[vertice]).substr(2,1);
		    	
		    	if(new String(wrapGraphArray[vertice]).substr(4,1).valueOf() == "0"){
			    	
			    	$("#blocoa-terreo #" + bloco_map_marker + " #street-view").attr("x", $("ellipse[id='"+wrapGraphArray[vertice]+"']").attr("cx")-50);
					$("#blocoa-terreo #" + bloco_map_marker + " #street-view").attr("y", $("ellipse[id='"+wrapGraphArray[vertice]+"']").attr("cy"));
					$("#blocoa-terreo #" + bloco_map_marker + " #street-view").show();
			    	}else if(new String(wrapGraphArray[vertice]).substr(4,1).valueOf() == "1"){
			    		$("#andar1 #" + bloco_map_marker + " #street-view").attr("x", $("ellipse[id='"+wrapGraphArray[vertice]+"']").attr("cx")-50);
						$("#andar1 #" + bloco_map_marker + " #street-view").attr("y", $("ellipse[id='"+wrapGraphArray[vertice]+"']").attr("cy"));
						$("#andar1 #" + bloco_map_marker + " #street-view").show();	
			    	}
		    	
		    	
		    	}
	   // $("line[aresta='"+ id_aresta+"'").show();
	    //aresta.setAttribute('style', 'stroke:rgb(0,0,0);stroke-width:2; visibility:visible');
	    }catch(err){
		}
	    
	    
		console.log("source: [" + wrapGraphArray[ant[vertice]] + "] destin: [" + wrapGraphArray[vertice] +"]"  );
		$("svg #"+ wrapGraphArray[ant[vertice]]).css({fill: "rgb(255,0,0)"}).show();
		$("svg #"+ wrapGraphArray[vertice]).css({fill: "rgb(255,0,0)"}).show();
		vertice = ant[vertice];
	}
	//$("ellipse[id='"+ wrapGraphArray[ini]+"']").show();
	var andar_map_marker = new String(wrapGraphArray[ini]).substr(4,1);
	var bloco_map_marker = new String(wrapGraphArray[ini]).substr(2,1);
	
	$("#bloco").val(bloco_map_marker);
	this.mudarBloco(bloco_map_marker);
	var andar_interface = "#map-"+andar_map_marker;
	$("#andar").val(andar_interface);
	window.location = andar_interface; 
	var transform = correspodingTransformDestacadoVertice(bloco_map_marker, andar_map_marker);
	if(new String(wrapGraphArray[ini]).substr(4,1).valueOf() == "1"){
		$("#andar1 #" + bloco_map_marker + " #street-view").attr("x", $("ellipse[id='"+wrapGraphArray[ini]+"']").attr("cx")-50);
		$("#andar1 #" + bloco_map_marker + " #street-view").attr("y", $("ellipse[id='"+wrapGraphArray[ini]+"']").attr("cy"));
		
		$("#andar1 #" + bloco_map_marker + " #street-view").show();
	}else if(new String(wrapGraphArray[ini]).substr(4,1).valueOf() == "0"){
		$("#blocoa-terreo #" + bloco_map_marker + " #street-view").attr("x", $("ellipse[id='"+wrapGraphArray[ini]+"']").attr("cx")-50);
		$("#blocoa-terreo #" + bloco_map_marker + " #street-view").attr("y", $("ellipse[id='"+wrapGraphArray[ini]+"']").attr("cy"));
		$("#blocoa-terreo #" + bloco_map_marker + " #street-view").show();
	} 
	/* obj = document.getElementById( wrapGraphArray[ini]); 
	 obj.setAttribute('style', 'fill:black;stroke-width:2; visibility:visible');*/
	// $("#" + wrapGraphArray[ini]).show();
	 }
	 
	 if(vertice === undefined){
						
		 alert("Nao caminho/trajeto entre origem e destino");
}
	 
	 initArraysAuxiliares();
	
	 
}


var circleA, circleB;

function pulseOffCircles(){
	circleA.transition()
    .remove();
	circleB.transition()
    .remove();
	
}

function pulseCircles(idCircleA, idCircleB){
	
	 circleA = d3.select("ellipse[id='"+ idCircleA +"']");
	circleB= d3.select("ellipse[id='"+ idCircleB +"']");
	
	(function repeat() {
		circleA = circleA.transition()
			.duration(2000)
			.attr("stroke-width", 20)
			.attr("r", 10)
			.transition()
			.duration(2000)
			.attr('stroke-width', 0.3)
			.attr("r", 6)
			.ease('sine')
			.each("end", repeat);
	})();
	
	(function repeat() {
		circleB = circleB.transition()
			.duration(2000)
			.attr("stroke-width", 20)
			.attr("r", 10)
			.transition()
			.duration(2000)
			.attr('stroke-width', 0.3)
			.attr("r", 6)
			.ease('sine')
			.each("end", repeat);
	})();
}

function pulseCircle(idCircleA){
	try{
	var obj = document.getElementById(idCircleA);
	 obj.setAttribute('style', 'visibility:visible');	 
	 obj.setAttribute("style","fill:none");
	 obj.setAttribute("style","stroke:blue");
	 circleA = d3.select("svg circle[id='"+ idCircleA +"']");
	 

	(function repeat() {
		circleA = circleA.transition()
			.duration(2000)
			.attr("stroke-width", 20)
			.attr("r", 10)
			.transition()
			.duration(2000)
			.attr('stroke-width', 0.3)
			.attr("r", 6)
			.ease('sine')
			.each("end", repeat);
	})();
	}catch(e){
		
	}
	
}




