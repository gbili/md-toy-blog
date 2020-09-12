import RoutePathValidator from "./RoutePathValidator";

export default class PageRoute 
  extends RoutePathValidator
{
  private pageFilePaths: string[];
  controller: RouteControllerCtorConfig<PageControllerActionParams>;

  constructor(public config: PageRouteCtorConfigProps) {
    super(config);
    this.controller = config.controller;
    this.pageFilePaths = config.pagesFilePathsGetter();
  }

  getControllerActionParams({ request }: { request: HttpRequest }) {
    return { filepath: this.getRequestedFilepath(request) };
  }

  protected isValid(request: HttpRequest) {
    return this.pageFilePaths.indexOf(`${this.getRequestedFilepath(request)}.html`) >= 0;
  }

  protected getRequestedFilepath({ url }: { url: string; }) {
    const stripOutQueryPart = /^(\/[^?]*)\?/g.exec(url);
    return stripOutQueryPart ? stripOutQueryPart[1] : url;
  }
}