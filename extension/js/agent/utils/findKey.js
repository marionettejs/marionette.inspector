/**
 * takes an object and a value and returns the key that stores the value
 *
 */

;(function(agent) {

var listenOnceFunc = function () {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    }

  agent.findKey = function (obj, value) {

    if (typeof obj == "string") {
      return obj;
    }

    if (!_.isObject(obj)) {
      return '';
    }

    if (listenOnceFunc.toString() == value.toString()) {
      value = value._callback;
    }

    var theKey = undefined;
    var info = agent.ancestorInfo(obj);

    _.each(info, function(_obj) {
      _.each(_obj.keys, function(key) {
        var path = _obj.path ? _obj.path +"."+key : key;
        if (agent.objectPath(obj, path) == value) {
           theKey = key
        }
      }, obj, value);
    }, info, obj, value);

    return theKey;
  }

}(this));

