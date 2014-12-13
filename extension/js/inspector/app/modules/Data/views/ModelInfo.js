define([
  'marionette',
  'util/Radio',
  "text!templates/devTools/data/info.html",
  'app/behaviors/SidebarPanes',
  'app/behaviors/ClickableProperties'
], function(Marionette, Radio, tpl, SidebarPanesBehavior, ClickableProperties) {

  return Marionette.ItemView.extend({

    template: tpl,

    behaviors: {
      sidebarPanes: {
        behaviorClass: SidebarPanesBehavior,
      },
      clickableProperties: {
        behaviorClass: ClickableProperties
      }
    },

    modelEvents: {
      'change': 'render'
    },

    className: 'sidebar-panel',

    presentListeners: function(listeners) {
      var data = [];

      _.each(listeners, function(listener) {
        var callback = listener.callback;

        // _events.show.0.callback
        var path = ["_events", listener.eventName, listener.eventIndex, "callback"].join(".");

        data.push({
          context: listeners.context,
          name: callback.key || callback.inspect,
          path: path,
          eventName: listener.eventName
        });
      });

      return data;
    },

    serializeData: function() {
      var infoItems = ['cid', 'id', '_pending', '_changing', '_listenerId', 'collection'];

      var data = {};
      _.extend(data, this.serializeModel(this.model));

      data.listeners = this.presentListeners(data._events);
      data.info = _.pick(data.properties, infoItems);
      data.properties = _.omit(data.properties, infoItems,
        'changed', '_previousAttributes', 'attributes', '_events');

      return data;
    }
  });
})