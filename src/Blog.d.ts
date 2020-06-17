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

interface BlogControllerCtorConfig { 
  markdownToHtmlService: MarkdownToHtmlServiceInterface;
  templateHydratorService: TemplateHydratorServiceInterface;
  additionalViewData?: ViewData;
  appPaths: {
    getMarkdownFilePath: (slug: string) => string;
    getViewTemplateFilePath: (controllerName: string) => string;
  };
}

interface BlogHomeControllerCtorConfig extends BlogControllerCtorConfig{
  postPreviewShortener: (data: FmDataInterface) => FmDataInterface;
}
