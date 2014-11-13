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
      startButton: '[data-action="start"]',
      tools: '[data-tool]'
    },

    events: {
      'click .nav a': 'onToolClick',
      'click @ui.startButton': 'onStartClick'
    },

    modelEvents: {
      'change:tool': 'onToolChange'
    },

    initialize: function() {
      this.client = client;
    },

    onRender: function() {
      logger.log('app', 'rendering app layout', this.serializeData());
    },

    onStartClick: function() {
      logger.log('app', 'agent start button clicked');

      if (this.model.get('isWaiting') || this.model.get('isInjecting')) {
        logger.log('app', 'start clicked multiple times')
        return;
      }

      this.model.set('hasStarted', true);
      this.client.start();
      this.model.set('isInjecting', true);
    },

    onToolChange: function(model, tool) {
      this.ui.tools.removeClass('active');
      var tool = this.$el.find('[data-tool="'+tool+'"]');
      tool.addClass('active');
    },

    onToolClick: function(e) {
      var $currentTarget = $(e.currentTarget);

      if (!this.model.get('isAgentActive')) {
        logger.log('app', 'cannot select tool when the agent is not active', e);
        return;
      }

      Radio.command('app', 'navigate', $currentTarget.data('route'));
    },

    serializeData: function() {
      var data = this.serializeModel(this.model);
      data.active_tool = currentValue(this.tools, this.model.get('tool'));
      return data;
    }
  });
});
