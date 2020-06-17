import { LoadDictElement } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement = {
  factory: ({ userCustomConfigPath, packageName }: { userCustomConfigPath: string; packageName: string; }) => {
    try {
      const userConfig = require(userCustomConfigPath).default;
      return userConfig;
    } catch (err) {
      console.log(`You can customize the config by creating a ${packageName}.config.js in your repo`);
      console.log('Will be using default config...');
      return {};
    }
  },
  locateDeps: {
    userCustomConfigPath: 'MTB_USER_CUSTOM_CONFIG_PATH',
    packageName: 'MTB_PACKAGE_NAME',
  }
};

export default loadDictElement;
