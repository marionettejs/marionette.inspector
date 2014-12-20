(function(Agent) {

  var underscoreListenOnceFuncString = function () {
        if (ran) return memo;
        ran = true;
        memo = func.apply(this, arguments);
        func = null;
        return memo;
      }.toString();

  var lodashListenOnceFuncString = function() {
          if (ran) {
            return result;
          }
          ran = true;
          result = func.apply(this, arguments);

          // clear the `func` variable so the function may be garbage collected
          func = null;
          return result;
        }.toString();

  Agent.unwrapListenToOnceWrapper = function(func) {
    var funcString = func.toString();
    if (underscoreListenOnceFuncString == funcString
      || lodashListenOnceFuncString == funcString) {

      return func._callback;
    }

    return func;
  }

})(this);