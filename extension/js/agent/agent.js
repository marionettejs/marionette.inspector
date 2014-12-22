// debugger;


debug.log("Backbone agent is starting...");
console.log('Marionette Inspector: window.__agent = ', this);
sendAppComponentReport('start');

this.patchDefine(
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

this.lazyWorker = new this.LazyWorker();

window.setTimeout(function() {
  if(window.__agent && window.__agent.patchedBackbone) {
    return;
  }

  console.warn("Marionette Inspector: Hmmm... couldn't find yo Backbone");
  console.log("Please peruse https://github.com/marionettejs/marionette.inspector#caveats");

}, 2000);
