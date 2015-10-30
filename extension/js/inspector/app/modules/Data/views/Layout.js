define([
  'backbone',
  'marionette',
  "text!templates/devTools/data/layout.html",
  "util/Radio",
  'app/modules/Data/views/ModelList',
  'app/modules/Data/views/ClassModelList',
  'app/modules/Data/views/ModelInfo',
  'app/modules/Data/views/CollectionInfo',
  'app/modules/Data/views/CollectionList',
  'util/presenters/currentValue'
], function(
    Backbone, Marionette, tpl, Radio, ModelList, ClassModelList, ModelInfo,
    CollectionInfo, CollectionList, currentValue) {

  return Marionette.LayoutView.extend({

    template: tpl,

    regions: {
      list: '[data-region="list"]',
      info: '[data-region="info"]',
    },

    attributes: {
      view: 'data-layout'
    },

    className: 'app-tool',

    ui: {
      nav: '[data-nav]'
    },

    events: {
      'click @ui.nav': 'onNavClick'
    },

    dataCommands: {
      'show:info': 'showInfo',
      'show:classCollectionModels': 'showClassCollectionModels'
    },

    viewModelEvents: {
      'change:active': 'render'
    },

    initialize: function(options) {
      this.viewModel = new Backbone.Model({
        active: 'model' // @TODO: change active key to "mode" because mode better implies 'model' or 'collection'.
      });

      Radio.connectCommands('data', this.dataCommands, this);
      this.bindEntityEvents(this.viewModel, this.viewModelEvents);
    },

    onNavClick: function(e) {
      var $current = $(e.currentTarget);
      this.viewModel.set('active', $current.data('nav'));
      return false
    },

    onRender: function() {
      var list;

      if (this.viewModel.get('active') === 'model') {
        list = new ModelList({
          collection: this.options.classCollection
        })
      } else {
        list = new CollectionList({
          collection: this.options.collectionCollection
        })
      }

      this.getRegion('list').show(list);
    },

    showInfo: function(data) {
      if (!data.instance) {
        return;
      }

      data.instance.trigger('highlight');
      if (data.type == 'model') {
        this.getRegion('info').show(new ModelInfo({
          model: data.instance
        }));
      } else {
        this.getRegion('info').show(new CollectionInfo({
          model: data.instance
        }));
      }
    },

    showClassCollectionModels: function(opt) {
      var filteredList = this.options.modelCollection.filter(function(model) {
        return model.get('classId') === opt.classId
      });

      var list = new ClassModelList({
        collection: new Backbone.Collection(filteredList)
      });

      this.getRegion('list').show(list);
    },

    serializeData: function() {
      var data = {};
      data.active_nav = currentValue(
        ['model', 'collection'],
        this.viewModel.get('active')
      );
      return data;
    }

  });
});
