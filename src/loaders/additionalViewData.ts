import { LoadDictElement } from 'di-why/build/src/DiContainer';
import additionalViewData from '../config/additionalViewData';

const loadDictElement: LoadDictElement<{ [k: string]: string; }> = {
  instance: additionalViewData,
};

export default loadDictElement;
