var hiddenPropertyPrefix = "__marionette_inspector__";


// @private
var getHiddenProperty = function(object, property) {
    if (!_.isObject(object)) return;
    return object[hiddenPropertyPrefix+property];
};
