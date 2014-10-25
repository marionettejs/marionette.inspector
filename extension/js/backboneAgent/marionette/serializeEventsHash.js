var serializeEventsHash = function(events) {
  return _.map(events, function(callback, eventName) {
    return {
      eventName: eventName,
      functionSrc: callback.toString(),
      isNativeFunction: callback.toString().match(/native code/),
      isFunction: _.isFunction(callback),
      eventHandler: !_.isFunction(callback) ? callback : ''
    }
  });
}
