// @private
// backbone agent debugging utils

this.startLogging = function() {
  debug.active = true;
}

var debug = {
    active: false, // set to true in logic to activate debugging

    log: function() {
        if (!this.active)
          return;

        var message = 'bb: ' + _.first(arguments);

        // test the message
        // if (!message.match(/ri/)) {
        //   return
        // }


        var args = _.rest(arguments);
        var styles = "font-weight: bold;";
        console.log.apply(console, ["%c> %s", styles, message].concat(args));
    }
}

this.debug = debug;
