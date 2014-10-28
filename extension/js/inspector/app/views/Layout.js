define([
  'marionette',
  "text!templates/devTools/appLayout.html",
  "util/Radio",
  "util/presenters/currentValue"
], function(Marionette, tpl, Radio, currentValue) {

  return Marionette.LayoutView.extend({

    template: tpl,

    attributes: {
      view: 'app-layout'
    },

    className: 'container-fluid row',

    regions: {
      tool: '[data-region="tool"]'
    },

    ui: {
      appHeader: '#app-header'
    },

    events: {
      'click .nav a': 'onAppClick'
    },

    modelEvents: {
      'change': 'render',
    },

    onAppClick: function(e) {
      var $currentTarget = $(e.currentTarget);
      Radio.command('app', 'navigate', $currentTarget.data('route'));
    },

    serializeData: function() {
      var data = this.serializeModel(this.model);
      data.active_tool = currentValue(['ui', 'radio'], this.model.get('tool'));

      return data;
    }
  });
});
