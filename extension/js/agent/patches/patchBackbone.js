;(function(Agent){

  Agent.patchBackbone = function(Backbone) {

    if (Agent.patchedBackbone) {
      debug.log('Backbone was detected again');
      return;
    }

    Agent.patchedBackbone = Backbone;

    debug.log('Backbone detected: ', Backbone);

    Agent.patchBackboneView(Backbone.View);
    Agent.patchBackboneModel(Backbone.Model);
    Agent.patchBackboneCollection(Backbone.Collection);
    Agent.patchBackboneRouter(Backbone.Router);
    _patchBackboneWreqr(Backbone, Agent.patchBackboneWreqr);
    _patchBackboneRadio(Backbone, Agent.patchBackboneRadio);

    _.each(
      [
        Backbone.Model, Backbone.Collection,
        Backbone.View
      ],
      Agent.patchBackboneExtend
    );

    _.each(
      [
        Backbone.Events, Backbone.Model.prototype,
        Backbone.View.prototype, Backbone.Collection.prototype
      ],
      Agent.patchBackboneTrigger
    );
  };

  var _patchBackboneWreqr = function(Backbone, onWreqrDetected) {
    Agent.onObjectAndPropertiesSetted(
      Backbone,
      'Wreqr',
      ['Channel', 'EventAggregator', 'CommandStorage', 'Handlers', 'RequestResponse', 'radio'],
      onWreqrDetected
    );
  };

  var _patchBackboneRadio = function(Backbone, onRadioDetected) {
    Agent.onObjectAndPropertiesSetted(
      Backbone,
      'Radio',
      ['Channel'],
      onRadioDetected
    );
  };

}(Agent));
