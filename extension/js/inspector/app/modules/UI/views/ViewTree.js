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
        this.bindEvents(this.viewModel, this.viewModelEvents);
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

      if (!this.model.get('hasView')) {
        Radio.request('ui', 'empty:moreInfo', this.model.pick('name', 'path', 'cid'));
        Radio.request('app', 'navigate', 'data/emptyview');
        return;
      }

      Radio.request('app', 'navigate:knownObject', {
        type: 'View',
        cid: this.model.get('cid')
      });

      return false;
    },

    onMouseOver: function(e) {
      function randomColor() {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
      }

      // $(e.currentTarget).find('a').css('color', randomColor());
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
      Radio.request('ui', 'unhighlightRows');
    },

    logView: function() {
      Radio.request('ui', 'log', {
        viewPath: this.model.get('path'),
        message: 'view'
      });
    },

    showMoreInfo: function() {
      Radio.request('ui', 'show:more-info', {
        cid: this.model.get('cid'),
        path: this.model.get('path')
      });
    },

    unhighlightViewOnPage: function() {
      Radio.request('ui', 'unhighlight-element');
    },

    highlightViewOnPage: function() {
      Radio.request('ui', 'highlight-element', {
        cid: this.model.get('cid'),
        path: '$el'
      });
    },

    templateContext: function() {
      var data = Tree.prototype.templateContext.apply(this, arguments);
      Object.assign(data, {
        isRoot: this.model.get('name') === 'app',
        summary: (this.viewModel && this.viewModel.get('_className')) || this.model.get('name')
      });
      return data;
    }

  });
})
