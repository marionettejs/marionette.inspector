/**
 * takes an object and a value and returns the key that stores the value
 *
 */

function findKey (obj, value) {

  if (typeof obj == "string") {
    return obj;
  }

  if (!_.isObject(obj)) {
    return '';
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