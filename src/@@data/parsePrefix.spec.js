const {should, expect} = require('chai');
const {parsePrefix, prefix, getSuffix, getPrefix} = require('./parsePrefix');

should();

describe('@@data/parsePrefix', () => {
  describe('parsePrefix()', () => {
    it('should destructure iri with prefix', () => {
      parsePrefix({'https://example.com/': 'example'}, 'https://example.com/end').should.eql({
        alias: 'example',
        suffix: 'end',
        prefixIri: 'https://example.com/'
      })
    });

    it('should add custom namespace for missing prefix', () => {
      parsePrefix({}, 'https://example.com/end').should.eql({
        alias: 'ns_',
        suffix: 'end',
        prefixIri: 'https://example.com/'
      })
    });
  });

  describe('prefix()', () => {
    it('should prefix iri', () => {
      prefix({'https://example.com/': 'example'}, 'https://example.com/end').should.eql('example:end');
    });
  });

  describe('getSuffix()', () => {
    it('should get suffix from /', () => {
      getSuffix('https://example.com/0').should.eql('0');
    });

    it('should get suffix from #', () => {
      getSuffix('https://example.com#1').should.eql('1');
    });

    it('should get suffix from :', () => {
      getSuffix('https://example.com:2').should.eql('2');
    });

    it('should get suffix as a whole', () => {
      getSuffix('example.com').should.eql('example.com');
    });
  });

  describe('getPrefix()', () => {
    it('should get proper prefix', () => {
      getPrefix('example:1').should.eql('example');
    });

    it('should get empty prefix', () => {
      expect(getPrefix('example.com')).to.be.null;
    });
  });
});
