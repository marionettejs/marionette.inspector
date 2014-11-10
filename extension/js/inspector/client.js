define([
  'marionette',
  'client/agent',
  'client/inspectedPage',
  'logger'
], function(Marionette, agent, inspectedPage, logger) {


  var DevToolClient = Marionette.Object.extend({

    initialize: function() {
      this.agent = agent;
      this.inspectedPage = inspectedPage;

      // bind deferreds
      this.exec = _.bind(this.exec, this);
      this.waitForAppLoad = _.bind(this.waitForAppLoad, this);
      this.waitForClientLoad = _.bind(this.waitForClientLoad, this);

      // proxy inspectedPage events
      this.inspectedPage.on('all', this.trigger, this);
    },

    start: function() {
      logger.log('app', 'starting client');
      this.agent.activate();
    },

    exec: function(fnc, args) {
      return this.agent.exec(fnc, args);
    },

    /**
     * appObserverCall is the best way for inspector to communicate
     * with the appObserver.
     *
     * e.g. this.client.appObserverCall('getView', {viewPath: 'main.0'})
     *
     * @return {Promise} - promise that is resolved with the return of the appObserver method
     */
    appObserverCall: function(fnc) {

      var _appObserverCall = function(fnc, args) {
        return this.appObserver[fnc].apply(this.appObserver, args);
      };

      return this.waitForClientLoad()
        .then(this.waitForAppLoad)
        .then(this.exec.bind(this, _appObserverCall, [fnc, _.rest(arguments)]))
        .catch(function(e) {
          logger.log('client', 'appObserverCall failed to make call', e.message);
        });
    },

    waitForAppLoad: function() {
      var that = this;
      var promise = this.agent.waitFor(function() {
        return this.appObserver.isAppLoaded();
      });

      promise.catch(function(e) {
        logger.log('client', 'waitForAppData: could not find app');
        that.trigger('app:load-failed');
      });

      return promise;
    },

    waitForClientLoad: function() {
      var promise = this.agent.waitFor(function() {
        return this.appObserver != undefined;
      });

      promise.catch(function(e) {
        logger.log('client', 'waitForClientLoad: client failed to load');
      });

      return promise;
    }
  });


  return new DevToolClient();
});
