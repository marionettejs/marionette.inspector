define([], function() {
  return function(attributes) {
    if (Array.isArray(attributes)) {

      return _.sortBy(attributes, function(value) {
        return value['sortKey'];
      });

    } else if (typeof attributes === "object") {

      return _.object(_.sortBy(_.pairs(attributes), function(value) {
        return value[0];
      }));
    }

  };
});
