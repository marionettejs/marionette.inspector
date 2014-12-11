describe('serializeObject', function() {
  beforeEach(function() {
    this.Class = window.patchedMarionette.ItemView.extend({
      _className: 'Class',
      fooFunc: function() {},
      tagName: 'li'
    })

    this.view = new this.Class();
  });

  describe('serializeObjectProperties', function() {
    beforeEach(function() {
      this.data = window.serializeObjectProperties(this.view);
    });

    it('properly serializes overriden properties', function() {
      expect(this.data.tagName.value).to.equal('li');
    });
  });

  describe('ancestorInfo', function() {
    beforeEach(function() {
      this.data = window.ancestorInfo(this.view);
    })

    it('serializes property keys', function() {
      var classData = this.data[0];
      expect(classData.name).to.equal('Class');
      expect(classData.keys).to.contain(
        "render", "options", "events", "cid",
        "$el", "el", "trigger", "ui", "remove",
        "_listeningTo", "_listenId", "_events"
      );
    });

    it('serializes Class', function() {
      var classData = this.data[1];
      expect(classData.name).to.equal('Class');
      expect(classData.keys).to.contain(
        "constructor", "_className", "fooFunc", "li"
      );
    });

    it('serializes ItemView', function() {
      var classData = this.data[2];
      expect(classData.name).to.equal('ItemView');
    });

    it('serializes Marionette View', function() {
      var classData = this.data[3];
      expect(classData.name).to.equal('Marionette View');
    });

    it('serializes Backbone View', function() {
      var classData = this.data[4];
      expect(classData.name).to.equal('Backbone View');
    });
  })
})