import DirFilesToJsonService from '../services/DirFilesToJsonService';
import { LoadDictElement, GetInstanceType } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement<GetInstanceType<typeof DirFilesToJsonService>> = {
  constructible: DirFilesToJsonService,
  before: ({ deps }) => {
    const { compiledUserContentDir, mdBlogPostsDir } = deps.appPathResolverService;
    return {
      sourceDir: mdBlogPostsDir,
      destFile: `${compiledUserContentDir}/post-list.json`,
    };
  },
  locateDeps: {
    appPathResolverService: 'appPathResolverService',
  },
};

export default loadDictElement;
