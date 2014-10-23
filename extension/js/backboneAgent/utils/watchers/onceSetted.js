
// @private
// Come la onSetted, ma la callback viene chiamata solo LA PRIMA VOLTA che la proprietà è settata.
var onceSetted = function(object, property, callback) {
    var handler = function(prop, action, newValue, oldValue) {
        if (action == "set") { callback(newValue); }
    };
    watchOnce(object, property, handler, 0);
    return [object, property, handler];
};

