describe('regionInspector', function() {

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

    it('can use a subpath', function() {
      var regionTree = window.regionInspector(this.app,'header', true);
      expect(regionTree._view.cid).to.deep.equal(this.view.cid);
    });
  });

  describe('showing a layout', function() {
    beforeEach(function() {
      this.LayoutClass = Marionette.LayoutView.extend({
        template: _.template('<div class="layout-header"></div><div class="layout-body"></div>'),
        regions: {
          header: '.layout-header',
          body: '.layout-body'
        }
      });

      this.layout = new this.LayoutClass();
      this.app.header.show(this.layout);
    });

    it('the layout is in the region tree', function() {
      var regionTree = window.regionInspector(this.app);
      expect(regionTree.header._view).to.deep.equal(this.layout);
    });

    it('the layout\'s regions are in the region tree', function() {
      var regionTree = window.regionInspector(this.app);
      var headerRegion = this.layout.getRegion('header');
      var bodyRegion = this.layout.getRegion('body');
      expect(regionTree.header.header._region ).to.equal(headerRegion.cid || headerRegion.__marionette_inspector__cid);
      expect(regionTree.header.body._region ).to.equal(bodyRegion.cid || bodyRegion.__marionette_inspector__cid);
    });
  });

  describe('showing a collection view', function() {
    beforeEach(function() {
      this.collection = new Backbone.Collection([{id:1}, {id:2}, {id:3}, {id:4}]);
      this.CollectionViewClass = Marionette.CollectionView.extend({
        childView: Backbone.View
      })
      this.collectionView = new this.CollectionViewClass({collection: this.collection});
      this.app.header.show(this.collectionView);
    });

    it('the collectionView is in the region tree', function() {
      var regionTree = window.regionInspector(this.app);
      expect(regionTree.header._view).to.deep.equal(this.collectionView);
    });

    it('the children views are in tree', function() {
      var regionTree = window.regionInspector(this.app);
      var cids = _.keys(this.collectionView.children._views);
      var cid1 = cids[0];
      var cid2 = cids[1];

      expect(regionTree.header[cid1]._view).to.deep.equal(this.collectionView.children._views[cid1]);
      expect(regionTree.header[cid2]._view).to.deep.equal(this.collectionView.children._views[cid2]);
    });

  })
})
