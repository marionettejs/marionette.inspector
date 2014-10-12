define([
  'underscore'
], function(_) {

  return function(options, currentValue) {
    return _.reduce(options, function(memo, value) {
      memo['is_'+value] = currentValue == value;
      return memo;
    }, {});
  }

});
