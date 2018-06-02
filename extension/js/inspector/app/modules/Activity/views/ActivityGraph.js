define(['backbone', 'marionette', 'app/modules/Activity/d3/graph'
  ], function(Backbone, Marionette, Graph) {

  var ActivityGraph = Backbone.Marionette.View.extend({
    
    template: 'activity/graph.html',

    tagName: "div",

    className: 'activity-graph',

    options: {
      activityCollection: undefined
    },

    onAttach: function() {

      this.showSlider();

    },

    showSlider: function() {
      var formattedData = this.formatData(this.options.activityCollection);
      Graph.displaySlider(
        formattedData.data,
        formattedData.startX,
        formattedData.endX,
        formattedData.maxDepth
      );
    },

    formatData: function(data) {
      var rectHeight = 20,
          startX = Infinity,
          endX = -Infinity,
          maxDepth = 0;

      _.each(data, function(activity) {

        activity = activity.attributes;

        startX = activity.startTime < startX ? activity.startTime : startX;
        endX = activity.endTime > endX ? activity.endTime : endX;
        maxDepth = activity.depth > maxDepth ? activity.depth : maxDepth;

        activity.position = {
          "dx": activity.endTime - activity.startTime,
          "dy": rectHeight,
          "x": activity.startTime,
          "y": rectHeight * activity.depth - 20
        };

      });

      return {
        data: data,
        startX: startX,
        endX: endX,
        maxDepth: maxDepth
      };
    }

  });

  return ActivityGraph;

});
