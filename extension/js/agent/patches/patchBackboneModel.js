;(function(Agent) {

  var patchModelEventsChanges = _.debounce(function(model, prop, action, difference, oldValue) {
    Agent.lazyWorker.push({
        context: Agent,
        args: [model],
        callback: function(model) {
          Agent.sendAppComponentReport('model:events:change', {
            cid: model.cid,
            data: Agent.serializeModel(model)
          });
        }
    });
  }, 200);

  var patchModelDestroy = function(originalFunction) {
    return function() {
      var appComponent = this;
      var result = originalFunction.apply(appComponent, arguments);

      Agent.addAppComponentAction(appComponent, new Agent.AppComponentAction(
        'destroy', ''
      ));

      return result;
    };
  };

  var patchModelAttributesChange = _.debounce(function(model, prop, action, difference, oldvalue) {
    var data = Agent.lazyWorker.push({
        context: Agent,
        args: [model],
        callback: function(model) {
          Agent.sendAppComponentReport('model:attributes:change', {
            cid: model.cid,
            data: Agent.serializeModel(model)
          });
        }
    });
  }, 200);



  Agent.patchBackboneModel = function(BackboneModel) {
    debug.log('Backbone.Model detected');

    Agent.patchBackboneComponent(BackboneModel, function(model) { // on new instance

        Agent.lazyWorker.push({
          context: Agent,
          args: [model],
          callback: function(model) {
            // registra il nuovo componente dell'app
            var data = Agent.serializeModel(model);
            var modelIndex = Agent.registerAppComponent('Model', model, data);
          }
        });

        // monitora i cambiamenti alle proprietà d'interesse del componente dell'app
        Agent.onChange(model.attributes, _.partial(patchModelAttributesChange, model))

        Agent.onDefined(model, '_events', function() {
          Agent.onChange(model._events, _.partial(patchModelEventsChanges, model));
          patchModelEventsChanges(model);
        });

        // Patcha i metodi del componente dell'app
        Agent.patchAppComponentTrigger(model);
        Agent.patchFunctionLater(model, 'destroy', patchModelDestroy);
    });
  };

}(Agent));
