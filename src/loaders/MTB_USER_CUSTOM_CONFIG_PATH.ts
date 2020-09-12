import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement<string> = {
  factory: function ({ userProjectRootDir, packageName }: { userProjectRootDir: string; packageName: string; }) {
    return process.env.MTB_STATIC_FILES_DIRNAME
      || `${userProjectRootDir}/${packageName}.config.js`;
  },
  locateDeps: {
    userProjectRootDir: 'MTB_USER_PROJECT_ROOT_DIR',
    packageName: 'MTB_PACKAGE_NAME',
  },
};
export default loadDictElement;