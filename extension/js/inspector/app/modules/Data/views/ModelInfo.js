define([
  'marionette',
  'util/Radio',
  "text!templates/devTools/data/info.html",
  'app/behaviors/SidebarPanes',
  'app/behaviors/ClickableProperties',
  'util/presenters/presentListeners',
  'util/presenters/presentAncestors'
], function(
    Marionette, Radio, tpl,
    SidebarPanesBehavior, ClickableProperties,
    presentListeners, presentAncestors) {

  return Marionette.View.extend({

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

    templateContext: function() {
      var infoItems = ['cid', 'id', '_pending', '_changing', '_listenerId', 'collection'];
      var instancePropertes = [
        'changed', '_previousAttributes', 'attributes',
        '_events', '_className', '_requirePath'
      ];

      return {
        ancestors: presentAncestors(data, infoItems, instancePropertes),
        listeners: presentListeners(data._events),
        info: _.pick(data.properties, infoItems),
        properties: _.omit(data.properties, infoItems, instancePropertes)
      };
    }
  });
})