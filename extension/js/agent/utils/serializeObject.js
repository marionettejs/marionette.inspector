(function(Agent) {

  /*
   * serializeObject({a: 2, b:3}) // =>
   *  {
   *    a: {type: 'int', value: 2, name: 'a'},
   *    b: {type: int, value: 3, name: 'b'},
   *  }
   */

  Agent.serializeObject = function(obj) {
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


  /*
    ancestorInfo is responsible for traversing the backbone class
    path and getting the class name, object path, and keys at each point.
    it will also get information about the instance properties.

    A typical example of this would be
    [properties, CustomView, ItemView, Marionette View, Backbone View]

    Note: this is super crazy stuff. Budget time for wrapping your mind around it.

    @param obj - object that will be explored. (Usually a backbone view instance)
  */
  Agent.ancestorInfo = function(obj) {
    var info = [];
    var path = '';
    var parent = obj;

    while (true) {
      info.push({
        keys: _.without(_.keys(parent), 'length'),
        name: this.serializeClassName(parent),
        path: path
      });

      path = !!path ? path + ".constructor.__super__" : "constructor.prototype";
      parent = objectPath(obj, path);
      if (!parent) {
        return info;
      }
    };

    return info;
  }

  // we only return the class name if it's different than the parents
  Agent.serializeClassName = function(obj) {

    if (!obj.constructor.__super__) {
      return obj._className || '';
    }

    // @TODO - we do not differenciate between an instance and its class
    // so if we pass a view instance in, we get back it's class name when
    // we should just return an empty string.
    if (obj._className != obj.constructor.__super__._className) {
      return obj._className;
    }

    return ''
  }


  Agent.classPropertyCache = {};

  Agent.serializeClass = function(object, info, shouldMemoize) {

    var serializeObject = objectPath(object, info.path);

    if (this.classPropertyCache[info.name]
        && info.keys == _.keys(this.classPropertyCache[info.name])) {
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

  Agent.serializeObjectProperties = function(object) {
    var properties = [];

    var instanceProperties = this.serializeClass(object, {
      keys: _.without(_.keys(object), 'length'),
      name: '',
      path: '',
    }, false);

    properties.push(instanceProperties);

    var ancestorInfo = this.ancestorInfo(object);
    _.each(ancestorInfo, function(info) {
      properties.push(this.serializeClass(object, info, true));
    }, this)

    // reverse the list of properties so that the
    // topmost ancestor properties come first and the instance properties
    // come last.
    return _.extend.apply(_, [{}].concat(properties.reverse()));
  };

})(this);
