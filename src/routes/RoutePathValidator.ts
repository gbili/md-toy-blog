export default class RoutePathValidator implements RouteInterface<{}> {
  controller: RouteControllerCtorConfig;
  protected path: string; 

  constructor(protected config: RouteMatchPathCtorConfig) {
    this.path = config.path;
    this.controller = config.controller;
  }

  canResolve(request: HttpRequest) {
    return this.matches(request, this.path) && this.isValid(request);
  }

  protected matches(req: HttpRequest, path: string) {
    const { url, method } = req;
    return method === 'GET'
      && url.indexOf(path) === 0;
  }

  protected isValid(req: HttpRequest) {
    return true;
  }
}