
// @private
// watcher is an array [object, property, (internal) handler] as returned by the on setted functions
var stopOnSetted = function(watcher) {
    unwatchOne.apply(this, watcher);
};
