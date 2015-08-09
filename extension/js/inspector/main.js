// Script loaded every time the devtools are started, the first time the panel is opened.

require.config({
    // paths configuration
    paths: {
        templates: '../../templates',
        test: '../test/',

        jquery: '../lib/jquery/jquery',
        underscore: '../lib/underscore/underscore',
        backbone: '../lib/backbone/backbone',
        radio: '../lib/backbone.radio/build/backbone.radio',
        marionette: '../lib/backbone.marionette/lib/backbone.marionette',
        text: '../lib/text/text',
        bootstrap: '../lib/bootstrap/dist/bootstrap',
        d3: '../lib/d3/d3',
        handlebars: '../lib/handlebars/handlebars',
        'jquery.treegrid': '../lib/jquery-treegrid/js/jquery.treegrid',
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
        "jquery.treegrid": {
            deps: ["jquery"],
            exports: "jQuery.fn.treegrid",
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
  "jquery.treegrid",
  "handlebars",
  "marionette",
  "logger",
  "app",
  "app/modules/Radio",
  "app/modules/UI",
  "app/modules/Data",
  "app/modules/Activity",
  "text!templates/devTools/partials/_property.html"
], function(
    $, treeGrid, Handlebars, Marionette,
    logger, App, RadioApp, UIApp, DataApp, ActivityApp,
    _property) {

    var tplCache = {};

    Marionette.Renderer.render = function(template, data, view) {
      var compiledTpl = tplCache[template];
      if (_.isFunction(compiledTpl)) {
        return compiledTpl(data);
      }

      compiledTpl =  Handlebars.compile(template);
      tplCache[template] = compiledTpl;

      return compiledTpl(data);
    };

    /*
     * This flag is used to turn on the recorder
     * for when you want to run the inspector in a sandboxed environment
     */
    // window.recordMessages = true;

    $(document).ready(function() {
        // var router = new Router();
        // Backbone.history.start();

        Handlebars.registerPartial('templates/devTools/partials/_property.html', _property);

        window.app = new App();
        app.start();

        app.module('Data', DataApp);
        app.module('Radio', RadioApp);
        app.module('UI', UIApp);
        app.module('Activity', ActivityApp);

        if (window.appLoadCallback) {
          window.appLoadCallback();
        }
    });

    logger.log('devtools', 'started!')
});
