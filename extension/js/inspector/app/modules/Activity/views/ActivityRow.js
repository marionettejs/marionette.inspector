define([
  'marionette',
  'text!templates/devTools/activity/row.html',
  'util/Radio',
], function(Marionette, tpl, Radio) {
  return Marionette.ItemView.extend({
    template: tpl,

    tagName: 'tr',

    className: 'activity-row',

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

      // if (!this.model.has('cid')) {
      //   return;
      // }

      Radio.command('data', 'show:info', this.model);
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
      data.depth_class = "depth-" + this.model.get('depth');
      data.index = this.model.collection.indexOf(this.model);
      data.elapsed = this.model.get('end') - this.model.get('start');
      return data;
    }
  });
});
