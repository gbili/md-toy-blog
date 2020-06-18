import { LoadDictElement } from 'di-why/build/src/DiContainer';
import { LoggerInterface } from 'saylo/build/src/Logger';

const loadDictElement: LoadDictElement = {
  factory: ({ userCustomConfigPath, packageName, logger }: { userCustomConfigPath: string; packageName: string; logger: LoggerInterface}) => {
    try {
      const userConfig = require(userCustomConfigPath).default;
      return userConfig;
    } catch (err) {
      logger.log(`You can customize the config by creating a ${packageName}.config.js in your repo`);
      logger.log('Will be using default config...');
      return {};
    }
  },
  locateDeps: {
    userCustomConfigPath: 'MTB_USER_CUSTOM_CONFIG_PATH',
    packageName: 'MTB_PACKAGE_NAME',
    logger: 'logger',
  }
};

export default loadDictElement;
