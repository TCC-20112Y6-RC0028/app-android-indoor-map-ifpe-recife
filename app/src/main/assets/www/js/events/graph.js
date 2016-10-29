/**
 * 
 */

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

	var svgdoc;
	var node;
	var cont_Vertice = 0;
	var contNotSector = 0
	var id_aresta = "";
	var destino = "";
	var peso = 1;
	var origem = "";
	var pt;

	var origemX;
	var origemY;
	var destinoX;
	var destinoY;

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
		//node =  evt.target;
		var temp = svgdoc.getElementById(destino);
		destinoX = temp.getAttribute("cx");
		destinoY = temp.getAttribute("cy");
		temp = svgdoc.getElementById(origem);
		//console.log(origem);
		origemX = temp.getAttribute("cx");
		origemY = temp.getAttribute("cy");

	}

	function cursorPoint(evt) {
		pt.x = evt.clientX;
		pt.y = evt.clientY;
		return pt.matrixTransform(svgdoc.getScreenCTM().inverse());
	}

	function createVertice(evt, id) {
		node = document
				.createElementNS("http://www.w3.org/2000/svg", "ellipse");
		node.setAttribute("id", id);
		var loc = cursorPoint(evt);
		node.setAttribute("cx", loc.x);
		node.setAttribute("cy", loc.y);
		node.setAttribute("rx", "6");
		node.setAttribute("ry", "6");
		node.setAttribute("style", "fill:black");
		node.addEventListener("click", getID, false);
		//var out = document.getElementById("blocoa-terreo");
		var out = svgdoc;
		out.appendChild(node);
		addVertice(id, loc.x, loc.y);
		cont_Vertice++;
		//console.log(cont_Vertice);

		if (cont_Vertice == 2) {

			$("#aresta").css("visibility", "visible");
		}
	}

	$(document)
			.ready(
					function() {
						//svgdoc  = document.documentElement;
						svgdoc = document.getElementById("blocoa-terreo");

						pt = svgdoc.createSVGPoint(); //ok! Fine!

						$("#option")
								.click(
										function() {
											if ($("input:checked").val() == 'vertice') {

												$("svg").off("click");
												console
														.log("Click no mapa para criar VERTICE!");
												$("svg")
														.click(
																function(evt) {
																	//svgdoc = evt.dfhgetTarget().getOwnerDocument();	
																	var node_aux = evt.target;
																	//var flagNotInser = true;
																	//node = svgdoc.createElement("ellipse");

																	node = document
																			.createElementNS(
																					"http://www.w3.org/2000/svg",
																					"ellipse");
																	if (node_aux.nodeName == "svg") {
																		var value = "aux"
																				+ contNotSector;
																		contNotSector++;
																		createVertice(
																				evt,
																				value);
																	} else if (node_aux.parentNode.nodeName == "g") {
																		createVertice(
																				evt,
																				node_aux.parentNode
																						.getAttribute("id")
																						+ "_");
																	} else {
																		console
																				.log("Vertice is not creating!")
																	}
																	//node.setAttribute("id",cont_Vertice);

																});

											} else if ($("input:checked").val() == 'aresta') {
												console
														.log("Click no mapa para criar ARESTA!");
												$("svg").off("click");
												$("svg")
														.click(
																function(evt) {
																	//$(this).off( "click"); 
																	//svgdoc = evt.dfhgetTarget().getOwnerDocument();

																	//node = svgdoc.createElement("ellipse");
																	if ((id_aresta != "")
																			&& (destino != "")
																			&& (origem != "")) {
																		getCoordEdge(evt);
																		node = document
																				.createElementNS(
																						"http://www.w3.org/2000/svg",
																						"line");
																		node
																				.setAttribute(
																						"id",
																						id_aresta);
																		//var loc = cursorPoint(evt);
																		node
																				.setAttribute(
																						"x1",
																						origemX);
																		node
																				.setAttribute(
																						"y1",
																						origemY);
																		node
																				.setAttribute(
																						"x2",
																						destinoX);
																		node
																				.setAttribute(
																						"y2",
																						destinoY);
																		node
																				.setAttribute(
																						"style",
																						"stroke:rgb(0,0,0);stroke-width:2");
																		var out = svgdoc;
																		out
																				.appendChild(node);
																		id_aresta = "";
																		origem = "";
																		destino = "";
																	} else {
																		console
																				.log("Edges weren't Created")
																	}
																	// 		console.log(cont_Vertice);
																});

											}
										});

					});

