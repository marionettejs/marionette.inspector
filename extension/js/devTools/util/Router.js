define([
    'backbone',
    'util/logger',
    'util/radio'
],
function(Backbone, Logger, Radio) {

    var Router = Backbone.Router.extend({

        initialize: function(app, moduleRoutes) {
            this.app = app;
            this.moduleRoutes = moduleRoutes;
        },

        begin: function() {
            _.each(this.moduleRoutes, function(route) {
                var routePath = route.shift(),
                    routeInfo = route.shift(),
                    routeName = routeInfo.join('_');
                this.route(routePath, routeName, this.process.apply(this, routeInfo));
            }, this);

            Router.startHistory();
        },

        process: function(moduleName, method) {
            return _.bind(function() {

                var routeArgs = arguments;
                var path = 'app/modules/'+moduleName;

                if (this.app.moduleName != moduleName) {
                    Radio.trigger('app', 'before:module:load');
                }

                require([path], _.bind(function(moduleClass) {
                    this.runModule(moduleName, moduleClass, method, routeArgs);
                }, this));
            }, this);
        },

        runModule: function(moduleName, moduleClass, method, routeArgs) {
            Logger.debug('router', 'starting module', moduleName);

            var module = this.app[moduleName];

            if (!module) {
                module = this.app.module(moduleName, moduleClass);
            }

            if (this.app.pageModule != module) {
                if (this.app.pageModule) {
                    this.app.pageModule.stop();
                }
                this.app.pageModule = module;
                module.start();
            }

            this.app.pageModule.controller[method].apply(this.app.pageModule, routeArgs);
            Radio.trigger('app', 'module:load', {
                module: module,
                moduleName: moduleName,
                routeArgs: routeArgs
            });

        }

    });

    Router.startHistory = function() {
      Backbone.history.start({
          root: '',
          pushState: Router.clientSupportsPushState()
      });
    }

    Router.clientSupportsPushState = function() {
        return !!(window.history && window.history.pushState)
    }

    Router.redirectToHash = function() {
        var url = window.location.toString(),
            regex = /\/v2\/listings(.*)/,
            matches,
            path,
            hash;

        if (window.location.hash === '') {

            matches = url.match(regex);

            if (matches && matches.length) {
                path = matches[0];
                hash = path.replace('/v2/','');
                url = matches.input.replace(path, "/v2/#" + hash);
                window.location = url;
            }
        }
    }

    return Router;
});
