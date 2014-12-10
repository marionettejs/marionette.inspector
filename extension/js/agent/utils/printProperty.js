;(function(agent) {

  agent.tempId = 0;


  agent.printProperty = function(prop) {
    var tempVar = 'mn' + ++agent.tempId;

    window[tempVar] = prop;
    console.log(tempVar + ' = ', prop);
  };


}(this));