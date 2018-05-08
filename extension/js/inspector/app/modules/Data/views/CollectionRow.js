define([
  'marionette',
  'util/Radio',
], function(Marionette, Radio) {
  return Marionette.View.extend({
    template: 'data/collection-row.html',

    tagName: 'tr',

    className: 'collection-row',

    ui: {
      moreInfoLink: "[data-action='info']",
    },

    events: {
      "click @ui.moreInfoLink": "onClickInfo"
    },

    onClickInfo: function() {
      this.highlightRow();

      if (!this.model.has('cid')) {
        return;
      }

      Radio.request('data', 'show:info', {
        type: 'collection',
        instance: this.model
      });
    },

    highlightRow: function() {
      Radio.request('data', 'unhighlight-rows');
      this.$el.addClass('bg-info');
    },

    unhighlightRow: function() {
      this.$el.removeClass('bg-info');
    }
  });
})