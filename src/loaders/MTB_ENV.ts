import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';
import promiseFs from '../utils/promiseFs';
import moduleOrClonedRepo from '../utils/moduleOrClonedRepo';

const loadDictElement: LoadDictElement<Promise<string>> = {
  factory: async function determineIfInstalledViaNpmI() {
    return await moduleOrClonedRepo.isWithinNodeModuleOrClonedRepo(__dirname, promiseFs.existsDir);
  },
};
export default loadDictElement;