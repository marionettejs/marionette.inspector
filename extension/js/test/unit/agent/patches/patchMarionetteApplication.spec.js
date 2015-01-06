describe('patchMarionetteApplication', function() {

  beforeEach(function() {

    this.sinon.spy(window, 'sendAppComponentReport')

    this.app = new Marionette.Application();
  })

  it('callls registerAppComponent with data', function() {
    var callCount = window.sendAppComponentReport.callCount;
    var callArgs = window.sendAppComponentReport.getCall(callCount-1).args;

    expect(callArgs[0]).to.equal('Application:new');
  })
})
