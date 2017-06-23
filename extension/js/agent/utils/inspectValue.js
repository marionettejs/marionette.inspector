;(function(Agent) {

  var toJSON = function(obj) {
    try {
      return JSON.parse(JSON.stringify(obj));
    }
    catch (e) {
      debug.log('failed parsing object', obj);
      return {};
    }
  };

  var typeOf = function(obj) {
    if (obj instanceof Array) {
      return 'array';
    }

    return typeof obj
  }

  var formatJquery = function(value) {
    var elem = value[0];
    var tagName;
    if (!elem || !elem.tagName) {
      tagName = '';
    } else {
      tagName = '<'+value[0].tagName.toLowerCase()+'>';
    }
    return '<jQuery ' + tagName + '>';
  }

  var formatArray = function(value) {
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
  }

  var formatObject = function(value) {
    // `Ember.inspect` is able to handle this use case,
    // but it is very slow as it loops over all props,
    // so summarize to just first 2 props
    var ret = [], v, t, count = 0, broken = false;

    for (var key in value) {
      if (!value.hasOwnProperty(key)) { continue; }

      if (count++ === 2) {
        broken = true;
        break;
      }

      try {
        v = value[key];
      }
      catch (error) {
        v = undefined;
      }
      t = typeOf(v);

      if (Agent.isKnownType(v)) { v = Agent.knownTypeString(v); }
      else if (v === 'toString') { continue; } // ignore useless items
      else if (t === 'function') { v = 'function() {}'; }
      else if (t === 'array') { v = '[Array : ' + v.length + ']'; }
      else if (t === 'object') { v = '[Object]'; }

      ret.push(key + ': ' + v);
    };

    var suffix = ' }';

    if(broken) suffix = ' ...}';

    return '{ ' + ret.join(', ') + suffix;
  }


  /**
   inspect takes a value and based on the value's type
   formats it in a nice way.

   e.g.
   inspect(new Backbone.Model) //=> "<Backbone.Model c12>"

   @param value
   @return {String} - formatted representation of the value
   */
  var inspect = function(value) {
    var type = typeOf(value) ;

    if (type === 'undefined') { return 'undefined'; }
    else if (value === null) { return 'null'; }
    else if (type === 'function') {return 'function() {'; }
    else if (type === 'date') { return value.toString(); }
    else if (type === 'string' || type === 'number' || type === 'boolean') { return value; }
    else if (value instanceof Error) { return 'Error: ' + value.message; }
    // todo: support zepto
    else if (type === 'object' && value.jquery) { return formatJquery(value); }
    else if (type === 'array') { return formatArray(value); }
    else if (type === 'object') { return formatObject(value); }
    else {
      debug.log('serialize: couldn\'t find the type for ', value);
      return '';
    }
  }


  /**
   * inspectValue({a: 2, b: 3, c: 4})  //=>
   *   {type:'object', inspect:"{a: 2, b: 3, ... }"}
   *
   */
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
      inspect: Agent.inspectValue(object),
      serialized: Agent.serializeObject(object),
      isEmpty: _.isEmpty(value),
    };
  };

}(Agent));
