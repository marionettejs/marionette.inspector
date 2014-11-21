
this.patchBackboneModel = (function(agent) {

  var patchModelEventsChanges = function(model, prop, action, difference, oldValue) {
    agent.sendAppComponentReport("model:events:change", {
      cid: model.cid,
      data: {
        _events: agent.serializeModelEvents(model._events)
      }
    })
  }


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

  var patchModelAttributesChange = function(model, prop, action, difference, oldvalue) {
    agent.sendAppComponentReport("model:attributes:change", {
      cid: model.cid,
      data: {
        attributes: agent.inspectObject(model.attributes)
      }
    })
  }

  return function(BackboneModel) {
    debug.log("Backbone.Model detected");

    patchBackboneComponent(BackboneModel, function(model) { // on new instance

        // registra il nuovo componente dell'app
        var data = agent.serializeModel(model);
        var modelIndex = registerAppComponent("Model", model, data);


        // monitora i cambiamenti alle proprietà d'interesse del componente dell'app
        // monitorAppComponentProperty(model, "attributes", 1);
        // monitorAppComponentProperty(model, "id", 0);
        // monitorAppComponentProperty(model, "cid", 0);
        // monitorAppComponentProperty(model, "urlRoot", 0); // usato dal metodo url() (insieme a collection)
        // monitorAppComponentProperty(model, "collection", 0);

        onChange(model.attributes, _.partial(patchModelAttributesChange, model))

        onDefined(model, '_events', function() {
          onChange(model._events, _.partial(patchModelEventsChanges, model));
          patchModelEventsChanges(model);
        });

        // Patcha i metodi del componente dell'app
        patchAppComponentTrigger(model);
        patchAppComponentEvents(model);
        patchAppComponentSync(model);
        patchFunctionLater(model, "destroy", patchModelDestroy);
    });
  }
}(this));
