define([
  'marionette',
  'backbone',
  'util/Radio',
  'logger'
], function(Marionette, Backbone, Radio, logger) {

  return Marionette.View.extend({

    template: 'ui/emptyMoreInfo.html',

    className: 'sidebar-panel',

    initialize: function(options) {
      this.model = new Backbone.Model({name: options.name, path: options.path})
    }

  });
});

