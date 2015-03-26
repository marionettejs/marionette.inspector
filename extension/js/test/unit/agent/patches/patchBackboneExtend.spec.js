describe('patchBackboneExtend', function () {
  before(function () {
      this.classIdKey = '__marionette_inspector__classId';
  });
  describe('when calling patched Backbone.Model.extend', function () {
    beforeEach(function () {
      this.BaseModel = window.patchedBackbone.Model;
      this.Model = window.patchedBackbone.Model.extend();
    });

    it('should have a classId defined on the prototype', function () {
      expect(this.Model.prototype[this.classIdKey]).to.not.be.null;
    });

    it('should have a different classId to Backbone.Model', function () {
      expect(this.Model.prototype[this.classIdKey]).to.not.equal(this.BaseModel.prototype[this.classIdKey]);
    });
  });
  
  describe('when calling patched Backbone.Collection.extend', function () {
    beforeEach(function () {
      this.BaseCollection = window.patchedBackbone.Collection;
      this.Collection = window.patchedBackbone.Collection.extend();
    });

    it('should have a classId defined on the prototype', function () {
      expect(this.Collection.prototype[this.classIdKey]).to.not.be.null;
    });

    it('should have a different classId to Backbone.Collection', function () {
      expect(this.Collection.prototype[this.classIdKey]).to.not.equal(this.BaseCollection.prototype[this.classIdKey]);
    });
  });
  
  describe('when calling patched Backbone.View.extend', function () {
    beforeEach(function () {
      this.BaseView = window.patchedBackbone.View;
      this.View = window.patchedBackbone.View.extend();
    });

    it('should have a classId defined on the prototype', function () {
      expect(this.View.prototype[this.classIdKey]).to.not.be.null;
    });

    it('should have a different classId to Backbone.View', function () {
      expect(this.View.prototype[this.classIdKey]).to.not.equal(this.BaseView.prototype[this.classIdKey]);
    });
  });
});