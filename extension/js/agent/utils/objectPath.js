;(function(Agent) {

  Agent.objectPath = function (obj, path, defaultValue, pathIndex = 0) {
    if (!obj) return defaultValue;
    if (path.length === pathIndex) return obj;
    if (typeof path === "string") path = path.split(".");

    var part = path[pathIndex];
    if (!part) {
      return obj;
    }

    try {
      return Agent.objectPath(obj[part], path, defaultValue, ++pathIndex);
    }
    catch (error) {
      return defaultValue;
    }
  };

}(Agent));
