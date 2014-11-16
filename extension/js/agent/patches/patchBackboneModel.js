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

this.patchModelAttributesChange = function(model, prop, action, difference, oldvalue) {
  this.sendAppComponentReport("model:attributes:change", {
    cid: model.cid,
    data: {
      serializedAttributes: this.serializeObject(model.attributes),
      attributes: toJSON(model.attributes),
      inspectedAttributes: this.inspectValue(model.attributes)
    }
  })
}


// @private
this.patchBackboneModel = function(BackboneModel) {
    debug.log("Backbone.Model detected");

    patchBackboneComponent(BackboneModel, bind(function(model) { // on new instance

        // registra il nuovo componente dell'app
        var data = this.serializeModel(model);
        var modelIndex = registerAppComponent("Model", model, data);


        // monitora i cambiamenti alle proprietà d'interesse del componente dell'app
        // monitorAppComponentProperty(model, "attributes", 1);
        // monitorAppComponentProperty(model, "id", 0);
        // monitorAppComponentProperty(model, "cid", 0);
        // monitorAppComponentProperty(model, "urlRoot", 0); // usato dal metodo url() (insieme a collection)
        // monitorAppComponentProperty(model, "collection", 0);

        onChange(model.attributes, _.bind(this.patchModelAttributesChange, this, model))

        // Patcha i metodi del componente dell'app
        patchAppComponentTrigger(model);
        patchAppComponentEvents(model);
        patchAppComponentSync(model);
        patchFunctionLater(model, "destroy", patchModelDestroy);

    }, this));
}
