import RoutePathValidator from "./RoutePathValidator";

export default class PageRoute 
  extends RoutePathValidator
{
  private pageFilePaths: string[];
  controller: RouteControllerCtorConfig<PageControllerActionParams>;

  constructor(public config: PageRouteCtorConfigProps) {
    super(config);
    this.controller = config.controller;
    this.pageFilePaths = config.pageFilePathsGetter();
  }

  getControllerActionParams({ request }: { request: HttpRequest }) {
    return { filepath: this.getHtmlFileRelativePathWithoutDot(request) };
  }

  protected isValid(request: HttpRequest) {
    return this.pageFilePaths.indexOf(this.getHtmlFileRelativePathWithoutDot(request)) >= 0;
  }

  protected getHtmlFileRelativePathWithoutDot(request: HttpRequest): string {
    const requestedFilepath = this.getRequestedFilepath(request);
    console.log('requestedFilePath: ', requestedFilepath);
    return `${(requestedFilepath === '/') ? '/index' : requestedFilepath}.html`;
  }

  protected getRequestedFilepath({ url }: { url: string; }) {
    const stripOutQueryPart = /^(\/[^?]*)\?/g.exec(url);
    return stripOutQueryPart ? stripOutQueryPart[1] : url;
  }
}