define([
  'marionette',
  'util/Radio',
  "text!templates/devTools/data/info.html",
  'app/behaviors/SidebarPanes',
  'app/behaviors/ClickableProperties',
  'util/presenters/presentListeners'
], function(Marionette, Radio, tpl, SidebarPanesBehavior, ClickableProperties, presentListeners) {

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

    serializeData: function() {
      var infoItems = ['cid', 'id', '_pending', '_changing', '_listenerId', 'collection'];

      var data = {};
      _.extend(data, this.serializeModel(this.model));

      data.listeners = presentListeners(data._events);
      data.info = _.pick(data.properties, infoItems);
      data.properties = _.omit(data.properties, infoItems,
        'changed', '_previousAttributes', 'attributes', '_events');

      return data;
    }
  });
})