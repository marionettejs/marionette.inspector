define([
  'backbone',
  'underscore',
  'client'
  ], function(Backbone, _, client) {

  return Backbone.Model.extend({

    initialize: function() {
      this.client = client;
      this.on('change:regionTree', this.resetViewTree);
    },

    fetch: function() {
      this.getRegionTree();
    },

    getRegionTree: function() {
      this.client.appObserverCall('getRegionTree');
    },

    viewTree: function() {
      if (this._viewTree) {
        return this._viewTree;
      }

      this._viewTree = this._buildViewTree(this.get('regionTree'));
      return this._viewTree;
    },

    resetViewTree: function() {
      this._viewTree = null;
    },

    findViewTreeNodeByCid: function(cid) {
      var tree = this.viewTree();
      return this._findNode(cid, tree);
    },

    _findNode: function(cid, tree) {
      if (tree.cid == cid) {
        return tree
      }

      if (!tree.nodes) {
        return null;
      }

      for (var i = 0; i < tree.nodes.length; i++) {
        var node = this._findNode(cid, tree.nodes[i]);
        if (node) {
          return node;
        }
      }

      return null;
    },

    _buildViewTree: function(regionTree, subPath, idPath) {
      var cid, viewData = {};
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
          cid = regionTree._view.cid;
          viewData.hasView = true;
        } else if (_.has(regionTree, '_region')) {
          cid = regionTree._region;
        }
        if (cid) {
          viewData.cid = cid;
          viewData.idPath = idPath.concat(cid);
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
