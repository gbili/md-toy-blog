import AppPathResolverService from './../services/AppPathResolverService';
import { LoadDictElement } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement<AppPathResolverService> = {
  constructible: AppPathResolverService,
  locateDeps: {
    compiledUserContentDir: 'MTB_COMPILED_USER_CONTENT_DIR',
    mdBlogPostsDir: 'MTB_MD_BLOG_POSTS_DIR',
    staticFilesDir: 'MTB_STATIC_FILES_DIR',
    viewTemplatesDir: 'MTB_VIEW_TEMPLATES_DIR',
  }
};

export default loadDictElement;
