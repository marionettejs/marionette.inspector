describe('Creating a Model', function() {

  beforeEach(function() {
    this.sinon.spy(window, 'registerAppComponent')

    this.myModel = new Backbone.Model({
      foo: 'foo'
    });
  })

  it('calls registerAppComponent', function() {
    expect(window.registerAppComponent)
      .to.be.called.calledOnce
      .and.to.have.been.calledWithExactly('Model', this.myModel);
  })
})