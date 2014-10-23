// @private
var getHiddenProperty = function(object, property) {
    if (!isObject(object)) return;
    return object[hiddenPropertyPrefix+property];
};
