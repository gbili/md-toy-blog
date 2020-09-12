import RoutePathValidator from "./RoutePathValidator";

export default class BlogPostRoute
  extends RoutePathValidator
{
  controller: RouteControllerCtorConfig<BlogPostControllerActionParams>;
  constructor(public config: BlogPostRouteCtorConfigProps) {
    super(config);
    this.controller = config.controller;
  }

  getControllerActionParams({ request }: { request: HttpRequest }): BlogPostControllerActionParams {
    return { postSlug: this.getRequestedPostSlug(request, this.paths) };
  }

  protected isValid(req: HttpRequest) {
    return this.config.validPostSlugList.indexOf(this.getRequestedPostSlug(req, this.paths)) >= 0;
  }

  private getRequestedPostSlug(req: HttpRequest, paths: string[]): string {
    const [, postSlug] = req.url.split(paths[0]);
    return postSlug; 
  }
}