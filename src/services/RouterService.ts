export default class RouterService {
  constructor(private routes: RouteInterface<{ [k: string]: any; }>[]) {}

  resolve(request: HttpRequest) {
    const capableRoutes = this.routes.filter(route => route.canResolve(request));

    if (capableRoutes.length <= 0) {
      return false;
    }

    const route = capableRoutes.shift();

    if (typeof route === 'undefined') {
      return false;
    }

    const { instance: controller, actionParams, actionParamsGetter } = route.controller;

    const a = actionParams ? actionParams : {};
    const b = actionParamsGetter ? actionParamsGetter({ request }) : {};
    const c = route.getControllerActionParams ? route.getControllerActionParams({ request }) : {};

    const params = [a, b, c].reduce((acc, p) => ({ ...acc, ...p, }), {});

    const response = controller.action(params);

    return response;
  }
}