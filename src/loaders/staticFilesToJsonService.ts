import DirFilesToJsonService from '../services/DirFilesToJsonService';
import { LoadDictElement, GetInstanceType } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement<GetInstanceType<typeof DirFilesToJsonService>> = {
  constructible: DirFilesToJsonService,
  before: ({ deps }) => {
    const { compiledUserContentDir, staticFilesDir } = deps.appPathResolverService;
    return {
      sourceDir: staticFilesDir,
      destFile: `${compiledUserContentDir}/static-file-list.json`,
    };
  },
  locateDeps: {
    appPathResolverService: 'appPathResolverService',
  },
};

export default loadDictElement;
