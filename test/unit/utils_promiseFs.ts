import '../bootstrap';
import { expect } from 'chai';
import path from 'path';
import promiseFs from '../../src/utils/promiseFs';

const nonexistingDir = path.resolve(`${__dirname}/gibberish/dir`);
const existingDir = path.resolve(`${__dirname}`);

describe('/utils/promiseFs.ts', function() {

  describe(`promiseFs.existsDir`, function() {
    it('should not be rejected when file exists', async function() {
      expect(promiseFs.existsDir(existingDir)).to.eventually.not.be.rejected;
    });

    it('should not be rejected when file exists', async function() {
      try {
        const res = await promiseFs.existsDir(existingDir);
        expect(res).to.be.equal(true);
      } catch (err) {
        throw err;
      }
    });

    it('should not be rejected when file NOT exists', async function() {
      expect(promiseFs.existsDir(nonexistingDir)).to.eventually.not.be.rejected;
    });

    it('should not be rejected when file exists', async function() {
      try {
        const res = await promiseFs.existsDir(nonexistingDir);
        expect(res).to.be.equal(false);
      } catch (err) {
        throw err;
      }
    });

    it('should return true when file exists', function() {
      expect(promiseFs.existsDir(existingDir)).to.be.eventually.be.equal(true);
    });

    it('should return false when file NOT exists', function() {
      expect(promiseFs.existsDir(nonexistingDir)).to.be.eventually.be.equal(false);
    });

  });

});
