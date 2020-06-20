import '../bootstrap';
import { expect } from 'chai';
import path from 'path';
import mocr from '../../src/utils/moduleOrClonedRepo';

describe('/utils/moduleOrClonedRepo.ts', function() {

  describe(`check if path could be within node module`, function() {
    it('should be true when ends in "/node_modules/<anything>"', function() {
      expect(mocr.pathWithinCouldBeNodeModule("/hi/md-toy-blog/build/test/unit/node_modules/dir_dir/asdf")).to.be.equal(true);
    });

    it('should be true when ends in "/node_modules/<anything>/more"', function() {
      expect(mocr.pathWithinCouldBeNodeModule("/hi/md-toy-blog/build/test/unit/node_modules/dir_dir/asdf/hello")).to.be.equal(true);
    });

    it('should be false when ends in "/node_modules/"', function() {
      expect(mocr.pathWithinCouldBeNodeModule("/hi/md-toy-blog/build/test/unit/node_modules/")).to.be.equal(false);
    });

    it('should be false when not contains "/node_modules/"', function() {
      expect(mocr.pathWithinCouldBeNodeModule("/hi/md-toy-blog/build/test/unit/not_modulos/hey")).to.be.equal(false);
    });

  });

  describe(`check if path could be a node module's root dir`, function() {
    it('should be true when ends in "/node_modules/<anything>"', function() {
      expect(mocr.pathCouldBeNodeModuleRootDir("/hi/md-toy-blog/build/test/unit/node_modules/dir_dir")).to.be.equal(true);
    });

    it('should be false when ends in "/node_modules/<anything>/more"', function() {
      expect(mocr.pathCouldBeNodeModuleRootDir("/hi/md-toy-blog/build/test/unit/node_modules/dir_dir/asdf/hello")).to.be.equal(false);
    });

    it('should be false when ends in "/node_modules/"', function() {
      expect(mocr.pathCouldBeNodeModuleRootDir("/hi/md-toy-blog/build/test/unit/node_modules/")).to.be.equal(false);
    });

    it('should be false when not contains "/node_modules/"', function() {
      expect(mocr.pathCouldBeNodeModuleRootDir("/hi/md-toy-blog/build/test/unit/not_modulos/hey")).to.be.equal(false);
    });
  });

  describe(`get could be path of a node module's root dir`, function() {
    it('should be same as abs input minus rest when "/node_modules/<anything></rest>"', function() {
      const rest = "/asdf/hello"
      const p = `/hi/md-toy-blog/build/../test/unit/node_modules/dir_dir${rest}`;
      const absP = path.resolve(p);
      const absMinusRest = absP.substr(0, absP.length - rest.length);
      expect(mocr.getCouldBeNodeModuleRootDir(p)).to.be.equal(absMinusRest);
    });

    it('should throw when ends in "/node_modules/"', function() {
      const p = "/hi/md-toy-blog/build/test/unit/node_modules/"
      expect(() => mocr.getCouldBeNodeModuleRootDir(p)).to.throw;
    });

    it('should throw when not contains "/node_modules/"', function() {
      const p = "/hi/md-toy-blog/build/test/unit/not_modulos/hey"
      expect(() => mocr.getCouldBeNodeModuleRootDir(p)).to.throw;
    });
  });

});
