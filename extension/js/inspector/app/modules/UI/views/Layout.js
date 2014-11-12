define([
  'marionette',
  'backbone',
  'text!templates/devTools/ui/layout.html',
  'util/Radio',
  'logger',
  'app/modules/UI/views/ViewMoreInfo',
  'app/modules/UI/models/TreeNode',
  'app/modules/UI/views/ViewTree',
], function(Marionette, Backbone, tpl, Radio, logger,
  ViewMoreInfo, TreeNode, ViewTree) {

  return Marionette.LayoutView.extend({

    template: tpl,

    attributes: {
      view: 'ui-layout'
    },

    className: 'row',

    regions: {
      viewList: '[data-region="view-list"]',
      viewMoreInfo: '[data-region="view-more-info"]'
    },

    modelEvents: {
      'change:regionTree': 'onRegionTreeUpdate'
    },

    uiCommands: {
      'show:more-info': 'showMoreInfo'
    },

    initialize: function(options) {
      Radio.connectCommands('ui', this.uiCommands, this);
    },

    onRender: function() {
      logger.log('ui', 'layout rendered');
      this.onRegionTreeUpdate();
    },

    onRegionTreeUpdate: function() {
      var tree = this.model.viewTree();

      // if the tree is empty and we now have data replace
      // the tree with a new tree
      if (!this.viewTree || !this.viewTree.nodes) {
        this.viewTree = new TreeNode(tree);

        this.getRegion('viewList').show(new ViewTree({
          model: this.viewTree,
          viewCollection: this.options.viewCollection
        }));
      } else {
        this.viewTree.updateNodes(tree.nodes);
      }
    },

    showMoreInfo: function(data) {
      var viewModel = this.options.viewCollection.findView(data.cid)

      if (!viewModel) {
        return;
      }

      this.getRegion('viewMoreInfo').show(new ViewMoreInfo({
        model: viewModel,
        path: data.path
      }));
    }
  });
});
