// @private
// Patcha il metodo trigger del componente dell'app.
var patchAppComponentTrigger = bind(function(appComponent, eventType) {//

    var agent = this;
    var depth = 0;
    patchFunctionLater(appComponent, "trigger", function(originalFunction) {
      return function(eventName, component) {

        depth++;
        var result = originalFunction.apply(this, arguments);

        // function signature: trigger(eventName, arg1, arg2, ...)
        //
        var eventName = _.first(arguments);
        var args  = _.rest(arguments);
        var context = this;

        // save data only if there is
        var data = {
            eventName: eventName,
            args: _.map(args, agent.inspectValue, agent),
            depth: depth,
            cid: this.cid,
            context: agent.inspectValue(context)
        };
        var dataKind = (data === undefined) ? undefined : "event arguments";

        addAppComponentAction(this, new AppComponentAction(
            "trigger", eventName, data, dataKind
        ));

        depth--;

        return result;
    };
  });
}, this);
