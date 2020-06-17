import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement<number> = {
  instance: process.env.MTB_POST_PREVIEW_LENGTH
    ? parseInt(process.env.MTB_POST_PREVIEW_LENGTH)
    : 70,
};
export default loadDictElement;