export default class ViewNameService {
  constructor(private config: { viewsPath: string; }) {}

  getViewBaseName(controller: {}): string {
    const fullName = controller.constructor.name;
    return fullName
      .substring(0, fullName.length - 'Controller'.length)
      .toLowerCase();
  }

  getViewPath(viewBaseName: string, action: string) {
    const viewsPath = (typeof this.config.viewsPath !== 'undefined')
      ? this.config.viewsPath
      : `${__dirname}/../view`;
    const filepath = `${viewsPath}/${viewBaseName}-${action}.html`;
    return filepath;
  }
}