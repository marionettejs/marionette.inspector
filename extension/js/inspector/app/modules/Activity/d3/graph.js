define(['d3', 'util/Radio'], function(d3, Radio) {
  
  return {

    formatData: function(data) {

      var rectHeight = 20;
      var startX = Infinity;
      var endX = -Infinity;

      _.each(data, function(activity) {

        activity = activity.attributes;

        startX = activity.startTime < startX ? activity.startTime : startX;
        endX = activity.endTime > endX ? activity.endTime : endX;

        activity.position = {
          "dx": activity.endTime - activity.startTime,
          "dy": rectHeight,
          "x": activity.startTime,
          "y": rectHeight * activity.depth
        };

      });

      return {
        data: data,
        startX: startX,
        endX: endX
      };

    },

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

      var color = d3.scale.category20();

      activityGraph.select("svg").remove();

      var svg = activityGraph.append("svg")
        .attr("width", width - (2 * margin))
        .attr("height", height - (2 * margin));

      rect = svg.selectAll('rect')
          .data(formattedData)
        .enter().append("rect")
          .attr("x", function(d) {
          return x(d.attributes.position.x); })
          .attr("y", function(d) { return y(d.attributes.position.y); })
          .attr("width", function(d) { return (1 / (windowEnd - windowStart)) * d.attributes.position.dx; })
          .attr("height", function(d) { return d.attributes.position.dy; })
          .attr("fill", function(d) { return color(d.attributes.eventName); })
          .on("click", onClick)
          .on("mouseover", onMouseover);

      function onClick(d) {

        var eventId = d.attributes.eventId;
        Radio.command('activity', 'click:graph', eventId);

      }

      function onMouseover(event) {

        svg.selectAll('text').remove();

        var text = svg.selectAll('text')
          .data([event])
          .enter()
          .append('text')
          .attr('x', function(d) { return x(d.attributes.position.x); })
          .attr('y', function(d) { return y(d.attributes.position.y); })
          .text(function(d) { return d.attributes.eventName; });
      }
    }
  };

});
