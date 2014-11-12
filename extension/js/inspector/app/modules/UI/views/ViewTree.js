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
      "mouseleave @ui.view": 'onMouseLeave'
    },

    /**
     * the search:x events are triggered in the UI module
     * when `onSearch` handles a search event coming from the appObserver.
     */
    viewModelEvents: {
      'search:mouseover': 'onSearchMouseOver',
      'search:mouseleave': 'onSearchMouseLeave',
      'search:mousedown': 'onSearchMouseDown',
    },

    template: tpl,

    initialize: function(options) {
      this.viewModel = options.viewCollection.findView(this.model.get('cid'));
      if (this.viewModel) {
        this.bindEntityEvents(this.viewModel, this.viewModelEvents);
      }
    },

    childViewOptions: function() {
      return {
        viewCollection: this.options.viewCollection
      }
    },

    onClickMoreInfo: function() {
      if (this.model.has('cid')) {
        Radio.command('ui', 'show:more-info', {
          cid: this.model.get('cid'),
          path: this.model.get('path')
        });
      }

      return false;
    },

    onMouseOver: function() {
      Radio.command('ui', 'highlight-view', {
        viewPath: this.model.get('path'),
      });


      return false;
    },

    onMouseLeave: function() {
      Radio.command('ui', 'unhighlight-view', {
        viewPath: this.model.get('path'),
      });

      return false;
    },

    onClickLogViewLink: function() {
      Radio.command('ui', 'log', {
        viewPath: this.model.get('path'),
        message: 'view'
      });

      return false;
    },

    onSearchMouseOver: function() {
      this.highlightRow();
    },

    onSearchMouseLeave: function() {
      this.unhighlightRow()
    },

    onSearchMouseDown: function() {
      this.highlightRow();
    },

    highlightRow: function() {
      this.$el.addClass('bg-info');
    },

    unhighlightRow: function() {
      this.$el.removeClass('bg-info');
    },

  });
})