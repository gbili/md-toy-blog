import '../bootstrap';
import { expect } from 'chai';
import asyncFilter from '../../src/utils/asyncFilter';
import promisedIn from '../../src/utils/promisedIn';

describe('/utils/asyncFilter.ts', function() {

  const input = ['yes', 'yes', 'no', undefined, 'yes'];
  describe(`asyncFilter(['${input.join("','")}'], x => promisedIn(x === 'yes', 500))`, function() {

    const getOnlyYeses = (x: any) => x === 'yes';
    const output = input.filter(getOnlyYeses);

    it(`should not fail`, async function() {
      expect(asyncFilter(input, x => promisedIn<boolean>(getOnlyYeses(x), 500))).to.eventually.not.be.rejected;
    });

    it(`should return ['${input.filter(getOnlyYeses).join("','")}']`, async function() {
      expect(asyncFilter(input, x => promisedIn<boolean>(getOnlyYeses(x), 500))).to.eventually.be.eql(output);
    });

  });

  const input2 = ['yes', undefined, 'no', undefined, 'yes'];
  describe(`asyncFilter(['${input2.join("','")}'], x => promisedIn(x === 'yes', 500))`, function() {

    const getOnlyUndefined = (x: any) => x === undefined;
    const output2 = input2.filter(getOnlyUndefined);

    it(`should not fail`, async function() {
      expect(asyncFilter(input2, x => promisedIn<boolean>(getOnlyUndefined(x), 500))).to.eventually.not.be.rejected;
    });

    it(`should return ['${input2.filter(getOnlyUndefined).join("','")}']`, async function() {
      expect(asyncFilter(input2, x => promisedIn<boolean>(getOnlyUndefined(x), 500))).to.eventually.be.eql(output2);
    });

  });

});
