export default class ViewNameService {
  constructor(private config: { viewsPath: string; }) {}

  getViewBaseName(controller: {}): string {
    const fullName = controller.constructor.name;
    return fullName
      .substring(0, fullName.length - 'Controller'.length)
      .toLowerCase();
  }

  getViewPath(viewBaseName: string, action: string) {
    const filepath = `${this.config.viewsPath}/${viewBaseName}-${action}.html`;
    return filepath;
  }
}