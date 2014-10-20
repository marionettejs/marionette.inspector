define([
  'backbone',
  'underscore',
  'client'
  ], function(Backbone, _, Client) {

  return Backbone.Model.extend({

    initialize: function() {
      this.client = new Client();

      // var interval = window.setInterval(_.bind(this.fetch, this), 500);
      // this.once('change:regionTree', function() {
      //   window.clearInterval(interval);
      // })
    },

    fetch: function() {
      this.getRegionTree();
    },


    viewList: function() {
      return this.buildViewList(this.get('regionTree'));
    },

    getRegionTree: function() {
      this.client
        .fetchAppData('regionTree')
        .then(_.bind(this.set, this, 'regionTree'));
    },

    buildViewList: function(regionTree, subPath) {
      var list = this._buildViewList(regionTree);
      list = _.filter(list, function(item) {return _.has(item, 'path')})
      return list;
    },

    _buildViewList: function(regionTree, subPath) {
      var viewData = {};
      regionTree = regionTree || {};

      if (_.has(regionTree, '_view')) {
        viewData = _.extend(regionTree._view, {
          path: subPath
        });
      }

      subPath = subPath || null;

      var subTreeData = _.flatten(_.map(_.omit(regionTree, ['_view', '_region']), function(subTree, regionName) {
        var path = !!subPath ? subPath+"."+regionName : regionName;
        return this._buildViewList(subTree, path);
      }, this),1);

      return subTreeData.concat(viewData);
    }
  });
});
