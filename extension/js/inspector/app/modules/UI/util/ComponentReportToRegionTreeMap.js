define([
  'marionette', 'client', 'logger'
], function(Marionette, client, logger) {

  /**
  * The ComponentReportToRegionTreeMap will proxy
  * componentReport events that relate to a regionTree update
  * so that the UI can listen directly for these events.
  *
  */

  return Marionette.Object.extend({

    events: [
      'show', 'close', 'swap', 'remove', 'destroy'
    ],

    initialize: function() {
      this.client = client;
      this.listenTo(this.client, 'all', this.onClientEvent);
    },

    onClientEvent: function(eventName, options) {
      if (eventName !== "agent:trigger") {
        return;
      }

      if (_.contains(this.events, options.data.eventName)) {
        this.trigger('regionTree:update');
      }
    }

  })

});
