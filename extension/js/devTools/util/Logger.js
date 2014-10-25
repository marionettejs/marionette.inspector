define([
  'marionette'
], function(Marionette) {

  var Logger = Marionette.Object.extend({

    active: false,

    logsActive: true,

    keys: {
      'client': false,
      'ip': false,
      'router': false,
      'app': false,
      'ui': false,
      'devtools': false
    },

    initialize: function() {
      this.logs = {};

      // create empty log buckets for each key
      _.each(_.keys(this.keys), function(key) {
        this.logs[key] = [];
      }, this);
    },

    /* log is the standard way to keep track of events in the application.
     *
     */
    log: function(key) {
      var args = _.rest(arguments);
      var styles = "color: blue; font-weight:bold;";

      this._msg(console.log, styles, key, args, false);
    },

    /* debug is the place put messages that would be related to debugging an application.
     *
     */
    debug: function(key) {
      var args = _.rest(arguments);
      var styles = "color: red; font-weight:bold;";

      this._msg(console.debug, styles, key, args, false);
    },

    /* warn is the place put messages related to something that's probably bad.
     *
     */
    warn: function(key) {
      var args = _.rest(arguments);
      var styles = "color: red; font-weight:bold;";

      this._msg(console.debug, styles, key, args, false);
    },

    print: function(key) {
      var args = _.rest(arguments);
      var styles = "color: green; font-weight:bold;";

      this._msg(console.debug, styles, key, args, true);
    },

    _msg: function(fnc, styles, key, args, forcePrint) {

      if (!_.has(this.keys, key)) {
        throw new Error('Key must be set in logger');
      }

      if (forcePrint || this.active || this.keys[key]) {
        fnc.apply(console, ["%c> %s", styles, key].concat(args));
      }

      if (this.logsActive) {
        this.logs[key].push(args)
      }
    },

    printLogs: function(key) {
      if (!_.has(this.logs, key)) {
        return
      }

      var names = this.logs[key].join(", ");
      console.log(key, names);
    }
  });

  return new Logger();
})
