describe('patchMarionetteApplication', function() {

  describe('base application class', function() {
    beforeEach(function() {
      this.sinon.spy(window, 'sendAppComponentReport')
      this.app = new Marionette.Application();
    })

    it('calls sendAppComponentReport with data', function() {
      var callCount = window.sendAppComponentReport.callCount;
      var callArgs = window.sendAppComponentReport.getCall(callCount-1).args;

      expect(callArgs[0]).to.equal('Application:new');
    })
  })

  describe('base application class', function() {
    beforeEach(function() {

      this.sinon.spy(window, 'sendAppComponentReport')

      this.App = Marionette.Application.extend({
        initialize: this.sinon.spy()
      })

      this.app = new this.App();
    })

    it('calls sendAppComponentReport with data', function() {
      var callCount = window.sendAppComponentReport.callCount;
      var callArgs = window.sendAppComponentReport.getCall(callCount-1).args;

      expect(callArgs[0]).to.equal('Application:new');
    })
  })

})
