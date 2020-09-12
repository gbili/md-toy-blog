import { LoadDictElement, GetInstanceType } from 'di-why/build/src/DiContainer';
import PageController from '../controllers/PageController';

const loadDictElement: LoadDictElement<GetInstanceType<typeof PageController>> = {
  before: async function ({ serviceLocator }) {
    try {
      const { pagesDir } = await serviceLocator.get<AppConfig>('appConfig');
      return {
        pagesDir,
      };
    } catch (err) {
      throw err;
    }
  },
  constructible: PageController,
  locateDeps: {
    pagesDir: 'MTB_PAGES_DIR',
  }
};

export default loadDictElement;