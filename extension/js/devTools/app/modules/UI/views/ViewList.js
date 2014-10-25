define([
  'marionette',
  'backbone',
  'jquery',
  'util/Radio',
  "text!templates/devTools/ui/list.html",
  'app/modules/UI/views/ViewRow'
], function(Marionette, Backbone, $, Radio, tpl, ViewRow) {

  return Marionette.CompositeView.extend({
    template: tpl,

    className: 'row',

    childViewContainer: '[data-child-view-container]',

    attributes: {
      view: 'list'
    },

    ui: {
      searchBtn: '[data-action="search"]'
    },

    events: {
      'click @ui.searchBtn': 'onClickSearch'
    },

    childView: ViewRow,

    initialize: function() {
      this.viewModel = new Backbone.Model({
        isSearchActive: false
      });
    },

    onClickSearch: function(e) {
      var $current = $(e.currentTarget);
      $current.toggleClass('is-active');

      this.ui.searchBtn.toggleClass('toggled-on');

      this.viewModel.set('isSearchActive', !this.viewModel.get('isSearchActive'));

      if (this.viewModel.get('isSearchActive')) {
        Radio.command('ui', 'search:start');
      } else {
        Radio.command('ui', 'search:stop');
      }

    },

    onDomRefresh: function() {
      $('.tree').treegrid({
        expanderExpandedClass: 'glyphicon glyphicon-chevron-down',
        expanderCollapsedClass: 'glyphicon glyphicon-chevron-up'
      });
    }
  });
})
