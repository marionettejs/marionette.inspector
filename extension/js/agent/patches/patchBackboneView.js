;(function(Agent){

  var patchViewChanges = _.debounce(function(view, prop, action, difference, oldValue) {
    Agent.lazyWorker.push({
      context: Agent,
      args: [view],
      callback: function(view) {
        this.sendAppComponentReport("view:change", {
          cid: view.cid,
          data: this.serializeView(view)
        });
      }
    });
  }, 200);

  var patchViewRemove = function(originalFunction) {
    return function() {
      var appComponent = this;
      var result = originalFunction.apply(appComponent, arguments);

      addAppComponentAction(appComponent, new AppComponentAction(
        "remove", ""
      ));

      return result;
    }
  }

  // @private
  Agent.patchBackboneView = function(BackboneView) {
    debug.log("Backbone.View detected");

    patchBackboneComponent(BackboneView, function(view) { // on new instance
      Agent.lazyWorker.push({
        context: Agent,
        args: [view],
        callback: function(view) {
          // registra il nuovo componente dell'app
          var data = this.serializeView(view)
          this.registerAppComponent("View", view, data);
          this.sendAppComponentReport("view:change", {
            data: data,
            cid: view.cid
          });
        }
      });


      // Patcha i metodi del componente dell'app
      Agent.patchAppComponentTrigger(view, 'view');

      onDefined(view, 'ui', _.bind(function() {
        onChange(view.ui, _.bind(patchViewChanges, this, view));
        patchViewChanges(view);
      }, this));

      onDefined(view, '_events', _.bind(function() {
        onChange(view._events, _.bind(patchViewChanges, this, view));
        patchViewChanges(view);
      }, this));


      patchFunctionLater(view, "render", function(originalFunction) { return function() {
        var result = originalFunction.apply(this, arguments);

        addAppComponentAction(this, new AppComponentAction(
            "operation", "render"
        ));

        return result;
      }});

      patchFunctionLater(view, "remove", patchViewRemove);
    });
  }
}(this));

