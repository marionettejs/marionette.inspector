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
      var instancePropertes = [
        'changed', '_previousAttributes', 'attributes',
        '_events', '_className', '_requirePath'
      ];

      var data = {};

      _.extend(data, this.serializeModel(this.model));

      data.ancestors = presentAncestors(data, infoItems, instancePropertes);
      data.listeners = presentListeners(data._events);
      data.info = _.pick(data.properties, infoItems);
      data.properties = _.omit(data.properties, infoItems, instancePropertes);

      return data;
    }
  });
})