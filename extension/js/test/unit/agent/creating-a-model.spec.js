describe('Creating a Model', function() {

  beforeEach(function(done) {

    this.sinon.spy(window, 'registerAppComponent')

    this.myModel = new Backbone.Model({
      foo: 'bar'
    });
    setTimeout(done, 500);
  })

  it('callls registerAppComponent with data', function() {
    var callCount = window.registerAppComponent.callCount;
    var callData = window.registerAppComponent.getCall(callCount-1).args[2];

    expect(callData.attributes.value).to.deep.equal({foo: "bar"});
    expect(callData.attributes.serialized).to.deep.equal({
      foo: {
        cid: undefined,
        key: "foo",
        name: "foo",
        value: "bar",
        type: "type-string"
      }
    });
  })
})
