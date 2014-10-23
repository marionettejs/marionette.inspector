var EventInterceptor = function () {
};

_.extend(EventInterceptor.prototype, {

  events: {
    view: {
      show: 'regionTree:updated'
    }
  },

  send: function(eventType, event) {
    var translatedEvent = this.events[eventType] && this.events[eventType][event];
    if (!translatedEvent) {
      return;
    }

    sendAppComponentReport(translatedEvent, {});
  }
});
