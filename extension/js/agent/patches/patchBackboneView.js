;(function(Agent){

  var patchViewChanges = function(view, prop, action, difference, oldValue) {
    debug.log('view:change', view.cid);
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
  };

  var onNewViewInstance = function(view) { // on new instance
    debug.log('new view instance:', view.cid);
    // flag to not trigger view:change when is registering
    var isRegisteringView = true;
    var viewChanged = _.debounce(_.partial(patchViewChanges, view), 0);
    Agent.lazyWorker.push({
      context: Agent,
      args: [view],
      callback: function(view) {
        // registra il nuovo componente dell'app
        var data = Agent.serializeView(view);
        Agent.registerAppComponent('View', view, data);
      }
    });

    // set class name if we can
    if (view._requirePath) {
      view._className = _.last(view._requirePath.split('/'));
    }

    // Patcha i metodi del componente dell'app
    Agent.patchAppComponentTrigger(view, 'view');

    Agent.onDefined(view, 'ui', function() {
      Agent.onChange(view.ui, viewChanged);
      if (!isRegisteringView) viewChanged();
    });

    Agent.onDefined(view, '_events', function() {
      Agent.onChange(view._events, viewChanged);
      if (!isRegisteringView) viewChanged();
    });

    Agent.onDefined(view, '_listeningTo', function() {
      Agent.onChange(view._listeningTo, viewChanged);
      if (!isRegisteringView) viewChanged();
    });

    isRegisteringView = false;
  };

  // @private
  Agent.patchBackboneView = function(BackboneView) {
    debug.log('Backbone.View detected');

    Agent.patchBackboneComponent(BackboneView, function (view) {
      _.defer(onNewViewInstance, view);
    });
  };

}(Agent));
