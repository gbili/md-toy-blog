import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement<string> = {
  factory: function ({ userProjectRootDir }: { userProjectRootDir: string }) {
    return process.env.MTB_COMPILED_USER_CONTENT_DIR
      || `${userProjectRootDir}/compiled_user_content`;
  },
  locateDeps: {
    userProjectRootDir: 'MTB_USER_PROJECT_ROOT_DIR',
  }
};
export default loadDictElement;