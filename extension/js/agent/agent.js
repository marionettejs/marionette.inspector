

debug.log("Backbone agent is starting...");
patchDefine(_.bind(this.patchBackboneMarionette, this));
patchBackbone(_.bind(this.patchBackboneMarionette, this));