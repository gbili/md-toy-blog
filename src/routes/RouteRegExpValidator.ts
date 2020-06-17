export default class RouteRegExpValidator implements RouteInterface<{}> {
  controller: RouteControllerCtorConfig;
  protected pathRegExp: RegExp; 

  constructor(protected config: RouteMatchRegExpCtorConfig) {
    this.pathRegExp = config.pathRegExp;
    this.controller = config.controller;
  }

  canResolve(request: HttpRequest) {
    return this.matches(request, this.pathRegExp) && this.isValid(request);
  }
  protected matches(request: HttpRequest, pathRegExp: RegExp) {
    return pathRegExp.test(request.url);
  };
  protected isValid(request: HttpRequest) {
    return true;
  };
}