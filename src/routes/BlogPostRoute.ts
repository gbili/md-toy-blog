import RoutePathValidator from "./RoutePathValidator";

export default class BlogPostRoute
  extends RoutePathValidator
{
  controller: RouteControllerCtorConfig<BlogPostControllerActionParams>;
  constructor(public config: BlogPostRouteCtorConfigProps) {
    super(config);
    this.controller = config.controller;
  }

  getControllerActionParams({ request }: { request: HttpRequest }) {
    return this.getRequestedPostSlug(request, this.path);
  }

  protected isValid(req: HttpRequest) {
    return this.config.validPostSlugList.indexOf(this.getRequestedPostSlug(req, this.path)) >= 0;
  }

  private getRequestedPostSlug(req: HttpRequest, path: string): string {
    const [, postSlug] = req.url.split(path);
    return postSlug; 
  }
}