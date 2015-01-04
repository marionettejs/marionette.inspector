
this.patchBackbone = function(Backbone) {

  if (this.patchedBackbone) {
    debug.log('Backbone was detected again');
    return;
  }

  var Backbone = this.patchedBackbone = Backbone;

  debug.log("Backbone detected: ", Backbone);

  this.patchBackboneView(Backbone.View)
  this.patchBackboneModel(Backbone.Model);
  this.patchBackboneCollection(Backbone.Collection);
  this.patchBackboneRouter(Backbone.Router);
  _patchBackboneWreqr(Backbone, _.bind(this.patchBackboneWreqr, this));
  _patchBackboneRadio(Backbone, _.bind(this.patchBackboneRadio, this));


  _.each(
    [
      Backbone.Events, Backbone.Model.prototype,
      Backbone.View.prototype, Backbone.Collection.prototype
    ],
    this.patchBackboneTrigger, this
  );
}

var _patchBackboneWreqr = function(Backbone, onWreqrDetected) {
  onObjectAndPropertiesSetted(
    Backbone,
    'Wreqr',
    ['Channel', 'EventAggregator', 'CommandStorage', 'Handlers', 'RequestResponse', 'radio'],
    onWreqrDetected
  );
}

var _patchBackboneRadio = function(Backbone, onRadioDetected) {
  onObjectAndPropertiesSetted(
    Backbone,
    'Radio',
    ['Channel'],
    onRadioDetected
  );
}
