define([
  'marionette',
  'util/Radio',
  "text!templates/devTools/data/info.html",
], function(Marionette, Radio, tpl) {

  return Marionette.ItemView.extend({

    template: tpl,

    serializeData: function() {
      var data = {};
      _.extend(data, this.serializeModel(this.model));

      return data;
    }
  });
})