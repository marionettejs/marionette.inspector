;(function(Agent) {

   /*
   *
   * StopWatching will cleanup the watchers for an object property.
   *
   * There are two parts to this:
   *  1. remove watchers set by watch
   *  2. cleanup the getter, setter properties *
   *
   */

  Agent.stopWatching = function(object, prop, callback) {
    unwatch(object, prop, callback);
    var tmp = object[prop];
    delete object[prop];
    object[prop] = tmp;

    return object[prop]
  };

}(Agent));