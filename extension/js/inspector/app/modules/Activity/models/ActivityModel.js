define([
  'backbone'
], function(Backbone) {

  // Note: See patchAppComponentTrigger
  return Backbone.Model.extend({

    defaults: {
      actionId:  undefined, // user/app action this event belongs to
      startTime: undefined, // execution start time, ms
      endTime:   undefined, // execution end time, ms
      eventName: undefined, // event name
      args:      undefined, // event arguments
      depth:     undefined, // depth within trigger tree
      cid:       undefined, // cid of context object (who triggered the event?)
      context:   undefined, // inspectValue abbreviation of context
      listeners: undefined  // [listener]
                            //   eventName: event name trigger for calling listener,
                            //   callback: callback function,
                            //   context: context for callback invocation
    }
  });
});
