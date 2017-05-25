//alert("hola felipe el mas bonito");



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
            
/// variables

var outerWidth =1230;  	// ancho exterior del grafico
var outerHeight = 560;	// altura exterior del grafico
var margin = { left: 80, top: 30, right: 30, bottom: 30 };	// margenes desde los bordes de la ventana del grafico
var barPadding = 1;	// ??? rellenado barra

var xColumn = "topic";	// nombre de la columna con los topicos en el archivo csv
var yColumn = "time";	// nombre de la columna cn el tiempo en el archivo csv
var rMin=1;		// radio minimo
var rMax=6;		// radio maximo
var rColumn = "radio";	// nombre de la columna en el archivo csv, a mayor radio mas frecuentada la actividad
var colorColumn = "color";	// nombre de la columna en el archivo csv, dificultad, mas degradado mas facil
      
var xAxisLabelText = "Topicos";		// nombre abscisa grafico
var xAxisLabelOffset = 48;	// no se ocupa

var yAxisLabelText = "Tiempo(s) Promedio";	// nombre ordenada grafico
var yAxisLabelOffset = 45;		// ubicacion del texto en el eje X

var innerWidth  = outerWidth  - margin.left - margin.right;		// ancho interior 
var innerHeight = outerHeight - margin.top  - margin.bottom;	// altura interior 


/// se agrega al cuerpo el ancho y el alto de la ventana de visualizacion
var svg = d3.select("body").append("svg")
	.attr("width",  outerWidth)
	.attr("height", outerHeight*1.5);

// ubicar grafico en ventana
var g = svg.append("g")
	.attr("transform", "translate(" + margin.left *2+ "," + margin.top*2 + ")");

// ubica el eje de las abscisa (X)
var xAxisG = g.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + innerHeight + ")");


var yAxisG = g.append("g")
	.attr("class", "y axis");
	//.attr("transform", "translate(15,0)");



// escalan los valores en el grafico
var xScale = d3.scale.ordinal().rangeBands([0, innerWidth], barPadding);
var yScale = d3.scale.linear().range([innerHeight,30]);
var rScale = d3.scale.linear().range([rMin, rMax]);
var colorScale = d3.scale.category10();


/*
var x = d3.scale.linear()
		.domain([0, 25])
		.range([0, width]);

var data = [1, 2, 3, 5, 8, 13, 21];

var xAxis = d3.svg.axis()
		.scale(x)
		.orient("top")
		.tickValues(data)
		.innerTickSize([250])
		.outerTickSize([250]);*/

// se agregan lineas en el eje X, desde el eje a  la orientacion
var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
	.outerTickSize(1); // Turn off the marks at the end of the axis.// numeros de lineas o grosor de la linea

// crea las marcas en el eje Y con respecto a los datos, en este caso al tiempo
// si el tiempo es 150 seg dividira 125/20 = 6.25 aproxima a 5, cada 5 hara una marca
// 
var yAxis = d3.svg.axis().scale(yScale).orient("left")
	.ticks(20)                   // Use approximately 20 ticks marks.
    //.tickFormat(d3.format("d")) // Use intelligent abbreviations, e.g. 5M for 5 Million
    .outerTickSize(1);          // Turn off the marks at the end of the axis.

/// crear divisores en el grafico
var yAxisG2 = g.append("g")
.attr("class", "y2 axis")
.attr("transform", "translate(80,0)");
var yAxisG3 = g.append("g")
.attr("class", "y3 axis")
.attr("transform", "translate(160,0)");
var yAxisG4 = g.append("g")
.attr("class", "y4 axis")
.attr("transform", "translate(240,0)");
var yAxisG5 = g.append("g")
.attr("class", "y5 axis")
.attr("transform", "translate(320,0)");
var yAxisG6 = g.append("g")
.attr("class", "y6 axis")
.attr("transform", "translate(400,0)");
var yAxisG7 = g.append("g")
.attr("class", "y7 axis")
.attr("transform", "translate(480,0)");
var yAxisG8 = g.append("g")
.attr("class", "y8 axis")
.attr("transform", "translate(560,0)");
var yAxisG9 = g.append("g")
.attr("class", "y9 axis")
.attr("transform", "translate(640,0)");
var yAxisG10 = g.append("g")
.attr("class", "y10 axis")
.attr("transform", "translate(720,0)");
var yAxisG11 = g.append("g")
.attr("class", "y11 axis")
.attr("transform", "translate(800,0)");
var yAxisG12 = g.append("g")
.attr("class", "y12 axis")
.attr("transform", "translate(880,0)");
var yAxisG13 = g.append("g")
.attr("class", "y13 axis")
.attr("transform", "translate(960,0)");
var yAxisG14 = g.append("g")
.attr("class", "y14 axis")
.attr("transform", "translate(740,0)");
var yAxis2 = d3.svg.axis().scale(yScale).orient("left").ticks(0).outerTickSize(1);
var yAxis3 = d3.svg.axis().scale(yScale).orient("left").ticks(0).outerTickSize(1);
var yAxis4 = d3.svg.axis().scale(yScale).orient("left").ticks(0).outerTickSize(1);
var yAxis5 = d3.svg.axis().scale(yScale).orient("left").ticks(0).outerTickSize(1);
var yAxis6 = d3.svg.axis().scale(yScale).orient("left").ticks(0).outerTickSize(1);
var yAxis7 = d3.svg.axis().scale(yScale).orient("left").ticks(0).outerTickSize(1);
var yAxis8 = d3.svg.axis().scale(yScale).orient("left").ticks(0).outerTickSize(1);
var yAxis9 = d3.svg.axis().scale(yScale).orient("left").ticks(0).outerTickSize(1);
var yAxis10 = d3.svg.axis().scale(yScale).orient("left").ticks(0).outerTickSize(1);
var yAxis11 = d3.svg.axis().scale(yScale).orient("left").ticks(0).outerTickSize(1);
var yAxis12 = d3.svg.axis().scale(yScale).orient("left").ticks(0).outerTickSize(1);
var yAxis13 = d3.svg.axis().scale(yScale).orient("left").ticks(0).outerTickSize(1);
var yAxis13 = d3.svg.axis().scale(yScale).orient("left").ticks(0).outerTickSize(1);


        
var yAxisG = g.append("g")
	.attr("class", "y axis")
	.attr("transform", "translate(0,0)");

// ubicacion del texto del eje Y
var yAxisLabel = yAxisG.append("text")
	.style("text-anchor", "middle")
    .attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
    .attr("class", "label")
    .text(yAxisLabelText);  





  ///funcion que carga los datos del archivo, aclarar que este es un archivo de ejemplo  
function render(data){
	
	xScale.domain(data.map( function (d){ return d[xColumn]; }));
    yScale.domain([0, d3.max(data, function (d){ return d[yColumn]; })]);// escala y dibuja el circulo entre 0 y el maximo de los datos de la columna tiempo
    rScale.domain(d3.extent(data, function (d){ return d[rColumn]; }));

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);
    /*yAxisG2.call(yAxis2);
    yAxisG3.call(yAxis3);
    yAxisG4.call(yAxis4);
    yAxisG5.call(yAxis5);
    yAxisG6.call(yAxis6);
    yAxisG7.call(yAxis7);
    yAxisG8.call(yAxis8);
    yAxisG9.call(yAxis9);
    yAxisG10.call(yAxis10);
    yAxisG11.call(yAxis11);
    yAxisG12.call(yAxis12);
    yAxisG13.call(yAxis13);
    yAxisG14.call(yAxis14);*/
   

    var circles = g.selectAll("circle").data(data);
    circles.enter().append("circle");
    circles
		.attr("cx",      function (d){ return       xScale(d[xColumn]);     })
        .attr("cy",      function (d){ return       yScale(d[yColumn]);     })
        .attr("r",       function (d){ return       rScale(d[rColumn]);     })
        .attr("fill",    function (d){ return   colorScale(d[colorColumn]); });

	circles.exit().remove();
}
  
function type(d){
	d.population = +d.population;
    d.time = +d.time;
        
    return d;
}
     

d3.csv("topic.csv", type, render);

