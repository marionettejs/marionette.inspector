/**
 * inspectValue({a: 2, b: 3, c: 4})  //=>
 *   {type:'object', inspect:"{a: 2, b: 3, ... }"}
 *
 */

this.inspectValue = (function(agent) {
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

  var inspect = function(value) {
    var type = typeOf(value) ;
    if (agent.isKnownType(value)) {
      return agent.knownTypeString(value);
    } else if (type === 'undefined') {
      return "undefined";
    } else if (type === 'function') {
      return "function() {";
    } else if (type === 'array') {
      if (value.length === 0) { return '[]'; }
      else if (value.length === 1) { return '[ ' + inspect(value[0]) + ' ]'; }
      else { return '[ ' + inspect(value[0]) + ', ... ]'; }
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
          if (agent.isKnownType(v)) {v = agent.knownTypeString(v); }
          else if (v === 'toString') { continue; } // ignore useless items
          else if (typeOf(v) === 'function') { v = "function() {}"; }
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


  return function(value, object) {
    var string;
    var key = findKey(object, value);

    if (agent.isKnownType(value)) {
      var type = agent.knownType(value);
      return {
        type: "type-"+type.name,
        inspect: type.str,
        cid: type.cid,
        key: key
      };
    } else {
      return {
        type: "type-" + typeOf(value),
        inspect: inspect(value),
        cid: undefined,
        key: key
      };
    }
  }

}(this));


this.inspectObject = function(object) {
  var value = toJSON(object);
  return {
    value: value,
    inspect: this.inspectValue(object),
    serialized: this.serializeObject(object),
    isEmpty: _.isEmpty(value),
  }
}