// Script loaded every time the devtools are started, the first time the panel is opened.

require.config({
    // paths configuration
    paths: {
        templates: './templates',
        test: '../test/',

        jquery: '../lib/jquery/dist/jquery',
        underscore: '../lib/underscore/underscore',
        backbone: '../lib/backbone/backbone',
        'backbone.radio': '../lib/backbone.radio/build/backbone.radio',
        marionette: '../lib/backbone.marionette/lib/backbone.marionette',
        bootstrap: '../lib/bootstrap/dist/js/bootstrap',
        d3: '../lib/d3/d3',
        handlebars: '../lib/handlebars/handlebars',        
        logger: '../common/util/Logger'
    },
    // non-amd library loaders
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            init: function () {
                // exports
                return this.Backbone.noConflict();
            }
        },
        // 'marionette': {
        //     deps: ['underscore', 'jquery'],
        //     init: function () {
        //         // exports
        //         console.log('require', this);
        //
        //         return this.Backbone.noConflict();
        //     }
        // },
        'bootstrap': {
            deps: ['jquery']
        },
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});


require([
  "jquery",  
  "marionette",
  "logger",
  "app",
  "app/modules/Radio",
  "app/modules/UI",
  "app/modules/Data",
  "app/modules/Activity",
  "templates"
], function(
    $, Marionette,
    logger, App, RadioApp, UIApp, DataApp, ActivityApp,
    templates) {

    Marionette.Renderer.render = function(template, data) {
      var compiledTpl = templates[template];
      if (!compiledTpl) {
        throw new Error(`Unable to find template: "${template}"`)
      }
      return compiledTpl(data);
    };

    Marionette.setEnabled('childViewEventPrefix', false);

    /*
     * This flag is used to turn on the recorder
     * for when you want to run the inspector in a sandboxed environment
     */
    // window.recordMessages = true;

    $(document).ready(function() {
        // var router = new Router();
        // Backbone.history.start();

        window.app = new App();
        app.start();

        app.modules.UI = new UIApp();
        app.modules.Data = new DataApp();
        app.modules.Radio = new RadioApp();
        app.modules.Activity = new ActivityApp();

        if (window.appLoadCallback) {
          window.appLoadCallback();
        }
    });

    logger.log('devtools', 'started!')
});
