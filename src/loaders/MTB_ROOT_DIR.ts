import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';
import path from 'path';

const loadDictElement: LoadDictElement<string> = {
  instance : (() => {
    const rootDir = path.resolve(`${__dirname}/../../..`);
    console.log('MTB_ENV:ROOT_DIR__dirname:', __dirname);
    console.log('MTB_ENV:ROOT_DIR:', rootDir);
    return rootDir;
  })(),
};

export default loadDictElement;