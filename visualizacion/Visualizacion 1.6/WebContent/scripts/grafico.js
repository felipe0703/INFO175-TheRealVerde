//<style>
//	form {
//		font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
//	    position: absolute;
//	    left: 10px;
//	    top: 10px;
//	}
//	
//	label {
//		display: block;
//	}
//
//	.axis text {
//		font-family: 'Poiret One', cursive;
//		font-size: 10pt;
//	}
//	.axis .label {
//		font-size: 16pt;
//	}
//
//	.axis path, .axis line {
//		fill: none;
//		stroke: #000;
//		shape-rendering: crispEdges;
//	}
//</style>





            
/// VARIABLES DEL ESPACIO DONDE SE GRAFICARA
var outerWidth =3022;  	// ancho exterior del grafico 1170
var outerHeight = 560;	// altura exterior del grafico
var margin = { left: 80, top: 30, right: 30, bottom: 30 };	// margenes desde los bordes de la ventana del grafico
var barPadding = 2;	//  rellenado barra
var innerWidth  = outerWidth  - margin.left - margin.right;		// ancho interior 
var innerHeight = outerHeight - margin.top  - margin.bottom;	// altura interior 

// VARIABLES EJES      
//var xAxisLabelText = "Topicos";     // nombre abscisa grafico
//var xAxisLabelOffset = 48;  // no se ocupa
var yAxisLabelText = "Tiempo(s) Promedio";  // nombre ordenada grafico
var yAxisLabelOffset = 45;      // ubicacion del texto en el eje X

///VARIABLES COLOR
var colorAE = "rgb(197,27,138)";
var colorW = "rgb(248,0,0)";
var colorQ_MD = "rgb(237,248,251)";
var colorQ_D = "rgb(178,226,226)";
var colorQ_I = "rgb(102,194,164)";
var colorQ_F = "rgb(44,162,95)";
var colorQ_MF = "rgb(0,109,44)";
var colorP_MD = "rgb(241,238,246)";
var colorP_D = "rgb(189,201,225)";
var colorP_I = "rgb(116,169,207)";
var colorP_F = "rgb(43,140,190)";
var colorP_MF = "rgb(4,90,141)";

//var posicion;

/// se agrega al cuerpo el ancho y el alto de la ventana de visualizacion
var svg = d3.select("body").append("svg")
	.attr("width",  outerWidth)
	.attr("height", outerHeight+50);

// ubicar grafico en ventana
var g = svg.append("g")
	.attr("transform", "translate(" + margin.left+ "," + margin.top + ")");

// ubica el eje de las abscisa (X)
var xAxisG = g.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + (innerHeight+50) + ")");

/*var xAxisG2 = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + innerHeight + ")");
*/

var yAxisG = g.append("g")
	.attr("class", "y axis");
	//.attr("transform", "translate(15,0)");


/// escalan los valores en el grafico
//var xScale = d3.scale.ordinal().rangeBands([0, innerWidth], barPadding);
//var xScale = d3.scale.ordinal().domain(["a","b","c","d"]).rangeBands(0, innerWidth);
//var yScale = d3.scale.linear().domain([0, 130]).range([innerHeight,0]);
//var rScale = d3.scale.linear().range([rMin, rMax]);
//var colorScale = d3.scale.category10();
/*
var x = d3.scale.linear().domain([0, 25]).range([0, width]);
var data = [1, 2, 3, 5, 8, 13, 21];
var xAxis = d3.svg.axis().scale(x).orient("top").tickValues(data).innerTickSize([250]).outerTickSize([250]);
*/

        
var yAxisG = g.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,0)");

// ubicacion del texto del eje Y
var yAxisLabel = yAxisG.append("text")
    .style("text-anchor", "middle")
    .attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
    .attr("class", "label")
    .text(yAxisLabelText);  

// dibuja las marcas divisoras(subzonas)
/*var c1=4;
for (var i = 52; i < innerWidth; i=i+52 ) {
        if(i != c1*52){
            var linea = g.append("line").attr("x1",i).attr("y1",495).attr("x2",i).attr("y2",505).attr("stroke-width",1).attr("stroke","black");
        }
        else{
            c1=c1+4;
        }
} 
*/

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
//var posicion = 0;
///FUNCION QUE CARGA LOS DATOS DEL ARCHIVO JSON
function render(data){

    var minIntentos = d3.min(data, function (d){return d.intentos});
    var maxIntentos = d3.max(data, function (d){return d.intentos});
    var maxTiempo = d3.max(data, function (d){return d.tiempo_promedio;});
    var minTiempo = d3.min(data, function (d){return d.tiempo_promedio;});
    //var minTop = d3.min(data, function (d){return d.numero_columna});
    //var maxTop = d3.max(data, function (d){return d.numero_columna});


    var yScale = d3.scale.linear().domain([0, maxTiempo]).range([innerHeight,0]);
    var yScale2 = d3.scale.linear().domain([0, maxTiempo]).range([innerHeight + 50,0])
    var rScale = d3.scale.linear().domain([minIntentos, maxIntentos]).range([5,25]);
   /* var tScale = d3.scale.linear().domain([minTiempo,maxIntentos]);
    var topScale = d3.scale.linear().domain([minTop,maxTop]).range([25,innerWidth-25]);
*/
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
    
  /* var xScale = d3.scale.ordinal()
        .domain(["ANIMATED_EXAMPLE","PARSONS","QUIZPET","WEBEX"])
        .rangeBands([0,208],[1],[0.5]);
    */
  
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



/*
    svg
        .datum(data)
        .on("click", click);
*/
    var circles = g.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .on("mousemove", function(d){
                        tooltip
                          .style("left", d3.event.pageX - 50 + "px")
                          .style("top", d3.event.pageY - 70 + "px")
                          .style("display", "inline-block")
                          .html((d.actividades) + ":" + (d.tiempo_promedio));
                    })
                    .on("mouseout", function(d){ tooltip.style("display", "none");})
                    .on("click", click);

    


    var circleAttributes = circles
                        //.attr("cx", function (d) {return  topicosScale(d.numero_columna);})
                        //.attr("cx", function (d) { return xScale(d.actividades); })
                        //.attr("cx", function (d) { return topicosScale(d.topicos);})
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
   // svg.call(tip);
   //posicion = 0;

    function click() {
    	var n = data.length-1;
    	alert("chupala");
    }
}

d3.json("scripts/data.json",render);
