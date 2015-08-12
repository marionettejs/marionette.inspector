define(['d3'], function(d3) {
  
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

      var width = 500,
      height = 500;

      var x = d3.scale.linear()
        .range([0, width]);

      var y = d3.scale.linear()
        .range([0, height]);

      var color = d3.scale.category20c();

      var svg = d3.select("div.activity-graph").append("svg")
        .attr("width", width)
        .attr("height", height);

      rect = svg.selectAll("rect")
          .data(formattedData)
        .enter().append("rect")
          .attr("x", function(d) {
            console.log("d:", d);
            return d.attributes.position.x - startX;
          })
          .attr("y", function(d) { return d.attributes.position.y; })
          .attr("width", function(d) { return 500 * d.attributes.position.dx; })
          .attr("height", function(d) { return d.attributes.position.dy; })
          .attr("fill", function(d) { return color(d.attributes.eventName); })
          .on("click", clicked);

      function clicked(d) {
        svg.select("text").remove();

        svg.append("text")
          .attr("x", 400 )
          .attr("y", 0 )
          .text('name: ' + d.attributes.eventName);
      }

    }
  };

});
