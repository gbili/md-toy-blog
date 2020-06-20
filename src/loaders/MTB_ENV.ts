import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';
import path from 'path';
import promiseFs from '../utils/promiseFs';

const loadDictElement: LoadDictElement<Promise<string>> = {
  factory: async function determineIfInstalledViaNpmI({ MTB_PACKAGE_NAME }: { MTB_PACKAGE_NAME: string; }) {
    const nodeModulesDirAssumingNpmInstallEnv = path.resolve(`${__dirname}/../../../../node_modules/${MTB_PACKAGE_NAME}`);
    const wasInstalledViaNpmi = await promiseFs.existsDir(nodeModulesDirAssumingNpmInstallEnv);
    return wasInstalledViaNpmi ? 'module' : 'clone';
  },
  locateDeps: {
    MTB_PACKAGE_NAME: 'MTB_PACKAGE_NAME',
  },
};
export default loadDictElement;