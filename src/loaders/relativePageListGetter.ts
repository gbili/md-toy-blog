import 'dotenv/config';
import { resolve } from 'path';
import { LoadDictElement } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement = {
  factory: function ({ compiledUserContentDir, pagesDir }: { compiledUserContentDir: string; pagesDir: string; }) {
    return function () {
      const pageFileAbsPathsList: string[] = require(`${compiledUserContentDir}/page-file-list`);
      return pageFileAbsPathsList.map(fullPath => {
        const splitRes = fullPath.split(resolve(pagesDir))
        const relativePathWithoutPreSlashDotButWithSuffix = splitRes[splitRes.length -1];
        return relativePathWithoutPreSlashDotButWithSuffix;
      });
    };
  },
  locateDeps: {
    compiledUserContentDir: 'MTB_COMPILED_USER_CONTENT_DIR',
    pagesDir: 'MTB_PAGES_DIR',
  },
};

export default loadDictElement;