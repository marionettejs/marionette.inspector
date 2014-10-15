define([
  'backbone',
  'underscore',
  'backboneAgentClient',
  'inspectedPageClient'
  ], function(Backbone, _, backboneAgentClient, inspectedPageClient) {

  return Backbone.Model.extend({

    initialize: function() {
      this.backboneAgentClient = backboneAgentClient;
      this.inspectedPageClient = inspectedPageClient;

      // this.listenTo(this.inspectedPageClient, '*', this.onEvent)
      //
      var interval = window.setInterval(_.bind(this.fetch, this), 500);
      this.once('change:regionTree', function() {
        window.clearInterval(interval);
      })
    },
    //
    // onEvent: function() {
    //   console.log('event', arguments);
    // },

    fetch: function() {
      this.getRegionTree();
    },


    viewList: function() {
      return this.buildViewList(this.get('regionTree'));
    },

    getRegionTree: function() {
      this.backboneAgentClient.exec(function() {
        if (!this.appObserver) {
          return;
        }

        return this.appObserver.getRegionTree()
      }).then(_.bind(function(ret) {
        this.set('regionTree', ret);
      }, this));
    },

    buildViewList: function(regionTree, subPath) {

      var viewData = {};
      regionTree = regionTree || {};

      if (_.has(regionTree, '_view')) {
        viewData = _.extend(regionTree._view, {
          path: subPath
        });
      }

      subPath = subPath || '';

      var subTreeData = _.flatten(_.map(_.omit(regionTree, ['_view', '_region']), function(subTree, regionName) {
        return this.buildViewList(subTree, subPath+"."+regionName);
      }, this),1);

      return subTreeData.concat(viewData);
    }
  });
});
