/**
 * takes an object and a value and returns the key that stores the value
 *
 */

function findKey (obj, value) {

  if (!obj) {
    return '';
  }

  if (typeof obj == "string") {
    return obj;
  }

  var theKey = undefined;
  _.each(_.keys(obj), function(key) {
    if (obj[key] == value) {
       theKey = key
    }
  }, obj, value)
  return theKey;
}