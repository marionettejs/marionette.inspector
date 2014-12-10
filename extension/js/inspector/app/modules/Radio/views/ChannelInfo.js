define([
  'marionette',
  'util/Radio',
  "text!templates/devTools/radio/info.html",
  'app/behaviors/SidebarPanes',
  'util/clientInspect'
], function(Marionette, Radio, tpl, SidebarPanesBehavior, clientInspect) {

  return Marionette.ItemView.extend({

    template: tpl,

    behaviors: {
      sidebarPanes: {
        behaviorClass: SidebarPanesBehavior,
      }
    },

    ui: {
      callback: '[data-property-value-callback]',
      context: '[data-property-value-context]'
    },

    events: {
      'click @ui.context': 'onClickContext',
      'click @ui.callback': 'onClickCallback'
    },

    onClickContext: function(e) {
      var $target = $(e.currentTarget);
      var $property = $target.closest('li');

      var type = $property.data('property-context-type');
      var cid = $property.data('property-context-cid');
      var key = $property.data('property-callback-key');

      this.navigateTo({
        type: type,
        cid: cid
      });
    },

    onClickCallback: function(e) {
      var $target = $(e.currentTarget);
      var $property = $target.closest('li');

      var type = $property.data('property-context-type');
      var cid = $property.data('property-context-cid');
      var key = $property.data('property-callback-key');

      function upperCase(str) {
        return str.charAt(0).toUpperCase() + str.substring(1)
      }

      type = upperCase(_.last(type.split('-')));

      clientInspect({
        type: type,
        cid: cid,
        path: key
      });
    },

    navigateTo: function(object) {
      if (object && object.type && object.cid) {
        Radio.command('app', 'navigate:knownObject', {
          object: object
        });
      }
    },

    serializeData: function() {
      var data = {};
      _.extend(data, this.serializeModel(this.model));
      return data;
    }
  });
})