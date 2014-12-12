/**
 * takes an object and a value and returns the key that stores the value
 *
 */

var listenOnceFunc = function () {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    }

function findKey (obj, value) {

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
  var keys = _.union(_.keys(obj), _.keys(obj.constructor.prototype));
  _.each(keys, function(key) {
    if (obj[key] == value) {
       theKey = key
    }
  }, obj, value)
  return theKey;
}