/**
 Some backbone and marionette objects don't have cids (gasp)
 When that happens we go in and add this property __marionette_inspector__cid
 with a stupid long and obscure name. We use Object.defineProperty so that we
 can effectively hide the property with enumerable and writable set to false.
*/

this.addCidToComponent = function(object) {
  setHiddenProperty(object, '__marionette_inspector__cid',  _.uniqueId('c'));
}