this.patchMarionette = (function(agent) {

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
  }


  return function(Backbone, Marionette) {

    if (this.patchedMarionette) {
      debug.log('Backbone was detected again');
      return;
    }

    var Marionette = this.patchedMarionette = Marionette;
    debug.log("Marionette detected: ", Marionette);

    assignClassNames(Backbone, Marionette);


    if (Marionette.Object) {
      this.patchMarionetteObject(Marionette.Object);
      this.patchBackboneTrigger(Marionette.Object.prototype);
    }

    this.patchMarionetteApplication(Marionette.Application);
    if(Marionette.Behavior) {
      this.patchMarionetteBehavior(Marionette.Behavior);  
    } 
    this.patchMarionetteModule(Marionette.Module);
    this.patchMarionetteController(Marionette.Controller);

    var marionetteClasses = [
      Marionette.Application.prototype, Marionette.Module.prototype,
      Marionette.Region.prototype, Marionette.Controller.prototype
    ];

    if (Marionette.Behavior) {
      marionetteClasses.push(Marionette.Behavior.prototype);
    }

    _.each(marionetteClasses, this.patchBackboneTrigger, this);
  }

}(this));
