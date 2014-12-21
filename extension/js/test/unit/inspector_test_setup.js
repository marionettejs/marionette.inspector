;(function() {
  mocha.setup('bdd');

  window.expect = chai.expect;
  window.sinon = sinon;

  window.chrome = {};
  window.chrome.devtools = {};
  window.chrome.devtools.inspectedWindow = {}
  window.chrome.extension = {};
  window.chrome.extension.connect = function() {return {
    postMessage: function(){},
    onMessage: {
        addListener: function() {}
    }
  }};


  window.appLoadCallback = function() {
    require(['test/unit/inspector/foo.spec'], function(fooSpec) {
        mocha.run();
    })
    // mocha.checkLeaks();

    var $fixtures = $('#fixtures');

    var setFixtures = function () {
        _.each(arguments, function (content) {
            $fixtures.append(content);
        });
    };

    var clearFixtures = function () {
        $fixtures.empty();
    };

    var originalHash = window.location.hash;


    before(function() {
        this.setFixtures = setFixtures;
        this.clearFixtures = clearFixtures;
    });

    beforeEach(function () {
        this.sinon = sinon.sandbox.create();
    });

    afterEach(function () {
        this.sinon.restore();
        this.clearFixtures();
        window.location.hash = originalHash;
        var Backbone = require('backbone');
        Backbone.history.stop();
        Backbone.history.handlers.length = 0;
    });
  };
})();
