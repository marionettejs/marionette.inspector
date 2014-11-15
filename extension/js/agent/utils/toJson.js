var toJSON = function(obj) {
  try {
    return JSON.parse(JSON.stringify(obj));
  }
  catch (e) {
    debug.log('failed parsing object')
  }
};