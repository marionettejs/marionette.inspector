

debug.log("Backbone agent is starting...");

patchDefine(
  _.bind(this.patchBackbone, this),
  _.bind(this.patchMarionette, this)
);

patchWindow(
  _.bind(this.patchBackbone, this),
  _.bind(this.patchMarionette, this)
);


/* start is a manual way to start the agent if
 * Backbone and Marionette are not set on the window or
 * you're not using `define` to package your modules.
 */
this.start = function(Backbone, Marionette) {
  this.patchBackbone(Backbone);
  this.patchMarionette(Backbone, Marionette);
};


console.log('marionette inspector', this);
sendAppComponentReport('start');