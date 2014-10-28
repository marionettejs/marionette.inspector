define([
  'marionette',
  'backbone',
  'text!templates/devTools/ui/layout.html',
  'util/Radio',
  'logger',
  'app/modules/UI/views/ViewList',
  'app/modules/UI/views/ViewMoreInfo'
], function(Marionette, Backbone, tpl, Radio, logger, ViewList, ViewMoreInfo) {

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
      'change': 'render'
    },

    uiCommands: {
      'show:more-info': 'showMoreInfo'
    },

    initialize: function(options) {
      Radio.connectCommands('ui', this.uiCommands, this);
    },

    onRender: function() {
      logger.log('ui', 'layout rendered');
      var list = this.model.viewList();
      var views = this.collection.reset(list);

      this.getRegion('viewList').show(new ViewList({
        collection: views,
        viewModel: this.options.moduleData
      }));
    },

    showMoreInfo: function(viewModel) {
      this.getRegion('viewMoreInfo').show(new ViewMoreInfo({
        model: viewModel
      }));
    }
  });
});
