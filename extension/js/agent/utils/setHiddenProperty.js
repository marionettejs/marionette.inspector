// @private
var setHiddenProperty = function(object, property, value) {
    if (!_.isObject(object)) return;
    Object.defineProperty(object, hiddenPropertyPrefix+property, {
        configurable: false,
        enumerable: false,
        value: value,
        writable: true
    });
};