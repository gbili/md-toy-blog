import NotFoundController from './NotFoundController';

export default class BlogHomeController extends NotFoundController {
  protected config: BlogHomeControllerCtorConfig; 
  constructor(config: BlogHomeControllerCtorConfig) {
    super(config);
    this.config = config;
  }

  async action({ posts }: BlogHomeControllerActionParams): Promise<ResponseInterface> {
    const controllerName = this.constructor.name;
    const {
      additionalViewData,
      appPaths,
      postPreviewShortener,
      markdownToHtmlService,
      templateHydratorService,
    } = this.config;
    const { getMarkdownFilePath, getViewTemplateFilePath } = appPaths;

    try {
      const postsDataWithHtmlBody: FmDataInterface[] = await Promise.all(posts.map(async (postSlug: string) => {
        return await markdownToHtmlService.loadConvert(
          postSlug,
          getMarkdownFilePath(postSlug),
          postPreviewShortener
        );
      }));

      const computedViewData: ViewData = {
        title: 'Home',
        ...(additionalViewData || {}),
        // TODO correct this Index Signature is missing in FmDataInterface
        posts: postsDataWithHtmlBody as unknown as ViewData[],
      };

      const postTemplateData = await templateHydratorService.loadViewTemplate(
        { ...computedViewData },
        getViewTemplateFilePath(controllerName)
      );

      return {
        code: 200,
        headers: {'content-type': 'text/html; charset=utf-8'},
        body: templateHydratorService.hydrateView(postTemplateData),
      };
    } catch (err) {
      return this.handleError(err);
    }
  }
}