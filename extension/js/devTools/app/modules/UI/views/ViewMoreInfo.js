define([
  'marionette',
  "text!templates/devTools/ui/moreInfo.html"
], function(Marionette, tpl) {

  return Marionette.ItemView.extend({
    template: tpl,
    serializeData: function() {
      var data = this.serializeModel(this.model);
      return data;
    }
  })
});
