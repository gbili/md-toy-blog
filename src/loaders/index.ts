import 'dotenv/config';

import DiContainer from 'di-why';

import MTB_COMPILED_USER_CONTENT_DIR from './MTB_COMPILED_USER_CONTENT_DIR';
import MTB_MD_BLOG_POSTS_DIR from './MTB_MD_BLOG_POSTS_DIR';
import MTB_PACKAGE_NAME from './MTB_PACKAGE_NAME';
import MTB_POST_PREVIEW_LENGTH from './MTB_POST_PREVIEW_LENGTH';
import MTB_STATIC_FILES_DIR from './MTB_STATIC_FILES_DIR';
import MTB_USER_CUSTOM_CONFIG_PATH from './MTB_USER_CUSTOM_CONFIG_PATH';
import MTB_USER_PROJECT_ROOT_DIR from './MTB_USER_PROJECT_ROOT_DIR';
import MTB_VIEW_TEMPLATES_DIR from './MTB_VIEW_TEMPLATES_DIR';

import appConfig from './appConfig';
import appPathResolverService from './appPathResolverService';
import blogHomeController from './blogHomeController';
import blogPostController from './blogPostController';
import blogPostsToJsonService from './blogPostsToJsonService';
import generateJsonFilesLists from './generateJsonFilesLists'
import homeControllerActionParamsGetter from './homeControllerActionParamsGetter';
import loggerDict, { logger } from './logger';
import markdownToHtmlService from './markdownToHtmlService';
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
import validPostSlugListGetter from './validPostSlugListGetter';

const injectionDict = {
  MTB_COMPILED_USER_CONTENT_DIR,
  MTB_MD_BLOG_POSTS_DIR,
  MTB_PACKAGE_NAME,
  MTB_POST_PREVIEW_LENGTH,
  MTB_STATIC_FILES_DIR,
  MTB_USER_CUSTOM_CONFIG_PATH,
  MTB_USER_PROJECT_ROOT_DIR,
  MTB_VIEW_TEMPLATES_DIR,
  appConfig,
  appPathResolverService,
  blogHomeController,
  blogPostController,
  blogPostsToJsonService,
  generateJsonFilesLists,
  homeControllerActionParamsGetter,
  logger: loggerDict,
  markdownToHtmlService,
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
  validPostSlugListGetter,
};

console.log(injectionDict);

const di = new DiContainer({ logger, load: injectionDict });

export default di;
