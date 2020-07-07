type ContentDirNames = 'static' | 'compiled_user_content' | 'views' | 'content';
type DirEnvVarNames = 'MTB_STATIC_FILES_DIR' | 'MTB_COMPILED_USER_CONTENT_DIR' | 'MTB_VIEW_TEMPLATES_DIR' | 'MTB_MD_BLOG_POSTS_DIR';
type UserOrDefaultDirFunction = (envVarName: DirEnvVarNames, dirname: ContentDirNames) => Promise<string>;

type BlogHomeRouteCtorAdditionalProps = { validPostSlugList: string[]; };
type BlogHomeControllerActionParams = { posts: string[]; };
type BlogHomeRouteCtorConfigProps = RouteMatchPathCtorConfig<BlogHomeRouteCtorAdditionalProps, BlogHomeControllerActionParams>;

type BlogPostRouteCtorAdditionalProps = BlogHomeRouteCtorAdditionalProps;
type BlogPostControllerActionParams = { postSlug: string; };
type BlogPostRouteCtorConfigProps = RouteMatchPathCtorConfig<BlogPostRouteCtorAdditionalProps, BlogPostControllerActionParams>;


type StaticFileRouteCtorAdditionalProps = { staticFilePathsGetter: () => string[]; };
type StaticFileControllerActionParams = { filepath: string; };
type StaticFileRouteCtorConfigProps = RouteMatchPathCtorConfig<StaticFileRouteCtorAdditionalProps, StaticFileControllerActionParams>;

type NotFoundControllerCtorConfig = { [k: string]: any; }

type StaticFileControllerCtorConfig = { staticFilesDir: string; };

type AppPathsConfig = {
  compiledUserContentDir: string;
  mdBlogPostsDir: string;
  staticFilesDir: string;
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

interface BlogHomeControllerCtorConfig extends BlogControllerCtorConfig{
  postPreviewShortener: (data: FmDataInterface) => FmDataInterface;
}
