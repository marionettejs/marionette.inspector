define(['d3', 'util/Radio'], function(d3, Radio) {
  
  return {

    displayGraph: function (formattedData, startX, endX, windowStart, windowEnd, icicleGraph) {

      var activityGraph = d3.select('div.icicle-graph');

      var margin = 2;
      var width = +activityGraph.style('width').split('px')[0];
      var height = 100;

      var x = d3.scale.linear()
        .domain([startX + ((endX-startX) * windowStart), startX + ((endX-startX) * windowEnd)])
        .range([0, width]);

      var y = d3.scale.linear()
        .domain([0, 100])
        .range([0, height]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("top");

      // var yAxis = d3.svg.axis()
      //   .scale(y)
      //   .orient("left");

      var color = d3.scale.category20();

      activityGraph.select("svg").remove();

      var svg = activityGraph.append("svg")
        .attr("width", width - (2 * margin))
        .attr("height", height - (2 * margin));
      rect = svg.selectAll('rect')
          .data(formattedData)
        .enter().append("rect")
          .attr("x", function(d) { return x(d.attributes.position.x); })
          .attr("y", function(d) { return y(d.attributes.position.y); })
          .attr("width", function(d) { return (1 / (windowEnd - windowStart)) * d.attributes.position.dx; })
          .attr("height", function(d) { return d.attributes.position.dy; })
          .attr("fill", function(d) { return color(d.attributes.eventName); })
          .attr("class", "activity-rect")
          .on("click", onClick)
          .on("mouseover", onMouseover)
          .on("mouseout", onMouseout);

      svg.append("g")
        .attr("class", "axis")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "start")
        .style("font-size", "10px");

      // svg.append("g")
      //   .attr("class", "axis")
      //   .call(yAxis);

      function onClick(d) {

        var eventId = d.attributes.eventId;
        Radio.command('activity', 'click:graph', eventId);

      }

      function onMouseover(event) {

        svg.selectAll('g.label').remove();

        var label = svg.selectAll("g.label")
          .data([event])
          .enter().append("g")
          .attr("class", "label");

        label.append("rect")
          .attr("width", function(d) { return 8 * d.attributes.eventName.length; })
          .attr("height", 20)
          .attr("fill", "#c7c7c7")
          .attr("fill-opacity", "0.75")
          .attr("x", function(d) { return x(d.attributes.position.x); })
          .attr("y", function(d) { return y(d.attributes.position.y - 20); });

        label.append("text")
          .attr("x", function(d) { return x(d.attributes.position.x) + (4 * d.attributes.eventName.length); })
          .attr("y", function(d) { return y(d.attributes.position.y) - 5; })
          .attr("text-anchor", "middle")
          .attr("font-size", "10px")
          .text(function(d) { return d.attributes.eventName; });

      }

      function onMouseout() {

        svg.selectAll('g.label').remove();
      }


    }
  };

});
