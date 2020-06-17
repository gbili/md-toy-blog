import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';

const packageName = process.env.MTB_PACKAGE_NAME
  ? process.env.MTB_PACKAGE_NAME
  : 'md-toy-blog';

const loadDictElement: LoadDictElement<string> = {
  instance: packageName,
};

export default loadDictElement;