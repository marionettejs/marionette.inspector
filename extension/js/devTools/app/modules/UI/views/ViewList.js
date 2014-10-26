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
        searchOn: false
      });
    },

    /*
     * clicking on the search button will turn search on and off
     * in the browser. We keep the `searchOn` field
     */
    onClickSearch: function(e) {
      var $current = $(e.currentTarget);

      this.ui.searchBtn.toggleClass('toggled-on');
      this.viewModel.set('searchOn', !this.viewModel.get('searchOn'));

      if (this.viewModel.get('searchOn')) {
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
