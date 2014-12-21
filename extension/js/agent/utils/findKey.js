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

    var info = Agent.ancestorInfo(obj);

    var theKey, path;

    _.find(info, function(_obj) {
      return _.find(_obj.keys, function(key) {
        path = _obj.path ? _obj.path + '.' + key : key;
        if(Agent.objectPath(obj, path) === value){
          theKey = key;
          return true;
        }
      });
    });

    return theKey;
  }

}(this));
