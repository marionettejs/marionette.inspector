var typeOf = function(obj) {
  if (obj instanceof Array) {
    return 'array'
  }

  return typeof obj
}

var instanceOf = function(obj, Type) {
  return obj instanceof Type
}
var isType = function(obj, type) {
  return typeOf(obj) == type;
}

/**
 * inspectValue({a: 2, b: 3, c: 4})  //=>
 *   {type:'object', inspect:"{a: 2, b: 3, ... }"}
 *
 */

this.inspectValue = function(value) {
  var string;
  if (this.isKnownType(value)) {
    var type = this.knownType(value);
    return {
      type: "type-"+type.name,
      inspect: type.toString(value),
      cid: type.cid(value)
    };
  } else {
    return {
      type: "type-" + typeOf(value),
      inspect: this.inspect(value),
      cid: undefined
    };
  }
}

this.inspect = function(value) {
  var type = typeOf(value) ;
  if (this.isKnownType(value)) {
    return this.knownTypeString(value);
  } else if (type === 'undefined') {
    return "undefined";
  } else if (type === 'function') {
    return "function() { ... }";
  } else if (type === 'array') {
    if (value.length === 0) { return '[]'; }
    else if (value.length === 1) { return '[ ' + this.inspect(value[0]) + ' ]'; }
    else { return '[ ' + this.inspect(value[0]) + ', ... ]'; }
  } else if (value instanceof Error) {
    return 'Error: ' + value.message;
  } else if (value === null) {
    return 'null';
  } else if(typeOf(value) === 'date') {
    return value.toString();
  } else if(isType(value, 'string') || isType(value, 'number') || isType(value, 'boolean')) {
    return value;
  } else if (typeof value === 'object') {
    // `Ember.inspect` is able to handle this use case,
    // but it is very slow as it loops over all props,
    // so summarize to just first 2 props
    var ret = [], v, count = 0, broken = false;
    for (var key in value) {
      if (key == "length") {
        continue;
      }

      if (value.hasOwnProperty(key)) {
        if (count++ > 1) {
          broken = true;
          break;
        }
        v = value[key];
        if (this.isKnownType(v)) {v = this.knownTypeString(v); }
        else if (v === 'toString') { continue; } // ignore useless items
        else if (typeOf(v) === 'function') { v = "function() { ... }"; }
        else if (typeOf(v) === 'array') { v = '[Array : ' + v.length + ']'; }
        else if (typeOf(v) === 'object') { v = '[Object]'; }
        ret.push(key + ": " + v);
      }
    }
    var suffix = ' }';
    if (broken) {
      suffix = ' ...}';
    }
    return '{ ' + ret.join(', ') + suffix;
  } else {


    debug.log("serialize: couldn't find the type for ", value);
    return ''
  }
}

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
    var inspectedObject = this.inspectValue(value);

     data[name] = {
      name: name,
      type: inspectedObject.type,
      value: inspectedObject.inspect,
      cid: inspectedObject.cid
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
