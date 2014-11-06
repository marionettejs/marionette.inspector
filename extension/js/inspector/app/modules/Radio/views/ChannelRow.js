define([
  'marionette',
  'text!templates/devTools/radio/row.html',
  'util/Radio',
], function(Marionette, tpl, Radio) {
  return Marionette.ItemView.extend({
    template: tpl,

    tagName: 'tr',

    className: 'channel-row',

    ui: {
      moreInfoLink: "[data-action='info']",
    },

    events: {
      "click @ui.moreInfoLink": "onClickInfo",
      "mouseover": 'onMouseOver',
      "mouseleave": 'onMouseLeave'
    },

    onClickInfo: function() {
      this.highlightRow();

      if (!this.model.has('channelName')) {
        return;
      }

      Radio.command('radio', 'show:info', this.model);
    },

    onMouseOver: function() {
      this.highlightRow();
    },

    onMouseLeave: function() {
      this.unhighlightRow();
    },

    highlightRow: function() {
      this.$el.addClass('bg-info');
    },

    unhighlightRow: function() {
      this.$el.removeClass('bg-info');
    },

    serializeData: function() {
      var data = {};
      _.extend(data, this.serializeModel(this.model));
      return data;
    }
  });
})