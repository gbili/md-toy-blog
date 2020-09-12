import appConfig from '../config/appConfig';
import { LoadDictElement } from 'di-why/build/src/DiContainer';

// TODO what's the point of loading unknown app config?
// Using userCustomConfig should suffice, but in case
// this repo is cloned and the dev starts adding configs
// this will augment types
export type PossiblyEnhancedAppConfig = AppConfig & typeof appConfig;

const loadDictElement: LoadDictElement<PossiblyEnhancedAppConfig> = {
  factory: function ({ userCustomConfig: u, ...defaultConfig }: AppConfigFactoryParams) {
    return {
      compiledUserContentDir: u.compiledUserContentDir ?? defaultConfig.compiledUserContentDir,
      missingRefValueReplacement: u.missingRefValueReplacement ?? defaultConfig.missingRefValueReplacement,
      mdBlogPostsDir: u.mdBlogPostsDir ?? defaultConfig.mdBlogPostsDir,
      packageName: u.packageName ?? defaultConfig.packageName,
      previewLength: u.previewLength ?? defaultConfig.previewLength,
      staticFilesDir: u.staticFilesDir ?? defaultConfig.staticFilesDir,
      pagesDir: u.pagesDir ?? defaultConfig.pagesDir,
      viewTemplatesDir: u.viewTemplatesDir ?? defaultConfig.viewTemplatesDir,
      userCustomConfigPath: u.userCustomConfigPath ?? defaultConfig.userCustomConfigPath,
      userProjectRootDir: u.userProjectRootDir ?? defaultConfig.userProjectRootDir,
      ...appConfig, // TODO this should be overridable by user, figure out how the heck I can loop over each key instead of listing them here like a moron (no Index type string signature)
    };
  },
  locateDeps: {
    compiledUserContentDir: 'MTB_COMPILED_USER_CONTENT_DIR',
    missingRefValueReplacement: 'MTB_MISSING_REF_VALUE_REPLACEMENT',
    mdBlogPostsDir: 'MTB_MD_BLOG_POSTS_DIR',
    packageName: 'MTB_PACKAGE_NAME',
    previewLength: 'MTB_POST_PREVIEW_LENGTH',
    staticFilesDir: 'MTB_STATIC_FILES_DIR',
    pagesDir: 'MTB_PAGES_DIR',
    viewTemplatesDir: 'MTB_VIEW_TEMPLATES_DIR',
    userCustomConfigPath: 'MTB_USER_CUSTOM_CONFIG_PATH',
    userProjectRootDir: 'MTB_USER_PROJECT_ROOT_DIR',

    userCustomConfig: 'userCustomConfig',
  }
};

export default loadDictElement;
