define([
  'marionette',
  'util/Radio'
], function(Marionette, Radio) {

  return Marionette.Behavior.extend({
    ui: {
      property: '[data-property-name]',
      propertyContext: '[data-property-value-context]',
      propertyCallback: '[data-property-value-callback]'
    },

    events: {
      'click @ui.property': 'onClickProperty',
      'click @ui.propertyContext': 'onClickContext',
      'click @ui.propertyCallback': 'onClickCallback'
    },

    onClickContext: function(e) {
      e.stopPropagation();
      var property = this._indexedProperty($(e.currentTarget));
      var object = property.context;

      if (object && object.type && object.cid) {
        Radio.command('app', 'navigate:knownObject', {
          object: object
        })
      }
    },

    onClickCallback: function(e) {
      e.stopPropagation();
      var property = this._indexedProperty($(e.currentTarget));

      var object = property.callback;
      // if (object && object.type && object.cid) {
      //   Radio.command('app', 'navigate:knownObject', {
      //     object: object
      //   })
      // }
    },

    onClickProperty: function(e) {
      e.stopPropagation();

      var $target = $(e.currentTarget);
      var propertyKey = $target.data('property-key') || $target.closest('ol').data('property-key');
      var propertyName = $target.data('property-name');

      if (propertyKey) {
        var property = this.view.model.get(propertyKey);
        if (!property) {
          return
        }

        var object = property[propertyName]
      } else {

        // this is the case where we're looking directly on the instance
        // in the properties.
        var properties = this.view.model.get('properties');
        var object = properties[propertyName];
      }


      if (object && object.type && object.cid) {
        Radio.command('app', 'navigate:knownObject', {
          object: object
        })
      }
    },

    _indexedProperty: function($target) {
      var propertyKey = $target.data('property-key') || $target.closest('ol').data('property-key');
      var propertyIndex = $target.closest('li').data('property-index');


      var properties = this.view.model.get(propertyKey);
      if (!properties) {
        return
      }

      var property = properties[propertyIndex]
      if (!property) {
        return
      }

      return property;
    }

  });

});