;(function(Agent) {

  var Parse = Agent.Parse;
  var session_id = Agent.randomString(10);


  var saveRecord = function(object, data) {
    object.save(data, {
      success: function(object) {
      },
      error: function(model, error) {
      }
    });
  }

  Agent.markEvent = function(eventName, data) {
    if (Agent.disableAnalytics) {
      return;
    }

    var Event = Parse.Object.extend("Event");
    var event = new Event();

    var eventData = _.extend({
      event_name: eventName,
      session_id: session_id,
      url: window.location.origin
    }, data);

    saveRecord(event, eventData);
  }

  Agent.startAnalytics = function() {
    Parse.initialize("ZMtYo1w9R7U8FcTX4NPSlCCTTYl41PRhEz19yREC", "fjfnW6iqB9KwtRh6yBwuQrLlYPYgwR3reEC4KkNH");
  }
}(Agent));
