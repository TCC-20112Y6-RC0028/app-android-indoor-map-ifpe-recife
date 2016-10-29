var paths = new Array();
	var walls = new Array();

	var walkable = new Array();
	var path = new Object();
	var wall = new Object();

	var contPath = 0;
	var contWalls = 0;

	var grid;

	var easystar = new EasyStar.js();

	var gridHeight;
	var gridWidth;

	function obstacle(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	var svg;
	var pathEl;
	var obstacles = new Array();
	//var grid_pathfinding;
	var grid_test;

	function initGrid(width, height) {

		grid = new Array(height);
		for (var i = 0; i < height; i++) {
			grid[i] = new Array(width);
			for (var j = 0; j < width; j++) {

				grid[i][j] = 0;
			}
		}

	}

	function pathFinding() {

		/*
		var test = svg.selectAll("path");
		 */

		var e = document.getElementById("entrada");
		var origemX = parseInt(e.options[e.selectedIndex].getAttribute("x")) - 1;
		var origemY = parseInt(e.options[e.selectedIndex].getAttribute("y")) - 531;

		var d = document.getElementById("destino");
		var destinoX = parseInt(d.options[d.selectedIndex].getAttribute("x")) - 1;
		var destinoY = parseInt(d.options[d.selectedIndex].getAttribute("y")) - 531;

		/*console.log("From: (" + origemX + "," + origemY + ")" + "\nTo: ("
				+ destinoX + "," + destinoY + ")");*/
		console.log("From: (" + origemX + "," + origemY + ")" + "\nTo: ("
				+ destinoX + "," + destinoY + ")");

		easystar.findPath(origemX, origemY, destinoX, destinoY, function(es) {
			if (es === null) {
				console.log("Path was not found.");
			} else {
				console.time("easystar");

				var coordinates = "M";
				for (var i = 0; i < es.length; i++) {
					/*console.log("Path was found. The first Point is " + es[0].x + " " + es[0].y);*/

					//coordinates = coordinates + es[i].x + " " + es[i].y + " L";
					coordinates = coordinates + es[i].x + " " + es[i].y;

					if (i + 1 == es.length) {
						coordinates = coordinates;
					} else if (i < es.length) {

						coordinates = coordinates + " L";

					}

					//	console.log("This point " + es[i].x + ' ' + es[i].y);
					//console.log(coordinates);	
				}

				/*	if(test == null){
				
						
					}else{
						
						var paths = svgDoc.getElementsByTagName("path");
						var last_path = paths[paths.length - 1];
						last_path.parentNode.removeChild(last_path);
					}*/

				pathEl = document.createElementNS("http://www.w3.org/2000/svg",
						"path");
				pathEl.setAttribute('d', coordinates);
				pathEl.style.stroke = 'rgb(255,0,0)'
				pathEl.style.strokeWidth = '5';
				pathEl.style.fill = 'none';
				document.querySelector('svg').appendChild(pathEl);
				//svg.appendChild(pathEl);

			}
		});
		console.timeEnd("easystar");

		easystar.calculate();
	}

	function pathFinding2() {

		var e = document.getElementById("entrada");
		var origemX = parseInt(e.options[e.selectedIndex].getAttribute("x")) - 1;
		var origemY = parseInt(e.options[e.selectedIndex].getAttribute("y")) - 531;

		var d = document.getElementById("destino");
		var destinoX = parseInt(d.options[d.selectedIndex].getAttribute("x")) - 1;
		var destinoY = parseInt(d.options[d.selectedIndex].getAttribute("y")) - 531;

		/*console.log("From: (" + origemX + "," + origemY + ")" + "\nTo: ("
				+ destinoX + "," + destinoY + ")");*/
		console.log("From: (" + origemX + "," + origemY + ")" + "\nTo: ("
				+ destinoX + "," + destinoY + ")");

		try {
			/*var grid_test = new PF.Grid(gridHeight,gridWidth); 

			grid_test.setWalkableAt(0, 2, false);
			grid_test.setWalkableAt(0, 3, false);
			 */

			/*
			var matrix = [
			    [0, 0, 0, 1, 0],
			    [1, 0, 0, 0, 1],
			    [0, 0, 1, 0, 0],
			];*/
			//var grid = new PF.Grid(matrix);
			var finder = new PF.BiBestFirstFinder({

				allowDiagonal : true,
				dontCrossCorners : true
			});
			//grid.setWalkableAt(0, 3, false);
			//alert(finder);
			//console.log(finder);

			//var path = finder.findPath(1, 1, 3, 0, grid);
			console.time("path_finding");
			var path_test = finder.findPath(origemX, origemY, destinoX,
					destinoY, grid_test);

			//console.log(path_test);
			//alert(path);

			//console.log("============ Coordinates PathFinding ============");
			var coordinates = "M";
			for (var i = 0; i < path_test.length; i++) {

				var coord = path_test[i];

				if (coord === null) {
					console.log("Path was not found.");
				} else {

					var coordX = coord[0];
					var coordY = coord[1];
					coordinates = coordinates + coordX + " " + coordY + " L";
				}
			}
			coordinates = coordinates + " Z";

			pathEl = document.createElementNS("http://www.w3.org/2000/svg",
					"path");
			pathEl.setAttribute('d', coordinates);
			pathEl.style.stroke = 'rgb(0,0,255)'
			pathEl.style.strokeWidth = '5';
			pathEl.style.fill = 'none';
			document.querySelector('svg').appendChild(pathEl);
			console.timeEnd("path_finding");
		} catch (e) {
			console.log(e.message);
		}

		console.log("============ /// ============");

	}

	function walkablePath() {
		var k = 0;

		for (var i = 0; i < gridHeight; i++) {

			for (var j = 0; j < gridWidth; j++) {

				if (grid[i][j] == 1) {
					for (var z = 0; z < paths.length; z++) {
						if (paths[z].x == j && paths[z].y == i) {
							easystar.avoidAdditionalPoint(j, i);
							//break;
						} else {
							///  break;

						}
					}
				} else {
					walkable[k] = i;
					k = k + 1;
					walkable[k] = j;
					k = k + 1;
				}
			}
		}

	}

	function node(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	function obstacle(x, y, width, height) {
		this.x = x

	}

	function init(elm) {

		//d3.select("body").style("background-color", "black");

		svg = d3.select("svg");

		var rect = new Array();

		/*svg
		.selectAll("path")
		.each(function(path, paths,contPath){
			
			var x = this.rx.baseVal.value;
			var y = this.ry.baseVal.value;
			var width = this.width.baseVal.value;
			var height = this.height.baseVal.value;
			
			
		}
		);*/

		//Evento aparecer as coordenadas
		svg
				.selectAll("rect")
				.each(
						function() {
							//Mudar onclick to parentNode
							this.onclick = function() {

								var x = parseInt(this.x.baseVal.value
										.toFixed(0));
								var y = parseInt(this.y.baseVal.value
										.toFixed(0)) - 530;
								var width = parseInt(this.width.baseVal.value
										.toFixed(0));
								var height = parseInt(this.height.baseVal.value
										.toFixed(0));

								document.getElementById("pos_dept").innerHTML = "Top: [("
										+ x
										+ ","
										+ (y + height)
										+ "), "
										+ "("
										+ (x + width)
										+ ","
										+ (y + height)
										+ ")]"
										+ "\nBottom"
										+ "[("
										+ x
										+ ","
										+ y
										+ "), "
										+ "("
										+ (x + width)
										+ ","
										+ y + ")]";

							};

							var x = parseInt(this.x.baseVal.value.toFixed(0)) - 1;
							var y = parseInt(this.y.baseVal.value.toFixed(0)) - 531;
							var width = parseInt(this.width.baseVal.value
									.toFixed(0));
							var height = parseInt(this.height.baseVal.value
									.toFixed(0));

							path = new node(x, y, width, height);
							paths[contPath] = path;
							contPath = contPath + 1;

						});

		svg
				.selectAll("path")
				.each(
						function() {

							var valueD = this.attributes.getNamedItem("d").nodeValue;
							//coordenadas
							var beginValue = (valueD.indexOf("M") + 2);
							var secondSetence = valueD.indexOf("L") + 2;
							var endValue = valueD.indexOf(".");
							var valueY1 = valueD
									.substring(beginValue, endValue);
							var x = parseInt(valueY1) - 1;
							endValue = valueD.substring(endValue + 1,
									secondSetence);
							var valueX1 = endValue.substring(endValue
									.indexOf(",") + 1, endValue.indexOf("."));
							//console.log(valueX1);
							var y = parseInt(valueX1) - 531 > 0 ? parseInt(valueX1) - 531
									: 531 - parseInt(valueX1);
							endValue = valueD.substr(secondSetence);
							var height = parseInt(endValue.substr(endValue
									.indexOf("L") + 1, endValue.indexOf("."))) - 531 > 0 ? parseInt(endValue
									.substr(endValue.indexOf("L") + 1, endValue
											.indexOf("."))) - 531
									: 531 - parseInt(endValue.substr(endValue
											.indexOf("L") + 1, endValue
											.indexOf(".")));

							endValue = endValue.substr(
									endValue.indexOf(",") + 1, endValue
											.indexOf(".") - 1);
							//console.log(endValue);
							var width = parseInt(endValue) - 1;

							wall = new node(x, y, width, height);
							walls[contWalls] = wall;
							contWalls = contWalls + 1;

						});

		//Teste com string		
		//var valueD = "M 1222.3515,840.39356 L 1222.3515,919.1708";

		//Tamanho do map
		gridHeight = parseInt(svg[0][0].height.baseVal.value.toFixed(0));
		gridWidth = parseInt(svg[0][0].width.baseVal.value.toFixed(0));

		initGrid(svg[0][0].width.baseVal.value.toFixed(0),
				svg[0][0].height.baseVal.value.toFixed(0));

		// console.log(grid);

		var mapsvgdoc = null;

		var shapeDepartment = elm.getElementsByTagName("g");

		var indexSelectEntrada = 0;
		var indexSelectDestino = 0;

		for (var j = 0; j < shapeDepartment.length; j++) {
			//shapeDepartment[i].addEventListener("click",  countryMouseup(shapeDepartment[i]), false);

			shapeDepartment[j].addEventListener("click", function() {
				if (this.id != "layer1") {
					document.getElementById("picture_door").src = "./img/"
							+ this.id + ".JPG";

				}
				;
			}, false);

			var temp = shapeDepartment[j].getAttribute("type");
			var name_sector = shapeDepartment[j].getAttribute("name");

			var option = new Option(
					shapeDepartment[j].id + " - " + name_sector, "Value"
							+ shapeDepartment[j].id);
			var rect_temp = shapeDepartment[j].getElementsByTagName("rect");

			if (temp !== null && temp == "ppi") {

				var rect_temp_x = rect_temp[0].getAttribute("x");
				var rect_temp_y = rect_temp[0].getAttribute("y");
				var rect_id = rect_temp[0].getAttribute("id");

				document.getElementById("entrada").options[indexSelectEntrada] = option;

				document.getElementById("entrada").options[indexSelectEntrada]
						.setAttribute("x", rect_temp_x);
				document.getElementById("entrada").options[indexSelectEntrada]
						.setAttribute("y", rect_temp_y);

				indexSelectEntrada++;

				console.log("Point " + rect_id + " PPI: [" + rect_temp_x + ","
						+ (parseInt(rect_temp_y).toFixed(0) - 500) + "]");
			}
			if (temp !== null && temp == "dept") {

				shapeDepartment[j]
						.addEventListener(
								"mouseover",
								function() {
									if (this.id != "layer1") {

										var num_sala = this.getAttribute("id");
										var sigla = this.getAttribute("sigla");
										var descricao = this
												.getAttribute("descricao");
										var ramal = this.getAttribute("ramal");
										document.getElementById("box-setor").innerHTML = "<span>Nº Sl: </span>"
												+ num_sala
												+ "<br>"
												+ "<span>Sigla: </span>"
												+ sigla
												+ "<br>"
												+ "<span>Descrição: </span>"
												+ descricao
												+ "<br>"
												+ "<span>Ramal </span>"
												+ ramal
												+ "";

									}
									;
								}, false);

				var rect_temp_x = rect_temp[0].getAttribute("x");
				var rect_temp_y = rect_temp[0].getAttribute("y");
				document.getElementById("destino").options[indexSelectDestino] = option;
				document.getElementById("destino").options[indexSelectDestino]
						.setAttribute("x", rect_temp_x);
				document.getElementById("destino").options[indexSelectDestino]
						.setAttribute("y", rect_temp_y);

				indexSelectDestino++;
			}

		}

		//grid_test = new PF.Grid(gridHeight, gridWidth);
		for (var z = 0; z < paths.length; z++) {
			path = paths[z];
			var x = path.x;
			var y = path.y;
			var w = path.width;
			var h = path.height;

			for (var i = y; i < h; i++) {
				for (var j = x; j < w; j++) {
					//grid_test.setWalkableAt(x, y, true);
					grid[i][j] = 1;
				}
			}
		}

		for (var z = 0; z < walls.length; z++) {
			wall = walls[z];
			var x = wall.x;
			var y = wall.y;
			var w = wall.width;
			var h = wall.height;

			var tamAlturaEixoX;
			var auxContAlturaEixoX;

			var tamAlturaEixoY;
			var auxContAlturaEixoY;

			if (h >= y) {
				tamAlturaEiYoY = h;
				auYContAlturaEiYoY = y;
			} else {
				tamAlturaEiYoY = y;
				auYContAlturaEiYoY = h;
			}

			if (w >= x) {
				tamAlturaEixoX = w;
				auxContAlturaEixoX = x;
			} else {
				tamAlturaEixoX = x;
				auxContAlturaEixoX = w;
			}

			for (var i = auxContAlturaEixoY; i < tamAlturaEixoY; i++) {
				for (var j = auxContAlturaEixoX; j < tamAlturaEixoX; j++) {
					//grid_test.setWalkableAt(x, y, true);
					grid[i][j] = 2;

					easystar.avoidAdditionalPoint(i, j);
					easystar.setAdditionalPointCost(i, j, 9999);
				}
			}
		}

		easystar.setGrid(grid);

		easystar.setAcceptableTiles([ 0, 1 ]);

		easystar.enableDiagonals();
		easystar.setIterationsPerCalculation(1000000000);

	};

	function loadMapInfo(elm) {
		init(elm);
	};

	function countryMouseup(shape) {
		alert(shape.id);
	};

	//onload = loadMapInfo(document.getElementById('blocoa-terreo'));
