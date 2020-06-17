import BlogPostController from '../controllers/BlogPostController';
import { LoadDictElement, GetInstanceType } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement<GetInstanceType<typeof BlogPostController>> = {
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
  constructible: BlogPostController,
  locateDeps: {
    staticFilesDir: 'MTB_STATIC_FILES_DIR',
  }
};

export default loadDictElement;