;(function(Agent){

  var assignClassNames = function(Backbone, Marionette) {
    Marionette.ItemView.prototype._className = 'ItemView';
    Marionette.CollectionView.prototype._className = 'CollectionView';
    Marionette.CompositeView.prototype._className = 'CompositeView';
    Marionette.View.prototype._className = 'Marionette.View';
    Backbone.View.prototype._className = 'Backbone.View';
    Backbone.Model.prototype._className = 'Backbone.Model';
    Backbone.Collection.prototype._className = 'Backbone.Collection';


    if (Marionette.LayoutView) {
      Marionette.LayoutView.prototype._className = 'LayoutView';
    } else {
      Marionette.Layout.prototype._className = 'Layout.View';
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
      Agent.patchMarionetteBehavior(Marionette.Behavior);
      Agent.patchMarionetteModule(Marionette.Module);
      Agent.patchMarionetteController(Marionette.Controller);

      _.each(
        [
          Marionette.Application.prototype, Marionette.Module.prototype,
          Marionette.Behavior.prototype, Marionette.Region.prototype,
          Marionette.Controller.prototype
        ],

        Agent.patchBackboneTrigger
      );


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
