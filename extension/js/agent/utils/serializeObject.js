var typeOf = function(obj) { return typeof obj} // Ember.typeOf;

this.inspectValue = function(value) {
  var string;
  if (this.isKnownType(value)) {
    var type = this.knownType(value);
    return {
      type: "type-"+type.name,
      inspect: type.toString()
    };
  } else {
    return {
      type: "type-" + typeOf(value),
      inspect: this.inspect(value)
    };
  }
}

this.inspect = function(value) {
  if (this.isKnownType(value)) {
    return this.knownTypeString(value);
  } else if (typeof value === 'function') {
    return "function() { ... }";
  } else if (typeOf(value) === 'array') {
    if (value.length === 0) { return '[]'; }
    else if (value.length === 1) { return '[ ' + this.inspect(value[0]) + ' ]'; }
    else { return '[ ' + this.inspect(value[0]) + ', ... ]'; }
  } else if (value instanceof Error) {
    return 'Error: ' + value.message;
  } else if (value === null) {
    return 'null';
  } else if(typeOf(value) === 'date') {
    return value.toString();
  } else if (typeof value === 'object') {
    // `Ember.inspect` is able to handle this use case,
    // but it is very slow as it loops over all props,
    // so summarize to just first 2 props
    var ret = [], v, count = 0, broken = false;
    for (var key in value) {
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

this.serializeObject = function(obj) {
  var so = this.inspectValue(obj);
  debug('serialize: object ' + so);
  return so;
}