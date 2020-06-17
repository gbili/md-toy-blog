import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';

const userProjectRootDir = process.env.MTB_ENV === 'clone'
  ? `${__dirname}/../..`
  : `${__dirname}/../../../../..`;

const loadDictElement: LoadDictElement<string> = {
  instance: userProjectRootDir,
};

export default loadDictElement;