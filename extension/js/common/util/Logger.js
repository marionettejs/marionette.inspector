define([
  'marionette'
], function(Marionette) {

  var Logger = Marionette.MnObject.extend({


    /**
    * shouldPrintAllLogs is a global flag for printing all the logs*
    * regardless of which key they fall under. It's off by default, because*
    * printing all the logs would be crazy.
    *
    */
    shouldPrintAllLogs: false,


    /**
    * shouldSaveLogs is a flag for saving logs to the `logs` hash.
    * It's off by default because it could be a memory hog, but you can *
    * turn it on if you want to debug something gnarly.
    */
    shouldSaveLogs: false,

    /*
    * Keys is both a list of app log keys and a gatekeeper for what's
    * printed to the screen.
    *
    * Keys are generally primary components (app, sub-app, architecture)
    *
    * The keys should be false unless you're actively debugging something. *
    * We do not want log messages being distributed with builds.
    */
    keys: {
      'client': false,
      'ip': false,
      'router': false,
      'app': false,
      'ui': false,
      'devtools': false,
      'radio': false,
      'activity': false,
      'data': false,
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

    /* print is like `log` but it will always be printed, so you don't
    * have to worry about whether the keys' flag is on or off. This is nice
    * for changing one message without changing all of the messages in the key.
    *
    */
    print: function(key) {
      var args = _.rest(arguments);
      var styles = "color: green; font-weight:bold;";

      this._msg(console.log, styles, key, args, true);
    },

    _msg: function(fnc, styles, key, args, forcePrint) {

      if (!_.has(this.keys, key)) {
        throw new Error('Key must be set in logger');
      }

      if (forcePrint || this.shouldPrintAllLogs || this.keys[key]) {
        fnc.apply(console, ["%c> %s:", styles, key].concat(args));
      }

      if (this.shouldSaveLogs) {
        this.logs[key].push(args)
      }
    },

    /* printLogs will print all of the messages saved in
    * the internal logs datastore for a specific key. This is great
    * for debugging from the inspector `app.logger.printLogs('ui')`.
    */
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
