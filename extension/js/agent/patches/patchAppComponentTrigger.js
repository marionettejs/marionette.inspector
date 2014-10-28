// @private
// Patcha il metodo trigger del componente dell'app.
var patchAppComponentTrigger = bind(function(appComponent, eventType) {//

    patchFunctionLater(appComponent, "trigger", function(originalFunction) {
      return function(eventName, component) {
        var result = originalFunction.apply(this, arguments);

        // function signature: trigger(eventName, arg1, arg2, ...)
        //
        var eventName = _.first(arguments);
        var eventArguments = eventArguments = _.rest(arguments);

        // save data only if there is
        var data = eventArguments;
        var dataKind = (data === undefined) ? undefined : "event arguments";

        addAppComponentAction(this, new AppComponentAction(
            "trigger", eventName, data, dataKind
        ));

        return result;
    };
  });
}, this);
