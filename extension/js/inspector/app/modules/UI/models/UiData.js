define([
  'backbone',
  'underscore',
  'client'
  ], function(Backbone, _, client) {

  return Backbone.Model.extend({

    initialize: function() {
      this.client = client;
    },

    fetch: function() {
      this.getRegionTree();
    },

    viewList: function() {
      return this.buildViewList(this.get('regionTree'));
    },

    getRegionTree: function() {
      this.client
        .appObserverCall('regionTree')
        .then(_.bind(this.set, this, 'regionTree'));
    },

    viewTree: function() {
      var tree = this._buildViewTree(this.get('regionTree'));
      return tree;
    },

    _buildViewTree: function(regionTree, subPath) {
      var viewData = {};
      subPath = subPath || '';
      regionTree = regionTree || {};

      if (subPath == '') {
        viewData = {
          cid: -1,
          name: 'app',
          path: 'app'
        }
      } else {
        viewData.path = subPath;
        viewData.name = _.last(subPath.split('.'));
      }

      if (_.has(regionTree, '_view')) {
        viewData.cid = regionTree._view.cid;
      }

      var nodes = _.map(_.omit(regionTree, ['_view', '_region']), function(subTree, regionName) {
        var path = !!subPath ? subPath+"."+regionName : regionName;
        return this._buildViewTree(subTree, path);
      }, this);

      if (!_.isEmpty(nodes)) {
        viewData.nodes = nodes;
      }

      return viewData;
    }
  });
});
