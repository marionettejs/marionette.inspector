define([
  'marionette',
  "text!templates/devTools/data/layout.html"
], function(Marionette, tpl) {

  return Marionette.LayoutView.extend({

    template: tpl,

    regions: {
    },

    onShow: function() {
    }
  });
});
