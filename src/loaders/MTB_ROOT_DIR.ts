import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';
import path from 'path';

const loadDictElement: LoadDictElement<string> = {
  instance : (() => {
    const rootDir = path.resolve(`${__dirname}/../../..`);
    return rootDir;
  })(),
};

export default loadDictElement;