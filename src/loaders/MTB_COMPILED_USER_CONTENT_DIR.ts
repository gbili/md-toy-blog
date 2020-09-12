import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';

type FactoryProps = {
  userOrDefaultDir: UserOrDefaultDirFunction;
};
const loadDictElement: LoadDictElement<Promise<string>> = {
  factory: async function ({ userOrDefaultDir }: FactoryProps) {
    return await userOrDefaultDir('MTB_COMPILED_USER_CONTENT_DIRNAME', 'compiled_user_content');
  },
  locateDeps: {
    userOrDefaultDir: 'userOrDefaultDir',
  },
};
export default loadDictElement;