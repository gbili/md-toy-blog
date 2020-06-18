import { LoadDictElement, GetInstanceType } from 'di-why/build/src/DiContainer';
import StaticFileController from '../controllers/StaticFileController';

const loadDictElement: LoadDictElement<GetInstanceType<typeof StaticFileController>> = {
  before: async function ({ serviceLocator }) {
    try {
      const { staticFilesDir } = await serviceLocator.get<AppConfig>('appConfig');
      return {
        staticFilesDir,
      };
    } catch (err) {
      throw err;
    }
  },
  constructible: StaticFileController,
  locateDeps: {
    staticFilesDir: 'MTB_STATIC_FILES_DIR',
  }
};

export default loadDictElement;