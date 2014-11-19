describe('serializeModel', function() {
  beforeEach(function() {
    this.model = new window.patchedBackbone.Model({
      a: 2
    });
  });

  it('serializes attributes', function() {
    this.serialize = window.serializeModel(this.model);
    expect(this.serialize.attributes).to.deep.equal(this.model.attributes);
  });

  it('serializes cid', function() {
    this.serialize = window.serializeModel(this.model);
    expect(this.serialize.cid).to.equal(this.model.cid);
  });

  it('serializes events', function() {
    this.serialize = window.serializeModel(this.model);
    expect(this.serialize._events).to.deep.equal({});
  });

  describe('model with listeners', function() {
    beforeEach(function() {
      this.view = new window.patchedBackbone.View();

      this.view.listenTo(this.model, 'all', this.view.render);
      this.view.listenTo(this.model, 'change', this.view.render);
    })

    it('has events', function() {
      this.serialize = window.serializeModel(this.model);
      expect(_.keys(this.serialize._events)).to.deep.equal(['all', 'change']);
      expect(this.serialize._events.all[0].context).to.deep.equal({
        type: "type-backbone-view",
        inspect: "<Backbone.View>"
      })
    });
  });
});

