
var serializeElement = function (element, recurse) {
    var $el = $(element);

    var obj = {};

    if (_.isUndefined($el[0])) {
      return {};
    }

    obj.tagName = $el[0].tagName;

    obj.attributes = _.map($el[0].attributes, function(v,i) {
      return {
        name: v.name,
        value: v.value
      }
    });

    if (recurse) {
        obj.children = _.map($el.children(), function(child){
            return serializeElement(child, true);
        }, this);
    }

    return  obj;
}