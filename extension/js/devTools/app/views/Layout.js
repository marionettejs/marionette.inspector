define(['marionette', "text!templates/devTools/appLayout.html"], function(Marionette, tpl) {

  return Marionette.LayoutView.extend({

    template: tpl,

    regions: {
      tool: '[data-region="tool"]'
    },

    onShow: function() {
    }
  });
});
