define(['d3', 'util/Radio'], function(d3, Radio) {
  
  return {

    displayGraph: function (formattedData, windowStart, windowEnd, range, maxDepth) {

      var activityGraph = d3.select('div.graph-icicle'),
          margin = 5,
          height = 50 + (+maxDepth * 20),
          width = +activityGraph.style('width').split('px')[0];

      var x = d3.scale.linear()
        .domain([windowStart, windowEnd])
        .range([0, width]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("top")
        .ticks(10);

      var color = d3.scale.category20();

      activityGraph.select("svg").remove();

      var svg = activityGraph.append("svg")
        .attr("width", width + (2 * margin))
        .attr("height", height + (2 * margin))
        .attr("class", "activity-graph-svg");

      rect = svg.selectAll('rect')
          .data(formattedData)
        .enter().append("rect")
          .attr("x", function(d) { return x(d.attributes.position.x); })
          .attr("y", function(d) { return d.attributes.position.y; })
          .attr("width", function(d) { return (range / (windowEnd - windowStart)) * d.attributes.position.dx; })
          .attr("height", function(d) { return d.attributes.position.dy; })
          .attr("fill", function(d) { return color(d.attributes.eventName); })
          .attr("class", "activity-graph-rect")
          .on("click", onClick)
          .on("mouseover", onMouseover)
          .on("mouseout", onMouseout);

      svg.append("g")
        .attr("class", "axis")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle")
        .style("font-size", "10px");

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
          .attr("y", function(d) { return d.attributes.position.y - 20; });

        label.append("text")
          .attr("x", function(d) { return x(d.attributes.position.x) + (4 * d.attributes.eventName.length); })
          .attr("y", function(d) { return d.attributes.position.y - 5; })
          .attr("text-anchor", "middle")
          .attr("font-size", "10px")
          .text(function(d) { return d.attributes.eventName; });

      }

      function onMouseout() {

        svg.selectAll('g.label').remove();
      }

    },

    displaySlider: function(formattedData, startX, endX, maxDepth) {
      
      var context = this,
          slider = d3.select('div.graph-slider'),
          margin = 5,
          height = 50,
          width = +slider.style('width').split('px')[0];

      var x = d3.scale.linear()
        .domain([startX, endX])
        .range([0, width]);

      var y = d3.scale.linear()
        .domain([0, 100])
        .range([0, height]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(10);

      var brush = d3.svg.brush()
        .x(x)
        .extent([startX, endX])
        .on("brushend", brushend);

      var arc = d3.svg.arc()
        .outerRadius(height / 10)
        .startAngle(0)
        .endAngle(360);
      
      var svg = slider.append("svg")
        .attr("width", width + (2 * margin))
        .attr("height", height + (2 * margin))
        .append("g");

      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0,10)")
        .call(xAxis)
        .append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + width / 2 + "," + "40)")
        .text("time to execute in ms");
      
      var brushg = svg.append("g")
        .attr("class", "brush")
        .call(brush);
      
      brushg.selectAll(".resize").append("path")
        .attr("transform", "translate(0,10)")
        .attr("d", arc);

      brushg.selectAll("rect")
        .attr("height", height / 5)
        .attr('y', 5);

      this.displayGraph(formattedData, startX, endX, endX - startX, maxDepth);

      function brushend() {
        var s = brush.extent();
        context.displayGraph(formattedData, +s[0], +s[1], endX - startX, maxDepth);
      }

    }

  };

});
