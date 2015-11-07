'use strict'

var reportApp = angular.module('populationReport', []);

reportApp.controller('populationReportCtrl', function($scope, $interval) {
  $scope.startYear = '1960';
  $scope.endYear ='2014';
  $scope.currentYear = '2014';
  $scope.currentCountry = "USA";
  $scope.countries = [
    "USA", 
    "China", 
    "India", 
    "Russia", 
    "Japan"
  ];
  $scope.playing = false;
  $scope.updateCountry = function(value) {
    $scope.currentCountry = value;
    render_line(data, value);
  };
  var run;
  $scope.autoAdd = function() {
    if ($scope.playing) {
      if (angular.isDefined(run)) {
        $scope.stopAuto();
      }
    } else {
      $scope.playing = true;
      if ($scope.currentYear >= 2014) $scope.currentYear = $scope.startYear;
      run = $interval(function() {
        if ($scope.currentYear < 2014 ) $scope.currentYear++;
        else $scope.stopAuto();
      }, 100);
    }
  }
  $scope.stopAuto = function() {
      $interval.cancel(run);
      run = undefined;
      $scope.playing = false;
  }
  //bar chart


//bar chart config
  var margin = {top: 10, right: 10, bottom: 20, left: 40},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
  var x_bar = d3.scale.ordinal()
    .rangeRoundBands([0, width], .4);

  var y_bar = d3.scale.linear()
      .range([height, 0]);

  var xAxis_bar = d3.svg.axis()
      .scale(x_bar)
      .orient("bottom");

  var yAxis_bar = d3.svg.axis()
      .scale(y_bar)
      .orient("left");

  var svg_bar = d3.select(".country_bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<span style='color:red'>" + d.Country + "</span>";
  });
  svg_bar.call(tip);

  //bar chart config
  var radius = Math.min(width,height)/2;

  var svg_pie = d3.select(".country_pie").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");  

  var color = d3.scale.ordinal()
      .range(["#ff7f0e","#1f77b4", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]);
  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.Value; });


  //line chart
  var line_x = d3.scale.linear()
    .range([0, width]);
//rangeRoundBands([0, width], .4);
  var line_y = d3.scale.linear()
      .range([height, 0]);

  var line_xAxis = d3.svg.axis()
      .scale(line_x)
      .orient("bottom");

  var line_yAxis = d3.svg.axis()
      .scale(line_y)
      .orient("left");

  var line = d3.svg.line()
    .x(function(d) { return line_x(d.x); })
    .y(function(d) { return line_y(d.y); });

  var line_svg = d3.select(".country_line").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  var dataProcessor = function(d, y) {
    d.sort(function(a, b) {return b[y] - a[y]});
    var data = [];
    for (var i=0;i<10;i++) {
      data[i] = {'Country': d[i]['Country'], 'Value': d[i][y]};
    }
    return data;
  }


  var type = function(d) {
    for (var i=1960; i<2015; i++) {
      d[i] = +d[i]/1000000;
    }
    return d;
  }

  var render = function(data) {
    //bar chart
    svg_bar.selectAll("g").remove();

    x_bar.domain(data.map(function(d) { return d.Country; }));
    y_bar.domain([0, d3.max(data, function(d) { return d.Value; })]);

    svg_bar.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis_bar);

    svg_bar.append("g")
        .attr("class", "y axis")
        .call(yAxis_bar)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Population (Million)");


    svg_bar.selectAll(".bar").remove();

    svg_bar.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x_bar(d.Country); })
        .attr("width", x_bar.rangeBand())
        .attr("y", function(d) { return y_bar(d.Value); })
        .attr("height", function(d) { return height - y_bar(d.Value); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    //pie chart
      svg_pie.selectAll(".arc").remove();
      var g_pie = svg_pie.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

      g_pie.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.Country); });

      g_pie.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.data.Country; });
  } 

  var render_line = function(bulk, country) {
    var data = [], tmpdata;
    for (var i=0;i<bulk.length;i++) {
      if (bulk[i]['Country'] == country ) {
        tmpdata = bulk[i];
        break;
      }
    }

    for (var k in tmpdata) {
      if (k <= $scope.currentYear)
      data.push({'x': k, 'y': tmpdata[k]});
    }
  //line_x.domain([d3.min(data, function(d) { return d.x; }), d3.max(data, function(d) { return d.x; })]);
  //line_y.domain([0, d3.max(data, function(d) { return d.y; })]);
  line_x.domain([$scope.startYear, $scope.endYear]);
  line_y.domain(d3.extent(data, function(d) { return d.y; }));

  //line_svg.selectAll('g').remove()
    //.append("g")
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  line_svg.selectAll("g").remove();
  line_svg.selectAll("path").remove();

  line_svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(line_xAxis);

  line_svg.append("g")
      .attr("class", "y axis")
      .call(line_yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Population (Million)");

  line_svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
  }

  var data;
  d3.csv("files/data/data.csv", type, function(d) {
    data = d;
     var tmpdata = dataProcessor(d, $scope.currentYear);
    // console.log(tmpdata);
     render(tmpdata);
     render_line(d, $scope.currentCountry);

  }); 

  $scope.$watch('currentYear', function() {
    if (data) {
      var tmpdata = dataProcessor(data, $scope.currentYear);
      render(tmpdata);   
      render_line(data, $scope.currentCountry);   
    }

  });

});
//map chart



(function() {
  var width  = 800;
  var height = 500;
  var margin = { left: -50, top: 0, right: -50, bottom: 0 };

  var xColumn = "longitude";
  var yColumn = "latitude";
  var rColumn = "population";
  var peoplePerPixel = 100000;

  var innerWidth  = width  - margin.left - margin.right;
  var innerHeight = height - margin.top  - margin.bottom;

  var svg_map = d3.select(".map").append("svg")
    .attr("width",  width)
    .attr("height", height);

  var g_map = svg_map.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xScale = d3.scale.linear().range([0, innerWidth]);
  var yScale = d3.scale.linear().range([innerHeight, 0]);
  var rScale = d3.scale.sqrt();

  function render(data){

    xScale.domain( d3.extent(data, function (d){ return d[xColumn]; }));
    yScale.domain( d3.extent(data, function (d){ return d[yColumn]; }));
    rScale.domain([0, d3.max(data, function (d){ return d[rColumn]; })]);

    // Compute the size of the biggest circle as a function of peoplePerPixel.
    var peopleMax = rScale.domain()[1];
    var rMin = 0;
    var rMax = Math.sqrt(peopleMax / (peoplePerPixel * Math.PI));
    rScale.range([rMin, rMax]);

    var circles = g_map.selectAll("circle").data(data);
    circles.enter().append("circle");
    circles
      .attr("cx", function (d){ return xScale(d[xColumn]); })
      .attr("cy", function (d){ return yScale(d[yColumn]); })
      .attr("r",  function (d){ return rScale(d[rColumn]); });
    circles.exit().remove();
  }

  function type_map(d){
    d.latitude   = +d.latitude;
    d.longitude  = +d.longitude;
    d.population = +d.population;
    return d;
  }

  d3.csv("files/data/data_map.csv", type_map, render);

})();

