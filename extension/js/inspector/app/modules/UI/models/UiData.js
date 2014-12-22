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

    getRegionTree: function() {
      this.client.appObserverCall('getRegionTree');
    },

    viewTree: function() {
      var tree = this._buildViewTree(this.get('regionTree'));
      return tree;
    },

    _buildViewTree: function(regionTree, subPath, idPath) {
      var viewData = {};
      subPath = subPath || '';
      regionTree = regionTree || {};

      if (subPath == '') {
        viewData = {
          cid: -1,
          name: 'app',
          path: 'app',
          idPath: []
        }
      } else {
        viewData.path = subPath;
        viewData.name = _.last(subPath.split('.'));
        if (_.has(regionTree, '_view')) {
          viewData.cid = regionTree._view.cid;
          viewData.idPath = idPath.concat(regionTree._view.cid);
        }
      }

      var nodes = _.map(_.omit(regionTree, ['_view', '_region']), function(subTree, regionName) {
        var path = !!subPath ? subPath+"."+regionName : regionName;
        return this._buildViewTree(subTree, path, viewData.idPath);
      }, this);

      if (!_.isEmpty(nodes)) {
        viewData.nodes = nodes;
      }

      return viewData;
    }
  });
});
