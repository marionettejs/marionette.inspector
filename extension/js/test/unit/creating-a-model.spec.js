describe('Creating a Model', function() {

  beforeEach(function() {
    this.sinon.spy(window, 'registerAppComponent')

    this.myModel = new Backbone.Model({
      foo: 'foo'
    });
  })

  it('calls registerAppComponent', function() {
    expect(window.registerAppComponent).to.be.called.calledOnce;
  });

  it('callls registerAppComponent with data', function() {
    var callData = window.registerAppComponent.getCall(0).args[2];

    expect(callData.attributes).to.equal(JSON.stringify({foo: "foo"}));
    expect(callData.inspectedAttributes).to.deep.equal({
      foo: {inspect: "foo", type: "type-string"}
    });

  })

})