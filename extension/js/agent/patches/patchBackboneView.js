;(function(Agent){

  var patchViewChanges = _.debounce(function(view, prop, action, difference, oldValue) {
    Agent.lazyWorker.push({
      context: Agent,
      args: [view],
      callback: function(view) {
        Agent.sendAppComponentReport('view:change', {
          cid: view.cid,
          data: Agent.serializeView(view)
        });
      }
    });
  }, 200);

  var patchViewRemove = function(originalFunction) {
    return function() {
      var appComponent = this;
      var result = originalFunction.apply(appComponent, arguments);

      Agent.addAppComponentAction(appComponent, new Agent.AppComponentAction(
        'remove', ''
      ));

      return result;
    };
  };

  // @private
  Agent.patchBackboneView = function(BackboneView) {
    debug.log('Backbone.View detected');

    Agent.patchBackboneComponent(BackboneView, function(view) { // on new instance
      Agent.lazyWorker.push({
        context: Agent,
        args: [view],
        callback: function(view) {
          // registra il nuovo componente dell'app
          var data = Agent.serializeView(view)
          Agent.registerAppComponent('View', view, data);
          Agent.sendAppComponentReport('view:change', {
            data: data,
            cid: view.cid
          });
        }
      });


      // Patcha i metodi del componente dell'app
      Agent.patchAppComponentTrigger(view, 'view');

      Agent.onDefined(view, 'ui', function() {
        Agent.onChange(view.ui, _.partial(patchViewChanges, view));
        patchViewChanges(view);
      });

      Agent.onDefined(view, '_events', function() {
        Agent.onChange(view._events, _.partial(patchViewChanges, view));
        patchViewChanges(view);
      });


      Agent.patchFunctionLater(view, 'render', function(originalFunction) { return function() {
        var appComponent = this;
        var result = originalFunction.apply(appComponent, arguments);

        Agent.addAppComponentAction(appComponent, new Agent.AppComponentAction(
          'operation', 'render'
        ));

        return result;
      }});

      Agent.patchFunctionLater(view, 'remove', patchViewRemove);
    });
  };

}(this));

