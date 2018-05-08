define([
  'marionette',
  'util/Radio',
], function(Marionette, Radio) {
  return Marionette.View.extend({
    template: 'data/row.html',

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

      Radio.request('data', 'show:info', {
        type: 'model',
        instance: this.model
      });
    },

    onClickLog: function() {
      Radio.request('data', 'log', {
        cid: this.model.get('cid')
      });
    },

    highlightRow: function() {
      Radio.request('data', 'unhighlight-rows');
      this.$el.addClass('bg-info');
    },

    unhighlightRow: function() {
      this.$el.removeClass('bg-info');
    },

    templateContext: function() {
      return {
        title_summary: _.keys(this.model.get('attributes').value).slice(0,2).join(", ") + " ..."
      };
    }
  });
})