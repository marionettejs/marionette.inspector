define(['util/isViewType'], function(isViewType) {
  describe('isViewType', function() {
    it('Backbone.View is a view type', function() {
      expect(isViewType('type-backbone-view')).to.be.true;
    })
  })
})

