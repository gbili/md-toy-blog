import 'dotenv/config';
import { resolve } from 'path';
import { LoadDictElement } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement = {
  factory: function ({ compiledUserContentDir, staticFilesDir }: { compiledUserContentDir: string; staticFilesDir: string; }) {
    return function () {
      const staticFileList: string[] = require(`${compiledUserContentDir}/static-file-list`);
      return staticFileList.map(fullPath => fullPath.split(resolve(staticFilesDir)).pop());
    };
  },
  locateDeps: {
    compiledUserContentDir: 'MTB_COMPILED_USER_CONTENT_DIR',
    staticFilesDir: 'MTB_STATIC_FILES_DIR',
  },
};

export default loadDictElement;