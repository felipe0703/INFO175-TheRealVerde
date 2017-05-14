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
            

var outerWidth =1500;
var outerHeight = 500;
var margin = { left: 80, top: 30, right: 30, bottom: 30 };
var barPadding = 1;

var xColumn = "topic";
var yColumn = "time";
var rMin=1;
var rMax=6;
var rColumn = "radio";
var colorColumn = "color";
      
var xAxisLabelText = "Topicos";
var xAxisLabelOffset = 48;

var yAxisLabelText = "Tiempo (s)";
var yAxisLabelOffset = 30;

var innerWidth  = outerWidth  - margin.left - margin.right;
var innerHeight = outerHeight - margin.top  - margin.bottom;

var svg = d3.select("body").append("svg")
	.attr("width",  outerWidth)
	.attr("height", outerHeight);
var g = svg.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var xAxisG = g.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + innerHeight + ")");
var yAxisG = g.append("g")
	.attr("class", "y axis");

var xScale = d3.scale.ordinal().rangeBands([0, innerWidth], barPadding);
var yScale = d3.scale.linear()
	.range([innerHeight, 20]);
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


var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient("bottom")
	.outerTickSize(1); // Turn off the marks at the end of the axis.
	
var yAxis = d3.svg.axis().scale(yScale).orient("left")
	.ticks(5)                   // Use approximately 5 ticks marks.
    .tickFormat(d3.format("d")) // Use intelligent abbreviations, e.g. 5M for 5 Million
    .outerTickSize(1);          // Turn off the marks at the end of the axis.
        
var yAxisG = g.append("g")
	.attr("class", "y axis");
var yAxisLabel = yAxisG.append("text")
	.style("text-anchor", "middle")
    .attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
    .attr("class", "label")
    .text(yAxisLabelText);  
      
        
function render(data){

	xScale.domain(       data.map( function (d){ return d[xColumn]; }));
    yScale.domain([0, d3.max(data, function (d){ return d[yColumn]; })]);
    rScale.domain(d3.extent(data, function (d){ return d[rColumn]; }));

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);
   

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

