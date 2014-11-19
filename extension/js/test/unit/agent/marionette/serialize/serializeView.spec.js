describe('serializeView', function() {
  beforeEach(function() {
    this.setFixtures($("<div class='header'></div><div class='body'></div>"));
    this.app = new Marionette.Application();
    this.app.addRegions({
      header: '.header',
      body: '.body'
    });
  });

  describe('showing a view', function() {

    beforeEach(function() {
      this.view = new Backbone.View();
      this.app.header.show(this.view);
    });

    it('the view is in the region tree', function() {
      var regionTree = window.regionInspector(this.app);
      expect(regionTree.header._view).to.deep.equal(this.view);
    });

    it('the view can be serialized in the tree', function() {
      var regionTree = window.regionInspector(this.app,'', true);
      expect(regionTree.header._view.cid).to.deep.equal(this.view.cid);
    });
  })
})
