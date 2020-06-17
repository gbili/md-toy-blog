import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement<string> = {
  factory: function ({ userProjectRootDir }: { userProjectRootDir: string }) {
    return process.env.MTB_STATIC_FILES_DIR
      || `${userProjectRootDir}/views`;
  },
  locateDeps: {
    userProjectRootDir: 'MTB_USER_PROJECT_ROOT_DIR',
  },
};
export default loadDictElement;