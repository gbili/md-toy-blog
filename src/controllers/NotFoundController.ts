export default class NotFoundController implements ControllerInterface {
  constructor(protected config?: NotFoundControllerCtorConfig) {}

  handleError(err: Error) {
    console.log(err);
    return {
      code: 501,
      headers: {'content-type': 'text/plain; charset=utf-8'},
      body: 'Internal server error, could not retrieve blog post',
    };
  };

  async action(params: {}): Promise<ResponseInterface> {
    return {
      code: 404,
      headers: {'content-type': 'text/plain; charset=utf-8'},
      body: '404 Not found',
    };
  }
}