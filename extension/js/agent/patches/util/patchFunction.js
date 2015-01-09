;(function(Agent){

  // @private
  // Sostituisce la funzione functionName di object con quella restituita dalla funzione patcher.
  // La funzione patcher viene chiamata con la funzione originale come argomento.
  Agent.patchFunction = function(object, functionName, patcher) {
    var originalFunction = object[functionName];
    object[functionName] = patcher(originalFunction);

    // When calling onString on the patched function, call the originalFunction onString.
    // This is needed to allow an user of the originalFunction to manipulate its
    // original string representation and not that of the patcher function.
    // NOTE: if the original function is undefined, use the string representation of the empty function.
    var emptyFunction = function(){};
    object[functionName].toString = function() {
      return originalFunction ? originalFunction.toString.apply(originalFunction, arguments)
                                : emptyFunction.toString.apply(emptyFunction, arguments);
    };
  };

}(this));