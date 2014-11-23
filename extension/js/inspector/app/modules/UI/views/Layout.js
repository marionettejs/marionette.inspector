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

    className: 'app-tool',

    regions: {
      viewTree: '[data-region="view-tree"]',
      viewMoreInfo: '[data-region="view-more-info"]'
    },

    modelEvents: {
      'change:regionTree': 'onRegionTreeUpdate'
    },

    uiCommands: {
      'show:more-info': 'showMoreInfo',
      'unhighlightRows': 'unhighlightRows',
      'highlightRow': 'highlightRow'
    },

    initialize: function(options) {
      Radio.connectCommands('ui', this.uiCommands, this);
      this.viewCollection = options.viewCollection;
    },

    onRender: function() {
      logger.log('ui', 'layout rendered');
      this.onRegionTreeUpdate();
    },

    onRegionTreeUpdate: function() {
      var tree = this.model.viewTree();

      // if the tree is empty and we now have data replace
      // the tree with a new tree
      if (!this.viewTreeModel || !this.viewTreeModel.nodes) {
        this.viewTreeModel = new TreeNode(tree);

        this.getRegion('viewTree').show(new ViewTree({
          model: this.viewTreeModel,
          viewCollection: this.options.viewCollection
        }));
      } else {
        this.viewTreeModel.updateNodes(tree.nodes);
      }
    },

    showMoreInfo: function(data) {
      var viewModel = this.options.viewCollection.findView(data.cid)

      if (!viewModel) {
        return;
      }

      this.highlightRow(data);
      this.getRegion('viewMoreInfo').show(new ViewMoreInfo({
        model: viewModel,
        path: data.path
      }));
    },

    unhighlightRows: function() {
      this.getRegion('viewTree')
        .$el
        .find('.is-highlighted')
        .removeClass('is-highlighted');
    },

    highlightRow: function(data) {
      var viewModel = this.viewCollection.findView(data.cid);
      if (!viewModel || !viewModel.treeProperties.path) {
        return;
      }

      this.viewTreeModel.expandPath(viewModel.treeProperties.idPath);
      viewModel.trigger('highlight');
      this.scrollToRow(data.cid);
    },

    scrollToRow: function(cid) {
      $row = this.$el.find("[data-cid='" + cid + "']");
      $list = this.getRegion('viewTree').$el;

      isOffScreen =
        $row.offset().top < $list.offset().top ||
        $row.offset().top > $list.offset().top + $list.height();

      if (isOffScreen) {
        $list.animate({
            scrollTop: $list.scrollTop() + $row.offset().top - 2*$row.height()
        }, 100);
      }
    }
  });
});
