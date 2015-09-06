define(['backbone', 'marionette', 'app/modules/activity/d3/graph', 'text!templates/devTools/activity/graph.html'

  ], function(Backbone, Marionette, Graph, tpl) {

  var ActivityGraph = Backbone.Marionette.ItemView.extend({
    
    template: tpl,

    tagName: "div",

    className: 'activity-graph',

    defaults: {
      activityCollection: undefined
    },

    ui: {
      'windowStart': '[name="window-start"]',
      'windowEnd': '[name="window-end"]',
      'icicleGraph': '.icicle-graph'
    },

    events: {
      'change @ui.windowStart': 'showGraph',
      'change @ui.windowEnd': 'showGraph'

    },

    onShow: function() {

      this.showGraph();

    },

    showGraph: function() {
      
      var formattedData = this.formatData(this.options.activityCollection);
      Graph.displayGraph(
        formattedData.data,
        formattedData.startX,
        formattedData.endX,
        +(this.ui.windowStart.val()) || 0,
        +(this.ui.windowEnd.val()) || 1,
        this.ui.icicleGraph
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
