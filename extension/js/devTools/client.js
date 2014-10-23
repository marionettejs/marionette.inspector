define([
  'marionette',
  'client/backboneAgent',
  'client/inspectedPage'
], function(Marionette, backboneAgent, inspectedPage) {


  var DevToolClient = Marionette.Object.extend({

    initialize: function() {
      this.backboneAgent = backboneAgent;
      this.inspectedPage = inspectedPage;

      // bind deferreds
      this.exec = _.bind(this.exec, this);
      this.waitForAppLoad = _.bind(this.waitForAppLoad, this);
      this.waitForClientLoad = _.bind(this.waitForClientLoad, this);

      // proxy inspectedPage events
      this.inspectedPage.on('all', this.trigger, this);
    },

    start: function() {
      this.backboneAgent.activate();
    },

    exec: function(fnc, args) {
      return this.backboneAgent.exec(fnc, args);
    },

    fetchAppData: function(dataType) {

      var _appData = function(dataType) {
        return this.appObserver[dataType]()
      };

      return this.waitForClientLoad()
        .then(this.waitForAppLoad)
        .then(this.exec.bind(this, _appData, [dataType]))
        .catch(function(e) {
          console.log('fetchData failed to get data', e.message);
        });
    },

    waitForAppLoad: function() {
      var that = this;
      var promise = this.backboneAgent.waitFor(function() {
        return this.appObserver.isAppLoaded();
      });

      promise.catch(function(e) {
        console.log('waitForAppData: could not find app');
        that.trigger('app:load-failed');
      });

      return promise;
    },

    waitForClientLoad: function() {
      var promise = this.backboneAgent.waitFor(function() {
        return !_.isUndefined(this.appObserver);
      });

      promise.catch(function(e) {
        console.log('waitForClientLoad: client failed to laod');
      });

      return promise;
    }
  });


  return new DevToolClient();
});
