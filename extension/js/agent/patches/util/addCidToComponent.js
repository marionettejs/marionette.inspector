;(function(Agent) {

  /**
   Some backbone and marionette objects don't have cids (gasp)
   When that happens we go in and add this property __marionette_inspector__cid
   with a stupid long and obscure name. We use Object.defineProperty so that we
   can effectively hide the property with enumerable and writable set to false.
  */

  Agent.addCidToComponent = function(object) {
    if (!object.cid) Agent.setHiddenProperty(object, 'cid',  _.uniqueId('c'));
  }

}(Agent));