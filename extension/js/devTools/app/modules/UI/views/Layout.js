define(['marionette', "text!templates/devTools/ui/layout.html"], function(Marionette, tpl) {


  var buildViewList = function(regionTree, subPath) {

    var viewData = {};

    if (_.has(regionTree, '_view')) {
      viewData = {
        view: regionTree._view,
        path: subPath
      }
    }

    subPath = subPath || '';

    var subTreeData = _.flatten(_.map(_.omit(regionTree, ['_view', '_region']), function(subTree, regionName) {
      return buildViewList(subTree, subPath+"."+regionName);
    }),1);

    return subTreeData.concat(viewData);
  }

  return Marionette.LayoutView.extend({

    template: tpl,

    regions: {
    },

    modelEvents: {
      'change': 'render'
    },

    onShow: function() {
    },

    presentViews: function() {
      var regionTree = this.model.get('regionTree') || {};
      return buildViewList(regionTree);
    },

    serializeData: function() {
      var data = {};

      data.views = this.presentViews();
      return data;
    }
  });
});
