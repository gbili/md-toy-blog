import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';


const loadDictElement: LoadDictElement<string> = {
  instance : `${__dirname}/../..`,
};

export default loadDictElement;