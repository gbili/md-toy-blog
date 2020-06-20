import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';
import path from 'path';

const loadDictElement: LoadDictElement<string> = {
  factory: function ({ MTB_ENV }) {
    const userProjectRootDir = MTB_ENV == 'clone'
      ? `${__dirname}/../../..` // when git cloned, the root is two dirs appart from ./loaders
      : `${__dirname}/../../../../..`; // when installed via npm i, it will be 5 dirs appart (within node_modules)
    return path.resolve(userProjectRootDir);
  },
  locateDeps: {
    MTB_ENV: 'MTB_ENV',
  }
};

export default loadDictElement;