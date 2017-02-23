;(function(Agent){

  var assignClassNames = function(Backbone, Marionette) {
    Marionette.CollectionView.prototype._className = 'CollectionView';
    Marionette.CompositeView.prototype._className = 'CompositeView';
    Marionette.View.prototype._className = 'Marionette.View';
    Backbone.View.prototype._className = 'Backbone.View';
    Backbone.Model.prototype._className = 'Backbone.Model';
    Backbone.Collection.prototype._className = 'Backbone.Collection';
    if (Marionette.ItemView) {
      Marionette.ItemView.prototype._className = 'ItemView';
    }

    if (Marionette.LayoutView) {
      Marionette.LayoutView.prototype._className = 'LayoutView';
    } else {
      if (Marionette.Layout) {
        Marionette.Layout.prototype._className = 'Layout.View';
      }
    }
  };

  Agent.patchMarionette = function() {

    var patchMarionette = function(Backbone, Marionette) {

      if (Agent.patchedMarionette) {
        debug.log('Backbone was detected again');
        return;
      }

      Agent.patchedMarionette = Marionette;
      debug.log('Marionette detected: ', Marionette);

      assignClassNames(Backbone, Marionette);

      if (Marionette.Object) {
        Agent.patchMarionetteObject(Marionette.Object);
        Agent.patchBackboneTrigger(Marionette.Object.prototype);
      }

      Agent.patchMarionetteApplication(Marionette.Application);

      var marionetteClasses = [
        Marionette.Application.prototype,
        Marionette.Region.prototype
      ];

      if (Marionette.Controller) {
        Agent.patchMarionetteController(Marionette.Controller);
        marionetteClasses.push(Marionette.Controller.prototype);
      }

      if (Marionette.Behavior) {
        Agent.patchMarionetteBehavior(Marionette.Behavior);
        marionetteClasses.push(Marionette.Behavior.prototype);
      }

      if (Marionette.Module) {
        Agent.patchMarionetteModule(Marionette.Module);
        marionetteClasses.push(Marionette.Module.prototype);
      }

      _.each(marionetteClasses, Agent.patchBackboneTrigger, this);

      Agent.markEvent('start', {
        marionette_version: Marionette.VERSION,
        backbone_version: Backbone.VERSION,
        jquery_version: Backbone.$.fn.jquery,
        // underscore_version is tough to get because it's inside the backbone and marionette closure and not exposed
      })
    };

    return patchMarionette;

  }();

}(Agent));
