
/*
 * serializeObject({a: 2, b:3}) // =>
 *  {
 *    a: {type: 'int', value: 2, name: 'a'},
 *    b: {type: int, value: 3, name: 'b'},
 *  }
 */


this.serializeObject = function(obj) {
  var data = {};

  _.each(obj || {}, function(value, name) {
    var inspectedObject = this.inspectValue(value, name);

     data[name] = {
      name: name,
      type: inspectedObject.type,
      value: inspectedObject.inspect, //@TODO change inspectValue return value from inspect to value
      cid: inspectedObject.cid,
      key: inspectedObject.key
    }
  }, this);

  // debug.log('serialize: object ' + so);
  return data;
};

/*
 * picks out the properties that are unique to the object
 * and then calls serializeObject on them.
 *
 */

this.serializeObjectProperties = function(obj) {
  return this.serializeObject(
    _.pick(obj,
      _.without(
        _.difference(
          _.keys(obj),
          _.keys(obj.constructor.prototype)
        ),
        'length'
      )
    )
  );
};
