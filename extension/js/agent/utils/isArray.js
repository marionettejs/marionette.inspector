// @private
var isArray = function(object) {
    return Object.prototype.toString.call(object) == '[object Array]';
};