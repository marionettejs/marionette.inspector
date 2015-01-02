;(function(Agent) {

  var tempId = 0;

  Agent.printProperty = function(prop) {
    var tempVar = 'mn' + ++tempId;

    window[tempVar] = prop;
    console.log(tempVar + ' = ', prop);
  };


}(this));