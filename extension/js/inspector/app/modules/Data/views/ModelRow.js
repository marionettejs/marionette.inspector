define([
  'marionette',
  'text!templates/devTools/data/row.html',
  'util/Radio',
], function(Marionette, tpl, Radio) {
  return Marionette.ItemView.extend({
    template: tpl,

    tagName: 'tr',

    className: 'model-row',

    ui: {
      moreInfoLink: "[data-action='info']",
      log: "[data-action='log']",
    },

    events: {
      "click @ui.moreInfoLink": "onClickInfo",
      "click @ui.log": 'onClickLog'
    },

    modelEvents: {
      'change': 'render',
      'highlight': 'highlightRow',
      'unhighlight': 'unhighlightRow'
    },

    onClickInfo: function() {
      this.highlightRow();

      if (!this.model.has('cid')) {
        return;
      }

      Radio.command('data', 'show:info', {
        type: 'model',
        instance: this.model
      });
    },

    onClickLog: function() {
      Radio.command('data', 'log', {
        cid: this.model.get('cid')
      });
    },

    highlightRow: function() {
      Radio.command('data', 'unhighlight-rows');
      this.$el.addClass('bg-info');
    },

    unhighlightRow: function() {
      this.$el.removeClass('bg-info');
    },

    serializeData: function() {
      var data = {};
      _.extend(data, this.serializeModel(this.model));
      data.title_summary = _.keys(data.attributes.value).slice(0,2).join(", ") + " ..."
      return data;
    }
  });
})