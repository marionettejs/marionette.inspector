(function(Agent) {

  /**
   * inspectValue({a: 2, b: 3, c: 4})  //=>
   *   {type:'object', inspect:"{a: 2, b: 3, ... }"}
   *
   */

  var typeOf = function(obj) {
    if (obj instanceof Array) {
      return 'array';
    }

    return typeof obj
  }

  var inspect = function(value) {
    var type = typeOf(value) ;

    if (type === 'undefined') {
      return 'undefined';
    } else if (value === null) {
      return 'null';
    } else if (type === 'function') {
      return 'function() {';
    } else if (type === 'date') {
      return value.toString();
    } else if (type === 'string' || type === 'number' || type === 'boolean') {
      return value;
    } else if (value instanceof Error) {
      return 'Error: ' + value.message;
    } else if (jQuery && value instanceof jQuery) {
      var elem = value[0] ? '<'+value[0].tagName.toLowerCase()+'>' : '';
      return '<jQuery ' + elem + '>';
    } else if (type === 'array') {
      if (value.length === 0) { return '[]'; }

      var ret;

      if (Agent.isKnownType(value[0])) {
        ret = Agent.knownTypeString(value[0]);
      } else {
        ret = inspect(value[0]);
      }

      var suffix = ' ]';

      if(value.length > 1) suffix = ', ... ]';

      return '[ ' + ret + suffix;
    } else if (type === 'object') {
      // `Ember.inspect` is able to handle this use case,
      // but it is very slow as it loops over all props,
      // so summarize to just first 2 props
      var ret = [], v, count = 0, broken = false;

      for (var key in value) {
        if (!value.hasOwnProperty(key)) { continue; }

        if (count++ === 2) {
          broken = true;
          break;
        }

        v = value[key];

        if (Agent.isKnownType(v)) { v = Agent.knownTypeString(v); }
        else if (v === 'toString') { continue; } // ignore useless items
        else if (typeOf(v) === 'function') { v = 'function() {}'; }
        else if (typeOf(v) === 'array') { v = '[Array : ' + v.length + ']'; }
        else if (typeOf(v) === 'object') { v = '[Object]'; }

        ret.push(key + ': ' + v);
      };

      var suffix = ' }';

      if(broken) suffix = ' ...}';

      return '{ ' + ret.join(', ') + suffix;

    } else {
      debug.log('serialize: couldn\'t find the type for ', value);
      return '';
    }
  }


  Agent.inspectValue = function(value, object) {
    var key = this.findKey(object, value);

    if (this.isKnownType(value)) {
      var type = this.knownType(value);
      return {
        type: 'type-' + type.name,
        inspect: type.str,
        cid: type.cid,
        key: key
      };
    } else {
      return {
        type: 'type-' + typeOf(value),
        inspect: inspect(value),
        cid: undefined,
        key: key
      };
    }
  };

  Agent.inspectObject = function(object) {
    var value = toJSON(object);
    return {
      value: value,
      inspect: this.inspectValue(object),
      serialized: this.serializeObject(object),
      isEmpty: _.isEmpty(value),
    }
  };

}(this));