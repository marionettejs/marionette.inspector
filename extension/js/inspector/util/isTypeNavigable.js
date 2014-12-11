define([
  'util/isViewType',
], function(isViewType) {
  return function(object) {
    var type = object.type || object;
    return isViewType(object) || type == 'type-backbone-model';
  }
})