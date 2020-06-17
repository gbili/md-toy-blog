import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement<string> = {
  factory: function ({ userProjectRootDir }: { userProjectRootDir: string }) {
    return process.env.MTB_MD_BLOG_POSTS_DIR
      || `${userProjectRootDir}/content`;
  },
  locateDeps: {
    userProjectRootDir: 'MTB_USER_PROJECT_ROOT_DIR',
  },
};
export default loadDictElement;