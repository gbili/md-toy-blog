import 'dotenv/config';

import DiContainer from 'di-why';

import MTB_COMPILED_USER_CONTENT_DIRNAME from './MTB_COMPILED_USER_CONTENT_DIR';
import MTB_ENV from './MTB_ENV';
import MTB_MD_BLOG_POSTS_DIRNAME from './MTB_MD_BLOG_POSTS_DIR';
import MTB_MISSING_REF_VALUE_REPLACEMENT from './MTB_MISSING_REF_VALUE_REPLACEMENT';
import MTB_PACKAGE_NAME from './MTB_PACKAGE_NAME';
import MTB_POST_PREVIEW_LENGTH from './MTB_POST_PREVIEW_LENGTH';
import MTB_ROOT_DIR from './MTB_ROOT_DIR';
import MTB_STATIC_FILES_DIRNAME from './MTB_STATIC_FILES_DIR';
import MTB_USER_CUSTOM_CONFIG_PATH from './MTB_USER_CUSTOM_CONFIG_PATH';
import MTB_USER_PROJECT_ROOT_DIR from './MTB_USER_PROJECT_ROOT_DIR';
import MTB_VIEW_TEMPLATES_DIRNAME from './MTB_VIEW_TEMPLATES_DIR';

import additionalViewData from './additionalViewData';
import appConfig from './appConfig';
import appPathResolverService from './appPathResolverService';
import blogHomeController from './blogHomeController';
import blogPostController from './blogPostController';
import blogPostsToJsonService from './blogPostsToJsonService';
import generateJsonFilesLists from './generateJsonFilesLists'
import handleSignals from './handleSignals';
import homeControllerActionParamsGetter from './homeControllerActionParamsGetter';
import loggerDict, { logger } from './logger';
import markdownToHtmlService from './markdownToHtmlService';
import missingRefValueReplacementCallback from './missingRefValueReplacementCallback';
import mostachito from './mostachito';
import notFoundController from './notFoundController';
import postPreviewShortener from './postPreviewShortener';
import relativeStaticFileListGetter from './relativeStaticFileListGetter';
import routesDict from './routesDict';
import routerService from './routerService';
import server from './server';
import staticFileController from './staticFileController';
import staticFilesToJsonService from './staticFilesToJsonService';
import templateHydratorService from './templateHydratorService';
import userCustomConfig from './userCustomConfig'
import userOrDefaultDir from './userOrDefaultDir';
import validPostSlugList from './validPostSlugList';
import validPostSlugListGetter from './validPostSlugListGetter';
import validPublicPostSlugList from './validPublicPostSlugList';

const injectionDict = {
  MTB_COMPILED_USER_CONTENT_DIRNAME,
  MTB_ENV,
  MTB_MD_BLOG_POSTS_DIRNAME,
  MTB_MISSING_REF_VALUE_REPLACEMENT,
  MTB_PACKAGE_NAME,
  MTB_POST_PREVIEW_LENGTH,
  MTB_ROOT_DIR,
  MTB_STATIC_FILES_DIRNAME,
  MTB_USER_CUSTOM_CONFIG_PATH,
  MTB_USER_PROJECT_ROOT_DIR,
  MTB_VIEW_TEMPLATES_DIRNAME,
  additionalViewData,
  appConfig,
  appPathResolverService,
  blogHomeController,
  blogPostController,
  blogPostsToJsonService,
  generateJsonFilesLists,
  handleSignals,
  homeControllerActionParamsGetter,
  logger: loggerDict,
  markdownToHtmlService,
  missingRefValueReplacementCallback,
  mostachito,
  notFoundController,
  postPreviewShortener,
  relativeStaticFileListGetter,
  ...routesDict,
  routerService,
  server,
  staticFileController,
  staticFilesToJsonService,
  templateHydratorService,
  userCustomConfig,
  userOrDefaultDir,
  validPostSlugList,
  validPostSlugListGetter,
  validPublicPostSlugList,
};

console.log(injectionDict);

logger.turnOn('log');
logger.turnOn('debug');
const di = new DiContainer({ logger, load: injectionDict });

export default di;