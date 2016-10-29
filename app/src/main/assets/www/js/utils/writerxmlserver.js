/**
 * 
 */

function HTTPSocket() {
	HTTPSocket.httpRequest = null;
	this.domDocument = null
	// Testa para navegadores Mozilla-Core
	if (window.XMLHttpRequest) {
		HTTPSocket.httpRequest = new XMLHttpRequest();
		this.domDocument = document.implementation.createDocument('', '', null);
	}

	if (window.ActiveXObject) { // if n2
	// "Msxml.XMLHTTP"->nao funciona em conjunto com o parametro do activex
	// abaixo
		var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		HTTPSocket.httpRequest = httpRequest;
		this.domDocument = new ActiveXObject('Microsoft.XMLDOM');

	}
	if (!HTTPSocket.httpRequest) {
		window.alert(" O navegador usado não dá suporte a Comunicação Assíncrona.\r\nTroque de Navegador ou atualize sua versão.")
	}
	HTTPSocket.domDocument = this.domDocument;
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
HTTPSocket.prototype.doRequest = function(domXML) {
	var Socket = HTTPSocket.httpRequest;
	if (Socket) {
		//xmlString = "datagrid=" + xmlString;
		var xmlString = "<test> 2 </test>";
		
		//this.domDocument.documentElement =xmlString;
		//Socket.open("POST", "../processa/", true);
		//Socket.open("POST", "/MapIndoorIFPE/grafo.xml", true);
		Socket.open("POST", "/MapIndoorIFPE/ServletUpdateMap", true);
		Socket.setRequestHeader ("Accept", "text/xml");
		Socket.setRequestHeader("Content-type","application/x-www-form-urlencoded");
       // Socket.setRequestHeader("Content-Length", xmlString.length);
        //Socket.setRequestHeader("Connection", "close");
		Socket.send(xmlString);
		//Socket.onreadystatechange = this.getResponse;
	} else {
		window.alert("Houve um erro.\r\nObjeto HTTPSocket não inicializado.");
	}
}
// -------------------------------------------------------
HTTPSocket.prototype.getResponse = function() {
	var Socket = HTTPSocket.httpRequest;
	if (Socket.readyState == 4) {
		if (Socket.status == 200) {
			alert(Socket.responseText);
			// carrega o documento XML vindo do servidor
			//HTTPSocket.domDocument.load(Socket.responseText);
			// agora é só usar os metodos do DOM em javascript para apresentar
			// ana tela.
			var doc = HTTPSocket.domDocument.documentElement
		}
	}
}

function init(){

	testWriter = new HTTPSocket();
	testWriter.doRequest("grafo.xml");
}

onload = init();

