define([
  'marionette',
  "text!templates/devTools/data/layout.html",
  "util/Radio",
  'app/modules/Data/views/ModelList',
  'app/modules/Data/views/ModelInfo',
], function(Marionette, tpl, Radio, ModelList, ModelInfo) {

  return Marionette.LayoutView.extend({

    template: tpl,

    regions: {
      modelList: '[data-region="model-list"]',
      modelInfo: '[data-region="model-info"]',
    },

    attributes: {
      view: 'data-layout'
    },

    className: "row",

    dataCommands: {
      'show:info': 'showInfo'
    },

    initialize: function(options) {
      Radio.connectCommands('data', this.dataCommands, this);
    },

    onRender: function() {
      this.getRegion('modelList').show(new ModelList({
        collection: this.options.modelCollection
      }))
    },

    showInfo: function(modelModel) {
      this.getRegion('modelInfo').show(new ModelInfo({
        model: modelModel
      }));
    }

  });
});
