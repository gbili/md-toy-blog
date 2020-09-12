import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';

const blogUrlPathPrefix = process.env.MTB_BLOG_URL_PATH_PREFIX
  ? process.env.MTB_BLOG_URL_PATH_PREFIX
  : '/';

const loadDictElement: LoadDictElement<string> = {
  instance: blogUrlPathPrefix,
};

export default loadDictElement;