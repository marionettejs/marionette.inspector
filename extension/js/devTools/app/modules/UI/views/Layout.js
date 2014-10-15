define([
  'marionette',
  'backbone',
  'text!templates/devTools/ui/layout.html',
  'util/Radio',
  'app/modules/UI/views/ViewList',
  'app/modules/UI/views/ViewMoreInfo'
], function(Marionette, Backbone, tpl, Radio, ViewList, ViewMoreInfo) {

  return Marionette.LayoutView.extend({

    template: tpl,

    regions: {
      viewList: '[data-region="view-list"]',
      viewMoreInfo: '[data-region="view-more-info"]'
    },

    modelEvents: {
      'change': 'render'
    },

    uiCommands: {
      'show:more-info': 'showMoreInfo'
    },

    initialize: function(options) {
      Radio.connectCommands('ui', this.uiCommands, this);
    },

    onRender: function() {
      var views = new Backbone.Collection(this.model.viewList());

      this.getRegion('viewList').show(new ViewList({
        collection: views
      }))
    },

    showMoreInfo: function(viewModel) {
      this.getRegion('viewMoreInfo').show(new ViewMoreInfo({
        model: viewModel
      }));
    }
  });
});
