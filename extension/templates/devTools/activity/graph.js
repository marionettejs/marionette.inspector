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

    displayGraph: function (formattedData, startX, endX) {

      var activityGraph = d3.select('div.activity-graph');

      var margin = 10;
      var width = +activityGraph.style('width').split('px')[0];
      var height = 100;

      var x = d3.scale.linear()
        .domain([startX, endX])
        .range([0, width]);

      var y = d3.scale.linear()
        .domain([0, 100])
        .range([0, height]);

      var color = d3.scale.category20();

      var svg = activityGraph.append("svg")
        .attr("width", width + (2 * margin))
        .attr("height", height + (2 * margin));

      rect = svg.selectAll('rect')
          .data(formattedData)
        .enter().append("rect")
          .attr("x", function(d) { return x(d.attributes.position.x); })
          .attr("y", function(d) { return y(d.attributes.position.y); })
          .attr("width", function(d) { return 100 * d.attributes.position.dx; })
          .attr("height", function(d) { return d.attributes.position.dy; })
          .attr("fill", function(d) { return color(d.attributes.eventName); })
          .attr("id", function(d) { return "id" + d.attributes.eventId; })
          .on("click", onClick)
          .on("mouseover", onMouseover);

      function onClick(d) {

        var eventId = d.attributes.eventId;
        Radio.command('activity', 'click:graph', eventId);

      }

      // function onMouseover(event) {
      //   console.log("event: ", event);
      //   d3.select("text").remove();

      //   d3.select("rect#id"+ event.attributes.eventId).append('text')
      //   .attr('x', function(d) { return x(d.attributes.position.x); })
      //   .attr('y', function(d) { return y(d.attributes.position.y); })
      //   .text(function(d) {
      //     console.log("d.attributes.eventName: ", d.attributes.eventName);
      //     return d.attributes.eventName;
      //   });

      // }
    }
  };

});
