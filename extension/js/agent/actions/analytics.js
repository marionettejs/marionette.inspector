;(function(Agent) {

  var session_id = Agent.randomString(10);

  Agent.markEvent = function(eventName, data) {
    if (Agent.disableAnalytics) {
      return;
    }

    var eventData = _.extend({
      event_name: eventName,
      session_id: session_id,
      url: window.location.origin
    }, data);

    //todo: save
  }

  Agent.startAnalytics = function() {
    //todo
  }
}(Agent));
