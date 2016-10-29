
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
	
	$("line").attr("style", "visibility:hidden");
	$("svg g circle").attr("style", "visibility:hidden");
	var e = document.getElementById("entrada_dijkstra");
	var origem = e.options[e.selectedIndex].getAttribute("id");

	var d = document.getElementById("saida_dijkstra");
	var destino = d.options[d.selectedIndex].getAttribute("id");
	console.log("source: [" + origem + "]\ndestin: [" + destino +"]"  );

	
	if(wrapGraphArray.indexOf(origem) > -1  && wrapGraphArray.indexOf(destino) > -1  ){
		if(circleB !== undefined && circleA !== undefined  ){
			pulseOffCircles();	
		}
		
	origem = wrapGraphArray.indexOf(origem);
			
		destino = wrapGraphArray.indexOf(destino);
		dijkstra(origem,destino);
		
		pulseCircles(wrapGraphArray[origem], wrapGraphArray[destino]);
		
	}else{
		console.log("Id not Found Array!");
	}
}

function gerarRotaParam(origin, destin){
	if(origin!== undefined  && destin  !== undefined){
		
	   //origem = wrapGraphArray.indexOf(origem);
			
		//destino = wrapGraphArray.indexOf(destino);
		var temp_origem = wrapGraphArray.indexOf(origin);
		
		var temp_destino = wrapGraphArray.indexOf(destin);
		dijkstra(temp_origem,temp_destino);
		
		pulseCircles(origin,destin);
		
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
   return querystr;  
  }  



$(document).ready(function() {
	
	$('#criar').click(function() {
		salvaXML();
	});
	parametersURL = getParametersFromURL();
	
	docXML = abrirDoc();
	loadGrafosFromFileXML();
		parseXMLJQuery();
	
	
	if( parametersURL["ppi"]  != null && parametersURL["destin"]  != null){
		
	gerarRotaParam( parametersURL["ppi"] + "#", parametersURL["destin"]+ "#");
		}else{
	
	if( parametersURL["ppi"]  != null){
		pulseCircle( parametersURL["ppi"] + "#" );
		}
		if( parametersURL["destin"]  != null){
			pulseCircle( parametersURL["destin"] + "#" );
			}
		}
	
});


function abrirDoc() {
	//var parser = new DOMParser();

	// return parser.parseFromString(, "text/xml");
	

	
	return getFileXML();

	
	
	
	


}

function getFileXML(){
	var result;
	// var xml_path_url = "http://localhost:8888/" + $('svg').attr("id")+".xml"
	// ;
	// var xml_path_url = "http://localhost:8888/ServletUpdateMap?id_map=" +
	// $('svg').attr("id") ; //localhost
	var xml_path_url = "http://3-dot-map-indoor-ifpe-recife-1021.appspot.com" + "/ServletUpdateMap?id_map=" + $('svg').attr("id") ;


	$.ajax({
		url : xml_path_url,
		type : 'GET',
		dataType : 'xml',
		async: false,
		processData: true ,
		success : function(response) {
			console.log(response);
			result = response;
		},
		error : function(xhr, status, error) {
			result = xhr;
		console.log(xhr);
		}
	});
	
	return result;
	
}

var $xml;
function parseXMLJQuery(){
	var xmlDoc = $.parseXML( xml );
	  $xml = $( xmlDoc );
}

function addVertice(id, x, y) {
	
	
	var vertice = docXML.createElement("vertice");
	vertice.setAttribute("id", id);
	vertice.setAttribute("x", x);
	vertice.setAttribute("y", y);
	vertice.setAttribute("type", "vertice");
	vertice.setAttribute("bloco", $('svg').attr("id"));
	docXML.childNodes[0].appendChild(vertice);

	return true;
}

function addVerticToXML(id, x, y) {
	
	var bloco = 'a';
	var andar = 't';
	var vertice = docXML.createElement("vertice");
	vertice.setAttribute("id", id);
	vertice.setAttribute("x", x);
	vertice.setAttribute("y", y);
	vertice.setAttribute("type", "vertice");
	vertice.setAttribute("bloco", $('svg').attr("id"));
	
	var $andar = addOnAndar(vertice, andar,bloco);
	var $bloco =  addOnBloco(andar,bloco);
	//docXML.childNodes[0].appendChild(vertice);
	docXML.childNodes[0].appendChild($bloco);
	return true;
}

function addAresta(id, x1, y1,x2,y2, peso) {

		var aresta  = docXML.createElement("aresta");
		aresta.setAttribute("id", id);
		aresta.setAttribute("x1", x1);
		aresta.setAttribute("y1", y1 );
		aresta.setAttribute("x2", x2);
		aresta.setAttribute("y2", y2);
		aresta.setAttribute("type", "aresta");
		aresta.setAttribute("peso", peso);
		aresta.setAttribute("bloco", $('svg').attr("id"));
		docXML.documentElement.appendChild(aresta);
		return true;
	
}

function addArestaToXML(id, x1, y1,x2,y2, peso, bloco, andar) {

	var aresta  = docXML.createElement("aresta");
	aresta.setAttribute("id", id);
	aresta.setAttribute("x1", x1);
	aresta.setAttribute("y1", y1 );
	aresta.setAttribute("x2", x2);
	aresta.setAttribute("y2", y2);
	aresta.setAttribute("type", "aresta");
	aresta.setAttribute("peso", peso);
	aresta.setAttribute("bloco", $('svg').attr("id"));
	
	docXML.documentElement.appendChild(aresta);
	console.log(docXML);
	return true;

}

function addOnBloco(andar, bloco ){
	
	try{
	$bloco =  $xml.find( "bloco#" +bloco );
	}catch(e){
		
	}
	if(!(undefined === $bloco) ){	
		$bloco.append(andar);
		
	}else{
		$bloco  = $("<bloco id=\"" +bloco +"\"></bloco>"); 		
	}
	
	return $bloco;
}

function addOnAndar(node, andar,bloco){
	var $andar;
	try{
	$bloco =  $xml.find( "bloco#"+ bloco + " andar#" + andar );
}catch(e){
	
}
	if(!(undefined === $bloco) ){
		$andar.append(node);
	}else{
		$andar  = $("<andar id=\"" +bloco +"\"></andar>"); 
				
	}
	
	return $andar;
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
		
		var vertice_id_parse = vertice_id.replace("#", "");
		var type_shape; 
		var option;
		

		
		if(vertice_id_parse.length  ==  1){
		
			type_shape = $("svg " + vertice_id_parse).attr("descricao");
	
			 option = new Option(
					vertice_id_parse , "Value"
							+ vertice_id);
			 document.getElementById("entrada_dijkstra").options[indexSelectEntrada] = option;
			document.getElementById("entrada_dijkstra").options[indexSelectEntrada].setAttribute("id",vertice_id );

				indexSelectEntrada++;
		}else if(vertice_id_parse.search("a") > -1){
			vertice_id_parse ="#" + vertice_id_parse;
			type_shape = $("svg " + vertice_id_parse).attr("descricao");
			vertice_id_parse = vertice_id_parse.replace("#", "");
			option = new Option(
					vertice_id_parse + " - " + type_shape, "Value"
							+ vertice_id);
			document.getElementById("saida_dijkstra").options[indexSelectSaida] = option;
			document.getElementById("saida_dijkstra").options[indexSelectSaida].setAttribute("id",vertice_id );
			indexSelectSaida++;
		
		}
		


		
		var ellipse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		ellipse.setAttribute("id", vertice_id);
		ellipse.setAttribute("cx", vertice_x);
		ellipse.setAttribute("cy", eval(vertice_y) +551);
		/*ellipse.setAttribute("rx", "6");
		ellipse.setAttribute("ry", "6");*/
		ellipse.setAttribute("r", "6");
		ellipse.setAttribute("style", "fill:black; visibility:hidden; stroke-width: 12");

		ellipse.addEventListener("click", getID, true);
		//$('svg').append(ellipse);
		$('svg g').first().append(ellipse);
		wrapGraphArray.push(vertice_id);
		
	}
	grau= {wrapGraphArray};
	
	var totalGraph = $("svg circle").length;
	
	initMatrixAdj(totalGraph, totalGraph);
	
	
	
  	var x = docXML.getElementsByTagName("aresta");
	// svgdoc = evt.getTarget().getOwnerDocument();
  	 
	for (var i = 0; i < x.length; i++) {
		var aresta_x1 = x.item(i).getAttribute("x1");
		var aresta_y1 = x.item(i).getAttribute("y1");
		var aresta_x2 = x.item(i).getAttribute("x2");
		var aresta_y2 = x.item(i).getAttribute("y2");
		var aresta_id = x.item(i).getAttribute("id");
		var aresta_peso = x.item(i).getAttribute("peso");
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		
		var graph_a = aresta_id.substr(0,aresta_id.indexOf("-"));
		var graph_b = aresta_id.substr(aresta_id.indexOf("-")+1, aresta_id.length );
		grid_dijkistra[graph_a][graph_b].id = aresta_id;
	    grid_dijkistra[graph_a][graph_b].peso = parseInt(aresta_peso);
	    grid_dijkistra[graph_a][graph_b].adj = wrapGraphArray.indexOf(graph_b);
	    grau[graph_a].push(graph_b);
	    
	    
	    grid_dijkistra[graph_b][graph_a].id = aresta_id;
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
		line.setAttribute("y1", aresta_y1 + 551 );
		line.setAttribute("x2", aresta_x2);
		line.setAttribute("y2",aresta_y2 + 551);

		line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:2; visibility:hidden");
		$('svg g').first().append(line);
	}

	
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
		
		//for (var i = 0; i < grau[wrapGraphArray[u]]; i++){
		for (var i = 0; i < grau[wrapGraphArray[u]].length ; i++){
			ind = grid_dijkistra[wrapGraphArray[u]][grau[wrapGraphArray[u]][i]].adj;
			var peso = grid_dijkistra[wrapGraphArray[u]][grau[wrapGraphArray[u]][i]].peso;
			if(dist[ind] <  0){
				dist[ind] = dist[u] + peso;
				ant[ind] = u;
 				
			}else{
				if(dist[ind] > dist[u] + peso){
					dist[ind] > dist[u] + peso;
					ant[ind] =  u;
				}
				
			}
			
		}
		
	}
	
	var vertice = destin;
	//$("svg #" + destin)
	 var obj = document.getElementById( wrapGraphArray[destin]);
	 obj.setAttribute('style', 'visibility:visible');	 
	 obj.setAttribute("style","fill:none");
	 obj.setAttribute("style","stroke:blue");

	 var id_aresta;
	while( vertice != ini ){

		
		try{
		
			id_aresta = (wrapGraphArray[ant[vertice]]+"-"+wrapGraphArray[vertice]);

	    var aresta  = document.getElementById(id_aresta);
	    aresta.setAttribute('style', 'stroke:rgb(0,0,0);stroke-width:2; visibility:visible');	    
		}catch(err){
		}
	    id_aresta = (wrapGraphArray[vertice] + "-" + wrapGraphArray[ant[vertice]]);
	    try{
	    aresta  = document.getElementById(id_aresta);
	    aresta.setAttribute('style', 'stroke:rgb(0,0,0);stroke-width:2; visibility:visible');
	    }catch(err){
		}
		console.log("source: [" + wrapGraphArray[ant[vertice]] + "] destin: [" + wrapGraphArray[vertice] +"]"  );
		vertice = ant[vertice];
	}
	
	 obj = document.getElementById( wrapGraphArray[ini]); 
	 obj.setAttribute('style', 'visibility:visible');	 
	 obj.setAttribute("style","fill:none");
	 obj.setAttribute("style","stroke:red");
	 
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
	
	 circleA = d3.select("svg circle[id='"+ idCircleA +"']");
	circleB= d3.select("svg circle[id='"+ idCircleB +"']");
	
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




