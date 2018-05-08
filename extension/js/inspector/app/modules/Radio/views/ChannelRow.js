define([
  'marionette',
  'util/Radio',
], function(Marionette, Radio) {
  return Marionette.View.extend({
    template: 'radio/row.html',

    tagName: 'tr',

    className: 'channel-row',

    ui: {
      moreInfoLink: "[data-action='info']",
    },

    events: {
      "click @ui.moreInfoLink": "onClickInfo"
    },

    onClickInfo: function() {
      this.highlightRow();

      if (!this.model.has('channelName')) {
        return;
      }

      Radio.request('radio', 'show:info', this.model);
    },


    highlightRow: function() {
      Radio.request('radio', 'unhighlight-rows');
      this.$el.addClass('bg-info');
    },

    unhighlightRow: function() {
      this.$el.removeClass('bg-info');
    }
  });
})