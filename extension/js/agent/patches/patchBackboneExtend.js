;(function(Agent) {
  
  Agent.patchBackboneExtend = function(BackboneClass) {
  
    Agent.setHiddenProperty(BackboneClass.prototype, 'classId', _.uniqueId('class'));
    
    Agent.patchFunction(BackboneClass, 'extend', function(originalExtend) {    
      return function() {
        var NewClass = originalExtend.apply(this, arguments);
        Agent.setHiddenProperty(NewClass.prototype, 'classId', _.uniqueId('class'));
        return NewClass;
      };
    });
  };

}(Agent));