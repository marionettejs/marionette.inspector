describe('serializeObject', function() {
  describe('ancestorInfo', function() {
    beforeEach(function() {
      this.Class = window.patchedMarionette.ItemView.extend({
        _className: 'Class',
        fooFunc: function() {}
      })

      this.view = new this.Class();

      this.data = window.ancestorInfo(this.view);
    })

    it('serializes Class', function() {
      var classData = this.data[0];
      expect(classData.name).to.equal('Class');
      expect(classData.keys).to.deep.equal([
        "constructor", "_className", "fooFunc"
      ]);
    });

    it('serializes ItemView', function() {
      var classData = this.data[1];
      expect(classData.name).to.equal('ItemView');
      expect(classData.keys).to.deep.equal([
        "constructor", "serializeData", "serializeCollection",
        "render", "_renderTemplate", "attachElContent",
        "destroy", "_className"
      ]);
    });

    it('serializes Marionette View ', function() {
      var classData = this.data[2];
      expect(classData.name).to.equal('Marionette View');
    });

    it('serializes Backbone View', function() {
      var classData = this.data[3];
      expect(classData.name).to.equal('Backbone View');
    });
  })
})