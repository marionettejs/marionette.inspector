/**
  * Monitors for an object and its properties being defined.*
  *
  * For example, if we want to know when Backbone and Backbone.View,Model,.. are defined*
  * We could do  onObjectAndPropertiesSetted(window, 'Backbone', ['View', 'Model'], function(Backbone) {})
  *
  * And, when Backbone is fully defined, the callback will be invoked.*
  * We do this by watching first for Backbone being defined, then it's properties.
  */

var onObjectAndPropertiesSetted = function(parentObject, objectName, properties, callback) {
  function onObjectSet(prop, action, newVal, oldVal) {
    function onPropertySet(prop2, action2, newVal2, oldVal2) {//

      // exists is separate than has, because not only
      // do we want the prop set, but it must be more than undefiened
      function exists(obj, prop) {
        return !_.isUndefined(obj[prop])
      }

      var allPropertiesSet = _.all(properties, _.partial(exists, newVal));
      if (!allPropertiesSet) {
        return;
      }

      // clean up all of the defined property poop
      _.each(properties, function(_prop, key) {//
        stopWatching(newVal, _prop, onPropertySet);
      });

      stopWatching(parentObject, objectName, onObjectSet);

      callback(newVal)
    }

    _.each(properties, function(prop) {
      watch(newVal, prop, onPropertySet, 0);
    }, this, parentObject, objectName, properties, newVal, callback);
  }

  watch(parentObject, objectName, onObjectSet, 0);
}
