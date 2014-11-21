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
  _.each(_.keys(obj), function(key) {
    if (obj[key] == value) {
       theKey = key
    }
  }, obj, value)
  return theKey;
}