// @private
// Patcha il metodo trigger del componente dell'app.

_.extend(this, {

    depth: 0,

    actionId: 0,

    getActionId: function () {
        this._incActionId();
        return this.actionId;
    },

    _incActionId: _.debounce(function () {
        this.actionId++;
    }, 50)
});

var patchAppComponentTrigger = bind(function(appComponent, eventType) {//

    var agent = this;
    patchFunctionLater(appComponent, "trigger", function(originalFunction) {
      return function(eventName) {

        agent.depth++;
        var start = Date.now();
        var result = originalFunction.apply(this, arguments);
        var end = Date.now();

        // function signature: trigger(eventName, arg1, arg2, ...)
        var args  = _.rest(arguments);
        var context = this;

        // Convert backbone array of array of backbone listener to a flattened array of
        // inspector listener with event trigger merged in.

        var listeners = _.chain(this._events || {})
            .pick('all', eventName)
            .map(agent.serializeEvents)
            .flatten()
            .value();

        // save data only if there is
        var data = {
            actionId: agent.getActionId(),
            start: start,
            end: end,
            eventName: eventName,
            args: _.map(args, agent.inspectValue, agent),
            depth: agent.depth,
            cid: this.cid,
            context: agent.inspectValue(context),
            listeners: listeners
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
