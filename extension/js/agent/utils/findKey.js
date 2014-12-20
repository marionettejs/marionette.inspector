/**
 * takes an object and a value and returns the key that stores the value
 *
 */

;(function(Agent) {

  Agent.findKey = function (obj, value) {

    if (typeof obj == "string") {
      return obj;
    }

    if (!_.isObject(obj)) {
      return '';
    }

    value = Agent.unwrapListenToOnceWrapper(value);

    var theKey = undefined;
    var info = Agent.ancestorInfo(obj);

    _.each(info, function(_obj) {
      _.each(_obj.keys, function(key) {
        var path = _obj.path ? _obj.path +"."+key : key;
        if (Agent.objectPath(obj, path) == value) {
           theKey = key
        }
      }, obj, value);
    }, info, obj, value);

    return theKey;
  }

}(this));
