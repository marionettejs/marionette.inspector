describe('serializeView', function() {
  beforeEach(function() {
    this.setFixtures($("<div class='header'></div><div class='body'></div>"));

    this.model = new window.patchedBackbone.Model({
      a: 2
    });

    this.ViewClass = window.patchedMarionette.ItemView.extend({
      ui: {
        body: '.body'
      },

      events: {
        'click @ui.body': 'onClickBody'
      },

      onClickBody: function() {}
    })

    this.view = new this.ViewClass({
      model: this.model,
      el: $('.header'),

    });

    this.data = window.serializeView(this.view);
  });

  it('serializes cid', function() {
    expect(this.data.cid).to.equal(this.view.cid);
  });

  it('serializes options', function() {
    expect(this.data.options.model.type).to.equal('type-backbone-model');
  });

  it('serializes ui', function() {
    expect(this.data.ui.body.type).to.equal('type-element');
  });

  it('serializes element', function() {
    expect(this.data.el.type).to.equal('type-element');
  });

  it('serializes events', function() {
    expect(this.data.events[0].eventName).to.equal('click .body');
  });

})
