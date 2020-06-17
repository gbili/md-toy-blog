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
    const filepath = this.getRequestedFilepath(request).substring('/'.length);
    return { filepath };
  }

  protected isValid(request: HttpRequest) {
    return this.staticFilePaths.indexOf(this.getRequestedFilepath(request)) >= 0;
  }

  private getRequestedFilepath(request: HttpRequest) {
    return request.url;
  }
}