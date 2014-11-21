describe('serializeModel', function() {
  beforeEach(function() {
    this.model = new window.patchedBackbone.Model({
      a: 2
    });
  });

  it('serializes attributes', function() {
    var serialize = window.serializeModel(this.model);
    expect(serialize.attributes.value).to.deep.equal(this.model.attributes);
  });

  it('serializes cid', function() {
    var serialize = window.serializeModel(this.model);
    expect(serialize.cid).to.equal(this.model.cid);
  });

  it('serializes events', function() {
    var serialize = window.serializeModel(this.model);
    expect(serialize._events).to.eql([]);
  });

  describe('model with listeners', function() {
    beforeEach(function() {
      this.view = new window.patchedBackbone.View();

      this.view.listenTo(this.model, 'all', this.view.render);
      this.view.listenTo(this.model, 'change', this.view.render);
    })

    it('has events', function() {
      var serialize = window.serializeModel(this.model);
      expect(_.pluck(serialize._events, 'eventName'))
        .to.eql(['all', 'change']);
    });
  });
});

