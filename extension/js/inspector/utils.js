define([], function() {
    var utils = new (function() {
        this.httpRequest = function(method, url, callback, disableCaching) {
            var requestObj = {
                method: method
            };
            if (disableCaching === true) {
                requestObj.cache = 'no-cache';
            }

            fetch(url, requestObj)
              .then(function(response) {
                if (response.status >= 200 && response.status < 300) {
                  response.text().then(callback);  
                } else {  
                  console.error('Error fetching ', url, ' - ', response.statusText);  
                }
              })
              .catch(function() {
                console.error('Error fetching ', url);
              })
        };

        // String utility functions.
        this.string = {

            // Based on http://stackoverflow.com/a/498995
            trim: function(target) {
                return target.replace(/^\s+|\s+$/g, '');
            },

            // Based on http://stackoverflow.com/a/1981366
            removeMultipleSpaces: function(target) {
                return target.replace(/\s{2,}/g, ' ');
            },

            // Return the simplified version of target, i.e. a trimmed string with multiple spaces removed
            simplify: function(target) {
                return this.removeMultipleSpaces(this.trim(target));
            },

            // Based on http://stackoverflow.com/a/646643
            startsWith: function(target, str) {
                return target.slice(0, str.length) == str;
            },
            endsWith: function(target, str) {
                return target.slice(-str.length) == str;
            },

            // remove first and last char
            removeBorders: function(target) {
                target = target.substring(1); // first
                target = target.substring(0, target.length-1); // last
                return target;
            }
        }
    })();
    return utils;
});
