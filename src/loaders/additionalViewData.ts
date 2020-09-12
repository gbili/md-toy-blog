import { LoadDictElement } from 'di-why/build/src/DiContainer';
import additionalViewData from '../config/additionalViewData';

const loadDictElement: LoadDictElement<{ [k: string]: string; }> = {
  factory: function ({ blogUrlPathPrefix }: { blogUrlPathPrefix: string; }) {
    return {
      ...additionalViewData,
      blogUrlPathPrefix,
    }
  },
  locateDeps: {
    blogUrlPathPrefix: 'MTB_BLOG_URL_PATH_PREFIX',
  },
};

export default loadDictElement;
