define([
  'marionette',
  'util/Radio',
  "text!templates/devTools/ui/loading.html",
], function(Marionette, Radio, tpl) {

  return Marionette.ItemView.extend({
    template: tpl,
  });
});