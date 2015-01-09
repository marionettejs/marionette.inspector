;(function(Agent) {

  var allPropertiesSet = function(newVal, properties) {
    // exists is separate than has, because not only
    // do we want the prop set, but it must be more than undefiened
    function exists(obj, prop) {
      return !_.isUndefined(obj[prop]);
    }

    return _.all(properties, _.partial(exists, newVal));
  };

  /**
    * Monitors for an object and its properties being defined.*
    *
    * For example, if we want to know when Backbone and Backbone.View,Model,.. are defined*
    * We could do  onObjectAndPropertiesSetted(window, 'Backbone', ['View', 'Model'], function(Backbone) {})
    *
    * And, when Backbone is fully defined, the callback will be invoked.*
    * We do this by watching first for Backbone being defined, then it's properties.
    */

  Agent.onObjectAndPropertiesSetted = function(parentObject, objectName, properties, callback) {
    function onObjectSet(prop, action, newVal, oldVal) {
      function onPropertySet(prop2, action2, newVal2, oldVal2) {//

        if (!allPropertiesSet(newVal, properties)) {
          return;
        }

        // clean up all of the defined property poop
        _.each(properties, function(_prop, key) {
          if (!_.has(newVal.watchers, _prop)) {
            return;
          }

          Agent.stopWatching(newVal, _prop, onPropertySet);
        });

        Agent.stopWatching(parentObject, objectName, onObjectSet);

        callback(newVal);
      }

      _.each(properties, function(prop) {
        watch(newVal, prop, onPropertySet, 0);
      }, this, parentObject, objectName, properties, newVal, callback);

      if (allPropertiesSet(newVal, properties)) {
        callback(newVal);
      }
    }

    watch(parentObject, objectName, onObjectSet, 0);

    var object = parentObject[objectName];
    if (object && allPropertiesSet(object, properties)) {
      callback(object);
    }

  };

}(this));
