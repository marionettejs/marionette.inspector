// debugger;

;(function(Agent){

  debug.log("Backbone agent is starting...");
  console.log('Marionette Inspector: window.__agent = ', this);
  Agent.sendAppComponentReport('start');

  Agent.patchDefine(
    Agent.patchBackbone,
    Agent.patchMarionette
  );

  Agent.patchWindow(
    Agent.patchBackbone,
    Agent.patchMarionette
  );

  /* start is a manual way to start the agent if
   * Backbone and Marionette are not set on the window or
   * you're not using `define` to package your modules.
   */
  Agent.start = function(Backbone, Marionette) {
    Agent.patchBackbone(Backbone);
    Agent.patchMarionette(Backbone, Marionette);
  };


  Agent.disableAnalytics = false;

  Agent.startAnalytics();
  Agent.lazyWorker = new Agent.LazyWorker();
  setInterval(Agent.observeChanges, 500);

}(Agent));

window.setTimeout(function() {
  if(window.__agent && window.__agent.patchedBackbone) {
    return;
  }

  console.warn("Marionette Inspector: Hmmm... couldn't find yo Backbone");
  console.log("Please peruse https://github.com/marionettejs/marionette.inspector#setup");

}, 5000);
