define([
  'marionette',
  "text!templates/devTools/appLayout.html",
  "util/Radio",
  "client",
  "logger",
  "util/presenters/currentValue"
], function(Marionette, tpl, Radio, client, logger, currentValue) {

  return Marionette.LayoutView.extend({

    template: tpl,

    tools: ['ui', 'radio', 'data', 'activity'],

    attributes: {
      view: 'app-layout'
    },

    className: 'container-fluid row',

    regions: {
      tool: '[data-region="tool"]'
    },

    ui: {
      appHeader: '#app-header',
      startButton: '[data-action="start"]'
    },

    events: {
      'click .nav a': 'onAppClick',
      'click @ui.startButton': 'onStartClick'
    },

    modelEvents: {
      'change': 'render',
    },

    initialize: function() {
      this.client = client;
    },

    onRender: function() {
      logger.log('app', 'rendering app layout', this.serializeData());
    },

    onStartClick: function() {
      logger.log('app', 'agent start button clicked');
      this.model.set('hasStarted', true);
      this.client.start();
      this.model.set('isInjecting', true);
    },

    onAppClick: function(e) {
      var $currentTarget = $(e.currentTarget);
      Radio.command('app', 'navigate', $currentTarget.data('route'));
    },

    serializeData: function() {
      var data = this.serializeModel(this.model);
      data.active_tool = currentValue(this.tools, this.model.get('tool'));
      return data;
    }
  });
});
