import RoutePathValidator from "./RoutePathValidator";

export default class BlogHomeRoute
  extends RoutePathValidator
{
  controller: RouteControllerCtorConfig<BlogHomeControllerActionParams>;
  constructor(public config: BlogHomeRouteCtorConfigProps) {
    super(config);
    this.controller = config.controller;
  }
  protected isValid(req: HttpRequest) {
    return true;
  }
}