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

    reportMap: {
      'trigger': ['show'],
      'operation': ['remove']
    },

    initialize: function() {
      this.client = client;
      this.listenTo(this.client, 'all', this.onClientEvent);
    },

    onClientEvent: function(eventName, data) {
      var reportType = data.type;
      var reportName = data.name;

      if (_.has(this.reportMap, reportType)) {
        if (_.contains(this.reportMap[reportType], reportName)) {
          this.trigger('regionTree:update', eventName, reportType, reportName, data);
        }
      }
    }


  })

});
