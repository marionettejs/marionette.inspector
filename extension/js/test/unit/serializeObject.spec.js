describe('serializeObject', function() {

  describe('primitives', function() {
    it('string', function() {
      expect(serializeObject('foo')).to.deep.equal({
        type: "type-string",
        inspect: "foo"
      });
    })
  });

  describe('objects', function() {
    it('{a: 2}', function() {
      expect(serializeObject({a: 2})).to.deep.equal({
        type: "type-object",
        inspect: "{ a: 2 }"
      });
    })

    it('{a: "foo"}', function() {
      expect(serializeObject({a: 'foo'})).to.deep.equal({
        type: "type-object",
        inspect: "{ a: foo }"
      });
    });
  })

})