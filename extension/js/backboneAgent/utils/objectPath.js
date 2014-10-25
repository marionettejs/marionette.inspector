var objectPath = function (obj, path, defaultValue) {
  if (typeof path == "string") path = path.split(".");
  if (obj === undefined) return defaultValue;
  if (path.length === 0) return obj;
  if (obj === null) return defaultValue;

  return objectPath(obj[_.first(path)], _.rest(path), defaultValue);
};