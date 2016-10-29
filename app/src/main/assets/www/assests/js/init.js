/**
 * 
 */
//var MYAPP = {}



var CONT_VERTICE_GLOBAL = 0;
var CONT_VERTICE_TERREO = 0;
var CONT_VERTICE_1ANDAR = 0;
var CONT_ARESTA_GLOBAL = 0;
var CONT_ARESTA_TERREO = 0;
var CONT_ARESTA_1ANDAR = 0;
var ANDAR_ATUAL_GLOBAL = 't';
var BLOCO_ATUAL_GLOBAL = 'a';
var AGRUPADOR_BLOCO_ANDAR = [];
var AGRUPADOR_VERTICE_BLOCO_ANDAR  ;
var AGRUPADOR_ARESTA_BLOCO_ANDAR  ;
var OPCAO_ANDAR;
var OPCAO_BLOCO;



//var MYAPP.geral  = {
//		 CONT_ARESTA_GLOBAL: 0;
//		 ANDAR_ATUAL_GLOBAL: 't';
//		BLOCO_ATUAL_GLOBAL :'a';
//		AGRUPADOR_BLOCO_ANDAR : [];
//		AGRUPADOR_VERTICE_BLOCO_ANDAR : [];
//		 AGRUPADOR_ARESTA_BLOCO_ANDAR : []; 		
//} 
//var MYAPP.edicao  = {
//		 CONT_ARESTA_GLOBAL: 0;
//		 ANDAR_ATUAL_GLOBAL: 't';
//		BLOCO_ATUAL_GLOBAL :'a';
//		AGRUPADOR_BLOCO_ANDAR : [];
//		AGRUPADOR_VERTICE_BLOCO_ANDAR : [];
//		 AGRUPADOR_ARESTA_BLOCO_ANDAR : []; 		
//} 


//function Vertice (id, x, y, peso,andar,bloco) {
//	this.id = id;
//	this.x = x;
//	this.y = y;
//	this.andar = andar;
//	this.bloco = bloco;
//}
//
//function Aresta (id, x, y, peso,andar,bloco) {
//	this.id = id;
//	this.x = x;
//	this.y = y;
//	this.andar = andar;
//	this.bloco = bloco;
//	this.peso = peso;
//}


//iniciar camada de terreo carregada