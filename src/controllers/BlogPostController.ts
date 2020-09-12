import NotFoundController from './NotFoundController';

export default class BlogPostController extends NotFoundController {
  protected config: BlogControllerCtorConfig; 
  constructor(config: BlogControllerCtorConfig) {
    super(config);
    this.config = config;
  }

  async action({ postSlug }: BlogPostControllerActionParams) {
    const controllerName = this.constructor.name;
    const {
      markdownToHtmlService,
      templateHydratorService,
      appPaths,
      additionalViewData,
    } = this.config;
    const { getMarkdownFilePath, getViewTemplateFilePath } = appPaths;

    try {
      const postDataWithHtmlBody: FmDataInterface = await markdownToHtmlService.extractFmAttributesAndHtmlBodyFromMd(
        postSlug,
        getMarkdownFilePath(postSlug)
      );

      const computedViewData: ViewData = {
        ...(additionalViewData || {}),
        // TODO correct this Index Signature is missing in FmDataInterface
        ...postDataWithHtmlBody as unknown as ViewData,
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