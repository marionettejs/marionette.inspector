(function(Agent) {

  Agent.tempId = 0;


  Agent.printProperty = function(prop) {
    var tempVar = 'mn' + ++Agent.tempId;

    window[tempVar] = prop;
    console.log(tempVar + ' = ', prop);
  };


}(this));