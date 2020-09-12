import 'dotenv/config';
import { resolve } from 'path';
import { LoadDictElement } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement = {
  factory: function ({ compiledUserContentDir, staticFilesDir }: { compiledUserContentDir: string; staticFilesDir: string; }) {
    return function () {
      const staticFileAbsPathsList: string[] = require(`${compiledUserContentDir}/static-file-list`);
      return staticFileAbsPathsList.map(fullPath => {
        const splitRes = fullPath.split(resolve(staticFilesDir))
        const relativePathWithoutPreSlashDotButWithSuffix = splitRes[splitRes.length -1];
        return relativePathWithoutPreSlashDotButWithSuffix;
      });
    };
  },
  locateDeps: {
    compiledUserContentDir: 'MTB_COMPILED_USER_CONTENT_DIR',
    staticFilesDir: 'MTB_STATIC_FILES_DIR',
  },
};

export default loadDictElement;