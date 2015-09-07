define(['backbone', 'marionette', 'app/modules/activity/d3/graph', 'text!templates/devTools/activity/graph.html'

  ], function(Backbone, Marionette, Graph, tpl) {

  var ActivityGraph = Backbone.Marionette.ItemView.extend({
    
    template: tpl,

    tagName: "div",

    className: 'activity-graph',

    defaults: {
      activityCollection: undefined
    },

    onShow: function() {

      this.showSlider();

    },

    showSlider: function() {
      var formattedData = this.formatData(this.options.activityCollection);
      Graph.displaySlider(
        formattedData.data,
        formattedData.startX,
        formattedData.endX
      );
    },

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
          "y": rectHeight * activity.depth - 20
        };

      });

      return {
        data: data,
        startX: startX,
        endX: endX
      };
    }

  });

  return ActivityGraph;

});
