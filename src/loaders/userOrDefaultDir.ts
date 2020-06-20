import 'dotenv/config';
import { LoadDictElement } from 'di-why/build/src/DiContainer';
import promiseFs from '../utils/promiseFs';

type FactoryProps = {
  MTB_USER_PROJECT_ROOT_DIR: string;
  MTB_ENV: string;
  MTB_ROOT_DIR: string;
  logger: { log: (...args: any[]) => any; };
};

const loadDictElement: LoadDictElement<UserOrDefaultDirFunction> = {
  factory: function ({ MTB_USER_PROJECT_ROOT_DIR, MTB_ENV, MTB_ROOT_DIR, logger }: FactoryProps) {
    return async function (envVarName: DirEnvVarNames, dirname: ContentDirNames) {
      const userXDir = process.env[envVarName]
        || `${MTB_USER_PROJECT_ROOT_DIR}/${dirname}`;

      const existsUserDir = await promiseFs.existsDir(userXDir);
      if (!existsUserDir) {
        if (MTB_ENV === 'clone') {
          throw new Error(`You must create a ./${dirname} dir at the root of your project after cloning repo`);
        }
        logger.log(`Using module's own ${dirname} dir`);
        const moduleStaticDir = `${MTB_ROOT_DIR}/${dirname}`;
        return moduleStaticDir;
      }
      return userXDir;
    };
  },
  locateDeps: {
    MTB_ENV: 'MTB_ENV',
    MTB_USER_PROJECT_ROOT_DIR: 'MTB_USER_PROJECT_ROOT_DIR',
    MTB_ROOT_DIR: 'MTB_ROOT_DIR',
    logger: 'logger',
  },
};
export default loadDictElement;