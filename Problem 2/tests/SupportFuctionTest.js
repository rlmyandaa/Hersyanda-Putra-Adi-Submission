let chai = require('chai');
var should = chai.should();
var expect = chai.expect;
const support = require('../support');


describe('SupportFunction', () => {
  describe('Whitespace Function', () => {
    it('it should get 18-x spaces', () => {
      var a = support.whitespace(8);
      expect(a).to.equal("          |");
    });
  });
  describe('MMMA Function', () => {
    it('it should get correct Min Value', () => {
      var a = support.findMMMA([5,3,8,11,12,43,23]);
      expect(a.min).to.equal(3);
    });
    it('it should get correct Max Value', () => {
        var a = support.findMMMA([4123,232,23,12,3242342,23,23]);
        expect(a.max).to.equal(3242342);
      });
      it('it should get correct Median Value', () => {
        var a = support.findMMMA([4123,232,23,12,3242342,23,23,2321,231,412,416,4241,412,2412,4]);
        expect(a.median).to.equal(412);
      });
      it('it should get correct Average Value', () => {
        var a = support.findMMMA([4123,232,23,12,3242342,23,23,2321,231,412,416,4241,412,2412,4]);
        expect(Math.round(a.avg)).to.equal(217148,2);
      });
  });
});