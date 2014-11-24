
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
      name: name, //@TODO replace name with key
      type: inspectedObject.type,
      value: inspectedObject.inspect, //@TODO change inspectValue return value from inspect to value
      cid: inspectedObject.cid,
      key: inspectedObject.key
    }
  }, this);

  // debug.log('serialize: object ' + so);
  return data;
};

this.ancestorInfo = function(obj) {
  var info = [{
    keys: _.keys(obj.constructor.prototype),
    name: this.serializeClassName(obj)
  }];

  var parent = obj;
  while (parent = parent.constructor.__super__) {
    info.push({
      keys: _.keys(parent),
      name: this.serializeClassName(parent)
    });
  }

  return info;
}

// we only return the class name if it's different than the parents
this.serializeClassName = function(obj) {

  if (!obj.constructor.__super__) {
    return obj._className || '';
  }

  if (obj._className != obj.constructor.__super__._className ) {
    return obj._className;
  }

  return ''
}


/*
 * picks out the properties that are unique to the object
 * and then calls serializeObject on them.
 *
 */

this.serializeObjectProperties = function(obj) {
  // var ancestorKeys = _.pluck(this.ancestorInfo(obj), 'keys');
  // keys = _.keys(obj).concat(_.flatten(ancestorKeys, 1));

  var keys = _.union(_.keys(obj), _.keys(obj.constructor.prototype));
  keys = _.without(keys, 'length');
  return this.serializeObject(_.pick(obj, keys));
};
