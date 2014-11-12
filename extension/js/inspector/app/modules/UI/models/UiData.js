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

    viewTree: function(regionTree, subPath) {
      var tree = this._buildViewTree(this.get('regionTree'));

      // remove empty objects and regions (kinda a hack)
      // tree = _.filter(tree, function(item) {return _.has(item, 'path')})
      // tree.shift();
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
    },

    buildViewList: function(regionTree, subPath) {
      var list = this._buildViewList(regionTree);

      // remove empty objects and regions (kinda a hack)
      // list = _.filter(list, function(item) {return _.has(item, 'path')})
      list.shift();
      return list;
    },

    _buildViewList: function(regionTree, subPath) {
      var viewData = {};
      regionTree = regionTree || {};

      viewData.path = subPath || '';

      if (_.has(regionTree, '_view')) {
        viewData = _.extend(viewData, regionTree._view);
      }

      subPath = subPath || null;

      var subTreeData = _.flatten(_.map(_.omit(regionTree, ['_view', '_region']), function(subTree, regionName) {
        var path = !!subPath ? subPath+"."+regionName : regionName;
        return this._buildViewList(subTree, path);
      }, this),1);

      return [viewData].concat(subTreeData);// .concat(viewData);
    }
  });
});
