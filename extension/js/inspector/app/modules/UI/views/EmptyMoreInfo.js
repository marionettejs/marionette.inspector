define([
  'marionette',
  'backbone',
  'text!templates/devTools/ui/emptyMoreInfo.html',
  'util/Radio',
  'logger'
], function(Marionette, Backbone, tpl, Radio, logger) {

  return Marionette.ItemView.extend({

    template: tpl,

    className: 'sidebar-panel',

    initialize: function(options) {
      this.model = new Backbone.Model({name: options.name, path: options.path})
    }

  });
});

