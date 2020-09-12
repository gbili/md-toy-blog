import RoutePathValidator from "./RoutePathValidator";

export default class BlogHomeRoute
  extends RoutePathValidator
{
  controller: RouteControllerCtorConfig<BlogHomeControllerActionParams>;
  constructor(public config: BlogHomeRouteCtorConfigProps) {
    super(config);
    this.controller = config.controller;
  }
  protected matches(req: HttpRequest, paths: string[]) {
    return super.matches(req, paths) && req.url === paths[0];
  }
  protected isValid(req: HttpRequest) {
    return true;
  }
}