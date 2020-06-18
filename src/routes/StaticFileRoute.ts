import RoutePathValidator from "./RoutePathValidator";

export default class StaticFileRoute 
  extends RoutePathValidator
{
  private staticFilePaths: string[];
  controller: RouteControllerCtorConfig<StaticFileControllerActionParams>;

  constructor(public config: StaticFileRouteCtorConfigProps) {
    super(config);
    this.controller = config.controller;
    this.staticFilePaths = config.staticFilePathsGetter();
  }

  getControllerActionParams({ request }: { request: HttpRequest }) {
    return { filepath: this.getRequestedFilepath(request) };
  }

  protected isValid(request: HttpRequest) {
    return this.staticFilePaths.indexOf(this.getRequestedFilepath(request)) >= 0;
  }

  protected getRequestedFilepath({ url }: { url: string; }) {
    const stripOutQueryPart = /^(\/[^?]*)\?/g.exec(url);
    return stripOutQueryPart ? stripOutQueryPart[1] : url;
  }
}