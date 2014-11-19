describe('inspectValue', function() {

  beforeEach(function() {
    window._knownTypes = {};
  })

  describe('primitives', function() {
    it('string', function() {
      expect(window.inspectValue('foo')).to.deep.equal({
        type: "type-string",
        inspect: "foo"
      });
    });

    it('number', function() {
      expect(window.inspectValue(2)).to.deep.equal({
        type: "type-number",
        inspect: 2
      });
    });

    it('bool', function() {
      expect(window.inspectValue(true)).to.deep.equal({
        type: "type-boolean",
        inspect: true
      });
    });
  });

  describe('arrays', function() {
    it('[]', function() {
      expect(window.inspectValue([])).to.deep.equal({
        type: "type-array",
        inspect: "[]"
      });
    });

    it('[2]', function() {
      expect(window.inspectValue([2])).to.deep.equal({
        type: "type-array",
        inspect: "[ 2 ]"
      });
    });

    it('[2, 3]', function() {
      expect(window.inspectValue([2,3])).to.deep.equal({
        type: "type-array",
        inspect: "[ 2, ... ]"
      });
    });

    it('[2, 3, 4]', function() {
      expect(window.inspectValue([2,3,4])).to.deep.equal({
        type: "type-array",
        inspect: "[ 2, ... ]"
      });
    });
  });

  describe('objects', function() {
    it('{a: 2}', function() {
      expect(window.inspectValue({a: 2})).to.deep.equal({
        type: "type-object",
        inspect: "{ a: 2 }"
      });
    })

    it('{a: "foo"}', function() {
      expect(window.inspectValue({a: 'foo'})).to.deep.equal({
        type: "type-object",
        inspect: "{ a: foo }"
      });
    });
  })


  describe('known types', function() {
    it('Backbone.Model', function() {
      expect(window.inspectValue(new window.patchedBackbone.Model)).to.deep.equal({
        type: "type-backbone-model",
        inspect: "<Backbone.Model>"
      });
    });

    it('{a: Backbone.Model}', function() {
      expect(window.inspectValue({a: new window.patchedBackbone.Model})).to.deep.equal({
        type: "type-object",
        inspect: "{ a: <Backbone.Model> }"
      });
    });
  })
})