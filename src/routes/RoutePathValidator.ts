export default class RoutePathValidator implements RouteInterface<{}> {
  controller: RouteControllerCtorConfig;
  protected paths: string[]; 

  constructor(protected config: RouteMatchPathCtorConfig) {
    this.paths = config.paths;
    this.controller = config.controller;
  }

  canResolve(request: HttpRequest) {
    return this.matches(request, this.paths) && this.isValid(request);
  }

  protected matches(req: HttpRequest, paths: string[]) {
    const { url, method } = req;
    return paths.filter(path => method === 'GET' && url.indexOf(path) === 0).length > 0;
  }

  protected isValid(req: HttpRequest) {
    return true;
  }
}