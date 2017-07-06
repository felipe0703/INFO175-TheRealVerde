//<style>
//form {
//	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
//    position: absolute;
//    left: 10px;
//    top: 10px;
//}
//
//label {
//	display: block;
//}
//
//.axis text {
//	font-family: 'Poiret One', cursive;
//	font-size: 10pt;
//}
//.axis .label {
//	font-size: 16pt;
//}
//
//.axis path, .axis line {
//	fill: none;
//	stroke: #000;
//	shape-rendering: crispEdges;
//}
//</style>





        
/// VARIABLES DEL ESPACIO DONDE SE GRAFICARA
var outerWidth =3022;  	// ancho exterior del grafico 1170
var outerHeight = 560;	// altura exterior del grafico
var margin = { left: 80, top: 30, right: 30, bottom: 30 };	// margenes desde los bordes de la ventana del grafico
var barPadding = 2;	//  rellenado barra
var innerWidth  = outerWidth  - margin.left - margin.right;		// ancho interior 
var innerHeight = outerHeight - margin.top  - margin.bottom;	// altura interior 

//VARIABLES EJES      
var yAxisLabelText = "Tiempo(s) Promedio";  // nombre ordenada grafico
var yAxisLabelOffset = 45;      // ubicacion del texto en el eje X

///VARIABLES COLOR
var colorAE = "rgb(197,27,138)";
var colorW = "rgb(248,0,0)";

var colorQ_MD = "rgb(135, 54, 0)";
var colorQ_D = "rgb(147, 81, 22)";
var colorQ_I = "rgb(81, 90, 90)";
var colorQ_F = "rgb(29, 131, 72)";
var colorQ_MF = "rgb(25, 111, 61)";

var colorP_MD = "rgb(123, 36, 28)";
var colorP_D = "rgb(99, 57, 116)";
var colorP_I = "rgb(81, 90, 90)";
var colorP_F = "rgb(40, 116, 166)";
var colorP_MF = "rgb(26, 82, 118)";

var colorBar = "rgb(139,228,100)";
var colorBar2 = "rgb(255,255,255)";

/// se agrega al cuerpo el ancho y el alto de la ventana de visualizacion
//var svg = d3.select("body").append("svg")
var svg = d3.select("#grafico").append("svg")
.attr("width",  outerWidth)
.attr("height", outerHeight+50);

/// cambio de color en el grafico para mayor claridad
var bool = true;
for (var i = 81; i < outerWidth-30; i = i + 52) {
if (bool) {
    var rectangle = svg.append("rect").attr("x", i).attr("y", 20).attr("width", 52).attr("height",560).style("fill-opacity", 0.5).style("fill", colorBar);
    bool = false;
} else {
    var rectangle = svg.append("rect").attr("x", i).attr("y", 20).attr("width", 52).attr("height",560).style("fill-opacity", 0.5).style("fill", colorBar2);
    bool = true;
}   
}
//ubicar grafico en ventana
var g = svg.append("g")
.attr("transform", "translate(" + margin.left+ "," + margin.top + ")");

//ubica el eje de las abscisa (X)
var xAxisG = g.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + (innerHeight + 50) + ")");

var yAxisG = g.append("g")
.attr("class", "y axis");

var yAxisG = g.append("g")
.attr("class", "y axis")
.attr("transform", "translate(0,0)");

//ubicacion del texto del eje Y
var yAxisLabel = yAxisG.append("text")
.style("text-anchor", "middle")
.attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
.attr("class", "label")
.text(yAxisLabelText);  

var tooltip = d3.select("body").append("div").attr("class", "toolTip");

/*
var sele = d3.selectAll("input")
.on("change", changed);
var timeout = d3.timeout(function() {
  d3.select("input[ value=\"default\" ]")
      .property("checkbox", false)
      .dispatch("change");
}, 2000);
function changed() {
timeout.stop();
if (this.value === "On") transitionOn();
else transitionOff();
}
function transitionOn() {
alert("On");
}
function transitionOff() {
alert("off");
}
*/
///FUNCION QUE CARGA LOS DATOS DEL ARCHIVO JSON
function render(data){

var minIntentos = d3.min(data, function (d){return d.intentos});
var maxIntentos = d3.max(data, function (d){return d.intentos});
var maxTiempo = d3.max(data, function (d){return d.tiempo_promedio;});
var minTiempo = d3.min(data, function (d){return d.tiempo_promedio;});

var yScale = d3.scale.linear().domain([0, maxTiempo]).range([innerHeight,0]);
var yScale2 = d3.scale.linear().domain([0, maxTiempo]).range([innerHeight + 50,0])
var rScale = d3.scale.linear().domain([minIntentos, maxIntentos]).range([5,25]);
var topicosScale = d3.scale.ordinal().domain([
        "classes_objects",
        "Comparison",
        "dictionary",
        "exceptions",
        "file_handling",
        "Functions",
        "if_statements", 
        "Lists",
        "logical_operators",
        "loops",
        "output_formatting",
        "strings",
        "values_references",
        "variables"])
    .rangeBands([0,innerWidth],[1],[0.5]);
/// GENERA LOS EJES
var yAxis = d3.svg.axis().scale(yScale).orient("left")
    .ticks(10) // Use approximately 10 ticks marks.
    //.tickFormat(d3.format("d")) // Use intelligent abbreviations, e.g. 5M for 5 Million
    .outerTickSize(1);          // Turn off the marks at the end of the axis.

var xAxis = d3.svg.axis().scale(topicosScale).orient("bottom")
    .outerTickSize(1); // Tuff the marks at the end of the axis.// numeros de lineas o grosor de la linea

// SUBDIVISORES  CON LAS ACTIVIDADES
for (var i = 0; i < innerWidth; i = i+ 208) {
    var xAxisG2 = g.append("g").attr("class", "x axis").attr("transform", "translate(0," + (innerHeight+50) + ")");
    var xScale2 = d3.scale.ordinal().domain(["AE","P","Q","W"]).rangeBands([ i , i + 208],[1],[0.5]);
    var xAxis2 =  d3.svg.axis().scale(xScale2).orient("top");
    xAxisG2.call(xAxis2);
}

/// CREA DIVISORES DEL GRAFICO
///orientacion de las lineas
for (var i = 208; i <= innerWidth; i = i + 208) {
    var yAxisG2 = g.append("g").attr("class", "y2 axis").attr("transform", "translate(" + i + ",0)");
    var yAxis2 = d3.svg.axis().scale(yScale2).orient("left").ticks(0).outerTickSize(1);
     yAxisG2.call(yAxis2);
}


var circles = g.selectAll("circle")
.data(data)
.enter()
.append("circle")
//.on("click", click);
.on("click", function(d){
	d3.select("#divInfo").selectAll('div').remove()

	d3.select("#divInfo2").selectAll('div').remove()

	d3.select("#divInfo3").selectAll('div').remove()

	d3.select("#divInfo4").selectAll('div').remove()

	d3.select("#divInfo5").selectAll('div').remove()

	d3.select("#divInfo6").selectAll('div').remove()

	d3.select("#divInfo7").selectAll('div').remove()
	d3.select("#divInfo")
        .selectAll('div')
        .data(data)
        .enter()
        .append('div')
        .text(function(d2){
        	A=null;
            if(d == d2){
            	var A=" Nombre Actividad : "+d.actividades;
            
                return A;
                
              
              
            }
         
           
            
        });
	d3.select("#divInfo2")
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .text(function(d2){
    	A=null;
        if(d == d2){
        	var A=" Nombre topico: "+d.topicos;
        	return A;
    
            
          
          
        }
    
       
        
    });
	
 	d3.select("#divInfo3")
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .text(function(d2){
        if(d == d2){
        	A=null;
        	var A=" Cantidad de intentos : "+d.intentos;
        	return A;
    
            
          
          
        }
    
       
        
    });
 	d3.select("#divInfo4")
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .text(function(d2){
        if(d == d2){
        	A=null;
        	var A=" Cantidad intentos correctos : "+d.intentos_correctos;
        	return A;
    
            
          
          
        }
    
       
        
    });
 	d3.select("#divInfo5")
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .text(function(d2){
        if(d == d2){
        	A=null;
        	var A=" Cantidad intentos incorrectos : "+d.intentos_incorrectos;
        	return A;
    
            
          
          
        }
    
       
        
    });
 	d3.select("#divInfo6")
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .text(function(d2){
        if(d == d2){
        	A=null;
        	var A=" Tiempo promedio en la actividad : "+d.tiempo_promedio;
        	return A;
    
            
          
          
        }
    
       
        
    });
 	d3.select("#divInfo7")
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .text(function(d2){
        if(d == d2){
            if((d.porcentaje_correctos - d.porcentaje_incorrectos)< -0.6){
            	var A=" Nivel de dificultad : Muy Dificil";
            }else if ((d.porcentaje_correctos - d.porcentaje_incorrectos) < -0.2){
            	var A=" Nivel de dificultad : Dificil ";
            }else if((d.porcentaje_correctos - d.porcentaje_incorrectos)< 0.2){
            	var A=" Nivel de dificultad : Intermedio ";
            }else if((d.porcentaje_correctos - d.porcentaje_incorrectos) < 0.6){
            	var A=" Nivel de dificultad :  Facil ";
            }else{
            	var A=" Nivel de dificultad : Muy Facil";
            }
        	
        	return A;
        }
    
       
        
    });
 	
})



var cirDestacado = circles
			.on("mousemove", function(d){
				var resp = "";
				if((d.porcentaje_correctos - d.porcentaje_incorrectos)< -0.6){
					resp= "Muy Dificil";
    }else if ((d.porcentaje_correctos - d.porcentaje_incorrectos) < -0.2){
        resp = " Dificil ";
    }else if((d.porcentaje_correctos - d.porcentaje_incorrectos)< 0.2){
        resp = "Intermedio ";
    }else if((d.porcentaje_correctos - d.porcentaje_incorrectos) < 0.6){
        resp = " Facil ";
    }else{
        resp = "Muy Facil";
    }
	tooltip
      .style("left", d3.event.pageX - 50 + "px")
      .style("top", d3.event.pageY - 70 + "px")
      .style("display", "inline-block")
      .html("Tiempo promedio :" + (d.tiempo_promedio)+" <br /> Dficultad : "+resp);

    cirDestacado.attr("fill-opacity", function (d2) {
        if (d.actividades != d2.actividades) {
            return 0.1;
        }else{
        	return 1;
        }
    })
})
                .on("mouseout", function(d){ 
                    tooltip.style("display", "none");
                    cirDestacado.attr("fill-opacity",1);
                });
            


var circleAttributes = circles
                    .attr("cx", function (d) { return d.numero_columna;})
                    .attr("cy", function (d) { return yScale(d.tiempo_promedio);} )
                    .attr("r", function (d) { return rScale(d.intentos); })
                    .style("fill", function(d) { 
                        var returnColor;
                        var dificultad  = d.porcentaje_correctos - d.porcentaje_incorrectos;
                        if(d.actividades == "ANIMATED_EXAMPLE"){
                            returnColor = colorAE;
                        }else if(d.actividades == "WEBEX"){
                            returnColor = colorW;
                        }else if(d.actividades == "PARSONS"){                                
                            if(dificultad < -0.6){
                                returnColor = colorP_MD;
                            }else if (dificultad < -0.2){
                                returnColor = colorP_D;
                            }else if(dificultad < 0.2){
                                returnColor = colorP_I;
                            }else if(dificultad < 0.6){
                                returnColor = colorP_F;
                            }else{
                                returnColor = colorP_MF;
                            }
                        }else {
                            if(dificultad < -0.6){
                                returnColor = colorQ_MD;
                            }else if (dificultad < -0.2){
                                returnColor = colorQ_D;
                            }else if(dificultad < 0.2){
                                returnColor = colorQ_I;
                            }else if(dificultad < 0.6){
                                returnColor = colorQ_F;
                            }else{
                                returnColor = colorQ_MF;
                            }
                        }
                        return returnColor; 
                    });

xAxisG.call(xAxis);
yAxisG.call(yAxis);
document.getElementById('webex').addEventListener('click', function() { webexFiltro()});
document.getElementById('parsons').addEventListener('click', function() { parsonsFiltro()});
document.getElementById('animated').addEventListener('click', function() { animatedFiltro()});
document.getElementById('questions').addEventListener('click', function() { questionsFiltro()});
var prendidoWebex=false;
var prendidoParsons=false;
var prendidoAnimated=false;
var prendidoQuestions=false;
g.selectAll("circle").attr("fill-opacity",0);
function webexFiltro(){
//	g.selectAll("circle").attr("fill-opacity",0);

	if(prendidoWebex==false){
		prendidoWebex=true;
	g.selectAll("circle").attr("fill-opacity", function (d2) {
       
		 if (d2.actividades =="WEBEX") {
         	return 1;
         }
		 else{
			 if(prendidoParsons){
				 if(d2.actividades== "PARSONS"){
					 return 1;
				 }
			 }
			 if(prendidoAnimated){
				 if(d2.actividades== "ANIMATED_EXAMPLE"){
					 return 1;
				 }
			 }
			 if(prendidoQuestions){
				 if(d2.actividades== "QUIZPET"){
					 return 1;
				 }
			 }
				return 0;	 
		 }
        
    })
	}
	else{
		prendidoWebex=false;
		g.selectAll("circle").attr("fill-opacity", function (d2) {
            if (d2.actividades =="WEBEX") {
            	return 0;
            }
            else{
   			 if(prendidoParsons){
				 if(d2.actividades== "PARSONS"){
					 return 1;
				 }
			 }
			 if(prendidoAnimated){
				 if(d2.actividades== "ANIMATED_EXAMPLE"){
					 return 1;
				 }
			 }
			 if(prendidoQuestions){
				 if(d2.actividades== "QUIZPET"){
					 return 1;
				 }
			 }
            	
            	return 0;
            }
        })		
	}


}

function parsonsFiltro(){
    //	g.selectAll("circle").attr("fill-opacity",0);
    
    	if(prendidoParsons==false){
    		prendidoParsons=true;
    	g.selectAll("circle").attr("fill-opacity", function (d2) {
           
    		 if (d2.actividades =="PARSONS") {
             	return 1;
             }
    		 else{
    			 if(prendidoWebex){
    				 if(d2.actividades== "WEBEX"){
    					 return 1;
    				 }
    			 }
    			 if(prendidoAnimated){
    				 if(d2.actividades== "ANIMATED_EXAMPLE"){
    					 return 1;
    				 }
    			 }
    			 if(prendidoQuestions){
    				 if(d2.actividades== "QUIZPET"){
    					 return 1;
    				 }
    			 }
    				return 0;	 
    		 }
            
        })
    	}
    	else{
    		prendidoParsons=false;
    		g.selectAll("circle").attr("fill-opacity", function (d2) {
                if (d2.actividades =="PARSONS") {
                	return 0;
                }
                else{
       			 if(prendidoWebex){
    				 if(d2.actividades== "WEBEX"){
    					 return 1;
    				 }
    			 }
    			 if(prendidoAnimated){
    				 if(d2.actividades== "ANIMATED_EXAMPLE"){
    					 return 1;
    				 }
    			 }
    			 if(prendidoQuestions){
    				 if(d2.actividades== "QUIZPET"){
    					 return 1;
    				 }
    			 }
                	
                	return 0;
                }
            })		
    	}
   
    
    }


function animatedFiltro(){
    //	g.selectAll("circle").attr("fill-opacity",0);
    
    	if(prendidoAnimated==false){
    		prendidoAnimated=true;
    	g.selectAll("circle").attr("fill-opacity", function (d2) {
           
    		 if (d2.actividades =="ANIMATED_EXAMPLE") {
             	return 1;
             }
    		 else{
    			 if(prendidoWebex){
    				 if(d2.actividades== "WEBEX"){
    					 return 1;
    				 }
    			 }
    			 if(prendidoParsons){
    				 if(d2.actividades== "PARSONS"){
    					 return 1;
    				 }
    			 }
    			 if(prendidoQuestions){
    				 if(d2.actividades== "QUIZPET"){
    					 return 1;
    				 }
    			 }
    				return 0;	 
    		 }
            
        })
    	}
    	else{
    		prendidoAnimated=false;
    		g.selectAll("circle").attr("fill-opacity", function (d2) {
                if (d2.actividades =="ANIMATED_EXAMPLE") {
                	return 0;
                }
                else{
       			 if(prendidoWebex){
    				 if(d2.actividades== "WEBEX"){
    					 return 1;
    				 }
    			 }
    			 if(prendidoParsons){
    				 if(d2.actividades== "PARSONS"){
    					 return 1;
    				 }
    			 }
    			 if(prendidoQuestions){
    				 if(d2.actividades== "QUIZPET"){
    					 return 1;
    				 }
    			 }
                	
                	return 0;
                }
            })		
    	}
   
    
    }

function questionsFiltro(){
    //	g.selectAll("circle").attr("fill-opacity",0);
    
    	if(prendidoQuestions==false){
    		prendidoQuestions=true;
    	g.selectAll("circle").attr("fill-opacity", function (d2) {
           
    		 if (d2.actividades =="QUIZPET") {
             	return 1;
             }
    		 else{
    			 if(prendidoWebex){
    				 if(d2.actividades== "WEBEX"){
    					 return 1;
    				 }
    			 }
    			 if(prendidoParsons){
    				 if(d2.actividades== "PARSONS"){
    					 return 1;
    				 }
    			 }
    			 if(prendidoAnimated){
    				 if(d2.actividades== "ANIMATED_EXAMPLE"){
    					 return 1;
    				 }
    			 }
    				return 0;	 
    		 }
            
        })
    	}
    	else{
    		prendidoQuestions=false;
    		g.selectAll("circle").attr("fill-opacity", function (d2) {
                if (d2.actividades =="QUIZPET") {
                	return 0;
                }
                else{
       			 if(prendidoWebex){
    				 if(d2.actividades== "WEBEX"){
    					 return 1;
    				 }
    			 }
    			 if(prendidoParsons){
    				 if(d2.actividades== "PARSONS"){
    					 return 1;
    				 }
    			 }
    			 if(prendidoAnimated){
    				 if(d2.actividades== "ANIMATED_EXAMPLE"){
    					 return 1;
    				 }
    			 }
                	
                	return 0;
                }
            })		
    	}
   
    
    }

function click() {
    var arr = ["string1","string2","string3","string4","string5"];
    d3.select("#divInfo")
    /* 
        .append('div')
        .html(arr.join('<br/>'))
    */
    
        .selectAll('span')
        .data(data)
        .enter()
        .append('span')
        .text(function(d){
          return d.actividades;
        })
        .append('br');
    
    /*
        .selectAll('div')
        .data(data)
        .enter()
        .append('div')
        .text(function(d){
          return d.actividades;
        });
    */
}
}

d3.json("scripts/data.json",render);
