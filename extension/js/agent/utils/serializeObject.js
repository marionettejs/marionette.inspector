
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
  var info = [];
  var path = 'constructor.prototype';
  var parent = obj;

  while (true) {
    parent = objectPath(parent, path);
    if (!parent) {
      return info;
    }

    info.push({
      keys: _.without(_.keys(parent), 'length'),
      name: this.serializeClassName(parent),
      path: path
    });

    path += ".constructor.__super__";
  };

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


this.classPropertyCache = {};

this.serializeClass = function(object, info, shouldMemoize) {

  var serializeObject = objectPath(object, info.path);

  if (this.classPropertyCache[info.name]) {
    return this.classPropertyCache[info.name];
  }

  var props = this.serializeObject(_.pick(serializeObject, info.keys));

  if (shouldMemoize && info.name) {
    this.classPropertyCache[info.name] = props;
  }

  return props;
}

/*
 * picks out the properties that are unique to the object
 * and then calls serializeObject on them.
 *
 */

this.serializeObjectProperties = function(object) {
  var properties = [];

  var instanceProperties = this.serializeClass(object, {
    keys: _.without(_.keys(object), 'length'),
    name: '',
    path: '',
  }, false);

  properties.push(instanceProperties);

  // debugger;
  var ancestorInfo = this.ancestorInfo(object);
  _.each(ancestorInfo, function(info) {
    properties.push(this.serializeClass(object, info, true));
  }, this)

  return _.extend.apply(_, properties);
};
