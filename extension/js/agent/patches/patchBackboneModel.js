
;(function(agent) {

  var patchModelEventsChanges = _.debounce(function(model, prop, action, difference, oldValue) {
    agent.lazyWorker.push({
        context: agent,
        args: [model],
        callback: function(model) {
          agent.sendAppComponentReport("model:events:change", {
            cid: model.cid,
            data: agent.serializeModel(model)
          })
        }
    });
  }, 200);

  var patchModelDestroy = function(originalFunction) {
    return function() {
      var appComponent = this;
      var result = originalFunction.apply(this, arguments);

      addAppComponentAction(this, new AppComponentAction(
        "destroy", ""
      ));

      return result;
    }
  }

  var patchModelAttributesChange = _.debounce(function(model, prop, action, difference, oldvalue) {
    var data = agent.lazyWorker.push({
        context: agent,
        args: [model],
        callback: function(model) {
          agent.sendAppComponentReport("model:attributes:change", {
            cid: model.cid,
            data: agent.serializeModel(model)
          })
        }
    });
  }, 200);



  agent.patchBackboneModel = function(BackboneModel) {
    debug.log("Backbone.Model detected");

    patchBackboneComponent(BackboneModel, function(model) { // on new instance

        agent.lazyWorker.push({
          context: agent,
          args: [model],
          callback: function(model) {
            // registra il nuovo componente dell'app
            var data = agent.serializeModel(model);
            var modelIndex = registerAppComponent("Model", model, data);
          }
        });

        // monitora i cambiamenti alle proprietà d'interesse del componente dell'app
        onChange(model.attributes, _.partial(patchModelAttributesChange, model))

        onDefined(model, '_events', function() {
          onChange(model._events, _.partial(patchModelEventsChanges, model));
          patchModelEventsChanges(model);
        });

        // Patcha i metodi del componente dell'app
        agent.patchAppComponentTrigger(model);
        patchFunctionLater(model, "destroy", patchModelDestroy);
    });
  }
}(this));
