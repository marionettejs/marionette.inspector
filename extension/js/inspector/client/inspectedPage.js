define([
  "backbone",
  "underscore",
  "panelPort",
  "utils",
  "logger"
],
  function(Backbone, _, panelPort, utils, logger) {
    var inspectedPageClient = new (function() {
        _.extend(this, Backbone.Events);

        this.initialize = function() {
            _.bindAll(this);

            this.messageCache = [];

            // true when the injection process is being executed, tipically used by the router
            // to decide whether to reload the panel or not.
            this.isInjecting = false;

            // Turn inspected page messages into Backbone events,
            // so that Backbone.Events methods like the useful "listenTo" can be used
            panelPort.onMessage.addListener(_.bind(function(messages) {

              if (!_.isArray(messages)) {
                messages = [messages];
              }

              logger.log('ip', 'batch of ' + messages.length + " messages received." )

              this.recordMessages(messages);

              _.each(messages, function(message) {
                if (message && message.target == "page") {
                    message.data = message.data || {};
                    this.trigger(message.name, message.data);
                }
              }, this);
            }, this));
        };

        // Execute the "func" function in the inspected page,
        // passing to it the arguments specified in the "args" array (that must be JSON-compatible),
        // a more specific context can be setted by using the "context" parameter.
        // The callback "onExecuted" is called with the function return value.
        // The method is implemented by using devtools.inspectedWindow.eval.
        this.execFunction = function(func, args, onExecuted, context) {
            chrome.devtools.inspectedWindow.eval(serializeFunc(func, args, context), function(result, isException) {
                if (isException) {
                    var error = _.isObject(isException) ? isException.value : result;
                    throw error;
                } else {
                    onExecuted(result);
                }
            });
        };

        this.recordMessages = _.debounce(function(messages) {

          if(!window.recordMessages) {
            return;
          }

          // the message cache is an array that holds all of the messages
          // up to this point. we send the entire thing over because
          // we can. it's probably as inefficient as possible.
          this.messageCache = this.messageCache.concat(messages);

          var data = {
            messages: JSON.stringify(this.messageCache)
          };

          $.ajax({
            url: 'http://localhost:4567/record',
            type: 'POST',
            data: data,
            crossDomain: true,
            success: function() {
            }
          });
        }, 1000);

        this.exec = function(func, args, context) {

          var promise = new Promise(function(resolve, reject) {
            var serializedFn = serializeFunc(func, args, context);
            chrome.devtools.inspectedWindow.eval(serializedFn, function(result, isException) {
                if (isException) {
                  logger.log("ip", "exec failed for " + serializedFn);
                  reject(_.isObject(isException) ? isException.value : result)
                } else {
                  resolve(result)
                }
            })
          });

          promise.catch(function(e) {
            // logger.log("ip", 'exec failed for ' + func);
          });

          return promise;
        };

        var serializeFunc = function(func, args, context ) {
          if (context === undefined) { context = "window.__agent"; }
          var evalCode = "("+func.toString()+").apply("+context+", "+JSON.stringify(args)+");";

          return evalCode;
        };


       this._waitFor = function(condition, context, done, fail, _maxTimeout) {
         var that = this;
         var maxTimeout;
         if(_maxTimeout === undefined) {
           maxTimeout = 10000;
         } else {
           maxTimeout = _maxTimeout;
         }

         if(maxTimeout <= 0) {
           fail(new Error('waitFor timed out'));
           return false;
         }

         that.exec(condition).then(function(result) {
          if(result) {
            setTimeout(done, 100, result);
          } else {
            setTimeout(function() { that._waitFor(condition, context, done, fail, maxTimeout - 100) }, 100);
          }
         });
       };

       this.waitFor = function(condition) {
         var that = this;
         var promise =  new Promise(function(resolve, reject) {
           that._waitFor(condition, that, resolve, reject);
         });

         promise.catch(function(e) {
          //  logger.log("ip", 'waitFor failed to complete');
         });

         return promise;
       };


        // Call the callback when the inspected page DOM is fully loaded
        // or immediately if that is already true.
        this.ready = function(onReady) {
            this.execFunction(function() {
                var readyState = document.readyState;
                return (readyState != "uninitialized" && readyState != "loading");
            }, [], _.bind(function(hasLoaded) { // on executed
                if (hasLoaded) {
                    onReady();
                } else {
                    this.once("ready", onReady);
                }
            }, this));
        };

        // Reload the inspected page injecting at the beginning the application
        // whose absolute base path is specified in the "appBasePath" string.
        // The application base directory must contain a app.json file with
        // - the exported application name ("name")
        // - the application dependencies ("dependencies" array) which will be injected in the provided order
        // BEFORE the application.
        // - its scripts ("files" array) which will be injected in the provided order INSIDE the application scope.
        // Note: the urls are considered as relative to the base path.
        // "injectionData" is an optional JSON-compatible hash accessible to the application via the options variable,
        // is tipically used to pass special data not directly accessible from the page, such as the
        // extension url, or for app configuration options.
        this.reloadInjecting = function(appBasePath, injectionData) {
            injectionData = injectionData || {};
            var me = this;

            utils.httpRequest("get", appBasePath+"/app.json", function(data) {
                var app = JSON.parse(data);

                // transform scripts relative urls into their content
                var scripts = {
                    dependencies: app.dependencies || [],
                    files: app.files || []
                };
                var fetchScripts = function(onComplete) {
                    var scriptsLength = _.flatten(_.values(scripts)).length;
                    var scriptsLoaded = 0;
                    _.each(_.keys(scripts), function(scriptsType) {
                        _.each(scripts[scriptsType], function(scriptRelativeURL, index) {
                            var scriptURL = appBasePath+"/"+scriptRelativeURL;
                            utils.httpRequest("get", scriptURL, function(data) {
                                scripts[scriptsType][index] = data; // replace script relative url with its content
                                scriptsLoaded++;

                                if (scriptsLoaded === scriptsLength) {
                                    // scripts fetch complete
                                    onComplete(scripts);
                                }
                            });
                        });
                    });
                }
                fetchScripts(function() { // on complete
                    // prepare code to inject
                    // TODO: create and use source map to ease debugging

                    var dependenciesCode = scripts.dependencies.join('\n\n') + '\n\n';
                    var appCode = 'window.'+app.name+' = new (function(options) {' + '\n\n'
                                        + scripts.files.join('\n\n') + '\n\n'
                                + '})('+JSON.stringify(injectionData)+');' + '\n'; // last "\n" prevents eventual EOF error


                    var sourceURL =  "//@ sourceURL="+appBasePath+"/agent.js\n\n";
                    var toInject = sourceURL + dependenciesCode + appCode;


                    // Reload the inspected page with the code to inject at the beginning of it
                    me.isInjecting = true;
                    chrome.devtools.inspectedWindow.reload({
                        ignoreCache: true, // avoid to load the old and possibly different
                                           // cached version of the inspected page
                        injectedScript: toInject
                    });
                });
            }, true); // disable request caching (avoid to load the old and possibly different cached
                      // version of the injected scripts), not needed in production.
        };

        this.initialize();
    })();
    return inspectedPageClient;
});
