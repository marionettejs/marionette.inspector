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

    className: 'app-layout',

    regions: {
      tool: '[data-region="tool"]'
    },

    ui: {
      appHeader: '#app-header',
      startButton: '[data-action="start"]',
      tools: '[data-tool]',
      searchBtn: '[data-action="search"]'
    },

    events: {
      'click .nav a': 'onToolClick',
      'click @ui.startButton': 'onStartClick',
      'click @ui.searchBtn': 'onClickSearch'
    },

    modelEvents: {
      'change:tool': 'onToolChange',
      'change:searchOn': 'onSearchUpdate'
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
        logger.log('app', 'start clicked multiple times', this.model.attributes)
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


    /*
     * clicking on the search button will turn search on and off
     * in the browser. We keep the `searchOn` field
     */
    onClickSearch: function(e) {
      var $current = $(e.currentTarget);

      if (!this.model.get('isAgentActive')) {
        logger.log('app', 'cannot select tool when the agent is not active', e);
        return;
      }

      this.model.set('searchOn', !this.model.get('searchOn'));

      if (this.model.get('searchOn')) {
        Radio.command('ui', 'search:start');
      } else {
        Radio.command('ui', 'search:stop');
      }

    },

    onSearchUpdate: function(model, state) {
      this.ui.searchBtn.toggleClass('toggled-on', state);
    },

    serializeData: function() {
      var data = this.serializeModel(this.model);
      data.active_tool = currentValue(this.tools, this.model.get('tool'));
      return data;
    }
  });
});
