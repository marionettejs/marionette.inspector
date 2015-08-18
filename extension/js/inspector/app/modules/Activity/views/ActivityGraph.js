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
      
      var formattedData = Graph.formatData(this.options.activityCollection);
      Graph.displayGraph(
        formattedData.data,
        formattedData.startX,
        formattedData.endX,
        +(this.ui.windowStart.val()) || 0,
        +(this.ui.windowEnd.val()) || 1,
        this.ui.icicleGraph
      );
    }

  });

  return ActivityGraph;

});
