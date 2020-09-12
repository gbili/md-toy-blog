type ContentDirNames = 'static' | 'compiled_user_content' | 'views' | 'content' | 'pages';
type DirnameEnvVarNames = 'MTB_STATIC_FILES_DIRNAME' | 'MTB_COMPILED_USER_CONTENT_DIRNAME' | 'MTB_VIEW_TEMPLATES_DIRNAME' | 'MTB_MD_BLOG_POSTS_DIRNAME' | 'MTB_HTML_PAGES_DIRNAME';
type UserOrDefaultDirFunction = (envVarName: DirnameEnvVarNames, dirname: ContentDirNames) => Promise<string>;

type BlogHomeRouteCtorAdditionalProps = { validPostSlugList: string[]; };
type BlogHomeControllerActionParams = { posts: string[]; };
type BlogHomeRouteCtorConfigProps = RouteMatchPathCtorConfig<BlogHomeRouteCtorAdditionalProps, BlogHomeControllerActionParams>;

type BlogPostRouteCtorAdditionalProps = BlogHomeRouteCtorAdditionalProps;
type BlogPostControllerActionParams = { postSlug: string; };
type BlogPostRouteCtorConfigProps = RouteMatchPathCtorConfig<BlogPostRouteCtorAdditionalProps, BlogPostControllerActionParams>;


type StaticFileRouteCtorAdditionalProps = { staticFilePathsGetter: () => string[]; };
type StaticFileControllerActionParams = { filepath: string; };
type StaticFileRouteCtorConfigProps = RouteMatchPathCtorConfig<StaticFileRouteCtorAdditionalProps, StaticFileControllerActionParams>;

type PageRouteCtorAdditionalProps = { pageFilePathsGetter: () => string[]; };
type PageControllerActionParams = { filepath: string; };
type PageRouteCtorConfigProps = RouteMatchPathCtorConfig<PageRouteCtorAdditionalProps, PageControllerActionParams>;

type NotFoundControllerCtorConfig = { [k: string]: any; }

type StaticFileControllerCtorConfig = { staticFilesDir: string; };

type PageControllerCtorConfig = { pagesDir: string; };

type AppPathsConfig = {
  compiledUserContentDir: string;
  mdBlogPostsDir: string;
  staticFilesDir: string;
  pagesDir: string;
  viewTemplatesDir: string;
}

interface AppPathsInterface extends AppPathsConfig {
  getMarkdownFilePath(postSlug: string): string;
  getViewTemplateFilePath(controllerName: string): string;
}

interface BlogControllerCtorConfig { 
  markdownToHtmlService: MarkdownToHtmlServiceInterface;
  templateHydratorService: TemplateHydratorServiceInterface;
  additionalViewData?: ViewData;
  appPaths: AppPathsInterface;
}

interface BlogHomeControllerCtorConfig extends BlogControllerCtorConfig {
  postPreviewShortener: (data: FmDataInterface) => FmDataInterface;
}
