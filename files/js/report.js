'use strict'

var reportApp = angular.module('populationReport', []);

reportApp.controller('populationReportCtrl', function($scope) {
  $scope.startYear = '1948';
  $scope.endYear ='2014';
  $scope.currentYear = '2014';
  $scope.currentCountry = "USA";
  $scope.countries = [
    "USA", 
    "China", 
    "Japan", 
    "Russia", 
    "British"
  ];
  $scope.updateCountry = function(value) {
    $scope.currentCountry = value;
  };

  //bar chart


//bar chart config
  var margin = {top: 10, right: 10, bottom: 20, left: 60},
    width = 400 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
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

  var setConfig = function(data) {
    //bar chart


  }

  var render = function(data) {

    svg_bar.selectAll("g").remove();

    x_bar.domain(data.map(function(d) { return d.Country; }));
    y_bar.domain([0, 1500]);

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
        .on('mouseout', tip.hide)
  } 

  var data;
  d3.csv("files/data/data.csv", type, function(d) {
    data = d;
     var tmpdata = dataProcessor(d, $scope.currentYear);
    // console.log(tmpdata);
     setConfig(tmpdata);
     render(tmpdata);

  }); 

  $scope.$watch('currentYear', function() {
    if (data) {
      var tmpdata = dataProcessor(data, $scope.currentYear);
      render(tmpdata);      
    }

  });

//d3.tsv("files/data/data.tsv", type, render);  

});