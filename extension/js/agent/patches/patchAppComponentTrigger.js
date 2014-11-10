// @private
// Patcha il metodo trigger del componente dell'app.

this.depth = 0;

var patchAppComponentTrigger = bind(function(appComponent, eventType) {//

    var agent = this;
    patchFunctionLater(appComponent, "trigger", function(originalFunction) {
      return function(eventName, component) {

        agent.depth++;
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
            depth: agent.depth,
            cid: this.cid,
            context: agent.inspectValue(context)
        };
        var dataKind = (data === undefined) ? undefined : "event arguments";

        addAppComponentAction(this, new AppComponentAction(
            "trigger", eventName, data, dataKind
        ));

        agent.depth--;

        return result;
    };
  });
}, this);
