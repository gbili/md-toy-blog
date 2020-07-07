export default class AppPathResolverService implements AppPathsInterface {
  compiledUserContentDir: string;
  mdBlogPostsDir: string;
  staticFilesDir: string;
  viewTemplatesDir: string;

  constructor(config: AppPathsConfig) {
    this.compiledUserContentDir = config.compiledUserContentDir;
    this.mdBlogPostsDir = config.mdBlogPostsDir;
    this.staticFilesDir = config.staticFilesDir;
    this.viewTemplatesDir = config.viewTemplatesDir;
    this.getMarkdownFilePath = this.getMarkdownFilePath.bind(this);
    this.getViewTemplateFilePath = this.getViewTemplateFilePath.bind(this);
  }

  // md post
  getMarkdownFilePath(postSlug: string): string {
    const filepath = `${this.mdBlogPostsDir}/${postSlug}.md`;
    return filepath;
  }

  getViewTemplateFilePath(controllerName: string): string {
    const filepath = `${this.viewTemplatesDir}/${this.getViewTemplateBaseName(controllerName)}.html`;
    return filepath;
  }

  private getViewTemplateBaseName(controllerName: string) {
    //const fullName = this.constructor.name;
    const withoutController = controllerName
      .substring(0, controllerName.length - 'Controller'.length);
    const UCToLowerDashed = withoutController
      .replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)
      .substring(1);
    return UCToLowerDashed;
  }
}