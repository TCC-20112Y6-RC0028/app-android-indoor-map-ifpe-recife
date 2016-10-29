  $(function() {
	  
	  $("#ui-id-1").show();
	
		  
	
  $.ajax({
      url: "/ServletUpdateMap?id_map=a",
      dataType: "xml",
      async: false,
		processData: true ,
      success: function( xmlResponse ) {
    	  console.log($( "vertice", xmlResponse ));
        var data = $( "vertice", xmlResponse ).map(function() {
        	/*if($( this ).attr("ppi") == "z"){
        		$("#ppi").val($( this ).attr("id"));
        	}*/
        	
        	if ($( this ).attr("ppi").length > 1 && $( this ).attr("ppi").substr(0,1) != "x"){
        	
          return {
        	 sigla: $( this ).attr("sigla"),
        	desc: $( this ).attr("descricao"),
            value: $( this ).attr("ppi").substr(0,1) != "#" ? $( this ).attr("ppi") + " - " + $( this ).attr("sigla") + " - " +  $( this ).attr("descricao") :  $( this ).attr("sigla") + " - " +  $( this ).attr("descricao") ,
            id: $( this ).attr("id") 
          };}
        	
        	
        }).get();
        
        
        
        
        $("#search2").autocomplete({       	
    	      source: data,
    	     /*  minLength: 4, */
    	      focus: function( event, ui ) {
    	        /* console.log( ui.item.label ); */
    	        console.log( ui.item.desc );
    /* 	        $( "#search" ).val( ui.item.desc);
     */	       
    	        return false;
    	      },
    	      select: function( event, ui ) {
    	    
    	    	  /* console.log( ui.item.label ); */
    	    	  var temp =  ui.item.value + "-"  + ui.item.sigla + "-"+ ui.item.desc ;
    	    	  $("#search2").val( ui.item.value);
    	    	  $("#entrada").attr("value",ui.item.id);
  /*  	    	console.log("Id destino Selecionado: " +  ui.item.id );
  */  	        return false;
    	      }
    	    });
        
        
        $("#search").autocomplete({       	
  	      source: data,
  	     /*  minLength: 4, */
  	      focus: function( event, ui ) {
  	        /* console.log( ui.item.label ); */
  	        console.log( ui.item.desc );
  /* 	        $( "#search" ).val( ui.item.desc);
   */	       
  	        return false;
  	      },
  	      select: function( event, ui ) {
  	    
  	    	  /* console.log( ui.item.label ); */
  	    	  var temp =  ui.item.value + "-"  + ui.item.sigla + "-"+ ui.item.desc ;
  	    	  $("#search").val( ui.item.value);
  	    	  $("#destino").attr("value",ui.item.id);
/*  	    	console.log("Id destino Selecionado: " +  ui.item.id );
*/  	        return false;
  	      }
  	    });
  	   /*  .autocomplete( "instance" )._renderItem = function( ul, item ) {
  	      return $( "<li>" )
  	      	.append(  item.value + "-"  + item.sigla + "-" + item.desc )
  	        .appendTo( ul );
  	    }; */
        
      }
    });
   
	
  });