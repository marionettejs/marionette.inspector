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

      var width = +activityGraph.style('width').split('px')[0];
      var height = 100;

      var x = d3.scale.linear()
        .domain([startX, endX])
        .range([0, width]);

      var y = d3.scale.linear()
        .domain([0, 100])
        .range([0, height]);

      var color = d3.scale.category20c();

      var svg = activityGraph.append("svg")
        .attr("width", width)
        .attr("height", height);

      rect = svg.selectAll("rect")
          .data(formattedData)
        .enter().append("rect")
          .attr("x", function(d) { return d.attributes.position.x - startX; })
          .attr("y", function(d) { return d.attributes.position.y; })
          .attr("width", function(d) { return 500 * d.attributes.position.dx; })
          .attr("height", function(d) { return d.attributes.position.dy; })
          .attr("fill", function(d) { return color(d.attributes.eventName); })
          .on("click", onShowInfo);

      function onShowInfo(d) {

        var eventId = d.attributes.eventId;

        Radio.command('activity', 'click:graph', eventId);

        svg.select("text").remove();

        svg.append("text")
          .attr("x", 0 )
          .attr("y", 20 )
          .text('name: ' + d.attributes.eventName);





      }

    }
  };

});
