var EventInterceptor = function (Radio) {
  this.Radio = Radio;
};

_.extend(EventInterceptor.prototype, {
  events: {
    view: {
      show: 'regionTree:updated'
    }
  },

  interceptEvents: function () {
    try { oeanhtis } catch(e) {}
    _.each(this.events, function (events, channel) {
      _.each(events, function (translatedEvent, targetEvent) {
        this._interceptEvent(channel, targetEvent, translatedEvent);
      }, this);
    }, this);
  },

  _interceptEvent: function (channel, targetEvent, translatedEvent) {
    this.Radio.on(channel, targetEvent, function () {
      sendAppComponentReport(translatedEvent, {});
    });
  }
});
