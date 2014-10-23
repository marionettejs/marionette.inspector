// @private
// Patcha il metodo trigger del componente dell'app.
var patchAppComponentTrigger = bind(function(appComponent, eventType) {//

    var eventInterceptor = this.eventInterceptor;

    patchFunctionLater(appComponent, "trigger", function(originalFunction) {
      return function(eventName, component) {
        var result = originalFunction.apply(this, arguments);

        // function signature: trigger(eventName, arg1, arg2, ...)
        // var eventName = arguments[0];
        var eventArguments = eventArguments = _.rest(arguments);

        // save data only if there is
        var data = eventArguments;
        var dataKind = (data === undefined) ? undefined : "event arguments";

        addAppComponentAction(this, new AppComponentAction(
            "Trigger", eventName, data, dataKind
        ));

        if (eventType) {
          eventInterceptor.send(eventType, eventName);
        }

        return result;
    };
  });
}, this);