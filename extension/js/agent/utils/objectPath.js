;(function(Agent) {

  Agent.objectPath = function (obj, path, defaultValue) {
    if (typeof path == "string") path = path.split(".");
    if (obj === undefined) return defaultValue;
    if (path.length === 0) return obj;
    if (obj === null) return defaultValue;

    var part = _.first(path);
    if (part == "") {
      return obj;
    }

    return Agent.objectPath(obj[part], _.rest(path), defaultValue);
  };

}(Agent));