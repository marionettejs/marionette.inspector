;(function(Agent){

  var assignClassNames = function(Backbone, Marionette) {
    Marionette.CollectionView.prototype._className = 'CollectionView';
    if (Marionette.CompositeView) {
      Marionette.CompositeView.prototype._className = 'CompositeView';
    }
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

  Agent.getMarionetteVersion = function(Marionette) {
    return parseInt(Marionette.VERSION && Marionette.VERSION[0]);
  };

  Agent.patchMarionette = function() {

    var patchMarionette = function(Backbone, Marionette) {

      if (Agent.patchedMarionette) {
        debug.log('Backbone was detected again');
        return;
      }

      Agent.patchedMarionette = Marionette;
      debug.log('Marionette detected: ', Marionette);

      Agent.mnVersion = Agent.getMarionetteVersion(Marionette);

      assignClassNames(Backbone, Marionette);

      var ObjectClass = Marionette.Object || Marionette.MnObject;

      if (ObjectClass) {
        Agent.patchMarionetteObject(ObjectClass);
        Agent.patchBackboneTrigger(ObjectClass.prototype);
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

      Agent.initializeKnownTypes();

      Agent.sendAppComponentReport('load', {
        marionette: Marionette.VERSION || '1.x.x',
        backbone: Backbone.VERSION,
        radio: Backbone.Radio && Backbone.Radio.VERSION,
        jquery: Backbone.$.fn && Backbone.$.fn.jquery
      })
    };

    return patchMarionette;

  }();

}(Agent));
