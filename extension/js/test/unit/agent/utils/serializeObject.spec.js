describe('inspectValue', function() {

  beforeEach(function() {
    window._knownTypes = {};
  })

  describe('primitives', function() {
    it('string', function() {
      expect(window.inspectValue('foo')).to.deep.equal({
        type: "type-string",
        inspect: "foo",
        cid: undefined
      });
    });

    it('number', function() {
      expect(window.inspectValue(2)).to.deep.equal({
        type: "type-number",
        inspect: 2,
        cid: undefined
      });
    });

    it('bool', function() {
      expect(window.inspectValue(true)).to.deep.equal({
        type: "type-boolean",
        inspect: true,
        cid: undefined
      });
    });
  });

  describe('arrays', function() {
    it('[]', function() {
      expect(window.inspectValue([])).to.deep.equal({
        type: "type-array",
        inspect: "[]",
        cid: undefined
      });
    });

    it('[2]', function() {
      expect(window.inspectValue([2])).to.deep.equal({
        type: "type-array",
        inspect: "[ 2 ]",
        cid: undefined
      });
    });

    it('[2, 3]', function() {
      expect(window.inspectValue([2,3])).to.deep.equal({
        type: "type-array",
        inspect: "[ 2, ... ]",
        cid: undefined
      });
    });

    it('[2, 3, 4]', function() {
      expect(window.inspectValue([2,3,4])).to.deep.equal({
        type: "type-array",
        inspect: "[ 2, ... ]",
        cid: undefined
      });
    });
  });

  describe('objects', function() {
    it('{a: 2}', function() {
      expect(window.inspectValue({a: 2})).to.deep.equal({
        type: "type-object",
        inspect: "{ a: 2 }",
        cid: undefined
      });
    })

    it('{a: "foo"}', function() {
      expect(window.inspectValue({a: 'foo'})).to.deep.equal({
        type: "type-object",
        inspect: "{ a: foo }",
        cid: undefined
      });
    });
  })


  describe('known types', function() {
    beforeEach(function() {
      sinon.stub(_, 'uniqueId', function() {return 'c1'})
    });

    afterEach(function() {
      _.uniqueId.restore();
    })

    it('Backbone.Model', function() {
      expect(window.inspectValue(new window.patchedBackbone.Model)).to.deep.equal({
        type: "type-backbone-model",
        inspect: "<Backbone.Model c1>",
        cid: 'c1'
      });
    });

    it('{a: Backbone.Model}', function() {
      expect(window.inspectValue({a: new window.patchedBackbone.Model})).to.deep.equal({
        type: "type-object",
        inspect: "{ a: <Backbone.Model c1> }",
        cid: undefined
      });
    });
  })
})
