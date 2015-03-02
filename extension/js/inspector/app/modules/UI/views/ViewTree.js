define([
  'app/components/tree/views/Tree',
  'util/Radio',
  "text!templates/devTools/ui/tree.html",
], function(Tree, Radio, tpl) {
  return Tree.extend({

    ui: {
      moreInfoLink: "[data-action='more-info']",
      logViewLink: "[data-action='log-view']",
      view: "> li"
    },

    events: {
      'click': 'onClickMoreInfo',
      "click @ui.moreInfoLink": "onClickMoreInfo",
      "click @ui.logViewLink": 'onClickLogViewLink',
      "mouseover @ui.view": 'onMouseOver',
      "mouseleave @ui.view": 'onMouseLeave',
      'highlight': 'highlightRow'
    },

    /**
     * the search:x events are triggered in the UI module
     * when `onSearch` handles a search event coming from the appObserver.
     */
    viewModelEvents: {
      'search:mouseover': 'onSearchMouseOver',
      'search:mouseleave': 'onSearchMouseLeave',
      'search:mousedown': 'onSearchMouseDown',
      'highlight': 'highlightRow'
    },

    attributes: function() {
      var data = {};
      data['data-view'] = 'tree-view';
      data['data-cid'] = this.model.get('cid');
      return data;
    },

    template: tpl,

    initialize: function(options) {
      this.viewModel = options.viewCollection.findView(this.model.get('cid'));

      if (this.viewModel) {
        this.bindEntityEvents(this.viewModel, this.viewModelEvents);
        this.viewModel.treeProperties = _.clone(this.model.attributes);
        this.viewModel.treeProperties.isAttached = true
      }

    },

    childViewOptions: function() {
      return {
        viewCollection: this.options.viewCollection
      }
    },

    onClickMoreInfo: function(e) {
      e.stopPropagation()

      if (!this.model.has('cid')) {
        this.unhighlightRow();
        Radio.command('ui', 'empty:moreInfo');
        return;
      }

      Radio.command('app', 'navigate:knownObject', {
        type: 'View',
        cid: this.model.get('cid')
      });

      return false;
    },

    onMouseOver: function() {
      this.highlightViewOnPage();
      return false;
    },

    onMouseLeave: function() {
      this.unhighlightViewOnPage();
      return false;
    },

    onClickLogViewLink: function() {
      this.logView();
      return false;
    },

    onSearchMouseOver: function() {},

    onSearchMouseLeave: function() {},

    onSearchMouseDown: function() {
      this.highlightRow();
      this.logView();
      this.showMoreInfo();
    },

    // commands

    highlightRow: function() {
      this.unhighlightRow();
      this.ui.view.addClass && this.ui.view.addClass('is-highlighted');

      return false;
    },

    unhighlightRow: function() {
      Radio.command('ui', 'unhighlightRows');
    },

    logView: function() {
      Radio.command('ui', 'log', {
        viewPath: this.model.get('path'),
        message: 'view'
      });
    },

    showMoreInfo: function() {
      Radio.command('ui', 'show:more-info', {
        cid: this.model.get('cid'),
        path: this.model.get('path')
      });
    },

    unhighlightViewOnPage: function() {
      Radio.command('ui', 'unhighlight-element');
    },

    highlightViewOnPage: function() {
      Radio.command('ui', 'highlight-element', {
        cid: this.model.get('cid'),
        path: '$el'
      });
    },

    serializeData: function() {
      var data = Tree.prototype.serializeData.apply(this, arguments);
      data.isRoot = this.model.get('name') === 'app';

      data.summary = (this.viewModel && this.viewModel.get('_className')) ||
       this.model.get('name');

      return data;
    }

  });
})