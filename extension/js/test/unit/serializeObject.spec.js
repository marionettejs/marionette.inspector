describe('inspectValue', function() {

  describe('primitives', function() {
    it('string', function() {
      expect(inspectValue('foo')).to.deep.equal({
        type: "type-string",
        inspect: "foo"
      });
    });

    it('number', function() {
      expect(inspectValue(2)).to.deep.equal({
        type: "type-number",
        inspect: 2
      });
    });

    it('bool', function() {
      expect(inspectValue(true)).to.deep.equal({
        type: "type-boolean",
        inspect: true
      });
    });
  });

  describe('arrays', function() {
    it('[]', function() {
      expect(inspectValue([])).to.deep.equal({
        type: "type-object",
        inspect: "{  }"
      });
    });

    it('[2]', function() {
      expect(inspectValue([2])).to.deep.equal({
        type: "type-object",
        inspect: "{ 0: 2 }"
      });
    });

    it('[2, 3]', function() {
      expect(inspectValue([2,3])).to.deep.equal({
        type: "type-object",
        inspect: "{ 0: 2, 1: 3 }"
      });
    });

    it('[2, 3, 4]', function() {
      expect(inspectValue([2,3,4])).to.deep.equal({
        type: "type-object",
        inspect: "{ 0: 2, 1: 3 ...}"
      });
    });
  });

  describe('objects', function() {
    it('{a: 2}', function() {
      expect(inspectValue({a: 2})).to.deep.equal({
        type: "type-object",
        inspect: "{ a: 2 }"
      });
    })

    it('{a: "foo"}', function() {
      expect(inspectValue({a: 'foo'})).to.deep.equal({
        type: "type-object",
        inspect: "{ a: foo }"
      });
    });
  })


  describe('known types', function() {
    it('Backbone.Model', function() {
      expect(inspectValue(new Backbone.Model)).to.deep.equal({
        type: "type-backbone-model",
        inspect: "<Backbone.Model>"
      });
    });

    it('{a: Backbone.Model}', function() {
      expect(inspectValue({a: new Backbone.Model})).to.deep.equal({
        type: "type-object",
        inspect: "{ a: <Backbone.Model> }"
      });
    });
  })
})