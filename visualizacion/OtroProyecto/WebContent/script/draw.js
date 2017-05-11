var width = 1000,
    height =900,
    radius = Math.min(width, height) / 2,
    rad = 0.1;
    //innerRadius1 = 0.1 * radius,
    //innerRadius2 = 0.2 * radius,
    //innerRadius3 = 0.3 * radius,
    //innerRadius4 = 0.4 * radius,
    //innerRadius5 = 0.5 * radius,
    //innerRadius6 = 0.6 * radius,
    //innerRadius7 = 0.7 * radius,
    //innerRadius8 = 0.8 * radius,
    //innerRadius9 = 0.9 * radius
    innerRadius = rad * radius
    ;

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.width; });

//carga la info en em mouseover
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([0, 0])
  .html(function(d) {
    return d.data.label + ": <span style='color:orangered'>" + d.data.score + "</span>";
  });
//genera las barras desde el circulo central
var arc = d3.svg.arc()
  //.innerRadius(innerRadius)
  .outerRadius(function (d) { 
    //return (radius - innerRadius3) * (d.data.score / 100.0) + innerRadius3;
    return (radius) * (d.data.score / 100.0)  	;
  });
//lineas exteriores
var outlineArc = d3.svg.arc()
        //.innerRadius1(innerRadius1)//
        //.innerRadius2(innerRadius2)
        //.innerRadius(innerRadius)
        //.innerRadius4(innerRadius4)
        //.innerRadius5(innerRadius5)
        //.innerRadius6(innerRadius6)
        //.innerRadius7(innerRadius7)
        //.innerRadius8(innerRadius8)
        //.innerRadius9(innerRadius9)
        .outerRadius(radius);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.call(tip);

d3.csv('aster_data.csv', function(error, data) {

  data.forEach(function(d) {
    d.id     =  d.id;
    d.order  = +d.order;
    d.color  =  d.color;
    d.weight = +d.weight;
    d.score  = +d.score;
    d.width  = +d.weight;
    d.label  =  d.label;
  });
  // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }
  
  var path = svg.selectAll(".solidArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", function(d) { return d.data.color; })
      .attr("class", "solidArc")
      .attr("stroke", "gray")
      .attr("d", arc)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  var outerPath = svg.selectAll(".outlineArc")
      .data(pie(data))
      .enter().append("path")
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("class", "outlineArc")
      .attr("d", outlineArc);  


  // calculate the weighted mean score
  var score = 
    data.reduce(function(a, b) {
      //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
      return a + (b.score * b.weight); 
    }, 0) / 
    data.reduce(function(a, b) { 
      return a + b.weight; 
    }, 0);

  svg.append("svg:text")
    .attr("class", "aster-score")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle") // text-align: right
    //.text(Math.round(score));

});
