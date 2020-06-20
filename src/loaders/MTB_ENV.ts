import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';
import path from 'path';
import promiseFs from '../utils/promiseFs';

const loadDictElement: LoadDictElement<Promise<string>> = {
  factory: async function determineIfInstalledViaNpmI({ userProjectRootDir }: { userProjectRootDir: string }) {
    const nodeModulesDirAssumingNpmInstallEnv = path.resolve(`${__dirname}/../../../`);
    const wasInstalledViaNpmi = await promiseFs.existsDir(nodeModulesDirAssumingNpmInstallEnv)
    return wasInstalledViaNpmi ? 'module' : 'clone';
  },
};
export default loadDictElement;