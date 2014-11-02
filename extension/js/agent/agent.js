

debug.log("Backbone agent is starting...");

patchDefine(
  _.bind(this.patchBackbone, this),
  _.bind(this.patchMarionette, this)
);

patchWindow(
  _.bind(this.patchBackbone, this),
  _.bind(this.patchMarionette, this)
);