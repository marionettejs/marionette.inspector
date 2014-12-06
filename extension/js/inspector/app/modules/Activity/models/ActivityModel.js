define([
  'backbone'
], function(Backbone) {

  return Backbone.Model.extend({

    defaults: {
      actionId:  undefined, // top-level segment this event belongs to
      start:     undefined, // execution start time, ms
      end:       undefined, // execution end time, ms
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
