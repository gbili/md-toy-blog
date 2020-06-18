import RoutePathValidator from "./RoutePathValidator";

export default class BlogHomeRoute
  extends RoutePathValidator
{
  controller: RouteControllerCtorConfig<BlogHomeControllerActionParams>;
  constructor(public config: BlogHomeRouteCtorConfigProps) {
    super(config);
    this.controller = config.controller;
  }
  protected matches(req: HttpRequest, path: string) {
    return super.matches(req, path) && req.url === path;
  }
  protected isValid(req: HttpRequest) {
    return true;
  }
}