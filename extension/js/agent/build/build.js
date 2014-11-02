
// @include ../../lib/underscore.js
var _ = this._;


// add jQuery if it's not there
if (_.isUndefined(window.$)) {
  // @include ../../lib/jquery.js
}

// add jQuery to window.__agent because Backbone requires it on the root
this.$ = window.$;

// @include ../../lib/underscore-contrib.js


// @include ../../lib/backbone-no-amd.js
// @include ../../lib/backbone.radio.js
// @include ../../lib/marionette.js

// define Backbone and Marionette locally in the agent closure
var Backbone = this.Backbone;
var Marionette = this.Marionette;


// @include src/core.js
// @include ../agent.js
