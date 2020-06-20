import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';
import path from 'path';

const loadDictElement: LoadDictElement<string> = {
  instance : path.resolve(`${__dirname}/../../..`),
};

export default loadDictElement;